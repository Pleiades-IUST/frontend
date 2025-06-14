import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Add a slight delay for the loading animation
    setTimeout(async () => {
      const success = await login({ email, password });
      setIsLoading(false);

      if (success) {
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    }, 1200);
  };

  return (
    <div className="login-container">
      {/* Animated background elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="login-card">
        <div className="card-glow"></div>

        {/* Header with animated icon */}
        <div className="login-header">
          <h1 className="login-title">
            Welcome Back
            <span className="wave-hand">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L10 16L17 9"
                  stroke="green"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" />
              </svg>
            </span>
          </h1>
          <p className="login-subtitle">Log In to get started</p>
        </div>

        {/* Error message with animation */}
        {error && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="username"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modern-input"
                required
              />
              <label className="input-label">Email Address</label>
              <div className="input-border"></div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="modern-input"
                required
              />
              <label className="input-label">Password</label>
              <div className="input-border"></div>
            </div>
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            <span className="button-text">
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </span>
            <div className="button-loader">
              <div className="loader-ring"></div>
            </div>
            <div className="button-glow"></div>
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p className="signup-text">
            New to our platform?{' '}
            <span className="signup-link" onClick={() => navigate('/signup')}>
              Create Account
              <svg
                className="link-arrow"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
