import React, { useState, useMemo } from 'react';
import Container from '../components/layout/Container';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import SearchInput from '../components/common/SearchInput';
import { FESTIVALS } from '../data/festivals';
import { getFestivalGallery } from '../data/imageRegistry';
import { videoService } from '../services/videoService';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Check, Sparkles, ExternalLink } from '../components/common/Icons';
import styles from './FestivalsPage.module.css';
import { getLocalizedName, getLocalizedValue } from '../utils/localizedContent';

export default function FestivalsPage() {
  const { language, t } = useLanguage();
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
                        {festival.highlights.map((h, i) => (
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
                  {selectedFestival.highlights.map((h, i) => (
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

              {/* Festival Video Embed */}
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>{t('videoDocumentaries', 'Celebration Documentary')}</h4>
                <div className={styles.videoEmbedWrapper}>
                  <iframe
                    src={videoService.getEmbedUrl(selectedFestival.id, 'festival')}
                    title={`${selectedFestival.name} Video`}
                    className={styles.videoIframe}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
