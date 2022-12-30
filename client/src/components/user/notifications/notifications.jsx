import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getNotification } from '../../../api/userApi'
import MappedNotifications from './MappedNotifications'


function NotificationsComp() {
    const [data,setData]=useState([])
    const {
        auth: { user }
    } = useSelector(state => state)
    const fetchData = async () => {
       const {data}= await getNotification()
        setData(data)
    }
    useEffect(() => {
        fetchData()
    }, [user])
    console.log(data,"data received");
    return (
        <>
        <div className='p-4'></div>
        {data && data.map((data)=>{
            return(
                <MappedNotifications data={data}/>
            )
        })}
        </>
    )
}

export default NotificationsComp