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
import Prod from "./components/product/Prod";
import DetailedProd from "./components/product/DetailedProd";

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
          element={!isAuth ? <Login /> : <Navigate to="/prod " />}
        />
        <Route
          path="/signup"
          element={!isAuth ? <SignUp /> : <Navigate to="/prod" />}
        />
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/finishOrder"
            element={
              totalQuantity > 0 ? <FinishOrder /> : <Navigate to="/prod" />
            }
          />
          <Route path="/profile" element={<Profile />} />

          <Route path="/prod" element={<Prod />} />
          <Route path="/prod/:id" element={<DetailedProd />} />
          <Route path="*" element={<p>404! PAGE NOT FOUND</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
