import React from 'react'

function TopTenTags({data}) {
  return (
    <div className="flex py-2 my-auto bg-zinc-100 justify-between" >
                                    <div className="flex ">
                                        {data?._id}
                                    </div>
                                    <div>{data?.count} posts</div>

                                </div>
  )
}

export default TopTenTags