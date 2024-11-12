import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

import adminValidation from '../../validation/adminValidation';
import { adminLogin } from '../../redux/adminRedux/adminThunk';

import FormContainer from '../../components/common/FormContainer'; 

const AdminLogin = () => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const userData = useSelector((store) => store.adminSlice.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.length > 0) {
      navigate('/admin/home');
    }
  }, [userData]);

  const togglePasswordVisibility = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = adminValidation({ email, password, toast });
    if (isValid) {
      dispatch(adminLogin({ email, password, toast }));
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url("/background.jpg")` }}>
      <ToastContainer />
      <FormContainer> 
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-5">
          Login To Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-3">
            <label htmlFor="email" className="text-md text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="border-b-2 w-full h-8 focus:outline-none focus:border-gray-900 placeholder-gray-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-3 relative">
            <label htmlFor="password" className="text-md text-gray-700">
              Password
            </label>
            <input
              type={open ? 'password' : 'text'}
              id="password"
              className="border-b-2 w-full h-8 focus:outline-none focus:border-gray-900 placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute top-2 right-2">
              {open ? (
                <IoIosEyeOff onClick={togglePasswordVisibility} className="h-5 w-5 text-gray-500 cursor-pointer" />
              ) : (
                <IoIosEye onClick={togglePasswordVisibility} className="h-5 w-5 text-gray-500 cursor-pointer" />
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-gray-900 text-white rounded w-28 h-8">
              Sign In
            </button>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default AdminLogin;
