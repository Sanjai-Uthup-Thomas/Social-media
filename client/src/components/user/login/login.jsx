import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInUser } from '../../../features/auth/authSlice'
function Login() {
    const navigate=useNavigate()
    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")
    const dispatch = useDispatch()
    const {
        auth: { msg },
      } = useSelector(state => state);
    const handelLogin =()=>{
        console.log(email,password)
        dispatch(signInUser({email,password})).then((res)=>{
            console.log(res.payload.data.token);
            if(res.payload.data.token!==undefined){
                navigate('/home')
            }
        })
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
              {msg &&<span className='text-center text-red-400'>{msg}</span>}
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">Email</label>
                      <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                      value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-700">Password</label>
                      <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </div>
                  <div className="flex items-center justify-end">
                      
                      {/* <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                  </div>
                  <button onClick={handelLogin} className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-900 dark:text-gray-700">
                      Don’t have an account yet? 
                      <Link to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up</Link>
                  </p>
            
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default Login