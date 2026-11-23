import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import MaharashtraMap from '../components/dashboard/MaharashtraMap';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import {
  Umbrella,
  Castle,
  BookOpen,
  Landmark,
  Calendar,
  Sparkles
} from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';
import styles from './InteractiveMapPage.module.css';

export default function InteractiveMapPage() {
  const { language, t } = useLanguage();

  const circuits = [
    {
      id: 'konkan-coastal',
      title: t('circuitKonkanTitle', 'Konkan Coastal & Sea Forts Circuit'),
      Icon: Umbrella,
      distance: '540 km',
      duration: language === 'mr' ? '५ दिवस / ४ रात्री' : language === 'hi' ? '5 दिन / 4 रातें' : '5 Days / 4 Nights',
      bestTime: language === 'mr' ? 'ऑक्टोबर ते मार्च' : language === 'hi' ? 'अक्टूबर से मार्च' : 'October to March',
      stops: language === 'mr' 
        ? ['मुंबई / अलिबाग', 'मुरुड-जंजिरा', 'गणपतीपुळे', 'सिंधुदुर्ग', 'तारकर्ली']
        : language === 'hi'
        ? ['मुंबई / अलीबाग', 'मुरुड-जंजीरा', 'गणपतिपुले', 'सिंधुदुर्ग', 'तारकर्ली']
        : ['Mumbai / Alibaug', 'Murud-Janjira', 'Ganpatipule', 'Sindhudurg', 'Tarkarli'],
      description: t('circuitKonkanDesc', 'Cruise the pristine Arabian Sea coastline, visit impregnable island fortresses, dive in coral reefs at Tarkarli, and savor authentic Malvani cuisine with Solkadhi.')
    },
    {
      id: 'sahyadri-citadels',
      title: t('circuitSahyadriTitle', 'Sahyadri High Trekking Citadels'),
      Icon: Castle,
      distance: '380 km',
      duration: language === 'mr' ? '४ दिवस / ३ रात्री' : language === 'hi' ? '4 दिन / 3 रातें' : '4 Days / 3 Nights',
      bestTime: language === 'mr' ? 'जून ते फेब्रुवारी' : language === 'hi' ? 'जून से फरवरी' : 'June to February',
      stops: language === 'mr'
        ? ['सिंहगड', 'राजगड (गडांचा राजा)', 'तोरणा', 'किल्ले रायगड राजधानी', 'प्रतापगड']
        : language === 'hi'
        ? ['सिंहगढ़', 'राजगढ़ (किलों का राजा)', 'तोरणा', 'रायगढ़ राजधानी', 'प्रतापगढ़']
        : ['Sinhagad', 'Rajgad (King of Forts)', 'Torna', 'Raigad Capital', 'Pratapgad'],
      description: t('circuitSahyadriDesc', 'Walk the footsteps of Chhatrapati Shivaji Maharaj across the dramatic ridges, cliff-edge bastions, and cloud-veiled plateaus of the Western Ghats.')
    },
    {
      id: 'unesco-caves',
      title: t('circuitUnescoTitle', 'UNESCO World Heritage Rock-Cut Trail'),
      Icon: BookOpen,
      distance: '420 km',
      duration: language === 'mr' ? '३ दिवस / २ रात्री' : language === 'hi' ? '3 दिन / 2 रातें' : '3 Days / 2 Nights',
      bestTime: language === 'mr' ? 'नोव्हेंबर ते मार्च' : language === 'hi' ? 'नवंबर से मार्च' : 'November to March',
      stops: language === 'mr'
        ? ['वेरूळ कैलास मंदिर', 'अजिंठा लेणी', 'दौलताबाद किल्ला', 'बिबी का मकबरा']
        : language === 'hi'
        ? ['एलोरा कैलाश मंदिर', 'अजंता गुफाएं', 'दौलताबाद किला', 'बीबी का मक़बरा']
        : ['Ellora Kailasa Temple', 'Ajanta Caves', 'Daulatabad Fort', 'Bibi Ka Maqbara'],
      description: t('circuitUnescoDesc', 'Marvel at 1,500-year-old Buddhist frescoes at Ajanta, the world\'s largest monolithic rock excavation at Ellora Cave 16, and the medieval defenses of Daulatabad.')
    },
    {
      id: 'sacred-pilgrimage',
      title: t('circuitPilgrimageTitle', 'Sacred Jyotirlinga & Devasthan Circuit'),
      Icon: Landmark,
      distance: '620 km',
      duration: language === 'mr' ? '६ दिवस / ५ रात्री' : language === 'hi' ? '6 दिन / 5 रातें' : '6 Days / 5 Nights',
      bestTime: language === 'mr' ? 'वर्षभर' : language === 'hi' ? 'वर्षभर' : 'All Year Round',
      stops: language === 'mr'
        ? ['त्र्यंबकेश्वर (गोदावरी उगम)', 'शिर्डी साई समाधी', 'भीमाशंकर', 'पंढरपूर विठ्ठल रुक्मिणी']
        : language === 'hi'
        ? ['त्र्यंबकेश्वर ज्योतिर्लिंग', 'शिरडी साईं समाधि', 'भीमाशंकर', 'पंढरपुर विट्ठल रुक्मिणी']
        : ['Trimbakeshwar (Godavari)', 'Shirdi Sai Temple', 'Bhimashankar', 'Pandharpur Vitthal Mandir'],
      description: t('circuitPilgrimageDesc', 'A transformative spiritual yatra through Maharashtra\'s holiest shrines, river ghats of the Godavari, and ancient Hemadpanthi basalt sanctuaries.')
    }
  ];

  const [selectedCircuit, setSelectedCircuit] = useState(circuits[0]);

  return (
    <div className={styles.mapPage}>
      {/* Header Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {language === 'mr' ? 'भौगोलिक नकाशा आणि पर्यटन मार्ग' : language === 'hi' ? 'भौगोलिक नक्शा एवं यात्रा परिपथ' : 'GEOGRAPHIC ATLAS & TRAVEL CIRCUITS'}
            </span>
            <h1 className={styles.heroTitle}>{t('interactiveAtlasTitle', 'Maharashtra Interactive Tourism Atlas')}</h1>
            <p className={styles.heroSubtitle}>
              {t('interactiveAtlasSub', 'Pinpoint historic hill citadels, sun-kissed Konkan beaches, UNESCO rock-cut caves, and sacred river temples across Maharashtra\'s 36 districts.')}
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
            <span className={styles.subTitle}>{t('curatedRoadTrips', 'Curated Road Trips')}</span>
            <h2 className={styles.title}>{t('signatureCircuitsTitle', 'Signature Maharashtra Travel Circuits')}</h2>
            <p className={styles.description}>
              {t('signatureCircuitsSub', 'Seamless itineraries connecting iconic destinations by road and rail across the state.')}
            </p>
          </div>

          <div className={styles.circuitsGrid}>
            {circuits.map((circuit) => (
              <div
                key={circuit.id}
                className={`${styles.circuitCard} ${selectedCircuit.id === circuit.id ? styles.selectedCircuit : ''}`}
                onClick={() => setSelectedCircuit(circuit)}
              >
                <div className={styles.circuitHeader}>
                  <span className={styles.circuitIcon}>
                    <circuit.Icon size={22} />
                  </span>
                  <div className={styles.circuitMeta}>
                    <span className={styles.durationBadge}>{circuit.duration}</span>
                    <span className={styles.distBadge}>{circuit.distance}</span>
                  </div>
                </div>

                <h3 className={styles.circuitTitle}>{circuit.title}</h3>
                <p className={styles.circuitDescription}>{circuit.description}</p>

                <div className={styles.stopsBox}>
                  <span className={styles.stopsLabel}>{t('keyStops', 'Key Stops')}:</span>
                  <div className={styles.stopsList}>
                    {circuit.stops.map((stop, i) => (
                      <span key={i} className={styles.stopChip}>
                        {i + 1}. {stop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.circuitFooter}>
                  <span className={styles.bestTime}>
                    <Calendar size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    {t('bestSeason', 'Best')}: {circuit.bestTime}
                  </span>
                  <Link to="/planner">
                    <Button variant="primary" size="sm" icon={<Sparkles size={14} />}>
                      {t('planThisRoute', 'Plan This Route')}
                    </Button>
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
