import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Castle, Sparkles } from '../components/common/Icons';
import styles from './Auth.module.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { language, t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeCity, setHomeCity] = useState('Pune');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ fullName, email, password, homeCity });
    navigate('/dashboard');
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
            {t('registerSub', 'Create your traveler account to explore Maharashtra\'s sacred temples, historic forts, and pristine coastlines.')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('nameLabel', 'Full Name')}:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={styles.input}
              placeholder="e.g. Tanaji Jadhav"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('emailLabel', 'Email Address')}:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="name@example.com"
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
              placeholder="Create a password"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{language === 'mr' ? 'मूळ शहर' : language === 'hi' ? 'गृह नगर' : 'Home Base City'}:</label>
            <select
              className={styles.select}
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
            >
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Nashik">Nashik</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Kolhapur">Kolhapur</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
              {t('registerButton', 'Create Free Account')}
            </Button>
          </div>
        </form>

        <div className={styles.authFooter}>
          <p>
            {t('alreadyHaveAccount', 'Already have an account?')}{' '}
            <Link to="/login" className={styles.authLink}>
              {t('signInNow', 'Sign In Now')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
