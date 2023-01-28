import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { format, render, cancel, register } from 'timeago.js';
import { BookmarkPost, createComment, getPosts, getTagedPosts, likePost, UnBookmarkPost, UnlikePost } from '../../../api/userApi'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentsModal from '../../modals/comments';
import ReportModal from '../../modals/reportModal';
import MappedPosts from './mappedPosts';
import NewPost from '../../modals/NewPost';
import DPurl from '../../../api/DPapi';
// import { control } from '../../../features/auth/authSlice';

function Posts() {
    // const socket = require('socket.io-client')("ws://localhost:3001")
    const [data, setData] = useState([])
    const [control2, setControl2] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState('')
    const [showReport, setShowReport] = useState(false)
    const [postId, setPostId] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [postUserId, setUserId] = useState('')
    const user = localStorage.getItem("user")
    const userParse = JSON.parse(user)
    const userId = userParse.id

    const {
        auth: { controlState, tag, tagName }
    } = useSelector(state => state)
    const fetchData = async () => {
        if (tag === null) {
            const posts = await getPosts()
            setData(posts.data)
        } else {
            console.log("tag selection");
            console.log(tag);
            const posts = await getTagedPosts(tag)
            setData(posts.data)


        }


    }
    useEffect(() => {
        fetchData()
    }, [controlState, control2, user])
    const view = () => {
        setIsOpen(true)
    }



    return (
        <>{!tag &&
            <div className='w-100 h-12 mb-4 flex bg-zinc-100 border border-slate-200'
                onClick={view}
            >
                <div className=' w-10 items-center'>
                    <img
                        className="rounded-full w-10 h-10 max-w-none inline mt-1 ml-1"
                        // src="https://img.icons8.com/ios/2x/brave-web-browser.png"

                        src={`${DPurl}/${userParse.profilePhoto}`}

                    />{" "}
                </div>
                <div className='w-[620px]'>
                    <div className="flex-1 pr-3 py-1 ">
                        <input
                            className={`w-full px-3 py-auto ml-2 h-8 mt-1 text-sm  outline-0 rounded-xl`}
                            type="text"
                            placeholder="Add a post..."

                        />
                    </div>
                </div>
                <div className='w-20'>
                    <div className="flex-1 items-center flex justify-end my-2">
                        <button className="bg-black rounded-3xl  dark:bg-slate-800 dark:text-white h-8 w-20 items-center cursor-pointer text-sm">ADD POST</button>
                    </div>
                </div>
            </div>}
            {tag && <div className='w-100 h-8 mb-4 flex bg-zinc-100 rounded-xl border-slate-200 px-auto'
            ><div className=' mx-auto'>Posts with {tagName} </div></div>}
            {data && data.map((post, index) => {
                return (
                    <MappedPosts post={post} key={index} />
                )

            })}
            {
                showComments &&
                <CommentsModal open={showComments} onClose={() => { setShowComments(false) }} postId={postId} userId={postUserId} currentId={userId} />

            }
            {
                showReport &&
                <ReportModal open={showReport} onClose={() => { setShowReport(false) }} postId={postId} userId={postUserId} currentId={userId} />

            }


            <NewPost open={isOpen} onClose={() => { setIsOpen(false) }} />

        </>
    );
}
export default Posts