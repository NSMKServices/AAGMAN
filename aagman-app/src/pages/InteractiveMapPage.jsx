import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import MaharashtraMap from '../components/dashboard/MaharashtraMap';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import styles from './InteractiveMapPage.module.css';

const CIRCUITS = [
  {
    id: 'konkan-coastal',
    title: 'Konkan Coastal & Sea Forts Circuit',
    icon: '🏖️',
    distance: '540 km',
    duration: '5 Days / 4 Nights',
    bestTime: 'October to March',
    stops: ['Mumbai / Alibaug', 'Murud-Janjira', 'Ganpatipule', 'Sindhudurg', 'Tarkarli'],
    description: 'Cruise the pristine Arabian Sea coastline, visit impregnable island fortresses, dive in coral reefs at Tarkarli, and savor authentic Malvani cuisine with Solkadhi.'
  },
  {
    id: 'sahyadri-citadels',
    title: 'Sahyadri High Trekking Citadels',
    icon: '🏰',
    distance: '380 km',
    duration: '4 Days / 3 Nights',
    bestTime: 'June to February (Monsoon/Winter)',
    stops: ['Sinhagad', 'Rajgad (King of Forts)', 'Torna', 'Raigad Capital', 'Pratapgad'],
    description: 'Walk the footsteps of Chhatrapati Shivaji Maharaj across the dramatic ridges, cliff-edge bastions, and cloud-veiled plateaus of the Western Ghats.'
  },
  {
    id: 'unesco-caves',
    title: 'UNESCO World Heritage Rock-Cut Trail',
    icon: '📜',
    distance: '420 km',
    duration: '3 Days / 2 Nights',
    bestTime: 'November to March',
    stops: ['Ellora Kailasa Temple', 'Ajanta Caves', 'Daulatabad Fort', 'Bibi Ka Maqbara'],
    description: 'Marvel at 1,500-year-old Buddhist frescoes at Ajanta, the world\'s largest monolithic rock excavation at Ellora Cave 16, and the medieval defenses of Daulatabad.'
  },
  {
    id: 'sacred-pilgrimage',
    title: 'Sacred Jyotirlinga & Devasthan Circuit',
    icon: '🛕',
    distance: '620 km',
    duration: '6 Days / 5 Nights',
    bestTime: 'All Year Round',
    stops: ['Trimbakeshwar (Godavari)', 'Shirdi Sai Temple', 'Bhimashankar', 'Pandharpur Vitthal Mandir'],
    description: 'A transformative spiritual yatra through Maharashtra\'s holiest shrines, river ghats of the Godavari, and ancient Hemadpanthi basalt sanctuaries.'
  }
];

export default function InteractiveMapPage() {
  const [selectedCircuit, setSelectedCircuit] = useState(CIRCUITS[0]);

  return (
    <div className={styles.mapPage}>
      {/* Header Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>भौगोलिक नकाशा आणि पर्यटन मार्ग</span>
            <h1 className={styles.heroTitle}>Maharashtra Interactive Tourism Atlas</h1>
            <p className={styles.heroSubtitle}>
              Pinpoint historic hill citadels, sun-kissed Konkan beaches, UNESCO rock-cut caves, and sacred river temples across Maharashtra's 36 districts.
            </p>
          </div>
        </Container>
      </section>

      {/* Map & Circuit Container */}
      <section className={styles.mapSection}>
        <Container>
          <div className={styles.mapCardWrapper}>
            <MaharashtraMap />
          </div>
        </Container>
      </section>

      {/* Featured Travel Circuits */}
      <section className={styles.circuitsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>Curated Road Trips</span>
            <h2 className={styles.title}>Signature Maharashtra Travel Circuits</h2>
            <p className={styles.description}>
              Seamless itineraries connecting iconic destinations by road and rail across the state.
            </p>
          </div>

          <div className={styles.circuitsGrid}>
            {CIRCUITS.map((circuit) => (
              <div
                key={circuit.id}
                className={`${styles.circuitCard} ${selectedCircuit.id === circuit.id ? styles.selectedCircuit : ''}`}
                onClick={() => setSelectedCircuit(circuit)}
              >
                <div className={styles.circuitHeader}>
                  <span className={styles.circuitIcon}>{circuit.icon}</span>
                  <div className={styles.circuitMeta}>
                    <span className={styles.durationBadge}>{circuit.duration}</span>
                    <span className={styles.distBadge}>{circuit.distance}</span>
                  </div>
                </div>

                <h3 className={styles.circuitTitle}>{circuit.title}</h3>
                <p className={styles.circuitDescription}>{circuit.description}</p>

                <div className={styles.stopsBox}>
                  <span className={styles.stopsLabel}>Key Stops:</span>
                  <div className={styles.stopsList}>
                    {circuit.stops.map((stop, i) => (
                      <span key={i} className={styles.stopChip}>
                        {i + 1}. {stop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.circuitFooter}>
                  <span className={styles.bestTime}>🗓️ Best: {circuit.bestTime}</span>
                  <Link to="/planner">
                    <Button variant="primary" size="sm">Plan This Route ✨</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
