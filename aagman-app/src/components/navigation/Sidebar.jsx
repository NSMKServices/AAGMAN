import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  Backpack,
  Heart,
  Wallet,
  Settings,
  Sparkles,
  Map,
  Video,
  HelpCircle,
  Shield,
  ArrowRight,
  X
} from '../common/Icons';
import { useLanguage } from '../../context/LanguageContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  const DASHBOARD_ITEMS = [
    { to: "/dashboard", label: "Dashboard Overview", icon: Compass, exact: true },
    { to: "/trips", label: t('myTrips'), icon: Backpack },
    { to: "/wishlist", label: t('wishlist'), icon: Heart, badge: wishlistCount > 0 ? wishlistCount : null },
    { to: "/budget", label: t('budgetPlanner'), icon: Wallet },
    { to: "/settings", label: t('settings'), icon: Settings },
  ];

  const PUBLIC_SHORTCUTS = [
    { to: "/explore", label: "Explore Destinations", icon: Compass },
    { to: "/planner", label: "Smart Itinerary Planner", icon: Sparkles },
    { to: "/map", label: "Interactive Route Atlas", icon: Map },
    { to: "/videos", label: "Videos & Experiences", icon: Video },
    { to: "/faq", label: "Travel FAQ & Helplines", icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Brand Header */}
        <div className={styles.brandSection}>
          <Link to="/" className={styles.brandLink} onClick={onClose}>
            <div className={styles.logoBadge}>
              <Shield size={22} color="var(--color-gold)" />
            </div>
            <div className={styles.brandInfo}>
              <span className={styles.brandTitle}>AAGMAN</span>
              <span className={styles.brandSubtitle}>TRAVELER PORTAL</span>
            </div>
          </Link>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Back to Public Explorer */}
        <div className={styles.returnSection}>
          <Link to="/" className={styles.returnBtn} onClick={onClose}>
            ← Back to Explore Maharashtra
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className={styles.navMenu}>
          <div className={styles.menuSectionTitle}>MY EXPEDITIONS</div>
          {DASHBOARD_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.activeItem : ''}`
                }
                onClick={onClose}
              >
                <span className={styles.itemIcon}>
                  <IconComponent size={18} />
                </span>
                <span className={styles.itemLabel}>{item.label}</span>
                {item.badge && (
                  <span className={styles.itemBadge}>{item.badge}</span>
                )}
              </NavLink>
            );
          })}

          <div className={styles.menuSectionTitle}>TOURISM DISCOVERY</div>
          {PUBLIC_SHORTCUTS.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.activeItem : ''}`
                }
                onClick={onClose}
              >
                <span className={styles.itemIcon}>
                  <IconComponent size={18} />
                </span>
                <span className={styles.itemLabel}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Cultural Callout */}
        <div className={styles.sidebarFooter}>
          <div className={styles.culturalCard}>
            <Shield size={24} color="var(--color-accent)" />
            <div>
              <p className={styles.cardHeader}>जय शिवराय</p>
              <p className={styles.cardMotto}>Celebrating Maharashtra's Timeless Grandeur</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
