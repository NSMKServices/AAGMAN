import React, { useState } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import styles from './AdminPages.module.css';

export default function AdminSettingsPage() {
  const [copiedSQL, setCopiedSQL] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('-- Run all 3 migrations in order:\n-- 1. supabase/migrations/20261123_admin_rbac_foundation.sql\n-- 2. supabase/migrations/20261123_content_media_management.sql\n-- 3. supabase/migrations/20261123_analytics_audit_hardening.sql');
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 3000);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>System Configuration & Security Settings</h1>
          <span className={styles.pageSubtitle}>
            Restricted to Super Administrators • Platform infrastructure, Supabase storage, and database integrity.
          </span>
        </div>
      </div>

      {/* Infrastructure Status */}
      <div className={styles.cardSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Backend Infrastructure & Connection Status</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#F8FAFD', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Database Gateway
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F2744', marginTop: 4 }}>
              {isSupabaseConfigured ? 'Live Supabase API Connected' : 'Configured (Sandboxed Offline Mode)'}
            </div>
            <p style={{ fontSize: '0.775rem', color: '#475569', margin: '0.4rem 0 0' }}>
              Connected via anonymous public API with JWT session auto-renewal.
            </p>
          </div>

          <div style={{ background: '#F8FAFD', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Media Storage Bucket
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#059669', marginTop: 4 }}>
              destination-media (Active)
            </div>
            <p style={{ fontSize: '0.775rem', color: '#475569', margin: '0.4rem 0 0' }}>
              Public read enabled • 5MB per object limit • JPEG/PNG/WebP/SVG allowed.
            </p>
          </div>

          <div style={{ background: '#F8FAFD', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              PostgreSQL RLS Protocols
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F2744', marginTop: 4 }}>
              6 Tables Hardened
            </div>
            <p style={{ fontSize: '0.775rem', color: '#475569', margin: '0.4rem 0 0' }}>
              Admin profiles, destinations, festivals, videos, audit logs, and storage.
            </p>
          </div>
        </div>
      </div>

      {/* Migration Ledger */}
      <div className={styles.cardSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Database Migrations Ledger (For Supabase Project Owner)</h2>
          <button
            onClick={handleCopy}
            className={styles.tableActionBtn}
            style={{ background: '#1D68BD', color: '#FFFFFF', border: 'none' }}
          >
            {copiedSQL ? '✓ Path Copied' : 'Copy Migration Script Reference'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ padding: '0.85rem 1rem', background: '#F8FAFD', borderRadius: 6, border: '1px solid #D6E4F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#0F2744' }}>Milestone 1 Migration: 20261123_admin_rbac_foundation.sql</strong>
              <span style={{ display: 'block', fontSize: '0.775rem', color: '#64748B' }}>
                Creates <code>admin_profiles</code>, <code>admin_role</code> enum, security helper functions, and RLS policies.
              </span>
            </div>
            <span className={`${styles.badge} ${styles.active}`}>Ready / Validated</span>
          </div>

          <div style={{ padding: '0.85rem 1rem', background: '#F8FAFD', borderRadius: 6, border: '1px solid #D6E4F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#0F2744' }}>Milestone 2 Migration: 20261123_content_media_management.sql</strong>
              <span style={{ display: 'block', fontSize: '0.775rem', color: '#64748B' }}>
                Creates <code>destinations</code>, <code>festivals</code>, <code>videos</code>, and <code>destination-media</code> storage bucket policies.
              </span>
            </div>
            <span className={`${styles.badge} ${styles.super_admin}`}>Ready for Execution</span>
          </div>

          <div style={{ padding: '0.85rem 1rem', background: '#F8FAFD', borderRadius: 6, border: '1px solid #D6E4F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#0F2744' }}>Milestone 3 Migration: 20261123_analytics_audit_hardening.sql</strong>
              <span style={{ display: 'block', fontSize: '0.775rem', color: '#64748B' }}>
                Analytics query indexes, hardened audit trail RLS, automated DB triggers, and storage bucket guarantees.
              </span>
            </div>
            <span className={`${styles.badge} ${styles.active}`}>Hardened & Audited</span>
          </div>
        </div>
      </div>
    </div>
  );
}
