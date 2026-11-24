import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '../common/Badge';
import Button from '../common/Button';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  MapPin,
  Star,
  Sparkles
} from '../common/Icons';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedValue } from '../../utils/localizedContent';
import styles from './Destination3DGallery.module.css';

/**
 * Premium 3D Featured Destination Gallery
 * - 3D Perspective with realistic horizontal/vertical depth layering
 * - Prev/Next controls, clickable background cards, keyboard arrow support
 * - Autoplay with pause on hover/focus/touch
 * - Touch swipe gestures for mobile
 * - Destination detail metadata display below active photograph
 * - Handles <= 2 destinations gracefully
 */
export default function Destination3DGallery({ destinations = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchDelta, setTouchDelta] = useState(0);

  const { isWishlisted, toggleWishlist } = useWishlist();
  const { language, t, getDistrictName } = useLanguage();
  const navigate = useNavigate();
  const galleryRef = useRef(null);

  const total = destinations.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay timer with pause support
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(interval);
  }, [nextSlide, total, isPaused]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch gesture handlers
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  };

  const handleTouchMove = (e) => {
    if (touchStart === null) return;
    const current = e.touches[0].clientX;
    setTouchDelta(current - touchStart);
  };

  const handleTouchEnd = () => {
    if (touchStart !== null) {
      if (touchDelta > 50) {
        prevSlide();
      } else if (touchDelta < -50) {
        nextSlide();
      }
    }
    setTouchStart(null);
    setTouchDelta(0);
    setTimeout(() => setIsPaused(false), 2000);
  };

  if (!destinations || total === 0) {
    return null;
  }

  const activeDest = destinations[activeIndex] || destinations[0];
  const localizedName = getLocalizedValue(activeDest, 'name', language);
  const localizedSummary = getLocalizedValue(activeDest, 'summary', language);
  const localizedAttractions = getLocalizedValue(activeDest, 'attractions', language);
  const localizedCategory = t(activeDest.category, activeDest.category);
  const isSaved = isWishlisted(activeDest.slug);

  // Compute signed cyclical difference
  const getOffset = (index) => {
    if (total <= 1) return 0;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div
      className={styles.galleryWrapper}
      ref={galleryRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="3D Featured Destination Showcase"
    >
      {/* 3D Perspective Stage */}
      <div
        className={styles.stage3d}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.deck}>
          {destinations.map((dest, idx) => {
            const offset = getOffset(idx);
            const isForeground = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            // Compute CSS custom property values for smooth dynamic positioning
            return (
              <div
                key={dest.id || idx}
                className={`${styles.card3d} ${isForeground ? styles.cardActive : ''} ${
                  offset < 0 ? styles.cardLeft : offset > 0 ? styles.cardRight : ''
                } ${!isVisible ? styles.cardHidden : ''}`}
                style={{
                  '--offset': offset,
                  '--abs-offset': Math.abs(offset)
                }}
                onClick={() => {
                  if (!isForeground) {
                    setActiveIndex(idx);
                  }
                }}
                role="button"
                tabIndex={isForeground ? 0 : -1}
                aria-label={`View ${getLocalizedValue(dest, 'name', language)}`}
                aria-current={isForeground ? 'true' : undefined}
              >
                <div className={styles.imageFrame}>
                  <img
                    src={dest.heroImage || dest.thumbnail}
                    alt={getLocalizedValue(dest, 'name', language)}
                    className={styles.cardImage}
                    loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const fallback = dest.heroImage || dest.thumbnail;
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                  <div className={styles.imageOverlay} />

                  {/* Top Badges */}
                  <div className={styles.topBadges}>
                    <Badge variant={dest.category} size="sm">
                      {t(dest.category, dest.category).toUpperCase()}
                    </Badge>
                    {dest.rating && (
                      <div className={styles.ratingBadge}>
                        <Star size={12} fill="var(--color-gold)" color="var(--color-gold)" />
                        <span>{dest.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Vignette Caption */}
                  <div className={styles.vignetteCaption}>
                    <span className={styles.vignetteLocation}>
                      <MapPin size={12} />
                      {getDistrictName(dest.district.toLowerCase().replace(/\\s+/g, '-')) || dest.district} {t('district', 'District')}
                    </span>
                    <h4 className={styles.vignetteTitle}>{getLocalizedValue(dest, 'name', language)}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={prevSlide}
          aria-label="Previous destination"
          title={t('previousDestination', 'Previous destination (Left Arrow)')}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Pagination Dots with Active Pill */}
        <div className={styles.paginationTrack} role="tablist" aria-label="Destination slides">
          {destinations.map((dest, i) => (
            <button
              key={dest.id || i}
              type="button"
              className={`${styles.pageDot} ${i === activeIndex ? styles.activeDot : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${dest.name}`}
              aria-selected={i === activeIndex}
              role="tab"
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={nextSlide}
          aria-label="Next destination"
          title={t('nextDestination', 'Next destination (Right Arrow)')}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Destination Information Card (Positioned Beneath Active Photograph) */}
      <div className={styles.infoCard}>
        <div className={styles.infoMetaRow}>
          <div className={styles.metaLeft}>
            <span className={styles.districtChip}>
              <MapPin size={13} />
              {getDistrictName(activeDest.district.toLowerCase().replace(/\\s+/g, '-')) || activeDest.district} {t('district', 'District')}, {activeDest.region}
            </span>
            <Badge variant={activeDest.category} size="md">
              {localizedCategory.toUpperCase()}
            </Badge>
          </div>

          <div className={styles.slideCounter}>
            <span className={styles.counterCurrent}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className={styles.counterDivider}>/</span>
            <span className={styles.counterTotal}>
              {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className={styles.titleGroup}>
          <h3 className={styles.destName}>{localizedName}</h3>
          {activeDest.marathiName && (
            <span className={styles.destMarathi}>{language === 'hi' ? activeDest.nameHi || activeDest.marathiName : activeDest.marathiName}</span>
          )}
        </div>

        <p className={styles.destSummary}>{localizedSummary}</p>

        {/* Highlights Row */}
        {activeDest.attractions && activeDest.attractions.length > 0 && (
          <div className={styles.attractionsRow}>
            <span className={styles.attractionsLabel}>{t('notableFeatures', 'Notable Features:')}</span>
            <div className={styles.attractionPills}>
              {(localizedAttractions || []).slice(0, 3).map((item, idx) => (
                <span key={idx} className={styles.attractionPill}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actionButtons}>
          <Button
            to={`/${activeDest.category}/${activeDest.slug}`}
            variant="primary"
            size="md"
            icon={<ArrowRight size={14} />}
            className={styles.exploreBtn}
          >
            {t('exploreDestination', 'Explore Destination')}
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => toggleWishlist(activeDest.slug)}
            icon={
              <Heart
                size={16}
                fill={isSaved ? 'var(--color-primary)' : 'none'}
                color={isSaved ? 'var(--color-primary)' : 'currentColor'}
              />
            }
          >
            {isSaved ? t('removeFromWishlist', 'Saved in Wishlist') : t('addToWishlist', 'Add to Wishlist')}
          </Button>

          <Button
            to="/planner"
            variant="secondary"
            size="md"
            icon={<Sparkles size={14} />}
          >
            {t('planTripBtn', 'Plan Journey Here')}
          </Button>
        </div>
      </div>
    </div>
  );
}
