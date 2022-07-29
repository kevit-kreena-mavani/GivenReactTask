import { Fragment, useCallback, useState, useEffect } from "react";
import Card from "../UI/Card";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [error, setError] = useState("");

  const fetchProductHandler = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Something went Wrong !");
      }
      const data = await response.json();

      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push({
          id: data[key].id,
          title: data[key].title,
          price: data[key].price,
          image: data[key].image,
        });
      }
      setProduct(loadedProducts);
    } catch (error) {
      setError(error.message);
    }
  }, []);
  useEffect(() => {
    fetchProductHandler();
  }, [fetchProductHandler]);

  console.log(products, error);
  return (
    <Fragment>
      <div className={styles.searchBar}>
        <input type="search" placeholder="Search Product.." />
      </div>

      <div className={styles['main-container']}>
        {products.length !== 0 &&
          products.map((product) => (
            <Card className={styles.productCard} key={product.id}>
              <img src={product.image} alt="product title" />
              <section>
                <p>{product.title}</p>
                <span>
                  {"\u20A8"} {product.price}
                </span>
              </section>
              <button>Add to cart</button>
            </Card>
          ))}
      </div>
    </Fragment>
  );
};
export default ProductList;
