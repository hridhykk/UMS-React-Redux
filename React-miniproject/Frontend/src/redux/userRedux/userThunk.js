import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToastMessage } from '../../validation/Toast';
import { Logout } from './userSlice';
const url = `http://localhost:5000/api/users`;

export const registerUser = async ({ name, email, mobile, password }) => {
  try {
    const response = await axios.post(`${url}/register`, { name, email, mobile, password }
        );
    if (response.data.status === 'emailExits') {
      showToastMessage('Email already exists', 'error');
    } else if (response.data.status === 'success') {
      return true;
    } else {
      showToastMessage('Unexpected response from server', 'error');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    showToastMessage('Registration failed. Please try again later.', 'error');
  }
};




export const authLogin = createAsyncThunk(
  'users/authLogin',
  async({email,password,toast},{rejectWithValue})=>{
   
    const response =await axios.post(`${url}/verifyLogin`,{email,password}, {
      withCredentials: true,  
    })
    
    if(response.data.status === 'usernotfound'){
      showToastMessage('User Not Found or Please Contact admin' , 'error')
      return rejectWithValue('user not found')
    }else if(response.data.status === 'incorrect'){
      showToastMessage('Incorrect Password','error')
      return rejectWithValue('incorrect password')
    }else{
     
      return response.data
      
    }
      
  }
)


export const logoutconfirm= createAsyncThunk(
  'users/logout',
  async (_, { dispatch }) => {
    try {
    
      await axios.post(`${url}/logout`, {}, { withCredentials: true });
     
      dispatch(Logout());
     
      return
    } catch (error) {
      console.error('Error during logout:', error);
      showToastMessage('Logout failed. Please try again later.', 'error');
    }
  }
);


export const profileEdit = createAsyncThunk(
  'users/profileEdit',
  async ({ formData, userId }) => {
    const response = await axios.put(`${url}/profileEdit`, {
      ...formData,
      userId
    }, {
      withCredentials: true,  
    });

    return response.data;
  }
);






export const addImage = createAsyncThunk(
  'users/addImage',
  async ({ image, userId }) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('userId', userId);

    const response = await axios.post(`${url}/addImage`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
);




