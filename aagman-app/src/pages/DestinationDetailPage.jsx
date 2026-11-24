import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import DestinationCard from '../components/common/DestinationCard';
import { DESTINATIONS } from '../data/destinations';
import { getDestinationGallery } from '../data/imageRegistry';
import { videoService } from '../services/videoService';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  MapPin,
  Star,
  Heart,
  Sparkles,
  Utensils,
  Clock,
  Ticket,
  Sun,
  Mountain,
  Plane,
  Train,
  Car,
  ExternalLink,
  ArrowRight
} from '../components/common/Icons';
import styles from './DestinationDetailPage.module.css';

export default function DestinationDetailPage() {
  const { category, slug } = useParams();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { language, t } = useLanguage();
  const [destinationVideos, setDestinationVideos] = useState([]);

  const destination = DESTINATIONS.find(
    d => d.slug === slug || (category && d.category === category && d.slug === slug)
  );

  useEffect(() => {
    let isMounted = true;

    if (!destination) {
      setDestinationVideos([]);
      return () => { isMounted = false; };
    }

    const refreshDestinationVideos = () => {
      if (isMounted) {
        setDestinationVideos(
          videoService.getVideosForDestination(destination.id || destination.slug, destination.name)
        );
      }
    };

    refreshDestinationVideos();
    videoService.getAllVideos()
      .then(refreshDestinationVideos)
      .catch(error => console.error('Unable to load destination YouTube links:', error));

    return () => {
      isMounted = false;
    };
  }, [destination?.id, destination?.slug, destination?.name]);

  if (!destination) {
    return (
      <Container className={styles.notFoundWrapper}>
        <span className={styles.largeIcon}>
          <Compass size={48} />
        </span>
        <h2 className={styles.notFoundTitle}>{t('destinationNotFound', 'Destination Not Found')}</h2>
        <p className={styles.notFoundSub}>{t('destinationNotFoundSub', 'The requested destination could not be located in the Aagman catalog.')}</p>
        <Button to="/explore" variant="primary">{t('returnExplorer', 'Return to Destination Explorer')}</Button>
      </Container>
    );
  }

  const wishlisted = isWishlisted(destination.slug);
  const galleryImages = getDestinationGallery(destination.id || destination.slug);
  const relatedDestinations = DESTINATIONS
    .filter(d => d.category === destination.category && d.slug !== destination.slug)
    .slice(0, 3);

  const displayName = language === 'mr'
    ? (destination.marathiName || destination.name)
    : destination.name;

  const subtitleName = language === 'mr'
    ? destination.name
    : destination.marathiName;

  return (
    <div className={styles.detailPage}>
      {/* Hero Visual Section */}
      <section className={styles.heroSection}>
        <img
          src={destination.heroImage}
          alt={displayName}
          className={styles.heroBg}
          onError={(e) => {
            const fallback = destination.thumbnail;
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallback;
            }
          }}
        />
        <div className={styles.heroOverlay} />

        <Container className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link to="/">{t('home', 'Home')}</Link>
            <span>/</span>
            <Link to={`/explore?category=${destination.category}`}>
              {t(destination.category, destination.category.toUpperCase())}
            </Link>
            <span>/</span>
            <span className={styles.currentBreadcrumb}>{displayName}</span>
          </div>

          <div className={styles.badgeRow}>
            <Badge variant={destination.category} size="lg">
              {t(destination.category, destination.category.toUpperCase())}
            </Badge>
            <span className={styles.districtBadge}>
              <MapPin size={14} style={{ marginRight: 4 }} />
              {destination.district} {t('districtName', 'District')}, {destination.region}
            </span>
            <span className={styles.ratingBadge}>
              <Star size={14} style={{ marginRight: 4 }} fill="var(--color-gold)" color="var(--color-gold)" />
              {destination.rating} ({destination.reviewsCount} {t('reviews', 'reviews')})
            </span>
          </div>

          <h1 className={styles.heroTitle}>{displayName}</h1>
          {subtitleName && (
            <p className={styles.heroMarathi}>{subtitleName}</p>
          )}

          <div className={styles.heroActions}>
            <Button
              variant={wishlisted ? "secondary" : "primary"}
              onClick={() => toggleWishlist(destination.slug)}
              icon={
                <Heart
                  size={16}
                  fill={wishlisted ? "currentColor" : "none"}
                />
              }
            >
              {wishlisted ? t('removeFromWishlist', 'Saved in Wishlist') : t('addToWishlist', 'Add to Wishlist')}
            </Button>
            <Button
              to="/planner"
              variant="accent"
              icon={<Sparkles size={16} />}
            >
              {t('includeInJourneyPlan', 'Include in Journey Plan')}
            </Button>
          </div>
        </Container>
      </section>

      {/* Main Content Layout */}
      <section className={styles.bodySection}>
        <Container>
          <div className={styles.gridContainer}>
            {/* Left Column: Historical Narrative & Attractions */}
            <div className={styles.mainColumn}>
              <div className={styles.contentBlock}>
                <h2 className={styles.sectionHeading}>{t('historicalSignificance', 'Historical Chronicle & Significance')}</h2>
                <div className={styles.heritageDivider} />
                <p className={styles.narrativeText}>{destination.history}</p>
                <p className={styles.narrativeText}>{destination.summary}</p>
              </div>

              {/* Major Attractions */}
              {destination.attractions && destination.attractions.length > 0 && (
                <div className={styles.contentBlock}>
                  <h3 className={styles.sectionSubheading}>{t('majorLandmarks', 'Major Landmarks & Highlights')}</h3>
                  <div className={styles.attractionsGrid}>
                    {destination.attractions.map((att, idx) => (
                      <div key={idx} className={styles.attractionItem}>
                        <span className={styles.attractionNum}>{idx + 1}</span>
                        <span className={styles.attractionText}>{att}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Destination Photo Gallery */}
              {galleryImages && galleryImages.length > 0 && (
                <div className={styles.contentBlock}>
                  <h3 className={styles.sectionSubheading}>{t('visualGallery', 'Visual Perspectives & Gallery')}</h3>
                  <div className={styles.galleryGrid}>
                    {galleryImages.map((imgObj, idx) => (
                      <div key={idx} className={styles.galleryItem}>
                        <img
                          src={imgObj.src}
                          alt={imgObj.caption || `${displayName} view`}
                          className={styles.galleryImg}
                          loading="lazy"
                        />
                        <span className={styles.galleryCaption}>{imgObj.caption}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related YouTube documentaries */}
              {destinationVideos.length > 0 && (
                <div className={styles.contentBlock}>
                  <h3 className={styles.sectionSubheading}>{t('videoDocumentaries', 'Video Documentaries & Aerial Exploration')}</h3>
                  <div className={styles.videoEmbedWrapper}>
                    {destinationVideos.map(video => (
                      <a
                        key={video.id}
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.videoIframe}
                      >
                        {t('watchNow', 'Watch on YouTube')}: {video.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Cultural Food & Cuisine Specialties */}
              {destination.foodSpecialties && destination.foodSpecialties.length > 0 && (
                <div className={styles.contentBlock}>
                  <h3 className={styles.sectionSubheading}>
                    <Utensils size={18} style={{ marginRight: 6, verticalAlign: 'middle', color: 'var(--color-primary)' }} />
                    {t('cuisineGastronomy', 'Cultural Cuisine & Gastronomy')}
                  </h3>
                  <div className={styles.foodGrid}>
                    {destination.foodSpecialties.map((dish, idx) => (
                      <div key={idx} className={styles.foodCard}>
                        <h4 className={styles.dishName}>{dish.name}</h4>
                        <p className={styles.dishDesc}>{dish.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Travel Metadata, Coordinates & Logistics */}
            <aside className={styles.sideColumn}>
              <div className={styles.metaCard}>
                <h3 className={styles.metaCardTitle}>{t('travelCoordinates', 'Essential Travel Coordinates')}</h3>

                <div className={styles.metaList}>
                  <div className={styles.metaListItem}>
                    <span className={styles.metaIcon}><Clock size={16} /></span>
                    <div>
                      <strong className={styles.metaItemLabel}>{t('timingsAccess', 'Timings & Access')}:</strong>
                      <p className={styles.metaItemVal}>{destination.timings || 'Sunrise to Sunset'}</p>
                    </div>
                  </div>

                  <div className={styles.metaListItem}>
                    <span className={styles.metaIcon}><Ticket size={16} /></span>
                    <div>
                      <strong className={styles.metaItemLabel}>{t('entryTariffs', 'Entry Tariffs')}:</strong>
                      <p className={styles.metaItemVal}>{destination.entryFee || 'Free Entry / Archaeological Survey of India'}</p>
                    </div>
                  </div>

                  <div className={styles.metaListItem}>
                    <span className={styles.metaIcon}><Sun size={16} /></span>
                    <div>
                      <strong className={styles.metaItemLabel}>{t('idealSeason', 'Ideal Season')}:</strong>
                      <p className={styles.metaItemVal}>{destination.bestTime}</p>
                    </div>
                  </div>

                  {destination.elevation && (
                    <div className={styles.metaListItem}>
                      <span className={styles.metaIcon}><Mountain size={16} /></span>
                      <div>
                        <strong className={styles.metaItemLabel}>{t('elevationTopography', 'Elevation / Topography')}:</strong>
                        <p className={styles.metaItemVal}>{destination.elevation}</p>
                      </div>
                    </div>
                  )}

                  {destination.difficulty && (
                    <div className={styles.metaListItem}>
                      <span className={styles.metaIcon}><Compass size={16} /></span>
                      <div>
                        <strong className={styles.metaItemLabel}>{t('expeditionDifficulty', 'Expedition Difficulty')}:</strong>
                        <p className={styles.metaItemVal}>{destination.difficulty}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Transit Directions */}
              {destination.howToReach && (
                <div className={styles.metaCard}>
                  <h3 className={styles.metaCardTitle}>{t('howToReach', 'How to Reach & Transit Guidance')}</h3>
                  <div className={styles.reachList}>
                    {destination.howToReach.air && (
                      <div className={styles.reachItem}>
                        <Plane size={15} color="var(--color-primary)" />
                        <div>
                          <strong>{t('byAir', 'By Air')}:</strong>
                          <p>{destination.howToReach.air}</p>
                        </div>
                      </div>
                    )}
                    {destination.howToReach.rail && (
                      <div className={styles.reachItem}>
                        <Train size={15} color="var(--color-primary)" />
                        <div>
                          <strong>{t('byRail', 'By Rail')}:</strong>
                          <p>{destination.howToReach.rail}</p>
                        </div>
                      </div>
                    )}
                    {destination.howToReach.road && (
                      <div className={styles.reachItem}>
                        <Car size={15} color="var(--color-primary)" />
                        <div>
                          <strong>{t('byRoad', 'By Road')}:</strong>
                          <p>{destination.howToReach.road}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Practical Tips */}
              {destination.tips && destination.tips.length > 0 && (
                <div className={styles.metaCard}>
                  <h3 className={styles.metaCardTitle}>{t('travelTipsTitle', 'Traveler Tips & Guidelines')}</h3>
                  <ul className={styles.tipsList}>
                    {destination.tips.map((tip, idx) => (
                      <li key={idx} className={styles.tipItem}>
                        <span>•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>

          {/* Related Regional Circuits */}
          {relatedDestinations.length > 0 && (
            <div className={styles.relatedSection}>
              <div className={styles.relatedHeader}>
                <span className={styles.relatedEyebrow}>{t('circuits', 'SIGNATURE CIRCUITS')}</span>
                <h3 className={styles.relatedTitle}>{t('nearbyAttractions', 'Nearby Circuit Attractions')}</h3>
              </div>
              <div className={styles.relatedGrid}>
                {relatedDestinations.map(d => (
                  <DestinationCard key={d.id} destination={d} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
