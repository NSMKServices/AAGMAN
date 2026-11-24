import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useTrips } from '../context/TripContext';
import { useLanguage } from '../context/LanguageContext';
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
  { id: 'budget', label: 'Budget Homestay / Dharamsala', labelMr: 'स्थानिक होमस्टे / धर्मशाळा', labelHi: 'बजट होमस्टे / धर्मशाला', costPerRoom: 800, desc: 'Clean local stays, MTDC dorms, and village homestays' },
  { id: 'standard', label: 'MTDC Resort / 3-Star Heritage', labelMr: 'एमटीडीसी रिसॉर्ट / ३-स्टार हेरिटेज', labelHi: 'एमटीडीसी रिसॉर्ट / ३-स्टार होटल', costPerRoom: 2400, desc: 'Standard AC rooms with scenic viewpoints and breakfast' },
  { id: 'luxury', label: 'Luxury Heritage Palace / Resort', labelMr: 'शाही वाडा / लक्झरी रिसॉर्ट', labelHi: 'लक्ज़री हेरिटेज पैलेस / रिसॉर्ट', costPerRoom: 6500, desc: 'Royal wada suites, boutique cliffside villas & pools' }
];

const TRANSPORT_MODES = [
  { id: 'bus', label: 'MSRTC Bus / Public State Transport', labelMr: 'एसटी महामंडळ बस / सार्वजनिक वाहतूक', labelHi: 'एमएसआरटीसी बस / सार्वजनिक परिवहन', perPersonPerDay: 350, isPerPerson: true, desc: 'Eco-friendly red buses & Shivneri AC coaches' },
  { id: 'taxi', label: 'Private AC Cab / Self-Drive Rental', labelMr: 'खाजगी वातानुकूलित टॅक्सी / कार', labelHi: 'निजी एसी टैक्सी / रेंटल कार', perCarPerDay: 2600, isPerPerson: false, desc: 'Flexibility for winding ghats and remote forts' },
  { id: 'train', label: 'Fast Express Train & Local Autos', labelMr: 'जलद रेल्वे आणि स्थानिक रिक्षा', labelHi: 'फास्ट एक्सप्रेस ट्रेन एवं ऑटो', perPersonPerDay: 850, isPerPerson: true, desc: 'Vande Bharat / Konkan Railway scenic routes' }
];

const FOOD_TIERS = [
  { id: 'local', label: 'Authentic Local Thalis & Street Food', labelMr: 'स्थानिक पिठलं भाकरी आणि थाळी', labelHi: 'पारंपरिक भोजन एवं थाली', perPersonPerDay: 350, desc: 'Pithla Bhakri, Misal Pav, Vadapav, local dhabas' },
  { id: 'casual', label: 'Comfort Family Restaurants & Cafes', labelMr: 'कौटुंबिक उपहारगृहे व रेस्टॉरंट्स', labelHi: 'पारिवारिक रेस्टोरेंट एवं कैफे', perPersonPerDay: 750, desc: 'Full Maharashtrian meals, seafood thalis, Solkadhi' },
  { id: 'fine', label: 'Heritage Fine Dining & Specialty Seafood', labelMr: 'शाही पक्वान्ने व विशेष मालवणी मेजवानी', labelHi: 'शाही भोजन एवं विशेष सीफूड', perPersonPerDay: 1600, desc: 'Royal Peshwa banquets and premium coastal catches' }
];

const ACTIVITY_TIERS = [
  { id: 'basic', label: 'Self-Guided & Basic Monument Entry', labelMr: 'स्वयं-भ्रमंती व सामान्य प्रवेश शुल्क', labelHi: 'स्वयं-निर्देशित एवं सामान्य प्रवेश', perPersonPerDay: 150, desc: 'ASI tickets, fort grounds, and free temple darshan' },
  { id: 'guided', label: 'Heritage Guides & Fort Trek Permits', labelMr: 'स्थानिक दुर्ग मार्गदर्शक व परवाने', labelHi: 'स्थानीय गाइड एवं ट्रेक परमिट', perPersonPerDay: 500, desc: 'Local history guides, ropeways, and parking fees' },
  { id: 'adventure', label: 'Watersports, Scuba & Trekking Gear', labelMr: 'जलक्रीडा, स्कुबा डायव्हिंग व ट्रेकिंग', labelHi: 'वाटरस्पोर्ट्स, स्कूबा एवं ट्रेकिंग', perPersonPerDay: 1500, desc: 'Tarkarli scuba diving, paragliding, and boating' }
];

export default function BudgetPlannerPage() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();
  const { language, t } = useLanguage();

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
    const rooms = Math.ceil(travelers / 2);
    const stayObj = STAY_TIERS.find(s => s.id === selectedStay) || STAY_TIERS[1];
    const totalStay = stayObj.costPerRoom * rooms * days;

    const transportObj = TRANSPORT_MODES.find(m => m.id === selectedTransport) || TRANSPORT_MODES[1];
    const totalTransport = transportObj.isPerPerson
      ? transportObj.perPersonPerDay * travelers * days
      : transportObj.perCarPerDay * Math.ceil(travelers / 4) * days;

    const foodObj = FOOD_TIERS.find(f => f.id === selectedFood) || FOOD_TIERS[1];
    const totalFood = foodObj.perPersonPerDay * travelers * days;

    const actObj = ACTIVITY_TIERS.find(a => a.id === selectedActivity) || ACTIVITY_TIERS[1];
    const totalActivities = actObj.perPersonPerDay * travelers * days;

    const total = totalStay + totalTransport + totalFood + totalActivities;
    const perPerson = Math.round(total / travelers);

    return {
      totalStay,
      totalTransport,
      totalFood,
      totalActivities,
      total,
      perPerson
    };
  }, [days, travelers, selectedStay, selectedTransport, selectedFood, selectedActivity]);

  const handleSaveTrip = () => {
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

  const getTierLabel = (item) => {
    if (language === 'mr') return item.labelMr || item.label;
    if (language === 'hi') return item.labelHi || item.label;
    return item.label;
  };

  return (
    <div className={styles.budgetPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {language === 'mr' ? 'खर्च अंदाज आणि नियोजन' : language === 'hi' ? 'यात्रा लागत एवं बजट अनुमान' : 'COST & BUDGET ESTIMATION'}
            </span>
            <h1 className={styles.heroTitle}>{t('budgetPlannerTitle', 'Maharashtra Travel Cost Estimator')}</h1>
            <p className={styles.heroSubtitle}>
              {t('budgetPlannerSub', 'Calculate transparent costs for accommodation, mountain ghat transportation, local Maharashtrian cuisine, and fort permits.')}
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
                <h3 className={styles.groupTitle}>
                  1. {language === 'mr' ? 'कालावधी आणि प्रवासी संख्या' : language === 'hi' ? 'अवधि एवं समूह आकार' : 'Duration & Group Size'}
                </h3>
                <div className={styles.sliderRow}>
                  <div className={styles.sliderItem}>
                    <div className={styles.sliderHeader}>
                      <span className={styles.sliderLabel}>{t('durationDays', 'Trip Duration')}:</span>
                      <strong className={styles.sliderValue}>{days} {language === 'mr' ? 'दिवस' : language === 'hi' ? 'दिन' : 'Days'}</strong>
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
                      <span className={styles.sliderLabel}>{t('travelersCount', 'Travelers')}:</span>
                      <strong className={styles.sliderValue}>{travelers} {language === 'mr' ? 'प्रवासी' : language === 'hi' ? 'यात्री' : 'People'}</strong>
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
                <h3 className={styles.groupTitle}>
                  2. {language === 'mr' ? 'निवास व्यवस्था' : language === 'hi' ? 'आवास का प्रकार' : 'Accommodation Style'}
                </h3>
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
                          <span className={styles.optionName}>{getTierLabel(tier)}</span>
                          <span className={styles.optionRate}>₹{tier.costPerRoom.toLocaleString('en-IN')}/{language === 'mr' ? 'रात्र' : language === 'hi' ? 'रात' : 'night'}</span>
                        </div>
                        <p className={styles.optionDesc}>{tier.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transport Mode */}
              <div className={styles.cardGroup}>
                <h3 className={styles.groupTitle}>
                  3. {language === 'mr' ? 'प्रवास साधन' : language === 'hi' ? 'परिवहन साधन' : 'Transportation Mode'}
                </h3>
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
                          <span className={styles.optionName}>{getTierLabel(mode)}</span>
                          <span className={styles.optionRate}>
                            {mode.isPerPerson ? `₹${mode.perPersonPerDay}/${language === 'mr' ? 'व्यक्ती/दिवस' : language === 'hi' ? 'व्यक्ति/दिन' : 'person/day'}` : `₹${mode.perCarPerDay}/${language === 'mr' ? 'वाहन/दिवस' : language === 'hi' ? 'वाहन/दिन' : 'vehicle/day'}`}
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
                <h3 className={styles.groupTitle}>
                  4. {language === 'mr' ? 'भोजन पर्याय' : language === 'hi' ? 'खानपान शैली' : 'Dining & Cuisine Style'}
                </h3>
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
                          <span className={styles.optionName}>{getTierLabel(food)}</span>
                          <span className={styles.optionRate}>₹{food.perPersonPerDay}/{language === 'mr' ? 'व्यक्ती/दिवस' : language === 'hi' ? 'व्यक्ति/दिन' : 'person/day'}</span>
                        </div>
                        <p className={styles.optionDesc}>{food.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className={styles.cardGroup}>
                <h3 className={styles.groupTitle}>
                  5. {language === 'mr' ? 'मार्गदर्शक आणि उपक्रम' : language === 'hi' ? 'गाइड एवं गतिविधियां' : 'Activities & Passes'}
                </h3>
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
                          <span className={styles.optionName}>{getTierLabel(act)}</span>
                          <span className={styles.optionRate}>₹{act.perPersonPerDay}/{language === 'mr' ? 'व्यक्ती/दिवस' : language === 'hi' ? 'व्यक्ति/दिन' : 'person/day'}</span>
                        </div>
                        <p className={styles.optionDesc}>{act.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <aside className={styles.summaryCol}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>
                  {language === 'mr' ? 'अंदाजे खर्च तपशील' : language === 'hi' ? 'बजट विवरण' : 'Budget Breakdown'}
                </h3>

                <div className={styles.costRows}>
                  <div className={styles.costRow}>
                    <span className={styles.costLabel}>
                      <Building size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {language === 'mr' ? 'निवास खर्च' : language === 'hi' ? 'आवास' : 'Lodging'}:
                    </span>
                    <strong className={styles.costVal}>₹{budget.totalStay.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className={styles.costRow}>
                    <span className={styles.costLabel}>
                      <Car size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {language === 'mr' ? 'वाहतूक खर्च' : language === 'hi' ? 'परिवहन' : 'Transport'}:
                    </span>
                    <strong className={styles.costVal}>₹{budget.totalTransport.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className={styles.costRow}>
                    <span className={styles.costLabel}>
                      <Utensils size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {language === 'mr' ? 'खानपान खर्च' : language === 'hi' ? 'खानपान' : 'Food & Dining'}:
                    </span>
                    <strong className={styles.costVal}>₹{budget.totalFood.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className={styles.costRow}>
                    <span className={styles.costLabel}>
                      <Ticket size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {language === 'mr' ? 'उपक्रम व प्रवेश शुल्क' : language === 'hi' ? 'गतिविधियां एवं प्रवेश' : 'Activities & Entry'}:
                    </span>
                    <strong className={styles.costVal}>₹{budget.totalActivities.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className={styles.totalDivider} />

                <div className={styles.totalBlock}>
                  <span className={styles.totalLabel}>{t('totalEstimatedBudget', 'Total Estimated Budget')}:</span>
                  <strong className={styles.totalValue}>₹{budget.total.toLocaleString('en-IN')}</strong>
                  <span className={styles.perPersonSub}>
                    ₹{budget.perPerson.toLocaleString('en-IN')} / {language === 'mr' ? 'प्रत्येकी' : language === 'hi' ? 'प्रति व्यक्ति' : 'person'} ({days} {language === 'mr' ? 'दिवस' : language === 'hi' ? 'दिन' : 'days'}, {travelers} {language === 'mr' ? 'प्रवासी' : language === 'hi' ? 'यात्री' : 'travelers'})
                  </span>
                </div>

                <div className={styles.actionBlock}>
                  <input
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder={language === 'mr' ? 'सहलीचे नाव' : language === 'hi' ? 'यात्रा का नाम' : 'Trip Name'}
                    className={styles.tripNameInput}
                  />

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSaveTrip}
                    className={styles.saveBtn}
                    icon={<Backpack size={16} />}
                  >
                    {saveSuccess ? t('saved', 'Saved!') : t('saveItinerary', 'Save to My Trips')}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
