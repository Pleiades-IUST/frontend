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

  const handleDownloadAPK = () => {
    window.open('http://103.75.197.188:8888/app-debug.apk', '_blank');
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

      {/* Download APK Button - positioned at top right */}
      <div className="download-apk-container">
        <button onClick={handleDownloadAPK} className="download-apk-button">
          <div className="download-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C13.1 2 14 2.9 14 4V12L15.5 10.5C15.9 10.1 16.5 10.1 16.9 10.5C17.3 10.9 17.3 11.5 16.9 11.9L12.7 16.1C12.3 16.5 11.7 16.5 11.3 16.1L7.1 11.9C6.7 11.5 6.7 10.9 7.1 10.5C7.5 10.1 8.1 10.1 8.5 10.5L10 12V4C10 2.9 10.9 2 12 2Z"
                fill="currentColor"
              />
              <path
                d="M3 19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19C21 17.9 20.1 17 19 17H5C3.9 17 3 17.9 3 19Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="download-content">
            <span className="download-title">Test Drive App</span>
            <span className="download-subtitle">Download APK</span>
          </div>
          <div className="download-glow"></div>
          <div className="download-ripple"></div>
        </button>
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
              <label className="input-label">Username</label>
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
