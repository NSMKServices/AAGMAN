import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const { adminProfile, role, logout, isSuperAdmin, demoAdminLogin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const roleLabels = {
    super_admin: 'Super Administrator',
    content_manager: 'Content Manager',
    editor: 'Editor'
  };

  return (
    <div className={styles.adminWrapper}>
      {/* Top Administrative Header */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.brandGroup}>
            <img src="/aagman-logo.svg" alt="AAGMAN" className={styles.emblemImage} />
            <div className={styles.brandDetails}>
              <span className={styles.portalTitle}>AAGMAN Admin Console</span>
              <span className={styles.portalSub}>Government of Maharashtra • Tourism & Heritage</span>
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>
          <Link to="/" className={styles.publicSiteLink} title="View live public tourism website" target="_blank">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <span>Public Site</span>
          </Link>

          <div className={styles.userSection}>
            <div className={styles.userMeta}>
              <span className={styles.userName}>{adminProfile?.full_name || 'Administrator'}</span>
              <span className={`${styles.rolePill} ${styles[role]}`}>
                {roleLabels[role] || role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className={styles.logoutBtn}
              title="Sign out of administrative portal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body with Navigation and Workspace */}
      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.navSection}>
            <span className={styles.navSectionTitle}>Navigation</span>
            <nav className={styles.nav}>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Dashboard Overview</span>
              </NavLink>

              <NavLink
                to="/admin/places"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 10.5 12 3l9 7.5V21H3z"></path><path d="M9 21v-7h6v7"></path>
                </svg>
                <span>Place Manager</span>
              </NavLink>

              <NavLink
                to="/admin/destinations"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Destinations</span>
              </NavLink>

              <NavLink
                to="/admin/festivals"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>Festivals</span>
              </NavLink>

              <NavLink
                to="/admin/videos"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                <span>YouTube Videos</span>
              </NavLink>
            </nav>
          </div>

          <div className={styles.navSection}>
            <span className={styles.navSectionTitle}>System Administration</span>
            <nav className={styles.nav}>
              <NavLink
                to="/admin/users"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Admin Accounts</span>
                {!isSuperAdmin && <span className={styles.lockBadge}>Super</span>}
              </NavLink>

              <NavLink
                to="/admin/audit-logs"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>Audit Trail</span>
              </NavLink>

              <NavLink
                to="/admin/settings"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>Platform Settings</span>
                {!isSuperAdmin && <span className={styles.lockBadge}>Super</span>}
              </NavLink>
            </nav>
          </div>

          <div className={styles.sidebarFooter}>
            <div className={styles.roleSwitcherHeader}>
              <span>Role Simulator</span>
            </div>
            <div className={styles.roleSwitcherButtons}>
              <button
                type="button"
                className={`${styles.roleSwitchBtn} ${role === 'super_admin' ? styles.roleSwitchActive : ''}`}
                onClick={() => demoAdminLogin('super_admin')}
              >
                Super
              </button>
              <button
                type="button"
                className={`${styles.roleSwitchBtn} ${role === 'content_manager' ? styles.roleSwitchActive : ''}`}
                onClick={() => demoAdminLogin('content_manager')}
              >
                Content
              </button>
              <button
                type="button"
                className={`${styles.roleSwitchBtn} ${role === 'editor' ? styles.roleSwitchActive : ''}`}
                onClick={() => demoAdminLogin('editor')}
              >
                Editor
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className={styles.contentArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
