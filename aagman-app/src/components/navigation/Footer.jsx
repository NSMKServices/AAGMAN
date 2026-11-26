import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import {
  Castle,
  Landmark,
  Umbrella,
  BookOpen,
  Mountain,
  Trees,
  Compass,
  Sparkles,
  Map,
  Wallet,
  Video,
  Shield,
  Phone
} from '../common/Icons';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerGrid}>
          {/* Brand Info & Mission */}
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <img src="/aagman-brand.png" alt="AAGMAN — Maharashtra Tourism and Heritage" className={styles.brandLogoImage} />
            </div>
            <p className={styles.tagline}>
              {t('officialPlatform', 'Comprehensive Maharashtra tourism discovery and travel-planning platform celebrating the timeless splendor of Chhatrapati Shivaji Maharaj\'s royal forts, sacred pilgrimages, pristine Konkan coastlines, and living traditions.')}
            </p>
            <div className={styles.stateMotto}>
              <Shield size={16} color="var(--color-secondary)" />
              <span>"{t('stateMotto', 'जय जय महाराष्ट्र माझा, गर्जा महाराष्ट्र माझा')}"</span>
            </div>
          </div>

          {/* Tourism Categories */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>{t('destinations', 'Destinations & Circuits')}</h4>
            <ul className={styles.linksList}>
              <li>
                <Link to="/forts" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Castle size={16} /> {t('forts', 'Historic Forts & Sahyadris')}
                </Link>
              </li>
              <li>
                <Link to="/temples" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Landmark size={16} /> {t('temples', 'Sacred Temples & Shrines')}
                </Link>
              </li>
              <li>
                <Link to="/beaches" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Umbrella size={16} /> {t('beaches', 'Konkan Coastal Beaches')}
                </Link>
              </li>
              <li>
                <Link to="/heritage" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <BookOpen size={16} /> {t('heritage', 'UNESCO Caves & Heritage')}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=nature" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Mountain size={16} /> {t('nature', 'Nature & Hill Stations')}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=wildlife" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Trees size={16} /> {t('wildlife', 'Wildlife & Sanctuaries')}
                </Link>
              </li>
              <li>
                <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Compass size={16} /> {t('allDestinations', 'All Curated Sites')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Planning & Experiences */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>{t('itineraries', 'Plan Your Expedition')}</h4>
            <ul className={styles.linksList}>
              <li>
                <Link to="/planner" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Sparkles size={16} /> {t('planner', 'Smart Journey Planner')}
                </Link>
              </li>
              <li>
                <Link to="/map" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Map size={16} /> {t('interactiveMap', 'Interactive Route Atlas')}
                </Link>
              </li>
              <li>
                <Link to="/budget" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Wallet size={16} /> {t('budgetPlanner', 'Travel Cost Estimator')}
                </Link>
              </li>
              <li>
                <Link to="/festivals" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Sparkles size={16} /> {t('festivals', 'Festivals & Cultural Events')}
                </Link>
              </li>
              <li>
                <Link to="/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Video size={16} /> {t('videos', 'Videos & Experiences')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Helplines & Assistance */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>{t('helplineTitle', 'Helplines & Assistance')}</h4>
            <ul className={styles.helpList}>
              <li>
                <span className={styles.helpLabel}>{t('mtdcHelpline', 'MTDC Tourist Helpline')}:</span>
                <a href="tel:1800229930" className={styles.helpNumber}>1800-229-930</a>
              </li>
              <li>
                <span className={styles.helpLabel}>{t('emergencyHelpline', 'Emergency Response')}:</span>
                <a href="tel:112" className={styles.helpNumber}>112</a>
              </li>
              <li>
                <span className={styles.helpLabel}>{t('sahyadriRescue', 'Sahyadri Rescue')}:</span>
                <a href="tel:+919422012345" className={styles.helpNumber}>+91 94220 12345</a>
              </li>
              <li className={styles.contactActionRow}>
                <Link to="/contact" className={styles.contactBtn}>
                  {t('contactTourismLiaison', 'Contact Tourism Liaison →')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.bottomLinks}>
            <Link to="/about">{t('about', 'About AAGMAN')}</Link>
            <span className={styles.bottomDot}>•</span>
            <Link to="/faq">{t('faq', 'Travel Guidelines & FAQ')}</Link>
            <span className={styles.bottomDot}>•</span>
            <Link to="/contact">{t('contact', 'Contact Support')}</Link>
            <span className={styles.bottomDot}>•</span>
            <Link to="/settings">{t('settings', 'Settings & Preferences')}</Link>
            <span className={styles.bottomDot}>•</span>
            <Link to="/admin/login">{t('adminPortal', 'Admin Portal')}</Link>
          </div>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} {t('brandName', 'AAGMAN')} — {t('copyright', 'Official Maharashtra Cultural & Heritage Tourism Platform. Preserving and promoting the royal history, cultural heritage, and natural wonders of Maharashtra.')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
