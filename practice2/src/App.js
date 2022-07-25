import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import SubmitTest from "./pages/SubmitTest";
import UserDetails from "./pages/UserDetails";
import Test from "./pages/Test";


function App() {
   const [userData , setUserData] =useState('');
  

  const userDataHandler = (data) =>{
   
    setUserData(data)
  }

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/user-detail" />} />
        <Route path="/user-detail" element={<UserDetails  onSaveUserDetails={userDataHandler}/>} />
        <Route path="/test" element={<Test language ={userData.language} />} />
        <Route path="/test/submit" element={<SubmitTest userData ={userData}/>} />
      </Routes>
    </div>
  );
}

export default App;
