import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import styles from "./ProductDetail.module.css";

const ProductDetail = (props) => {
  const { detailedProduct } = props;
  const navigate = useNavigate();

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
            <button>Add to cart</button>
            <button>Remove from Cart</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
