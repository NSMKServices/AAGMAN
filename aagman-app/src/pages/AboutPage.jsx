import React from 'react';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  Castle,
  Landmark,
  Trees,
  Compass,
  Shield,
  ArrowRight
} from '../components/common/Icons';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Banner */}
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>MAHARASHTRA HERITAGE & TOURISM INITIATIVE</span>
            <h1 className={styles.heroTitle}>About AAGMAN</h1>
            <p className={styles.heroSubtitle}>
              A comprehensive discovery and travel-planning portal dedicated to celebrating the timeless majesty, royal forts, sacred pilgrimages, and living traditions of Maharashtra.
            </p>
          </div>
        </Container>
      </section>

      {/* Core Mission & Story */}
      <section className={styles.missionSection}>
        <Container>
          <div className={styles.gridTwoCol}>
            <div className={styles.textCol}>
              <Badge variant="gold">OUR MISSION & VISION</Badge>
              <h2 className={styles.sectionHeading}>Inspiring Modern Travelers to Explore Maharashtra's Soul</h2>
              <p className={styles.paragraph}>
                <strong>AAGMAN</strong> ("आगमन" — The Grand Arrival) was established to bridge ancient heritage with contemporary digital exploration. From the soaring mist-shrouded bastions of the Western Ghats (Sahyadris) to the monolithic basalt excavations of Ellora and the tranquil coconut groves of the Konkan coast, Maharashtra represents one of the world's richest civilizational landscapes.
              </p>
              <p className={styles.paragraph}>
                We believe travel should be enriching, responsible, and accessible. AAGMAN empowers explorers, pilgrims, and families with curated historical narratives, accurate geographical coordinates, authentic local culinary recommendations, and practical day-by-day travel itineraries.
              </p>
            </div>

            <div className={styles.statCardsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>350+</span>
                <strong className={styles.statLabel}>Historic Fortresses</strong>
                <p className={styles.statSub}>Citadels of Chhatrapati Shivaji Maharaj's Swarajya</p>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statNumber}>720 km</span>
                <strong className={styles.statLabel}>Pristine Konkan Coast</strong>
                <p className={styles.statSub}>Golden sands, sea forts & coral marine life</p>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statNumber}>5</span>
                <strong className={styles.statLabel}>UNESCO World Heritage Sites</strong>
                <p className={styles.statSub}>Ajanta, Ellora, Elephanta, CSMT & Western Ghats</p>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statNumber}>36</span>
                <strong className={styles.statLabel}>Districts Unified</strong>
                <p className={styles.statSub}>Konkan, Western Maharashtra, Marathwada, Vidarbha & Khandesh</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Guiding Principles */}
      <section className={styles.pillarsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.subHeading}>ETHICAL TOURISM</span>
            <h2 className={styles.mainHeading}>Our Core Heritage Pillars</h2>
            <p className={styles.leadText}>
              Every destination and travel route within AAGMAN is curated according to strict principles of cultural integrity.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <Castle size={24} color="var(--color-secondary)" />
              </div>
              <h3 className={styles.pillarTitle}>Fort Conservation & Clean Sahyadris</h3>
              <p className={styles.pillarDesc}>
                Promoting zero-trace trekking, banning plastic litter on mountain ramparts, and honoring the sacred memory of Maratha warriors who built sovereign freedom across the Deccan.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <Landmark size={24} color="var(--color-accent)" />
              </div>
              <h3 className={styles.pillarTitle}>Sacred Pilgrimage Etiquette</h3>
              <p className={styles.pillarDesc}>
                Providing respectful guidance for visitors to Jyotirlingas, Ashtavinayak temples, and Sant samadhis, upholding devotional sanctity, proper dress codes, and peaceful darshan.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <Trees size={24} color="var(--color-secondary)" />
              </div>
              <h3 className={styles.pillarTitle}>Empowering Rural & Agri-Tourism</h3>
              <p className={styles.pillarDesc}>
                Directing tourism value to local village homestays, traditional chulivarchi food artisans, Warli painters, and Paithani handloom weavers across rural Maharashtra.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <Compass size={24} color="var(--color-highlight)" />
              </div>
              <h3 className={styles.pillarTitle}>Authentic Geographic Accuracy</h3>
              <p className={styles.pillarDesc}>
                Providing verified road circuits, public transit connectivity details, and accurate coordinates without AI hallucinations or fabricated tourism ratings.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Cultural Heritage Banner */}
      <section className={styles.mottoSection}>
        <Container>
          <div className={styles.mottoBanner}>
            <div className={styles.mottoContent}>
              <Shield size={36} color="var(--color-accent)" />
              <h3 className={styles.mottoHeading}>
                "प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता शाहसूनोः शिवस्यैषा मुद्रा भद्राय राजते"
              </h3>
              <p className={styles.mottoTranslation}>
                "Ever-increasing like the crescent moon, and adored by the universe, this royal seal of Shivaji, the son of Shahaji, shines forth for the welfare of all."
              </p>
              <div className={styles.mottoActions}>
                <Button to="/explore" variant="accent">Explore All Destinations</Button>
                <Button to="/contact" variant="outline">Connect With Liaison</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
