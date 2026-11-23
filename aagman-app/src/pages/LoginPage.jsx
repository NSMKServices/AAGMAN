import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Castle, Sparkles, Shield } from '../components/common/Icons';
import styles from './Auth.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('rohan.deshmukh@example.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    demoLogin();
    navigate('/dashboard');
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
            {t('signInSub', 'Access your saved Sahyadri itineraries, custom wishlist, and personalized travel recommendations.')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('emailLabel', 'Email Address')}:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="traveler@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('passwordLabel', 'Password')}:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
              {t('loginButton', 'Sign In')}
            </Button>
          </div>
        </form>

        <div className={styles.demoSection}>
          <div className={styles.divider}>
            <span>{language === 'mr' ? 'किंवा' : language === 'hi' ? 'अथवा' : 'OR'}</span>
          </div>
          <button
            type="button"
            className={styles.demoBtn}
            onClick={handleDemoLogin}
          >
            <Sparkles size={16} />
            <span>{t('demoLoginButton', 'One-Click Demo Sign In')}</span>
          </button>
        </div>

        <div className={styles.authFooter}>
          <p>
            {t('dontHaveAccount', "Don't have an account?")}{' '}
            <Link to="/register" className={styles.authLink}>
              {t('registerFree', 'Register Free')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
