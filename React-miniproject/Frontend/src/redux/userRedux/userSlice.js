import { createSlice } from "@reduxjs/toolkit";
import { addImage, authLogin, profileEdit } from "./userThunk";

import Cookies from 'js-cookie';
const data= localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null ;
const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const userSlice = createSlice({
    name : 'users',
    initialState : {
        data :data,
        token : token
    },
    reducers:{
        Logout : (state,action)=>{
            
            localStorage.removeItem('data'),
            localStorage.removeItem('token'),
           
            state.data = null,
            state.token = null
            Cookies.remove('jwt')
            
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(authLogin.fulfilled , (state,action)=>{
            const {data,token} = action.payload;
            localStorage.setItem('data' , JSON.stringify(data))
            localStorage.setItem('token',token)
            state.data = data;
            state.token = token
        })

        .addCase(addImage.fulfilled,(state,action)=>{
            const {data} = action.payload;
            localStorage.setItem('data',JSON.stringify(data))
            state.data = data
        })

        .addCase(profileEdit.fulfilled , (state,action)=>{
            const {data} = action.payload;
            localStorage.setItem('data',JSON.stringify(data))
            state.data = data
            
        })
    }
})

export const {Logout} = userSlice.actions

export default userSlice.reducer