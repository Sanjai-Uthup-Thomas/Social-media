import axios from '../axios/userAxios'

export const login=(Data)=>axios.post('/login', Data)

export const checkToken=()=>axios.post(`/tokenIsValid`)

export const createPost= (Data)=>axios.post('/post',Data)

export const getPosts=()=>axios.get('/post/')

export const likePost=(Data)=>axios.patch('/likePost',Data)

export const UnlikePost=(Data)=>axios.patch('/unlikePost',Data)

export const createComment=(Data)=>axios.post('/addcomment',Data)

export const getComments=(Data)=>axios.get(`/comments/${Data}`)

export const getCommentPost=(Data)=>axios.get(`/commentpost/${Data}`)

export const getUserNames=()=>axios.get('/userNames')

export const getUserHead=(Data)=>axios.get(`/userHead/${Data}`)

export const getSearchedUser=(Data)=>axios.get(`/search/${Data}`)


export const getUserPosts=(Data)=>axios.get(`/userPosts/${Data}`)

export const getSavedPosts=(Data)=>axios.get(`/savedPosts/${Data}`)


export const getUserProfileForEdit=(Data)=>axios.get(`/getUserProfileForEdit/${Data}`)

export const postEditProfile=(userId,Data)=>axios.post(`/editProfile/${userId}`,Data)

export const changeDp=(Data)=>axios.post(`/changeDP`,Data)

//Bookmark post
export const BookmarkPost=(Data)=>axios.patch('/bookmarkPost',Data)

export const UnBookmarkPost=(Data)=>axios.patch('/unbookmarkPost',Data)

export const userFollow=(Data)=>axios.patch(`/follow/${Data}`,Data)

export const userUnfollow=(Data)=>axios.patch(`/unfollow/${Data}`,Data)

export const getSuggestions=(Data)=>axios.get(`/suggestions/${Data}`)

export const postDelete=(Data)=>axios.delete(`/deletepost/${Data}`)

export const reportPost=(Data)=>axios.patch(`/reportpost`,Data)

export const getFollowers=(Data)=>axios.get(`/getfollowers/${Data}`)

export const getFollowing=(Data)=>axios.get(`/getfollowing/${Data}`)

//chats
export const getAllChats=()=>axios.get(`/chat`)

export const createChat=(Data)=>axios.post(`/chat/${Data}`)

export const getChatList=(Data)=>axios.get(`/chat/chatlist/${Data}`)

export const getAllMessages=(Data)=>axios.get(`/message/${Data}`)

export const sendMessage=(Data)=>axios.post(`/message`,Data)

export const searchChat=(Data)=>axios.get(`/chat/search/${Data}`)

export const createNotification=(Data)=>axios.post(`/addnotification`,Data)

export const getNotification=()=>axios.get(`/getnotifications`)










































