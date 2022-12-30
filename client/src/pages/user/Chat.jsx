import React from 'react'
import BottomNav from '../../components/user/bottomNav/bottomNav'
import ChatMain from '../../components/user/chat/chatMain'
import Navbar from '../../components/user/navbar/navbar'


function Chat({socket}) {

  return (
    <>
      <Navbar />
      <ChatMain socket={socket}/>
      <BottomNav />
    </>
  )
}

export default Chat