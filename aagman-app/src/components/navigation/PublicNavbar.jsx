import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import Container from '../layout/Container';
import Button from '../common/Button';
import {
  Compass,
  Castle,
  Landmark,
  Umbrella,
  BookOpen,
  Sparkles,
  Map,
  Route,
  Wallet,
  Search,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Backpack,
  Settings,
  ExternalLink,
  Video,
  Info,
  HelpCircle,
  MapPin,
  Shield
} from '../common/Icons';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';
import { contentService } from '../../services/contentService';
import styles from './PublicNavbar.module.css';

export default function PublicNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [itinerariesOpen, setItinerariesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState([]);

  // Mobile sub-accordions
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [mobileItinOpen, setMobileItinOpen] = useState(false);

  // Refs for outside click dismissal
  const destRef = useRef(null);
  const itinRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Detect scroll for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setDestinationsOpen(false);
    setItinerariesOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Click outside to dismiss desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (destRef.current && !destRef.current.contains(e.target)) {
        setDestinationsOpen(false);
      }
      if (itinRef.current && !itinRef.current.contains(e.target)) {
        setItinerariesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
        setDestinationsOpen(false);
        setItinerariesOpen(false);
        setProfileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Instant destination search results
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

  const handleSearchResultClick = (category, slug) => {
    setSearchQuery('');
    setSearchOpen(false);
    navigate(`/${category}/${slug}`);
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container className={styles.navContainer}>
        {/* Brand Logo & Title */}
        <Link to="/" className={styles.brand} aria-label="AAGMAN - Maharashtra Tourism Home">
          <img src="data:image/png;base64,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" alt="AAGMAN — Maharashtra Tourism" className={styles.logoImage} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            {t('home', 'Home')}
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            {t('explore', 'Explore')}
          </NavLink>

          {/* Destinations Dropdown */}
          <div className={styles.dropdownWrapper} ref={destRef}>
            <button
              type="button"
              className={`${styles.navLink} ${styles.dropdownTrigger} ${destinationsOpen ? styles.open : ''}`}
              onClick={() => {
                setDestinationsOpen(!destinationsOpen);
                setItinerariesOpen(false);
              }}
              aria-expanded={destinationsOpen}
              aria-haspopup="true"
            >
              <span>{t('destinations', 'Destinations')}</span>
              <span className={styles.caret}><ChevronDown size={14} /></span>
            </button>

            {destinationsOpen && (
              <div className={styles.megaDropdown} role="menu">
                <div className={styles.dropdownHeader}>
                  <span className={styles.dropdownEyebrow}>MAHARASHTRA CIRCUITS</span>
                  <h4 className={styles.dropdownTitle}>{t('exploreByTheme', 'Explore by Category')}</h4>
                </div>
                <div className={styles.dropdownGrid}>
                  <Link to="/forts" className={styles.dropdownItem} onClick={() => setDestinationsOpen(false)}>
                    <div className={styles.itemIconBox}>
                      <Castle size={20} color="var(--color-secondary)" />
                    </div>
                    <div>
                      <strong className={styles.itemTitle}>{t('forts', 'Historic Forts')}</strong>
                      <p className={styles.itemDesc}>Raigad, Sinhagad, Rajgad & Maratha citadels</p>
                    </div>
                  </Link>

                  <Link to="/temples" className={styles.dropdownItem} onClick={() => setDestinationsOpen(false)}>
                    <div className={styles.itemIconBox}>
                      <Landmark size={20} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong className={styles.itemTitle}>{t('temples', 'Sacred Temples')}</strong>
                      <p className={styles.itemDesc}>Trimbakeshwar, Ashtavinayak & Jyotirlingas</p>
                    </div>
                  </Link>

                  <Link to="/beaches" className={styles.dropdownItem} onClick={() => setDestinationsOpen(false)}>
                    <div className={styles.itemIconBox}>
                      <Umbrella size={20} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong className={styles.itemTitle}>{t('beaches', 'Konkan Beaches')}</strong>
                      <p className={styles.itemDesc}>Kashid, Tarkarli, Ganpatipule coastline</p>
                    </div>
                  </Link>

                  <Link to="/heritage" className={styles.dropdownItem} onClick={() => setDestinationsOpen(false)}>
                    <div className={styles.itemIconBox}>
                      <BookOpen size={20} color="var(--color-highlight)" />
                    </div>
                    <div>
                      <strong className={styles.itemTitle}>{t('heritage', 'UNESCO Caves & Heritage')}</strong>
                      <p className={styles.itemDesc}>Ajanta, Ellora, Elephanta & monuments</p>
                    </div>
                  </Link>
                </div>
                <div className={styles.dropdownFooter}>
                  <Link to="/explore" className={styles.footerLink} onClick={() => setDestinationsOpen(false)}>
                    {t('allDestinations', 'View All Destinations')} →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/festivals"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            {t('festivals', 'Festivals')}
          </NavLink>

          {/* Itineraries & Circuits Dropdown */}
          <div className={styles.dropdownWrapper} ref={itinRef}>
            <button
              type="button"
              className={`${styles.navLink} ${styles.dropdownTrigger} ${itinerariesOpen ? styles.open : ''}`}
              onClick={() => {
                setItinerariesOpen(!itinerariesOpen);
                setDestinationsOpen(false);
              }}
              aria-expanded={itinerariesOpen}
              aria-haspopup="true"
            >
              <span>{t('itineraries', 'Itineraries')}</span>
              <span className={styles.caret}><ChevronDown size={14} /></span>
            </button>

            {itinerariesOpen && (
              <div className={`${styles.megaDropdown} ${styles.singleColDropdown}`} role="menu">
                <Link to="/planner" className={styles.dropdownItem} onClick={() => setItinerariesOpen(false)}>
                  <div className={styles.itemIconBox}>
                    <Sparkles size={20} color="var(--color-accent)" />
                  </div>
                  <div>
                    <strong className={styles.itemTitle}>{t('planner', 'Smart Journey Planner')}</strong>
                    <p className={styles.itemDesc}>Curate custom day-by-day itineraries</p>
                  </div>
                </Link>

                <Link to="/map" className={styles.dropdownItem} onClick={() => setItinerariesOpen(false)}>
                  <div className={styles.itemIconBox}>
                    <Map size={20} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <strong className={styles.itemTitle}>{t('interactiveMap', 'Interactive Route Atlas')}</strong>
                    <p className={styles.itemDesc}>Explore 4 signature Maharashtra road circuits</p>
                  </div>
                </Link>

                <Link to="/budget" className={styles.dropdownItem} onClick={() => setItinerariesOpen(false)}>
                  <div className={styles.itemIconBox}>
                    <Wallet size={20} color="var(--color-accent)" />
                  </div>
                  <div>
                    <strong className={styles.itemTitle}>{t('budgetPlanner', 'Travel Cost Estimator')}</strong>
                    <p className={styles.itemDesc}>Calculate transport, stay & meals budget</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <NavLink
            to="/videos"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            {t('videos', 'Videos')}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            {t('about', 'About')}
          </NavLink>
        </nav>

        {/* Right Action Tools */}
        <div className={styles.actionsGroup}>
          {/* Search Trigger */}
          <div className={styles.searchContainer} ref={searchRef}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search destinations"
              title="Search destinations"
            >
              <Search size={18} />
            </button>

            {searchOpen && (
              <div className={styles.searchDropdown}>
                <div className={styles.searchBar}>
                  <span className={styles.searchIcon}><Search size={16} /></span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder', 'Search forts, beaches, temples...')}
                    className={styles.searchInput}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className={styles.clearBtn}
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {searchQuery.trim() && (
                  <div className={styles.searchResultsList}>
                    {searchResults.length > 0 ? (
                      searchResults.map((dest) => (
                        <button
                          key={dest.id}
                          type="button"
                          className={styles.searchResultItem}
                          onClick={() => handleSearchResultClick(dest.category, dest.slug)}
                        >
                          <img src={dest.thumbnail} alt="" className={styles.resultThumb} />
                          <div className={styles.resultInfo}>
                            <strong className={styles.resultName}>{dest.name}</strong>
                            <span className={styles.resultDistrict}>{dest.district} District • {dest.category}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className={styles.noResults}>
                        No destinations found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Link with Badge */}
          <Link to="/wishlist" className={styles.iconBtn} aria-label="View Saved Wishlist" title={t('wishlist', 'Wishlist')}>
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className={styles.badgeCount}>{wishlistCount}</span>
            )}
          </Link>

          {/* 3-Way Language Selector (Desktop) */}
          <div className={styles.langPill} role="group" aria-label={t('language', 'Language')}>
            <button
              type="button"
              className={`${styles.langBtn} ${language === 'en' ? styles.activeLang : ''}`}
              onClick={() => setLanguage('en')}
              title="English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <span className={styles.langDivider}>|</span>
            <button
              type="button"
              className={`${styles.langBtn} ${language === 'mr' ? styles.activeLang : ''}`}
              onClick={() => setLanguage('mr')}
              title="मराठी"
              aria-pressed={language === 'mr'}
            >
              मराठी
            </button>
            <span className={styles.langDivider}>|</span>
            <button
              type="button"
              className={`${styles.langBtn} ${language === 'hi' ? styles.activeLang : ''}`}
              onClick={() => setLanguage('hi')}
              title="हिन्दी"
              aria-pressed={language === 'hi'}
            >
              हिन्दी
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Authentication State */}
          {isAuthenticated ? (
            <div className={styles.profileWrapper} ref={profileRef}>
              <button
                type="button"
                className={styles.avatarBtn}
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <div className={styles.avatarCircle}>{user?.avatarInitials || 'RD'}</div>
                <span className={styles.avatarName}>{user?.name?.split(' ')[0] || 'Traveler'}</span>
                <span className={styles.caret}><ChevronDown size={14} /></span>
              </button>

              {profileOpen && (
                <div className={styles.profileDropdown} role="menu">
                  <div className={styles.profileInfoBox}>
                    <p className={styles.userNameText}>{user?.name}</p>
                    <span className={styles.userRoleBadge}>{user?.role || 'Sahyadri Explorer'}</span>
                  </div>
                  <div className={styles.menuLinks}>
                    <Link to="/dashboard" className={styles.profileMenuItem} onClick={() => setProfileOpen(false)}>
                      <Compass size={16} /> {t('dashboard', 'Traveler Dashboard')}
                    </Link>
                    <Link to="/trips" className={styles.profileMenuItem} onClick={() => setProfileOpen(false)}>
                      <Backpack size={16} /> {t('myTrips', 'My Expeditions')}
                    </Link>
                    <Link to="/wishlist" className={styles.profileMenuItem} onClick={() => setProfileOpen(false)}>
                      <Heart size={16} /> {t('wishlist', 'Saved Places')} ({wishlistCount})
                    </Link>
                    <Link to="/settings" className={styles.profileMenuItem} onClick={() => setProfileOpen(false)}>
                      <Settings size={16} /> {t('settings', 'Account Settings')}
                    </Link>
                  </div>
                  <div className={styles.menuDivider} />
                  <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                    <ExternalLink size={16} /> {t('logout', 'Sign Out')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authActions}>
              <Link to="/login" className={styles.signInLink}>
                {t('login', 'Sign In')}
              </Link>
              <Button to="/register" variant="primary" size="sm">
                {t('register', 'Register')}
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={styles.mobileHamburger}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Slide-Out Drawer */}
      {isMobileOpen && (
        <div className={styles.drawerBackdrop} onClick={() => setIsMobileOpen(false)} aria-hidden="true">
          <aside className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div className={styles.brand}>
                <div className={styles.logoBadge}>
                  <Shield size={20} color="var(--color-gold)" />
                </div>
                <div className={styles.brandText}>
                  <span className={styles.brandName}>{t('brandName', 'AAGMAN')}</span>
                  <span className={styles.brandTagline}>{t('brandSubtitle', 'MAHARASHTRA TOURISM')}</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.closeDrawerBtn}
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              {/* Quick Language (3-way) & Theme Row */}
              <div className={styles.drawerToolRow}>
                <div className={styles.drawerLangPill} role="group" aria-label={t('language', 'Language')}>
                  <button
                    type="button"
                    className={`${styles.langBtn} ${language === 'en' ? styles.activeLang : ''}`}
                    onClick={() => setLanguage('en')}
                    aria-pressed={language === 'en'}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    className={`${styles.langBtn} ${language === 'mr' ? styles.activeLang : ''}`}
                    onClick={() => setLanguage('mr')}
                    aria-pressed={language === 'mr'}
                  >
                    मराठी
                  </button>
                  <button
                    type="button"
                    className={`${styles.langBtn} ${language === 'hi' ? styles.activeLang : ''}`}
                    onClick={() => setLanguage('hi')}
                    aria-pressed={language === 'hi'}
                  >
                    हिन्दी
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.drawerThemeBtn}
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
              </div>

              {/* Navigation Links */}
              <nav className={styles.drawerNav}>
                <NavLink to="/" end className={({ isActive }) => `${styles.drawerNavLink} ${isActive ? styles.active : ''}`}>
                  <Compass size={18} /> {t('home', 'Home')}
                </NavLink>

                <NavLink to="/explore" className={({ isActive }) => `${styles.drawerNavLink} ${isActive ? styles.active : ''}`}>
                  <MapPin size={18} /> {t('explore', 'Explore All Destinations')}
                </NavLink>

                {/* Mobile Destinations Accordion */}
                <div className={styles.accordionGroup}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => setMobileDestOpen(!mobileDestOpen)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Castle size={18} /> {t('destinations', 'Destinations')}
                    </span>
                    <span><ChevronDown size={14} style={{ transform: mobileDestOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} /></span>
                  </button>
                  {mobileDestOpen && (
                    <div className={styles.accordionContent}>
                      <Link to="/forts" className={styles.accordionLink}>{t('forts', 'Historic Forts')}</Link>
                      <Link to="/temples" className={styles.accordionLink}>{t('temples', 'Sacred Temples')}</Link>
                      <Link to="/beaches" className={styles.accordionLink}>{t('beaches', 'Konkan Beaches')}</Link>
                      <Link to="/heritage" className={styles.accordionLink}>{t('heritage', 'UNESCO Caves & Heritage')}</Link>
                    </div>
                  )}
                </div>

                <NavLink to="/festivals" className={({ isActive }) => `${styles.drawerNavLink} ${isActive ? styles.active : ''}`}>
                  <Sparkles size={18} /> {t('festivals', 'Festivals & Culture')}
                </NavLink>

                {/* Mobile Itineraries Accordion */}
                <div className={styles.accordionGroup}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => setMobileItinOpen(!mobileItinOpen)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Route size={18} /> {t('itineraries', 'Travel Planning')}
                    </span>
                    <span><ChevronDown size={14} style={{ transform: mobileItinOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} /></span>
                  </button>
                  {mobileItinOpen && (
                    <div className={styles.accordionContent}>
                      <Link to="/planner" className={styles.accordionLink}>{t('planner', 'Smart Journey Planner')}</Link>
                      <Link to="/map" className={styles.accordionLink}>{t('interactiveMap', 'Route Atlas')}</Link>
                      <Link to="/budget" className={styles.accordionLink}>{t('budgetPlanner', 'Travel Budget Estimator')}</Link>
                    </div>
                  )}
                </div>

                <NavLink to="/videos" className={({ isActive }) => `${styles.drawerNavLink} ${isActive ? styles.active : ''}`}>
                  <Video size={18} /> {t('videos', 'Videos & Experiences')}
                </NavLink>

                <NavLink to="/about" className={({ isActive }) => `${styles.drawerNavLink} ${isActive ? styles.active : ''}`}>
                  <Info size={18} /> {t('about', 'About AAGMAN')}
                </NavLink>

                <NavLink to="/faq" className={({ isActive }) => `${styles.drawerNavLink} ${isActive ? styles.active : ''}`}>
                  <HelpCircle size={18} /> {t('faq', 'Guidelines & FAQs')}
                </NavLink>
              </nav>

              {/* Mobile Auth / Profile Section */}
              <div className={styles.drawerAuthSection}>
                {isAuthenticated ? (
                  <div className={styles.drawerProfileCard}>
                    <div className={styles.drawerUserRow}>
                      <div className={styles.avatarCircle}>{user?.avatarInitials || 'RD'}</div>
                      <div>
                        <strong>{user?.name}</strong>
                        <p>{user?.email}</p>
                      </div>
                    </div>
                    <div className={styles.drawerUserLinks}>
                      <Link to="/dashboard" className={styles.drawerUserAction}>{t('dashboard', 'Traveler Dashboard')}</Link>
                      <Link to="/trips" className={styles.drawerUserAction}>{t('myTrips', 'My Trips')}</Link>
                      <Link to="/wishlist" className={styles.drawerUserAction}>{t('wishlist', 'Wishlist')} ({wishlistCount})</Link>
                      <Link to="/settings" className={styles.drawerUserAction}>{t('settings', 'Settings')}</Link>
                      <button type="button" className={styles.drawerLogoutBtn} onClick={handleLogout}>
                        {t('logout', 'Sign Out')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.drawerGuestRow}>
                    <Button to="/login" variant="outline" className={styles.drawerBtn}>
                      {t('login', 'Sign In')}
                    </Button>
                    <Button to="/register" variant="primary" className={styles.drawerBtn}>
                      {t('register', 'Register Free')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
