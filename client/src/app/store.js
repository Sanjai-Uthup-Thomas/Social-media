import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import recentChatReducer from '../features/RecentChat/Reducer'
import chattingReducer from '../features/chatting/Reducer'
import notyficationReducer from '../features/notification/Reducer'

export default configureStore({
    reducer: {
        auth: authReducer,
        // sidebar:sidebarReducer
        recentChat: recentChatReducer,
        chatting: chattingReducer, 
        notification: notyficationReducer,
    }
})