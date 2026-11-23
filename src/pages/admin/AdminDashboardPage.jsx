import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { DESTINATIONS } from '../../data/destinations';
import { FESTIVALS } from '../../data/festivals';
import styles from './AdminPages.module.css';

export default function AdminDashboardPage() {
  const { adminProfile, role, isSuperAdmin, isContentManager, isEditor } = useAdminAuth();

  const totalDestinations = DESTINATIONS.length;
  const totalFestivals = FESTIVALS.length;
  const publishedCount = totalDestinations + totalFestivals;

  const roleLabels = {
    super_admin: 'Super Administrator',
    content_manager: 'Content Manager',
    editor: 'Editor'
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Administrative Overview</h1>
          <span className={styles.pageSubtitle}>
            Welcome back, <strong>{adminProfile?.full_name}</strong> • Role: <strong>{roleLabels[role] || role}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/admin/destinations" className={styles.actionBtnPrimary}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Manage Content</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.blue}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{totalDestinations}</span>
            <span className={styles.statLabel}>Heritage Destinations</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.amber}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{totalFestivals}</span>
            <span className={styles.statLabel}>Cultural Festivals</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.green}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{publishedCount}</span>
            <span className={styles.statLabel}>Live Published Entries</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.purple}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>RBAC</span>
            <span className={styles.statLabel}>RLS Policies Enforced</span>
          </div>
        </div>
      </div>

      {/* Role-Based Permissions Matrix */}
      <div className={styles.cardSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Administrative Permissions Matrix</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
            Current Tier: <strong style={{ color: '#1D68BD' }}>{roleLabels[role] || role}</strong>
          </span>
        </div>

        <div className={styles.matrixGrid}>
          {/* Super Admin Tier */}
          <div className={`${styles.matrixCard} ${isSuperAdmin ? styles.activeRole : ''}`}>
            <div className={styles.matrixHeader}>
              <span className={styles.matrixRoleTitle}>Super Administrator</span>
              {isSuperAdmin && <span className={`${styles.badge} ${styles.super_admin}`}>Your Role</span>}
            </div>
            <ul className={styles.matrixList}>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Full administrative access</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Create & manage administrator accounts</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Manage all destinations & festivals</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>System configuration & settings</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Audit logging & security analytics</span>
              </li>
            </ul>
          </div>

          {/* Content Manager Tier */}
          <div className={`${styles.matrixCard} ${role === 'content_manager' ? styles.activeRole : ''}`}>
            <div className={styles.matrixHeader}>
              <span className={styles.matrixRoleTitle}>Content Manager</span>
              {role === 'content_manager' && <span className={`${styles.badge} ${styles.content_manager}`}>Your Role</span>}
            </div>
            <ul className={styles.matrixList}>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Manage & edit destinations</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Manage & edit festivals</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Publish & archive content</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.crossIcon}>✕</span>
                <span>No admin account management</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.crossIcon}>✕</span>
                <span>No website-wide settings access</span>
              </li>
            </ul>
          </div>

          {/* Editor Tier */}
          <div className={`${styles.matrixCard} ${role === 'editor' ? styles.activeRole : ''}`}>
            <div className={styles.matrixHeader}>
              <span className={styles.matrixRoleTitle}>Editor</span>
              {role === 'editor' && <span className={`${styles.badge} ${styles.editor}`}>Your Role</span>}
            </div>
            <ul className={styles.matrixList}>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Draft and update content</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Submit content for review</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.crossIcon}>✕</span>
                <span>No direct publish/archive rights</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.crossIcon}>✕</span>
                <span>No administrator management</span>
              </li>
              <li className={styles.matrixItem}>
                <span className={styles.crossIcon}>✕</span>
                <span>No website-wide settings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
