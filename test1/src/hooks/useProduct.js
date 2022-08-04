import axios from "axios";
import { useEffect, useState } from "react";

function useProduct(skip, query) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [productData, setProductData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let cancel;
    setIsLoading(true);
    setError("");

    axios({
      method: "GET",
      url: `https://dummyjson.com/products`,
      params: { skip: skip, limit: 20 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setIsLoading(false);
        setProductData((prev) => {
          return [...prev, ...res.data.products];
        });

        setHasMore(res.data.products.length > 0);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err.message);
      });

    return () => cancel();
  }, [skip, ]);

  return { isLoading, error, productData, hasMore };
}

export default useProduct;
