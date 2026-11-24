import React, { useEffect, useState } from 'react';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import {
  Castle,
  Landmark,
  Umbrella,
  BookOpen,
  Play,
  ExternalLink,
  MapPin,
  Clock
} from '../components/common/Icons';
import { CURATED_VIDEOS } from '../data/videos';
import { videoService } from '../services/videoService';
import { useLanguage } from '../context/LanguageContext';
import styles from './VideosPage.module.css';

export default function VideosPage() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [videos, setVideos] = useState(() => CURATED_VIDEOS);
  const localizedVideo = (video, field) => video[`${field}${language === 'mr' ? 'Mr' : language === 'hi' ? 'Hi' : ''}`] || video[field] || '';

  useEffect(() => {
    let isMounted = true;

    videoService.getAllVideos()
      .then((records) => {
        if (isMounted && Array.isArray(records)) {
          setVideos(records.filter(video => video.isActive !== false));
        }
      })
      .catch((error) => {
        console.error('Unable to load managed YouTube videos:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredVideos = (activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory)
  ).filter(video => video.isActive !== false);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'forts': return <Castle size={14} />;
      case 'temples': return <Landmark size={14} />;
      case 'beaches': return <Umbrella size={14} />;
      case 'heritage': return <BookOpen size={14} />;
      default: return null;
    }
  };

  return (
    <div className={styles.videosPage}>
      {/* Header Banner */}
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>
              {language === 'mr' ? 'दृकश्राव्य अनुभव आणि माहितीपट' : language === 'hi' ? 'दृश्य अनुभव एवं वृत्तचित्र' : 'VISUAL JOURNEYS & DOCUMENTARIES'}
            </span>
            <h1 className={styles.heroTitle}>{t('videosTitle', 'Videos & Experiences')}</h1>
            <p className={styles.heroSubtitle}>
              {t('videosSub', 'Immerse yourself in authentic destination travel films, drone surveys, and cultural documentaries. In accordance with platform standards, all original videos open directly on YouTube in external browser tabs.')}
            </p>

            <div className={styles.filterPills}>
              {[
                { id: 'all', label: t('allVideos', 'All Experiences') },
                { id: 'forts', label: t('forts', 'Historic Forts'), icon: Castle },
                { id: 'temples', label: t('temples', 'Sacred Temples'), icon: Landmark },
                { id: 'beaches', label: t('beaches', 'Konkan Coast'), icon: Umbrella },
                { id: 'heritage', label: t('heritage', 'UNESCO Caves'), icon: BookOpen }
              ].map(tab => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`${styles.filterBtn} ${activeCategory === tab.id ? styles.activeFilter : ''}`}
                    onClick={() => setActiveCategory(tab.id)}
                  >
                    {TabIcon && <TabIcon size={14} />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Videos Grid */}
      <section className={styles.gridSection}>
        <Container>
          <div className={styles.gridHeader}>
            <h2 className={styles.sectionHeading}>
              {language === 'mr' ? 'निवडक व्हिडिओ निर्देशिका' : language === 'hi' ? 'विशेष चयनित वीडियो संग्रह' : 'Curated YouTube Directory'}
            </h2>
            <span className={styles.countBadge}>
              {filteredVideos.length} {language === 'mr' ? 'व्हिडिओ उपलब्ध' : language === 'hi' ? 'वीडियो उपलब्ध' : 'Documentaries Available'}
            </span>
          </div>

          <div className={styles.videosGrid}>
            {filteredVideos.map(video => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.thumbnailWrapper}>
                  <img
                    src={video.thumbnail}
                    alt={localizedVideo(video, 'title')}
                    className={styles.thumbnail}
                    loading="lazy"
                  />
                  <div className={styles.playIconOverlay}>
                    <Play size={20} color="#FFFFFF" style={{ fill: '#FFFFFF', marginLeft: '2px' }} />
                  </div>
                  <span className={styles.duration}>
                    <Clock size={11} /> {video.duration || 'Video'}
                  </span>
                  <div className={styles.categoryBadge}>
                    <Badge variant={video.category} size="sm">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        {getCategoryIcon(video.category)}
                        {t(video.category, (video.category || 'video').toUpperCase())}
                      </span>
                    </Badge>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.metaRow}>
                    <span className={styles.location}>
                      <MapPin size={12} color="var(--color-secondary)" /> {localizedVideo(video, 'destination') || t('brandSubtitle', 'Maharashtra')}{video.district ? ` (${video.district})` : ''}
                    </span>
                    <span className={styles.creator}>{video.creator || 'AAGMAN'}</span>
                  </div>

                  <h3 className={styles.videoTitle}>{localizedVideo(video, 'title')}</h3>
                  <p className={styles.videoSummary}>{localizedVideo(video, 'summary') || video.description || ''}</p>

                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.watchBtn}
                    title="Watch full documentary on YouTube"
                  >
                    <span>{t('watchNow', 'Watch on YouTube')}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
