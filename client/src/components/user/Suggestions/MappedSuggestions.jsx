import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNotification, userFollow } from '../../../api/userApi';
import { control } from '../../../features/auth/authSlice';


function MappedSuggestion({ data }) {
    const dispatch=useDispatch()
    const {
        auth: { controlState,socket },
    } = useSelector(state => state);
    const user = localStorage.getItem("user")
    const userParse = JSON.parse(user)
    const doFollow = (data) => {
        console.log("follow", data);
        let details = {
            receiverId:data._id,
            senderId: userParse?.id,
            postId: null,
            type: "followed",
        }
        let detail = {
            receiverId:data?._id,
            userName:userParse.username,
            type: "followed",
            userDp: userParse.profilePhoto,
            read:false,
            time:Date.now().toString()

        }
        socket?.emit("sendNotification", detail)
        userFollow(data).then((response) => {
            console.log("follow response", response.data);

            createNotification(details)
            dispatch(control())

        })
    }
    return (
        <>
        <Link  to={`/${data.userName}`}>
        <main className=" container md:w-10/12 mx-auto  ">
                <div className="md:px-12 ">


                    <div className="container mx-auto">


                        <div className='  text-center  lg:px-20 '
                        
                        >
                            <a className={`bg-zinc-100 rounded-lg flex py-3 md:px-20 hover:bg-gray-900 dark:hover:bg-zinc-200`}>
                                <div className="pl-3 w-full flex justify-center">
                                    <div className='my-auto'>

                                <img className="w-11 h-11 rounded-full mr-7 "
                                        src={`http://localhost:4000/DP/${data?.profilePhoto}`} 
                                        alt='dfgh'
                                        />
                                    </div>
                                   
                                    <div className="text-gray-500 text-base my-auto dark:text-gray-700">{data.userName}</div>
                            <div className="flex-1 items-center flex justify-end ">
                            <a

                                className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center cursor-pointer"
                                onClick={(e) => doFollow(data._id)}
                            >
                                Follow
                            </a>
                            {/* <Follow user={user} /> */}
                        </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </Link>
            
        </>

    )
}

export default MappedSuggestion