import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestPost } from '../../../api/userApi';


function LatestPost() {
    const [post, setPost] = useState({})
    const fetchData = () => {
        getLatestPost().then((res) => {
            let { data } = res
            console.log(data);
            setPost(data[0])
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className=''>
            <div className=" w-72 font-bold text-gray-500 text-sm bg-zinc-100">Latest Post</div>
            <div>
                <div className="border border-slate-200 bg-zinc-100 scroll-mx-4 p-2 mt-3    " >
                    <div className="flex flex-row">
                        <div className="flex-1">
                            <Link to={`/${post.userName}`}>
                                <div className='flex'>

                                <img
                                    className="rounded-full w-8 h-8 max-w-none inline "

                                    src={`http://localhost:4000/DP/${post.DP}`}
                                // src='https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'

                                />{" "}
                                {/* <div className=''> */}
                                <div className="ml-3 ">
                                    <span className="text-sm font-semibold antialiased block leading-tight"> {post.userName}</span>
                                    <span className="text-gray-600 text-xs block">{post.Location}</span>
                                    <div className='text-xs'></div>

                                </div>
                                </div>
                                {/* </div> */}

                            </Link>
                            {/* <a href="" className="">
                                    
                                </a> */}
                        </div>

                        {/* <div className="">
                        {post.Reports.includes(userId) ? "" :
                            <a
                                className="cursor-pointer"
                                onClick={() => {
                                    console.log("three dot");
                                    setShowReport(true)
                                    setPostId(post.postId)
                                    setUserId(post.userId)
                                }}

                            >
                                <BsThreeDots />
                            </a>}
                    </div> */}
                    </div>

                    <div className='text-base ml-2 py-1'>

                        {post.description}
                    </div>
                    <img
                        className="w-100 h-50 mx-auto"
                        alt={`Photo by user`}
                        src={`http://localhost:4000/images/${post.postImage}`}
                    // src='http://localhost:4000/images/1671863067995--71KCwNV6MuL._SX679_.jpg'
                    // src='https://plus.unsplash.com/premium_photo-1672301522681-9ef472626c7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                    />

                    <div className="header flex flex-row text-2xl justify-between">
                        {/* <div className="flex ">
                        {
                            // post.Likes.length > 0 ?
                            post.Likes.includes(userId) ?
                                <a
                                    className="mr-3 text-red-600 cursor-pointer"
                                    onClick={(e) => { doUnLike(post.postId) }}
                                >
                                    <AiOutlineLike size={30} />
                                </a> : <a
                                    className="mr-3 text-black cursor-pointer"
                                    onClick={(e) => { doLike(post.postId) }}

                                >
                                    <AiOutlineLike size={30} />
                                </a>
                        }





                        <a
                            className="mr-3 hover:text-gray-500 cursor-pointer"
                            onClick={(e) => {
                                setShowComments(true)
                                setPostId(post.postId)

                            }}
                        >
                            <FaRegComment size={30} />
                        </a>

                    </div> */}
                        {/* <div className="">
                        {
                            // post.Likes.length > 0 ?
                            post.Bookmarks.includes(userId) ?
                                <a
                                    className="mr-3  cursor-pointer text-red-600"
                                    onClick={(e) => { doUnBookmark(post.postId) }}
                                >
                                    <FiBookmark size={30} />
                                </a> : <a
                                    className="mr-3"
                                    onClick={(e) => { doBookmark(post.postId) }}

                                >
                                    <FiBookmark size={30} />
                                </a>
                        }
                    </div> */}
                    </div>
                    <div className='flex justify-between'>
                        {/* <div className="font-medium text-sm px-3 pl-8">{post.Likes.length < 1 ? "" : `${post.Likes.length} Likes`}</div>
                    <div className="font-medium text-sm px-3 pl-8">{post.Comments.length < 1 ? "" : `${post.Comments.length} Comments`}</div> */}

                    </div>



                    {/* <div className="text-gray-500 uppercase text-[0.65rem] tracking-wide">
                    1:23
                </div> */}
                    {/* 
                <div className=" flex flex-row border-t relative">

                    
                    
                   
                </div> */}
                </div>

            </div>
        </div>
    )
}

export default LatestPost