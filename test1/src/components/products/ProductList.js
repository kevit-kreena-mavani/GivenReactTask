import { Fragment, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./ProductList.module.css";

const ProductList = (props) => {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductHandler = useCallback(async () => {
    setIsLoading(true);
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
          description: data[key].description,
          category: data[key].category,
        });
      }
      if (searchTerm.length === 0) {
        setProduct(loadedProducts);
      }

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, [searchTerm]);
  useEffect(() => {
    fetchProductHandler();
  }, [fetchProductHandler]);

  const handleClick = (id) => {
    navigate(`/product-detail/${id}`);

    const clickedProduct = products.find((product) => product.id === id);
    props.onSetProductDetail(clickedProduct);
  };

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredItem = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if(filteredItem.length===0){
        setError("Items not Found")
      }
      setProduct(filteredItem);
    }
  }, [searchTerm, products]);
  return (
    <Fragment>
      <div className={styles.searchBar}>
        <input
          type="search"
          placeholder="Search Product.."
          onChange={searchHandler}
        />
      </div>

      <div className={styles[!isLoading ? "main-container" : ""]}>
        {isLoading && <LoadingSpinner />}

        {error && !isLoading && <p>{error}</p>}

        {products.length !== 0 &&
          !isLoading &&
          !error &&
          products.map((product) => (
            <Card
              className={styles.productCard}
              key={product.id}
              onProductClick={() => handleClick(product.id)}
            >
              <img src={product.image} alt="product title" />
              <section>
                <p>{product.title}</p>
                <span>
                  {"\u0024"} {product.price}
                </span>
              </section>
              <button onClick ={() =>handleClick(product.id)}>Add to cart</button>
            </Card>
          ))}
      </div>
    </Fragment>
  );
};
export default ProductList;
