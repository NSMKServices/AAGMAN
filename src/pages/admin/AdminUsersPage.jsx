import React, { useState } from 'react';
import styles from './AdminPages.module.css';

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState([
    {
      id: 'usr-1',
      full_name: 'Dr. Yashwantrao Deshmukh',
      email: 'director@aagman.maharashtra.gov.in',
      role: 'super_admin',
      is_active: true,
      last_sign_in_at: 'Today at 09:15 AM'
    },
    {
      id: 'usr-2',
      full_name: 'Ananya Kulkarni',
      email: 'content.lead@aagman.maharashtra.gov.in',
      role: 'content_manager',
      is_active: true,
      last_sign_in_at: 'Yesterday at 04:30 PM'
    },
    {
      id: 'usr-3',
      full_name: 'Vikram Shinde',
      email: 'heritage.editor@aagman.maharashtra.gov.in',
      role: 'editor',
      is_active: true,
      last_sign_in_at: '3 days ago'
    }
  ]);

  const [message, setMessage] = useState(null);

  const toggleStatus = (id) => {
    setAdmins(prev => prev.map(a => {
      if (a.id === id) {
        const updated = !a.is_active;
        setMessage(`Administrator account "${a.full_name}" is now ${updated ? 'Active' : 'Deactivated'}.`);
        setTimeout(() => setMessage(null), 3500);
        return { ...a, is_active: updated };
      }
      return a;
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Administrator Account Management</h1>
          <span className={styles.pageSubtitle}>
            Restricted to Super Administrators • Manage administrative roles and accounts in Supabase.
          </span>
        </div>

        <button
          className={styles.actionBtnPrimary}
          onClick={() => {
            setMessage('Invitation modal initiated. Super Admins can add new accounts via Supabase Auth + admin_profiles.');
            setTimeout(() => setMessage(null), 4000);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Invite New Administrator</span>
        </button>
      </div>

      {message && (
        <div className={styles.toastAlert}>
          {message}
        </div>
      )}

      <div className={styles.cardSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Registered Administrators ({admins.length})</h2>
          <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
            Protected by Row Level Security (RLS)
          </span>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Official Email</th>
                <th>Assigned Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td>
                    <strong>{admin.full_name}</strong>
                  </td>
                  <td>{admin.email}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[admin.role]}`}>
                      {admin.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${admin.is_active ? styles.active : styles.draft}`}>
                      {admin.is_active ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td style={{ color: '#64748B' }}>{admin.last_sign_in_at}</td>
                  <td>
                    <div className={styles.actionCell}>
                      <button
                        className={styles.tableActionBtn}
                        onClick={() => toggleStatus(admin.id)}
                        disabled={admin.role === 'super_admin'}
                        title={admin.role === 'super_admin' ? 'Cannot deactivate primary Super Admin' : 'Toggle account active status'}
                      >
                        {admin.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
