import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getUserPosts } from '../../../api/userApi';
import UserBody from './userBody';

function UserHead({ name, userId }) {
    const [data,setData] = useState([])
    const fetchData = async() => {
       
        await getUserPosts(userId).then((posts)=>{
            setData(posts.data)
        })
    }
    useEffect(() => {
        console.log(name);
        fetchData()
    }, [name])

    const {
        auth: {user}
    } = useSelector(state => state)
    if(user.username===undefined){
        var Users=JSON.parse(user)
      }else{
         Users=user
      }
      
    return (
        <>
            <main className="bg-zinc-50">
                <div className="grid grid-cols-3 container py-10 ">
                    <div className="bg-green p-3 rounded flex items-start justify-center">
                        <img
                            className="rounded-full"
                            src={`http://localhost:4000/DP/${name.DP}`}
                            // src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                            width="150"
                        />
                    </div>
                    <div className="bg-green p-3 rounded text-gray-600 col-span-2">
                        <div className="flex items-center">
                            <h1 className="text-3xl align-bottom block">
                                {name.userName}
                            </h1>
                            {Users.id===userId? <Link
                                as="button"
                                to={`/editprofile`}
                                className="bg-white ml-3  text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded text-sm"
                            >
                                Edit Profile
                            </Link>: <Link
                                as="button"
                                to='/follow'
                                className="bg-white ml-3  text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded text-sm"
                            >
                                Follow
                            </Link>}
                           
                            <a
                                className="ml-3 cursor-pointer"

                            >
                            </a>
                        </div>
                        <div className="flex-row py-5 max-w-sm hidden lg:flex">
                            <div className="basis-1/2 ">
                                <strong> {name.postNumbers}</strong> posts
                            </div>
                            <div className="basis-1/2">
                                <strong className="mr-1">
                                    120
                                </strong>
                                followers
                            </div>
                            <div className="basis-1/2">
                                <strong className="mr-1">
                                    120
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
                            200
                        </b>{" "}
                        posts
                    </li>
                    <li className="flex-1 text-center">
                        <b className="text-black block">
                            200
                        </b>
                        followers
                    </li>
                    <li className="flex-1 text-center">
                        <b className="text-black block">
                            200
                        </b>
                        following
                    </li>
                </ul>

                <div className="hidden lg:flex flex-row text-2xl lg:text-xs items-center justify-center border-t uppercase text-gray-400 tracking-widest h-16">
                    <a
                        className={`"text-black border-t border-black"
                                 flex justify-center items-center h-full mr-16 cursor-pointer`}

                    >
                        <span className="hidden lg:inline-block ml-2">
                            Posts
                        </span>
                    </a>

                </div>
                <div className="container grid grid-cols-3 gap-1 lg:gap-4 lg:px-16">
                    {data.map((data) => {
                        return <UserBody data={data}/>
                    })}
                </div>
            </main>
        </>
    )
}

export default UserHead