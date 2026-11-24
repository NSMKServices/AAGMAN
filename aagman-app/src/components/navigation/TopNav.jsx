import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { contentService } from '../../services/contentService';
import {
  Search,
  X,
  Menu,
  Sun,
  Moon,
  Heart,
  Bell,
  MapPin,
  Route,
  Backpack,
  Wallet,
  Settings,
  LogOut,
  ChevronDown,
  Castle,
  Umbrella,
  Landmark
} from '../common/Icons';
import styles from './TopNav.module.css';

export default function TopNav({ onToggleSidebar }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Filter destinations based on search query
  useEffect(() => {
    const unsubscribe = contentService.subscribe(({ destinations: records }) => setDestinations(records));
    contentService.getAllDestinations();
    return unsubscribe;
  }, []);

  const searchResults = searchQuery.trim()
    ? destinations.filter(d => d.status === 'published' &&
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.marathiName && d.marathiName.includes(searchQuery)) ||
        (d.district || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          <Menu size={20} />
        </button>

        {/* Global Destination Search Bar */}
        <div className={styles.searchContainer} ref={searchRef}>
          <span className={styles.searchIcon} aria-hidden="true">
            <Search size={16} />
          </span>
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
              <X size={14} />
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
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> {dest.district}
                      </span>
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
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Wishlist Quick Badge */}
        <Link to="/wishlist" className={styles.actionBtn} title={t('wishlist')}>
          <Heart size={18} />
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
            <Bell size={18} />
            <span className={styles.pulseDot} />
          </button>

          {showNotifications && (
            <div className={styles.dropdownMenu}>
              <div className={styles.menuTitle}>TOURISM ANNOUNCEMENTS</div>
              <div className={styles.notificationItem}>
                <p className={styles.notifText}>
                  <Castle size={14} style={{ marginRight: 6, color: 'var(--color-terracotta)' }} />
                  <strong>Shiv Jayanti Celebrations</strong> preparations announced at Shivneri & Raigad Forts.
                </p>
                <span className={styles.notifTime}>Today</span>
              </div>
              <div className={styles.notificationItem}>
                <p className={styles.notifText}>
                  <Umbrella size={14} style={{ marginRight: 6, color: 'var(--color-gold)' }} />
                  <strong>Konkan Coastal Season:</strong> Scuba diving & dolphin safaris active at Tarkarli & Malvan.
                </p>
                <span className={styles.notifTime}>Active Season</span>
              </div>
              <div className={styles.notificationItem}>
                <p className={styles.notifText}>
                  <Landmark size={14} style={{ marginRight: 6, color: 'var(--color-saffron)' }} />
                  <strong>Ellora Festival 2027:</strong> Dates finalized for the classical Kailasa Temple heritage showcase.
                </p>
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
            <div className={styles.avatar}>{user?.avatarInitials || 'TR'}</div>
            <div className={styles.userText}>
              <span className={styles.userName}>{user?.name?.split(' ')[0] || 'Traveler'}</span>
              <span className={styles.userRole}>{user?.role || 'Sahyadri Explorer'}</span>
            </div>
            <ChevronDown size={14} className={styles.dropdownArrow} />
          </button>

          {showProfileMenu && (
            <div className={styles.dropdownMenu}>
              <div className={styles.menuTitle}>{user?.name || 'TRAVELER PROFILE'}</div>
              <Link to="/dashboard" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                <Route size={16} style={{ marginRight: 8 }} /> Dashboard
              </Link>
              <Link to="/trips" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                <Backpack size={16} style={{ marginRight: 8 }} /> {t('myTrips')}
              </Link>
              <Link to="/wishlist" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                <Heart size={16} style={{ marginRight: 8 }} /> {t('wishlist')} ({wishlistCount})
              </Link>
              <Link to="/budget" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                <Wallet size={16} style={{ marginRight: 8 }} /> {t('budgetPlanner')}
              </Link>
              <Link to="/settings" className={styles.menuLink} onClick={() => setShowProfileMenu(false)}>
                <Settings size={16} style={{ marginRight: 8 }} /> {t('settings')}
              </Link>
              <div className={styles.menuDivider} />
              <button
                type="button"
                className={styles.menuLink}
                style={{ color: 'var(--color-error)' }}
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                  navigate('/');
                }}
              >
                <LogOut size={16} style={{ marginRight: 8 }} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
