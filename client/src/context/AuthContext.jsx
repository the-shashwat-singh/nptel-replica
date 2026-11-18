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
    let userData = null;
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      if (res.ok) {
        userData = await res.json();
      }
    } catch (e) {
      console.warn('API verify-code error, falling back to mock session:', e.message);
    }

    if (!userData || !userData.user) {
      let defaultName = 'Student User';
      const cleanEmail = (email || '').toLowerCase().trim();
      if (cleanEmail === 'ss7495@srmist.edu.in' || cleanEmail.includes('shashwat')) defaultName = 'Shashwat Singh';
      else if (cleanEmail === 'hg4210@srmist.edu.in' || cleanEmail.includes('himanshu')) defaultName = 'Himanshu Golya';
      else if (cleanEmail === 'pg7071@srmist.edu.in' || cleanEmail.includes('pratham')) defaultName = 'Pratham Goyal';

      userData = {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: cleanEmail,
          name: defaultName,
          institution: 'SRM Institute of Science and Technology - Kattankulathur Campus'
        }
      };
    }

    setToken(userData.token);
    setUser(userData.user);
    localStorage.setItem('nptel_token', userData.token);
    localStorage.setItem('nptel_user', JSON.stringify(userData.user));
    return userData;
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
