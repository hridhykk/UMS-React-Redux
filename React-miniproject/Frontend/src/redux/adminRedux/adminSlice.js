import {createSlice} from '@reduxjs/toolkit'
import { adminLogin, deleteUser, editUser, fetchData } from './adminThunk';

const token =localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : null;
const userData = localStorage.getItem('userData')? JSON.parse(localStorage.getItem('userData')) : [];

const adminSlice = createSlice({
    name:'admin',
    initialState :{
        token:token,
        userData:userData
    },
    reducers:{
        Logout:(state,action)=>{
            localStorage.removeItem('adminToken')
            localStorage.removeItem('userData')

            state.token =null
            state.userData =[]
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(adminLogin.fulfilled,(state,action)=>{
            const {userData,token} = action.payload
            localStorage.setItem('adminToken',token)
            localStorage.setItem('userData',JSON.stringify(userData))

            state.token = token
            state.userData =userData
        })

        .addCase(fetchData.fulfilled,(state,action)=>{
            try {
                const data = action.payload.data
                console.log(data,"data in slice");
                localStorage.setItem('userData',JSON.stringify(data))
                state.userData= data
            } catch (error) {
                console.log(error.message);
            }
        })

        .addCase(editUser.fulfilled,(state,action)=>{
            const {name,userId,is_blocked} = action.payload
            console.log(name,userId,is_blocked,'edit slicew');
            state.userData = state.userData.map((user)=> user._id == userId ? {...user , name,is_blocked} : user)
            console.log(state.userData,'stae user data');
        })

        .addCase(deleteUser.fulfilled,(state,action)=>{
            const userId = action.payload
            
            state.userData =  state.userData.filter((user)=>user._id !== userId)
            localStorage.setItem('userData', JSON.stringify(state.userData));
        })
    }
    
})


export const {Logout} = adminSlice.actions;

export default adminSlice.reducer