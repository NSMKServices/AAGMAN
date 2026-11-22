import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Container from '../layout/Container';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <Container className={styles.navbarInner}>
        {/* Brand Logo */}
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <div className={styles.logoBadge}>
            <span className={styles.logoIcon}>🏛️</span>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Aagman</span>
            <span className={styles.brandSubtitle}>Maharashtra Tourism</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.navLinks}>
          <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Home
          </NavLink>
          <NavLink to="/forts" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Forts & Sahyadris
          </NavLink>
          <NavLink to="/temples" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Temples & Shrines
          </NavLink>
          <NavLink to="/beaches" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Konkan Beaches
          </NavLink>
          <NavLink to="/heritage" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Heritage & Caves
          </NavLink>
          <NavLink to="/planner" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            AI Planner
          </NavLink>
        </nav>

        {/* Right Actions: Theme Toggle, Auth Buttons, Mobile Toggle */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <Link to="/login" className={styles.loginBtn}>
            Sign In
          </Link>
          <Link to="/register" className={styles.registerBtn}>
            Register
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <Container className={styles.mobileDrawerInner}>
            <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/forts" className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink} onClick={closeMenu}>
              Forts & Sahyadris
            </NavLink>
            <NavLink to="/temples" className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink} onClick={closeMenu}>
              Temples & Shrines
            </NavLink>
            <NavLink to="/beaches" className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink} onClick={closeMenu}>
              Konkan Beaches
            </NavLink>
            <NavLink to="/heritage" className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink} onClick={closeMenu}>
              Heritage & Caves
            </NavLink>
            <NavLink to="/planner" className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink} onClick={closeMenu}>
              AI Planner
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink} onClick={closeMenu}>
              My Dashboard
            </NavLink>
            <div className={styles.mobileAuthRow}>
              <Link to="/login" className={styles.loginBtn} onClick={closeMenu}>Sign In</Link>
              <Link to="/register" className={styles.registerBtn} onClick={closeMenu}>Register</Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
