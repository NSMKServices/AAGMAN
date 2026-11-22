import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import DestinationCard from '../components/common/DestinationCard';
import { useWishlist } from '../context/WishlistContext';
import { useTrips } from '../context/TripContext';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { wishlistCount, wishlistedDestinations } = useWishlist();
  const { trips, upcomingTrip } = useTrips();

  const travelerName = localStorage.getItem('aagman_traveler_name') || 'Rohan Deshmukh';
  const homeCity = localStorage.getItem('aagman_home_city') || 'Pune';

  return (
    <div className={styles.dashboardPage}>
      {/* Traveler Welcome Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.userBadgeRow}>
              <span className={styles.userBadge}>🔱 Traveler Portal</span>
              <span className={styles.homeCityBadge}>📍 Base: {homeCity}</span>
            </div>
            <h1 className={styles.heroTitle}>नमस्कार, {travelerName}</h1>
            <p className={styles.heroSubtitle}>
              Welcome back to your personalized Maharashtra Tourism & Heritage Portal. Here is your current travel summary, upcoming Sahyadri expeditions, and saved wishlist.
            </p>
          </div>
        </Container>
      </section>

      {/* Metrics Row */}
      <section className={styles.metricsSection}>
        <Container>
          <div className={styles.metricsGrid}>
            <Link to="/trips" className={styles.metricCard}>
              <div className={styles.metricIconBox}>🎒</div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>{trips.length}</span>
                <span className={styles.metricLabel}>Planned Expeditions</span>
              </div>
            </Link>

            <Link to="/wishlist" className={styles.metricCard}>
              <div className={styles.metricIconBox}>❤️</div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>{wishlistCount}</span>
                <span className={styles.metricLabel}>Bookmarked Sites</span>
              </div>
            </Link>

            <Link to="/map" className={styles.metricCard}>
              <div className={styles.metricIconBox}>🗺️</div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>5 Circuits</span>
                <span className={styles.metricLabel}>Interactive Routes</span>
              </div>
            </Link>

            <Link to="/budget" className={styles.metricCard}>
              <div className={styles.metricIconBox}>💰</div>
              <div className={styles.metricText}>
                <span className={styles.metricVal}>Budget Tool</span>
                <span className={styles.metricLabel}>Real-Time Calculator</span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Main Content: Upcoming Trip & Wishlist Preview */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.dashboardLayout}>
            {/* Left Column: Upcoming Trip */}
            <div className={styles.mainCol}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Next Scheduled Expedition</h2>
                <Link to="/trips" className={styles.viewAllLink}>View All Trips →</Link>
              </div>

              {upcomingTrip ? (
                <div className={styles.upcomingTripCard}>
                  <div className={styles.tripCardHeader}>
                    <div>
                      <Badge variant="gold">{upcomingTrip.circuit}</Badge>
                      <h3 className={styles.tripCardTitle}>{upcomingTrip.name}</h3>
                      <p className={styles.tripCardDates}>
                        🗓️ {upcomingTrip.startDate} to {upcomingTrip.endDate} ({upcomingTrip.durationDays} Days)
                      </p>
                    </div>

                    <div className={styles.tripBudgetBadge}>
                      <span className={styles.budgetSmall}>Allocated Budget</span>
                      <strong className={styles.budgetAmount}>₹{upcomingTrip.allocatedBudget?.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className={styles.destinationsRow}>
                    <span className={styles.destLabel}>Key Destinations:</span>
                    <div className={styles.destList}>
                      {upcomingTrip.destinations?.map((d, i) => (
                        <span key={i} className={styles.destChip}>📍 {d}</span>
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
                      <Button variant="primary" size="sm">Manage Itinerary Schedule</Button>
                    </Link>
                    <Link to="/map">
                      <Button variant="outline" size="sm">Open Route Map</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyTripCard}>
                  <p>You have no active trips planned.</p>
                  <Link to="/planner">
                    <Button variant="primary">Generate AI Trip Itinerary ✨</Button>
                  </Link>
                </div>
              )}

              {/* Wishlist Preview */}
              <div className={styles.wishlistSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Your Wishlist Highlights</h2>
                  <Link to="/wishlist" className={styles.viewAllLink}>View All ({wishlistCount}) →</Link>
                </div>

                <div className={styles.wishlistGrid}>
                  {wishlistedDestinations.slice(0, 2).map((dest) => (
                    <DestinationCard key={dest.id} destination={dest} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Quick Travel Tips & Shortcuts */}
            <div className={styles.sidebarCol}>
              <div className={styles.shortcutsCard}>
                <h3 className={styles.sidebarCardTitle}>⚡ Quick Travel Shortcuts</h3>
                <div className={styles.shortcutLinks}>
                  <Link to="/planner" className={styles.shortcutItem}>
                    <span className={styles.scIcon}>✨</span>
                    <div>
                      <strong>Smart Journey Planner</strong>
                      <p>Generate day-by-day travel plans</p>
                    </div>
                  </Link>

                  <Link to="/explore" className={styles.shortcutItem}>
                    <span className={styles.scIcon}>🧭</span>
                    <div>
                      <strong>Explore 64 Destinations</strong>
                      <p>Forts, temples, beaches & caves</p>
                    </div>
                  </Link>

                  <Link to="/festivals" className={styles.shortcutItem}>
                    <span className={styles.scIcon}>🪔</span>
                    <div>
                      <strong>Festival Calendar</strong>
                      <p>Ganeshotsav, Shiv Jayanti, Wari</p>
                    </div>
                  </Link>

                  <Link to="/budget" className={styles.shortcutItem}>
                    <span className={styles.scIcon}>💰</span>
                    <div>
                      <strong>Travel Cost Estimator</strong>
                      <p>Calculate realistic trip budgets</p>
                    </div>
                  </Link>

                  <Link to="/faq" className={styles.shortcutItem}>
                    <span className={styles.scIcon}>❓</span>
                    <div>
                      <strong>Travel FAQ & Helplines</strong>
                      <p>Permits, dress code & safety</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Cultural Quote Card */}
              <div className={styles.quoteCard}>
                <span className={styles.quoteSymbol}>🚩</span>
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