import axios from '../axios/adminAxios'

export const getPosts=()=>axios.get('/post')

export const postBlock=(id)=>axios.patch(`/blockpost/${id}`)

export const getReportedUsers=(id)=>axios.get(`/reportedUsers/${id}`)




