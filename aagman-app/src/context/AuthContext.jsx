import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

function mapAuthUser(authUser) {
  if (!authUser) return null;
  const metadata = authUser.user_metadata || {};
  const name = metadata.full_name || metadata.name || authUser.email?.split('@')[0] || 'Traveler';
  const initials = name.split(/\s+/).filter(Boolean).map(part => part[0]).join('').toUpperCase().slice(0, 2);
  return {
    id: authUser.id,
    name,
    email: authUser.email || '',
    role: 'Sahyadri Explorer',
    homeCity: metadata.home_city || '',
    travelStyle: metadata.travel_style || 'Heritage & Fort Trekker',
    avatarInitials: initials || 'TR'
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Remove the former simulated traveller session. Only a Supabase session
    // may authenticate a traveller in the production application.
    try {
      localStorage.removeItem('aagman_auth_user');
      localStorage.removeItem('aagman_is_logged_in');
      localStorage.removeItem('aagman_traveler_name');
      localStorage.removeItem('aagman_home_city');
    } catch (error) {
      console.warn('Unable to clear legacy traveller session:', error);
    }

    if (!isSupabaseConfigured) {
      setLoading(false);
      return () => { mounted = false; };
    }

    let subscription;
    const initialize = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;
      if (error) console.warn('Unable to restore traveller session:', error.message);
      setUser(mapAuthUser(data?.session?.user));

      const authListener = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) setUser(mapAuthUser(session?.user));
      });
      subscription = authListener.data.subscription;
      setLoading(false);
    };

    initialize().catch(error => {
      console.error('Traveller authentication initialization failed:', error);
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) {
      throw new Error('Traveller authentication is unavailable because Supabase is not configured.');
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });
    if (error) throw error;
    if (!data?.user || !data?.session) {
      throw new Error('Sign-in did not return an active session.');
    }
    const nextUser = mapAuthUser(data.user);
    setUser(nextUser);
    return nextUser;
  }, []);

  const register = useCallback(async ({ fullName, email, password, homeCity }) => {
    if (!isSupabaseConfigured) {
      throw new Error('Registration is unavailable because Supabase is not configured.');
    }
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          home_city: homeCity || '',
          travel_style: 'Heritage & Fort Trekker'
        }
      }
    });
    if (error) throw error;
    if (data?.session && data?.user) setUser(mapAuthUser(data.user));
    return {
      user: data?.user || null,
      session: data?.session || null,
      confirmationRequired: Boolean(data?.user && !data?.session)
    };
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (fields) => {
    if (!user) throw new Error('Sign in to update your traveller profile.');
    const metadata = {};
    if (fields.name !== undefined) metadata.full_name = fields.name;
    if (fields.homeCity !== undefined) metadata.home_city = fields.homeCity;
    if (fields.travelStyle !== undefined) metadata.travel_style = fields.travelStyle;
    const { data, error } = await supabase.auth.updateUser({ data: metadata });
    if (error) throw error;
    const nextUser = mapAuthUser(data.user);
    setUser(nextUser);
    return nextUser;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
