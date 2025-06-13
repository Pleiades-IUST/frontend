// src/contexts/AuthContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: email, // assuming email is used as username in login
        password,
      });

      const token = response.data.Token;
      localStorage.setItem('token', token);
      const username = email;
      setUser({ username });

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async ({ email, username, password }) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        email,
        username,
        password,
      });

      const token = response.data.Token;
      localStorage.setItem('token', token);
      setUser({ email, username });

      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
