import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from './AdminAuth.module.css';

const isProduction = Boolean(
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD) ||
  (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production')
);

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, demoAdminLogin, authError, setAuthError } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destination = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await login(email, password);
      navigate(destination, { replace: true });
    } catch (err) {
      // Error is set in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = (role) => {
    demoAdminLogin(role);
    navigate(destination, { replace: true });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.cardHeader}>
          <div className={styles.emblem}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h1 className={styles.brandTitle}>AAGMAN Administrative Gateway</h1>
          <div className={styles.brandSub}>Government of Maharashtra • Tourism & Heritage</div>
        </div>

        <div className={styles.cardBody}>
          <h2 className={styles.pageTitle}>Administrator Sign In</h2>
          <p className={styles.pageDescription}>
            Enter your official credentials to access the administrative management console.
          </p>

          {authError && (
            <div className={styles.alertError} role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="admin-email" className={styles.label}>Official Email Address</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  id="admin-email"
                  type="email"
                  className={styles.input}
                  placeholder="admin@aagman.maharashtra.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="admin-password" className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.togglePasswordBtn}
                  onClick={() => setShowPassword(prev => !prev)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.formOptions}>
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember session</span>
              </label>

              <Link to="/admin/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </form>

          {!isProduction && (
            <>
              <div className={styles.divider}>Offline & Testing Access</div>

              <div className={styles.demoBox}>
                <div className={styles.demoTitle}>
                  <span>Role-Based Verification Simulator</span>
                  <span className={styles.demoBadge}>Offline Ready</span>
                </div>
                <div className={styles.demoBtnGroup}>
                  <button
                    type="button"
                    className={styles.demoRoleBtn}
                    onClick={() => handleDemoLogin('super_admin')}
                    title="Sign in with Super Administrator privileges"
                  >
                    Super Admin
                  </button>
                  <button
                    type="button"
                    className={styles.demoRoleBtn}
                    onClick={() => handleDemoLogin('content_manager')}
                    title="Sign in with Content Manager privileges"
                  >
                    Content Mgr
                  </button>
                  <button
                    type="button"
                    className={styles.demoRoleBtn}
                    onClick={() => handleDemoLogin('editor')}
                    title="Sign in with Editor privileges"
                  >
                    Editor
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.cardFooter}>
          <Link to="/" className={styles.footerLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Return to Public Website</span>
          </Link>

          <span className={styles.securityNote}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>TLS 256-bit Encrypted</span>
          </span>
        </div>
      </div>
    </div>
  );
}
