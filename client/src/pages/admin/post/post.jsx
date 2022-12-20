import React from 'react'
import Sidebar from '../../../components/admin/adminSidebar/adminSidebar'
import PostList from '../../../components/admin/post/postList'


function Post() {
    return (
        <>
            <div className='flex flex-col-reverse'>
                <Sidebar />
                <PostList />
            </div>
        </>

    )
}

export default Post