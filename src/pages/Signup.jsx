import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';
import styles from './Signup.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const success = await signup({ email, username, password });
    setIsLoading(false);

    if (success) {
      navigate('/');
    } else {
      setError(
        'Signup failed. Please check your input or try a different email/username.'
      );
    }
  };

  return (
    <div className={styles['signup-container']}>
      {/* Background orbs */}
      <div className={`${styles['bg-orb']} ${styles['orb-1']}`}></div>
      <div className={`${styles['bg-orb']} ${styles['orb-2']}`}></div>

      <div className={styles['signup-card']}>
        <div className={styles['card-glow']}></div>

        {/* Header with logo */}
        <div className={styles['signup-header']}>
          <div className={styles['logo-container']}>
            <div className={styles['logo-icon']}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 21V19C16 17.9 15.1 17 14 17H5C3.9 17 3 17.9 3 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="8.5"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="20"
                  y1="8"
                  x2="20"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="17"
                  y1="11"
                  x2="23"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <h1 className={styles['signup-title']}>Create Your Account</h1>
          <p className={styles['signup-subtitle']}>Sign up to get started</p>
        </div>

        {/* Error message */}
        {error && (
          <div className={styles['error-message']}>
            <div className={styles['error-icon']}>⚠️</div>
            <span>{error}</span>
          </div>
        )}

        {/* Form with floating labels */}
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
          <div className={styles['input-group']}>
            <div className={styles['input-wrapper']}>
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles['modern-input']}
                required
              />
              <label className={styles['input-label']}>Email Address</label>
              <div className={styles['input-border']}></div>
            </div>
          </div>

          <div className={styles['input-group']}>
            <div className={styles['input-wrapper']}>
              <input
                type="text"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles['modern-input']}
                required
              />
              <label className={styles['input-label']}>Username</label>
              <div className={styles['input-border']}></div>
            </div>
          </div>

          <div className={styles['input-group']}>
            <div className={styles['input-wrapper']}>
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles['modern-input']}
                required
              />
              <label className={styles['input-label']}>Password</label>
              <div className={styles['input-border']}></div>
            </div>
          </div>

          <button
            type="submit"
            className={`${styles['signup-button']} ${isLoading ? styles['loading'] : ''}`}
            disabled={isLoading}
          >
            <span className={styles['button-text']}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </span>
            <div className={styles['button-loader']}>
              <div className={styles['loader-ring']}></div>
            </div>
            <div className={styles['button-glow']}></div>
          </button>
        </form>

        {/* Footer */}
        <div className={styles['signup-footer']}>
          <p className={styles['login-text']}>
            Already have an account?{' '}
            <span
              className={styles['login-link']}
              onClick={() => navigate('/login')}
            >
              Sign In
              <svg
                className={styles['link-arrow']}
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
