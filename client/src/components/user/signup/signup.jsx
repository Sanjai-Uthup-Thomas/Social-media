import React from 'react'
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from '../../../features/auth/authSlice'
import { useForm } from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';





function SignUp() {
    const navigate = useNavigate()
    const[error,setError]=useState('')


    const formSchema = Yup.object().shape({
        userName:Yup.string()
        .required("User Name is required")
        .matches( /[!0-9@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/,"Invalid User Name"),
    
        phoneNumber: Yup.string()
        .required("Phone Number is required")
        .min(10, "Password length should be at least 10 characters")
        .max(10, "Password cannot exceed more than 10 characters")
        .matches(/^[6-9]{1}[0-9]{9}$/,"must be numbers"),

        email:Yup.string()
        .required("Email is required")
        .matches( /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Invalid Email ID"),


        password: Yup.string()
          .required("Password is required")
          .min(4, "Password length should be at least 4 characters")
          .max(12, "Password cannot exceed more than 12 characters"),
          confirmPassword: Yup.string()
          .required("Confirm Password is required")
          .min(4, "Password length should be at least 4 characters")
          .max(12, "Password cannot exceed more than 12 characters")
          .oneOf([Yup.ref("password")], "Passwords do not match")
      });

    
    let {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
      })
   const dispatch =useDispatch()
    const onSub = async (data,e)=>{
        e.preventDefault()
        dispatch(signUpUser(data)).then((response)=>{
            if(!response.payload.msg){
                navigate('/OTPverification')
            }else{
                setError(response.payload.msg)
            }
           
        }) 
        
        
    }

  return (
    <>
    <section className="bg-gray-50 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <img
                                    className="p-2"
                                    src="https://img.icons8.com/ios/2x/brave-web-browser.png"
                                    width="70"
                                    
                                />
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-sm dark:text-blue-700">
                  Sign-up to connect with your Friends
              </h1>
              <span className="text-red-600">{error}</span>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSub)}>
              <div>
                      <label for="UserName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">User Name</label>
                      <input type="text" id="UserName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="User Name" 
                      {...register("userName")}/>
                         {errors.userName && (
                            <span className="text-red-600">{errors.userName.message}</span>
                        )}
                  </div>
                  <div>
                      <label for="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">Phone Number</label>
                      <input type="tel" name="PhoneNumber" id="PhoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXXXXXXXXX"
                      {...register("phoneNumber")}/>
                            {errors.phoneNumber && (
                            <span className="text-red-600">{errors.phoneNumber.message}</span>
                        )}
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">Email</label>
                      <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"  
                      {...register("email")}/>
                              {errors.email && (
                            <span className="text-red-600">{errors.email.message}</span>
                        )}
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                      {...register("password")}/>
                        {errors.password && (
                            <span className="text-red-600">{errors.password.message}</span>
                        )}
                  </div>
                  <div>
                      <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">Confirm Password</label>
                      <input type="password" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                      {...register("confirmPassword")}/>
                      {errors.confirmPassword && (
                            <span className="text-red-600">{errors.confirmPassword.message}</span>
                        )}
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                  <p className="text-sm font-light text-gray-900 dark:text-gray-700">
                      Already have an account? 
                      <Link to='/' className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Login</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default SignUp