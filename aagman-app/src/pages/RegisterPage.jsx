import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Castle } from '../components/common/Icons';
import styles from './Auth.module.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { language, t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeCity, setHomeCity] = useState('Pune');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setNotice('');
    try {
      const result = await register({ fullName, email, password, homeCity });
      if (result.confirmationRequired) {
        setNotice('Account created. Check your email for the confirmation link, then sign in.');
        return;
      }
      navigate('/dashboard', { replace: true });
    } catch (registrationError) {
      setError(registrationError?.message || 'Unable to create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <span className={styles.brandSymbol}>
            <Castle size={32} color="var(--color-gold)" />
          </span>
          <h1 className={styles.authTitle}>{t('registerTitle', 'Join AAGMAN')}</h1>
          <p className={styles.authSubtitle}>
            {t('registerSub', "Create your traveler account to explore Maharashtra's sacred temples, historic forts, and pristine coastlines.")}
          </p>
        </div>

        {error && <div className={styles.authError} role="alert">{error}</div>}
        {notice && <div className={styles.authError} role="status">{notice}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="traveler-name">{t('nameLabel', 'Full Name')}:</label>
            <input id="traveler-name" type="text" value={fullName}
              onChange={(event) => setFullName(event.target.value)} required
              className={styles.input} placeholder="e.g. Tanaji Jadhav" autoComplete="name" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="traveler-email">{t('emailLabel', 'Email Address')}:</label>
            <input id="traveler-email" type="email" value={email}
              onChange={(event) => setEmail(event.target.value)} required
              className={styles.input} placeholder="name@example.com" autoComplete="email" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="traveler-password">{t('passwordLabel', 'Password')}:</label>
            <input id="traveler-password" type="password" value={password}
              onChange={(event) => setPassword(event.target.value)} required minLength={6}
              className={styles.input} placeholder="Create a password" autoComplete="new-password" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="traveler-city">
              {language === 'mr' ? 'मूळ शहर' : language === 'hi' ? 'गृह नगर' : 'Home Base City'}:
            </label>
            <select id="traveler-city" className={styles.select} value={homeCity}
              onChange={(event) => setHomeCity(event.target.value)}>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Nashik">Nashik</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Kolhapur">Kolhapur</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" size="lg" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : t('registerButton', 'Create Free Account')}
            </Button>
          </div>
        </form>

        <div className={styles.authFooter}>
          <p>{t('alreadyHaveAccount', 'Already have an account?')}{' '}
            <Link to="/login" className={styles.authLink}>{t('signInNow', 'Sign In Now')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
