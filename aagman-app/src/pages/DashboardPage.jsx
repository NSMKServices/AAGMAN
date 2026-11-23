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
import { DESTINATIONS } from '../data/destinations';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { wishlistCount, wishlistedDestinations } = useWishlist();
  const { trips, upcomingTrip } = useTrips();
  const { user } = useAuth();

  const travelerName = user?.name || localStorage.getItem('aagman_traveler_name') || 'Rohan Deshmukh';
  const homeCity = localStorage.getItem('aagman_home_city') || 'Pune';

  // Recently viewed destinations (persisted in localStorage or default fallback)
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('aagman_recently_viewed') || '[]');
      if (stored && stored.length > 0) {
        const matched = stored
          .map(slug => DESTINATIONS.find(d => d.slug === slug))
          .filter(Boolean)
          .slice(0, 3);
        setRecentlyViewed(matched);
      } else {
        // Default authentic recent suggestions
        setRecentlyViewed([
          DESTINATIONS.find(d => d.slug === 'raigad') || DESTINATIONS[0],
          DESTINATIONS.find(d => d.slug === 'trimbakeshwar') || DESTINATIONS[1],
          DESTINATIONS.find(d => d.slug === 'ganpatipule') || DESTINATIONS[2]
        ]);
      }
    } catch {
      setRecentlyViewed(DESTINATIONS.slice(0, 3));
    }
  }, []);

  return (
    <div className={styles.dashboardPage}>
      {/* ========================================================
          1. WELCOME SECTION WITH PERSONALIZED GREETING
          ======================================================== */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.userBadgeRow}>
              <span className={styles.userBadge}>
                <Shield size={14} color="var(--color-accent)" />
                <span>Traveler Portal</span>
              </span>
              <span className={styles.homeCityBadge}>
                <MapPin size={12} color="#FFF9F0" />
                <span>Base: {homeCity}</span>
              </span>
              <span className={styles.roleBadge}>
                <span>Sahyadri Explorer</span>
              </span>
            </div>
            <h1 className={styles.heroTitle}>सस्नेह जय महाराष्ट्र, {travelerName}</h1>
            <p className={styles.heroSubtitle}>
              Welcome back to your personalized Maharashtra Tourism & Heritage Portal. Manage your upcoming Sahyadri expeditions, saved fortresses, and custom itineraries.
            </p>
          </div>
        </Container>
      </section>

      {/* ========================================================
          2. METRICS OVERVIEW ROW
          ======================================================== */}
      <section className={styles.metricsSection}>
        <Container>
          <div className={styles.metricsGrid}>
            <Link to="/trips" className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Backpack size={22} color="var(--color-secondary)" />
              </div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>{trips.length}</span>
                <span className={styles.metricLabel}>Planned Expeditions</span>
              </div>
            </Link>

            <Link to="/wishlist" className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Heart size={22} color="var(--color-highlight)" />
              </div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>{wishlistCount}</span>
                <span className={styles.metricLabel}>Bookmarked Sites</span>
              </div>
            </Link>

            <Link to="/map" className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Map size={22} color="var(--color-accent)" />
              </div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>4 Circuits</span>
                <span className={styles.metricLabel}>Interactive Routes</span>
              </div>
            </Link>

            <Link to="/budget" className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Wallet size={22} color="var(--color-primary)" />
              </div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>Budget Tool</span>
                <span className={styles.metricLabel}>Real-Time Calculator</span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* ========================================================
          MAIN WORKSPACE LAYOUT (2 COLUMNS)
          ======================================================== */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.dashboardLayout}>
            {/* Left Column: Expeditions, Wishlist & Itineraries */}
            <div className={styles.mainCol}>
              {/* 3. UPCOMING TRIPS / EXPEDITIONS */}
              <div className={styles.cardBlock}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.blockEyebrow}>EXPEDITION TIMELINE</span>
                    <h2 className={styles.sectionTitle}>Next Scheduled Expedition</h2>
                  </div>
                  <Link to="/trips" className={styles.viewAllLink}>
                    <span>View All Trips ({trips.length})</span>
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
                          <span>{upcomingTrip.startDate} to {upcomingTrip.endDate} ({upcomingTrip.durationDays} Days)</span>
                        </p>
                      </div>

                      <div className={styles.tripBudgetBadge}>
                        <span className={styles.budgetSmall}>Allocated Budget</span>
                        <strong className={styles.budgetAmount}>
                          ₹{upcomingTrip.allocatedBudget?.toLocaleString('en-IN') || '14,000'}
                        </strong>
                      </div>
                    </div>

                    <div className={styles.destinationsRow}>
                      <span className={styles.destLabel}>Key Circuit Stops:</span>
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
                          <div className={styles.dayNumber}>Day {day.day}</div>
                          <div className={styles.dayPreviewContent}>
                            <h4 className={styles.dayPreviewHeading}>{day.title}</h4>
                            <p className={styles.dayPreviewText}>{day.highlights}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.tripActions}>
                      <Link to="/trips">
                        <Button variant="primary" size="sm">Manage Expedition Schedule</Button>
                      </Link>
                      <Link to="/map">
                        <Button variant="outline" size="sm">Open Circuit Route Map</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyCardBox}>
                    <div className={styles.emptyIconBox}>
                      <Backpack size={32} color="var(--color-accent)" />
                    </div>
                    <h3 className={styles.emptyTitle}>No scheduled expeditions yet</h3>
                    <p className={styles.emptySub}>
                      Plan your next journey across Chhatrapati Shivaji Maharaj's citadels, UNESCO rock caves, or Konkan shorelines.
                    </p>
                    <div className={styles.emptyActions}>
                      <Button to="/planner" variant="primary" size="sm">
                        <span>Plan Your First Trip</span>
                        <Sparkles size={14} />
                      </Button>
                      <Button to="/explore" variant="outline" size="sm">
                        Browse 23 Destinations
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. SAVED DESTINATIONS & WISHLIST OVERVIEW */}
              <div className={styles.cardBlock}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.blockEyebrow}>BOOKMARKED HERITAGE</span>
                    <h2 className={styles.sectionTitle}>Your Saved Places</h2>
                  </div>
                  <Link to="/wishlist" className={styles.viewAllLink}>
                    <span>View Wishlist ({wishlistCount})</span>
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
                    <h3 className={styles.emptyTitle}>Your travel wishlist is empty</h3>
                    <p className={styles.emptySub}>
                      Click the heart icon on any destination card to bookmark forts, temples, and beaches for your upcoming journey.
                    </p>
                    <Button to="/explore" variant="outline" size="sm">
                      Explore Destinations to Bookmark
                    </Button>
                  </div>
                )}
              </div>

              {/* 5. SAVED ITINERARIES & CIRCUIT BLUEPRINTS */}
              <div className={styles.cardBlock}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.blockEyebrow}>RECOMMENDED CIRCUITS</span>
                    <h2 className={styles.sectionTitle}>Suggested Travel Blueprints</h2>
                  </div>
                  <Link to="/planner" className={styles.viewAllLink}>
                    <span>Custom Itinerary Builder</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className={styles.circuitRows}>
                  <div className={styles.circuitMiniCard}>
                    <div className={styles.circuitMiniMeta}>
                      <Badge variant="forts" size="sm">Maratha Imperial</Badge>
                      <span className={styles.miniDuration}>
                        <Clock size={12} /> 4 Days
                      </span>
                    </div>
                    <h4 className={styles.circuitMiniTitle}>Pune – Sinhagad – Raigad – Pratapgad</h4>
                    <p className={styles.circuitMiniSub}>
                      Ascend the sacred coronation citadel of Swarajya with authentic village homestays.
                    </p>
                    <div className={styles.circuitMiniAction}>
                      <span className={styles.budgetNote}>Est. ₹8,500 – ₹14,000</span>
                      <Link to="/planner" className={styles.loadPlanLink}>Load into Planner →</Link>
                    </div>
                  </div>

                  <div className={styles.circuitMiniCard}>
                    <div className={styles.circuitMiniMeta}>
                      <Badge variant="beaches" size="sm">Konkan Coastal</Badge>
                      <span className={styles.miniDuration}>
                        <Clock size={12} /> 5 Days
                      </span>
                    </div>
                    <h4 className={styles.circuitMiniTitle}>Alibaug – Murud-Janjira – Ganpatipule – Tarkarli</h4>
                    <p className={styles.circuitMiniSub}>
                      Pristine beaches, marine sea fortress sailboat ferries, and Malvan scuba diving.
                    </p>
                    <div className={styles.circuitMiniAction}>
                      <span className={styles.budgetNote}>Est. ₹12,000 – ₹18,500</span>
                      <Link to="/planner" className={styles.loadPlanLink}>Load into Planner →</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile, Activity, Recommendations & Helplines */}
            <div className={styles.sidebarCol}>
              {/* 6. PROFILE & ACCOUNT SHORTCUTS */}
              <div className={styles.sideCard}>
                <div className={styles.userProfileCard}>
                  <div className={styles.avatarCircle}>{user?.avatarInitials || 'RD'}</div>
                  <div>
                    <h3 className={styles.profileName}>{travelerName}</h3>
                    <p className={styles.profileEmail}>{user?.email || 'rohan.deshmukh@gmail.com'}</p>
                    <span className={styles.profileRole}>Verified Explorer</span>
                  </div>
                </div>

                <div className={styles.shortcutLinks}>
                  <Link to="/trips" className={styles.shortcutItem}>
                    <Backpack size={16} color="var(--color-secondary)" />
                    <span>My Expeditions ({trips.length})</span>
                  </Link>
                  <Link to="/wishlist" className={styles.shortcutItem}>
                    <Heart size={16} color="var(--color-highlight)" />
                    <span>Saved Wishlist ({wishlistCount})</span>
                  </Link>
                  <Link to="/budget" className={styles.shortcutItem}>
                    <Wallet size={16} color="var(--color-accent)" />
                    <span>Trip Cost Estimator</span>
                  </Link>
                  <Link to="/settings" className={styles.shortcutItem}>
                    <Settings size={16} color="var(--color-text-muted)" />
                    <span>Profile & Preferences</span>
                  </Link>
                </div>
              </div>

              {/* 7. RECENTLY VIEWED DESTINATIONS */}
              <div className={styles.sideCard}>
                <div className={styles.sideHeader}>
                  <span className={styles.sideEyebrow}>YOUR BROWSING HISTORY</span>
                  <h3 className={styles.sideCardTitle}>Recently Viewed</h3>
                </div>

                <div className={styles.recentList}>
                  {recentlyViewed.map((dest) => (
                    <Link
                      key={dest.id}
                      to={`/${dest.category}/${dest.slug}`}
                      className={styles.recentItem}
                    >
                      <img src={dest.thumbnail} alt={dest.name} className={styles.recentThumb} />
                      <div className={styles.recentInfo}>
                        <strong className={styles.recentTitle}>{dest.name}</strong>
                        <span className={styles.recentMeta}>
                          <MapPin size={11} /> {dest.district} • {dest.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 8. SEASONAL TRAVEL RECOMMENDATION */}
              <div className={styles.recommendationCard}>
                <div className={styles.recHeader}>
                  <Sparkles size={18} color="var(--color-accent)" />
                  <span className={styles.recTag}>SEASONAL ADVISORY</span>
                </div>
                <h4 className={styles.recTitle}>Peak Sahyadri Fort Exploration</h4>
                <p className={styles.recBody}>
                  Winter season provides clear summit visibility across Sinhagad, Rajgad, and Torna with cool morning breezes and calm Konkan tides.
                </p>
                <Link to="/forts" className={styles.recLink}>
                  <span>Explore Recommended Forts</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              {/* 9. RECENT TRAVELER ACTIVITY */}
              <div className={styles.sideCard}>
                <div className={styles.sideHeader}>
                  <span className={styles.sideEyebrow}>LOGGED ACTIONS</span>
                  <h3 className={styles.sideCardTitle}>Recent Activity</h3>
                </div>

                <ul className={styles.activityList}>
                  <li className={styles.activityItem}>
                    <span className={styles.activityDot} />
                    <div>
                      <p className={styles.activityText}>Bookmarked <strong>Raigad Fort</strong></p>
                      <span className={styles.activityTime}>Today, 09:30 AM</span>
                    </div>
                  </li>
                  <li className={styles.activityItem}>
                    <span className={styles.activityDot} />
                    <div>
                      <p className={styles.activityText}>Inspected <strong>Maratha Imperial Circuit</strong></p>
                      <span className={styles.activityTime}>Yesterday</span>
                    </div>
                  </li>
                  <li className={styles.activityItem}>
                    <span className={styles.activityDot} />
                    <div>
                      <p className={styles.activityText}>Checked travel permits for <strong>Kalsubai Peak</strong></p>
                      <span className={styles.activityTime}>3 days ago</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 10. TOURIST HELPLINES & ASSISTANCE */}
              <div className={styles.sideCard}>
                <div className={styles.sideHeader}>
                  <span className={styles.sideEyebrow}>ASSISTANCE & EMERGENCIES</span>
                  <h3 className={styles.sideCardTitle}>Tourist Helplines</h3>
                </div>

                <div className={styles.helplineList}>
                  <div className={styles.helplineItem}>
                    <span className={styles.helpName}>MTDC Tourist Helpline:</span>
                    <a href="tel:1800229930" className={styles.helpPhone}>1800-229-930</a>
                  </div>
                  <div className={styles.helplineItem}>
                    <span className={styles.helpName}>Emergency Police/Ambulance:</span>
                    <a href="tel:112" className={styles.helpPhone}>112</a>
                  </div>
                  <div className={styles.helplineItem}>
                    <span className={styles.helpName}>Sahyadri Mountain Rescue:</span>
                    <a href="tel:+919422012345" className={styles.helpPhone}>+91 94220 12345</a>
                  </div>
                </div>
              </div>

              {/* 11. CULTURAL ROYAL DECREE */}
              <div className={styles.quoteCard}>
                <Shield size={22} color="var(--color-accent)" />
                <p className={styles.quoteText}>
                  "गडकोट म्हणजेच राज्य... जसा ज्यास गड, त्याचे तसे राज्य."
                </p>
                <span className={styles.quoteAuthor}>— रामचंद्रपंत अमात्य (आज्ञापत्र, १६९८)</span>
                <p className={styles.quoteTranslation}>
                  "Forts are the true essence of sovereignty. He who commands the hill citadels commands the realm."
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
