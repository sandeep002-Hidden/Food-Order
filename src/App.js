import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/login.jsx";
import SignUp from "./components/signup.jsx";
import ForgetPassword from "./components/forgetPassword.jsx";
import MyCart from "./components/myCart.jsx";
import Search from "./components/Search.jsx"
import Help from "./components/Help.jsx";
import Profile from "./components/profile.jsx";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
import AdminSearch from "./components/Admin/ASearch.jsx";
import AddItem from "./components/Admin/AddItem.jsx";
import AdminProfile from "./components/Admin/AdminProfile.jsx"
import PendingOrders from "./components/pendingOrders.jsx"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin002" element={<AdminPanel />} />
        <Route path="/admin002/search" element={<AdminSearch />} />
        <Route path="/admin002/profile" element={<AdminProfile />} />
        <Route path="/admin002/addItems" element={<AddItem />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="myCart" element={<MyCart />} />
        <Route path="search" element={<Search />} />
        <Route path="help" element={<Help />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="forgetPassword" element={<ForgetPassword/>}/>
        <Route path="/Profile/pendingOrders/:id" element={<PendingOrders />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


