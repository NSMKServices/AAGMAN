import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useTrips } from '../context/TripContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Backpack,
  MapPin,
  Wallet,
  Sparkles,
  Compass,
  Calendar,
  Building,
  Trash,
  ChevronDown,
  ChevronUp
} from '../components/common/Icons';
import styles from './TripsPage.module.css';

export default function TripsPage() {
  const { trips, deleteTrip } = useTrips();
  const { language, t } = useLanguage();
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
            <span className={styles.heroBadge}>
              {language === 'mr' ? 'माझ्या यात्रा आणि सहली' : language === 'hi' ? 'मेरी यात्राएं' : 'MY EXPEDITIONS'}
            </span>
            <h1 className={styles.heroTitle}>{t('myTrips', 'My Maharashtra Expeditions')}</h1>
            <p className={styles.heroSubtitle}>
              {language === 'mr'
                ? 'आपले नियोजित सहल मार्ग, दिवसनिहाय कार्यक्रम, रात्रीचा मुक्काम आणि बजेटचे व्यवस्थापन करा.'
                : language === 'hi'
                ? 'अपने यात्रा परिपथ, दैनिक कार्यक्रम, रात्रि विश्राम और बजट का प्रबंधन करें।'
                : 'Manage your curated travel circuits, day-by-day schedules, night stays, and trip budgets across the state.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Summary Metrics Bar */}
      <section className={styles.metricsBar}>
        <Container>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>
                <Backpack size={20} />
              </span>
              <div>
                <span className={styles.metricValue}>{trips.length}</span>
                <span className={styles.metricLabel}>{t('plannedTripsCount', 'Planned Trips')}</span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>
                <MapPin size={20} />
              </span>
              <div>
                <span className={styles.metricValue}>{totalDestinations}</span>
                <span className={styles.metricLabel}>{t('destinations', 'Destinations Booked')}</span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>
                <Wallet size={20} />
              </span>
              <div>
                <span className={styles.metricValue}>₹{totalBudget.toLocaleString('en-IN')}</span>
                <span className={styles.metricLabel}>{t('tripBudget', 'Allocated Budget')}</span>
              </div>
            </div>

            <div className={styles.actionCard}>
              <Link to="/planner">
                <Button variant="primary" icon={<Sparkles size={16} />}>
                  {t('planTripBtn', 'Generate New Circuit')}
                </Button>
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
              <span className={styles.emptyIcon}>
                <Backpack size={44} />
              </span>
              <h2 className={styles.emptyTitle}>{t('noTripsYet', 'No trips planned yet')}</h2>
              <p className={styles.emptyText}>
                {language === 'mr'
                  ? 'आपली पहिली महाराष्ट्र सहल आखा आणि दिवसनिहाय मार्गदर्शक योजना तयार करा.'
                  : language === 'hi'
                  ? 'अपनी पहली महाराष्ट्र यात्रा की योजना बनाएं और दैनिक कार्यक्रम तैयार करें।'
                  : 'Use our Smart Journey Planner or Budget Calculator to generate and save your first custom itinerary.'}
              </p>
              <div className={styles.emptyActions}>
                <Link to="/planner">
                  <Button variant="primary" icon={<Sparkles size={16} />}>
                    {t('planner', 'Plan a Trip')}
                  </Button>
                </Link>
                <Link to="/budget">
                  <Button variant="secondary" icon={<Wallet size={16} />}>
                    {t('budgetPlanner', 'Estimate Budget')}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.tripsList}>
              {trips.map((trip) => {
                const isExpanded = expandedTripId === trip.id;
                return (
                  <div key={trip.id} className={styles.tripCard}>
                    {/* Header Summary */}
                    <div className={styles.tripHeader} onClick={() => toggleExpand(trip.id)}>
                      <div className={styles.tripMainInfo}>
                        <div className={styles.badgeRow}>
                          <Badge variant="forts" size="sm">{trip.circuit || 'Custom Circuit'}</Badge>
                          <span className={styles.statusBadge}>{trip.status || 'Planned'}</span>
                        </div>
                        <h3 className={styles.tripName}>{trip.name}</h3>
                        <div className={styles.metaRow}>
                          <span className={styles.metaItem}>
                            <Calendar size={13} />
                            {trip.startDate} - {trip.endDate} ({trip.durationDays} {language === 'mr' ? 'दिवस' : language === 'hi' ? 'दिन' : 'Days'})
                          </span>
                          <span className={styles.metaItem}>
                            <MapPin size={13} />
                            {trip.destinations?.length || 0} {language === 'mr' ? 'ठिकाणे' : language === 'hi' ? 'स्थल' : 'Stops'}
                          </span>
                          <span className={styles.metaItem}>
                            <Wallet size={13} />
                            ₹{(trip.allocatedBudget || 0).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className={styles.headerActions} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => setTripToDelete(trip)}
                          aria-label="Delete Trip"
                          title="Delete Trip"
                        >
                          <Trash size={15} />
                        </button>
                        <button
                          type="button"
                          className={styles.expandBtn}
                          onClick={() => toggleExpand(trip.id)}
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Day Itinerary */}
                    {isExpanded && (
                      <div className={styles.tripBody}>
                        <div className={styles.destList}>
                          <strong className={styles.destListTitle}>
                            {language === 'mr' ? 'सहल थांबे' : language === 'hi' ? 'यात्रा पड़ाव' : 'Key Stops'}:
                          </strong>
                          <div className={styles.destChips}>
                            {trip.destinations?.map((dest, i) => (
                              <span key={i} className={styles.destChip}>{dest}</span>
                            ))}
                          </div>
                        </div>

                        <div className={styles.itineraryTimeline}>
                          <h4 className={styles.timelineTitle}>
                            {language === 'mr' ? 'दिवसनिहाय कार्यक्रम' : language === 'hi' ? 'दैनिक यात्रा कार्यक्रम' : 'Day-by-Day Schedule'}
                          </h4>
                          {trip.itineraryDays?.map((day) => (
                            <div key={day.day} className={styles.dayItem}>
                              <div className={styles.dayBadge}>
                                {language === 'mr' ? `दिवस ${day.day}` : language === 'hi' ? `दिन ${day.day}` : `Day ${day.day}`}
                              </div>
                              <div className={styles.dayContent}>
                                <h5 className={styles.dayTitle}>{day.title}</h5>
                                <p className={styles.dayHighlights}>{day.highlights}</p>
                                {day.nightStay && (
                                  <span className={styles.nightStay}>
                                    <Building size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                                    {language === 'mr' ? 'मुक्काम' : language === 'hi' ? 'विश्राम' : 'Stay'}: {day.nightStay}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
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
          title={language === 'mr' ? 'सहल हटवा' : language === 'hi' ? 'यात्रा हटाएं' : 'Delete Trip'}
        >
          <div className={styles.confirmModal}>
            <p>
              {language === 'mr'
                ? `आपण खात्रीपूर्वक "${tripToDelete.name}" ही सहल हटवू इच्छिता का?`
                : language === 'hi'
                ? `क्या आप वाकई "${tripToDelete.name}" यात्रा को हटाना चाहते हैं?`
                : `Are you sure you want to delete "${tripToDelete.name}"? This action cannot be undone.`}
            </p>
            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={() => setTripToDelete(null)}>
                {t('cancel', 'Cancel')}
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                {language === 'mr' ? 'होय, हटवा' : language === 'hi' ? 'हाँ, हटाएं' : 'Delete'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
