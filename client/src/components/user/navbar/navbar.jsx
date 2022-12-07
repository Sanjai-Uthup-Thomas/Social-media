import './navbar.css'
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { RiHeartLine } from 'react-icons/ri';
import { GoSearch } from 'react-icons/go';
// import Modal from '../../modals/NewPost';
// import {createPost} from '../../../api/userApi'
import  NewPost  from '../../modals/NewPost'

function Navbar() {
    const dispatch = useDispatch()
    const logouthandel = () => {
        dispatch(logout())
    }
    const [isOpen, setIsOpen] = useState(false)
    const view = () => {
        setIsOpen(true)
    }



    return (
        <>

            <><nav className="sticky top-0 min-h-full bg-white md:w-10/12 mx-auto z-40 justify-between">
                <div className="container max-w-full">
                    <div className="flex flex-row py-1 items-center h-14">
                        <div className="md:basis-1/2 pl-3 lg:p-0 mx-auto">
                            <Link to="/">
                                <img
                                    className=""
                                    src="https://img.icons8.com/ios/2x/brave-web-browser.png"
                                    width="50"
                                />
                            </Link>
                        </div>
                        <div className="basis-1/2 hidden md:block">
                            <div className="relative">
                                <GoSearch className="absolute left-3 top-3 text-gray-300" />

                                <input
                                    id="search"
                                    className="p-2 bg-gray-100 rounded-lg w-80 pl-10 align-middle focus:outline-0 placeholder:font-light"
                                    placeholder="Search"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="basis-1/2 hidden md:block">
                            <ul className="flex flex-row space-x-4 p-2 text-2xl space-x-6 justify-end">
                                <li>
                                    <a className="cursor-pointer">
                                        <AiOutlineHome />
                                    </a>


                                </li>
                                <li>
                                    <a className="cursor-pointer" >
                                        <FaRegCommentDots />
                                    </a>
                                </li>
                                <li onClick={view}>
                                    <a
                                        className="cursor-pointer"

                                    >
                                        <  AiOutlinePlusCircle />
                                    </a>
                                </li>





                                {/* <li>
                                    <a className="cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={["far", "compass"]}
                                        />
                                    </a>
                                </li> */}
                                <li>
                                    <a className="cursor-pointer">
                                        < RiHeartLine />
                                    </a>
                                </li>
                                <li>
                                    <Menu
                                        as="div"
                                        className="relative inline-block text-left"
                                    >
                                        <div>
                                            <Menu.Button className="inline-block w-10 h-10 justify-center bg-white text-sm font-medium text-gray-700">
                                                <img
                                                    className="rounded-full"
                                                    // src={data.me.image}
                                                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                                                    width="40"
                                                />
                                            </Menu.Button>
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
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                // to={`/${data.me.username}`}
                                                                className="text-gray-700
                                                                block px-4 py-2 text-sm"
                                                            // {classNames(
                                                            //     active
                                                            //         ? "bg-gray-100 text-gray-900"
                                                            //         : "text-gray-700",
                                                            //     "block px-4 py-2 text-sm"
                                                            // )}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon="fa-solid fa-user"
                                                                    className="mr-3"
                                                                />
                                                                Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                            // {classNames(
                                                            //     active
                                                            //         ? "bg-gray-100 text-gray-900"
                                                            //         : "text-gray-700",
                                                            //     "block px-4 py-2 text-sm cursor-pointer"
                                                            // )}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon="fa-solid fa-bookmark"
                                                                    className="mr-3"
                                                                />
                                                                Saved
                                                            </a>
                                                        )}
                                                    </Menu.Item>

                                                </div>
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                className="text-gray-700 block w-full text-left px-4 py-2 text-sm cursor-pointer"
                                                                // {classNames(
                                                                //     active
                                                                //         ? "bg-gray-100 text-gray-900"
                                                                //         : "text-gray-700",
                                                                //     "block w-full text-left px-4 py-2 text-sm cursor-pointer"
                                                                // )}
                                                                // onClick={() =>
                                                                //     signOut(
                                                                //         client,
                                                                //         navigate,
                                                                //         logout
                                                                //     )
                                                                // }
                                                                onClick={logouthandel}
                                                            >
                                                                Log Out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav></>
            <NewPost open={isOpen} onClose={() => { setIsOpen(false) }}/>
            
        </>
    )
}

export default Navbar