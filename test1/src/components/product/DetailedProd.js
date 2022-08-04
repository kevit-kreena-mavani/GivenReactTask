import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailedProd.module.css";
import ProductCarousel from "./ProductCarousel";
import useProduct from "../../hooks/useProduct";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { CartActions } from "../../reducers/cart";

const DetailedProd = () => {
  const { productData, isLoading } = useProduct();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const detailedProduct = productData[+params.id - 1];


  const addToCartHandler = () =>{
    dispatch(CartActions.addToCart(detailedProduct))
  }
  const removeFromCartHandler = () =>{
    dispatch(CartActions.removeFromCart(detailedProduct))
  }
  return (
    <div className={styles.product}>
      {isLoading && <LoadingSpinner />}
      {detailedProduct && (
        <div>
          <header>
            <h2>{detailedProduct.category}</h2>
            <button onClick={() => navigate(-1)}>Close</button>
          </header>
          <hr />
          <section className={styles.wrapper}>
            <ProductCarousel imageLink={detailedProduct.thumbnail} />
            <div className={styles.productContent}>
              <h2>{detailedProduct.title}</h2>
              <p>{detailedProduct.description}</p>
              <p>
                {"\u0024"} {detailedProduct.price}
              </p>
              <div className={styles.actions}>
                <button onClick={addToCartHandler}>Add to cart</button>
                <button onClick={removeFromCartHandler}>
                  Remove from Cart
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default DetailedProd;
