import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import DestinationCard from '../components/common/DestinationCard';
import MaharashtraMap from '../components/dashboard/MaharashtraMap';
import { DESTINATIONS } from '../data/destinations';
import { FESTIVALS } from '../data/festivals';
import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { useTrips } from '../context/TripContext';
import styles from './HomePage.module.css';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1920&q=85",
    tag: "CAPITAL OF SWARAJYA",
    title: "Chhatrapati Shivaji Maharaj's Royal Fort Raigad",
    subtitle: "Ascend the sacred coronation citadel of the Maratha Empire nestled amidst the mist-shrouded Sahyadri peaks."
  },
  {
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=85",
    tag: "UNESCO WORLD HERITAGE",
    title: "Timeless Buddhist Murals of Ajanta Caves",
    subtitle: "Journey two millennia into the Waghur river gorge to witness the immortal paintings of Bodhisattva Padmapani."
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85",
    tag: "PRISTINE KONKAN SHORELINE",
    title: "Golden Sands & Sea Fortresses of Malvan",
    subtitle: "Explore crystal turquoise waters, Sindhudurg naval fort, and serene sunset coconut groves."
  }
];

export default function HomePage() {
  const { t } = useLanguage();
  const { wishlistCount } = useWishlist();
  const { upcomingTrip } = useTrips();

  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const featuredDestinations = DESTINATIONS.slice(0, 4);

  const nextHeroSlide = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevHeroSlide = () => {
    setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentHero = HERO_SLIDES[heroIndex];

  return (
    <div className={styles.dashboardPage}>
      {/* ========================================================
          SECTION 2.C: LARGE PANORAMIC HERO BANNER
          ======================================================== */}
      <section className={styles.heroBanner}>
        <div className={styles.heroBackground}>
          <img
            src={currentHero.image}
            alt={currentHero.title}
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <Container className={styles.heroContent}>
          <span className={styles.heroBadge}>
            <span className={styles.flagIcon}>🚩</span> {currentHero.tag}
          </span>
          <h1 className={styles.heroTitle}>{currentHero.title}</h1>
          <p className={styles.heroSubtitle}>{currentHero.subtitle}</p>

          <div className={styles.heroActions}>
            <Button to="/explore" variant="accent" size="lg" icon="🧭">
              {t('exploreBtn')}
            </Button>
            <Button to="/planner" variant="secondary" size="lg" icon="✨">
              {t('planTripBtn')}
            </Button>
          </div>

          {/* Carousel Slide Indicators & Controls */}
          <div className={styles.carouselControls}>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={prevHeroSlide}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <div className={styles.carouselDots}>
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.dot} ${idx === heroIndex ? styles.activeDot : ''}`}
                  onClick={() => setHeroIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={nextHeroSlide}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION 2.D: QUICK OVERVIEW CARDS (4 IN A ROW)
          ======================================================== */}
      <section className={styles.overviewSection}>
        <Container>
          <div className={styles.overviewGrid}>
            {/* Card 1: My Wishlist */}
            <Link to="/wishlist" className={styles.overviewCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIconBox} style={{ backgroundColor: 'rgba(230, 162, 60, 0.15)', color: '#C45A32' }}>
                  ❤️
                </span>
                <Badge variant="gold" size="sm">WISHLIST</Badge>
              </div>
              <div className={styles.cardStat}>{wishlistCount}</div>
              <div className={styles.cardLabel}>{t('wishlistTitle')}</div>
              <p className={styles.cardSubtext}>
                {wishlistCount > 0 ? `${wishlistCount} ${t('itemsSaved')}` : "Start bookmarking your dream destinations."}
              </p>
              <span className={styles.cardLink}>View Saved Places →</span>
            </Link>

            {/* Card 2: Upcoming Trip */}
            <Link to="/trips" className={styles.overviewCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIconBox} style={{ backgroundColor: 'rgba(114, 45, 27, 0.12)', color: '#722D1B' }}>
                  🎒
                </span>
                <Badge variant="forts" size="sm">UPCOMING</Badge>
              </div>
              <div className={styles.cardHighlightTitle}>
                {upcomingTrip ? upcomingTrip.name : t('noTripsYet')}
              </div>
              <div className={styles.cardLabel}>
                {upcomingTrip ? `${upcomingTrip.durationDays} Days • ${upcomingTrip.circuit}` : t('upcomingTrip')}
              </div>
              <p className={styles.cardSubtext}>
                {upcomingTrip ? `Departing: ${upcomingTrip.startDate}` : "Generate a smart AI itinerary now."}
              </p>
              <span className={styles.cardLink}>View Itinerary →</span>
            </Link>

            {/* Card 3: Trip Budget */}
            <Link to="/budget" className={styles.overviewCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIconBox} style={{ backgroundColor: 'rgba(46, 125, 50, 0.12)', color: '#2E7D32' }}>
                  💰
                </span>
                <Badge variant="default" size="sm">BUDGET</Badge>
              </div>
              <div className={styles.cardStat}>
                ₹{upcomingTrip ? upcomingTrip.allocatedBudget.toLocaleString('en-IN') : '14,000'}
              </div>
              <div className={styles.cardLabel}>{t('tripBudget')}</div>
              <div className={styles.budgetProgress}>
                <div
                  className={styles.budgetProgressBar}
                  style={{ width: upcomingTrip ? `${(upcomingTrip.estimatedSpent / upcomingTrip.allocatedBudget) * 100}%` : '35%' }}
                />
              </div>
              <p className={styles.cardSubtext}>
                Spent: ₹{upcomingTrip ? upcomingTrip.estimatedSpent.toLocaleString('en-IN') : '4,800'} estimated
              </p>
            </Link>

            {/* Card 4: Travel Tips */}
            <div className={styles.overviewCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIconBox} style={{ backgroundColor: 'rgba(2, 136, 209, 0.12)', color: '#0288D1' }}>
                  💡
                </span>
                <Badge variant="beaches" size="sm">ADVISORY</Badge>
              </div>
              <div className={styles.tipHighlight}>Peak Winter Season</div>
              <div className={styles.cardLabel}>{t('travelTips')}</div>
              <p className={styles.cardSubtext}>
                Clear Sahyadri summit weather and calm Konkan tides for scuba diving at Tarkarli & Malvan.
              </p>
              <Link to="/faq" className={styles.cardLink}>Seasonal Travel Guide →</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION 2.E & 2.F: MAIN CONTENT GRID & MAHARASHTRA MAP
          ======================================================== */}
      <section className={styles.mainGridSection}>
        <Container>
          {/* 1. Explore Maharashtra Map */}
          <div className={styles.sectionBlock}>
            <MaharashtraMap />
          </div>

          {/* Featured Destinations Showcase */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeaderRow}>
              <div>
                <span className={styles.subHeading}>CURATED HERITAGE WONDERS</span>
                <h2 className={styles.sectionHeading}>Top Destinations in Maharashtra</h2>
              </div>
              <Button to="/explore" variant="outline" size="sm">
                Explore All 64 Sites →
              </Button>
            </div>

            <div className={styles.destinationGrid}>
              {featuredDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          </div>

          {/* Two-Column Layout: Festival Calendar & Your Itinerary */}
          <div className={styles.twoColGrid}>
            {/* 2. Festival Calendar */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeaderRow}>
                <div>
                  <span className={styles.subHeading}>TRADITION & JOY</span>
                  <h3 className={styles.blockTitle}>{t('festivalCalendarTitle')}</h3>
                </div>
                <Link to="/festivals" className={styles.headerLink}>View All →</Link>
              </div>

              <div className={styles.festivalList}>
                {FESTIVALS.slice(0, 3).map((fest) => (
                  <div key={fest.id} className={styles.festivalItem}>
                    <img src={fest.image} alt={fest.name} className={styles.festivalThumb} />
                    <div className={styles.festivalMeta}>
                      <span className={styles.festivalDate}>📅 {fest.dates}</span>
                      <h4 className={styles.festivalName}>{fest.name}</h4>
                      <p className={styles.festivalMarathi}>{fest.marathiName}</p>
                      <p className={styles.festivalDesc}>{fest.description}</p>
                      <button
                        type="button"
                        className={styles.knowMoreBtn}
                        onClick={() => setSelectedFestival(fest)}
                      >
                        {t('knowMore')} ↗
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Your Itinerary */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeaderRow}>
                <div>
                  <span className={styles.subHeading}>TRAVEL PLANNER</span>
                  <h3 className={styles.blockTitle}>{t('yourItineraryTitle')}</h3>
                </div>
                <Link to="/trips" className={styles.headerLink}>All Trips →</Link>
              </div>

              {upcomingTrip ? (
                <div className={styles.itineraryCard}>
                  <div className={styles.itineraryBadgeRow}>
                    <Badge variant="forts" size="sm">{upcomingTrip.status}</Badge>
                    <span className={styles.itineraryDuration}>⏱️ {upcomingTrip.durationDays} Days</span>
                  </div>

                  <h4 className={styles.itineraryTitle}>{upcomingTrip.name}</h4>
                  <p className={styles.itineraryDates}>
                    📅 {upcomingTrip.startDate} to {upcomingTrip.endDate}
                  </p>

                  <div className={styles.itineraryStops}>
                    <span className={styles.stopsLabel}>KEY DESTINATIONS:</span>
                    <ul className={styles.stopsList}>
                      {upcomingTrip.destinations.map((dest, i) => (
                        <li key={i}>
                          <span className={styles.stepNum}>{i + 1}</span> {dest}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.itineraryActions}>
                    <button
                      type="button"
                      className={styles.viewPlanBtn}
                      onClick={() => setSelectedItinerary(upcomingTrip)}
                    >
                      {t('viewPlan')} 📜
                    </button>
                    <Button to="/planner" variant="secondary" size="sm">
                      Create New Plan ✨
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyStateBox}>
                  <p>No trip planned yet.</p>
                  <Button to="/planner" variant="primary" size="sm">Plan an Adventure</Button>
                </div>
              )}

              {/* 5. Today's Tip */}
              <div className={styles.tipBox}>
                <div className={styles.tipIcon}>🚩</div>
                <div className={styles.tipTextGroup}>
                  <h4 className={styles.tipHeading}>{t('todaysTipTitle')}</h4>
                  <p className={styles.tipBody}>
                    "When ascending Sinhagad or Rajgad, start early morning by 06:00 AM to witness the Sahyadri sea-of-clouds phenomenon and enjoy piping hot Pithla Bhakri from village stalls."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Watch Maharashtra (Visual Showcase) */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeaderRow}>
              <div>
                <span className={styles.subHeading}>CINEMATIC EXPERIENCES</span>
                <h2 className={styles.sectionHeading}>{t('watchMaharashtraTitle')}</h2>
              </div>
              <span className={styles.badgeHint}>360° Heritage Views</span>
            </div>

            <div className={styles.videoGrid}>
              <div className={styles.videoCard}>
                <div className={styles.videoThumbWrapper}>
                  <img
                    src="https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80"
                    alt="Raigad Fort"
                    className={styles.videoThumb}
                  />
                  <div className={styles.playIconOverlay}>▶</div>
                  <span className={styles.videoDuration}>04:15</span>
                </div>
                <div className={styles.videoInfo}>
                  <h4 className={styles.videoTitle}>Raigad Fort: The Sovereign Throne of Swarajya</h4>
                  <p className={styles.videoSub}>Panoramic aerial perspective of the Maha Darwaja, Rajbhavan and Sahyadri escarpments.</p>
                </div>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoThumbWrapper}>
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                    alt="Ajanta Caves"
                    className={styles.videoThumb}
                  />
                  <div className={styles.playIconOverlay}>▶</div>
                  <span className={styles.videoDuration}>05:30</span>
                </div>
                <div className={styles.videoInfo}>
                  <h4 className={styles.videoTitle}>Ajanta & Ellora: The Monolithic Kailasa Feat</h4>
                  <p className={styles.videoSub}>High-resolution walk through Cave 16 carved top-down from a single volcanic basalt cliff.</p>
                </div>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoThumbWrapper}>
                  <img
                    src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
                    alt="Sindhudurg Fort"
                    className={styles.videoThumb}
                  />
                  <div className={styles.playIconOverlay}>▶</div>
                  <span className={styles.videoDuration}>03:45</span>
                </div>
                <div className={styles.videoInfo}>
                  <h4 className={styles.videoTitle}>Murud-Janjira & Sindhudurg: Sea Fortresses of the Arabian Sea</h4>
                  <p className={styles.videoSub}>Historic naval strongholds standing undefeated against waves and sieges for four centuries.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Quick Links Section */}
          <div className={styles.quickLinksBlock}>
            <div className={styles.quickLinksGrid}>
              <Link to="/faq" className={styles.quickLinkItem}>
                <span className={styles.quickIcon}>❓</span>
                <div>
                  <h5 className={styles.quickTitle}>Traveler FAQ</h5>
                  <p className={styles.quickSub}>Answers on trek permits, guides & timings</p>
                </div>
              </Link>
              <Link to="/heritage-culture" className={styles.quickLinkItem}>
                <span className={styles.quickIcon}>📜</span>
                <div>
                  <h5 className={styles.quickTitle}>Heritage Guide</h5>
                  <p className={styles.quickSub}>History of the Maratha Empire and Saints</p>
                </div>
              </Link>
              <Link to="/budget" className={styles.quickLinkItem}>
                <span className={styles.quickIcon}>💰</span>
                <div>
                  <h5 className={styles.quickTitle}>Trip Cost Estimator</h5>
                  <p className={styles.quickSub}>Calculate fuel, stay & food expenses</p>
                </div>
              </Link>
              <Link to="/map" className={styles.quickLinkItem}>
                <span className={styles.quickIcon}>🗺️</span>
                <div>
                  <h5 className={styles.quickTitle}>Geographic Atlas</h5>
                  <p className={styles.quickSub}>Explore districts across 5 regions</p>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          MODAL: FESTIVAL DETAILS
          ======================================================== */}
      {selectedFestival && (
        <Modal
          isOpen={Boolean(selectedFestival)}
          onClose={() => setSelectedFestival(null)}
          title={selectedFestival.name}
          subtitle={`📍 ${selectedFestival.location} • 📅 ${selectedFestival.dates}`}
        >
          <img
            src={selectedFestival.image}
            alt={selectedFestival.name}
            style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}
          />
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
            {selectedFestival.marathiName}
          </h4>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>
            {selectedFestival.description}
          </p>
          <div style={{ background: 'var(--color-parchment)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '1rem' }}>
            <strong style={{ display: 'block', color: 'var(--color-secondary)', marginBottom: '0.35rem' }}>
              Cultural Significance:
            </strong>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{selectedFestival.significance}</p>
          </div>
          <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Key Highlights:</strong>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {selectedFestival.highlights?.map((h, i) => (
              <li key={i} style={{ marginBottom: '0.25rem', fontSize: '0.9rem' }}>{h}</li>
            ))}
          </ul>
        </Modal>
      )}

      {/* ========================================================
          MODAL: ITINERARY DETAILS
          ======================================================== */}
      {selectedItinerary && (
        <Modal
          isOpen={Boolean(selectedItinerary)}
          onClose={() => setSelectedItinerary(null)}
          title={selectedItinerary.name}
          subtitle={`📅 ${selectedItinerary.startDate} to ${selectedItinerary.endDate} • ${selectedItinerary.circuit}`}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>ESTIMATED TRIP BUDGET:</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              ₹{selectedItinerary.allocatedBudget.toLocaleString('en-IN')}
            </div>
          </div>

          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)', marginBottom: '1rem' }}>
            Day-by-Day Schedule:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedItinerary.itineraryDays?.map((d) => (
              <div
                key={d.day}
                style={{
                  background: 'var(--color-surface-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ background: 'var(--color-primary)', color: '#FFF', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                    Day {d.day}
                  </span>
                  <strong style={{ color: 'var(--color-text)' }}>{d.title}</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                  {d.highlights}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', fontWeight: 600 }}>
                  🏨 Night Stay: {d.nightStay}
                </span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
