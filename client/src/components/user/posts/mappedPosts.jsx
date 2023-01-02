import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { format, render, cancel, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BookmarkPost, createComment, createNotification, getPosts, likePost, UnBookmarkPost, UnlikePost } from '../../../api/userApi';
import CommentsModal from '../../modals/comments';
import ReportModal from '../../modals/reportModal';
import { control } from '../../../features/auth/authSlice';


function MappedPosts({ post, index }) {
    console.log(post, "post");
    const [data, setData] = useState([])
    const [control2, setControl2] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [postId, setPostId] = useState('')
    const [postUserId, setUserId] = useState('')
    const [comment, setComment] = useState('')


    const {
        auth: { controlState, socket }
    } = useSelector(state => state)
    const user = localStorage.getItem("user")
    const userParse = JSON.parse(user)
    const userId = userParse.id
    const userName = userParse.username
    const DP = userParse.profilePhoto

    let dispatch = useDispatch()
    const doLike = (id) => {
        let data = { id }
        let details = {
            receiverId: post.userId,
            userName: userName,
            type: "liked",
            userDp: DP,
            read: false
        }
        socket?.emit("sendNotification", details)
        likePost(data).then((response) => {
            let details = {
                receiverId: post.userId,
                senderId: userId,
                postId: post.postId,
                type: "liked",
            }
            createNotification(details)
            setControl2(!control2)
            dispatch(control())
        })
    }
    const doUnLike = (id) => {
        let data = { id }
        UnlikePost(data).then((response) => {
            setControl2(!control2)
            dispatch(control())
        })
    }
    const commentSubmit = (postId) => {

        console.log("postId", postId);
        if (comment != "") {
            let details = {
                receiverId: post?.userId,
                userName: userName,
                type: "commented",
                userDp: DP,
                read: false
            }
            socket?.emit("sendNotification", details)
            const data = { postId, comment }
            createComment(data).then((response) => {
                let details = {
                    receiverId: post.userId,
                    senderId: userId,
                    postId: post.postId,
                    type: "commented",
                }
                createNotification(details)

                setComment("")
            })
        }

    }
    const doBookmark = (id) => {
        let data = { id }
        BookmarkPost(data).then((response) => {
            setControl2(!control2)
            dispatch(control())

        })
    }
    const doUnBookmark = (id) => {
        let data = { id }
        UnBookmarkPost(data).then((response) => {
            setControl2(!control2)
            dispatch(control())

        })
    }
    return (
        <div>
            <div className="border border-slate-200 mb-5 bg-zinc-100" key={post.postId}>
                <div className="px-2 flex flex-row">
                    <div className="flex-1">
                        <Link to={`/${post.userName}`}>
                            <img
                                className="rounded-full w-8 max-w-none inline "

                                src={`http://localhost:4000/DP/${post.DP}`}

                            />{" "}
                            <span className="font-medium text-sm ml-2">
                                {post.userName}
                            </span>
                        </Link>
                        {/* <a href="" className="">
                                    
                                </a> */}
                    </div>
                    <div className="">
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
                    </div>
                </div>
                <div className='pl-14 mb-2 text-base'>
                    
                         {post.description}
                    </div>
                <img
                    className="w-100 mx-auto"
                    alt={`Photo by user`}
                    src={`http://localhost:4000/images/${post.postImage}`}
                />

                <div className="header p-3 pl-8 flex flex-row text-2xl justify-between">
                    <div className="flex ">
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

                    </div>
                    <div className="">
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
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="font-medium text-sm px-3 pl-8">{post.Likes.length < 1 ? "" : `${post.Likes.length} Likes`}</div>
                    <div className="font-medium text-sm px-3 pl-8">{post.Comments.length < 1 ? "" : `${post.Comments.length} Comments`}</div>

                </div>



                <div className="text-gray-500 uppercase px-3 pl-8 pt-2 pb-5 text-[0.65rem] tracking-wide">
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
                            value={comment}
                            onChange={(e) => { setComment(e.target.value) }}
                            type="text"
                            placeholder="Add a comment..."

                        />
                    </div>
                    <div className="flex items-center text-sm">
                        <a
                            className="cursor-pointer text-sky-500"
                            onClick={() => commentSubmit(post.postId)}
                        >
                            Post
                        </a>
                    </div>
                </div>
            </div>
            {
                showComments &&
                <CommentsModal open={showComments} onClose={() => { setShowComments(false) }} postId={postId} />

            }
            {
                showReport &&
                <ReportModal open={showReport} onClose={() => { setShowReport(false) }} postId={postId} userId={postUserId} currentId={userId} />

            }
        </div>
    )
}

export default MappedPosts