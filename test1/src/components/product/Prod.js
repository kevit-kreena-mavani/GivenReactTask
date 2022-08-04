import React, { useCallback, useRef, useState } from "react";
import useProduct from "../../hooks/useProduct";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./Prod.module.css";
import SingleProd from "./SingleProd";
import Footer from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { ProductActions } from "../../reducers/product";
// import SingleProduct from "./SingleProduct";
// import Card from "../UI/Card";

function Prod() {
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState("");
  const getdata = useSelector(state => state.product.searchedProduct)
  const dispatch = useDispatch()
  const { isLoading, hasMore, productData, error } = useProduct(
    skip,
    query
  );
  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setSkip((prev) => prev + 20);
       
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const searchHandler = (event) => {
    setQuery(event.target.value);
     
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
        {!isLoading &&
          productData.length !== 0 &&
          productData.map((product, index) => {
            if (productData.length === index + 1) {
              return (
                <SingleProd
                  ref={lastProductRef}
                  product={product}
                  key={product.id}
                />
              );
            } else {
              return <SingleProd product={product} key={product.id} />;
            }
          })}
      </div>
      <div>{error && <p>{error}</p>}</div>
      <div>{isLoading && <LoadingSpinner />}</div>
      <Footer />
    </>
  );
}

export default Prod;
