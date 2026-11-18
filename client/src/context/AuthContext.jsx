import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('nptel_token') || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nptel_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email) {
          return parsed;
        }
      }
    } catch (e) {}
    const defaultUser = { email: 'ss7495@srmist.edu.in', name: 'Shashwat Singh' };
    localStorage.setItem('nptel_user', JSON.stringify(defaultUser));
    return defaultUser;
  });

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('nptel_token', data.token);
    localStorage.setItem('nptel_user', JSON.stringify(data.user));
    return data;
  };

  const loginWithCode = async (email, code) => {
    const res = await fetch('/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Verification failed');
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('nptel_token', data.token);
    localStorage.setItem('nptel_user', JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser({ email: 'ss7495@srmist.edu.in', name: 'Shashwat Singh' });
    localStorage.removeItem('nptel_token');
    localStorage.removeItem('nptel_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        login,
        loginWithCode,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
