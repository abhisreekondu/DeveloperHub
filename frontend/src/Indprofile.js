import React, { useState, useEffect } from 'react';
import { Link, Navigate,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IoLogoGithub } from "react-icons/io";
import './Indprofile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Indprofile = () => {
  const { name, email, mobile, skill, id } = useParams();
  console.log(useParams())
  const [data, setData] = useState(null);
  const [rating, setRating] = useState('');
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('no token');
      return;
    }
    const headers = {
      'x-token': token,
    };
    console.log('Request Headers:', headers);

    axios
      .get('http://localhost:5000/myprofile', { headers })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

 

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
   
  }

  const handleRatingChange = (e) => {
    setRating(e.target.value);
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      await axios.post('http://localhost:5000/addreview', { 
        taskworker: id, 
        rating: rating 
      }, {
        headers: { 'x-token': token }
      });
      toast.success('Review added successfully!');
      setRating('');
     } catch (err) {
      console.log(err);
      toast.error('Failed to add review. Please try again.');
    }
  };

  return (
    <div>
      <nav>
        <h1 color='white'>
          <FontAwesomeIcon icon={faCode} style={{ color: '#ffffff' }} />
          <Link to='/'>Developers Hub</Link>
        </h1>
        <ul>
          <li>
            <Link to='/myprofile'>My Profile</Link>
          </li>
          <li>
            <Link to='/login' onClick={() => {
              localStorage.removeItem('token');
              toast.success('Logged out successfully!');
            }}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      <section>
        <Link to='/dashboard' className='btn btn-outline-primary mt-3 mx-3 p-2 '>Back to Profiles</Link>

        {data && (
          <div className='card'>
            <img
              className='userimg'
              src="data:image/png;base64,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"
              alt='User'
            />
            <div className="profile-details">
              <h4 className="profile-name">Name: {name}</h4>
              <h6 className="profile-email">Email: {email}</h6>
              <h6 className="profile-mobile">Mobile: {mobile}</h6>
              <h6 className="profile-skill">Skills:</h6>
              <ul className="skills-list">
                {skill.split(',').map((skill, index) => (
                  <li key={index}>
                    <p className='skill'>
                      <FontAwesomeIcon icon={faCheck} /> {skill}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

       
<div className="heading1">
      <IoLogoGithub size={30} className="icon1" />
      <h3 className="text-primary fw-bold heading-text">Reviews</h3>
    </div>
        <div className="review-input-box">
          <h5 className='text-primary '>Add Review</h5>
          <div className="review-input-inner-box">
            <h5>Enter your review</h5>
            <form onSubmit={handleSubmit}>
              <input 
                type="number" 
                name="rating" 
                placeholder="Enter rating out of 5" 
                value={rating}
                onChange={handleRatingChange} 
              />
              <input 
                type='submit' 
                className="btn btn-primary" 
                value='Add Rating'
              />
            </form>
          </div>
        </div>

      </section>
      <ToastContainer />
    </div>
  );
};

export default Indprofile;