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
import Modal from '../../modals/modal';
import axios from 'axios';

function Navbar() {
    // const { 
    //     auth: { user },
    //   } = useSelector(state => state);
    //   console.log(user.username);
    // const navigate = useNavigate();
    const dispatch = useDispatch()
    const logouthandel = () => {
        console.log("hai");
        dispatch(logout())
    }
    const [isOpen, setIsOpen] = useState(false)
    const view = () => {
        console.log("hai");
        setIsOpen(true)
    }

    const [form, setForm] = useState({
        description: "",
        postImage: ""
    })
    const handleChange = e => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }
    const fileUpload = (e) => {
        const img = e.target.files[0]
        setForm({
            ...form,
            Posts: img
        })
    }
    const submit = (e) => {
        e.preventDefault()
        console.log("dfghjk");
        const Data = new FormData()
        for (let key in form) {
            Data.append(key, form[key])
        }
        axios.post("http://localhost:4000/post", Data).then((response) => {
            console.log(response);
            setIsOpen(false)
        })
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
            <Modal open={isOpen} onClose={() => { setIsOpen(false) }}>
                {
                    <div>
                        <p className='text-black'>Create New Post</p>
                        <div >
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div ><img className='pl-14' src='https://cdn.iconscout.com/icon/free/png-256/cloud-upload-1912186-1617655.png' /></div>
                                <div>
                                    <textarea
                                        type="text"
                                        className="p-1 px-5 mt-3 w-full outline-0 h-30"
                                        placeholder="Write a caption..."
                                        name='description'
                                        onChange={handleChange}


                                    />
                                    <input type='file' name='Image' onChange={fileUpload} />

                                </div>
                                <div>

                                    <button className="bg-gray-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-2" type="submit">
                                        Post
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                }

            </Modal>
        </>
    )
}

export default Navbar