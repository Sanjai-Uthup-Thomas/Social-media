import React from 'react'
import { useDispatch } from 'react-redux'
import { blockUser } from '../../../api/adminApi'
import DPurl from '../../../api/DPapi'
import { control } from '../../../features/auth/authSlice'


function UserListMapped({ item, index }) {
    const dispatch = useDispatch()
    const submitData = async (id) => {
        try {
            const response = await blockUser(id)
            if (response) {
                dispatch(control())
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <tr key={index} className="bg-gray-100 border-b">
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.userName}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <img
                    className="rounded-full w-12 h-12"
                    src={`${DPurl}/${item.profilePhoto}`}
                    
                />
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.email}
            </td>
            {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

    </td> */}
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button onClick={() => submitData(item._id)}
                    className={`shadow ${item.Status ? 'bg-green-600 rounded-full hover:bg-green-700' : 'bg-red-600 rounded-full hover:bg-red-700'} focus:shadow-outline w-[140px] focus:outline-none text-white font-bold py-1 px-4`}>
                    {item.Status ? 'Unblock User' : 'Block User'}
                </button>
            </td>
        </tr>
    )
}

export default UserListMapped