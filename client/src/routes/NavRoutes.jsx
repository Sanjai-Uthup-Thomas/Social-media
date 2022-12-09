import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { useSelector } from "react-redux";
import HomePage from '../pages/user/HomePage';
import Login from '../components/user/login/login';
import SignUp from '../components/user/signup/signup';
import SignupOTP from '../components/user/signupOTP/signupOTP';
import AdminLogin from '../components/admin/login/adminLogin';
import { PrivateAdmin } from './AdminPrivate';
import AdminDash from '../pages/admin/dash/dash';
import User from '../pages/admin/user/user';
import Post from '../pages/admin/post/post';
import UserProfile from '../pages/user/UserProfile';
import { getUserNames } from '../api/userApi';
import { useState } from 'react';
import EditProfile from '../pages/user/EditProfile';
import { object } from 'yup';
function NavRoutes() {
    const {
        auth: { token, user, admin_token,signup }
    } = useSelector(state => state)

    const [userName, setUserName] = useState([])
    const fetchData = () => {
        if (user) {
            getUserNames().then((response) => {
                setUserName(response.data)
            })
        }

    }
    useEffect(() => {
        fetchData()
    }, [])
    if (user) {
        if(!signup){
            if (user.username === undefined) {
                var users = JSON.parse(user)
            } else {
                users = user
            }
        }
            
        

    }


    return (
        <Router>
            <Routes>
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
                    {userName.map((data) => (
                        <Route path={`/${data.userName}`} element={<UserProfile userId={data._id} />} />

                    ))}
                    {/* {userName.map((data) => (                        */}
                    {users && <Route path={`/editprofile`} element={<EditProfile userId={users.id} />} />
                    }

                    {/* // ))} */}



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