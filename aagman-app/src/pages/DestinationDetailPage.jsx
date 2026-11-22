import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import DestinationCard from '../components/common/DestinationCard';
import { DESTINATIONS } from '../data/destinations';
import { useWishlist } from '../context/WishlistContext';
import styles from './DestinationDetailPage.module.css';

export default function DestinationDetailPage() {
  const { category, slug } = useParams();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const destination = DESTINATIONS.find(
    d => d.slug === slug || (category && d.category === category && d.slug === slug)
  );

  if (!destination) {
    return (
      <Container className={styles.notFoundWrapper}>
        <span className={styles.largeIcon}>🏛️</span>
        <h2 className={styles.notFoundTitle}>Destination Not Found</h2>
        <p className={styles.notFoundSub}>The requested destination could not be located in the Aagman catalog.</p>
        <Button to="/explore" variant="primary">Return to Destination Explorer</Button>
      </Container>
    );
  }

  const wishlisted = isWishlisted(destination.slug);
  const relatedDestinations = DESTINATIONS
    .filter(d => d.category === destination.category && d.slug !== destination.slug)
    .slice(0, 3);

  return (
    <div className={styles.detailPage}>
      {/* Hero Visual Section */}
      <section className={styles.heroSection}>
        <img
          src={destination.heroImage}
          alt={destination.name}
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />

        <Container className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={`/explore?category=${destination.category}`}>{destination.category.toUpperCase()}</Link>
            <span>/</span>
            <span className={styles.currentBreadcrumb}>{destination.name}</span>
          </div>

          <div className={styles.badgeRow}>
            <Badge variant={destination.category} size="lg">
              {destination.category.toUpperCase()}
            </Badge>
            <span className={styles.districtBadge}>📍 {destination.district} District, {destination.region}</span>
            <span className={styles.ratingBadge}>⭐ {destination.rating} ({destination.reviewsCount} reviews)</span>
          </div>

          <h1 className={styles.heroTitle}>{destination.name}</h1>
          {destination.marathiName && (
            <p className={styles.heroMarathi}>{destination.marathiName}</p>
          )}

          <div className={styles.heroActions}>
            <Button
              variant={wishlisted ? "secondary" : "primary"}
              onClick={() => toggleWishlist(destination.slug)}
              icon={wishlisted ? "❤️" : "🤍"}
            >
              {wishlisted ? "Saved in Wishlist" : "Add to Wishlist"}
            </Button>
            <Button to="/planner" variant="accent" icon="✨">
              Include in AI Trip Plan
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
                <h2 className={styles.sectionHeading}>Historical Chronicle & Significance</h2>
                <div className={styles.heritageDivider} />
                <p className={styles.narrativeText}>{destination.history}</p>
                <p className={styles.narrativeText}>{destination.summary}</p>
              </div>

              {/* Major Attractions */}
              {destination.attractions && destination.attractions.length > 0 && (
                <div className={styles.contentBlock}>
                  <h3 className={styles.sectionSubheading}>Major Landmarks & Highlights</h3>
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

              {/* Local Food & Cultural Delights */}
              {destination.localCuisine && (
                <div className={styles.cuisineBox}>
                  <span className={styles.cuisineIcon}>🍛</span>
                  <div>
                    <h4 className={styles.cuisineTitle}>Local Maharashtrian Culinary Specialties</h4>
                    <p className={styles.cuisineText}>{destination.localCuisine}</p>
                  </div>
                </div>
              )}

              {/* Google Maps Geographic Embed */}
              <div className={styles.contentBlock}>
                <h3 className={styles.sectionSubheading}>Geographical Coordinates & Route</h3>
                <div className={styles.mapCard}>
                  <div className={styles.coordinatesHeader}>
                    <span>GPS: {destination.coordinates.lat}° N, {destination.coordinates.lng}° E</span>
                    <a
                      href={destination.coordinates.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapsExternalLink}
                    >
                      Open in Google Maps ↗
                    </a>
                  </div>
                  <iframe
                    title={`Map location for ${destination.name}`}
                    src={`https://maps.google.com/maps?q=${destination.coordinates.lat},${destination.coordinates.lng}&z=13&output=embed`}
                    className={styles.mapIframe}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Essential Visitor Guidelines */}
            <div className={styles.sideColumn}>
              <div className={styles.visitorCard}>
                <h3 className={styles.visitorCardTitle}>Essential Visitor Guidelines</h3>

                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>⏱️</span>
                  <div>
                    <span className={styles.infoLabel}>Timings</span>
                    <span className={styles.infoValue}>{destination.timings}</span>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>🎟️</span>
                  <div>
                    <span className={styles.infoLabel}>Entry Fee</span>
                    <span className={styles.infoValue}>{destination.entryFee}</span>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>⛅</span>
                  <div>
                    <span className={styles.infoLabel}>Best Season</span>
                    <span className={styles.infoValue}>{destination.bestTime}</span>
                  </div>
                </div>

                {destination.elevation && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoIcon}>⛰️</span>
                    <div>
                      <span className={styles.infoLabel}>Elevation</span>
                      <span className={styles.infoValue}>{destination.elevation}</span>
                    </div>
                  </div>
                )}

                {destination.difficulty && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoIcon}>🥾</span>
                    <div>
                      <span className={styles.infoLabel}>Trek Difficulty</span>
                      <span className={styles.infoValue}>{destination.difficulty}</span>
                    </div>
                  </div>
                )}

                <div className={styles.travelHowTo}>
                  <h4 className={styles.howToTitle}>How to Reach</h4>
                  <div className={styles.howToItem}>
                    <strong>✈️ By Air:</strong> {destination.howToReach.air}
                  </div>
                  <div className={styles.howToItem}>
                    <strong>🚆 By Rail:</strong> {destination.howToReach.rail}
                  </div>
                  <div className={styles.howToItem}>
                    <strong>🚗 By Road:</strong> {destination.howToReach.road}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Destinations */}
          {relatedDestinations.length > 0 && (
            <div className={styles.relatedSection}>
              <div className={styles.relatedHeader}>
                <h3 className={styles.relatedTitle}>More in {destination.category.toUpperCase()}</h3>
                <Link to={`/explore?category=${destination.category}`} className={styles.relatedLink}>
                  View All {destination.category} →
                </Link>
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
