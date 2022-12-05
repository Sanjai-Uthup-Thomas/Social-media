import React, { useState } from 'react'
import OTPInput from "otp-input-react";
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SignupOTP() {
  const navigate = useNavigate()
  const {
    auth: { user },
  } = useSelector(state => state);
 
  const [OTP, setOTP] = useState("");
  const handelSubmit = async(e) => {
    e.preventDefault()
    console.log(user);
    if (user === "") {
      navigate('/signup')
    }
    if (OTP.length === 4) {
    let data={
      ...user,
      OTP:OTP
    }
    console.log(data);
    let res=await axios.post('http://localhost:4000/otpverify',data)
    if(res){
      console.log(res);
      navigate('/')
    }
  } else {
    console.log("enter a valid otp");
    navigate('/signup')
  }
  }
  

  

  return (
    <>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-700">
                Logo
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <label for="OTP" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700 text-center">Enter OTP</label>
                <div className='flex justify-center'>
                  <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure className='dark:border-gray-700' />
                </div>


                <button onClick={handelSubmit} className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>

              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
export default SignupOTP