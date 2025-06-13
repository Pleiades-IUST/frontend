import React, { createContext, useState } from 'react';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    // TODO: integrate real API
    setUser({ email });
  };

  const signup = async ({ email, password }) => {
    // TODO: integrate real API
    setUser({ email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
