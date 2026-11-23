import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import SectionHeader from '../components/common/SectionHeader';
import Destination3DGallery from '../components/home/Destination3DGallery';
import MaharashtraMap from '../components/dashboard/MaharashtraMap';
import {
  Compass,
  Castle,
  Landmark,
  Umbrella,
  BookOpen,
  Mountain,
  Trees,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Route,
  Wallet,
  Play,
  ExternalLink,
  Shield,
  Utensils,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Info
} from '../components/common/Icons';
import { DESTINATIONS } from '../data/destinations';
import { FESTIVALS } from '../data/festivals';
import { CURATED_VIDEOS } from '../data/videos';
import { getFestivalGallery } from '../data/imageRegistry';
import { useLanguage } from '../context/LanguageContext';
import styles from './HomePage.module.css';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1920&q=85",
    tag: "CAPITAL OF SWARAJYA",
    title: "Chhatrapati Shivaji Maharaj's Royal Fort Raigad",
    subtitle: "Ascend the sacred coronation citadel of the Maratha Empire nestled amidst the mist-shrouded Sahyadri peaks."
  },
  {
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1920&q=85",
    tag: "UNESCO WORLD HERITAGE",
    title: "The Monolithic Wonder: Kailasa Temple & Ellora",
    subtitle: "Stand in awe before the world's largest monolithic rock excavation, carved top-down from volcanic basalt in the 8th century."
  },
  {
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1920&q=85",
    tag: "PRISTINE KONKAN SHORELINE",
    title: "Sea Fortresses & Coral Reefs of Malvan",
    subtitle: "Explore Sindhudurg island citadel, turquoise waters of Tarkarli, and golden coastal coconut groves."
  },
  {
    image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1920&q=85",
    tag: "HIGHEST SUMMIT OF MAHARASHTRA",
    title: "Kalsubai Peak: Crown of the Sahyadri Ranges",
    subtitle: "Trek through panoramic cloudscapes to Maharashtra's highest altitude at 1,646 meters overlooking Bhandardara reservoir."
  }
];

const DISCOVERY_CATEGORIES = [
  {
    title: "Historic Forts",
    marathi: "गड-किल्ले",
    count: "350+ Sites",
    description: "Impregnable Sahyadri hill citadels & coastal sea fortresses of the Marathas.",
    path: "/forts",
    icon: Castle,
    tag: "Citadels"
  },
  {
    title: "Sacred Temples",
    marathi: "तीर्थक्षेत्रे",
    count: "5 Jyotirlingas",
    description: "Trimbakeshwar, Ashtavinayak, Pandharpur Vitthal & ancient sacred sanctums.",
    path: "/temples",
    icon: Landmark,
    tag: "Pilgrimage"
  },
  {
    title: "Konkan Beaches",
    marathi: "सागरकिनारे",
    count: "720 km Coast",
    description: "Pristine white sand bays, coastal forts, scuba reefs & quiet fishing coves.",
    path: "/beaches",
    icon: Umbrella,
    tag: "Coastal"
  },
  {
    title: "UNESCO Heritage",
    marathi: "जागतिक वारसा",
    count: "5 World Sites",
    description: "Ajanta Buddhist murals, Ellora monolithic Kailasa, and Elephanta rock art.",
    path: "/heritage",
    icon: BookOpen,
    tag: "Monuments"
  },
  {
    title: "Hill Stations",
    marathi: "थंड हवेची ठिकाणे",
    count: "Sahyadri Retreats",
    description: "Mahabaleshwar, Matheran, Panchgani, Amboli & Chikhaldara plateau vistas.",
    path: "/explore?category=hills",
    icon: Mountain,
    tag: "Highlands"
  },
  {
    title: "Nature & Wildlife",
    marathi: "वन्यजीव व निसर्ग",
    count: "6 National Parks",
    description: "Tadoba tiger reserve, Kaas flower valley, Koyna sanctuary & dense forests.",
    path: "/explore?category=wildlife",
    icon: Trees,
    tag: "Wildlife"
  },
  {
    title: "Festivals & Events",
    marathi: "उत्सव व परंपरा",
    count: "Year-Round",
    description: "Ganeshotsav, Shiv Jayanti, Pandharpur Wari & Ellora classical arts festivals.",
    path: "/festivals",
    icon: Sparkles,
    tag: "Culture"
  },
  {
    title: "Cultural Traditions",
    marathi: "संस्कृती व वारसा",
    count: "Living Heritage",
    description: "Warli tribal art, Paithani silk weaving, Powada ballads & culinary masteries.",
    path: "/heritage-culture",
    icon: Compass,
    tag: "Tradition"
  }
];

const SUGGESTED_CIRCUITS = [
  {
    id: "maratha-imperial",
    name: "The Maratha Imperial Fort Circuit",
    route: "Pune → Sinhagad → Rajgad → Raigad → Pratapgad",
    duration: "4 Days / 3 Nights",
    pace: "Active Trekking",
    budget: "₹8,500 – ₹14,000",
    highlights: ["Shivaji Maharaj coronation site", "Sunrise over Sahyadri cloud-sea", "Authentic village Pithla Bhakri"]
  },
  {
    id: "konkan-coastal",
    name: "The Golden Konkan Coastal Trail",
    route: "Alibaug → Murud-Janjira → Ganpatipule → Tarkarli",
    duration: "5 Days / 4 Nights",
    pace: "Relaxed Coastal",
    budget: "₹12,000 – ₹18,500",
    highlights: ["Undefeated Murud island fort", "Snorkeling at Sindhudurg coral beds", "Sunset at Ganpatipule mandir"]
  },
  {
    id: "caves-jyotirlinga",
    name: "Sacred Jyotirlinga & UNESCO Cave Circuit",
    route: "Nashik → Trimbakeshwar → Shirdi → Ellora → Ajanta",
    duration: "4 Days / 3 Nights",
    pace: "Cultural Exploration",
    budget: "₹7,000 – ₹12,500",
    highlights: ["Godavari holy source darshan", "Monolithic Kailasa rock temple", "Two millennia old Ajanta murals"]
  }
];

// Curated diverse showcase representing forts, caves, beaches, and temples for 3D Gallery
const FEATURED_SLUGS = [
  'raigad-fort',
  'kailasa-ellora',
  'tarkarli-beach',
  'sinhagad-fort',
  'trimbakeshwar-temple',
  'ajanta-caves',
  'pratapgad-fort',
  'ganpatipule-beach'
];

export default function HomePage() {
  const { t } = useLanguage();
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);

  const featuredDestinations = FEATURED_SLUGS
    .map(slug => DESTINATIONS.find(d => d.slug === slug))
    .filter(Boolean);

  const nextHeroSlide = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevHeroSlide = () => {
    setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentHero = HERO_SLIDES[heroIndex];

  return (
    <div className={styles.homepageRoot}>
      {/* ========================================================
          SECTION A: LARGE EDITORIAL HERO BANNER
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
            <Shield size={14} color="var(--color-accent)" />
            <span>{currentHero.tag}</span>
          </span>
          <h1 className={styles.heroTitle}>{currentHero.title}</h1>
          <p className={styles.heroSubtitle}>{currentHero.subtitle}</p>

          <div className={styles.heroActions}>
            <Button to="/explore" variant="primary" size="lg">
              <span>Explore Maharashtra</span>
              <ArrowRight size={16} />
            </Button>
            <Button to="/planner" variant="accent" size="lg">
              <span>Plan Your Journey</span>
              <Sparkles size={16} />
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
              <ChevronLeft size={18} />
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
              <ChevronRight size={18} />
            </button>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION B: QUICK DISCOVERY SHORTCUTS (8 CATEGORIES)
          ======================================================== */}
      <section className={styles.discoverySection}>
        <Container>
          <SectionHeader
            eyebrow="QUICK DISCOVERY"
            title="Explore Maharashtra"
            description="From 350+ Maratha fortresses to sacred Jyotirlingas and untouched Konkan waters, choose your experience."
          />

          <div className={styles.discoveryGrid}>
            {DISCOVERY_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link key={idx} to={cat.path} className={styles.discoveryCard}>
                  <div className={styles.discHeader}>
                    <div className={styles.discIconBox}>
                      <IconComp size={22} color="var(--color-secondary)" />
                    </div>
                    <span className={styles.discCount}>{cat.count}</span>
                  </div>
                  <h3 className={styles.discTitle}>{cat.title}</h3>
                  <span className={styles.discMarathi}>{cat.marathi}</span>
                  <p className={styles.discDesc}>{cat.description}</p>
                  <span className={styles.discAction}>
                    <span>Explore</span>
                    <ArrowRight size={13} />
                  </span>
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <Button to="/explore" variant="outline" size="md">
              <span>View All 23 Destinations</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION C: INTERACTIVE MAHARASHTRA MAP
          ======================================================== */}
      <section className={styles.mapSectionWrapper}>
        <Container>
          <SectionHeader
            eyebrow="GEOGRAPHICAL DIRECTORY"
            title="Interactive Maharashtra Tourism Map"
            description="Filter destinations across Western Maharashtra, Konkan, Marathwada, and Vidarbha with detailed location previews."
          />
          <MaharashtraMap />
        </Container>
      </section>

      {/* ========================================================
          SECTION D: FEATURED HERITAGE DESTINATIONS
          ======================================================== */}
      <section className={styles.destinationsSection}>
        <Container>
          <SectionHeader
            eyebrow="CURATED SHOWCASE"
            title="Featured Destinations"
            description="Experience Maharashtra's most celebrated historic fortresses, monolithic rock temples, and sun-kissed coastlines in interactive 3D."
          />

          <Destination3DGallery destinations={featuredDestinations} />
        </Container>
      </section>

      {/* ========================================================
          SECTION E & F: FESTIVALS & TRAVEL CIRCUITS (TWO COLUMNS)
          ======================================================== */}
      <section className={styles.culturePlanningSection}>
        <Container>
          <SectionHeader
            eyebrow="EXPEDITIONS & TRADITIONS"
            title="Festivals & Cultural Celebrations"
            description="Participate in living sacred yatras, harvest festivals, and explore curated route blueprints designed for every traveler."
          />
          <div className={styles.twoColGrid}>
            {/* Column 1: Festivals of Maharashtra */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeaderRow}>
                <div>
                  <span className={styles.subHeading}>LIVING TRADITIONS</span>
                  <h3 className={styles.blockTitle}>Cultural Festival Calendar</h3>
                </div>
                <Link to="/festivals" className={styles.headerLink}>
                  <span>All Festivals</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className={styles.festivalList}>
                {FESTIVALS.slice(0, 4).map((fest) => (
                  <div key={fest.id} className={styles.festivalItem}>
                    <img src={fest.image} alt={fest.name} className={styles.festivalThumb} />
                    <div className={styles.festivalMeta}>
                      <div className={styles.festTimeRow}>
                        <Calendar size={12} color="var(--color-secondary)" />
                        <span className={styles.festivalDate}>{fest.dates}</span>
                      </div>
                      <h4 className={styles.festivalName}>{fest.name}</h4>
                      <p className={styles.festivalMarathi}>{fest.marathiName}</p>
                      <p className={styles.festivalDesc}>{fest.description}</p>
                      <div className={styles.festActionRow}>
                        <span className={styles.festLocation}>
                          <MapPin size={12} color="var(--color-text-muted)" /> {fest.location.split('(')[0]}
                        </span>
                        <button
                          type="button"
                          className={styles.knowMoreBtn}
                          onClick={() => setSelectedFestival(fest)}
                        >
                          View Details ↗
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Suggested Travel Circuits */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeaderRow}>
                <div>
                  <span className={styles.subHeading}>EXPEDITION BLUEPRINTS</span>
                  <h3 className={styles.blockTitle}>Recommended Travel Circuits</h3>
                </div>
                <Link to="/planner" className={styles.headerLink}>
                  <span>Open Planner</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className={styles.circuitsList}>
                {SUGGESTED_CIRCUITS.map((circuit) => (
                  <div key={circuit.id} className={styles.circuitCard}>
                    <div className={styles.circuitTopRow}>
                      <Badge variant="forts" size="sm">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Route size={12} /> {circuit.pace}
                        </span>
                      </Badge>
                      <span className={styles.circuitDuration}>
                        <Clock size={12} /> {circuit.duration}
                      </span>
                    </div>

                    <h4 className={styles.circuitName}>{circuit.name}</h4>
                    <p className={styles.circuitRoute}>
                      <strong>Route:</strong> {circuit.route}
                    </p>

                    <ul className={styles.circuitHighlights}>
                      {circuit.highlights.map((h, i) => (
                        <li key={i}>
                          <Check size={12} color="var(--color-secondary)" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.circuitFooter}>
                      <div className={styles.budgetGroup}>
                        <span className={styles.budgetLabel}>Estimated Budget:</span>
                        <strong className={styles.budgetValue}>{circuit.budget}</strong>
                      </div>
                      <Link to="/planner" className={styles.circuitBtn}>
                        <span>Customize Plan</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cultural Decree Card */}
              <div className={styles.decreeBox}>
                <Shield size={24} color="var(--color-accent)" />
                <div>
                  <p className={styles.decreeText}>
                    "गडकोट म्हणजेच राज्य... जसा ज्यास गड, त्याचे तसे राज्य."
                  </p>
                  <span className={styles.decreeCitation}>
                    — रामचंद्रपंत अमात्य (आज्ञापत्र, १६९८)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION G: WATCH MAHARASHTRA (CURATED DESTINATION VIDEOS)
          ======================================================== */}
      <section className={styles.watchSection}>
        <Container>
          <SectionHeader
            eyebrow="CINEMATIC JOURNEYS"
            title="Watch Maharashtra: Curated Destination Videos"
            description="Explore high-definition drone surveys and cultural documentaries. Click any card to watch directly on YouTube in an external browser tab."
          />

          <div className={styles.videoGrid}>
            {CURATED_VIDEOS.map((video) => (
              <a
                key={video.id}
                href={video.youtubeUrl || video.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoCard}
                title={`Watch ${video.title} on YouTube`}
              >
                <div className={styles.videoThumbWrapper}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={styles.videoThumb}
                    loading="lazy"
                  />
                  <div className={styles.playIconOverlay}>
                    <Play size={18} color="#FFFFFF" style={{ fill: '#FFFFFF', marginLeft: '2px' }} />
                  </div>
                  <span className={styles.videoDuration}>{video.duration}</span>
                  <span className={styles.ytBadge}>
                    <span>Watch on YouTube</span>
                    <ExternalLink size={12} />
                  </span>
                </div>
                <div className={styles.videoInfo}>
                  <span className={styles.videoCategory}>{video.destination || video.category}</span>
                  <h4 className={styles.videoTitle}>{video.title}</h4>
                  <p className={styles.videoSub}>{video.summary}</p>
                </div>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <Button to="/videos" variant="outline" size="md">
              <span>Explore All Destination Videos</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION H: AUTHENTIC TRAVEL GUIDE & ESSENTIALS
          ======================================================== */}
      <section className={styles.guideSection}>
        <Container>
          <SectionHeader
            eyebrow="TRAVEL WISDOM"
            title="Plan Your Journey: Field Guide & Etiquette"
            description="Essential seasonal timelines, mountain trekking sanctity, culinary traditions, and 24x7 state tourist helplines."
          />

          <div className={styles.guideGrid}>
            {/* Guide Card 1: Best Season */}
            <div className={styles.guideCard}>
              <div className={styles.guideIconBox}>
                <Calendar size={22} color="var(--color-secondary)" />
              </div>
              <h3 className={styles.guideCardTitle}>Best Seasons to Visit</h3>
              <ul className={styles.guideList}>
                <li>
                  <strong>Monsoon (Jun – Sep):</strong> Sahyadri waterfalls, mist-draped ghats, and lush hill treks (Sinhagad, Rajgad, Malshej).
                </li>
                <li>
                  <strong>Winter (Oct – Feb):</strong> Clear skies and cool weather ideal for fort expeditions and heritage cave exploration.
                </li>
                <li>
                  <strong>Coastal (Nov – Apr):</strong> Calm seas for scuba diving at Tarkarli and quiet Konkan beach retreats.
                </li>
              </ul>
            </div>

            {/* Guide Card 2: Trekking & Fort Etiquette */}
            <div className={styles.guideCard}>
              <div className={styles.guideIconBox}>
                <Shield size={22} color="var(--color-secondary)" />
              </div>
              <h3 className={styles.guideCardTitle}>Fort & Trekking Sanctity</h3>
              <ul className={styles.guideList}>
                <li>
                  <strong>Sacred Ground:</strong> Maharashtra fortresses are sacred historical monuments. Respect memorial shrines and temples.
                </li>
                <li>
                  <strong>Leave No Trace:</strong> Carry all plastic and waste back. Protect natural cisterns (Devtaki) from pollution.
                </li>
                <li>
                  <strong>Local Guides:</strong> Hire certified village guides in base villages (Gunjawane, Velhe, Donje) to support rural livelihoods.
                </li>
              </ul>
            </div>

            {/* Guide Card 3: Maharashtrian Culinary Traditions */}
            <div className={styles.guideCard}>
              <div className={styles.guideIconBox}>
                <Utensils size={22} color="var(--color-secondary)" />
              </div>
              <h3 className={styles.guideCardTitle}>Authentic Local Cuisine</h3>
              <ul className={styles.guideList}>
                <li>
                  <strong>Ghat Cuisine:</strong> Steaming hot Pithla Bhakri with fiery Thecha (crushed green chillies) and fresh dahi.
                </li>
                <li>
                  <strong>Konkan Coast:</strong> Fresh Surmai fish curry, Tisrya (clams), Rice Bhakri, and digestive Solkadhi.
                </li>
                <li>
                  <strong>Festive Delights:</strong> Ukadiche Modak (steamed rice-coconut sweets) and puran poli with ghee.
                </li>
              </ul>
            </div>

            {/* Guide Card 4: Responsible Tourism & Safety */}
            <div className={styles.guideCard}>
              <div className={styles.guideIconBox}>
                <Info size={22} color="var(--color-secondary)" />
              </div>
              <h3 className={styles.guideCardTitle}>Safety & Regulations</h3>
              <ul className={styles.guideList}>
                <li>
                  <strong>Early Ascents:</strong> Start high-altitude fort treks by 06:00 AM to avoid midday heat in the Western Ghats.
                </li>
                <li>
                  <strong>ASI Permits:</strong> Cave monuments at Ajanta, Ellora, and Elephanta close on specific weekdays (Tuesdays / Mondays).
                </li>
                <li>
                  <strong>24/7 Helpline:</strong> MTDC Tourist Support: 1800-229-930 | Emergency Services: 112.
                </li>
              </ul>
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
          subtitle={`${selectedFestival.location} • ${selectedFestival.dates}`}
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

          {getFestivalGallery(selectedFestival.id).length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>Celebration Gallery:</strong>
                <code style={{ fontSize: '0.65rem', color: 'var(--color-secondary)' }}>/assets/festivals/{selectedFestival.id}/</code>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                {getFestivalGallery(selectedFestival.id).map((img, i) => (
                  <div key={i} style={{ borderRadius: 'var(--radius-xs)', overflow: 'hidden', border: '1px solid var(--color-border)', background: 'var(--color-surface-elevated)' }}>
                    <div style={{ position: 'relative', width: '100%', height: '90px' }}>
                      <img
                        src={img.src}
                        alt={img.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                        onError={(e) => {
                          if (img.fallback && e.currentTarget.src !== img.fallback) {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = img.fallback;
                          }
                        }}
                      />
                      <span style={{ position: 'absolute', top: 3, right: 3, background: 'rgba(40, 20, 15, 0.85)', color: 'var(--color-accent)', fontSize: '0.55rem', padding: '1px 4px', borderRadius: '2px', fontFamily: 'monospace' }}>
                        {img.slot}.jpg
                      </span>
                    </div>
                    <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.4rem', color: 'var(--color-primary)' }}>
                      {img.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
