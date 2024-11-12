import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../../components/common/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../../redux/userRedux/userThunk';
import { toast, ToastContainer } from 'react-toastify';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

import 'react-toastify/dist/ReactToastify.css';


const backgroundImage = '/background.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData, loading, error } = useSelector((store) => store.userSlice);

  useEffect(() => {
    if (userData) {
      navigate('/home');
    }
  }, [navigate, userData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(authLogin({ email, password })).unwrap();
      navigate('/home');
    } catch (err) {
     
      toast.error(err?.message || 'Login failed. Please check your email and password.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',       // Ensures the image covers the entire container
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        backgroundPosition: 'center'   // Centers the image
      }}
    >
      <FormContainer>
        <ToastContainer />  
        <h1 className="text-center text-2xl font-semibold mb-6">Sign In</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Button
            disabled={loading}
            type="submit"
            variant="primary"
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded"
          >
            Sign In
          </Button>

        
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register" className="text-blue-500">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Login;
