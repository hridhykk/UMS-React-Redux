import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormContainer from '../../../components/common/FormContainer';
import userRegValidation from '../../../validation/userValidation';
import { registerUser } from '../../../redux/userRedux/userThunk';
import { showToastMessage } from '../../../validation/Toast';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const userValidation = userRegValidation({ name, email, mobile, password, confirmPassword, toast });
    if (userValidation === true) {
      const response = await registerUser({ name, email, mobile, password, toast });
      if (response === true) {
        showToastMessage('Account created successfully', 'success');
        setTimeout(() => {
          navigate('/');
        }, 250);
      }
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/backgroundregister.jpg)' }}
    >
      <FormContainer>
        <ToastContainer />
        <h1 className="text-center text-2xl font-semibold mb-6">Create your Account</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </Form.Group>

          <Form.Group controlId="mobile" className="mt-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <div className="relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </span>
            </div>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <div className="relative">
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </span>
            </div>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded"
          >
            Sign Up
          </Button>
        </Form>

        <Row className="py-3">
          <Col className="text-center">
            Already have an account? <Link to="/" className="text-blue-500">Sign In</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Register;
