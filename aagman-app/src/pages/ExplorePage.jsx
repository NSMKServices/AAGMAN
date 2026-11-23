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
  Search,
  X
} from '../components/common/Icons';
import styles from './ExplorePage.module.css';

export default function ExplorePage({ defaultCategory = 'all' }) {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || defaultCategory;
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const categories = [
    { id: 'all', label: 'All Destinations', Icon: Compass },
    { id: 'forts', label: 'Historic Forts', Icon: Castle },
    { id: 'temples', label: 'Sacred Temples', Icon: Landmark },
    { id: 'beaches', label: 'Konkan Beaches', Icon: Umbrella },
    { id: 'heritage', label: 'UNESCO Caves', Icon: BookOpen }
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

  return (
    <div className={styles.explorePage}>
      {/* Header Banner */}
      <section className={styles.pageHeader}>
        <Container>
          <span className={styles.eyebrow}>DISCOVER MAHARASHTRA</span>
          <h1 className={styles.pageTitle}>Explore Heritage & Tourism Destinations</h1>
          <p className={styles.pageSubtitle}>
            Browse historical fortresses, sacred pilgrimage shrines, golden Konkan beaches, and UNESCO rock-cut caves.
          </p>

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
                placeholder="Search by name, district, or keyword..."
              />
            </div>

            <div className={styles.dropdownsGroup}>
              {/* District Dropdown */}
              <div className={styles.selectWrapper}>
                <label className={styles.selectLabel}>District:</label>
                <select
                  className={styles.selectDropdown}
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="all">All Districts</option>
                  {districts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              {/* Region Dropdown */}
              <div className={styles.selectWrapper}>
                <label className={styles.selectLabel}>Region:</label>
                <select
                  className={styles.selectDropdown}
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="all">All Regions</option>
                  <option value="Konkan">Konkan</option>
                  <option value="Western Maharashtra">Western Maharashtra</option>
                  <option value="Marathwada">Marathwada</option>
                  <option value="North Maharashtra">North Maharashtra</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className={styles.resultsInfoRow}>
            <span className={styles.resultsCount}>
              Showing <strong>{filteredDestinations.length}</strong> of {DESTINATIONS.length} heritage destinations
            </span>
            {(searchQuery || selectedDistrict !== 'all' || selectedRegion !== 'all' || selectedCategory !== 'all') && (
              <button
                type="button"
                className={styles.resetFiltersBtn}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDistrict('all');
                  setSelectedRegion('all');
                  handleCategoryChange('all');
                }}
              >
                Reset All Filters <X size={14} style={{ marginLeft: 4 }} />
              </button>
            )}
          </div>

          {/* Destination Grid */}
          {filteredDestinations.length > 0 ? (
            <div className={styles.destinationGrid}>
              {filteredDestinations.map(dest => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>
                <Search size={36} />
              </span>
              <h3 className={styles.emptyTitle}>No matching destinations found</h3>
              <p className={styles.emptySubtitle}>Try adjusting your search keywords or clearing district filters.</p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDistrict('all');
                  setSelectedRegion('all');
                  handleCategoryChange('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
