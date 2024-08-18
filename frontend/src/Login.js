import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import './Login.css';
import Navbar from './Navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        toast.success('Logged in successfully!');
        setAuth(true);
      })
      .catch(err => console.log(err));
  };

  if (auth) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Log In</h1>
        <h3><FontAwesomeIcon icon={faUser} /> Login into your account</h3>
        <form onSubmit={submitHandler}>
          <div className='input-group'>
            <div className='input-field'>
              <input
                type="email"
                name="email"
                className='input-field'
                placeholder="Email"
                required
                onChange={ChangeHandler}
              />
            </div>
            <div className='input-field'>
              <input
                type="password"
                name="password"
                className='input-field'
                placeholder="Password"
                required
                onChange={ChangeHandler}
              />
            </div>
           
          </div>
          <p>Don't have an account <Link to='/register'>register</Link></p>
          <button type="submit" className='btn btn-primary'>Submit</button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
