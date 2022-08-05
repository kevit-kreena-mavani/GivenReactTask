import React, { useCallback, useRef, useState } from "react";
import useProduct from "../../hooks/useProduct";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./AllProducts.module.css";
import SingleProduct from "./SingleProduct";
import Footer from "../layout/Footer";

function AllProducts() {
  const [skip, setSkip] = useState(10);
  const [err, setErr] = useState("");
  const { isLoading, hasMore, productData, error } = useProduct(skip);
  const [filteredItems, setFilteredItems] = useState([]);

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const [target] = entries;
          if (target.isIntersecting && hasMore) {
            console.log("visible");
            setSkip((prev) => prev + 10);
          }
        },
        {
          rootMargin: "0px",
          threshold: 1.0,
        }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const searchHandler = (event) => {
    const items = productData.filter((product) =>
      product.title.toLowerCase().includes(event.target.value)
    );
    if (items) {
      setFilteredItems(items);
    }

    const checkArray = items.map((item) =>
      item.title.toLowerCase().includes(event.target.value)
    );
    if (checkArray.every((item) => item === false)) {
      setErr("Items not Found");
    } else {
      setErr("");
    }
  };

  return (
    <>
      <div className={styles.searchBar}>
        <input
          type="search"
          placeholder="Search Product.."
          onChange={searchHandler}
        />
      </div>

      <div className={styles["main-container"]}>
        {!err && filteredItems.length === 0
          ? productData.map((product, index) => {
              if (productData.length === index + 1) {
                return (
                  <SingleProduct
                    ref={lastProductRef}
                    product={product}
                    key={product.id}
                  />
                );
              } else {
                return <SingleProduct product={product} key={product.id} />;
              }
            })
          : filteredItems.map((product) => (
              <SingleProduct product={product} key={product.id} />
            ))}

        <div>{error && <p>{error}</p>}</div>
        {isLoading && <LoadingSpinner />}
        {err && <p>{err}</p>}
        
      </div>
      

      {!isLoading && <Footer />}
    </>
  );
}

export default AllProducts;
