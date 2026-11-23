import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/navigation/PublicNavbar';
import Footer from '../components/navigation/Footer';
import styles from './PublicLayout.module.css';

export default function PublicLayout() {
  return (
    <div className={styles.publicApp}>
      <PublicNavbar />
      <main className={styles.publicMain}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
