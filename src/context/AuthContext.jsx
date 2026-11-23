import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USER = {
  id: 'user-rohan-01',
  name: 'Rohan Deshmukh',
  email: 'rohan.deshmukh@example.com',
  role: 'Sahyadri Explorer',
  homeCity: 'Pune',
  travelStyle: 'Heritage & Fort Trekker',
  avatarInitials: 'RD'
};

function getInitialUser() {
  try {
    const stored = localStorage.getItem('aagman_auth_user');
    if (stored) {
      return JSON.parse(stored);
    }
    const isLoggedIn = localStorage.getItem('aagman_is_logged_in') === 'true';
    if (isLoggedIn) {
      const name = localStorage.getItem('aagman_traveler_name') || 'Rohan Deshmukh';
      const city = localStorage.getItem('aagman_home_city') || 'Pune';
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      return {
        id: 'user-saved',
        name,
        email: 'traveler@aagman.demo',
        role: 'Sahyadri Explorer',
        homeCity: city,
        travelStyle: 'Heritage & Fort Trekker',
        avatarInitials: initials || 'TR'
      };
    }
  } catch (e) {
    console.warn('Failed reading auth state from localStorage', e);
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('aagman_auth_user', JSON.stringify(user));
        localStorage.setItem('aagman_is_logged_in', 'true');
        localStorage.setItem('aagman_traveler_name', user.name);
        localStorage.setItem('aagman_home_city', user.homeCity || 'Pune');
      } else {
        localStorage.removeItem('aagman_auth_user');
        localStorage.setItem('aagman_is_logged_in', 'false');
      }
    } catch (e) {
      console.warn('Failed writing auth state to localStorage', e);
    }
  }, [user]);

  const login = (email, password) => {
    const rawName = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const initials = formattedName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const loggedInUser = {
      id: `user-${Date.now()}`,
      name: formattedName || 'Traveler',
      email,
      role: 'Sahyadri Explorer',
      homeCity: 'Pune',
      travelStyle: 'Heritage & Fort Trekker',
      avatarInitials: initials || 'TR'
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  const demoLogin = () => {
    setUser(DEMO_USER);
    return DEMO_USER;
  };

  const register = ({ fullName, email, password, homeCity }) => {
    const name = fullName.trim() || 'New Traveler';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'Sahyadri Explorer',
      homeCity: homeCity || 'Pune',
      travelStyle: 'Heritage & Fort Trekker',
      avatarInitials: initials || 'NT'
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (fields) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...fields };
      if (fields.name) {
        updated.avatarInitials = fields.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      }
      return updated;
    });
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      demoLogin,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
