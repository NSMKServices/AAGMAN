import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerGrid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <span className={styles.logoBadge}>🏛️</span>
              <span className={styles.brandTitle}>Aagman</span>
            </div>
            <p className={styles.tagline}>
              Official cultural & heritage tourism development platform celebrating the timeless splendor, royal forts, sacred temples, and coastal treasures of Maharashtra.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Circuits & Heritage</h4>
            <ul className={styles.linksList}>
              <li><Link to="/forts">Historic Forts & Sahyadris</Link></li>
              <li><Link to="/temples">Sacred Temples & Shrines</Link></li>
              <li><Link to="/beaches">Konkan Coastal Beaches</Link></li>
              <li><Link to="/heritage">UNESCO Caves & Architecture</Link></li>
              <li><Link to="/planner">AI Custom Travel Planner</Link></li>
            </ul>
          </div>

          {/* Account & Support */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Traveler Portal</h4>
            <ul className={styles.linksList}>
              <li><Link to="/login">Sign In to Account</Link></li>
              <li><Link to="/register">Create Traveler Profile</Link></li>
              <li><Link to="/dashboard">Saved Trips & Favorites</Link></li>
              <li><a href="#privacy">Privacy & Terms</a></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Aagman – Maharashtra Cultural & Heritage Tourism. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
