import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Castle } from '../components/common/Icons';
import styles from './Auth.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const adminMode = searchParams.get('mode') === 'admin';
  const { login } = useAuth();
  const { login: adminLogin, authError, setAuthError } = useAdminAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setFormError('');
    setNotice('');
    setAuthError(null);
  }, [adminMode, setAuthError]);

  useEffect(() => {
    if (!adminMode && searchParams.get('registered') === '1') {
      setNotice('Your account has been created. Please sign in to continue.');
    }
  }, [adminMode, searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setNotice('');

    try {
      if (adminMode) {
        await adminLogin(email, password);
        navigate('/admin', { replace: true });
      } else {
        await login(email, password);
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      setFormError(error?.message || 'Unable to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectMode = (mode) => {
    setSearchParams(mode === 'admin' ? { mode: 'admin' } : {}, { replace: true });
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <span className={styles.brandSymbol}>
            <Castle size={32} color="var(--color-gold)" />
          </span>
          <h1 className={styles.authTitle}>{t('signInTitle', 'Sign In to AAGMAN')}</h1>
          <p className={styles.authSubtitle}>
            {adminMode
              ? t('adminSignInSub', 'Sign in with your authorized AAGMAN administrator credentials.')
              : t('signInSub', 'Access your saved itineraries, wishlist, and travel recommendations.')}
          </p>
        </div>

        <div className={styles.authModeTabs} role="tablist" aria-label="Sign-in type">
          <button type="button" role="tab" aria-selected={!adminMode}
            className={`${styles.authModeTab} ${!adminMode ? styles.authModeTabActive : ''}`}
            onClick={() => selectMode('traveler')}>
            {t('travelerSignIn', 'Traveler')}
          </button>
          <button type="button" role="tab" aria-selected={adminMode}
            className={`${styles.authModeTab} ${adminMode ? styles.authModeTabActive : ''}`}
            onClick={() => selectMode('admin')}>
            {t('administratorSignIn', 'Administrator')}
          </button>
        </div>

        {(formError || (adminMode && authError)) && (
          <div className={styles.authError} role="alert">{formError || authError}</div>
        )}
        {notice && <div className={styles.authNotice} role="status">{notice}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="aagman-email">
              {adminMode ? t('officialEmailLabel', 'Official Email Address') : t('emailLabel', 'Email Address')}
            </label>
            <input id="aagman-email" type="email" value={email}
              onChange={(event) => setEmail(event.target.value)} required autoComplete="username"
              className={styles.input} placeholder="name@example.com" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="aagman-password">{t('passwordLabel', 'Password')}</label>
            <input id="aagman-password" type="password" value={password}
              onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password"
              className={styles.input} placeholder="••••••••" />
          </div>

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" size="lg" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting
                ? t('verifyingCredentials', 'Verifying credentials…')
                : adminMode ? t('adminSignInButton', 'Sign in to Admin Portal') : t('loginButton', 'Sign In')}
            </Button>
          </div>
        </form>

        {!adminMode && (
          <div className={styles.authFooter}>
            <p>{t('dontHaveAccount', "Don't have an account?")}{' '}
              <Link to="/register" className={styles.authLink}>{t('registerFree', 'Register Free')}</Link>
            </p>
          </div>
        )}

        {adminMode && (
          <div className={styles.authFooter}>
            <Link to="/admin/forgot-password" className={styles.authLink}>
              {t('forgotPassword', 'Forgot password?')}
            </Link>
            <p>{t('adminAccessNote', 'Administrator access is verified against Supabase and your assigned admin role.')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
