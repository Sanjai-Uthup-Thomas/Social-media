import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { createChat, getAllChats, getAllMessages, searchChat, sendMessage } from '../../../api/userApi'
import ChatRight from './chatRight'
import ChatList from './chatList'
// import { io } from 'socket.io-client'
import SearchValue from './searchValue'
import DPurl from '../../../api/DPapi'


function ChatMain() {
  const [search, setSearch] = useState(null)
  const [chat, setChat] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [Messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [toSocket, setToSocket] = useState(null)
  const [fromSocket, setFromSocket] = useState(null)
  const [responsive, setResponsive] = useState(false)
  // const socket = useRef()

  const scrollRef = useRef()
  const {
    auth: {  userId,socket }
  } = useSelector(state => state)
  const userParse = localStorage.getItem("user")
    const  user= JSON.parse(userParse)
  // console.log(user.id)
  // console.log(socket, "socket")
  const searchUser = async (e) => {
    const searchValue = e.target.value;
    if (searchValue) {
      const { data } = await searchChat(searchValue)
      if (data) {
        // console.log(data);
        setSearch(data)
        setChat()
        // console.log(chat);
      }

    } else {
      setSearch(null)
    }
  };
  useEffect(() => {
    if (userId) {
      handelCreateChat(userId)
      setToSocket(null)
    }
    // socket.current = io("ws://localhost:3001")
    socket?.on("getMessage", data => {
      console.log(socket,"getMessage"); 
      console.log(data,"getting");
      setFromSocket({
        sender: data.senderId,
        content: data.text,
        time: Date.now(),
        userDP: data.userDP
      })
      console.log("get message from socket");
    }) 
  }, [socket])
  useEffect(() => {
    fromSocket && currentChat?.users.includes(fromSocket.sender) &&
      setMessages((prev) => [...prev, fromSocket])
    // console.log("currentChat", currentChat);
  }, [fromSocket, currentChat])
useEffect(() => {
    const getChats = async () => {
      if (search) {
        setChat([]);
      } else {
        try {
          const result = await getAllChats()
          // console.log(result.data);
          setChat(result.data);
        } catch (e) {
          console.log(e);
        }
      }

    }
    getChats()
  }, [user.id, Messages, search])
  useEffect(() => {
    const getMessages = async () => {
      try {

        const res = await getAllMessages(currentChat?._id)
        // console.log(res.data);
        if (res.data.name === "CastError") {

        } else {
          console.log(res.data);

          setMessages(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getMessages()
  }, [currentChat,socket])
  // console.log(chat);
  // console.log(currentChat);
  // console.log(Messages);
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (newMessage) {
      const message = {
        sender: user.id,
        content: newMessage,
        chat: currentChat._id
      }
      console.log(message);

      try {
        const res = await sendMessage(message)
        console.log([...Messages, res.data[0]]);
        setToSocket(res.data)
        setMessages([...Messages, res.data[0]]);
        console.log(Messages);
        setNewMessage('');
      } catch (e) {
        console.log(e);
      }
      const receiverId = currentChat.users.find(member => member !== user.id)
      console.log("receiverId", receiverId);
      socket?.emit("sendMessage", {
        senderId: user.id,
        receiverId,
        text: newMessage,
        userDP: user.profilePhoto
      })
      console.log("sending message");
      console.log(socket); 
    }

  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [Messages])
  const handelCreateChat = async (id) => {
    setResponsive(true)
    console.log(id);
    const { data } = await createChat(id)
    // console.log(data);
    setCurrentChat(data)
  }
  const handelSelectChat = (item) => {
    setCurrentChat(item)
    setResponsive(true)
  }
  return (
    <main className=" grid grid-cols-2 container md:w-10/12 mx-auto pt-8 bg-zinc-100">
      <div className="md:px-12 col-span-3 lg:col-span-2">


        <div className="container mx-auto">
          <div className="min-w-full border rounded lg:grid lg:grid-cols-3">

            <div className= {`${responsive ? 'hidden' : ''} border-r border-gray-300 lg:col-span-1 lg:block`}>
              <div className="mx-3 my-3 border rounded-lg">
                <div className="relative text-gray-600">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 " onClick={() => { setSearch(null) }}>
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </span>
                  <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" onChange={searchUser} />
                </div>
              </div>

              <ul className="overflow-auto h-[32rem]">
                <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                <li>
                  {search && search.map((items) => {
                    return (
                      <div onClick={() => handelCreateChat(items._id)}>
                        <SearchValue value={items} />
                      </div>
                    )
                  })}
                </li>
                <li>
                  {chat && chat?.map((item) => {
                    return (
                      <div onClick={() => { handelSelectChat(item) }

                      } key={item._id}>
                        <ChatList chat={item} currentUser={user.id} />
                      </div>
                    )
                  })}
                </li>
              </ul>
            </div>
            {currentChat ?
              <div className={`${responsive ? '' : 'hidden'} lg:col-span-2 lg:block`}>
                <div className="w-full">
                  <div className="relative flex items-center p-3 border-b border-gray-300">
                    <button className="inline-flex items-center justify-center w-8 h-8 mr-2 text-gray-700 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-gray-200 lg:hidden"
                      onClick={() => setResponsive(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                        aria-describedby="desc" role="img" xlink="http://www.w3.org/1999/xlink">
                        <title>Arrow Left</title>
                        <desc>A solid styled icon from Orion Icon Library.</desc>
                        <path data-name="layer1"
                          fill="#202020" d="M28.001 48L12 32l16.001-16 4.242 4.243-8.759 8.758H52v6H23.486l8.757 8.757L28.001 48z"></path>
                      </svg>
                    </button>
                    <img className="object-cover w-10 h-10 rounded-full"
                      src={`${DPurl}/${currentChat?.profilePhoto}`} alt="userName"
                    />
                    <span className="block ml-2 font-bold text-gray-600">{currentChat?.userName}</span>
                    {/* <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                    </span> */}
                  </div>
                  <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                    <div className="space-y-2">
                      {Messages?.map((m) => (
                        <div ref={scrollRef}>
                          <ChatRight message={m} own={m?.UID === user.id} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                    {/* <button>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button> */}
                    {/* <button>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button> */}

                    <input type="text"
                      placeholder="Message"
                      className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    />
                    {/* <button>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button> */}
                    <button onClick={handelSubmit}>
                      <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              :
              <span className='hidden lg:col-span-2 lg:block text-gray-700 text-center text-4xl my-auto'>Start Chatting Now</span>}

          </div>
        </div>



      </div>
    </main>
  )
}

export default ChatMain