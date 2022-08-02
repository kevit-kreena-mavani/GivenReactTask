import React from "react";
import Card from "../UI/Card";
import styles from "./Cart.module.css";

const Cart = () => {
  return (
    <div className={styles.wrapper}>
      <h1>CART PAGE</h1>
      <div>
        <p>Total items</p>
        <p>Total Amount</p>
      </div>

      <div>
        <Card className={styles.cartItem}>
          <header>
            <h3>Product title</h3>
            <p>Product price</p>
          </header>
          <div>
            <p>Amount</p>
            <button> + </button>
            <button> - </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
