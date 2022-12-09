import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCommentPost, getComments } from '../../api/userApi';
import { format } from 'timeago.js';

const CommentsModal = ({ open, onClose,postId }) => {
    const data=postId
    const [comments,setComments]=useState([])
    const [commentPost,setCommentPost] = useState('')
    const fetchData=()=>{
        getComments(data).then((response)=>
        setComments(response.data))
        getCommentPost(data).then((response)=>
        setCommentPost(response.data))  
    }
    useEffect(()=>{ 
fetchData()
    },[])
    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50'>
                <div className='md:w-[750px] flex flex-col'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => onClose()}>X</button>
                    <div className='bg-white p-2 h-auto text-black rounded'>
                        <div className='flex'>
                        {commentPost && commentPost.map((comments, index) => {
                                    return (
                                        <div><img className='w-[400px] hidden md:block p-2' 
                                        src={`http://localhost:4000/images/${comments.image}`} /></div>

                                    )})}
                            
                            <div className='p-2 w-[400px] md:w-1/2'>
                                <div className='overflow-y-auto h-96 pb-2'>
                                    <p>comments</p>
                                {comments ? comments.map((comments, index) => {
                                    return (
                                        <div class="flex-col w-ful bg-white sm:rounded-lg sm:shadow-sm p-1" key={index}>
                                        <div class="flex flex-row ">
                                            <img class="w-12 h-12 border-2 border-gray-300 rounded-full" alt="User avatar" 
                                            src={`http://localhost:4000/DP/${comments.DP}`}
                                            />
                                            <div class="flex-col mt-1">
                                                <div class="flex items-center flex-1 px-4 font-bold leading-tight">{comments.userName}
                                                    <span class="ml-2 text-xs font-normal text-gray-500">{format(comments.date)}
                                                    </span>
                                                </div>
                                                <div class="flex-1 px-2 ml-2 text-sm leading-loose text-gray-600">{comments.comment}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }): <div class="flex-1 px-2 ml-2 text-sm leading-loose text-gray-600">dfghj
                                </div>}

                                </div>
                                {/* <div className="flex">
                                    <div className="flex-1 pr-3 ">
                                        <input
                                            className={`w-full px-3 py-1 text-sm bg-slate-50 outline-0`}

                                            type="text"
                                            placeholder="Add a comment..."

                                        />
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <a
                                            className="cursor-pointer text-sky-500"

                                        >
                                            Post
                                        </a>
                                    </div>
                                </div> */}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CommentsModal