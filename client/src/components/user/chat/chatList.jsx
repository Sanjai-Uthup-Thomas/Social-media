import React, { useState } from 'react'
import { useEffect } from 'react'
import { getChatList } from '../../../api/userApi'
import { format, render, cancel, register } from 'timeago.js';



function ChatList({chat,currentUser}) {
    const [user,setUser]=useState(null)
    useEffect(()=>{
        // const friendId = chat.user.find((m)=> m!==currentUser)
        // console.log(friendId);
        const getUser=async()=>{
            try{
                const res= await getChatList(chat._id)
                // console.log(res.data);
                setUser(res.data[0])
            }catch(err){
                console.log(err)
            }
        }
        getUser()
        
    },[currentUser,chat])
    return (
        <a
            className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
            <img className="object-cover w-10 h-10 rounded-full"
                src={`http://localhost:4000/DP/${chat?.profilePhoto}`}
                />
            <div className="w-full pb-2">
                <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">{chat?.userName}</span>
                    <span className="block ml-2 text-sm text-gray-600">{format(chat?.time)}</span>
                </div>
                <span className="block ml-2 text-sm text-gray-600">{chat?.latestMessage}</span>
            </div>
        </a>
    )
}

export default ChatList