import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./components/WelcomePage/Welcome";
import SignUp from "./components/Auth/Signup";
import ProductDetail from "./components/products/ProductDetail";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";
import ProductList from "./components/products/ProductList";
import Profile from "./components/Profile/Profile";
import FinishOrder from "./components/cart/FinishOrder";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)

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
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        <Route path="/finishOrder" element={totalQuantity > 0 ? <FinishOrder/> : <Navigate to="/product-list"/>} />
          <Route path="/profile" element={<Profile/>} />
          {/* <Route path="/about-us" element={<p>ABOUT US</p>} /> */}
          <Route path="*" element={<p>404! PAGE NOT FOUND</p>} />
        </Route>
      </Routes>
 
    </div>
  );
}

export default App;
