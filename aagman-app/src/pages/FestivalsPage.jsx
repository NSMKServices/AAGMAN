import React, { useState, useMemo } from 'react';
import Container from '../components/layout/Container';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import SearchInput from '../components/common/SearchInput';
import { FESTIVALS } from '../data/festivals';
import { getFestivalGallery } from '../data/imageRegistry';
import { videoService } from '../services/videoService';
import { Calendar, MapPin, Check, Sparkles, ExternalLink } from '../components/common/Icons';
import styles from './FestivalsPage.module.css';

export default function FestivalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFestival, setSelectedFestival] = useState(null);

  const festivalGallery = selectedFestival ? getFestivalGallery(selectedFestival.id) : [];

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
                    <span>
                      <Calendar size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      {festival.dates}
                    </span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.festivalName}>{festival.name}</h3>
                    {festival.marathiName && (
                      <span className={styles.marathiName}>{festival.marathiName}</span>
                    )}
                  </div>

                  <p className={styles.locationTag}>
                    <MapPin size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    {festival.location}
                  </p>
                  <p className={styles.description}>{festival.description}</p>

                  <div className={styles.highlightsContainer}>
                    <span className={styles.highlightsTitle}>Cultural Highlights:</span>
                    <div className={styles.highlightChips}>
                      {festival.highlights.map((h, i) => (
                        <span key={i} className={styles.chip}>
                          <Check size={12} style={{ marginRight: 4 }} />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedFestival(festival)}
                      icon={<Sparkles size={14} />}
                    >
                      View Celebration Guide
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
              <span className={styles.modalLocation}>
                <MapPin size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {selectedFestival.location}
              </span>
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

            {/* Festival Photographic Perspectives Gallery */}
            {festivalGallery && festivalGallery.length > 0 && (
              <div className={styles.modalSection}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <h4 className={styles.modalSectionTitle} style={{ margin: 0 }}>Celebration Perspectives & Gallery</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', background: 'var(--color-parchment)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--color-border)' }}>
                    <code>/assets/festivals/{selectedFestival.id}/</code>
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {festivalGallery.map((img, idx) => (
                    <div key={idx} style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                      <div style={{ position: 'relative', width: '100%', height: '115px' }}>
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
                        <span style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(40, 20, 15, 0.85)', color: 'var(--color-accent)', fontSize: '0.6rem', padding: '1px 5px', borderRadius: '3px', fontFamily: 'monospace' }}>
                          {img.slot}.jpg
                        </span>
                      </div>
                      <span style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, padding: '0.35rem 0.5rem', color: 'var(--color-primary)' }}>
                        {img.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Festival Videos */}
            {(() => {
              const fVideos = videoService.getVideosForFestival(selectedFestival.id, selectedFestival.name);
              if (fVideos.length === 0) return null;

              return (
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Official Festival Documentaries & Footage</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {fVideos.map(vid => (
                      <a
                        key={vid.id}
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '0.65rem 0.85rem',
                          background: 'var(--color-surface, #FFF9F0)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                      >
                        <img src={vid.thumbnail} alt={vid.title} style={{ width: 84, height: 52, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: '0.875rem', color: 'var(--color-heading)', display: 'block' }}>{vid.title}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-maroon, #541D16)', fontWeight: 600 }}>
                            Watch on YouTube (External Tab) ↗
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}

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
