import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFollowers, getFollowing, userFollow, userUnfollow } from '../../api/userApi'

function Friends({ open, onClose, followers, userId }) {

    const [data, setData] = useState([])
    const fetchData = async () => {
        // console.log("fetchData");
        // console.log(followers);
        if (followers) {
            // console.log(userId);
            const result = await getFollowers(userId)
            if (result) {
                // console.log("result of followers", result.data)
                setData(result.data)
            }
        } else {
            const result = await getFollowing(userId)
            if (result) {
                // console.log("result of following", result.data)
                setData(result.data)

            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50'
            ><div className='w-[400px] flex flex-col'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => onClose()}>X</button>
                    <div className='bg-white p-2 h-[500px] text-black rounded align-middle text-center uppercase overflow-y-auto'>
                        <div> {followers ? "followers" : "following"} </div>
                        {data.map((name) => {
                            return (
                                <div key={data} className='p-1'>
                                    <div className="flex-col w-ful bg-white sm:rounded-lg sm:shadow-sm p-1 cursor-pointer">
                                        <Link to={`/${name.userName}`}>
                                            <div className="flex flex-row ml-5 " onClick={() => onClose()}>
                                                <img className="w-12 h-12 border-2 border-gray-300 rounded-full" alt="User avatar"
                                                    src={`http://localhost:4000/DP/${name.profilePhoto}`}
                                                />
                                                <div className="flex-col mt-3">
                                                    <div className="flex items-center flex-1 px-4 font-normal leading-tight">{name.userName}
                                                    </div>

                                                </div>
                                                {/* <a className="bg-black rounded-3xl px-4 mb-4 mt-5 ml-5
                                 dark:bg-slate-800 dark:text-white h-7 items-center cursor-pointer"
                                            >
                                                Follow
                                            </a> */}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        )
    }
}

export default Friends