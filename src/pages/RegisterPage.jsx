import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Castle, Sparkles } from '../components/common/Icons';
import styles from './Auth.module.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
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
          <h1 className={styles.authTitle}>Join AAGMAN</h1>
          <p className={styles.authSubtitle}>
            Create your traveler account to explore Maharashtra's sacred temples, historic forts, and pristine coastlines.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name:</label>
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
            <label className={styles.label}>Email Address:</label>
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
            <label className={styles.label}>Password:</label>
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
            <label className={styles.label}>Home Base City:</label>
            <select
              className={styles.select}
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
            >
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Nashik">Nashik</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
              <option value="Kolhapur">Kolhapur</option>
              <option value="Nagpur">Nagpur</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            className={styles.submitBtn}
            icon={<Sparkles size={16} />}
          >
            Register & Start Exploring
          </Button>
        </form>

        <div className={styles.authFooter}>
          Already have an account?{' '}
          <Link to="/login" className={styles.authLink}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
