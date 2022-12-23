import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getSavedPosts, getUserHead, getUserPosts, userFollow, userUnfollow } from '../../../api/userApi';
import { addMessage } from '../../../features/auth/authSlice';
import Friends from '../../modals/friends';
import UserBody from './userBody';
import SavedBody from './userSaved';

function UserHead({ userId }) {
    const {
        auth: { control },
    } = useSelector(state => state);
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [open,setOpen]=useState(false)
    const [followers,setFollowers] = useState(false)
    const [name, setName] = useState([])
    const [control2, setControl] = useState(1)
    const [data, setData] = useState([])
    const [saved, setSaved] = useState([])
    const [post, setPost] = useState(true)
    const fetchData = async () => {
        await getUserHead(userId).then((response) => {
            console.log("userhead");
            setName(response.data[0])
        })
        await getUserPosts(userId).then((posts) => {
            setData(posts.data)
        })
        await getSavedPosts(userId).then((posts) => {
            setSaved(posts.data)
        })
    }
    useEffect(() => {
        console.log("name", name);
        fetchData()
    }, [userId, control2, control])

    const {
        auth: { user }
    } = useSelector(state => state)
    if (user.username === undefined) {
        var Users = JSON.parse(user)
    } else {
        Users = user
    }
    const doFollow = (data) => {
        console.log("follow", data);
        userFollow(data).then((response) => {
            console.log("follow response", response.data);
            setControl(!control2)

        })
    }

    const doUnfollow = (data) => {
        console.log("follow", data);
        userUnfollow(data).then((response) => {
            console.log("unfollow response", response.data);
            setControl(!control2)
        })
    }
    console.log("name in head", name.Following, Users?.id);

const handelMessage=()=>{
    dispatch(addMessage(userId))
    navigate('/chat')
}
    return (
        <>
            <main className="bg-zinc-100">
                <div className="grid grid-cols-3 container py-10 ">
                    <div className="bg-green p-3 rounded flex items-start justify-center">
                        <img
                            className="rounded-full"
                            src={`http://localhost:4000/DP/${name.DP}`}
                            width="150"
                        />
                    </div>
                    <div className="bg-green p-3 rounded text-gray-600 col-span-2">
                        <div className="flex items-center">
                            <h1 className="text-3xl align-bottom block">
                                {name.userName}
                            </h1>
                            {Users.id === userId ? <Link
                                as="button"
                                to={`/editprofile`}
                                className=" bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center"
                            >
                                Edit Profile
                            </Link> :
                                name.Followers?.includes(Users?.id) ?
                                    <button className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:text-slate-800 dark:bg-white h-7 items-center"
                                        onClick={(e) => doUnfollow(userId)}
                                    >Unfollow
                                    </button> :
                                    name.Following?.includes(Users?.id) ?
                                        <button className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center"
                                            onClick={(e) => doFollow(userId)}
                                        >Follow back
                                        </button> :
                                        <button className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center"
                                            onClick={(e) => doFollow(userId)}
                                        >Follow
                                        </button>



                                // <Link
                                //     as="button"
                                //     to='/follow'
                                //     className="bg-white ml-3  text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded text-sm"
                                // >
                                //     Follow
                                // </Link>
                            }
                            {/* <button type='button'
                                class='flex break-inside bg-black rounded-3xl px-8 py-4 mb-4 dark:bg-slate-800 dark:text-white w-10 h-10'>
                                <div class='flex items-center justify-between flex-1'>
                                    <span class='text-lg font-medium text-white'>Get started</span>
                                    <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path fillRule='evenodd' clipRule='evenodd'
                                            d='M0 8.71423C0 8.47852 0.094421 8.25246 0.262491 8.08578C0.430562 7.91911 0.658514 7.82547 0.896201 7.82547H13.9388L8.29808 2.23337C8.12979 2.06648 8.03525 1.84013 8.03525 1.60412C8.03525 1.36811 8.12979 1.14176 8.29808 0.974875C8.46636 0.807989 8.6946 0.714233 8.93259 0.714233C9.17057 0.714233 9.39882 0.807989 9.5671 0.974875L16.7367 8.08499C16.8202 8.16755 16.8864 8.26562 16.9316 8.3736C16.9767 8.48158 17 8.59733 17 8.71423C17 8.83114 16.9767 8.94689 16.9316 9.05487C16.8864 9.16284 16.8202 9.26092 16.7367 9.34348L9.5671 16.4536C9.39882 16.6205 9.17057 16.7142 8.93259 16.7142C8.6946 16.7142 8.46636 16.6205 8.29808 16.4536C8.12979 16.2867 8.03525 16.0604 8.03525 15.8243C8.03525 15.5883 8.12979 15.362 8.29808 15.1951L13.9388 9.603H0.896201C0.658514 9.603 0.430562 9.50936 0.262491 9.34268C0.094421 9.17601 0 8.94995 0 8.71423Z'
                                            fill='white' />
                                    </svg>
                                </div>
                            </button> */}
                            <button className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center"
                                         onClick={handelMessage}   
                                        >Message
                                        </button>

                            <a
                                className="ml-3 cursor-pointer"

                            >
                            </a>
                        </div>
                        <div className="flex-row py-5 max-w-sm hidden lg:flex">
                            <div className="basis-1/2 ">
                                <strong> {name.postNumbers}</strong> posts
                            </div>
                            <div className="basis-1/2 cursor-pointer"
                            onClick={()=>{
                                setOpen(true)
                                setFollowers(true)
                            }}
                            >
                                <strong className="mr-1">
                                    {name.Followers?.length}
                                </strong>
                                followers
                            </div>
                            <div className="basis-1/2 cursor-pointer"
                            onClick={()=>{
                                setOpen(true)
                                setFollowers(false)

                            }}
                            >
                                <strong className="mr-1">
                                    {name.Following?.length}
                                </strong>
                                following
                            </div>
                        </div>
                        <h3 className="font-bold"> {name.userName}</h3>
                        <div className="whitespace-pre-wrap">{name.Bio}</div>
                    </div>
                </div>
                <ul className="flex flex-row p-2 text-sm items-center	justify-center border-t text-gray-400 h-16 lg:hidden">
                    <li className="flex-1 text-center">
                        <b className="text-black block">
                            {name.postNumbers}
                        </b>{" "}
                        posts
                    </li>
                    <li className="flex-1 text-center cursor-pointer"
                     onClick={()=>{
                        setOpen(true)
                        setFollowers(true)
                    }}>
                        <b className="text-black block">
                            {name.Followers?.length}
                        </b>
                        followers
                    </li>
                    <li className="flex-1 text-center cursor-pointer"
                     onClick={()=>{
                        setOpen(true)
                        setFollowers(false)
                    }}>
                        <b className="text-black block">
                            {name.Following?.length}
                        </b>
                        following
                    </li>
                </ul>

                <div className="hidden lg:flex flex-row text-2xl lg:text-sm items-center justify-center border-t uppercase text-gray-400 tracking-widest h-16">
                    {Users.id === userId ? <><a
                        className={` ${post ? `border-t-2 border-black text-black` : 'text-gray-400'}
                                 flex justify-between items-center h-full mr-16 cursor-pointer`}
                        onClick={() => setPost(true)}

                    >
                        <span className="hidden lg:inline-block ml-2">
                            Posts
                        </span>
                    </a><a
                        className={`${post ? 'text-gray-400' : `border-t-2 border-black text-black`}
                                 flex justify-center items-center h-full mr-16 cursor-pointer`}
                        onClick={() => setPost(false)}
                    >
                            <span className="hidden lg:inline-block ml-2">
                                Saved
                            </span>
                        </a></> : <a
                            className={`border-t-2 border-black text-black
                                 flex justify-center items-center h-full mr-16 cursor-pointer`}

                        >
                        <span className="hidden lg:inline-block ml-2">
                            Posts
                        </span>
                    </a>}


                </div>
                <div className="container grid grid-cols-3 gap-1 lg:gap-4 lg:px-16">
                {post ?
                    data.length > 0 ?
                        data.map((data) => {
                            return (
                                
                                    <UserBody data={data} />
                                
                            )
                        }) :
                        
                               
                         <div class="text-5xl uppercase text-center mx-auto">Nothing to Show</div>
                           
                    :
                    data.length > 0 ?
                        saved.map((data) => {
                            return (
                               
                                    <SavedBody data={data} />
                            

                            )
                        }) :
                        <div class="grid grid-cols-3 grid-rows-3 place-items-center h-screen">
                            <div class="col-start-2 row-start-2 ">
                                <div class="text-5xl uppercase text-center"> Nothing to Show</div>
                            </div>
                        </div>
                }
                </div>

{open && <Friends open={open} onClose={() => { setOpen(false) }} followers={followers} userId={userId}/> }
            </main>
        </>
    )
}

export default UserHead