import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Castle, Sparkles, Shield } from '../components/common/Icons';
import styles from './Auth.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();
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
          <h1 className={styles.authTitle}>Sign In to AAGMAN</h1>
          <p className={styles.authSubtitle}>
            Access your saved Sahyadri itineraries, custom wishlist, and personalized travel recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address:</label>
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
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" variant="primary" className={styles.submitBtn}>
            Sign In to Portal
          </Button>
        </form>

        <div className={styles.divider}>OR</div>

        <Button
          type="button"
          variant="secondary"
          className={styles.demoBtn}
          onClick={handleDemoLogin}
          icon={<Sparkles size={16} />}
        >
          Instant Demo Access (Rohan Deshmukh)
        </Button>

        <div className={styles.authFooter}>
          Don't have an account yet?{' '}
          <Link to="/register" className={styles.authLink}>
            Create an Account
          </Link>
        </div>

        <div className={styles.demoNotice}>
          <Shield size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          College Demo Mode: Instant offline authentication stored securely in client session.
        </div>
      </div>
    </div>
  );
}
