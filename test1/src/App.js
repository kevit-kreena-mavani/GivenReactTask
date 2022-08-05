import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./components/WelcomePage/Welcome";
import SignUp from "./components/Auth/Signup";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";
import Profile from "./components/Profile/Profile";
import FinishOrder from "./components/cart/FinishOrder";
import AllProducts from "./components/product/AllProducts";
import DetailedProduct from "./components/product/DetailedProduct";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/products " />}
        />
        <Route
          path="/signup"
          element={!isAuth ? <SignUp /> : <Navigate to="/products" />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<DetailedProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/finishOrder"
            element={
              totalQuantity > 0 ? <FinishOrder /> : <Navigate to="/products" />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<p>404! PAGE NOT FOUND</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
