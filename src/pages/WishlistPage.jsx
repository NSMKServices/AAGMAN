import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import DestinationCard from '../components/common/DestinationCard';
import Button from '../components/common/Button';
import { useWishlist } from '../context/WishlistContext';
import { Compass, Sparkles, Heart } from '../components/common/Icons';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const { wishlistedDestinations, wishlistCount } = useWishlist();

  return (
    <div className={styles.wishlistPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>माझी आवडती ठिकाणे</span>
            <h1 className={styles.heroTitle}>My Saved Heritage Wishlist</h1>
            <p className={styles.heroSubtitle}>
              Your personally curated collection of Sahyadri hill forts, sacred Jyotirlingas, pristine Konkan beaches, and UNESCO caves.
            </p>
          </div>
        </Container>
      </section>

      {/* Action Bar */}
      <section className={styles.actionBar}>
        <Container>
          <div className={styles.actionRow}>
            <div className={styles.statsInfo}>
              <span className={styles.countNumber}>{wishlistCount}</span>
              <span className={styles.countText}>
                {wishlistCount === 1 ? 'Destination Saved' : 'Destinations Saved'}
              </span>
            </div>

            <div className={styles.actionButtons}>
              <Link to="/explore">
                <Button variant="secondary" size="sm" icon={<Compass size={14} />}>Explore More Sites</Button>
              </Link>
              {wishlistCount > 0 && (
                <Link to="/planner">
                  <Button variant="primary" size="sm" icon={<Sparkles size={14} />}>Turn Wishlist into Itinerary</Button>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Wishlist Grid */}
      <section className={styles.contentSection}>
        <Container>
          {wishlistCount === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>
                <Heart size={44} />
              </span>
              <h2 className={styles.emptyTitle}>Your Wishlist is Empty</h2>
              <p className={styles.emptyText}>
                Browse our collection of 64+ authentic Maharashtra destinations and tap the heart icon on any card to save it for your next trip.
              </p>
              <Link to="/explore">
                <Button variant="primary">Discover Destinations Now</Button>
              </Link>
            </div>
          ) : (
            <div className={styles.destinationsGrid}>
              {wishlistedDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
