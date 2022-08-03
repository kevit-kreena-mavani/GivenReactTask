import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import styles from "./ProductDetail.module.css";
import { CartActions } from "../../reducers/cart";

const ProductDetail = () => {
  const detailedProduct = useSelector(state => state.product?.clickedProduct);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(CartActions.addToCart(detailedProduct))
  }

  const removeFromCartHandler = () =>{
    dispatch(CartActions.removeFromCart(detailedProduct))
  }

  return (
    <div className={styles.product}>
      <header>
        <h2>{detailedProduct.category}</h2>
        <button onClick={() => navigate(-1)}>Close</button>
      </header>
    <hr/>
      <section className={styles.wrapper}>
        <ProductCarousel imageLink={detailedProduct.image} />
        <div className={styles.productContent}>
          <h2>{detailedProduct.title}</h2>
          <p>{detailedProduct.description}</p>
          <p>
            {"\u0024"} {detailedProduct.price}
          </p>
          <div className={styles.actions}>
            <button onClick={addToCartHandler}>Add to cart</button>
            <button onClick={removeFromCartHandler}>Remove from Cart</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
