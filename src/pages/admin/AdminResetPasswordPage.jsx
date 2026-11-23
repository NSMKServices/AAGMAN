import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from './AdminAuth.module.css';

export default function AdminResetPasswordPage() {
  const navigate = useNavigate();
  const { updatePassword, authError, setAuthError } = useAdminAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (password.length < 6) {
      setAuthError('New password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setAuthError('Passwords do not match. Please re-enter carefully.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await updatePassword(password);
      setSuccessMessage(res.message || 'Password successfully updated.');
      setTimeout(() => {
        navigate('/admin/login', { replace: true });
      }, 2500);
    } catch (err) {
      // Handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.cardHeader}>
          <div className={styles.emblem}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h1 className={styles.brandTitle}>AAGMAN Administrative Gateway</h1>
          <div className={styles.brandSub}>Establish New Password</div>
        </div>

        <div className={styles.cardBody}>
          <h2 className={styles.pageTitle}>Create New Admin Password</h2>
          <p className={styles.pageDescription}>
            Enter a strong, secure password for your administrator account.
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

          {successMessage && (
            <div className={styles.alertSuccess} role="status">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>{successMessage} Redirecting to sign in...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="new-password" className={styles.label}>New Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
                <button
                  type="button"
                  className={styles.togglePasswordBtn}
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
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

            <div className={styles.formGroup}>
              <label htmlFor="confirm-password" className={styles.label}>Confirm New Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Save New Password</span>
              )}
            </button>
          </form>
        </div>

        <div className={styles.cardFooter}>
          <Link to="/admin/login" className={styles.footerLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
