import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { auditService } from '../../services/auditService';
import styles from './AdminPages.module.css';

const USERS_STORAGE_KEY = 'aagman_admin_profiles_cache';

const INITIAL_PROFILES = [
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
];

export default function AdminUsersPage() {
  const { adminProfile, role, isSuperAdmin } = useAdminAuth();
  const [admins, setAdmins] = useState(() => {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return INITIAL_PROFILES;
  });

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('editor');

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfiles() {
      if (isSupabaseConfigured) {
        try {
          const { data, error: sbError } = await supabase
            .from('admin_profiles')
            .select('*')
            .order('created_at', { ascending: true });

          if (!sbError && data && data.length > 0) {
            setAdmins(data);
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
          }
        } catch (err) {
          console.warn('Supabase admin_profiles query fallback to local cache:', err);
        }
      }
    }
    fetchProfiles();
  }, []);

  const showNotification = (msg, isErr = false) => {
    if (isErr) {
      setError(msg);
      setTimeout(() => setError(null), 4000);
    } else {
      setMessage(msg);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const handleToggleStatus = async (targetAdmin) => {
    if (!isSuperAdmin) {
      showNotification('Unauthorized: Only Super Administrators can modify account status.', true);
      return;
    }

    if (targetAdmin.id === adminProfile?.id) {
      showNotification('Security Restriction: You cannot deactivate your own administrative account.', true);
      return;
    }

    const updatedStatus = !targetAdmin.is_active;

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('admin_profiles')
          .update({ is_active: updatedStatus })
          .eq('id', targetAdmin.id);
      } catch (err) {
        console.warn('Supabase update status failed, saving locally:', err);
      }
    }

    setAdmins(prev => {
      const updated = prev.map(a => a.id === targetAdmin.id ? { ...a, is_active: updatedStatus } : a);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    auditService.logAction({
      adminProfile,
      action: 'USER_STATUS_CHANGE',
      entityType: 'user',
      entityId: targetAdmin.id,
      details: {
        admin_name: targetAdmin.full_name,
        email: targetAdmin.email,
        new_status: updatedStatus ? 'active' : 'deactivated'
      }
    }).catch(err => console.warn('Audit log error:', err));

    showNotification(`Administrator "${targetAdmin.full_name}" is now ${updatedStatus ? 'Active' : 'Deactivated'}.`);
  };

  const handleRoleChange = async (targetAdmin, newRole) => {
    if (!isSuperAdmin) {
      showNotification('Unauthorized: Only Super Administrators can alter administrative roles.', true);
      return;
    }

    if (targetAdmin.id === adminProfile?.id && newRole !== 'super_admin') {
      showNotification('Security Restriction: You cannot demote your own Super Admin account.', true);
      return;
    }

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('admin_profiles')
          .update({ role: newRole })
          .eq('id', targetAdmin.id);
      } catch (err) {
        console.warn('Supabase update role failed, saving locally:', err);
      }
    }

    setAdmins(prev => {
      const updated = prev.map(a => a.id === targetAdmin.id ? { ...a, role: newRole } : a);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    auditService.logAction({
      adminProfile,
      action: 'USER_ROLE_CHANGE',
      entityType: 'user',
      entityId: targetAdmin.id,
      details: {
        admin_name: targetAdmin.full_name,
        email: targetAdmin.email,
        old_role: targetAdmin.role,
        new_role: newRole
      }
    }).catch(err => console.warn('Audit log error:', err));

    showNotification(`Assigned role "${newRole.replace('_', ' ')}" to "${targetAdmin.full_name}".`);
  };

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    if (!isSuperAdmin) {
      showNotification('Unauthorized: Only Super Administrators can invite new administrative accounts.', true);
      return;
    }

    const newProfile = {
      id: `usr-${Date.now()}`,
      full_name: inviteName.trim(),
      email: inviteEmail.trim().toLowerCase(),
      role: inviteRole,
      is_active: true,
      last_sign_in_at: 'Invited (Pending)'
    };

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('admin_profiles')
          .insert({
            id: newProfile.id,
            email: newProfile.email,
            full_name: newProfile.full_name,
            role: newProfile.role,
            is_active: true
          });
      } catch (err) {
        console.warn('Supabase insert failed, saving locally:', err);
      }
    }

    setAdmins(prev => {
      const updated = [...prev, newProfile];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    auditService.logAction({
      adminProfile,
      action: 'USER_INVITE',
      entityType: 'user',
      entityId: newProfile.id,
      details: {
        invited_name: newProfile.full_name,
        invited_email: newProfile.email,
        assigned_role: newProfile.role
      }
    }).catch(err => console.warn('Audit log error:', err));

    showNotification(`Invitation issued for "${newProfile.full_name}" as ${newProfile.role.replace('_', ' ')}.`);
    setIsInviteOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInviteRole('editor');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Administrator Account & RBAC Management</h1>
          <span className={styles.pageSubtitle}>
            Restricted to Super Administrators • Manage roles, active states, and administrative authorizations.
          </span>
        </div>

        <button className={styles.actionBtnPrimary} onClick={() => setIsInviteOpen(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Invite Administrator</span>
        </button>
      </div>

      {message && <div className={styles.toastAlert}>{message}</div>}
      {error && <div className={styles.toastAlert} style={{ background: '#FEF2F2', borderColor: '#FCA5A5', color: '#B91C1C' }}>{error}</div>}

      <div className={styles.cardSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Active Administrators ({admins.length})</h2>
          <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
            PostgreSQL RLS Protected • admin_profiles
          </span>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Administrator Name</th>
                <th>Official Email</th>
                <th>Administrative Role</th>
                <th>Access Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => {
                const isCurrent = admin.id === adminProfile?.id;
                return (
                  <tr key={admin.id}>
                    <td>
                      <strong>{admin.full_name}</strong>
                      {isCurrent && (
                        <span style={{ fontSize: '0.7rem', color: '#1D68BD', marginLeft: 6, fontWeight: 700 }}>
                          (You)
                        </span>
                      )}
                    </td>
                    <td>{admin.email}</td>
                    <td>
                      <select
                        value={admin.role}
                        onChange={(e) => handleRoleChange(admin, e.target.value)}
                        disabled={!isSuperAdmin || isCurrent}
                        style={{
                          padding: '0.3rem 0.5rem',
                          borderRadius: 4,
                          border: '1px solid #CBDCEE',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: '#FFFFFF'
                        }}
                      >
                        <option value="super_admin">Super Administrator</option>
                        <option value="content_manager">Content Manager</option>
                        <option value="editor">Editor</option>
                      </select>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${admin.is_active ? styles.active : styles.draft}`}>
                        {admin.is_active ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td style={{ color: '#64748B', fontSize: '0.8rem' }}>{admin.last_sign_in_at || 'Recent'}</td>
                    <td>
                      <div className={styles.actionCell}>
                        <button
                          className={styles.tableActionBtn}
                          onClick={() => handleToggleStatus(admin)}
                          disabled={!isSuperAdmin || isCurrent}
                          title={isCurrent ? 'Cannot deactivate self' : 'Toggle status'}
                        >
                          {admin.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(11, 27, 51, 0.7)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF', borderRadius: 10, width: '100%', maxWidth: 480,
            padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid #D6E4F0'
          }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', color: '#0F2744', fontWeight: 800 }}>
              Invite Administrator to AAGMAN
            </h3>

            <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: '#0F2744' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Joshi"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBDCEE', borderRadius: 6, fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: '#0F2744' }}>
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@aagman.maharashtra.gov.in"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBDCEE', borderRadius: 6, fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: '#0F2744' }}>
                  Assign Initial Role *
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBDCEE', borderRadius: 6, fontSize: '0.85rem' }}
                >
                  <option value="editor">Editor (Draft & Update Content)</option>
                  <option value="content_manager">Content Manager (Publish, Archive & Media)</option>
                  <option value="super_admin">Super Administrator (Full System Authority)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  style={{ padding: '0.55rem 1rem', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: 6, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.55rem 1.25rem', background: '#1D68BD', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Confirm Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
