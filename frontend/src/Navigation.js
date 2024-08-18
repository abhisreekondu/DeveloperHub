import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCode} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'
const Navigation = () => {
  return (
    <div>
        <nav>
        <h1 color='white'><FontAwesomeIcon icon={faCode} style={{color: "#ffffff",}} />
          <Link to="/">Developers Hub</Link>
        </h1>
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      
    </div>
  )
}

export default Navigation
