import React from 'react';
import styles from './AdminModal.module.css';

export default function AdminDeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = 'Entry'
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
        <div className={styles.confirmBox}>
          <div className={styles.warningIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>

          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: '#0F2744', fontWeight: 800 }}>
            Confirm Permanent Deletion
          </h3>

          <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
            Are you sure you want to permanently delete <strong>"{itemName}"</strong> from the {itemType} directory?
          </p>

          <p style={{ fontSize: '0.775rem', color: '#B91C1C', background: '#FEF2F2', padding: '0.5rem 0.75rem', borderRadius: 6, margin: '0 0 1.5rem', border: '1px solid #FCA5A5' }}>
            Warning: This action will remove the record and cannot be undone. Associated public route links will be deactivated.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancel, Keep Entry
            </button>
            <button type="button" className={styles.btnDelete} onClick={onConfirm}>
              Yes, Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
