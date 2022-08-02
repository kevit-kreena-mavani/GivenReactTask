import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, ProductActions } from "../../reducers/product";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./ProductList.module.css";
import SingleProduct from "./SingleProduct";

function ProductList() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.product.status);
  const products = useSelector((state) => state.product.products);
  const searchedProduct = useSelector((state) => state.product.searchedProduct);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const searchHandler = (event) => {
    dispatch(ProductActions.SearchProduct(event.target.value));
  };

  return (
    <Fragment>
      <div className={styles.searchBar}>
        <input
          type="search"
          placeholder="Search Product.."
          onChange={searchHandler}
        />
      </div>

      <div className={styles[status === "loading" ? "" : "main-container"]}>
        {status === "failed" && <p>{error}</p>}
        {status === "success" && error && <p>{error}</p>}
        {status === "loading" && <LoadingSpinner />}
        {status === "success" &&
        products.length !== 0 &&
        !error &&
        searchedProduct.length === 0
          ? products.map((product) => (
              <SingleProduct product={product} key={product.id} />
            ))
          : searchedProduct.map((product) => (
              <SingleProduct product={product} key={product.id} />
            ))}
      </div>
    </Fragment>
  );
}

export default ProductList;
