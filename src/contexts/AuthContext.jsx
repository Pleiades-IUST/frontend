// src/contexts/AuthContext.jsx
import { em } from 'framer-motion/client';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ideally decode token or fetch user info — for now, mock it
      setUser({ token });
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await fetch('http://103.75.197.188:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem('token', data.Token);
      localStorage.setItem('username', email);
      const username = email;
      setUser({ username });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const signup = async ({ email, username, password }) => {
    // console.log({ email, username, password });
    try {
      const res = await fetch('http://103.75.197.188:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem('token', data.Token);
      localStorage.setItem('username', username);
      setUser({ username });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
