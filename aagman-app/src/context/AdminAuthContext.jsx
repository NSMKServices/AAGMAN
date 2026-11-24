import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { auditService } from '../services/auditService';

const AdminAuthContext = createContext(null);

const isProduction = Boolean(
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD) ||
  (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production')
);

// Friendly human-readable error translation
export function formatAuthError(error) {
  if (!error) return 'An unexpected error occurred. Please try again.';
  const msg = typeof error === 'string' ? error : (error.message || '');
  
  if (msg.includes('Invalid login credentials') || msg.includes('invalid_credentials')) {
    return 'Invalid email or password. Please verify your credentials and try again.';
  }
  if (msg.includes('Email not confirmed')) {
    return 'Your email address has not been confirmed. Please check your inbox for the confirmation link.';
  }
  if (msg.includes('User not found') || msg.includes('user_not_found')) {
    return 'No administrator account found with this email address.';
  }
  if (msg.includes('Too many requests') || msg.includes('over_request_rate_limit')) {
    return 'Too many sign-in attempts. For security reasons, please wait a few minutes before trying again.';
  }
  if (msg.includes('fetch failed') || msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
    return 'Unable to connect to the Supabase authentication server. Please verify your internet connection or Supabase status.';
  }
  if (msg.includes('Password should be at least')) {
    return 'Password is too weak. It must be at least 6 characters long.';
  }
  if (msg.includes('JWT expired') || msg.includes('token expired')) {
    return 'Your administrative session has expired. Please sign in again.';
  }
  return msg || 'Authentication request failed. Please contact your system administrator.';
}

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Fetch admin profile from Supabase admin_profiles table
  const fetchAdminProfile = useCallback(async (userId, userEmail) => {
    if (!userId || !isSupabaseConfigured) return null;

    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('Failed querying admin_profiles:', error.message);
        return null;
      }

      if (!data) {
        return null;
      }

      if (data.is_active === false) {
        throw new Error('This administrator account has been deactivated. Please contact your Super Admin.');
      }

      return data;
    } catch (err) {
      console.error('Error fetching admin profile:', err);
      throw err;
    }
  }, []);

  // Initialize and restore session on mount.
  // Resolve getSession() before registering the listener, and keep the listener
  // synchronous: Supabase warns that awaiting client calls inside this callback
  // can block the auth lock and stall subsequent requests.
  useEffect(() => {
    let isMounted = true;
    let authListener = null;
    let profileRequestId = 0;

    const handleAuthStateChange = (event, newSession) => {
      if (!isMounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        setSession(newSession);
        setUser(newSession?.user || null);

        const requestId = ++profileRequestId;
        if (newSession?.user) {
          // Defer database access until the synchronous auth callback has returned.
          setTimeout(() => {
            fetchAdminProfile(newSession.user.id, newSession.user.email)
              .then(profile => {
                if (!isMounted || requestId !== profileRequestId) return;
                setAdminProfile(profile);
                if (!profile) {
                  setAuthError('This account does not have an active administrator profile.');
                } else {
                  setAuthError(null);
                }
              })
              .catch(err => {
                if (!isMounted || requestId !== profileRequestId) return;
                setAuthError(err.message);
                setAdminProfile(null);
              });
          }, 0);
        } else {
          setAdminProfile(null);
        }
      } else if (event === 'SIGNED_OUT') {
        profileRequestId += 1;
        setSession(null);
        setUser(null);
        setAdminProfile(null);
        setAuthError(null);
        try {
          localStorage.removeItem('aagman_demo_admin_profile');
        } catch (err) {
          // Ignore unavailable browser storage during sign-out.
        }
      }
    };

    async function initAuth() {
      setLoading(true);
      setAuthError(null);

      // In production mode, demo admin sessions are strictly purged and rejected.
      if (isProduction) {
        try {
          localStorage.removeItem('aagman_demo_admin_profile');
        } catch (err) {
          // Ignore unavailable browser storage.
        }
      } else {
        // Development-only demo session restoration when Supabase is not configured.
        try {
          const storedDemoAdmin = localStorage.getItem('aagman_demo_admin_profile');
          if (storedDemoAdmin && !isSupabaseConfigured) {
            const parsed = JSON.parse(storedDemoAdmin);
            if (isMounted) {
              setAdminProfile(parsed);
              setUser({ id: parsed.id, email: parsed.email });
              setSession({ user: { id: parsed.id, email: parsed.email }, access_token: 'demo-token' });
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn('Error reading demo admin session:', err);
        }
      }

      if (isSupabaseConfigured) {
        try {
          const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) {
            console.warn('Supabase getSession error:', sessionError.message);
          }

          if (!isMounted) return;

          if (initialSession?.user) {
            setSession(initialSession);
            setUser(initialSession.user);
          }

          // Register only after getSession() has completed initialization.
          const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
          authListener = subscription;

          if (initialSession?.user) {
            try {
              const profile = await fetchAdminProfile(initialSession.user.id, initialSession.user.email);
              if (isMounted) {
                setAdminProfile(profile);
                if (!profile) {
                  setAuthError('This account does not have an active administrator profile.');
                }
              }
            } catch (profileErr) {
              if (isMounted) {
                setAuthError(profileErr.message);
                setAdminProfile(null);
              }
            }
          }
        } catch (err) {
          console.warn('Supabase session initialization exception:', err);
          if (isMounted) setAuthError(formatAuthError(err));
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    }

    initAuth();

    return () => {
      isMounted = false;
      profileRequestId += 1;
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, [fetchAdminProfile]);

  // Login via Supabase Auth
  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);

    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase client is not configured with valid API credentials. Use the Demo Admin mode below or configure .env.');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        const friendly = formatAuthError(error);
        setAuthError(friendly);
        throw new Error(friendly);
      }

      if (!data?.user) {
        throw new Error('Sign-in response did not contain valid user credentials.');
      }

      // Check admin profile
      let profile = null;
      try {
        profile = await fetchAdminProfile(data.user.id, data.user.email);
      } catch (err) {
        await supabase.auth.signOut();
        setAuthError(err.message);
        throw err;
      }

      if (!profile) {
        // Enforce RBAC security: Ordinary user without an admin profile cannot access
        await supabase.auth.signOut();
        const noAdminMsg = 'Access Denied: Your account does not have administrative privileges. Contact your Super Admin.';
        setAuthError(noAdminMsg);
        throw new Error(noAdminMsg);
      }

      // Success
      setSession(data.session);
      setUser(data.user);
      setAdminProfile(profile);
      setLoading(false);

      auditService.logAction({
        adminProfile: profile,
        action: 'AUTH_LOGIN',
        entityType: 'auth',
        entityId: profile.email,
        details: { role: profile.role, gateway: 'supabase_auth' }
      }).catch(err => console.warn('Audit log error:', err));

      return { user: data.user, profile };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Demo Admin Login (strictly restricted to local development builds)
  const demoAdminLogin = (targetRole = 'super_admin') => {
    if (isProduction) {
      throw new Error('Administrative demo mode is disabled in production builds. Authentic Supabase credentials required.');
    }
    setLoading(true);
    setAuthError(null);

    const demoProfiles = {
      super_admin: {
        id: 'demo-admin-super',
        email: 'director@aagman.maharashtra.gov.in',
        full_name: 'Dr. Yashwantrao Deshmukh',
        role: 'super_admin',
        is_active: true,
        phone: '+91 22 2202 5050',
        created_at: new Date().toISOString()
      },
      content_manager: {
        id: 'demo-admin-content',
        email: 'content.lead@aagman.maharashtra.gov.in',
        full_name: 'Ananya Kulkarni',
        role: 'content_manager',
        is_active: true,
        phone: '+91 20 2565 1234',
        created_at: new Date().toISOString()
      },
      editor: {
        id: 'demo-admin-editor',
        email: 'heritage.editor@aagman.maharashtra.gov.in',
        full_name: 'Vikram Shinde',
        role: 'editor',
        is_active: true,
        phone: '+91 231 265 9988',
        created_at: new Date().toISOString()
      }
    };

    const chosen = demoProfiles[targetRole] || demoProfiles.super_admin;
    setAdminProfile(chosen);
    setUser({ id: chosen.id, email: chosen.email });
    setSession({ user: { id: chosen.id, email: chosen.email }, access_token: 'demo-admin-token' });
    localStorage.setItem('aagman_demo_admin_profile', JSON.stringify(chosen));
    setLoading(false);

    auditService.logAction({
      adminProfile: chosen,
      action: 'AUTH_LOGIN',
      entityType: 'auth',
      entityId: chosen.email,
      details: { role: chosen.role, gateway: 'demo_simulator' }
    }).catch(err => console.warn('Audit log error:', err));

    return chosen;
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      if (adminProfile) {
        await auditService.logAction({
          adminProfile,
          action: 'AUTH_LOGOUT',
          entityType: 'auth',
          entityId: adminProfile.email,
          details: { role: adminProfile.role }
        }).catch(err => console.warn('Audit log error:', err));
      }

      localStorage.removeItem('aagman_demo_admin_profile');
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn('Error during admin logout:', e);
    } finally {
      setSession(null);
      setUser(null);
      setAdminProfile(null);
      setAuthError(null);
      setLoading(false);
    }
  };

  // Password Recovery Flow
  const requestPasswordReset = async (email) => {
    setAuthError(null);
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid administrator email address.');
    }

    if (!isSupabaseConfigured) {
      // In offline/demo environment, simulate successful dispatch
      return { success: true, message: `Password reset instructions sent to ${email} (Demo Simulation).` };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password`
    });

    if (error) {
      const friendly = formatAuthError(error);
      setAuthError(friendly);
      throw new Error(friendly);
    }

    return { success: true, message: `Password reset link has been dispatched to ${email}.` };
  };

  // Password Update Flow (when redirected from reset link)
  const updatePassword = async (newPassword) => {
    setAuthError(null);
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (!isSupabaseConfigured) {
      return { success: true, message: 'Password successfully updated (Demo Simulation).' };
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      const friendly = formatAuthError(error);
      setAuthError(friendly);
      throw new Error(friendly);
    }

    return { success: true, message: 'Your administrator password has been updated successfully.' };
  };

  // Role permissions checking logic
  const role = adminProfile?.role || null;
  const isSuperAdmin = role === 'super_admin';
  const isContentManager = role === 'content_manager' || role === 'super_admin';
  const isEditor = role === 'editor' || role === 'content_manager' || role === 'super_admin';

  const hasRole = useCallback((requiredRole) => {
    if (!adminProfile || !adminProfile.is_active) return false;
    if (adminProfile.role === 'super_admin') return true;
    if (requiredRole === 'content_manager') {
      return adminProfile.role === 'content_manager';
    }
    if (requiredRole === 'editor') {
      return adminProfile.role === 'editor' || adminProfile.role === 'content_manager';
    }
    return adminProfile.role === requiredRole;
  }, [adminProfile]);

  const isAuthenticated = Boolean(user && adminProfile && adminProfile.is_active);

  const value = useMemo(() => ({
    session,
    user,
    adminProfile,
    role,
    isAuthenticated,
    isSuperAdmin,
    isContentManager,
    isEditor,
    hasRole,
    loading,
    authError,
    setAuthError,
    login,
    demoAdminLogin,
    logout,
    requestPasswordReset,
    updatePassword,
    refreshProfile: () => user ? fetchAdminProfile(user.id, user.email) : Promise.resolve(null)
  }), [
    session,
    user,
    adminProfile,
    role,
    isAuthenticated,
    isSuperAdmin,
    isContentManager,
    isEditor,
    hasRole,
    loading,
    authError,
    fetchAdminProfile
  ]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
