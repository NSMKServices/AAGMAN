import React, { useState, useMemo } from 'react';
import Container from '../components/layout/Container';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import SearchInput from '../components/common/SearchInput';
import { FESTIVALS } from '../data/festivals';
import styles from './FestivalsPage.module.css';

export default function FestivalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFestival, setSelectedFestival] = useState(null);

  const filteredFestivals = useMemo(() => {
    return FESTIVALS.filter(f => {
      const matchSearch = !searchQuery.trim() ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.marathiName && f.marathiName.includes(searchQuery)) ||
        f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [searchQuery]);

  return (
    <div className={styles.festivalsPage}>
      {/* Header Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>उत्सव आणि सण परंपरा</span>
            <h1 className={styles.heroTitle}>Maharashtra Festivals & Cultural Celebrations</h1>
            <p className={styles.heroSubtitle}>
              Experience the thunderous beats of Puneri Dhol-Tasha during Ganeshotsav, torchlight processions on Shivneri, the timeless Pandharpur Wari, and classical symphonies before ancient rock-cut caves.
            </p>
          </div>
        </Container>
      </section>

      {/* Search & Filter Bar */}
      <section className={styles.filterSection}>
        <Container>
          <div className={styles.searchWrapper}>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search festivals by name, location, or tradition (e.g. Pune, Wari, Modak)..."
            />
          </div>
        </Container>
      </section>

      {/* Festivals Grid */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.resultsInfo}>
            <span className={styles.countText}>
              Showing <strong>{filteredFestivals.length}</strong> authentic cultural celebrations
            </span>
          </div>

          <div className={styles.festivalsGrid}>
            {filteredFestivals.map((festival) => (
              <div key={festival.id} className={styles.festivalCard}>
                <div className={styles.cardMedia}>
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.cardDates}>
                    <span>🗓️ {festival.dates}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.festivalName}>{festival.name}</h3>
                    {festival.marathiName && (
                      <span className={styles.marathiName}>{festival.marathiName}</span>
                    )}
                  </div>

                  <p className={styles.locationTag}>📍 {festival.location}</p>
                  <p className={styles.description}>{festival.description}</p>

                  <div className={styles.highlightsContainer}>
                    <span className={styles.highlightsTitle}>Cultural Highlights:</span>
                    <div className={styles.highlightChips}>
                      {festival.highlights.map((h, i) => (
                        <span key={i} className={styles.chip}>✓ {h}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedFestival(festival)}
                    >
                      View Celebration Guide 🪔
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Festival Detail Modal */}
      {selectedFestival && (
        <Modal
          isOpen={!!selectedFestival}
          onClose={() => setSelectedFestival(null)}
          title={selectedFestival.name}
        >
          <div className={styles.modalContent}>
            <img
              src={selectedFestival.image}
              alt={selectedFestival.name}
              className={styles.modalHeroImage}
            />
            <div className={styles.modalMetaRow}>
              <Badge variant="gold">{selectedFestival.dates}</Badge>
              <span className={styles.modalLocation}>📍 {selectedFestival.location}</span>
            </div>

            <div className={styles.modalSection}>
              <h4 className={styles.modalSectionTitle}>Historical & Cultural Significance</h4>
              <p className={styles.modalText}>{selectedFestival.significance}</p>
            </div>

            <div className={styles.modalSection}>
              <h4 className={styles.modalSectionTitle}>Detailed Overview</h4>
              <p className={styles.modalText}>{selectedFestival.description}</p>
            </div>

            <div className={styles.modalSection}>
              <h4 className={styles.modalSectionTitle}>Key Highlights to Experience</h4>
              <ul className={styles.modalList}>
                {selectedFestival.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div className={styles.modalSection}>
              <h4 className={styles.modalSectionTitle}>Traveler & Photography Guidelines</h4>
              <p className={styles.modalText}>
                During peak festive dates, advance hotel reservations in Pune, Mumbai, or Pandharpur are highly recommended. Respect local prayer customs and obtain permission before taking close-up portraits during religious rites.
              </p>
            </div>

            <div className={styles.modalFooter}>
              <Button variant="primary" onClick={() => setSelectedFestival(null)}>
                Close Celebration Guide
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
