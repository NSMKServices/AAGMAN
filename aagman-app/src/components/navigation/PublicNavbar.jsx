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
          <img src="/aagman-brand.png?v=3" alt="AAGMAN — Maharashtra Tourism" className={styles.logoImage} />
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
