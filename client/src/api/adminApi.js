import axios from '../axios/adminAxios'

export const getUsers=()=>axios.get(`/userlist`)

export const blockUser=(id)=>axios.patch(`/blockuser/${id}`)

export const getPosts=()=>axios.get('/post')

export const postBlock=(id)=>axios.patch(`/blockpost/${id}`)

export const getReportedUsers=(id)=>axios.get(`/reportedUsers/${id}`)




