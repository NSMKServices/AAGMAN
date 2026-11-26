import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import TopNav from '../components/navigation/TopNav';
import Footer from '../components/navigation/Footer';
import { useAuth } from '../context/AuthContext';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div role="status" style={{ padding: '3rem', textAlign: 'center' }}>Checking your traveller session…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.dashboardShell}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className={styles.mainWrapper}>
        <TopNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
