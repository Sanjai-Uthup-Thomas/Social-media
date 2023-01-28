import React from 'react'
import { format, render, cancel, register } from 'timeago.js';
import DPurl from '../../../api/DPapi';


function ChatRight({ message, own }) {
  return (
    <>
      {!own ? <div className='flex justify-start'>
        <img
          src={`${DPurl}/${message?.userDP}`}
          className='w-8 h-8 rounded-full my-auto' />
        <div className='flex item-end bg-gray-200 rounded-md w-content ml-2 '>
          <div className='p-2'>
            <div className='text-sm'>{message.content}</div>
            <div className='text-xs text-gray-500'>{format(message.time)}</div>
          </div>

        </div>
      </div> : <div className='flex justify-end '>
        <div className='flex item-end  bg-gray-200 rounded-md w-content mr-2 '>

          <div className='p-2 '>
            <div className='text-sm'>{message.content}</div>
            <div className='text-xs text-gray-500'>{format(message.time)}</div>
          </div>
        </div>
        <img 
                 src={`${DPurl}/${message?.userDP}`}

         className='w-10 h-10 rounded-full my-auto' />
      </div>}


    </>)
}

export default ChatRight