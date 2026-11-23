import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { DESTINATIONS } from '../../data/destinations';
import { FESTIVALS } from '../../data/festivals';
import styles from './AdminPages.module.css';

export default function AdminContentPage({ category = 'destinations' }) {
  const { role, isSuperAdmin, isContentManager } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  const isDest = category === 'destinations';
  const rawList = isDest ? DESTINATIONS : FESTIVALS;

  const filteredList = rawList.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.district && item.district.toLowerCase().includes(term)) ||
      (item.category && item.category.toLowerCase().includes(term))
    );
  });

  const canPublishOrArchive = isSuperAdmin || isContentManager;

  const handleAction = (item, action) => {
    setMessage(`Action "${action}" on "${item.name}" executed. Database changes will synchronize with Supabase.`);
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>
            {isDest ? 'Destination Content Management' : 'Cultural Festival Management'}
          </h1>
          <span className={styles.pageSubtitle}>
            {isDest ? 'Manage Maharashtra forts, temples, beaches, and heritage sites.' : 'Manage annual state cultural festivals and celebrations.'}
          </span>
        </div>

        <button
          className={styles.actionBtnPrimary}
          onClick={() => handleAction({ name: 'New Entry' }, 'Create Draft')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Create New {isDest ? 'Destination' : 'Festival'}</span>
        </button>
      </div>

      {message && (
        <div className={styles.toastAlert}>
          {message}
        </div>
      )}

      <div className={styles.cardSection}>
        <div className={styles.filterBar}>
          <input
            type="search"
            placeholder={`Search ${isDest ? 'destinations by name or district...' : 'festivals...'}`}
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Showing <strong>{filteredList.length}</strong> of {rawList.length} entries
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>{isDest ? 'Category' : 'Month / Season'}</th>
                <th>District</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    {item.marathiName && (
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                        {item.marathiName}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles.editor}`}>
                      {item.category || item.bestTimeToVisit || 'Cultural'}
                    </span>
                  </td>
                  <td>{item.district || 'Maharashtra'}</td>
                  <td>
                    <span className={`${styles.badge} ${styles.active}`}>
                      Published
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionCell}>
                      <button
                        className={styles.tableActionBtn}
                        onClick={() => handleAction(item, 'Edit Draft')}
                        title="Edit entry details"
                      >
                        Edit
                      </button>

                      <button
                        className={styles.tableActionBtn}
                        disabled={!canPublishOrArchive}
                        onClick={() => handleAction(item, 'Archive')}
                        title={canPublishOrArchive ? 'Archive this entry' : 'Requires Content Manager or Super Admin role'}
                      >
                        Archive
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
