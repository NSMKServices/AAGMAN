import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import DestinationCard from '../components/common/DestinationCard';
import {
  Compass,
  Backpack,
  Heart,
  Wallet,
  Settings,
  Sparkles,
  Map,
  Route,
  MapPin,
  Calendar,
  Clock,
  Check,
  ArrowRight,
  Shield,
  HelpCircle,
  Phone,
  Eye,
  Star,
  ExternalLink
} from '../components/common/Icons';
import { useWishlist } from '../context/WishlistContext';
import { useTrips } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { contentService } from '../services/contentService';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { wishlistCount, wishlistedDestinations } = useWishlist();
  const { trips, upcomingTrip } = useTrips();
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const travelerName = user?.name || localStorage.getItem('aagman_traveler_name') || t('traveler', 'Traveler');
  const homeCity = localStorage.getItem('aagman_home_city') || t('notSet', 'Not set');

  // Recently viewed destinations are resolved from published admin-managed records.
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const unsubscribe = contentService.subscribe(({ destinations: records }) => {
      try {
        const stored = JSON.parse(localStorage.getItem('aagman_recently_viewed') || '[]');
        setRecentlyViewed(stored
          .map(slug => records.find(item => item.slug === slug && item.status === 'published'))
          .filter(Boolean)
          .slice(0, 3));
      } catch {
        setRecentlyViewed([]);
      }
    });
    contentService.getAllDestinations();
    return unsubscribe;
  }, []);

  return (
    <div className={styles.dashboardPage}>
      {/* 1. WELCOME SECTION */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.userBadgeRow}>
              <span className={styles.userBadge}>
                <Shield size={14} color="var(--color-accent)" />
                <span>{language === 'mr' ? 'पर्यटक कक्ष' : language === 'hi' ? 'पर्यटक पोर्टल' : 'Traveler Portal'}</span>
              </span>
              <span className={styles.homeCityBadge}>
                <MapPin size={12} color="#FFF9F0" />
                <span>{language === 'mr' ? 'मूळ शहर' : language === 'hi' ? 'गृह नगर' : 'Base'}: {homeCity}</span>
              </span>
              <span className={styles.roleBadge}>
                <span>{language === 'mr' ? 'सह्याद्री दुर्गभ्रमंतीकार' : language === 'hi' ? 'सह्याद्रि खोजी' : 'Sahyadri Explorer'}</span>
              </span>
            </div>
            <h1 className={styles.heroTitle}>
              {language === 'mr' ? `सस्नेह जय महाराष्ट्र, ${travelerName}` : language === 'hi' ? `जय महाराष्ट्र, ${travelerName}` : `Welcome back, ${travelerName}`}
            </h1>
            <p className={styles.heroSubtitle}>
              {language === 'mr'
                ? 'आपल्या वैयक्तिक महाराष्ट्र पर्यटन व वारसा कक्षात आपले सहर्ष स्वागत. आगामी सहली, जतन केलेले किल्ले आणि नियोजनांचे व्यवस्थापन करा.'
                : language === 'hi'
                ? 'महाराष्ट्र पर्यटन एवं धरोहर पोर्टल पर आपका स्वागत है। अपनी आगामी यात्राओं, सहेजे गए किलों और यात्रा योजनाओं का प्रबंधन करें।'
                : 'Welcome back to your personalized Maharashtra Tourism & Heritage Portal. Manage your upcoming Sahyadri expeditions, saved fortresses, and custom itineraries.'}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. METRICS OVERVIEW ROW */}
      <section className={styles.metricsSection}>
        <Container>
          <div className={styles.metricsGrid}>
            <Link to="/trips" className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Backpack size={22} color="var(--color-secondary)" />
              </div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>{trips.length}</span>
                <span className={styles.metricLabel}>{t('plannedTripsCount', 'Planned Expeditions')}</span>
              </div>
            </Link>

            <Link to="/wishlist" className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Heart size={22} color="var(--color-highlight)" />
              </div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>{wishlistCount}</span>
                <span className={styles.metricLabel}>{t('savedDestinationsCount', 'Bookmarked Sites')}</span>
              </div>
            </Link>

            <Link to="/map" className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Map size={22} color="var(--color-accent)" />
              </div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>4 {language === 'mr' ? 'सर्किट्स' : language === 'hi' ? 'परिपथ' : 'Circuits'}</span>
                <span className={styles.metricLabel}>{t('circuits', 'Interactive Routes')}</span>
              </div>
            </Link>

            <Link to="/budget" className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Wallet size={22} color="var(--color-primary)" />
              </div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>{t('budgetPlanner', 'Budget Tool')}</span>
                <span className={styles.metricLabel}>{language === 'mr' ? 'खर्च कॅल्क्युलेटर' : language === 'hi' ? 'बजट कैलकुलेटर' : 'Real-Time Calculator'}</span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* MAIN WORKSPACE LAYOUT */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.dashboardLayout}>
            {/* Left Column: Expeditions & Wishlist */}
            <div className={styles.mainCol}>
              {/* 3. UPCOMING TRIPS / EXPEDITIONS */}
              <div className={styles.cardBlock}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.blockEyebrow}>{t('upcomingTrip', 'EXPEDITION TIMELINE')}</span>
                    <h2 className={styles.sectionTitle}>
                      {language === 'mr' ? 'पुढील नियोजित सहल' : language === 'hi' ? 'आगामी यात्रा' : 'Next Scheduled Expedition'}
                    </h2>
                  </div>
                  <Link to="/trips" className={styles.viewAllLink}>
                    <span>{t('myTrips', 'View All Trips')} ({trips.length})</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {upcomingTrip ? (
                  <div className={styles.upcomingTripCard}>
                    <div className={styles.tripCardHeader}>
                      <div>
                        <Badge variant="forts" size="sm">
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Route size={12} /> {upcomingTrip.circuit}
                          </span>
                        </Badge>
                        <h3 className={styles.tripCardTitle}>{upcomingTrip.name}</h3>
                        <p className={styles.tripCardDates}>
                          <Calendar size={13} color="var(--color-secondary)" />
                          <span>{upcomingTrip.startDate} to {upcomingTrip.endDate} ({upcomingTrip.durationDays} {language === 'mr' ? 'दिवस' : language === 'hi' ? 'दिन' : 'Days'})</span>
                        </p>
                      </div>

                      <div className={styles.tripBudgetBadge}>
                        <span className={styles.budgetSmall}>{t('tripBudget', 'Allocated Budget')}</span>
                        <strong className={styles.budgetAmount}>
                          ₹{upcomingTrip.allocatedBudget?.toLocaleString('en-IN') || '14,000'}
                        </strong>
                      </div>
                    </div>

                    <div className={styles.destinationsRow}>
                      <span className={styles.destLabel}>{t('keyStops', 'Key Circuit Stops')}:</span>
                      <div className={styles.destList}>
                        {upcomingTrip.destinations?.map((d, i) => (
                          <span key={i} className={styles.destChip}>
                            <MapPin size={11} color="var(--color-secondary)" /> {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.dayPreviewList}>
                      {upcomingTrip.itineraryDays?.slice(0, 3).map((day) => (
                        <div key={day.day} className={styles.dayPreviewItem}>
                          <div className={styles.dayNumber}>
                            {language === 'mr' ? `दिवस ${day.day}` : language === 'hi' ? `दिन ${day.day}` : `Day ${day.day}`}
                          </div>
                          <div className={styles.dayPreviewContent}>
                            <h4 className={styles.dayPreviewHeading}>{day.title}</h4>
                            <p className={styles.dayPreviewText}>{day.highlights}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.tripActions}>
                      <Link to="/trips">
                        <Button variant="primary" size="sm">
                          {language === 'mr' ? 'सहलीचे नियोजन पहा' : language === 'hi' ? 'यात्रा विवरण देखें' : 'Manage Expedition Schedule'}
                        </Button>
                      </Link>
                      <Link to="/map">
                        <Button variant="outline" size="sm">
                          {language === 'mr' ? 'नकाशा पहा' : language === 'hi' ? 'नक्शा देखें' : 'Open Circuit Route Map'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyCardBox}>
                    <div className={styles.emptyIconBox}>
                      <Backpack size={32} color="var(--color-accent)" />
                    </div>
                    <h3 className={styles.emptyTitle}>{t('noTripsYet', 'No scheduled expeditions yet')}</h3>
                    <p className={styles.emptySub}>
                      {language === 'mr'
                        ? 'छत्रपती शिवाजी महाराजांचे गडकोट, प्राचीन लेणी किंवा कोकण किनाऱ्यांसाठी आपली पहिली सहल आखा.'
                        : language === 'hi'
                        ? 'छत्रपति शिवाजी महाराज के किलों, गुफाओं या कोंकण तट के लिए अपनी पहली यात्रा की योजना बनाएं।'
                        : 'Plan your next journey across Chhatrapati Shivaji Maharaj\'s citadels, UNESCO rock caves, or Konkan shorelines.'}
                    </p>
                    <div className={styles.emptyActions}>
                      <Button to="/planner" variant="primary" size="sm">
                        <span>{t('planTripBtn', 'Plan Your First Trip')}</span>
                        <Sparkles size={14} />
                      </Button>
                      <Button to="/explore" variant="outline" size="sm">
                        {t('exploreBtn', 'Browse Destinations')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. SAVED DESTINATIONS & WISHLIST OVERVIEW */}
              <div className={styles.cardBlock}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.blockEyebrow}>{t('wishlistTitle', 'BOOKMARKED HERITAGE')}</span>
                    <h2 className={styles.sectionTitle}>
                      {language === 'mr' ? 'आपली जतन केलेली ठिकाणे' : language === 'hi' ? 'आपके सहेजे गए स्थल' : 'Your Saved Places'}
                    </h2>
                  </div>
                  <Link to="/wishlist" className={styles.viewAllLink}>
                    <span>{t('wishlist', 'View Wishlist')} ({wishlistCount})</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {wishlistedDestinations && wishlistedDestinations.length > 0 ? (
                  <div className={styles.wishlistGrid}>
                    {wishlistedDestinations.slice(0, 2).map((dest) => (
                      <DestinationCard key={dest.id} destination={dest} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyCardBox}>
                    <div className={styles.emptyIconBox}>
                      <Heart size={32} color="var(--color-accent)" />
                    </div>
                    <h3 className={styles.emptyTitle}>
                      {language === 'mr' ? 'आपली आवडती यादी रिकामी आहे' : language === 'hi' ? 'आपकी पसंदीदा सूची खाली है' : 'Your travel wishlist is empty'}
                    </h3>
                    <p className={styles.emptySub}>
                      {language === 'mr'
                        ? 'किल्ले, मंदिरे आणि समुद्रकिनारे जतन करण्यासाठी कोणत्याही कार्डावरील हृदय चिन्हावर क्लिक करा.'
                        : language === 'hi'
                        ? 'किलों, मंदिरों और समुद्र तटों को सहेजने के लिए किसी भी कार्ड पर दिल के आइकन पर क्लिक करें।'
                        : 'Click the heart icon on any destination card to bookmark forts, temples, and beaches for your upcoming journey.'}
                    </p>
                    <Button to="/explore" variant="outline" size="sm">
                      {t('exploreBtn', 'Explore Destinations')}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Profile & Helplines */}
            <div className={styles.sidebarCol}>
              {/* Profile Card */}
              <div className={styles.sideCard}>
                <div className={styles.userProfileCard}>
                  <div className={styles.avatarCircle}>{user?.avatarInitials || 'RD'}</div>
                  <div>
                    <h3 className={styles.profileName}>{travelerName}</h3>
                    <p className={styles.profileEmail}>{user?.email || 'rohan.deshmukh@gmail.com'}</p>
                    <span className={styles.profileRole}>
                      {language === 'mr' ? 'सत्यापित दुर्गभ्रमंतीकार' : language === 'hi' ? 'सत्यापित खोजी' : 'Verified Explorer'}
                    </span>
                  </div>
                </div>

                <div className={styles.shortcutLinks}>
                  <Link to="/trips" className={styles.shortcutItem}>
                    <Backpack size={16} color="var(--color-secondary)" />
                    <span>{t('myTrips', 'My Expeditions')} ({trips.length})</span>
                  </Link>
                  <Link to="/wishlist" className={styles.shortcutItem}>
                    <Heart size={16} color="var(--color-highlight)" />
                    <span>{t('wishlist', 'Saved Wishlist')} ({wishlistCount})</span>
                  </Link>
                  <Link to="/budget" className={styles.shortcutItem}>
                    <Wallet size={16} color="var(--color-accent)" />
                    <span>{t('budgetPlanner', 'Trip Cost Estimator')}</span>
                  </Link>
                  <Link to="/settings" className={styles.shortcutItem}>
                    <Settings size={16} color="var(--color-text-muted)" />
                    <span>{t('settings', 'Profile & Preferences')}</span>
                  </Link>
                </div>
              </div>

              {/* Helplines */}
              <div className={styles.sideCard}>
                <div className={styles.sideHeader}>
                  <span className={styles.sideEyebrow}>{t('helplineTitle', 'ASSISTANCE & EMERGENCIES')}</span>
                  <h3 className={styles.sideCardTitle}>{t('helplineTitle', 'Tourist Helplines')}</h3>
                </div>

                <div className={styles.helplineList}>
                  <div className={styles.helplineItem}>
                    <span className={styles.helpName}>{t('mtdcHelpline', 'MTDC Tourist Helpline')}:</span>
                    <a href="tel:1800229930" className={styles.helpPhone}>1800-229-930</a>
                  </div>
                  <div className={styles.helplineItem}>
                    <span className={styles.helpName}>{t('emergencyHelpline', 'Emergency Response')}:</span>
                    <a href="tel:112" className={styles.helpPhone}>112</a>
                  </div>
                  <div className={styles.helplineItem}>
                    <span className={styles.helpName}>{t('sahyadriRescue', 'Sahyadri Rescue')}:</span>
                    <a href="tel:+919422012345" className={styles.helpPhone}>+91 94220 12345</a>
                  </div>
                </div>
              </div>

              {/* Cultural Royal Decree */}
              <div className={styles.quoteCard}>
                <Shield size={22} color="var(--color-accent)" />
                <p className={styles.quoteText}>
                  "गडकोट म्हणजेच राज्य... जसा ज्यास गड, त्याचे तसे राज्य."
                </p>
                <span className={styles.quoteAuthor}>— रामचंद्रपंत अमात्य (आज्ञापत्र, १६९८)</span>
                <p className={styles.quoteTranslation}>
                  "{language === 'mr'
                    ? 'दुर्ग हेच राष्ट्राचे प्राण आहेत. ज्याच्याकडे गडकोट त्याचेच राज्य.'
                    : language === 'hi'
                    ? 'किले ही राज्य का सार हैं। जिसके पास दुर्ग, उसी का राज्य।'
                    : 'Forts are the true essence of sovereignty. He who commands the hill citadels commands the realm.'}"
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
