import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import styles from './PagePlaceholder.module.css';

export default function NotFoundPage() {
  return (
    <section className={styles.contentSection} style={{ textAlign: 'center', padding: '5rem 0' }}>
      <Container narrow>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🏛️</span>
        <span className={styles.badge} style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>404 Error</span>
        <h1 className={styles.heroTitle} style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Destination Not Found
        </h1>
        <p style={{ maxWidth: '500px', margin: '0 auto 2rem', color: 'var(--color-text-secondary)' }}>
          The path or destination you requested does not exist or has been relocated during the Aagman platform modernization.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className={styles.actionBtn}>Return to Portal Home</Link>
          <Link to="/forts" className={styles.actionBtn} style={{ backgroundColor: 'var(--color-secondary)' }}>Browse Forts</Link>
        </div>
      </Container>
    </section>
  );
}
