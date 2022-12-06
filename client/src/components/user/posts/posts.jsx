import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import axios from 'axios';
import { format, render, cancel, register } from 'timeago.js';




function Posts() {
    const [data, setData] = useState([])
    const [control,setControl] = useState(true)
    const user=localStorage.getItem("user")
    const userParse= JSON.parse(user)
    const userId=userParse.id

    console.log("userId",userId);
    const fetchData=async()=>{
        const posts=await axios.get('http://localhost:4000/post')
        console.log(posts.data);
        setData(posts.data)
    }
    useEffect(() =>{
        fetchData()
    },[control])
    const doLike=(id)=>{
        console.log(id);
        const token = localStorage.getItem('token')
        let data={id}
         axios.patch('http://localhost:4000/likePost',data,{
            headers: { "x-auth-token": token }}).then((response)=>{
        console.log(response);
        setControl(!control)
        })
    }
    const doUnLike=(id)=>{
        console.log(id);
        const token = localStorage.getItem('token')
        let data={id}
         axios.patch('http://localhost:4000/unlikePost',data,{
            headers: { "x-auth-token": token }}).then((response)=>{
        console.log(response);
        setControl(!control)
        })
    }


  return (
    <>
    {data && data.map((post,index)=>{
        return(
            <div className="border border-slate-200 mb-5" key={index}>
            <div className="p-3 flex flex-row">
                <div className="flex-1">
                    <a href="" className="">
                        <img
                            className="rounded-full w-8 max-w-none inline "
                            src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
                        />{" "}
                        <span className="font-medium text-sm ml-2">
                            {post.userName}
                        </span>
                    </a>
                </div>
                <div className="">
                    <a
                        className=""
                        href="#"
                        // onClick={() => setIsModalOpen(true)}
                    >
                        <BsThreeDots />
                    </a>
                </div>
            </div>
            <img
                className="w-100 mx-auto"
                alt={`Photo by sanjai_uthup`}
                src={`http://localhost:4000/images/${post.postImage}`}
            />
      
            <div className="header p-3 flex flex-row text-2xl justify-between">
                <div className="flex ">
                    {
                        // post.Likes.length > 0 ?
                         post.Likes.includes(userId)? 
                         <a
                        className="mr-3 text-red-600 cursor-pointer"
                         onClick={(e)=>{doUnLike(post._id)}}
                    >
                         <AiOutlineLike />
                    </a>:  <a
                        className="mr-3 text-black cursor-pointer"
                        onClick={(e)=>{doLike(post._id)}}
                        
                    >
                         <AiOutlineLike />
                    </a>
                    }
                
                  
                   
                       
                    
                    <a
                        className="mr-3 hover:text-gray-500 cursor-pointer"
                        
                    >
                        <FaRegComment />
                    </a>
                  
                </div>
                <div className="">
                    <a
                        className="cursor-pointer hover:text-gray-500"
                        
                    >
                       <FiBookmark/>
                    </a>
                </div>
            </div>
            <div className="font-medium text-sm px-3">{post.Likes.length<1?"":`${post.Likes.length} Likes`}</div>
            <div className="px-3 text-sm">
                <span className="font-medium">{post.userName}</span> {post.description}
            </div>
          
      
            <div className="text-gray-500 uppercase px-3 pt-2 pb-5 text-[0.65rem] tracking-wide">
                {format(post.date)}
            </div>
      
            <div className="px-3 py-2 flex flex-row border-t relative">
                
                <div className="flex items-center">
                    <a className="text-2xl cursor-pointer">
                       
                    </a>
                </div>
                <div className="flex-1 pr-3 py-1">
                    <input
                        className={`w-full px-3 py-1 text-sm bg-slate-50 outline-0`}
                       
                        type="text"
                        placeholder="Add a comment..."
                       
                    />
                </div>
                <div className="flex items-center text-sm">
                    <a
                        className= "cursor-pointer text-sky-500"
                                
                       
                    >
                        Post
                    </a>
                </div>
            </div>
        </div>

        )
    
    })}



            

           

    </>
  );
}
export default Posts