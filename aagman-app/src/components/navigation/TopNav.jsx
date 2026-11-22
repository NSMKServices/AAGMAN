import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';
import { DESTINATIONS } from '../../data/destinations';
import styles from './TopNav.module.css';

export default function TopNav({ onToggleSidebar }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Filter destinations based on search query
  const searchResults = searchQuery.trim()
    ? DESTINATIONS.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.marathiName && d.marathiName.includes(searchQuery)) ||
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (dest) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    navigate(`/${dest.category}/${dest.slug}`);
  };

  return (
    <header className={styles.topNav}>
      <div className={styles.leftGroup}>
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className={styles.hamburgerBtn}
          onClick={onToggleSidebar}
          aria-label="Open sidebar navigation"
        >
          ☰
        </button>

        {/* Global Destination Search Bar */}
        <div className={styles.searchContainer} ref={searchRef}>
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearSearchBtn}
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}

          {/* Instant Dropdown Search Results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className={styles.searchResultsDropdown}>
              <div className={styles.dropdownHeader}>DESTINATION MATCHES</div>
              {searchResults.map((dest) => (
                <div
                  key={dest.id}
                  className={styles.searchResultItem}
                  onClick={() => handleSelectResult(dest)}
                >
                  <img
                    src={dest.thumbnail || dest.heroImage}
                    alt={dest.name}
                    className={styles.resultThumb}
                  />
                  <div className={styles.resultInfo}>
                    <div className={styles.resultTitle}>{dest.name}</div>
                    <div className={styles.resultMeta}>
                      <span>📍 {dest.district}</span>
                      <span className={styles.resultCategory}>{dest.category.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightGroup}>
        {/* Language Selector (EN, MR, HI) */}
        <div className={styles.languageSelector}>
          <button
            type="button"
            className={`${styles.langBtn} ${language === 'en' ? styles.activeLang : ''}`}
            onClick={() => setLanguage('en')}
            title="English"
          >
            EN
          </button>
          <span className={styles.langDivider}>|</span>
          <button
            type="button"
            className={`${styles.langBtn} ${language === 'mr' ? styles.activeLang : ''}`}
            onClick={() => setLanguage('mr')}
            title="मराठी (Marathi)"
          >
            मराठी
          </button>
          <span className={styles.langDivider}>|</span>
          <button
            type="button"
            className={`${styles.langBtn} ${language === 'hi' ? styles.activeLang : ''}`}
            onClick={() => setLanguage('hi')}
            title="हिन्दी (Hindi)"
          >
            हिन्दी
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          className={styles.actionBtn}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Wishlist Quick Badge */}
        <Link to="/wishlist" className={styles.actionBtn} title={t('wishlist')}>
          <span>❤️</span>
          {wishlistCount > 0 && (
            <span className={styles.badgeCount}>{wishlistCount}</span>
          )}
        </Link>

        {/* Notifications Dropdown */}
        <div className={styles.menuWrapper} ref={notifRef}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            title="Notifications"
          >
            <span>🔔</span>
            <span className={styles.pulseDot} />
          </button>

          {showNotifications && (
            <div className={styles.dropdownMenu}>
              <div className={styles.menuTitle}>TOURISM ANNOUNCEMENTS</div>
              <div className={styles.notificationItem}>
                <p className={styles.notifText}>🚩 <strong>Shiv Jayanti Celebrations</strong> preparations announced at Shivneri & Raigad Forts.</p>
                <span className={styles.notifTime}>Today</span>
              </div>
              <div className={styles.notificationItem}>
                <p className={styles.notifText}>🌊 <strong>Konkan Coastal Season:</strong> Scuba diving & dolphin safaris active at Tarkarli & Malvan.</p>
                <span className={styles.notifTime}>Active Season</span>
              </div>
              <div className={styles.notificationItem}>
                <p className={styles.notifText}>🛕 <strong>Ellora Festival 2027:</strong> Dates finalized for the classical Kailasa Temple heritage showcase.</p>
                <span className={styles.notifTime}>3 days ago</span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Menu */}
        <div className={styles.menuWrapper} ref={profileRef}>
          <button
            type="button"
            className={styles.profileBtn}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="User profile menu"
          >
            <div className={styles.avatar}>MK</div>
            <div className={styles.userText}>
              <span className={styles.userName}>Traveler</span>
              <span className={styles.userRole}>Sahyadri Explorer</span>
            </div>
            <span className={styles.dropdownArrow}>▾</span>
          </button>

          {showProfileMenu && (
            <div className={styles.dropdownMenu}>
              <div className={styles.menuTitle}>TRAVELER PROFILE</div>
              <Link to="/trips" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                🎒 {t('myTrips')}
              </Link>
              <Link to="/wishlist" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                ❤️ {t('wishlist')} ({wishlistCount})
              </Link>
              <Link to="/budget" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                💰 {t('budgetPlanner')}
              </Link>
              <Link to="/settings" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                ⚙️ {t('settings')}
              </Link>
              <div className={styles.menuDivider} />
              <button
                type="button"
                className={styles.menuLink}
                onClick={() => {
                  setShowProfileMenu(false);
                  alert('You are browsing in College Demonstration Mode with local persistence enabled.');
                }}
              >
                ℹ️ Demo Mode Info
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
