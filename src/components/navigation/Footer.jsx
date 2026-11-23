import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import {
  Castle,
  Landmark,
  Umbrella,
  BookOpen,
  Compass,
  Sparkles,
  Map,
  Wallet,
  Video,
  Shield,
  Phone
} from '../common/Icons';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerGrid}>
          {/* Brand Info & Mission */}
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <div className={styles.logoBadge}>
                <Shield size={22} color="var(--color-gold)" />
              </div>
              <div className={styles.brandText}>
                <span className={styles.brandTitle}>AAGMAN</span>
                <span className={styles.brandSub}>MAHARASHTRA TOURISM</span>
              </div>
            </div>
            <p className={styles.tagline}>
              Comprehensive Maharashtra tourism discovery and travel-planning platform celebrating the timeless splendor of Chhatrapati Shivaji Maharaj's royal forts, sacred pilgrimages, pristine Konkan coastlines, and living traditions.
            </p>
            <div className={styles.stateMotto}>
              <Shield size={16} color="var(--color-secondary)" />
              <span>"जय जय महाराष्ट्र माझा, गर्जा महाराष्ट्र माझा"</span>
            </div>
          </div>

          {/* Tourism Categories */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Destinations & Circuits</h4>
            <ul className={styles.linksList}>
              <li>
                <Link to="/forts" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Castle size={16} /> Historic Forts & Sahyadris
                </Link>
              </li>
              <li>
                <Link to="/temples" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Landmark size={16} /> Sacred Temples & Shrines
                </Link>
              </li>
              <li>
                <Link to="/beaches" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Umbrella size={16} /> Konkan Coastal Beaches
                </Link>
              </li>
              <li>
                <Link to="/heritage" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <BookOpen size={16} /> UNESCO Caves & Heritage
                </Link>
              </li>
              <li>
                <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Compass size={16} /> All Curated Sites
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Planning & Experiences */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Plan Your Expedition</h4>
            <ul className={styles.linksList}>
              <li>
                <Link to="/planner" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Sparkles size={16} /> Smart Journey Planner
                </Link>
              </li>
              <li>
                <Link to="/map" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Map size={16} /> Interactive Route Atlas
                </Link>
              </li>
              <li>
                <Link to="/budget" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Wallet size={16} /> Travel Cost Estimator
                </Link>
              </li>
              <li>
                <Link to="/festivals" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Sparkles size={16} /> Festivals & Cultural Events
                </Link>
              </li>
              <li>
                <Link to="/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Video size={16} /> Videos & Experiences
                </Link>
              </li>
            </ul>
          </div>

          {/* Helplines & Assistance */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Helplines & Assistance</h4>
            <ul className={styles.helpList}>
              <li>
                <span className={styles.helpLabel}>MTDC Tourist Helpline:</span>
                <a href="tel:1800229930" className={styles.helpNumber}>1800-229-930</a>
              </li>
              <li>
                <span className={styles.helpLabel}>Emergency Response:</span>
                <a href="tel:112" className={styles.helpNumber}>112</a>
              </li>
              <li>
                <span className={styles.helpLabel}>Sahyadri Rescue:</span>
                <a href="tel:+919422012345" className={styles.helpNumber}>+91 94220 12345</a>
              </li>
              <li className={styles.contactActionRow}>
                <Link to="/contact" className={styles.contactBtn}>Contact Tourism Liaison →</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.bottomLinks}>
            <Link to="/about">About AAGMAN</Link>
            <span className={styles.bottomDot}>•</span>
            <Link to="/faq">Travel Guidelines & FAQ</Link>
            <span className={styles.bottomDot}>•</span>
            <Link to="/contact">Contact Support</Link>
            <span className={styles.bottomDot}>•</span>
            <Link to="/settings">Settings & Preferences</Link>
          </div>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} AAGMAN — Official Maharashtra Cultural & Heritage Tourism Platform. Preserving and promoting the royal history, cultural heritage, and natural wonders of Maharashtra.
          </p>
        </div>
      </Container>
    </footer>
  );
}
