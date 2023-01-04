import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { forgetPassword } from '../../../api/userApi';
import Otp from './otp';

function ForgetPassword() {
    const [value, setValue] = useState()
    const [UID,setUID]=useState()
    const [open,setOpen] = useState(false)
    const handelForgetPassword = () => {
        console.log("value", value);
        const data = { data: value }
        console.log(data);
        forgetPassword(data).then((res) => {
            console.log(res.data); 
            if(res?.data?.msg==="sucessfully"){
                setUID(res?.data?._id)
                setOpen(true)
            }else{

            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <img
                        className="pb-2"
                        src="https://img.icons8.com/ios/2x/brave-web-browser.png"
                        width="70"

                    />

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <p className="text-center text-sm font-bold leading-tight tracking-tight text-gray-900 md:text-sm dark:text-blue-700">
                                Enter Email, Phone Number or Username <br/>to reset password
                            </p>


                            <div>

                                <input type="text" id="forget" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            <div className="flex items-center justify-end">

                            <Link to='/'>
                            <a className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"> Back to Login</a>

                               </Link>
                            </div>
                            </div>


                            <button onClick={() => handelForgetPassword()} className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5">Submit</button>

                        </div>
                    </div>
                </div>
                {open && <Otp open={open} onClose={() => { setOpen(false) }}  userId={UID}/> }
            </section>
        </>
    )
}

export default ForgetPassword