import React, { useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Header from "./components/header/Header";
import ProductList from "./components/products/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import SignUp from "./components/Auth/Signup";
import ProductDetail from "./components/products/ProductDetail";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";

function App() {
  const [product, setProduct] = useState({});
  const isAuth = useSelector((state) => state.isAuthenticated);

  const setSelectedProduct = (product) => {
    setProduct(product);
  };
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/product-list" />}
        />
        <Route
          path="/signup"
          element={!isAuth ? <SignUp /> : <Navigate to="/product-list" />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/product-list"
            element={<ProductList onSetProductDetail={setSelectedProduct} />}
          ></Route>
          <Route path="/product-detail/:id" element={<ProductDetail detailedProduct={product} />} />
          <Route path="/cart" element={<Cart cartItem ={product}/>} />
          <Route path="/profile" element={<p>my profile</p>} />
          <Route path="/about-us" element={<p>ABOUT US</p>} />
          <Route path="*" element={<p>404! PAGE NOT FOUND</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
