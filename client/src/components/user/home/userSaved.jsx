import React from 'react'
import { useState } from 'react';
import CommentsModal from '../../modals/comments';

function SavedBody({ data }) {
  const [showComments,setShowComments] = useState(false)
  const [postId,setPostId]= useState('')
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
        <CommentsModal open={showComments} onClose={(e) => setShowComments(false) } postId={postId} />

      }
    </div>
  )
}

export default SavedBody