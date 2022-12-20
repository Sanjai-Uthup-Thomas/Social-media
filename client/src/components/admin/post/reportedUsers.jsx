import React, { useState } from 'react'
import { useEffect } from 'react';
import { getReportedUsers } from '../../../api/adminApi'
import UsersMapped from './usersMapped';

function ReportedUsers({ open, onClose, postId }) {
    const [data, setData] = useState([])
    const fetchData = async () => {
        const data = await getReportedUsers(postId)
        setData(data.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    if (!open) { return null } else {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50'>
                <div className='w-[400px] flex flex-col'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => onClose()}>X
                    </button>
                    <div className='bg-white p-2 h-[500px] text-black rounded align-middle text-center uppercase overflow-y-auto'>
                        {
                            data.length > 0 ? data.map((value) => <UsersMapped value={value} />) :
                                <div class="place-items-center mt-52 h-100">

                                    <div class="text-2xl uppercase text-center text-gray-800"> No one reported this post</div>

                                </div>}
                    </div>
                </div>
            </div>

        )
    }
}

export default ReportedUsers