import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postBlock } from '../../../api/adminApi'
import { control } from '../../../features/auth/authSlice'
import ReportedUsers from './reportedUsers'

function PostListMapped({item}) {
    const dispatch=useDispatch()
    const[open,setOpen]=useState(false)
    const[postId,setPostId]=useState('')
    const submitData = async (id) => {
        const response = await postBlock(id)
        if (response) {
            dispatch(control())
          }
    
      }
    return (
        <tr key={item._id} className="bg-gray-100 border-b">
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.userName}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <img
                    className="rounded-full"
                    // src={data.me.image}
                    src={`http://localhost:4000/images/${item.postImage}`}
                    // src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                    width="50"
                />
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.description}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer"
            onClick={()=>{
                setOpen(true)
                setPostId(item._id)
            }}
            >
                {item.Reports.length}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button onClick={() => submitData(item._id)}
                            className={`shadow ${item.Status ? 'bg-green-600 rounded-full hover:bg-green-700' : 'bg-red-600 rounded-full hover:bg-red-700'} focus:shadow-outline w-[140px] focus:outline-none text-white font-bold py-1 px-4`}>
                            {item.Status ? 'Unblock Post' : 'Block Post'}
                          </button>
            </td>
            {open && <ReportedUsers open={open} onClose={() => { setOpen(false) }} postId={postId}/>}
        </tr>
    )
}

export default PostListMapped