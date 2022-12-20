import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../../../api/adminApi';
import PostListMapped from './postListMapped';

function PostList() {
  const [data, setData] = useState([])
  
  const {
    auth: { control },
} = useSelector(state => state);
  const fetchData = async () => {
    const posts = await getPosts()
    // console.log(posts.data);
    setData(posts.data)
  }
  useEffect(() => {
    fetchData()
  }, [control])
  return (
    <div>
      <div class="pl-52 align-middle w-full ">
        <div class="overflow-x-auto">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      User
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">

                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Post
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Description
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Reports
                    </th>

                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
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