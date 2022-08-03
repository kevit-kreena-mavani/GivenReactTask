import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.footer}>
        <h1>Shopping site</h1>
        <div className={styles.content}>
            <section>
                <h2>Get Help</h2>
                <p>Order status</p>
                <p>Delivery</p>
                <p>Returns</p>
                <p>Delivery Options</p>
                <p>Payment options</p>
            </section>
          <section>
            <h2>About</h2>
            <p>About Us</p>
            <p>Reviews</p>
            <p>Blogs</p>
            <p>FAQ</p>
          </section>
          <section>
            <h2>Follow Us</h2>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </section>
          <section>
            <h2>Contact Us</h2>
            <p>Email</p>
            <p>Help Center</p>
          </section>
        </div>
        <hr />
        <p className={styles.copyRightLine}>CopyRight &copy;2022, ShoppingSite.com</p>
      </div>
    </div>
  );
}

export default Footer;
