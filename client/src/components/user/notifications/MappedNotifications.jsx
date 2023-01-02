import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { format, render, cancel, register } from 'timeago.js';
import { updateNotification } from '../../../api/userApi';
import { control } from '../../../features/auth/authSlice';


function MappedNotifications({ data }) {
    const dispatch=useDispatch()
    const handelRead=async()=>{
        console.log(data._id);
        await updateNotification(data._id)
        dispatch(control())

    }

    return (
        <>
            <main className=" container md:w-10/12 mx-auto  ">
                <div className="md:px-12 ">


                    <div className="container mx-auto">


                        <div className='  text-center  lg:px-20 '
                        onClick={handelRead}
                        >
                            <a className={`${data.read===false?` bg-zinc-300 rounded-lg flex py-3 md:px-20 hover:bg-gray-900 dark:hover:bg-zinc-200`:`bg-zinc-50 rounded-lg flex py-3 md:px-20 hover:bg-gray-500 dark:hover:bg-zinc-100`}`}>
                                <div className="pl-3 w-full flex justify-center">
                                <img className="w-11 h-11 rounded-full mr-7 "
                                        src={`http://localhost:4000/DP/${data?.userDp}`} />
                                    {data.type === 'liked' ?
                                        <div className="text-gray-500 text-base my-auto dark:text-gray-700"><span className="font-semibold text-gray-900 ">{data?.userName}</span> Liked your post</div>

                                        :data.type ==='commented'?
                                        <div className="text-gray-500 text-base my-auto dark:text-gray-700"><span className="font-semibold text-gray-900 ">{data?.userName}</span> Commented on your post</div>
                                        :
                                        <div className="text-gray-500 text-base my-auto dark:text-gray-700"><span className="font-semibold text-gray-900 ">{data?.userName}</span> Started following You</div>

                                        }
                                    <div className="my-auto text-blue-600 dark:text-blue-500 ml-7">{format(data?.time)}</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>

    )
}

export default MappedNotifications