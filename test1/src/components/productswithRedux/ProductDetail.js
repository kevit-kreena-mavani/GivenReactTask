import React from "react";
//import { useDispatch,  } from "react-redux";
import {  useParams } from "react-router-dom";
// import ProductCarousel from "./ProductCarousel";
// import styles from "./ProductDetail.module.css";
// import { CartActions } from "../../reducers/cart";

const ProductDetail = () => {

  const params = useParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  console.log(params)
  // const addToCartHandler = () => {
  //   dispatch(CartActions.addToCart(detailedProduct))
  // }

  // const removeFromCartHandler = () =>{
  //   dispatch(CartActions.removeFromCart(detailedProduct))
  // }

  return (
    <div>hello</div>
    //   <div className={styles.product}>
    //     <header>
    //       <h2>{detailedProduct.category}</h2>
    //       <button onClick={() => navigate(-1)}>Close</button>
    //     </header>
    //   <hr/>
    //     <section className={styles.wrapper}>
    //       <ProductCarousel imageLink={detailedProduct.image} />
    //       <div className={styles.productContent}>
    //         <h2>{detailedProduct.title}</h2>
    //         <p>{detailedProduct.description}</p>
    //         <p>
    //           {"\u0024"} {detailedProduct.price}
    //         </p>
    //         <div className={styles.actions}>
    //           <button onClick={addToCartHandler}>Add to cart</button>
    //           <button onClick={removeFromCartHandler}>Remove from Cart</button>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
  );
};

export default ProductDetail;
