import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { getCommentPost, getComments } from '../../api/userApi';
import CommentsInModal from '../user/home/commentsInModal';
import ReportModal from './reportModal';

const CommentsModal = ({ open, onClose, postId,userId,currentId }) => {
    const data = postId
    const [comments, setComments] = useState([])
    const [commentPost, setCommentPost] = useState('')
    const [showReport,setShowReport] = useState(false)
    // const [postId, setPostId] = useState(PostId)
    // const [postUserId,setUserId] = useState('')



    const fetchData = () => {
        console.log(data);
        getComments(data).then((response) => {
            console.log(response)
            setComments(response.data)
        }
        )
        getCommentPost(data).then((response) =>
            setCommentPost(response.data))
    }


    useEffect(() => {
        fetchData()
    }, [])
    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50'>
                <div className='md:w-[740px] flex flex-col'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => onClose()}>X</button>
                    <div className='bg-white p-2 h-auto text-black rounded'>
                        <div className='flex'>
                            {commentPost && commentPost?.map((comments) => {
                                return (
                                    //post image in comment
                                    <div key={comments._id}><img className='w-[400px] hidden md:block p-2'
                                        src={`http://localhost:4000/images/${comments.image}`} />
                                    </div>

                                )
                            })}

                            <div className='p-2 w-[335px] md:w-1/2'>
                                <div className='overflow-y-auto h-96 pb-2'>
                                <div className=" flex justify-end">
                                <a
                                    className="cursor-pointer"
                                    onClick={()=>{
                                        console.log("three dot");
                                        setShowReport(true)
                                    }}
                               
                                >
                                    <BsThreeDotsVertical />
                                </a>
                            </div>
                                    <p>comments</p>
                                    {comments ? comments?.map((comments, index) => {
                                        return (
                                            //comments in comments
                                            <CommentsInModal comments={comments} index={index} />
                                        )
                                    }) : ""}

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
                {
                showReport &&
               <ReportModal open={showReport} onClose={() => { setShowReport(false)}} postId={postId} userId={userId} currentId={currentId} />

            }
            </div>
        )
    }
}
export default CommentsModal