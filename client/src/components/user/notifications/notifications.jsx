import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getNotification } from '../../../api/userApi'
import MappedNotifications from './MappedNotifications'


function NotificationsComp() {
    const [data, setData] = useState([])
    // const [array, setArray] = useState([])
    const {
        auth: { user, controlState, socket }
    } = useSelector(state => state)
    const fetchData = async () => {
        const { data } = await getNotification()
        setData(data)
    }
    useEffect(() => {
        fetchData()
    }, [user, controlState])
    useEffect(() => {
        socket?.on("getNotification", (data) => {
            setTimeout(() => {
                fetchData()
                // console.log("getNotification", DATA);
              }, 100);
            
            // console.log("getNotification", data);
            // setData((prev) => [data, ...prev])
            // console.log(data);
          
        })
        //   console.log("array", data);
        //     function onlyUnique(value, index, self) {
        //         return self.indexOf(value) === index;
        //     }
        //     var unique = data.filter(onlyUnique);
        //     console.log("unique", unique);
        //     setData(unique)
        // console.log(data.length);
    }, [socket]) 
    console.log(data, "data received");
    return (
        <>
            <div className='p-4'>

            </div>
            {data && data.map((data) => {
                return (
                    <MappedNotifications data={data} />
                )
            })}
           
        </>
    )
}

export default NotificationsComp