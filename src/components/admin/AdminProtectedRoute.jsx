import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminAccessDeniedPage from '../../pages/admin/AdminAccessDeniedPage';

/**
 * AdminProtectedRoute
 * Enforces:
 * 1. Active Supabase administrative authentication.
 * 2. Active admin profile verification from database.
 * 3. Role-Based Access Control (RBAC) hierarchy.
 * 4. Preserves origin location for post-login redirect.
 * 5. Prevents premature redirect while session is hydrating.
 */
export default function AdminProtectedRoute({ allowedRoles = ['super_admin', 'content_manager', 'editor'] }) {
  const { isAuthenticated, loading, role, adminProfile } = useAdminAuth();
  const location = useLocation();

  // 1. Loading state prevents flash-of-redirect while Supabase session is restored
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F1E36',
        color: '#EBF3FC',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          width: 44,
          height: 44,
          border: '3px solid rgba(29, 104, 189, 0.3)',
          borderTopColor: '#1D68BD',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '1rem'
        }} />
        <p style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.04em', margin: 0 }}>
          Verifying administrative credentials...
        </p>
        <span style={{ fontSize: '0.8rem', color: '#9BB5D6', marginTop: 4 }}>
          AAGMAN Administrative Gateway
        </span>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // 2. Unauthenticated -> Redirect to /admin/login preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 3. Authenticated but insufficient role -> Render dedicated Access Denied page
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <AdminAccessDeniedPage 
        requiredRoles={allowedRoles} 
        currentRole={role} 
        adminName={adminProfile?.full_name} 
      />
    );
  }

  // 4. Authorized -> Render child routes
  return <Outlet />;
}
