import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getSuggestions, userFollow } from '../../../api/userApi'
import { control } from '../../../features/auth/authSlice';

function Suggestions({ userId }) {
    const {
        auth: { controlState,socket },
    } = useSelector(state => state);
    console.log(userId);
    const dispatch=useDispatch()

    const [loader,setLoader]=useState(true)
    const [users,setUsers]= useState([])
    const fetchData = () => {
        if(userId){
            getSuggestions(userId).then((response) => {
                console.log(response.data)
                let array=response.data.slice(1)
                setUsers(array)
                setLoader(false)
            })
        }
       
    }
    useEffect(() => {
        fetchData()
    }, [controlState])
    const doFollow = (data) => {
        console.log("follow", data);
        userFollow(data).then((response) => {
            console.log("follow response", response.data);
            dispatch(control())

        })
    }

    return (
        <>{loader?
            <div className="flex flex-col justify-center items-center w-full h-full ">
            <ThreeCircles
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs

            />
        </div> :<><div className="flex flex-row pt-3 bg-zinc-100">
                <div className="w-72 font-bold text-gray-500 text-sm bg-zinc-100">
                    Suggestions For You
                </div>
                <div className="w-32 text-sm text-right">
                    <Link to={`/suggestions`}>
                    <a className="text-black-400 font-bold text-xs cursor-pointer">
                        See All
                    </a>
                    </Link>
                    
                </div>
            </div>

            {users && users.map((data,index) => {
                return (
                    //suggestions of friends
                    <div className="flex py-2 bg-zinc-100" key={data._id}>
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
            })}</>}
            

        </>
    )
}

export default Suggestions