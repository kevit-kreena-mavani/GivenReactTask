import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartActions } from "../../reducers/cart";
import Card from "../UI/Card";
import styles from "./Cart.module.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate("/product-list");
  };
  const increaseQuantityHandler = (item) => {
    dispatch(CartActions.addToCart(item));
  };
  const decreaseQuantityHandler = (item) => {
    dispatch(CartActions.removeFromCart(item));
  };
  const finishOrderHandler = () => {
    navigate("/finishOrder");
  };
  return (
    <div className={styles.wrapper}>
      <h1>CART PAGE</h1>
      <div className={styles.headerContent}>
        <p>Total items : {totalQuantity}</p>
        <p>
          Total Amount : {"\u0024"} {totalAmount}
        </p>
      </div>

      <div>
        {cartItems.length === 0 && (
          <Card>
            <h2>Your Cart Is Empty!</h2>
          </Card>
        )}
        {cartItems.length !== 0 &&
          cartItems.map((item) => (
            <Card className={styles.cartItem} key={item.id}>
              <section>
                <h3>{item.title}</h3>
                <p>
                  {"\u0024"} {item.price}
                </p>
              </section>
              <div>
                <p>Quantity : {item.quantity}</p>
                <button onClick={() => decreaseQuantityHandler(item)}>
                  {" "}
                  -{" "}
                </button>
                <button onClick={() => increaseQuantityHandler(item)}>
                  {" "}
                  +{" "}
                </button>
              </div>
            </Card>
          ))}
      </div>
      <div className={styles.actions}>
        <button onClick={closeHandler}> Back </button>
        <button disabled={cartItems.length === 0} onClick={finishOrderHandler}>
          {" "}
          Finish Order{" "}
        </button>
      </div>
    </div>
  );
};

export default Cart;
