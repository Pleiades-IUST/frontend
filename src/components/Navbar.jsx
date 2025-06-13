import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    logout();
    navigate('/login'); // redirect after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">pleiades</div>
        <div className="navbar-links">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {username}</span>
              <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
