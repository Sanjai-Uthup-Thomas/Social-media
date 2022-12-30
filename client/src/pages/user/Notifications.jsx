import React from 'react'
import BottomNav from '../../components/user/bottomNav/bottomNav'
import Navbar from '../../components/user/navbar/navbar'
import NotificationsComp from '../../components/user/notifications/notifications'

function Notifications() {

    return (
        <>
            <Navbar />
            <NotificationsComp/>
            <BottomNav />
        </>

    )
}

export default Notifications