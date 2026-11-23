import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useTrips } from '../context/TripContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Castle,
  Umbrella,
  BookOpen,
  Landmark,
  MapPin,
  Sparkles,
  Calendar,
  Backpack,
  Sunrise,
  Sunset,
  Utensils,
  Building
} from '../components/common/Icons';
import styles from './PlannerPage.module.css';

const THEMES = [
  { id: 'forts', label: 'Historic Forts & Sahyadri Treks', labelMr: 'ऐतिहासिक किल्ले आणि सह्याद्री ट्रेक', labelHi: 'ऐतिहासिक किले एवं सह्याद्रि ट्रेक', Icon: Castle, destinations: ['Sinhagad', 'Rajgad', 'Torna', 'Raigad'] },
  { id: 'beaches', label: 'Konkan Coastline & Sea Forts', labelMr: 'कोकण समुद्रकिनारे आणि जलदुर्ग', labelHi: 'कोंकण समुद्र तट एवं जलदुर्ग', Icon: Umbrella, destinations: ['Kashid Beach', 'Murud-Janjira', 'Ganpatipule', 'Tarkarli'] },
  { id: 'caves', label: 'UNESCO Caves & Rock Architecture', labelMr: 'युनेस्को लेणी आणि पाषाण स्थापत्य', labelHi: 'यूनेस्को गुफाएं एवं शैल स्थापत्य', Icon: BookOpen, destinations: ['Ellora Caves', 'Ajanta Caves', 'Daulatabad Fort', 'Elephanta'] },
  { id: 'temples', label: 'Sacred Jyotirlinga & Ashtavinayak', labelMr: 'पवित्र ज्योतिर्लिंग आणि अष्टविनायक', labelHi: 'पवित्र ज्योतिर्लिंग एवं अष्टविनायक', Icon: Landmark, destinations: ['Trimbakeshwar', 'Bhimashankar', 'Shirdi', 'Pandharpur'] }
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
  const { language, t } = useLanguage();

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
    setGenerationStep(language === 'mr' ? 'सह्याद्रीच्या घाटमार्गांचे विश्लेषण होत आहे...' : language === 'hi' ? 'सह्याद्रि घाट मार्गों का विश्लेषण हो रहा है...' : 'Analyzing Sahyadri mountain routes and road conditions...');

    setTimeout(() => {
      setGenerationStep(language === 'mr' ? 'स्थानिक भोजन आणि राहण्याच्या सोयींची निवड होत आहे...' : language === 'hi' ? 'स्थानीय खानपान एवं ठहरने की व्यवस्था तैयार हो रही है...' : 'Curating authentic local dhabas & heritage stays...');
    }, 800);

    setTimeout(() => {
      const template = GENERATED_TEMPLATES[selectedTheme] || GENERATED_TEMPLATES.forts;
      setGeneratedItinerary(template);
      setIsGenerating(false);
      setGenerationStep('');
    }, 1500);
  };

  const handleSaveToTrips = () => {
    if (!generatedItinerary) return;

    const newTrip = {
      name: `${hub} to ${generatedItinerary.title}`,
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

  const getThemeTitle = (theme) => {
    if (language === 'mr') return theme.labelMr;
    if (language === 'hi') return theme.labelHi;
    return theme.label;
  };

  return (
    <div className={styles.plannerPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {language === 'mr' ? 'बुद्धिमान प्रवास नियोजन' : language === 'hi' ? 'स्मार्ट यात्रा योजनाकार' : 'INTELLIGENT JOURNEY PLANNER'}
            </span>
            <h1 className={styles.heroTitle}>{t('plannerTitle', 'AAGMAN Smart Journey Planner')}</h1>
            <p className={styles.heroSubtitle}>
              {t('plannerSub', 'Generate custom day-by-day travel itineraries with authentic culinary recommendations, ghat pass driving tips, and optimal fort exploration hours.')}
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
              <label className={styles.fieldLabel}>
                1. {language === 'mr' ? 'प्रस्थान शहर / केंद्र' : language === 'hi' ? 'प्रस्थान शहर' : 'Departure City / Hub'}:
              </label>
              <div className={styles.hubGrid}>
                {['Pune', 'Mumbai', 'Nashik', 'Chhatrapati Sambhajinagar', 'Kolhapur'].map((city) => (
                  <button
                    key={city}
                    type="button"
                    className={`${styles.chipBtn} ${hub === city ? styles.activeChip : ''}`}
                    onClick={() => setHub(city)}
                  >
                    <MapPin size={12} style={{ marginRight: 4 }} /> {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Theme */}
            <div className={styles.formRow}>
              <label className={styles.fieldLabel}>
                2. {language === 'mr' ? 'प्रवास संकल्पना आणि आवडी' : language === 'hi' ? 'यात्रा थीम एवं रुचियां' : 'Travel Theme & Interests'}:
              </label>
              <div className={styles.themeGrid}>
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    className={`${styles.themeCard} ${selectedTheme === theme.id ? styles.activeTheme : ''}`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <span className={styles.themeIcon}>
                      <theme.Icon size={20} />
                    </span>
                    <span className={styles.themeTitle}>{getThemeTitle(theme)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Duration & Pace */}
            <div className={styles.formDualRow}>
              <div className={styles.dualField}>
                <label className={styles.fieldLabel}>
                  3. {language === 'mr' ? 'कालावधी' : language === 'hi' ? 'अवधि' : 'Duration'}:
                </label>
                <div className={styles.btnRow}>
                  {['2', '3', '5'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`${styles.chipBtn} ${duration === d ? styles.activeChip : ''}`}
                      onClick={() => setDuration(d)}
                    >
                      {d} {language === 'mr' ? 'दिवस' : language === 'hi' ? 'दिन' : 'Days'} / {parseInt(d, 10) - 1} {language === 'mr' ? 'रात्री' : language === 'hi' ? 'रातें' : 'Nights'}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.dualField}>
                <label className={styles.fieldLabel}>
                  4. {language === 'mr' ? 'प्रवासाचा वेग' : language === 'hi' ? 'यात्रा गति' : 'Travel Pace'}:
                </label>
                <div className={styles.btnRow}>
                  {[
                    { id: 'Relaxed', label: language === 'mr' ? 'शांत / निवांत' : language === 'hi' ? 'आरामदायक' : 'Relaxed' },
                    { id: 'Balanced', label: language === 'mr' ? 'संतुलित' : language === 'hi' ? 'संतुलित' : 'Balanced' },
                    { id: 'Adventure Packed', label: language === 'mr' ? 'थरारक / साहसी' : language === 'hi' ? 'साहसिक' : 'Adventure Packed' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`${styles.chipBtn} ${pace === p.id ? styles.activeChip : ''}`}
                      onClick={() => setPace(p.id)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div className={styles.formRow}>
              <div className={styles.travelersBox}>
                <span className={styles.fieldLabel}>
                  {language === 'mr' ? 'प्रवासी संख्या' : language === 'hi' ? 'यात्री संख्या' : 'Number of Travelers'}:
                </span>
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
                icon={!isGenerating && <Sparkles size={16} />}
              >
                {isGenerating
                  ? (language === 'mr' ? 'सहल नियोजन तयार होत आहे...' : language === 'hi' ? 'यात्रा योजना तैयार हो रही है...' : 'Generating Itinerary...')
                  : (language === 'mr' ? 'वैयक्तिक सहल नियोजन तयार करा' : language === 'hi' ? 'यात्रा योजना तैयार करें' : 'Generate Custom Itinerary')}
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

      {/* Generated Itinerary Section */}
      {generatedItinerary && !isGenerating && (
        <section className={styles.resultsSection}>
          <Container>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <div>
                  <Badge variant="gold">
                    {generatedItinerary.circuit}
                  </Badge>
                  <h2 className={styles.resultTitle}>{generatedItinerary.title}</h2>
                  <div className={styles.resultMeta}>
                    <span>
                      <Calendar size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      {generatedItinerary.season}
                    </span>
                    <span>•</span>
                    <span>
                      {t('estimatedCost', 'Est. Cost')}: ₹{(generatedItinerary.totalCost * travelers).toLocaleString('en-IN')} ({travelers} {language === 'mr' ? 'प्रवासी' : language === 'hi' ? 'यात्री' : 'Travelers'})
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={handleSaveToTrips}
                  icon={<Backpack size={16} />}
                >
                  {t('saveItinerary', 'Save Itinerary to Trips')}
                </Button>
              </div>

              {/* Day-by-Day Cards */}
              <div className={styles.daysList}>
                {generatedItinerary.days.map((day) => (
                  <div key={day.day} className={styles.dayCard}>
                    <div className={styles.daySidebar}>
                      <span className={styles.dayNumber}>
                        {language === 'mr' ? `दिवस ${day.day}` : language === 'hi' ? `दिन ${day.day}` : `Day ${day.day}`}
                      </span>
                    </div>

                    <div className={styles.dayDetails}>
                      <h3 className={styles.dayTitle}>{day.title}</h3>

                      <div className={styles.dayTimeBlocks}>
                        <div className={styles.timeBlock}>
                          <span className={styles.timeLabel}>
                            <Sunrise size={14} style={{ marginRight: 4, verticalAlign: 'middle', color: 'var(--color-primary)' }} />
                            {language === 'mr' ? 'सकाळ' : language === 'hi' ? 'प्रातःकाल' : 'Morning'}:
                          </span>
                          <p>{day.morning}</p>
                        </div>

                        <div className={styles.timeBlock}>
                          <span className={styles.timeLabel}>
                            <Utensils size={14} style={{ marginRight: 4, verticalAlign: 'middle', color: 'var(--color-secondary)' }} />
                            {language === 'mr' ? 'खाद्य अनुभव' : language === 'hi' ? 'खानपान' : 'Culinary'}:
                          </span>
                          <p>{day.food}</p>
                        </div>

                        <div className={styles.timeBlock}>
                          <span className={styles.timeLabel}>
                            <Sunset size={14} style={{ marginRight: 4, verticalAlign: 'middle', color: 'var(--color-accent)' }} />
                            {language === 'mr' ? 'संध्याकाळ' : language === 'hi' ? 'संध्या' : 'Evening'}:
                          </span>
                          <p>{day.evening}</p>
                        </div>

                        <div className={styles.timeBlock}>
                          <span className={styles.timeLabel}>
                            <Building size={14} style={{ marginRight: 4, verticalAlign: 'middle', color: 'var(--color-text-secondary)' }} />
                            {language === 'mr' ? 'रात्रीचा मुक्काम' : language === 'hi' ? 'रात्रि विश्राम' : 'Night Stay'}:
                          </span>
                          <p><strong>{day.nightStay}</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
