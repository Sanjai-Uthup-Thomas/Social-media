import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import {useSelector } from "react-redux";
import HomePage from '../pages/user/HomePage';
import Login from '../components/user/login/login';
import SignUp from '../components/user/signup/signup';
import SignupOTP from '../components/user/signupOTP/signupOTP';
import AdminLogin from '../components/admin/login/adminLogin';
import { PrivateAdmin } from './AdminPrivate';
import User from '../pages/admin/user/user';
import Post from '../pages/admin/post/post';
import UserProfile from '../pages/user/UserProfile';
import {getUserNames } from '../api/userApi';
import { useState } from 'react';
import EditProfile from '../pages/user/EditProfile';
import Chat from '../pages/user/Chat';
import Notifications from '../pages/user/Notifications';
import Suggestions from '../pages/user/Suggestions';
import ForgetPassword from '../components/user/login/forgetPassword';
import ErrorPage from '../components/common/404page';
import ErrorPage2 from '../components/common/500page';
function NavRoutes() {
    

    const {
        auth: { token, admin_token, signup,controlState,socket,serverError}
    } = useSelector(state => state)
    const userParse = localStorage.getItem("user")
    const  user= JSON.parse(userParse)
   
    //   useEffect(()=>{
    //     dispatch(control())

    //   },[])

    const [userName, setUserName] = useState([])
    if (user) {
        if (!signup) {
            
                var users = user
            
        }
    }
    const userToken = localStorage.getItem('token')
    useEffect(() => {
        fetchData()

    }, [user?.id])

    const fetchData = async () => {
        // console.log("fetchData", user);
        if (user) {
            let result = await getUserNames()
            if (result) {
                // console.log(result.data)
                setUserName(result.data)
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
                        <Route path="/forgetpassword" element={<ForgetPassword/>} />
                         {/* <Route path="/home" element={<HomePage />} /> */}
                    </>
                )}
                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<HomePage />} />
                    {userName.map((data) => (
                        <Route path={`/${data.userName}`} element={<UserProfile userId={data._id} key={data.userName} />} />

                    ))}
                    {/* {userName.map((data) => (                        */}
                    {users && <Route path={`/editprofile`} element={<EditProfile userId={user.id} />} />
                    }

                    {/* // ))} */}

                    <Route path="/chat" element={<Chat />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/suggestions" element={<Suggestions />} />




                </Route>
                <Route path="*" element={<ErrorPage/>} />

                {serverError && <Route path="/error" element={<ErrorPage2/>} />}

                {admin_token ? (
                    <>
                        <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/admin" element={<AdminLogin />} />
                    </>
                )}
                <><Route path="/admin" element={<AdminLogin />} /></>
                <Route element={<PrivateAdmin />}>
                    <Route path="/admin/users" element={<User />} />
                    <Route path="/admin/posts" element={<Post />} />
                </Route>
            </Routes>
        </Router>
    )
}
export default NavRoutes