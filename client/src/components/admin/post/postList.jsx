import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../../../api/adminApi';
import PostListMapped from './postListMapped';

function PostList() {
  const [data, setData] = useState([])
  
  const {
    auth: { controlState },
} = useSelector(state => state);
  const fetchData = async () => {
    const posts = await getPosts()
    // console.log(posts.data);
    setData(posts.data)
  }
  useEffect(() => {
    fetchData()
  }, [controlState])
  return (
    <div>
      <div className="pl-52 align-middle w-full ">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      User
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">

                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Post
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Description
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Reports
                    </th>

                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {
                    data.map((item) => {
                      return (
                       <PostListMapped item={item}/>
                      )
                    })
                  }


                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostList