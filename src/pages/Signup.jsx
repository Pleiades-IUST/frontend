import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const success = await signup({ email, username, password });

    if (success) {
      navigate('/');
    } else {
      setError(
        'Signup failed. Please check your input or try a different email/username.'
      );
    }
  };

  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.signupBox}>
        <h2 style={styles.heading}>Create Your Account 🚀</h2>
        <p style={styles.subheading}>Sign up to get started</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
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
    backgroundColor: '#edf2f7',
  },
  signupBox: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '420px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '0.5rem',
    fontSize: '1.75rem',
    fontWeight: '600',
    color: '#2d3748',
  },
  subheading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
    color: '#718096',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#38a169',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
  text: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.95rem',
    color: '#4a5568',
  },
  link: {
    color: '#3182ce',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  errorBox: {
    backgroundColor: '#ffe5e5',
    color: '#b00020',
    border: '1px solid #f5c2c2',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '0.95rem',
    textAlign: 'center',
  },
};
