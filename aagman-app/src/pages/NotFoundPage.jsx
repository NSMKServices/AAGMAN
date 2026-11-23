import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import { Compass } from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';
import styles from './PagePlaceholder.module.css';

export default function NotFoundPage() {
  const { language, t } = useLanguage();

  return (
    <section className={styles.contentSection} style={{ textAlign: 'center', padding: '5rem 0' }}>
      <Container narrow>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
          <Compass size={56} />
        </div>
        <span className={styles.badge} style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
          404 Error
        </span>
        <h1 className={styles.heroTitle} style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          {t('pageNotFoundTitle', 'Page Not Found')}
        </h1>
        <p style={{ maxWidth: '500px', margin: '0 auto 2rem', color: 'var(--color-text-secondary)' }}>
          {t('pageNotFoundSub', 'The path or destination you requested does not exist or has been relocated.')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className={styles.actionBtn}>
            {t('backToHome', 'Return to Portal Home')}
          </Link>
          <Link to="/forts" className={styles.actionBtn} style={{ backgroundColor: 'var(--color-secondary)' }}>
            {t('forts', 'Browse Forts')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
