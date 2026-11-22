import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useTrips } from '../context/TripContext';
import styles from './PlannerPage.module.css';

const THEMES = [
  { id: 'forts', label: 'Historic Forts & Sahyadri Treks', icon: '🏰', destinations: ['Sinhagad', 'Rajgad', 'Torna', 'Raigad'] },
  { id: 'beaches', label: 'Konkan Coastline & Sea Forts', icon: '🏖️', destinations: ['Kashid Beach', 'Murud-Janjira', 'Ganpatipule', 'Tarkarli'] },
  { id: 'caves', label: 'UNESCO Caves & Rock Architecture', icon: '📜', destinations: ['Ellora Caves', 'Ajanta Caves', 'Daulatabad Fort', 'Elephanta'] },
  { id: 'temples', label: 'Sacred Jyotirlinga & Ashtavinayak', icon: '🛕', destinations: ['Trimbakeshwar', 'Bhimashankar', 'Shirdi', 'Pandharpur'] }
];

const GENERATED_TEMPLATES = {
  forts: {
    title: 'Imperial Maratha Bastions & Sahyadri Ridge Trail',
    circuit: 'Maratha Citadel Circuit',
    season: 'June to February (Monsoon/Winter)',
    totalCost: 12500,
    days: [
      {
        day: 1,
        title: 'Sinhagad Fort & Ridge Ascent',
        morning: 'Sunrise drive to Sinhagad base. Hike via the Kalyan Darwaja path. Explore Tanaji Malusare Memorial and Kade Lot cliff point.',
        food: 'Authentic warm Pithla Bhakri, fresh Curd in clay pots, and Hirvi Mirchi Thecha at local summit stalls.',
        evening: 'Sunset over Khadakwasla backwaters. Transfer to base hotel in Pune.',
        nightStay: 'Heritage stay, Pune South'
      },
      {
        day: 2,
        title: 'Rajgad: The Sovereign Seat of Swarajya',
        morning: 'Early departure for Gunjavane base village. Trek up Chor Darwaja to Padmavati Machi. Explore Sanjivani Machi fortified serpentine bastions.',
        food: 'Packed dry fruits and rustic farm lunch prepared by village homestay at base.',
        evening: 'Descend before twilight. Drive along scenic Varandha Ghat toward Raigad base.',
        nightStay: 'MTDC Resort Raigad / Pachad'
      },
      {
        day: 3,
        title: 'Raigad Fort: The Royal Coronation Capital',
        morning: 'Ropeway ascent to Raigad. Walk through the monumental Maha Darwaja, explore the Royal Darbar (Holi Cha Mal) and the Samadhi of Chhatrapati Shivaji Maharaj.',
        food: 'Local Konkani lunch featuring Ukadiche Modak and fragrant Solkadhi.',
        evening: 'Takmak Tok cliff viewpoint. Return drive to Pune/Mumbai.',
        nightStay: 'Return Journey'
      }
    ]
  },
  beaches: {
    title: 'Konkan Coastal Paradise & Island Citadels',
    circuit: 'Konkan Maritime Circuit',
    season: 'October to May',
    totalCost: 15800,
    days: [
      {
        day: 1,
        title: 'Alibaug & Kashid White Sands',
        morning: 'Ro-Ro ferry from Mumbai to Mandwa. Scenic drive through coconut groves to Kashid Beach.',
        food: 'Fresh tender coconut water, Bombil fry, and Prawns curry with steamed rice at Kashid shacks.',
        evening: 'Sunset watersports at Kashid. Relax by the Arabian Sea.',
        nightStay: 'Beachfront resort, Kashid / Murud'
      },
      {
        day: 2,
        title: 'Impregnable Murud-Janjira Sea Fortress',
        morning: 'Sailboat ride to Janjira Fort in Rajapuri creek. Explore 500-year-old freshwater ponds and Swedish cannons atop sea bastions.',
        food: 'Authentic Konkani fish thali with fried Surmai and Solkadhi.',
        evening: 'Drive south toward Ratnagiri scenic coastal highway.',
        nightStay: 'MTDC Resort Ganpatipule'
      },
      {
        day: 3,
        title: 'Ganpatipule Swayambhu Mandir & Pristine Coast',
        morning: 'Morning darshan at the 400-year-old beachside Ganpati Temple. Walk along pristine Malgund beach.',
        food: 'Traditional vegetarian Kokanastha Brahmin thali with Aamras (seasonal) and Ukadiche Modak.',
        evening: 'Sunset view from Jaigad lighthouse overlooking Shastri river estuary. Return journey.',
        nightStay: 'Return Journey'
      }
    ]
  },
  caves: {
    title: 'UNESCO World Heritage Rock-Cut Masterpieces',
    circuit: 'Deccan Heritage Circuit',
    season: 'November to March',
    totalCost: 13200,
    days: [
      {
        day: 1,
        title: 'Ellora Cave 16: Kailasa Monolithic Wonder',
        morning: 'Arrive in Chhatrapati Sambhajinagar. Early entry to Cave 16 (Kailasa Temple), the world’s largest monolithic excavation carved top-to-bottom.',
        food: 'Authentic Naan Qalia and Marathwada style spicy Shev Bhaji.',
        evening: 'Explore Buddhist multi-story cave monasteries (Caves 1 to 12). Sunset at Grishneshwar Jyotirlinga.',
        nightStay: 'Heritage hotel, Chhatrapati Sambhajinagar'
      },
      {
        day: 2,
        title: 'Daulatabad Fortress & Bibi Ka Maqbara',
        morning: 'Explore medieval Daulatabad Fort—ascend through the Pitch-Dark Labyrinth (Andhari) and Bharat Mata Temple.',
        food: 'Local Mughlai & Maharashtrian fusion thali with Shrikhand.',
        evening: 'Visit Bibi Ka Maqbara ("Taj of the Deccan") with its Mughal gardens and marble dome.',
        nightStay: 'Heritage hotel, Chhatrapati Sambhajinagar'
      },
      {
        day: 3,
        title: 'Ajanta Caves: Ancient Buddhist Frescoes',
        morning: 'Scenic morning drive to Waghur river gorge. Explore Caves 1, 2, 17, and 26 with exquisite 1,500-year-old murals of Jataka tales.',
        food: 'Lunch at MTDC Ajanta restaurant overlooking the Sahyadri valley.',
        evening: 'Ajanta Viewpoint for panoramic perspective of the horse-shoe gorge. Return drive.',
        nightStay: 'Return Journey'
      }
    ]
  },
  temples: {
    title: 'Sacred Maharashtra Jyotirlinga & Devasthan Yatra',
    circuit: 'Spiritual Devasthan Circuit',
    season: 'All Year Round',
    totalCost: 11800,
    days: [
      {
        day: 1,
        title: 'Trimbakeshwar Jyotirlinga & Godavari Origin',
        morning: 'Early morning VIP darshan at Trimbakeshwar, source of the sacred Godavari river. Marvel at black basalt stone carvings.',
        food: 'Pure vegetarian Satvik Maharashtrian thali with Puran Poli in Nashik.',
        evening: 'Visit Panchavati, Sita Gumpha, and Godavari Aarti at Ramkund ghats.',
        nightStay: 'Pilgrim hotel, Nashik'
      },
      {
        day: 2,
        title: 'Shirdi Sai Baba Sansthan & Shani Shingnapur',
        morning: 'Morning Samadhi Mandir darshan at Shirdi. Experience the peaceful sanctum and sacred Dwarkamai.',
        food: 'Nutritious Prasad Bhojan at Shri Sai Baba Sansthan mega kitchen.',
        evening: 'Drive to Shani Shingnapur, the unique village with doorless houses.',
        nightStay: 'Devasthan guesthouse, Shirdi'
      },
      {
        day: 3,
        title: 'Bhimashankar Jyotirlinga in Dense Sahyadris',
        morning: 'Drive through misty forest reserve to Bhimashankar Jyotirlinga. Spot the Giant Squirrel (Shekru) in the wildlife sanctuary.',
        food: 'Village delicacies: Jowar Bhakri, Thecha, and wild herbal tea.',
        evening: 'Nagphani sunset point overlooking Konkan valleys. Return to Pune.',
        nightStay: 'Return Journey'
      }
    ]
  }
};

export default function PlannerPage() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();

  const [hub, setHub] = useState('Pune');
  const [selectedTheme, setSelectedTheme] = useState('forts');
  const [duration, setDuration] = useState('3');
  const [pace, setPace] = useState('Balanced');
  const [travelers, setTravelers] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [generationStep, setGenerationStep] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep('Analyzing Sahyadri mountain routes and road conditions...');

    setTimeout(() => {
      setGenerationStep('Curating authentic local dhabas & heritage stays...');
    }, 800);

    setTimeout(() => {
      setGenerationStep('Optimizing sunrise timings and temple darshan slots...');
    }, 1600);

    setTimeout(() => {
      const template = GENERATED_TEMPLATES[selectedTheme] || GENERATED_TEMPLATES.forts;
      setGeneratedItinerary(template);
      setIsGenerating(false);
    }, 2400);
  };

  const handleSaveTrip = () => {
    if (!generatedItinerary) return;

    const newTrip = {
      name: `${generatedItinerary.title} (${duration} Days)`,
      circuit: generatedItinerary.circuit,
      startDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + (5 + parseInt(duration, 10)) * 86400000).toISOString().split('T')[0],
      durationDays: parseInt(duration, 10),
      destinations: THEMES.find(t => t.id === selectedTheme)?.destinations || ['Maharashtra'],
      allocatedBudget: generatedItinerary.totalCost * travelers,
      estimatedSpent: 0,
      status: 'Planned',
      itineraryDays: generatedItinerary.days.map(d => ({
        day: d.day,
        title: d.title,
        highlights: `${d.morning} Dining: ${d.food}. Evening: ${d.evening}`,
        nightStay: d.nightStay
      }))
    };

    addTrip(newTrip);
    navigate('/trips');
  };

  return (
    <div className={styles.plannerPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>बुद्धिमान प्रवास नियोजन</span>
            <h1 className={styles.heroTitle}>AAGMAN Smart Journey Planner</h1>
            <p className={styles.heroSubtitle}>
              Generate custom day-by-day travel itineraries with authentic culinary recommendations, ghat pass driving tips, and optimal fort exploration hours.
            </p>
          </div>
        </Container>
      </section>

      {/* Questionnaire Form */}
      <section className={styles.formSection}>
        <Container>
          <div className={styles.plannerForm}>
            {/* Step 1: Starting Hub */}
            <div className={styles.formRow}>
              <label className={styles.fieldLabel}>1. Departure City / Hub:</label>
              <div className={styles.hubGrid}>
                {['Pune', 'Mumbai', 'Nashik', 'Chhatrapati Sambhajinagar', 'Kolhapur'].map((city) => (
                  <button
                    key={city}
                    type="button"
                    className={`${styles.chipBtn} ${hub === city ? styles.activeChip : ''}`}
                    onClick={() => setHub(city)}
                  >
                    📍 {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Theme */}
            <div className={styles.formRow}>
              <label className={styles.fieldLabel}>2. Travel Theme & Interests:</label>
              <div className={styles.themeGrid}>
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    className={`${styles.themeCard} ${selectedTheme === theme.id ? styles.activeTheme : ''}`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <span className={styles.themeIcon}>{theme.icon}</span>
                    <span className={styles.themeTitle}>{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Duration & Pace */}
            <div className={styles.formDualRow}>
              <div className={styles.dualField}>
                <label className={styles.fieldLabel}>3. Duration:</label>
                <div className={styles.btnRow}>
                  {['2', '3', '5'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`${styles.chipBtn} ${duration === d ? styles.activeChip : ''}`}
                      onClick={() => setDuration(d)}
                    >
                      {d} Days / {parseInt(d, 10) - 1} Nights
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.dualField}>
                <label className={styles.fieldLabel}>4. Travel Pace:</label>
                <div className={styles.btnRow}>
                  {['Relaxed', 'Balanced', 'Adventure Packed'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`${styles.chipBtn} ${pace === p ? styles.activeChip : ''}`}
                      onClick={() => setPace(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div className={styles.formRow}>
              <div className={styles.travelersBox}>
                <span className={styles.fieldLabel}>Number of Travelers:</span>
                <div className={styles.travelerCounter}>
                  <button
                    type="button"
                    className={styles.counterBtn}
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  >
                    -
                  </button>
                  <span className={styles.counterVal}>{travelers}</span>
                  <button
                    type="button"
                    className={styles.counterBtn}
                    onClick={() => setTravelers(travelers + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className={styles.formActions}>
              <Button
                variant="primary"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className={styles.generateBtn}
              >
                {isGenerating ? 'Generating Itinerary...' : 'Generate Custom Itinerary ✨'}
              </Button>
            </div>

            {/* Loading Indicator */}
            {isGenerating && (
              <div className={styles.loadingBox}>
                <div className={styles.spinner} />
                <p className={styles.loadingText}>{generationStep}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Generated Itinerary Output */}
      {generatedItinerary && (
        <section className={styles.outputSection}>
          <Container>
            <div className={styles.itineraryCard}>
              <div className={styles.itineraryHeader}>
                <div>
                  <Badge variant="gold">{generatedItinerary.circuit}</Badge>
                  <h2 className={styles.itineraryTitle}>{generatedItinerary.title}</h2>
                  <p className={styles.itineraryMeta}>
                    🗓️ Starting from <strong>{hub}</strong> • Best Season: <strong>{generatedItinerary.season}</strong> • Pace: <strong>{pace}</strong>
                  </p>
                </div>

                <div className={styles.headerRight}>
                  <div className={styles.budgetPill}>
                    <span className={styles.budgetPillLabel}>Estimated Budget</span>
                    <span className={styles.budgetPillValue}>₹{(generatedItinerary.totalCost * travelers).toLocaleString('en-IN')}</span>
                  </div>
                  <Button variant="primary" onClick={handleSaveTrip}>
                    Save Itinerary to My Trips 🎒
                  </Button>
                </div>
              </div>

              {/* Day by Day Cards */}
              <div className={styles.daysList}>
                {generatedItinerary.days.map((d) => (
                  <div key={d.day} className={styles.dayCard}>
                    <div className={styles.dayHeader}>
                      <span className={styles.dayPill}>Day {d.day}</span>
                      <h3 className={styles.dayTitle}>{d.title}</h3>
                    </div>

                    <div className={styles.dayGrid}>
                      <div className={styles.dayBlock}>
                        <span className={styles.blockIcon}>🌅</span>
                        <div>
                          <strong>Morning Exploration:</strong>
                          <p>{d.morning}</p>
                        </div>
                      </div>

                      <div className={styles.dayBlock}>
                        <span className={styles.blockIcon}>🍲</span>
                        <div>
                          <strong>Authentic Culinary Stop:</strong>
                          <p>{d.food}</p>
                        </div>
                      </div>

                      <div className={styles.dayBlock}>
                        <span className={styles.blockIcon}>🌇</span>
                        <div>
                          <strong>Afternoon & Sunset:</strong>
                          <p>{d.evening}</p>
                        </div>
                      </div>

                      <div className={styles.dayBlock}>
                        <span className={styles.blockIcon}>🏨</span>
                        <div>
                          <strong>Night Stay Recommendation:</strong>
                          <p>{d.nightStay}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.itineraryFooter}>
                <Button variant="primary" size="lg" onClick={handleSaveTrip}>
                  Save & Confirm This Itinerary 🎒
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
