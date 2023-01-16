import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { checkToken } from "../api/userApi";
import { logout } from "../features/auth/authSlice";
import {socketUpdate } from '../features/auth/authSlice';

// import { useSelector } from "react-redux";

export const PrivateRoutes = () => {
    let token = localStorage.getItem("token");
    const userParse = localStorage.getItem("user")
    const  user= JSON.parse(userParse)
    const dispatch = useDispatch()

    // const {
    //     auth: { token }
    // } = useSelector(state => state);
    useEffect(() => {
        const intervalId = setInterval(() => {

            console.log(token);
            checkToken().then((response) => {
                // console.log(response);
            }).catch((error) => {
                // console.log(error);
                dispatch(logout())
            })
            clearInterval()

        }, 10000);
        return () => clearInterval(intervalId)
    }, [token])

    useEffect(() => {
        const socketio = require('socket.io-client')("ws://localhost:3001")
        socketio?.emit("addUser", user?.id)
        console.log(user?.id,"addUser");
        socketio.on("getUser", users => {
            console.log(users,"users"); 
            console.log(socketio?.id,"socketid");
          dispatch(socketUpdate(socketio)) 
        })
      }, [user?.id])

    const location = useLocation();



    return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};