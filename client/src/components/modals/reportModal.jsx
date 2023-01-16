import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDelete, reportPost } from '../../api/userApi'
import { control } from '../../features/auth/authSlice';

function ReportModal({ open, onClose, postId, userId, currentId }) {
    // console.log(`potId ${postId} userId ${userId} currentId ${currentId}`);
    const [reason, setReason] = useState(false)
    const dispatch = useDispatch()

    const deletePost = (postId) => {
        // console.log("postId: " + postId);
        postDelete(postId).then((response) => {
            // console.log(response);
            onClose()
            setReason(false)
            dispatch(control())

        })
    }
    const report = async (reason, postId) => {
        const data = { reason, postId }
        // console.log("data and post id", data)
        await reportPost(data).then((response) => {
            // console.log(response)
            onClose()
            setReason(false)
            dispatch(control())

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