import React from 'react'
import Register from './components/user/auth/Register'
import { Route, Routes, Navigate } from 'react-router-dom'
import UserLogin from './pages/user/userLogin'
import Home from './pages/user/Home'
import UserAuth from './components/user/middleware/userAuth'
import Login from './pages/admin/Login'
import Admin from './pages/admin/Admin'
import AdminAuth from './components/user/middleware/adminAuth'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Routes>
       
        <Route path='/' element={<UserLogin/>} />
        
       
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<UserAuth><Home/></UserAuth>} />
        
    
        <Route path='/admin' element={<Login/>} />
        <Route path='/admin/home' element={<AdminAuth><Admin/></AdminAuth>} />

       
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
