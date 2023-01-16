import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, removeId } from '../../../features/auth/authSlice';
import NewPost from '../../modals/NewPost';
import { Link, useNavigate } from 'react-router-dom';
import SearchBot from './searchBot';
import { getNotificationsCount } from '../../../api/userApi';
function BottomNav() {
    const {
        auth: { socket, controlState }
    } = useSelector(state => state)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [data, setData] = useState()
    const navigate = useNavigate()
    const view = () => {
        setIsOpen(true)
    }
    const search = () => {
        setIsSearch(true)
    }
    const home = () => {
        navigate(`/home`)
    }
    const chat = () => {
        dispatch(removeId())
        navigate(`/chat`)
    }
    const logouthandel = () => {
        dispatch(logout())
    }
    useEffect(() => {
        socket?.on("getNotification", (DATA) => {
            setTimeout(() => {
                fetchNOtifications()
            }, 100);
        })
    }, [socket, data])
    const fetchNOtifications = async () => {
        try {
            const { data } = await getNotificationsCount()
            setData(data.length)
        } catch (e) {
            navigate('/error')
        }
    }
    useEffect(() => {
        fetchNOtifications()
    }, [socket, controlState])
    const user = localStorage.getItem("user")
    const users = JSON.parse(user)
    const Menus = [
        { name: "Home", icon: "home-outline", dis: "translate-x-0", clickHandler: home },
        { name: "Profile", icon: "search-outline", dis: "translate-x-16", clickHandler: search },
        { name: "create", icon: "add-circle-outline", dis: "translate-x-32", clickHandler: view },
        { name: "Chat", icon: "chatbubble-outline", dis: "translate-x-48", clickHandler: chat },
    ];
    return (
        <div className='sticky bottom-2 w-full max-h-[3rem] lg:hidden block '>

            <div className="flex justify-center items-center">
                <div className="bg-white max-h-[4rem] px-6 rounded-t-xl">
                    <ul className="flex relative">
                        <span
                            className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-myShadow1"
                        ></span>
                        <span
                            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
                        ></span>
                        {Menus.map((menu, i) => (
                            <li key={i} className="w-16">
                                <a
                                    className="flex flex-col text-center pt-6"
                                    onClick={menu.clickHandler}

                                >
                                    <span
                                        className={`text-xl cursor-pointer duration-500 
                                        
                                            `}
                                    >
                                        <ion-icon name={menu.icon} size="large"></ion-icon>
                                    </span>



                                </a>
                            </li>
                        ))}
                        <li className="w-16">
                            <Menu
                                as="div"
                                className="flex flex-col text-center pt-5"
                            >
                                <div>
                                    <Menu.Button className=" w-10 h-10 justify-center bg-white text-sm font-medium text-gray-700">
                                        <img
                                            className="rounded-full border-black"
                                            src={`http://localhost:4000/DP/${users?.profilePhoto}`}

                                            width="40"
                                        />
                                    </Menu.Button>
                                    {data > 0 && <div className="inline-flex absolute  right-1 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">{data}</div>
                                    }
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-6 bottom-12 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div

                                                        className="text-gray-700
                                                                block px-4 py-2 text-lg"
                                                    >
                                                        {`HAI ${users.username}`}
                                                    </div>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (

                                                    <Link
                                                        to={`/${users.username}`}
                                                        className="text-gray-700
                                                                block px-4 py-2 text-sm"
                                                    >
                                                        Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (

                                                    <Link
                                                        to={`/notifications`}
                                                        className="text-gray-700
                                                                block px-4 py-2 text-sm"
                                                    >
                                                        Notifications
                                                        {data > 0 && <div className="inline-flex absolute  right-4 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">{data}</div>
                                                        }
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">

                                            <a
                                                className="text-gray-700 block w-full  px-4 py-2 text-sm cursor-pointer"
                                                onClick={logouthandel}
                                            >
                                                Log Out
                                            </a>

                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </li>

                    </ul>
                </div>
            </div>


            <NewPost open={isOpen} onClose={() => { setIsOpen(false) }} />
            <SearchBot open={isSearch} onClose={() => { setIsSearch(false) }} />

        </div>

    )
}

export default BottomNav