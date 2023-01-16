import React from 'react'
import { useDispatch } from 'react-redux';
import { addTag, addTagName, control } from '../../../features/auth/authSlice';

function TopTenTags({ data }) {
  const dispatch=useDispatch()
  const handelTags = () => {
    console.log(data?.tag);
    dispatch(addTag(data?.tag))
    dispatch(addTagName(data?._id))
    dispatch(control())
  }
  return (
    <div className="flex py-2 my-auto bg-zinc-100 justify-between" key={data._id} >
      <div className="flex cursor-pointer"
        onClick={(e) => handelTags()}>
        {data?._id}
      </div>
      <div>{data?.count} posts</div>

    </div>
  )
}

export default TopTenTags