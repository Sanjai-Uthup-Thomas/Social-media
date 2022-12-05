import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { useSelector } from "react-redux";
import HomePage from '../pages/user/HomePage';
import Login from '../components/user/login/login';

import SignUp from '../components/user/signup/signup';
import SignupOTP from '../components/user/signupOTP/signupOTP';
import Mockman from "mockman-js";
import AdminLogin from '../components/admin/login/adminLogin';
import { PrivateAdmin } from './AdminPrivate';
import AdminDash from '../pages/admin/dash/dash';
import User from '../pages/admin/user/user';
import Post from '../pages/admin/post/post';



function NavRoutes() {
    const {
        auth:{token,admin_token}
    }=useSelector(state => state)
  return (
    <Router>
    <Routes>

    <Route path={"/mock"} element={<Mockman />} />

    {token ? (
        <>
            <Route path="/" element={<Navigate to="/Home" replace />} />

            <Route path="/signup" element={<Navigate to="/Home" replace />} />
            <Route path="/OTPverification" element={<Navigate to="/Home" replace />} />

        </>
    ) : (
        <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/OTPverification" element={<SignupOTP />} />
            {/* <Route path="/home" element={<HomePage />} /> */}

        </>
     )} 

   <Route element={<PrivateRoutes />}>
  
        <Route path="/home" element={<HomePage />} />  
        
    </Route> 
    <Route path="*" element={<h2> OOPS! Page Not Found</h2>} />
    {admin_token ? (
        <>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </>
    ) : (
        <>
            <Route path="/admin" element={<AdminLogin />} />
        </>
     )} 
    <><Route path="/admin" element={<AdminLogin />} /></>
    <Route element={<PrivateAdmin />}>
    <Route path="/admin/dashboard" element={<AdminDash />} />
    <Route path="/admin/users" element={<User />} />
    <Route path="/admin/posts" element={<Post />} />

    </Route>
</Routes>


</Router>
  )
}

export default NavRoutes