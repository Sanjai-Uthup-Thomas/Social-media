import React from 'react'
import ChatLeft from './chatLeft'
import ChatRight from './chatRight'

function ChatMain() {
    return (
        <main className=" grid grid-cols-2 container md:w-10/12 mx-auto pt-8 bg-zinc-100  ">
            <div className="md:px-12 col-span-3 lg:col-span-2">


            <div class="container mx-auto">
      <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
        
        <ChatLeft/>
        <ChatRight/>
        
      </div>
    </div>



            </div>
        </main>
    )
}

export default ChatMain