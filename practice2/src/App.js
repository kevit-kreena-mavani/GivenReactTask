import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import SubmitTest from "./pages/SubmitTest";
import UserDetails from "./pages/UserDetails";
import Test from "./pages/Test";


function App() {
   const [userLanguage , setUserLanguage] =useState('');

  const userDataHandler = (data) =>{
    const language = data.language;
    setUserLanguage(language)
  }

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/user-detail" />} />
        <Route path="/user-detail" element={<UserDetails  onSaveUserDetails={userDataHandler}/>} />
        <Route path="/test" element={<Test language ={userLanguage} />} />
        <Route path="/test/submit" element={<SubmitTest />} />
      </Routes>
    </div>
  );
}

export default App;
