import React from 'react'
import Sidebar from '../../../components/admin/adminSidebar/adminSidebar'
import UserList from '../../../components/admin/user/userList'

function User() {
    return (
        <>
            <div className='flex flex-col-reverse'>
                <Sidebar /><UserList />
                
            </div>
        </>

    )
}

export default User