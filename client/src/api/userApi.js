import axios from '../axios/userAxios'
const token = localStorage.getItem('token')
const header={
    headers: { "x-auth-token": token }
}
export const createPost= (Data)=>axios.post('/post',Data,header)
export const getPosts=()=>axios.get('/post')
export const likePost=(Data)=>axios.patch('/likePost',Data,header)
export const UnlikePost=(Data)=>axios.patch('/unlikePost',Data,header)
export const createComment=(Data)=>axios.post('/addcomment',Data,header)
export const getComments=(Data)=>axios.get(`/comments/${Data}`,header)
export const getCommentPost=(Data)=>axios.get(`/commentpost/${Data}`,header)

export const getUserNames=()=>axios.get('/userNames',header)

export const getUserHead=(Data)=>axios.get(`/userHead/${Data}`,header)
export const getUserPosts=(Data)=>axios.get(`/userPosts/${Data}`,header)
export const getUserProfileForEdit=(Data)=>axios.get(`/getUserProfileForEdit/${Data}`,header)

export const postEditProfile=(userId,Data)=>axios.post(`/editProfile/${userId}`,Data,header)
export const changeDp=(Data)=>axios.post(`/changeDP`,Data,header)




