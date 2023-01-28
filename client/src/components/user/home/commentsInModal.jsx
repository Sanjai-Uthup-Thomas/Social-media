import React from 'react'
import { format } from 'timeago.js';
import DPurl from '../../../api/DPapi';

function CommentsInModal({comments,index}) {
  return (
    <div> <div className="flex-col w-ful bg-white sm:rounded-lg sm:shadow-sm p-1" key={index}>
    <div className="flex flex-row ">
        <img className="w-12 h-12 border-2 border-gray-300 rounded-full" alt="User avatar"
            src={`${DPurl}/${comments.DP}`}
        />
        <div className="flex-col mt-1">
            <div className="flex items-center flex-1 px-4 font-bold leading-tight">{comments.userName}
                <span className="ml-2 text-xs font-normal text-gray-500">{format(comments.date)}
                </span>
            </div>
            <div className="flex-1 px-2 ml-2 text-sm leading-loose text-gray-600">{comments.comment}
            </div>
        </div>
    </div>
</div></div>
  )
}

export default CommentsInModal