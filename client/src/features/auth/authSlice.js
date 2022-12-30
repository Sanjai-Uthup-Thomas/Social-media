import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


// import {signUpHandler} from './helpers/signUpHandler'

const initialState ={
    msg:"",
    user: JSON.parse(localStorage.getItem("user")) || "",
    token: localStorage.getItem("token") || "",
    admin_token: localStorage.getItem("admin-auth-token") || "",
    loading:false,
    error:"",
    signup:false,
    controlState:0,
    userId:null,
    socket:null,
}
export const signInAdmin = createAsyncThunk('signInAdmin',async (body)=>{
    const res = await axios.post('http://localhost:4000/admin/adminLogin',body)
  
    if(res){
        console.log("res");
        console.log(res);
        
    }else{
        console.log("no res");
       
    }
    
    return res
})
export const signUpUser = createAsyncThunk('signUpUser',async (body)=>{
    const res = await axios.post('http://localhost:4000/signup',body) 
    return res.data
})
 
export const signInUser = createAsyncThunk('signInUser',async (body)=>{
    const res = await axios.post('http://localhost:4000/login',body)
    if(res){
        console.log("res");
        console.log(res);
    }else{
        console.log("no res");
    }
    
    return res
})

const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.token=localStorage.getItem('token')
        },
        addUser:(state,action)=>{
            state.user=localStorage.getItem('user')
        },
         logout:(state,action)=>{
            console.log("hello world");
            state.token=null
            localStorage.setItem('token',"")
            localStorage.removeItem('user')
        },
        adminLogout:(state,action)=>{
            state.admin_token=null
            localStorage.setItem('admin-auth-token',"")
        },
        control:(state,action)=>{
            state.controlState+=1
        },
        addMessage:(state,action)=>{
            // console.log(action.payload,"action.payload");
            state.userId=action.payload
        },
        removeId:(state,action)=>{
            state.userId=null
        },
        socketUpdate:(state,action)=>{
            console.log(action.payload,"action.payload");
            state.socket=action.payload
        }
    },
    extraReducers:{
        //admin-login
        [signInAdmin.pending]:(state,action)=>{
            state.loading = true
        },
        [signInAdmin.fulfilled]:(state,{payload:{error,data}})=>{
            state.loading = false
            if(error){
                state.error=error
            }else{
                state.admin_token=data.token
                state.error=data.msg
                localStorage.setItem('admin-auth-token',data.token)
            }
           
        },
        [signInAdmin.rejected]:(state,action)=>{
            state.loading = true
        },
        //login
        [signInAdmin.pending]:(state,action)=>{
            state.loading = true
        },
        [signInUser.fulfilled]:(state,{payload:{error,data}})=>{
            state.loading = false
            if(error){
                state.error=error
            }else{
                state.token=data.token
                state.user=data.user
                state.msg=data.msg
                localStorage.setItem('user',JSON.parse(data.user))
                localStorage.setItem('token',data.token)
            }          
        },
        [signInUser.rejected]:(state,action)=>{
            state.loading = true
        },
        //signup
        [signUpUser.pending]:(state,action)=>{
            state.loading = true
        },
        [signUpUser.fulfilled]:(state,{payload})=>{
            state.loading = false           
                state.user=payload
                state.signup=true            
        },
        [signUpUser.rejected]:(state,action)=>{
            state.loading = true
        }
    }
})
export const {addToken,addUser,logout,adminLogout,control,addMessage,removeId,socketUpdate}= authSlice.actions
export default authSlice.reducer