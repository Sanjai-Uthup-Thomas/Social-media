import React from 'react'
import DPurl from '../../../api/DPapi'

function UsersMapped({value}) {
    return (
        <div> 
            <div className="flex-col w-ful bg-white sm:rounded-lg sm:shadow-sm p-1" key={value._id}>
            <div className="flex flex-row ">
                <img className="w-12 h-12 border-2 border-gray-300 rounded-full" alt="User avatar"
                    src={`${DPurl}/${value.userDP}`}
                />
                <div className="flex-col mt-1">
                    <div className="flex items-center flex-1 px-4 font-bold leading-tight">{value.userName}
                        {/* <span className="ml-2 text-xs font-normal text-gray-500">{format(comments.date)}
                        </span> */}
                    </div>
                    <div className="flex-1 px-2 ml-2 text-sm leading-loose text-gray-600">{value.reason}
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default UsersMapped