import React from 'react'
import { format } from 'timeago.js';

function CommentsInModal({comments,index}) {
  return (
    <div> <div class="flex-col w-ful bg-white sm:rounded-lg sm:shadow-sm p-1" key={index}>
    <div class="flex flex-row ">
        <img class="w-12 h-12 border-2 border-gray-300 rounded-full" alt="User avatar"
            src={`http://localhost:4000/DP/${comments.DP}`}
        />
        <div class="flex-col mt-1">
            <div class="flex items-center flex-1 px-4 font-bold leading-tight">{comments.userName}
                <span class="ml-2 text-xs font-normal text-gray-500">{format(comments.date)}
                </span>
            </div>
            <div class="flex-1 px-2 ml-2 text-sm leading-loose text-gray-600">{comments.comment}
            </div>
        </div>
    </div>
</div></div>
  )
}

export default CommentsInModal