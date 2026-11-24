import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import DestinationCard from '../components/common/DestinationCard';
import SearchInput from '../components/common/SearchInput';
import { DESTINATIONS } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  Castle,
  Landmark,
  Umbrella,
  BookOpen,
  Mountain,
  Trees,
  Search,
  X
} from '../components/common/Icons';
import styles from './ExplorePage.module.css';

export default function ExplorePage({ defaultCategory = 'all' }) {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || defaultCategory;
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const categories = [
    { id: 'all', label: t('allDestinations', 'All Destinations'), Icon: Compass },
    { id: 'forts', label: t('forts', 'Historic Forts'), Icon: Castle },
    { id: 'temples', label: t('temples', 'Sacred Temples'), Icon: Landmark },
    { id: 'beaches', label: t('beaches', 'Konkan Beaches'), Icon: Umbrella },
    { id: 'heritage', label: t('heritage', 'UNESCO Caves'), Icon: BookOpen },
    { id: 'nature', label: t('nature', 'Nature & Hill Stations'), Icon: Mountain },
    { id: 'wildlife', label: t('wildlife', 'Wildlife & Sanctuaries'), Icon: Trees }
  ];

  // Extract unique districts
  const districts = useMemo(() => {
    const set = new Set(DESTINATIONS.map(d => d.district));
    return Array.from(set).sort();
  }, []);

  // Filtered destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
      const matchesDistrict = selectedDistrict === 'all' || dest.district === selectedDistrict;
      const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
      const matchesSearch = !searchQuery.trim() ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dest.marathiName && dest.marathiName.includes(searchQuery)) ||
        dest.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDistrict && matchesRegion && matchesSearch;
    });
  }, [selectedCategory, selectedDistrict, selectedRegion, searchQuery]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSearchParams(catId === 'all' ? {} : { category: catId });
  };

  const getPageHeader = () => {
    switch (selectedCategory) {
      case 'forts':
        return {
          eyebrow: language === 'mr' ? 'शिवछत्रपतींचे दुर्ग' : language === 'hi' ? 'शिवकालीन दुर्ग' : 'MARATHA CITADELS',
          title: t('fortsTitle', 'Historic Forts of Maharashtra'),
          sub: t('fortsSubtitle', 'Centuries of Maratha chivalry etched into the cliffs of the Sahyadri mountains.')
        };
      case 'temples':
        return {
          eyebrow: language === 'mr' ? 'पवित्र तीर्थक्षेत्रे' : language === 'hi' ? 'पवित्र देवालय' : 'SACRED DEVSTHAN',
          title: t('templesTitle', 'Sacred Temples & Pilgrimages'),
          sub: t('templesSubtitle', 'Millennia of devotion, ancient Hemadpanthi architecture, and sacred river ghats.')
        };
      case 'beaches':
        return {
          eyebrow: language === 'mr' ? 'कोकण किनारपट्टी' : language === 'hi' ? 'कोंकण समुद्र तट' : 'KONKAN COASTLINE',
          title: t('beachesTitle', 'Konkan Coastal Beaches'),
          sub: t('beachesSubtitle', '720 kilometers of untouched golden sands, palm fronds, and azure Arabian waters.')
        };
      case 'nature':
        return {
          eyebrow: language === 'mr' ? 'निसर्ग आणि गिरिस्थाने' : language === 'hi' ? 'प्रकृति और पर्वतीय स्थल' : 'NATURE & HILL STATIONS',
          title: t('natureTitle', 'Hill Stations & Natural Wonders'),
          sub: t('natureSubtitle', 'Explore Maharashtra’s cool hill towns, plateaus, lakes and waterfalls.')
        };
      case 'wildlife':
        return {
          eyebrow: language === 'mr' ? 'वन्यजीव संवर्धन' : language === 'hi' ? 'वन्यजीव संरक्षण' : 'WILDLIFE & CONSERVATION',
          title: t('wildlifeTitle', 'Wildlife Sanctuaries & Parks'),
          sub: t('wildlifeSubtitle', 'Discover protected forests, tiger reserves and bird habitats across Maharashtra.')
        };
      case 'heritage':
        return {
          eyebrow: language === 'mr' ? 'जागतिक वारसा' : language === 'hi' ? 'विश्व धरोहर' : 'UNESCO WORLD HERITAGE',
          title: t('heritageTitle', 'UNESCO Caves & Heritage Monuments'),
          sub: t('heritageSubtitle', 'Masterpieces of rock-cut architecture, Buddhist frescoes, and royal palaces.')
        };
      default:
        return {
          eyebrow: language === 'mr' ? 'महाराष्ट्र दर्शन' : language === 'hi' ? 'महाराष्ट्र दर्शन' : 'DISCOVER MAHARASHTRA',
          title: t('exploreBtn', 'Explore Heritage & Tourism Destinations'),
          sub: t('heroSubtitle', 'Browse historical fortresses, sacred pilgrimage shrines, golden Konkan beaches, and UNESCO rock-cut caves.')
        };
    }
  };

  const headerInfo = getPageHeader();

  return (
    <div className={styles.explorePage}>
      {/* Header Banner */}
      <section className={styles.pageHeader}>
        <Container>
          <span className={styles.eyebrow}>{headerInfo.eyebrow}</span>
          <h1 className={styles.pageTitle}>{headerInfo.title}</h1>
          <p className={styles.pageSubtitle}>{headerInfo.sub}</p>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === cat.id ? styles.activeTab : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span className={styles.tabIcon}>
                  <cat.Icon size={18} />
                </span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Filter and Grid Section */}
      <section className={styles.contentSection}>
        <Container>
          {/* Controls Bar */}
          <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('searchPlaceholder', 'Search by name, district, or keyword...')}
              />
            </div>

            <div className={styles.dropdownsGroup}>
              {/* District Dropdown */}
              <div className={styles.selectWrapper}>
                <label className={styles.selectLabel}>{t('district', 'District')}:</label>
                <select
                  className={styles.selectDropdown}
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="all">{t('allDistricts', 'All Districts')}</option>
                  {districts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              {/* Region Dropdown */}
              <div className={styles.selectWrapper}>
                <label className={styles.selectLabel}>{t('region', 'Region')}:</label>
                <select
                  className={styles.selectDropdown}
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="all">{t('allRegions', 'All Regions')}</option>
                  <option value="Konkan">{t('konkanRegion', 'Konkan')}</option>
                  <option value="Western Maharashtra">{t('westernMhRegion', 'Western Maharashtra')}</option>
                  <option value="Marathwada">{t('marathwadaRegion', 'Marathwada')}</option>
                  <option value="North Maharashtra">{t('khandeshRegion', 'North Maharashtra')}</option>
                  <option value="Vidarbha">{t('vidarbhaRegion', 'Vidarbha')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className={styles.resultsInfoRow}>
            <span className={styles.resultsCount}>
              {t('showingResults', 'Showing')} <strong>{filteredDestinations.length}</strong> {t('heritageDestinations', 'heritage destinations')}
            </span>
            {(searchQuery || selectedDistrict !== 'all' || selectedRegion !== 'all' || selectedCategory !== 'all') && (
              <button
                type="button"
                className={styles.resetFiltersBtn}
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDistrict('all');
                  setSelectedRegion('all');
                  setSearchQuery('');
                  setSearchParams({});
                }}
              >
                <X size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                {t('resetFilters', 'Reset Filters')}
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredDestinations.length > 0 ? (
            <div className={styles.destinationsGrid}>
              {filteredDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className={styles.noResultsBox}>
              <Compass size={40} className={styles.noResultsIcon} />
              <h3 className={styles.noResultsTitle}>{t('noDestinationsFound', 'No destinations found matching your criteria.')}</h3>
              <p className={styles.noResultsSub}>
                {t('mapSub', 'Try clearing your search query or selecting a different district filter.')}
              </p>
              <button
                type="button"
                className={styles.clearFiltersAction}
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDistrict('all');
                  setSelectedRegion('all');
                  setSearchQuery('');
                  setSearchParams({});
                }}
              >
                {t('resetFilters', 'Reset All Filters')}
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
