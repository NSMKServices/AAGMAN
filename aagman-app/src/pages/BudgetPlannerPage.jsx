import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useTrips } from '../context/TripContext';
import {
  Building,
  Car,
  Utensils,
  Ticket,
  Shield,
  Check,
  Backpack,
  Info
} from '../components/common/Icons';
import styles from './BudgetPlannerPage.module.css';

const STAY_TIERS = [
  { id: 'budget', label: 'Budget Homestay / Dharamsala', costPerRoom: 800, desc: 'Clean local stays, MTDC dorms, and village homestays' },
  { id: 'standard', label: 'MTDC Resort / 3-Star Heritage', costPerRoom: 2400, desc: 'Standard AC rooms with scenic viewpoints and breakfast' },
  { id: 'luxury', label: 'Luxury Heritage Palace / Resort', costPerRoom: 6500, desc: 'Royal wada suites, boutique cliffside villas & pools' }
];

const TRANSPORT_MODES = [
  { id: 'bus', label: 'MSRTC Bus / Public State Transport', perPersonPerDay: 350, isPerPerson: true, desc: 'Eco-friendly red buses & Shivneri AC coaches' },
  { id: 'taxi', label: 'Private AC Cab / Self-Drive Rental', perCarPerDay: 2600, isPerPerson: false, desc: 'Flexibility for winding ghats and remote forts' },
  { id: 'train', label: 'Fast Express Train & Local Autos', perPersonPerDay: 850, isPerPerson: true, desc: 'Vande Bharat / Konkan Railway scenic routes' }
];

const FOOD_TIERS = [
  { id: 'local', label: 'Authentic Local Thalis & Street Food', perPersonPerDay: 350, desc: 'Pithla Bhakri, Misal Pav, Vadapav, local dhabas' },
  { id: 'casual', label: 'Comfort Family Restaurants & Cafes', perPersonPerDay: 750, desc: 'Full Maharashtrian meals, seafood thalis, Solkadhi' },
  { id: 'fine', label: 'Heritage Fine Dining & Specialty Seafood', perPersonPerDay: 1600, desc: 'Royal Peshwa banquets and premium coastal catches' }
];

const ACTIVITY_TIERS = [
  { id: 'basic', label: 'Self-Guided & Basic Monument Entry', perPersonPerDay: 150, desc: 'ASI tickets, fort grounds, and free temple darshan' },
  { id: 'guided', label: 'Heritage Guides & Fort Trek Permits', perPersonPerDay: 500, desc: 'Local history guides, ropeways, and parking fees' },
  { id: 'adventure', label: 'Watersports, Scuba & Trekking Gear', perPersonPerDay: 1500, desc: 'Tarkarli scuba diving, paragliding, and boating' }
];

export default function BudgetPlannerPage() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();

  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [selectedStay, setSelectedStay] = useState('standard');
  const [selectedTransport, setSelectedTransport] = useState('taxi');
  const [selectedFood, setSelectedFood] = useState('casual');
  const [selectedActivity, setSelectedActivity] = useState('guided');
  const [tripName, setTripName] = useState('Custom Maharashtra Tour');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Cost calculation
  const budget = useMemo(() => {
    // Rooms: 2 travelers per room
    const rooms = Math.ceil(travelers / 2);
    const stayObj = STAY_TIERS.find(s => s.id === selectedStay) || STAY_TIERS[1];
    const totalStay = stayObj.costPerRoom * rooms * Math.max(1, days - 1);

    // Transport
    const transObj = TRANSPORT_MODES.find(t => t.id === selectedTransport) || TRANSPORT_MODES[1];
    let totalTransport = 0;
    if (transObj.isPerPerson) {
      totalTransport = transObj.perPersonPerDay * travelers * days;
    } else {
      // 4 passengers per cab
      const cabsNeeded = Math.ceil(travelers / 4);
      totalTransport = transObj.perCarPerDay * cabsNeeded * days;
    }

    // Food
    const foodObj = FOOD_TIERS.find(f => f.id === selectedFood) || FOOD_TIERS[1];
    const totalFood = foodObj.perPersonPerDay * travelers * days;

    // Activities
    const actObj = ACTIVITY_TIERS.find(a => a.id === selectedActivity) || ACTIVITY_TIERS[1];
    const totalActivities = actObj.perPersonPerDay * travelers * days;

    // Subtotal and 10% contingency buffer
    const subtotal = totalStay + totalTransport + totalFood + totalActivities;
    const contingency = Math.round(subtotal * 0.1);
    const total = subtotal + contingency;
    const perPerson = Math.round(total / travelers);

    return {
      totalStay,
      totalTransport,
      totalFood,
      totalActivities,
      contingency,
      total,
      perPerson
    };
  }, [days, travelers, selectedStay, selectedTransport, selectedFood, selectedActivity]);

  const handleSaveToTrips = () => {
    const newTrip = {
      name: tripName.trim() || `Maharashtra ${days}-Day Tour`,
      circuit: 'Custom Budget Circuit',
      startDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + (7 + days) * 86400000).toISOString().split('T')[0],
      durationDays: days,
      destinations: ['Pune', 'Raigad', 'Mahabaleshwar'],
      allocatedBudget: budget.total,
      estimatedSpent: 0,
      status: 'Planned',
      itineraryDays: Array.from({ length: days }).map((_, i) => ({
        day: i + 1,
        title: `Day ${i + 1} Circuit Exploration`,
        highlights: `Scheduled activities budgeted at ₹${Math.round(budget.totalActivities / days)}/day for ${travelers} travelers.`,
        nightStay: STAY_TIERS.find(s => s.id === selectedStay)?.label
      }))
    };

    addTrip(newTrip);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      navigate('/trips');
    }, 1200);
  };

  return (
    <div className={styles.budgetPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>खर्च अंदाज आणि नियोजन</span>
            <h1 className={styles.heroTitle}>Maharashtra Travel Cost Estimator</h1>
            <p className={styles.heroSubtitle}>
              Calculate transparent costs for accommodation, mountain ghat transportation, local Maharashtrian cuisine, and fort permits.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Calculator */}
      <section className={styles.calculatorSection}>
        <Container>
          <div className={styles.calculatorGrid}>
            {/* Input Controls */}
            <div className={styles.controlsCol}>
              {/* Trip Parameters */}
              <div className={styles.cardGroup}>
                <h3 className={styles.groupTitle}>1. Duration & Group Size</h3>
                <div className={styles.sliderRow}>
                  <div className={styles.sliderItem}>
                    <div className={styles.sliderHeader}>
                      <span className={styles.sliderLabel}>Trip Duration:</span>
                      <strong className={styles.sliderValue}>{days} Days</strong>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="14"
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className={styles.rangeInput}
                    />
                  </div>

                  <div className={styles.sliderItem}>
                    <div className={styles.sliderHeader}>
                      <span className={styles.sliderLabel}>Travelers:</span>
                      <strong className={styles.sliderValue}>{travelers} People</strong>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      className={styles.rangeInput}
                    />
                  </div>
                </div>
              </div>

              {/* Stay Tier */}
              <div className={styles.cardGroup}>
                <h3 className={styles.groupTitle}>2. Accommodation Style</h3>
                <div className={styles.optionList}>
                  {STAY_TIERS.map((tier) => (
                    <label
                      key={tier.id}
                      className={`${styles.optionCard} ${selectedStay === tier.id ? styles.selectedOption : ''}`}
                    >
                      <input
                        type="radio"
                        name="stay"
                        value={tier.id}
                        checked={selectedStay === tier.id}
                        onChange={() => setSelectedStay(tier.id)}
                        className={styles.radioInput}
                      />
                      <div className={styles.optionContent}>
                        <div className={styles.optionHeader}>
                          <span className={styles.optionName}>{tier.label}</span>
                          <span className={styles.optionRate}>₹{tier.costPerRoom.toLocaleString('en-IN')}/night</span>
                        </div>
                        <p className={styles.optionDesc}>{tier.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transport Mode */}
              <div className={styles.cardGroup}>
                <h3 className={styles.groupTitle}>3. Transportation Mode</h3>
                <div className={styles.optionList}>
                  {TRANSPORT_MODES.map((mode) => (
                    <label
                      key={mode.id}
                      className={`${styles.optionCard} ${selectedTransport === mode.id ? styles.selectedOption : ''}`}
                    >
                      <input
                        type="radio"
                        name="transport"
                        value={mode.id}
                        checked={selectedTransport === mode.id}
                        onChange={() => setSelectedTransport(mode.id)}
                        className={styles.radioInput}
                      />
                      <div className={styles.optionContent}>
                        <div className={styles.optionHeader}>
                          <span className={styles.optionName}>{mode.label}</span>
                          <span className={styles.optionRate}>
                            {mode.isPerPerson ? `₹${mode.perPersonPerDay}/person/day` : `₹${mode.perCarPerDay}/vehicle/day`}
                          </span>
                        </div>
                        <p className={styles.optionDesc}>{mode.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Food & Dining */}
              <div className={styles.cardGroup}>
                <h3 className={styles.groupTitle}>4. Dining & Cuisine Style</h3>
                <div className={styles.optionList}>
                  {FOOD_TIERS.map((food) => (
                    <label
                      key={food.id}
                      className={`${styles.optionCard} ${selectedFood === food.id ? styles.selectedOption : ''}`}
                    >
                      <input
                        type="radio"
                        name="food"
                        value={food.id}
                        checked={selectedFood === food.id}
                        onChange={() => setSelectedFood(food.id)}
                        className={styles.radioInput}
                      />
                      <div className={styles.optionContent}>
                        <div className={styles.optionHeader}>
                          <span className={styles.optionName}>{food.label}</span>
                          <span className={styles.optionRate}>₹{food.perPersonPerDay}/person/day</span>
                        </div>
                        <p className={styles.optionDesc}>{food.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className={styles.cardGroup}>
                <h3 className={styles.groupTitle}>5. Activities & Passes</h3>
                <div className={styles.optionList}>
                  {ACTIVITY_TIERS.map((act) => (
                    <label
                      key={act.id}
                      className={`${styles.optionCard} ${selectedActivity === act.id ? styles.selectedOption : ''}`}
                    >
                      <input
                        type="radio"
                        name="activity"
                        value={act.id}
                        checked={selectedActivity === act.id}
                        onChange={() => setSelectedActivity(act.id)}
                        className={styles.radioInput}
                      />
                      <div className={styles.optionContent}>
                        <div className={styles.optionHeader}>
                          <span className={styles.optionName}>{act.label}</span>
                          <span className={styles.optionRate}>₹{act.perPersonPerDay}/person/day</span>
                        </div>
                        <p className={styles.optionDesc}>{act.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Breakdown & Summary Card */}
            <div className={styles.summaryCol}>
              <div className={styles.summarySticky}>
                <div className={styles.summaryCard}>
                  <div className={styles.summaryHeader}>
                    <span className={styles.summarySubtitle}>Real-time Breakdown</span>
                    <h3 className={styles.summaryTitle}>Estimated Budget</h3>
                  </div>

                  <div className={styles.totalBlock}>
                    <div className={styles.mainTotal}>
                      <span className={styles.currencySymbol}>₹</span>
                      <span className={styles.totalNumber}>{budget.total.toLocaleString('en-IN')}</span>
                    </div>
                    <span className={styles.perPersonTag}>
                      ≈ ₹{budget.perPerson.toLocaleString('en-IN')} per traveler
                    </span>
                  </div>

                  <div className={styles.breakdownList}>
                    <div className={styles.breakdownRow}>
                      <span className={styles.rowLabel}>
                        <Building size={14} style={{ marginRight: 6 }} />
                        Accommodation ({days - 1} nights)
                      </span>
                      <span className={styles.rowValue}>₹{budget.totalStay.toLocaleString('en-IN')}</span>
                    </div>

                    <div className={styles.breakdownRow}>
                      <span className={styles.rowLabel}>
                        <Car size={14} style={{ marginRight: 6 }} />
                        Transportation ({days} days)
                      </span>
                      <span className={styles.rowValue}>₹{budget.totalTransport.toLocaleString('en-IN')}</span>
                    </div>

                    <div className={styles.breakdownRow}>
                      <span className={styles.rowLabel}>
                        <Utensils size={14} style={{ marginRight: 6 }} />
                        Meals & Local Dining
                      </span>
                      <span className={styles.rowValue}>₹{budget.totalFood.toLocaleString('en-IN')}</span>
                    </div>

                    <div className={styles.breakdownRow}>
                      <span className={styles.rowLabel}>
                        <Ticket size={14} style={{ marginRight: 6 }} />
                        Passes, Guides & Activities
                      </span>
                      <span className={styles.rowValue}>₹{budget.totalActivities.toLocaleString('en-IN')}</span>
                    </div>

                    <div className={styles.breakdownRow}>
                      <span className={styles.rowLabel}>
                        <Shield size={14} style={{ marginRight: 6 }} />
                        Contingency & Ghat Tolls (10%)
                      </span>
                      <span className={styles.rowValue}>₹{budget.contingency.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className={styles.saveSection}>
                    <label className={styles.nameLabel}>Trip Title:</label>
                    <input
                      type="text"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      className={styles.nameInput}
                      placeholder="e.g. Sahyadri Monsoon Trek"
                    />

                    {saveSuccess && (
                      <div className={styles.successToast}>
                        <Check size={14} style={{ marginRight: 6 }} />
                        Budget saved successfully! Opening My Trips...
                      </div>
                    )}

                    <Button
                      variant="primary"
                      onClick={handleSaveToTrips}
                      className={styles.saveBtn}
                      icon={<Backpack size={16} />}
                    >
                      Save Budget to My Trips
                    </Button>
                  </div>
                </div>

                {/* Benchmark card */}
                <div className={styles.benchmarkCard}>
                  <h4 className={styles.benchmarkTitle}>
                    <Info size={16} style={{ marginRight: 6 }} />
                    Maharashtra Travel Insights
                  </h4>
                  <ul className={styles.benchmarkList}>
                    <li><strong>MTDC Resorts:</strong> Best locations overlooking forts and beaches; book 2 weeks ahead in winter.</li>
                    <li><strong>MSRTC Shivneri:</strong> Direct AC Volvos running every 30 mins between Mumbai & Pune.</li>
                    <li><strong>Ghat Tolls:</strong> Budget approx ₹200–₹400 for Mumbai-Pune Expressway & Khambatki Ghat.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
