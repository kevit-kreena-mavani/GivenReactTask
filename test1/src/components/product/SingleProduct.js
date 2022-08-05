import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./SingleProduct.module.css";
import { CartActions } from "../../reducers/cart";

const SingleProduct = React.forwardRef((props, ref) => {
  const { product } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productClickHandler = (id) => {
    navigate(`/product/${id}`);
  };
  const addToCartHandler = () => {
    dispatch(CartActions.addToCart(product));
    // navigate("/cart");
  };
  return (
    <div
      className={styles.productCard}
      key={product.id}
      ref={ref}
      onClick={() => productClickHandler(product.id)}
    >
      <div>
        <img src={product.thumbnail} alt="product title" />
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
    </div>
  );
});

export default SingleProduct;
