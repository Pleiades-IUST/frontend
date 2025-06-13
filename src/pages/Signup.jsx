import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ email, password });
    navigate('/');
  };

  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.signupBox}>
        <h2 style={styles.heading}>Sign Up</h2>
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
            Create Account
          </button>
        </form>
        <p style={styles.text}>
          Already have an account?{' '}
          <span style={styles.link} onClick={() => navigate('/login')}>
            Log In
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
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f2f5',
  },
  signupBox: {
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
