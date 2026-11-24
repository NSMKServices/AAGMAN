import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import { Castle, Landmark, Umbrella, BookOpen, Heart, MapPin, Star } from './Icons';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './DestinationCard.module.css';
import { getLocalizedName, getLocalizedValue } from '../../utils/localizedContent';

export default function DestinationCard({ destination }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { language, t } = useLanguage();
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

  const displayName = getLocalizedName(destination, language);
  const subtitleName = language === 'en'
    ? destination.marathiName
    : language === 'mr'
      ? destination.name
      : destination.name;

  return (
    <div className={styles.card}>
      <Link to={`/${destination.category}/${destination.slug}`} className={styles.imageWrapper}>
        <img
          src={destination.thumbnail || destination.heroImage}
          alt={displayName}
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
              {t(destination.category, destination.category.toUpperCase())}
            </span>
          </Badge>
          <button
            type="button"
            className={`${styles.wishlistBtn} ${wishlisted ? styles.activeWishlist : ''}`}
            onClick={handleWishlistClick}
            aria-label={wishlisted ? t('removeFromWishlist', 'Remove from wishlist') : t('addToWishlist', 'Add to wishlist')}
            title={wishlisted ? t('removeFromWishlist', 'Remove from wishlist') : t('addToWishlist', 'Add to wishlist')}
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
          <h3 className={styles.title}>{displayName}</h3>
        </Link>
        {subtitleName && (
          <p className={styles.marathiName}>{subtitleName}</p>
        )}

        <p className={styles.summary}>{getLocalizedValue(destination, 'summary', language)}</p>

        <div className={styles.footerRow}>
          <span className={styles.tag}>
            {destination.elevation || destination.timings || destination.circuit || 'Historic Site'}
          </span>
          <Link to={`/${destination.category}/${destination.slug}`} className={styles.viewLink}>
            {t('viewDetails', 'Explore →')}
          </Link>
        </div>
      </div>
    </div>
  );
}
