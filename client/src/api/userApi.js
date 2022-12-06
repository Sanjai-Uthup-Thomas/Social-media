import axios from '../axios/userAxios'
const token = localStorage.getItem('token')
const header={
    headers: { "x-auth-token": token }
}
export const createPost= (Data)=>axios.post('/post',Data,header)
export const getPosts=()=>axios.get('/post')
export const likePost=(Data)=>axios.patch('/likePost',Data,header)
export const UnlikePost=(Data)=>axios.patch('/unlikePost',Data,header)