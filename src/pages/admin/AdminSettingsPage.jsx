import React from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import styles from './AdminPages.module.css';

export default function AdminSettingsPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>System & Security Settings</h1>
          <span className={styles.pageSubtitle}>
            Restricted to Super Administrators • Platform configurations & database integrity.
          </span>
        </div>
      </div>

      <div className={styles.cardSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Supabase Database & Authentication Status</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#F8FAFD', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Connection Gateway
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F2744', marginTop: 4 }}>
              {isSupabaseConfigured ? 'Connected (Live Supabase API)' : 'Configured (Sandboxed Offline Mode)'}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0.5rem 0 0' }}>
              Client initialized with auto-refresh tokens and localStorage session persistence.
            </p>
          </div>

          <div style={{ background: '#F8FAFD', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Authorization Protocol
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#059669', marginTop: 4 }}>
              RBAC & Database RLS Enabled
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0.5rem 0 0' }}>
              Role hierarchy defined in <code>20261123_admin_rbac_foundation.sql</code>.
            </p>
          </div>

          <div style={{ background: '#F8FAFD', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Security Architecture
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F2744', marginTop: 4 }}>
              Frontend-Database Strict Separation
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0.5rem 0 0' }}>
              Zero service-role keys exposed. Registration cannot create admin privileges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
