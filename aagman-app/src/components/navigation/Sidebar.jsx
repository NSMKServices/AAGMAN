import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useWishlist } from '../../context/WishlistContext';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { wishlistCount } = useWishlist();

  const NAV_ITEMS = [
    { to: "/", label: t('dashboard'), icon: "🏛️", exact: true },
    { to: "/explore", label: t('exploreDestinations'), icon: "🧭" },
    { to: "/heritage-culture", label: t('heritageCulture'), icon: "📜" },
    { to: "/map", label: t('interactiveMap'), icon: "🗺️" },
    { to: "/festivals", label: t('festivals'), icon: "🪔" },
    { to: "/trips", label: t('myTrips'), icon: "🎒" },
    { to: "/wishlist", label: t('wishlist'), icon: "❤️", badge: wishlistCount > 0 ? wishlistCount : null },
    { to: "/budget", label: t('budgetPlanner'), icon: "💰" },
    { to: "/planner", label: t('aiPlanner'), icon: "✨" },
    { to: "/faq", label: t('faq'), icon: "❓" },
    { to: "/settings", label: t('settings'), icon: "⚙️" },
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
              <span className={styles.logoSymbol}>🔱</span>
            </div>
            <div className={styles.brandInfo}>
              <span className={styles.brandTitle}>AAGMAN</span>
              <span className={styles.brandSubtitle}>महाराष्ट्र पर्यटन</span>
            </div>
          </Link>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className={styles.navMenu}>
          <div className={styles.menuSectionTitle}>NAVIGATION</div>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeItem : ''}`
              }
              onClick={onClose}
            >
              <span className={styles.itemIcon}>{item.icon}</span>
              <span className={styles.itemLabel}>{item.label}</span>
              {item.badge && (
                <span className={styles.itemBadge}>{item.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Cultural Callout */}
        <div className={styles.sidebarFooter}>
          <div className={styles.culturalCard}>
            <span className={styles.fortEmblem}>🚩</span>
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
