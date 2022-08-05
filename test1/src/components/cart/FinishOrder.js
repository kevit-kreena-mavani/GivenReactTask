import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./FinishOrder.module.css";

function FinishOrder() {
  const [successMsg, setSuccessMsg] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();

  const gotobackHandler = () => {
    navigate(-1);
  };
  const submitOrderHandler = () => {
    setSuccessMsg("Order Submitted Successfully!!");
  };
  const changeInfoHandler = () =>{
    navigate("/profile")
  }

  return (
    <div className={styles.wrapper} >
      <div className={styles.content}>
        <div>
          <h2>Selected Items </h2>
          {cartItems.length !== 0 &&
            cartItems.map((item) => (
              <div key ={item.id} className={styles.cartItems}> 
                <p>
                  {item.title}
                  <span>X{item.quantity}</span>
                </p>
                <p> {"\u0024"}  {item.price}</p>
              </div>
            ))}
          <h3>Total Price : {"\u0024"} {totalAmount} </h3>
        </div>
        <div >
        <h2>Verify Your Information </h2>
          <p>Name : {userData.name}</p>
          <p>Mobile Number : {userData.mobileNumber}</p>
          <p>Address : {userData.address}</p>
          <button onClick ={changeInfoHandler}>Change Information</button>
        </div>
      </div>

      <button onClick={gotobackHandler}>Back</button>
      <button onClick={submitOrderHandler}>Place Order</button>
      {successMsg.length !== 0 && <h4>{successMsg}</h4>}
    </div>
  );
}

export default FinishOrder;
