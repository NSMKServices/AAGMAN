import React, { useState, useMemo, useEffect } from 'react';
import Container from '../components/layout/Container';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import SearchInput from '../components/common/SearchInput';
import { contentService } from '../services/contentService';
import { videoService } from '../services/videoService';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Check, Sparkles, ExternalLink } from '../components/common/Icons';
import styles from './FestivalsPage.module.css';
import { getLocalizedName, getLocalizedValue } from '../utils/localizedContent';

export default function FestivalsPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [festivals, setFestivals] = useState([]);\n  const [, setVideoCatalog] = useState([]);

  useEffect(() => {
    const unsubscribe = contentService.subscribe(({ festivals: records }) => setFestivals(records));
    contentService.getAllFestivals();
    return unsubscribe;
  }, []);

  useEffect(() => {
    let mounted = true;
    videoService.getAllVideos()
      .then(records => { if (mounted) setVideoCatalog(records); })
      .catch(error => console.error('Unable to load festival videos:', error));
    return () => { mounted = false; };
  }, []);

  const [selectedFestival, setSelectedFestival] = useState(null);
  const festivalVideoUrl = selectedFestival
    ? videoService.getEmbedUrl(selectedFestival.id, 'festival', selectedFestival.name)
    : null;

  const festivalGallery = selectedFestival && Array.isArray(selectedFestival.gallery) ? selectedFestival.gallery : [];

  const filteredFestivals = useMemo(() => {
    return festivals.filter(f => {
      if (f.status !== 'published') return false;
      const matchSearch = !searchQuery.trim() ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.marathiName && f.marathiName.includes(searchQuery)) ||
        (f.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [festivals, searchQuery]);

  return (
    <div className={styles.festivalsPage}>
      {/* Header Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {language === 'mr' ? 'उत्सव आणि सण परंपरा' : language === 'hi' ? 'त्योहार एवं सांस्कृतिक परंपरा' : 'CULTURAL CELEBRATIONS'}
            </span>
            <h1 className={styles.heroTitle}>{t('festivalsTitle', 'Maharashtra Festivals & Cultural Celebrations')}</h1>
            <p className={styles.heroSubtitle}>
              {t('festivalsSub', 'Experience the thunderous beats of Puneri Dhol-Tasha during Ganeshotsav, torchlight processions on Shivneri, the timeless Pandharpur Wari, and classical symphonies before ancient rock-cut caves.')}
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
              placeholder={t('searchFestivals', 'Search festivals by name, location, or tradition (e.g. Pune, Wari, Modak)...')}
            />
          </div>
        </Container>
      </section>

      {/* Festivals Grid */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.resultsInfo}>
            <span className={styles.countText}>
              {t('showingResults', 'Showing')} <strong>{filteredFestivals.length}</strong> {t('authenticCelebrations', 'authentic cultural celebrations')}
            </span>
          </div>

          {filteredFestivals.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)' }}>
              {festivals.length === 0
                ? 'No festivals published yet. Add and publish festivals in the admin dashboard to display them here.'
                : 'No festivals match your search.'}
            </p>
          ) : (
            <div className={styles.festivalsGrid}>
            {filteredFestivals.map((festival) => {
              const displayName = getLocalizedName(festival, language);
              const hasHindiName = Boolean(festival.nameHi || festival.hindiName);
              const subName = language === 'mr'
                ? festival.name
                : language === 'hi'
                  ? (hasHindiName ? festival.name : festival.marathiName)
                  : festival.marathiName;

              return (
                <div key={festival.id} className={styles.festivalCard}>
                  <div className={styles.cardMedia}>
                    <img
                      src={festival.image}
                      alt={displayName}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <div className={styles.cardDates}>
                      <span>
                        <Calendar size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {getLocalizedValue(festival, 'dates', language)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.festivalName}>{displayName}</h3>
                      {subName && (
                        <span className={styles.marathiName}>{subName}</span>
                      )}
                    </div>

                    <p className={styles.locationTag}>
                      <MapPin size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      {getLocalizedValue(festival, 'location', language)}
                    </p>
                    <p className={styles.description}>{getLocalizedValue(festival, 'description', language)}</p>

                    <div className={styles.highlightsContainer}>
                      <span className={styles.highlightsTitle}>{t('culturalHighlights', 'Cultural Highlights')}:</span>
                      <div className={styles.highlightChips}>
                        {(festival.highlights || []).map((h, i) => (
                          <span key={i} className={styles.chip}>
                            <Check size={12} style={{ marginRight: 4 }} />
                            {getLocalizedValue(festival, 'highlights', language)[i] ?? h}
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
                        {t('viewCelebrationGuide', 'View Celebration Guide')}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </Container>
      </section>

      {/* Detailed Festival Modal */}
      {selectedFestival && (
        <Modal
          isOpen={!!selectedFestival}
          onClose={() => setSelectedFestival(null)}
          title={getLocalizedName(selectedFestival, language)}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHero}>
              <img
                src={selectedFestival.image}
                alt={selectedFestival.name}
                className={styles.modalHeroImg}
              />
              <div className={styles.modalHeroBadge}>
                <Badge variant="gold">
                  {getLocalizedValue(selectedFestival, 'dates', language)}
                </Badge>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalMetaRow}>
                <span className={styles.modalLocation}>
                  <MapPin size={14} style={{ marginRight: 4, verticalAlign: 'middle', color: 'var(--color-primary)' }} />
                  {getLocalizedValue(selectedFestival, 'location', language)}
                </span>
                <span className={styles.modalDuration}>
                  <Calendar size={14} style={{ marginRight: 4, verticalAlign: 'middle', color: 'var(--color-secondary)' }} />
                  {getLocalizedValue(selectedFestival, 'dates', language)}
                </span>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>{t('historicalSignificance', 'Cultural Significance & Legend')}</h4>
                <p className={styles.modalText}>{getLocalizedValue(selectedFestival, 'significance', language) || getLocalizedValue(selectedFestival, 'description', language)}</p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>{t('ritualsTraditions', 'Key Rituals & Traditions')}</h4>
                <div className={styles.modalGrid2}>
                  {(selectedFestival.highlights || []).map((h, i) => (
                    <div key={i} className={styles.modalHighlightCard}>
                      <span className={styles.modalHighlightNum}>{i + 1}</span>
                      <p className={styles.modalHighlightText}>{getLocalizedValue(selectedFestival, 'highlights', language)[i] ?? h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedFestival.foodSpecialties && (
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>{t('culinaryTraditions', 'Culinary Specialties')}</h4>
                  <div className={styles.modalFoodBox}>
                    <p>{getLocalizedValue(selectedFestival, 'foodSpecialties', language)}</p>
                  </div>
                </div>
              )}

              {/* Show a documentary only when an active, linked YouTube record exists. */}
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>{t('videoDocumentaries', 'Celebration Documentary')}</h4>
                {festivalVideoUrl ? (
                  <div className={styles.videoEmbedWrapper}>
                    <iframe
                      src={festivalVideoUrl}
                      title={`${selectedFestival.name} Video`}
                      className={styles.videoIframe}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <p className={styles.modalText}>
                    {t('noFestivalVideo', 'No documentary has been added for this festival yet.')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
