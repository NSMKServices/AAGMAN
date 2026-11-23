import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminAccessDenied.module.css';

export default function AdminAccessDeniedPage({ requiredRoles = [], currentRole = 'editor', adminName }) {
  const roleLabels = {
    super_admin: 'Super Administrator',
    content_manager: 'Content Manager',
    editor: 'Editor'
  };

  const formattedRequired = requiredRoles.map(r => roleLabels[r] || r).join(' or ');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconCircle}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h1 className={styles.title}>Administrative Access Restricted</h1>
        <p className={styles.subtitle}>
          This section of the AAGMAN Administrative Portal requires elevated privileges.
        </p>

        <div className={styles.detailsBox}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Signed in as:</span>
            <span className={styles.detailValue}>{adminName || 'Administrator'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Your Role:</span>
            <span className={`${styles.badge} ${styles[currentRole]}`}>
              {roleLabels[currentRole] || currentRole}
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Required Role:</span>
            <span className={styles.requiredValue}>{formattedRequired}</span>
          </div>
        </div>

        <p className={styles.helpText}>
          If your administrative responsibilities require access to this module, please contact a 
          <strong> Super Administrator</strong> to request a role elevation in Supabase.
        </p>

        <div className={styles.actions}>
          <Link to="/admin" className={styles.primaryBtn}>
            Return to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
