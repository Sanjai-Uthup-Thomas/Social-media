import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSuggestions, userFollow } from '../../../api/userApi'

function Suggestions({ userId }) {
    const [users,setUsers]= useState([])
    const [control,setControl]=useState(false)
    const fetchData = () => {
        getSuggestions(userId).then((response) => {
            console.log(response.data)
            setUsers(response.data)
        })
    }
    useEffect(() => {
        fetchData()
    }, [control])
    const doFollow = (data) => {
        console.log("follow", data);
        userFollow(data).then((response) => {
            console.log("follow response", response.data);
            setControl(!control)

        })
    }

    return (
        <>
            <div className="flex flex-row pt-5">
                <div className="w-72 font-bold text-gray-500 text-sm">
                    Suggestions For You
                </div>
                {/* <div className="w-32 text-sm text-right">
                    <a href="#" className="text-black-400 font-bold text-xs">
                        See All
                    </a>
                </div> */}
            </div>

            {users && users.map((data,index) => {
                return (
                    //suggestions of friends
                    <div className="flex py-2" key={data._id}>
                        <div className="flex items-center">
                            <Link to={`/${data.userName}`}>
                            <div className="inline-block align-top">
                                <img
                                    className="rounded-full"
                                    src={`http://localhost:4000/DP/${data.profilePhoto}`}
                                    width="35"
                                />
                                
                            </div>
                            <div className="inline-block ml-2">
                                <div className="text-sm font-medium">
                                    {data.userName}
                                </div>
                                <div className="text-gray-500 text-xs">
                                    Suggested for you
                                </div>
                            </div>
                            </Link>
                            
                        </div>
                        <div className="flex-1 items-center flex justify-end ">
                            <a

                                className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5 dark:bg-slate-800 dark:text-white h-7 items-center cursor-pointer"
                                onClick={(e) => doFollow(data._id)}
                            >
                                Follow
                            </a>
                            {/* <Follow user={user} /> */}
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default Suggestions