import React, { useState } from 'react'
import OTPInput from "otp-input-react";
import { useForm } from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpLogin } from '../../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Otp({ open, onClose, userId }) {
    const [OTP, setOTP] = useState("");
    const Navigate = useNavigate()
    // const [error, setError] = useState('')
    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password length should be at least 4 characters")
            .max(12, "Password cannot exceed more than 12 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords do not match")
    });
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    })
    const onSub = async (data,e) => {
        e.preventDefault()
        
        const DATA = {
            userId: userId,
            otp: OTP,
            password:data.password 
        }
        console.log(DATA);
        const result=await otpLogin(DATA)
        console.log(result.data);
        if(result.data===true){
            toast.success('Password Updated', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                Navigate('/')
                
              }, 2000);
            
        }else{
            toast.success('Wrong OTP', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
       
    } 
    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'
            ><div className='w-[400px] flex flex-col'>
                    <button className='text-black text-xl place-self-end'
                        onClick={() => onClose()}>X</button>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSub)}>

                        <div className='dark:bg-gray-300 p-5 h-[400px] text-black rounded align-middle text-center overflow-y-auto'>
                            <label for="OTP" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700 text-center">Enter OTP</label>
                            <div className='flex justify-center'>
                                <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure className='dark:border-gray-700' />
                            </div>
                            <div className='p-2'>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("password")} />
                                {errors.password && (
                                    <span className="text-red-600">{errors.password.message}</span>
                                )}
                            </div>
                            <div className='p-2'>
                                <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">Confirm Password</label>
                                <input type="password" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("confirmPassword")} />
                                {errors.confirmPassword && (
                                    <span className="text-red-600">{errors.confirmPassword.message}</span>
                                )}
                            </div>


                            <button type='submit' className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Submit</button>
                        </div>
                    </form>

                </div>
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
            </div>
        )
    }
}

export default Otp