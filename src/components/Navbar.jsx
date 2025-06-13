import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>
      <div className="links">
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
