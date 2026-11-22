import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useTrips } from '../context/TripContext';
import styles from './TripsPage.module.css';

export default function TripsPage() {
  const { trips, deleteTrip } = useTrips();
  const [expandedTripId, setExpandedTripId] = useState(trips[0]?.id || null);
  const [tripToDelete, setTripToDelete] = useState(null);

  const totalDestinations = trips.reduce((acc, t) => acc + (t.destinations?.length || 0), 0);
  const totalBudget = trips.reduce((acc, t) => acc + (t.allocatedBudget || 0), 0);

  const toggleExpand = (id) => {
    setExpandedTripId(prev => (prev === id ? null : id));
  };

  const confirmDelete = () => {
    if (tripToDelete) {
      deleteTrip(tripToDelete.id);
      setTripToDelete(null);
    }
  };

  return (
    <div className={styles.tripsPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>माझ्या यात्रा आणि सहली</span>
            <h1 className={styles.heroTitle}>My Maharashtra Expeditions</h1>
            <p className={styles.heroSubtitle}>
              Manage your curated travel circuits, day-by-day schedules, night stays, and trip budgets across the state.
            </p>
          </div>
        </Container>
      </section>

      {/* Summary Metrics Bar */}
      <section className={styles.metricsBar}>
        <Container>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>🎒</span>
              <div>
                <span className={styles.metricValue}>{trips.length}</span>
                <span className={styles.metricLabel}>Planned Trips</span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>📍</span>
              <div>
                <span className={styles.metricValue}>{totalDestinations}</span>
                <span className={styles.metricLabel}>Destinations Booked</span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>💰</span>
              <div>
                <span className={styles.metricValue}>₹{totalBudget.toLocaleString('en-IN')}</span>
                <span className={styles.metricLabel}>Allocated Budget</span>
              </div>
            </div>

            <div className={styles.actionCard}>
              <Link to="/planner">
                <Button variant="primary">Generate New Circuit ✨</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Trips List */}
      <section className={styles.contentSection}>
        <Container>
          {trips.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🚩</span>
              <h2 className={styles.emptyTitle}>No Trips Planned Yet</h2>
              <p className={styles.emptyText}>
                Create your first customized itinerary through the Sahyadris, Konkan coast, or ancient cave temples.
              </p>
              <Link to="/planner">
                <Button variant="primary">Launch Smart Journey Planner ✨</Button>
              </Link>
            </div>
          ) : (
            <div className={styles.tripsList}>
              {trips.map((trip) => {
                const isExpanded = expandedTripId === trip.id;
                return (
                  <div key={trip.id} className={styles.tripCard}>
                    {/* Card Header */}
                    <div className={styles.cardHeader} onClick={() => toggleExpand(trip.id)}>
                      <div className={styles.headerInfo}>
                        <div className={styles.tagRow}>
                          <Badge variant="gold">{trip.circuit || 'Custom Circuit'}</Badge>
                          <span className={styles.dateBadge}>
                            🗓️ {trip.startDate} to {trip.endDate} ({trip.durationDays} Days)
                          </span>
                          <span className={styles.statusBadge}>
                            {trip.status || 'Active'}
                          </span>
                        </div>
                        <h2 className={styles.tripTitle}>{trip.name}</h2>
                        <div className={styles.destinationPills}>
                          {trip.destinations?.map((dest, i) => (
                            <span key={i} className={styles.pill}>📍 {dest}</span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.headerRight}>
                        <div className={styles.budgetBox}>
                          <span className={styles.budgetLabel}>Budget Allocated</span>
                          <span className={styles.budgetValue}>₹{trip.allocatedBudget?.toLocaleString('en-IN')}</span>
                        </div>
                        <button
                          type="button"
                          className={styles.toggleBtn}
                          aria-label="Toggle itinerary details"
                        >
                          {isExpanded ? '▲ Hide' : '▼ Details'}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Itinerary Schedule */}
                    {isExpanded && (
                      <div className={styles.accordionBody}>
                        <h3 className={styles.scheduleTitle}>Day-by-Day Expedition Schedule</h3>
                        <div className={styles.timeline}>
                          {trip.itineraryDays?.map((dayPlan) => (
                            <div key={dayPlan.day} className={styles.timelineItem}>
                              <div className={styles.dayBadge}>Day {dayPlan.day}</div>
                              <div className={styles.dayDetails}>
                                <h4 className={styles.dayHeading}>{dayPlan.title}</h4>
                                <p className={styles.dayHighlights}>{dayPlan.highlights}</p>
                                {dayPlan.nightStay && (
                                  <div className={styles.nightStayTag}>
                                    <span>🏨 Overnight: </span>
                                    <strong>{dayPlan.nightStay}</strong>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Card Actions */}
                        <div className={styles.cardFooter}>
                          <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={() => setTripToDelete(trip)}
                          >
                            🗑️ Delete This Trip
                          </button>
                          <div className={styles.footerActions}>
                            <Link to="/budget">
                              <Button variant="secondary" size="sm">Recalculate Budget</Button>
                            </Link>
                            <Link to="/map">
                              <Button variant="outline" size="sm">View Route on Map</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Delete Confirmation Modal */}
      {tripToDelete && (
        <Modal
          isOpen={!!tripToDelete}
          onClose={() => setTripToDelete(null)}
          title="Confirm Trip Deletion"
        >
          <div className={styles.deleteModal}>
            <p>
              Are you sure you want to remove <strong>"{tripToDelete.name}"</strong> from your saved itineraries?
            </p>
            <p className={styles.deleteWarning}>This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <Button variant="ghost" onClick={() => setTripToDelete(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmDelete}>
                Yes, Remove Trip
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
