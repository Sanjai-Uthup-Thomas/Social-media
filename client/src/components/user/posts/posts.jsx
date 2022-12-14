import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { format, render, cancel, register } from 'timeago.js';
import { BookmarkPost, createComment, getPosts, likePost, UnBookmarkPost, UnlikePost } from '../../../api/userApi'
import CommentsModal from '../../modals/comments';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReportModal from '../../modals/reportModal';
// import { control } from '../../../features/auth/authSlice';




function Posts() {
    const [data, setData] = useState([])
    const [control2, setControl2] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const [showReport,setShowReport] = useState(false)
    const [postId, setPostId] = useState('')
    const [comment, setComment] = useState('')
    const [postUserId,setUserId] = useState('')
    const user = localStorage.getItem("user")
    const userParse = JSON.parse(user)
    const userId = userParse.id

    const {
        auth: { control }
    } = useSelector(state => state)
    const fetchData = async () => {


        const posts = await getPosts()
        console.log(posts.data);
        setData(posts.data)
    }
    useEffect(() => {
        fetchData()
    }, [control2, control])
    const doLike = (id) => {
        let data = { id }
        likePost(data).then((response) => {
            setControl2(!control2)
        })
    }
    const doUnLike = (id) => {
        let data = { id }
        UnlikePost(data).then((response) => {
            setControl2(!control2)
        })
    }
    const commentSubmit = (postId) => {
        if (comment != "") {
            const data = { postId, comment }
            createComment(data).then((response) => {
                setComment("")
            })
        }

    }
    const doBookmark = (id) => {
        let data = { id }
        BookmarkPost(data).then((response) => {
            setControl2(!control2)
        })
    }
    const doUnBookmark = (id) => {
        let data = { id }
        UnBookmarkPost(data).then((response) => {
            setControl2(!control2)
        })
    }


    return (
        <>
            {data && data.map((post, index) => {
                return (
                    //posts
                    <div className="border border-slate-200 mb-5" key={post._id}>
                        <div className="p-3 flex flex-row">
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
                                <a
                                    className="cursor-pointer"
                                    onClick={()=>{
                                        console.log("three dot");
                                        setShowReport(true)
                                        setPostId(post._id)
                                        setUserId(post.userId)
                                    }}
                               
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
                                    post.Likes.includes(userId) ?
                                        <a
                                            className="mr-3 text-red-600 cursor-pointer"
                                            onClick={(e) => { doUnLike(post._id) }}
                                        >
                                            <AiOutlineLike />
                                        </a> : <a
                                            className="mr-3 text-black cursor-pointer"
                                            onClick={(e) => { doLike(post._id) }}

                                        >
                                            <AiOutlineLike />
                                        </a>
                                }





                                <a
                                    className="mr-3 hover:text-gray-500 cursor-pointer"
                                    onClick={(e) => {
                                        setShowComments(true)
                                        setPostId(post._id)
                                    }}
                                >
                                    <FaRegComment />
                                </a>

                            </div>
                            <div className="">
                            {
                                    // post.Likes.length > 0 ?
                                    post.Bookmarks.includes(userId) ?
                                        <a
                                            className="mr-3  cursor-pointer"
                                            onClick={(e) => {doUnBookmark(post._id) }}
                                        >
                                            <FiBookmark className='fill-black' />
                                        </a> : <a
                                            className="mr-3 text-black cursor-pointer"
                                            onClick={(e) => { doBookmark(post._id) }}

                                        >
                                            <FiBookmark className='' />
                                        </a>
                                }
                            </div>
                        </div>
                        <div className="font-medium text-sm px-3">{post.Likes.length < 1 ? "" : `${post.Likes.length} Likes`}</div>
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
                                    value={comment}
                                    onChange={(e) => { setComment(e.target.value) }}
                                    type="text"
                                    placeholder="Add a comment..."

                                />
                            </div>
                            <div className="flex items-center text-sm">
                                <a
                                    className="cursor-pointer text-sky-500"
                                    onClick={() => commentSubmit(post._id)}
                                >
                                    Post
                                </a>
                            </div>
                        </div>
                    </div>

                )

            })}
            {
                showComments &&
                <CommentsModal open={showComments} onClose={() => { setShowComments(false) }} postId={postId} />

            }
            {
                showReport &&
               <ReportModal open={showReport} onClose={() => { setShowReport(false)}} postId={postId} userId={postUserId} currentId={userId} />

            }
            


        </>
    );
}
export default Posts