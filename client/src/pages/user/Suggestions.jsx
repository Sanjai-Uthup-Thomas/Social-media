import React from 'react'
import BottomNav from '../../components/user/bottomNav/bottomNav'
import Navbar from '../../components/user/navbar/navbar'
import NotificationsComp from '../../components/user/notifications/notifications'
import SuggestionsComp from '../../components/user/Suggestions/SuggestionsComp'

function Suggestions() {

    return (
        <>
            <Navbar />
            <SuggestionsComp/>
            <BottomNav />
        </>

    )
}

export default Suggestions