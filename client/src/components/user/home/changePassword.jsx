import React from 'react'
import { useForm } from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setNewPassword } from '../../../api/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePassword() {
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
        formState:{errors},
    }=useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
      })
      const onSub =(data,e)=>{
        console.log(data);
        setNewPassword(data).then((res)=>{
            toast.success('Password Changed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
      }
  return (
    <form onSubmit={handleSubmit(onSub)} >
    <div className="flex flex-row mt-5 items-center">
        <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
            <label className="m-0 p-0 align-baseline font-bold flex align-center">
                New Password
            </label>
        </div>
        <div className="w-2/3 pr-10">
            <input
                type="password"
                className="border p-1 px-3 w-full"
                placeholder="Password"
              {...register("password")}/>
                        {errors.password && (
                            <span className="text-red-600">{errors.password.message}</span>
                        )}

        </div>
    </div>
    <div className="flex flex-row mt-5 items-center">
        <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
            <label className="m-0 p-0 align-baseline font-bold flex align-center">
                Confirm Password
            </label>
        </div>
        <div className="w-2/3 pr-10">
        <input
                type="password"
                className="border p-1 px-3 w-full"
                placeholder="Password"
                {...register("confirmPassword")}/>
                {errors.confirmPassword && (
                    <span className="text-red-600">{errors.confirmPassword.message}</span>
                )}
        </div>
    </div>
    
    
    <div className="flex flex-row mt-5 items-center">
        <div className="w-1/3 flex flex-row place-content-end align-center pr-8" />
        <div className="w-2/3 pr-10  flex">
            <button
                className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center"
                type="submit"
            >
                Change
            </button>
            
            
          
        </div>
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
</form>
  )
}

export default ChangePassword