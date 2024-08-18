import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import './Register.css';
import Navbar from './Navigation';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '',
    skills: '',
    password: '',
    confirmpassword: ''
  });
  
  const navigate = useNavigate(); 

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.password !== data.confirmpassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        skill: data.skill, 
        password: data.password,
        confirmpassword: data.confirmpassword
      });
      console.log('Registration successful:', response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <h1 style={{ color: "#043d7af5" }}>Sign Up</h1>
        <h3><FontAwesomeIcon icon={faUser} /> Signup into your account</h3>
        <form onSubmit={submitHandler}>
          <div className='input-group'>
            <div className='input-field'>
              <input
                type="text"
                name="name"
                className='input-field'
                placeholder="Name"
                onChange={ChangeHandler}
                required
              />
            </div>
            <div className='input-field'>
              <input
                type="email"
                name="email"
                className='input-field'
                placeholder="Email"
                onChange={ChangeHandler}
                required
              />
            </div>
            <div className='input-field'>
              <input
                type="text"
                name="mobile"
                className='input-field'
                placeholder="Mobile Number"
                onChange={ChangeHandler}
                required
              />
            </div>
            <div className='input-field'>
              <input
                type="text"
                name="skill"
                className='input-field'
                placeholder="Skills"
                onChange={ChangeHandler}
                required
              />
              <small style={{ display: 'block', marginTop: '3px' }}>Please provide skills separated by <b>(,) </b> comma</small>
            </div>
            <div className='input-field'>
              <input
                type="password"
                name="password"
                className='input-field'
                placeholder="Password"
                onChange={ChangeHandler}
                required
              />
            </div>
            <div className='input-field'>
              <input
                type="password"
                name="confirmpassword"
                className='input-field'
                placeholder="Confirm Password"
                onChange={ChangeHandler}
                required
              />
            </div>
          </div>
          <p>Already have an account <Link to='/login'>Login</Link></p>
          <button type="submit" className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;