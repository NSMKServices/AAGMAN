import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import DestinationCard from '../components/common/DestinationCard';
import Button from '../components/common/Button';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { Compass, Sparkles, Heart } from '../components/common/Icons';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const { wishlistedDestinations, wishlistCount } = useWishlist();
  const { language, t } = useLanguage();

  return (
    <div className={styles.wishlistPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {language === 'mr' ? 'माझी आवडती ठिकाणे' : language === 'hi' ? 'मेरी पसंदीदा सूची' : 'MY WISHLIST'}
            </span>
            <h1 className={styles.heroTitle}>{t('wishlistTitle', 'My Saved Heritage Wishlist')}</h1>
            <p className={styles.heroSubtitle}>
              {language === 'mr'
                ? 'सह्याद्रीचे दुर्ग, पवित्र ज्योतिर्लिंगे, कोकणचे किनारे आणि प्राचीन लेण्यांचा आपला वैयक्तिक संग्रह.'
                : language === 'hi'
                ? 'सह्याद्रि के किले, पवित्र ज्योतिर्लिंग, सुंदर कोंकण तट और यूनेस्को गुफाओं का आपका व्यक्तिगत संग्रह।'
                : 'Your personally curated collection of Sahyadri hill forts, sacred Jyotirlingas, pristine Konkan beaches, and UNESCO caves.'}
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
                {t('itemsSaved', 'places saved')}
              </span>
            </div>

            <div className={styles.actionButtons}>
              <Link to="/explore">
                <Button variant="secondary" size="sm" icon={<Compass size={14} />}>
                  {t('exploreBtn', 'Explore More Sites')}
                </Button>
              </Link>
              {wishlistCount > 0 && (
                <Link to="/planner">
                  <Button variant="primary" size="sm" icon={<Sparkles size={14} />}>
                    {language === 'mr' ? 'सहल नियोजनात रुपांतर करा' : language === 'hi' ? 'यात्रा योजना में बदलें' : 'Turn Wishlist into Itinerary'}
                  </Button>
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
              <h2 className={styles.emptyTitle}>
                {language === 'mr' ? 'आपली आवडती यादी रिकामी आहे' : language === 'hi' ? 'आपकी पसंदीदा सूची खाली है' : 'Your Wishlist is Empty'}
              </h2>
              <p className={styles.emptyText}>
                {language === 'mr'
                  ? 'महाराष्ट्रातील प्रमुख पर्यटन स्थळे पहा आणि आपल्या आवडीच्या स्थळांवर हृदय चिन्हावर क्लिक करून ती जतन करा.'
                  : language === 'hi'
                  ? 'महाराष्ट्र के प्रमुख स्थलों का अन्वेषण करें और किसी भी कार्ड पर दिल के आइकन पर क्लिक करके उसे सहेजें।'
                  : 'Browse our collection of authentic Maharashtra destinations and tap the heart icon on any card to save it for your next trip.'}
              </p>
              <Link to="/explore">
                <Button variant="primary">
                  {t('exploreBtn', 'Discover Destinations Now')}
                </Button>
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
