import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import { Castle, Landmark, Umbrella, BookOpen, Heart, MapPin, Star } from './Icons';
import { useWishlist } from '../../context/WishlistContext';
import styles from './DestinationCard.module.css';

export default function DestinationCard({ destination }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(destination.slug);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(destination.slug);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'forts':
        return <Castle size={13} />;
      case 'temples':
        return <Landmark size={13} />;
      case 'beaches':
        return <Umbrella size={13} />;
      case 'heritage':
        return <BookOpen size={13} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/${destination.category}/${destination.slug}`} className={styles.imageWrapper}>
        <img
          src={destination.thumbnail || destination.heroImage}
          alt={destination.name}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            const fallback = destination.heroImage || destination.thumbnail;
            if (fallback && e.currentTarget.src !== fallback) {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallback;
            }
          }}
        />
        <div className={styles.topBadges}>
          <Badge variant={destination.category} size="sm">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              {getCategoryIcon(destination.category)}
              {destination.category.toUpperCase()}
            </span>
          </Badge>
          <button
            type="button"
            className={`${styles.wishlistBtn} ${wishlisted ? styles.activeWishlist : ''}`}
            onClick={handleWishlistClick}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={16}
              color={wishlisted ? "var(--color-highlight)" : "currentColor"}
              style={{ fill: wishlisted ? "var(--color-highlight)" : "none" }}
            />
          </button>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.district} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={12} color="var(--color-secondary)" /> {destination.district}, {destination.region}
          </span>
          <span className={styles.rating} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star size={12} color="var(--color-accent)" style={{ fill: 'var(--color-accent)' }} /> {destination.rating || '4.8'}
          </span>
        </div>

        <Link to={`/${destination.category}/${destination.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{destination.name}</h3>
        </Link>
        {destination.marathiName && (
          <p className={styles.marathiName}>{destination.marathiName}</p>
        )}

        <p className={styles.summary}>{destination.summary}</p>

        <div className={styles.footerRow}>
          <span className={styles.tag}>
            {destination.elevation || destination.timings || destination.circuit || 'Historic Site'}
          </span>
          <Link to={`/${destination.category}/${destination.slug}`} className={styles.viewLink}>
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
}
