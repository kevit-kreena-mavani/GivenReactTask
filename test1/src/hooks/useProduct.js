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
      url: `https://dummyjson.com/products?`,
      params: { limit: skip },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setIsLoading(false);
        setProductData(res.data.products);

        setHasMore(skip < 30);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err.message);
      });
  }, [skip]);

  return { isLoading, error, productData, hasMore };
}

export default useProduct;
