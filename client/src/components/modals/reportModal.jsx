import React from 'react'
import { useState } from 'react';
import { postDelete, reportPost } from '../../api/userApi'

function ReportModal({ open, onClose, postId, userId, currentId }) {
    const [reason, setReason] = useState(false)
    const deletePost = (postId) => {
        console.log("postId: " + postId);
        postDelete(postId).then((response) => {
            console.log(response);
            onClose()
            setReason(false)
        })
    }
    const report = (reason, postId) => {
        const data={reason,postId}
        console.log("data and post id", data)
        reportPost(data).then((response)=>{
            console.log(response.data)
            onClose()
            setReason(false)
        })
    }
    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50'>
                <div className='w-[350px] flex flex-col'>
                    <div className='bg-white p-2 h-auto text-black rounded align-middle text-center'>
                        {userId === currentId ?
                            <div className='cursor-pointer text-red-500 text-lg'
                                onClick={() => deletePost(postId)}
                            >Delete</div> : reason ?
                                ["I just don't like it", "It's a spam", "Violence", "False information", "Something else"]?.map((data) => {
                                    return (
                                        <div className='cursor-pointer uppercase text-red-600 p-1'
                                            onClick={() => report(data, postId)}
                                        >{data}</div>
                                    )
                                })
                                :
                                <div className='cursor-pointer text-red-500 text-lg'
                                    onClick={() => setReason(true)}
                                >Report</div>}
                        <div onClick={() => onClose()} className='cursor-pointer'>Cancel</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportModal