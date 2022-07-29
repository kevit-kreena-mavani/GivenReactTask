import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Header from "./components/header/Header";
import ProductList from "./components/products/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import SignUp from "./components/Auth/Signup";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/product-list" element={<ProductList />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
