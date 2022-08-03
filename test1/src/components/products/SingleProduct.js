import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import styles from "./SingleProduct.module.css";
import { ProductActions } from "../../reducers/product";
import { CartActions } from "../../reducers/cart";

const SingleProduct = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productClickHandler = (id) => {
    dispatch(ProductActions.findProduct(id));
    navigate(`/product-detail/${id}`);
  };

  const addToCartHandler = () => {
    dispatch(CartActions.addToCart(product))
    // navigate("/cart");
  };
  return (
    <Card className={styles.productCard}>
      <div onClick={() => productClickHandler(product.id)}>
        <img src={product.image} alt="product title" />
        <section>
          <p>{product.title}</p>
          <span>
            {"\u0024"} {product.price}
          </span>
        </section>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCartHandler(product.id);
          }}
        >
          Add to cart
        </button>
      </div>
    </Card>
  );
};

export default SingleProduct;
