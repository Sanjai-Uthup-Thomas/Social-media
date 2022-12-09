import React, { useEffect, useState } from 'react'
import { getUserHead } from '../../api/userApi'
import BottomNav from '../../components/user/bottomNav/bottomNav'
import UserHead from '../../components/user/home/userHead'
import Navbar from '../../components/user/navbar/navbar'

function UserProfile({userId}) {
    const[user,setUser]=useState([])
    const fetchData=async()=>{
        await getUserHead(userId).then((response)=>{
            setUser(response.data[0])
        })
    }
    useEffect(()=>{
        fetchData()
    },[userId])


  return (
    <> <Navbar/>
    <div className="container md:w-10/12 mx-auto mt-4 bg-gray-50"><UserHead name={user} userId={userId}/></div>
    <BottomNav/>
    </>
   
  )
}

export default UserProfile