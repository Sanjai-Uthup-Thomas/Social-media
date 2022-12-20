import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentsModal from '../../modals/comments';

function UserBody({ data }) {
  const {
    auth: { control },
  } = useSelector(state => state);
  console.log("data",data);
  const [showComments,setShowComments] = useState(false)
  const [postId,setPostId]= useState('')
  const user = localStorage.getItem("user")
    const userParse = JSON.parse(user)
    const userId = userParse.id
    useEffect(()=>{
      setShowComments(false)
    },[control])
  return (
    
    <div
      className={`relative overflow-hidden w-full pt-[100%]`}
      
    >

      <img
        src={`http://localhost:4000/images/${data.postImages}`}
        className="absolute inset-0 object-cover w-full h-full"
        onClick={(e)=>{setShowComments(true)
          setPostId(data._id)}}
      />
      {
        showComments &&
        <CommentsModal open={showComments} onClose={(e) => setShowComments(false) } postId={postId} userId={data.userId} currentId={userId} />

      }
    </div>
  )
}

export default UserBody