import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import TopNav from '../components/navigation/TopNav';
import Footer from '../components/navigation/Footer';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.dashboardShell}>
      {/* Traveler Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Traveler Content Wrapper */}
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
