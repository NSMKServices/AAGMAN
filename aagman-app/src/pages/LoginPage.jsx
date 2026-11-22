import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import styles from './Auth.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rohan.deshmukh@example.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('aagman_traveler_name', 'Rohan Deshmukh');
    localStorage.setItem('aagman_is_logged_in', 'true');
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    localStorage.setItem('aagman_traveler_name', 'Rohan Deshmukh');
    localStorage.setItem('aagman_home_city', 'Pune');
    localStorage.setItem('aagman_is_logged_in', 'true');
    navigate('/dashboard');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <span className={styles.brandSymbol}>🔱</span>
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
        >
          🚀 Instant Demo Access (Rohan Deshmukh)
        </Button>

        <div className={styles.authFooter}>
          Don't have an account yet?{' '}
          <Link to="/register" className={styles.authLink}>
            Create an Account
          </Link>
        </div>

        <div className={styles.demoNotice}>
          🔒 College Demo Mode: Instant offline authentication stored securely in client session.
        </div>
      </div>
    </div>
  );
}
