import React, { useState } from 'react';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  Globe,
  Palette,
  Moon,
  Sun,
  Layers,
  RefreshCw,
  User,
  Check,
  Castle
} from '../components/common/Icons';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const { language, changeLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [travelerName, setTravelerName] = useState(() => {
    return localStorage.getItem('aagman_traveler_name') || 'Rohan Deshmukh';
  });
  const [homeCity, setHomeCity] = useState(() => {
    return localStorage.getItem('aagman_home_city') || 'Pune';
  });
  const [travelStyle, setTravelStyle] = useState('Heritage & Fort Trekker');
  const [savedStatus, setSavedStatus] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('aagman_traveler_name', travelerName);
    localStorage.setItem('aagman_home_city', homeCity);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleResetData = () => {
    localStorage.removeItem('aagman_wishlist');
    localStorage.removeItem('aagman_trips');
    setShowResetModal(false);
    setResetMessage('Demo data restored to initial state! Reloading...');
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  return (
    <div className={styles.settingsPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>सेटिंग्ज आणि प्रोफाइल</span>
            <h1 className={styles.heroTitle}>Platform Settings & Traveler Preferences</h1>
            <p className={styles.heroSubtitle}>
              Customize your multilingual interface language, visual theme, traveler identity, and local itinerary storage.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Settings Sections */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.settingsGrid}>
            {/* Preferences Column */}
            <div className={styles.column}>
              {/* Language Settings */}
              <div className={styles.settingsCard}>
                <h2 className={styles.cardTitle}>
                  <Globe size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Language & Localization
                </h2>
                <p className={styles.cardDesc}>
                  Select your preferred language for destinations, headings, and cultural narratives.
                </p>

                <div className={styles.langSelector}>
                  {[
                    { code: 'en', label: 'English', native: 'English' },
                    { code: 'mr', label: 'मराठी', native: 'Marathi' },
                    { code: 'hi', label: 'हिन्दी', native: 'Hindi' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      className={`${styles.langBtn} ${language === lang.code ? styles.activeLang : ''}`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      <span className={styles.langNative}>{lang.native}</span>
                      <span className={styles.langCode}>({lang.label})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Settings */}
              <div className={styles.settingsCard}>
                <h2 className={styles.cardTitle}>
                  <Palette size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Visual Theme & Atmosphere
                </h2>
                <p className={styles.cardDesc}>
                  Switch between Warm Parchment (daylight exploration) and Sahyadri Night (dark theme).
                </p>

                <div className={styles.themeRow}>
                  <div className={styles.themeInfo}>
                    <span className={styles.currentThemeLabel}>Active Theme:</span>
                    <strong className={styles.themeName}>
                      {theme === 'dark' ? 'Sahyadri Night (Dark)' : 'Warm Parchment (Light)'}
                    </strong>
                  </div>

                  <Button
                    variant="secondary"
                    onClick={toggleTheme}
                    icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  >
                    {theme === 'dark' ? 'Switch to Warm Parchment' : 'Switch to Sahyadri Night'}
                  </Button>
                </div>
              </div>

              {/* Data & Storage Management */}
              <div className={styles.settingsCard}>
                <h2 className={styles.cardTitle}>
                  <Layers size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Demo Storage & State Management
                </h2>
                <p className={styles.cardDesc}>
                  AAGMAN uses offline-resilient local storage for wishlist items, custom itineraries, and budget calculations.
                </p>

                {resetMessage && (
                  <div className={styles.alertToast}>{resetMessage}</div>
                )}

                <div className={styles.storageActions}>
                  <Button
                    variant="outline"
                    onClick={() => setShowResetModal(true)}
                    icon={<RefreshCw size={14} />}
                  >
                    Reset Demo Trips & Wishlist to Default
                  </Button>
                </div>
              </div>
            </div>

            {/* Traveler Profile Column */}
            <div className={styles.column}>
              <div className={styles.settingsCard}>
                <h2 className={styles.cardTitle}>
                  <User size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Traveler Profile (Demo)
                </h2>
                <p className={styles.cardDesc}>
                  This profile information personalizes your top navigation avatar, budget estimates, and departure routes.
                </p>

                <form onSubmit={handleSaveProfile} className={styles.profileForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name:</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Home Base / Departure City:</label>
                    <select
                      className={styles.select}
                      value={homeCity}
                      onChange={(e) => setHomeCity(e.target.value)}
                    >
                      <option value="Pune">Pune (Cultural Capital)</option>
                      <option value="Mumbai">Mumbai (Financial Capital)</option>
                      <option value="Nashik">Nashik (Wine & Pilgrim Hub)</option>
                      <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar (Heritage Gates)</option>
                      <option value="Kolhapur">Kolhapur (Royal Maratha City)</option>
                      <option value="Nagpur">Nagpur (Tiger Capital)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Primary Travel Style:</label>
                    <select
                      className={styles.select}
                      value={travelStyle}
                      onChange={(e) => setTravelStyle(e.target.value)}
                    >
                      <option value="Heritage & Fort Trekker">Heritage & Fort Trekker</option>
                      <option value="Spiritual Pilgrim">Sacred Pilgrim (Jyotirlinga & Ashtavinayak)</option>
                      <option value="Konkan Beach Explorer">Konkan Coastal & Seafood Enthusiast</option>
                      <option value="Nature & Wildlife Trekker">Western Ghats Wildlife & Waterfalls</option>
                    </select>
                  </div>

                  {savedStatus && (
                    <div className={styles.saveSuccess}>
                      <Check size={14} style={{ marginRight: 6 }} />
                      Traveler preferences saved successfully!
                    </div>
                  )}

                  <Button type="submit" variant="primary">
                    Save Traveler Profile
                  </Button>
                </form>
              </div>

              {/* About Aagman */}
              <div className={styles.settingsCard}>
                <h2 className={styles.cardTitle}>
                  <Castle size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  About AAGMAN Platform
                </h2>
                <div className={styles.aboutInfo}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Version:</span>
                    <span className={styles.infoValue}>AAGMAN v2.4 (College Demo Build)</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Architecture:</span>
                    <span className={styles.infoValue}>React 18 + Vite SPA (Vercel-Ready)</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Curated Sites:</span>
                    <span className={styles.infoValue}>64 Destinations across 36 Districts</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Dedication:</span>
                    <span className={styles.infoValue}>Honoring the heritage of Chhatrapati Shivaji Maharaj</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <Modal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          title="Reset Local Demo Data"
        >
          <div className={styles.resetModalBody}>
            <p>
              This will restore all sample saved trips and default wishlist items (Raigad, Trimbakeshwar, Kashid, Ajanta) back to initial college presentation state.
            </p>
            <div className={styles.modalActions}>
              <Button variant="ghost" onClick={() => setShowResetModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleResetData}>
                Confirm Reset
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
