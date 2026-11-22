import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
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

  const categoryIcons = {
    forts: "🏰",
    temples: "🛕",
    beaches: "🏖️",
    heritage: "🏛️"
  };

  return (
    <div className={styles.card}>
      <Link to={`/${destination.category}/${destination.slug}`} className={styles.imageWrapper}>
        <img
          src={destination.thumbnail || destination.heroImage}
          alt={destination.name}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.topBadges}>
          <Badge variant={destination.category} size="sm" icon={categoryIcons[destination.category]}>
            {destination.category.toUpperCase()}
          </Badge>
          <button
            type="button"
            className={`${styles.wishlistBtn} ${wishlisted ? styles.activeWishlist : ''}`}
            onClick={handleWishlistClick}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlisted ? '❤️' : '🤍'}
          </button>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.district}>📍 {destination.district}, {destination.region}</span>
          <span className={styles.rating}>⭐ {destination.rating || '4.8'}</span>
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
