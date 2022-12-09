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

function EditProfile({userId}) {
    const [isOpen,setIsOpen] =useState(false)
    const [loading,setLoading] = useState(true)
    const [control,setControl]=useState(false)
    const[error,setError] = useState('')
    const [userDetails, setUserDetails] = useState("");
    const fetchData = () => {
        getUserProfileForEdit(userId).then((response) => {
            console.log("response.data",response.data);
            setUserDetails(response.data);
            setLoading(false)
        })
    }
    useEffect(()=>{
        fetchData()
    },[userId,control])
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
    const submit =(data, e) => {
        e.preventDefault()
        console.log(data)
        postEditProfile(userId,data).then((response)=>{
            console.log(response.data);
            if(!response.data.status){
                setError(response.data.message)
            }
            setControl(!control)
        })
    }

    return (
        <>{loading? <ThreeCircles 
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
   
         />:<><Navbar />
            <div className="container md:w-6/12 mx-auto mt-4 bg-gray-50">
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
                            <a className="text-sm text-sky-500 font-bold cursor-pointer"
                                onClick={()=>setIsOpen(true)}
                            >
                                Change Profile Photo
                            </a><br/>
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
                                    defaultValue={userDetails.email}
                                    // onChange={(e) => setEmail(e.target.value)}
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
                            <div className="w-1/3 flex flex-row place-content-end align-center pr-8" />
                            <div className="w-2/3 pr-10">
                                <button
                                    className="bg-sky-500 text-white font-semibold py-1 px-2 rounded text-sm disabled:opacity-50"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </>
            </div>
            <BottomNav /></>} 
            <ChangeDP open={isOpen} onClose={() => { setIsOpen(false) }}/>
        </>
    )
}

export default EditProfile