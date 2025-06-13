import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    navigate('/');
  };

  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Log In</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
        <p style={styles.text}>
          Don't have an account?{' '}
          <span style={styles.link} onClick={() => navigate('/signup')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  fullScreenContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // full screen height
    width: '100vw', // full screen width
    backgroundColor: '#f0f2f5',
  },
  loginBox: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#3182ce',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  text: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.95rem',
  },
  link: {
    color: '#3182ce',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};
