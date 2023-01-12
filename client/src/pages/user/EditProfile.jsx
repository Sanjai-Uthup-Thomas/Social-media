import React, { useState } from 'react'
import { getUserProfileForEdit, postEditProfile } from '../../api/userApi';
import BottomNav from '../../components/user/bottomNav/bottomNav'
import Navbar from '../../components/user/navbar/navbar'
import { useForm } from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from 'react';
import { ThreeCircles } from 'react-loader-spinner'
import ChangeDP from '../../components/modals/changeDP';
import { json } from 'react-router-dom';
import { addUser } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { control } from '../../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from '../../components/user/home/changePassword';
import Settings from './settings';


function EditProfile({ userId }) {
    const [password,setPassword]=useState(false)
    const user = localStorage.getItem("user")
    const users = JSON.parse(user)
    const dispatch = useDispatch()
    const {
        auth: { controlState }
    } = useSelector(state => state)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    // const [control,setControl]=useState(false)
    const [error, setError] = useState('')
    const [settings,setSettings]=useState(false)
    const [userDetails, setUserDetails] = useState("");
    const fetchData = () => {
        getUserProfileForEdit(users.id).then((response) => {
            console.log("response.data", response.data);
            console.log(users.id);
            setUserDetails(response.data);
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchData()
    }, [userId, controlState])
    const formSchema = Yup.object().shape({
        userName: Yup.string()
            .required("User Name is required")
            .matches(/[!0-9@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/, "Invalid User Name"),

        bio: Yup.string(),

        phoneNumber: Yup.string()
            .required("Phone Number is required")
            .min(10, "Password length should be at least 10 characters")
            .max(10, "Password cannot exceed more than 10 characters")
            .matches(/^[6-9]{1}[0-9]{9}$/, "must be numbers"),

        email: Yup.string()
            .required("Email is required")
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid Email ID"),
    });


    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        // defaultValues:data,
        resolver: yupResolver(formSchema),

    })
    const submit = (data, e) => {
        e.preventDefault()
        console.log(data)
        postEditProfile(users.id, data).then((response) => {
            console.log(response.data.data);
            if (!response.data.status) {
                setError("edited", response.data.message)
            } else {
                // localStorage.setItem('user',response.data.data)
                toast.success('Profile edited', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                localStorage.setItem('user', JSON.stringify(response.data.data))
                dispatch(addUser())

                console.log("editing profile");
            }
            dispatch(control())
            // setControl(!control)
        })
    }

    return (
        <>{loading ?
            <div className="flex flex-col justify-center items-center w-full h-full mb-10 md:mb-0">
                <ThreeCircles
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs

                />
            </div> : <><Navbar />
                <div className="container md:w-6/12 mx-auto mt-4 bg-zinc-100">
                    <>
                        <div className="flex flex-row">
                            <div className="w-1/3 p-3">
                                <p className="float-right mr-5">
                                    <img
                                        className="rounded-full"
                                        src={`http://localhost:4000/DP/${userDetails.profilePhoto}`}
                                        width="65"
                                    />
                                </p>
                            </div>
                            <div>
                                <h1 className="text-2xl">{userDetails.userName}</h1>
                                <a className="text-sm text-slate-800 font-bold cursor-pointer"
                                    onClick={() => setIsOpen(true)}
                                >
                                    Change Profile Photo
                                </a><br />
                                {error && <span className='text-red-600'>{error}</span>}

                            </div>

                        </div>

                        <form onSubmit={handleSubmit(submit)}>
                            <div className="flex flex-row mt-5 items-center">
                                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                                        Username
                                    </label>
                                </div>
                                <div className="w-2/3 pr-10">
                                    <input
                                        type="text"
                                        className="border p-1 px-3 w-full"
                                        placeholder="Username"
                                        defaultValue={userDetails.userName}
                                        // onChange={(e) => setUsername(e.target.value)}
                                        {...register("userName")}
                                    />
                                    {errors.userName && (
                                        <span className="text-red-600">{errors.userName.message}</span>
                                    )}

                                </div>
                            </div>
                            <div className="flex flex-row mt-5 items-center">
                                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                                        Bio
                                    </label>
                                </div>
                                <div className="w-2/3 pr-10">
                                    <textarea
                                        className="border p-1 px-3 w-full"
                                        rows="3"
                                        defaultValue={userDetails.Bio}
                                        // onChange={(e) => setBio(e.target.value)}
                                        {...register("bio")} />
                                    {errors.bio && (
                                        <span className="text-red-600">{errors.bio.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-row mt-5 items-center">
                                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                                        Email
                                    </label>
                                </div>
                                <div className="w-2/3 pr-10">
                                    <input
                                        type="text"
                                        className="border p-1 px-3 w-full"
                                        placeholder="Email"
                                        value={userDetails.email}
                                        // onChange={(e) => setEmail(e.target.value)}
                                        readonly
                                        {...register("email")} />
                                    {errors.email && (
                                        <span className="text-red-600">{errors.email.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-row mt-5 items-center">
                                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                                        Phone Number
                                    </label>
                                </div>
                                <div className="w-2/3 pr-10">
                                    <input
                                        type="text"
                                        className="border p-1 px-3 w-full"
                                        placeholder="Phone Number"
                                        defaultValue={userDetails.phoneNumber}
                                        // onChange={(e) => setPhone(e.target.value)}
                                        {...register("phoneNumber")} />
                                    {errors.phoneNumber && (
                                        <span className="text-red-600">{errors.phoneNumber.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-row mt-5 items-center">
                                <div className="hidden md:w-1/3 md:flex flex-row place-content-end align-center pr-8" />
                                <div className="w-full pr-10 p-4 flex">
                                    <button
                                        className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    
                                    
                                        <div className='pt-5 px-5' >

                                    <a
                                        className="className='py-6 bg-black rounded-3xl p-1 px-auto mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-16 items-center"
                                        onClick={()=>setPassword(!password)}
                                    >Change Password</a>
                                        </div>
                                        <a className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center cursor-pointer"
                                           onClick={()=>setSettings(true)}
                                        >Deactivate
                                        </a>
                                </div>
                            </div>
                        </form>
                        { password && 
                         <ChangePassword />
                        }

                    </>
                </div>
                <BottomNav /></>}
            <ChangeDP open={isOpen} onClose={() => { setIsOpen(false) }} />
            {settings && <Settings open={settings} onClose={() => { setSettings(false) }}  userId={userId}/> }
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default EditProfile