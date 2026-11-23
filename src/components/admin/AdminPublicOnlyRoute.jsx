import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

/**
 * AdminPublicOnlyRoute
 * For /admin/login, /admin/forgot-password, /admin/reset-password.
 * Prevents already-authenticated administrators from seeing the login screen.
 */
export default function AdminPublicOnlyRoute() {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F1E36',
        color: '#EBF3FC'
      }}>
        <div style={{
          width: 36,
          height: 36,
          border: '3px solid rgba(29, 104, 189, 0.3)',
          borderTopColor: '#1D68BD',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect to where the user was trying to go, or default to /admin
    const destination = location.state?.from?.pathname || '/admin';
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
