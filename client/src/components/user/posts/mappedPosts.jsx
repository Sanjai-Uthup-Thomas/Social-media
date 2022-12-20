import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { format, render, cancel, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getPosts, likePost, UnlikePost } from '../../../api/userApi';
import CommentsModal from '../../modals/comments';

function MappedPosts({ post, index }) {
    const [data, setData] = useState([])
    const [control2, setControl2] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const [postId, setPostId] = useState('')
    const [comment, setComment] = useState('')
    const user = localStorage.getItem("user")
    const userParse = JSON.parse(user)
    const userId = userParse.id

    const {
        auth: { control }
    } = useSelector(state => state)
    let dispatch=useDispatch()
    const fetchData = async () => {
        const posts = await getPosts()
        setData(posts.data)
    }
    
    useEffect(() => {
        fetchData()
    }, [control2, control])
    const doLike = (id) => {
        let data = { id }
        likePost(data).then((response) => {
            setControl2(!control2)
            dispatch(control)
        })
    }
    const doUnLike = (id) => {
        let data = { id }
        UnlikePost(data).then((response) => {
            setControl2(!control2)
            dispatch(control)
        })
    }
    const commentSubmit = (postId) => {
        console.log("postId",postId);
        if (comment != "") {
            const data = { postId, comment }
            createComment(data).then((response) => {
                setComment("")
            })
        }

    }
    return (
        <div><div className="border border-slate-200 mb-5" key={post._id}>
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
                        post.Likes.includes(userId) ?
                            <a
                                className="mr-3 text-red-600 cursor-pointer"
                                onClick={(e) => { doUnLike(post.postId) }}
                            >
                                <AiOutlineLike />
                            </a> : <a
                                className="mr-3 text-black cursor-pointer"
                                onClick={(e) => { doLike(post.postId) }}

                            >
                                <AiOutlineLike />
                            </a>
                    }





                    <a
                        className="mr-3 hover:text-gray-500 cursor-pointer"
                        onClick={(e) => {
                            setShowComments(true)
                            setPostId(post.postId)
                        }}
                    >
                        <FaRegComment />
                    </a>

                </div>
                <div className="">
                    <a
                        className="cursor-pointer hover:text-gray-500"

                    >
                        <FiBookmark />
                    </a>
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

            }</div>
    )
}

export default MappedPosts