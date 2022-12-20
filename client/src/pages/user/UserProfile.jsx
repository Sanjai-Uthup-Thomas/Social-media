import React from 'react'
import BottomNav from '../../components/user/bottomNav/bottomNav'
import UserHead from '../../components/user/home/userHead'
import Navbar from '../../components/user/navbar/navbar'

function UserProfile({ userId }) {
  return (
    <>
      <Navbar />
      <div className="container md:w-10/12 mx-auto mt-4 bg-gray-50">
        <UserHead userId={userId} />
      </div>
      <BottomNav />
    </>

  )
}

export default UserProfile