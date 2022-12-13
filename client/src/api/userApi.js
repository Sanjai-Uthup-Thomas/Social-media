import axios from '../axios/userAxios'
import header from './header'

export const login=(Data)=>axios.post('/login', Data)

export const checkToken=(Data)=>axios.post(`/tokenIsValid`,Data,Data)

export const createPost= (Data,head)=>axios.post('/post',Data,head)

export const getPosts=()=>axios.get('/post')

export const likePost=(Data)=>axios.patch('/likePost',Data,header)

export const UnlikePost=(Data)=>axios.patch('/unlikePost',Data,header)

export const createComment=(Data)=>axios.post('/addcomment',Data,header)

export const getComments=(Data)=>axios.get(`/comments/${Data}`,header)

export const getCommentPost=(Data)=>axios.get(`/commentpost/${Data}`,header)

export const getUserNames=()=>axios.get('/userNames',header)

export const getUserHead=(Data)=>axios.get(`/userHead/${Data}`,header)

export const getSearchedUser=(Data)=>axios.get(`/search/${Data}`)


export const getUserPosts=(Data)=>axios.get(`/userPosts/${Data}`,header)

export const getSavedPosts=(Data)=>axios.get(`/savedPosts/${Data}`,header)


export const getUserProfileForEdit=(Data)=>axios.get(`/getUserProfileForEdit/${Data}`,header)

export const postEditProfile=(userId,Data)=>axios.post(`/editProfile/${userId}`,Data,header)

export const changeDp=(Data)=>axios.post(`/changeDP`,Data,header)

//Bookmark post
export const BookmarkPost=(Data)=>axios.patch('/bookmarkPost',Data,header)

export const UnBookmarkPost=(Data)=>axios.patch('/unbookmarkPost',Data,header)









