import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import ProtectedRoute from "./pages/ProtectedRoute";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Auth></Auth>}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/product-list" element={<ProductList />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
