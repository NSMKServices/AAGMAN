import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import {
  Castle,
  Landmark,
  Umbrella,
  BookOpen,
  MapPin,
  Star,
  Compass,
  ArrowRight,
  Sparkles,
  X,
  Info
} from '../common/Icons';
import { useLanguage } from '../../context/LanguageContext';
import { DESTINATIONS } from '../../data/destinations';
import {
  MAHARASHTRA_DISTRICTS,
  PROJECTED_DESTINATIONS,
  ARABIAN_SEA_PATH,
  KONKAN_COASTLINE_PATH
} from '../../data/maharashtraGeoData';
import styles from './MaharashtraMap.module.css';

export default function MaharashtraMap() {
  const { language, t, getDistrictName } = useLanguage();

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedPinId, setSelectedPinId] = useState('raigad');

  // Filter destination pins by category
  const filteredPins = activeCategory === 'all'
    ? PROJECTED_DESTINATIONS
    : PROJECTED_DESTINATIONS.filter(p => p.category === activeCategory);

  // Selected destination data
  const activePin = PROJECTED_DESTINATIONS.find(p => p.id === selectedPinId) || PROJECTED_DESTINATIONS[0];
  const matchedDestination = DESTINATIONS.find(d => d.slug === activePin?.slug) || DESTINATIONS[0];

  // Selected district data
  const selectedDistrict = MAHARASHTRA_DISTRICTS.find(d => d.id === selectedDistrictId);

  // Destinations in the selected district
  const districtDestinations = selectedDistrictId
    ? DESTINATIONS.filter(d => {
        const distName = selectedDistrict?.name?.toLowerCase() || '';
        const distMarathi = selectedDistrict?.marathiName || '';
        return (
          d.district.toLowerCase().includes(distName) ||
          (d.marathiName && d.marathiName.includes(distMarathi)) ||
          selectedDistrict.destinations.includes(d.slug)
        );
      })
    : [];

  const handleDistrictClick = (district) => {
    if (selectedDistrictId === district.id) {
      setSelectedDistrictId(null);
    } else {
      setSelectedDistrictId(district.id);
      // If district has destinations, highlight the first one
      const foundDest = PROJECTED_DESTINATIONS.find(p => district.destinations.includes(p.slug));
      if (foundDest) {
        setSelectedPinId(foundDest.id);
      }
    }
  };

  const handlePinClick = (pin, e) => {
    e.stopPropagation();
    setSelectedPinId(pin.id);
    if (pin.districtId) {
      setSelectedDistrictId(pin.districtId);
    }
  };

  const handleClearSelection = () => {
    setSelectedDistrictId(null);
  };

  return (
    <div className={styles.mapContainer}>
      {/* Header with Title and Category Filters */}
      <div className={styles.mapHeader}>
        <div>
          <span className={styles.eyebrow}>{t('mapEyebrow', 'Interactive Geographic Atlas')}</span>
          <h3 className={styles.mapTitle}>{t('mapTitle', 'Explore Maharashtra by Region & Circuit')}</h3>
          <p className={styles.mapSub}>
            {t('mapSub', 'Select markers or districts on the map to inspect regional forts, temples, beaches, and world heritage sanctuaries.')}
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className={styles.filters} role="group" aria-label="Filter destinations by category">
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            {t('allSites', 'All Sites')} ({PROJECTED_DESTINATIONS.length})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'forts' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('forts')}
          >
            <Castle size={14} /> {t('forts', 'Forts')}
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'temples' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('temples')}
          >
            <Landmark size={14} /> {t('temples', 'Temples')}
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'beaches' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('beaches')}
          >
            <Umbrella size={14} /> {t('beaches', 'Beaches')}
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'heritage' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('heritage')}
          >
            <BookOpen size={14} /> {t('heritage', 'Heritage')}
          </button>
        </div>
      </div>

      {/* Main Map + Details Layout */}
      <div className={styles.mapLayout}>
        {/* SVG Map Section - Fixed Stationary ViewBox 0 0 1000 750 */}
        <div className={styles.svgWrapper}>
          <svg
            viewBox="0 0 1000 750"
            className={styles.svgMap}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Interactive map of Maharashtra with 36 administrative districts and tourism destination markers"
          >
            <defs>
              {/* Sea Water Gradient */}
              <linearGradient id="arabianSeaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-sea-deep, #D0E1F0)" stopOpacity="0.75" />
                <stop offset="85%" stopColor="var(--color-sea-shallow, #E3EFF9)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-sea-shallow, #E3EFF9)" stopOpacity="0.1" />
              </linearGradient>

              {/* District Base Gradient */}
              <linearGradient id="districtFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-surface-elevated, #FFF9F0)" />
                <stop offset="100%" stopColor="var(--color-parchment, #F8EBDD)" />
              </linearGradient>

              {/* Soft Drop Shadow for State Boundary */}
              <filter id="boundaryShadow" x="-5%" y="-5%" width="115%" height="115%">
                <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#40291C" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* 1. Arabian Sea Western Ocean Background */}
            <path
              d={ARABIAN_SEA_PATH}
              fill="url(#arabianSeaGrad)"
              className={styles.seaPath}
            />

            {/* Cartographic Compass Rose / Sea Label */}
            <g className={styles.seaAnnotation} transform="translate(60, 480) rotate(-78)">
              <text x="0" y="0" className={styles.seaText}>
                {language === 'mr' ? 'अरबी समुद्र' : language === 'hi' ? 'अरब सागर' : 'ARABIAN SEA'}
              </text>
              <line x1="-30" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
            </g>

            {/* 2. All 36 Administrative District Boundaries */}
            <g className={styles.districtsLayer} filter="url(#boundaryShadow)">
              {MAHARASHTRA_DISTRICTS.map((district) => {
                const isSelected = selectedDistrictId === district.id;
                const isHovered = hoveredDistrict?.id === district.id;
                const hasDestinations = district.destinations.length > 0;

                return (
                  <path
                    key={district.id}
                    d={district.svgPath}
                    className={`
                      ${styles.districtPath} 
                      ${isSelected ? styles.selectedDistrictPath : ''} 
                      ${isHovered ? styles.hoveredDistrictPath : ''}
                      ${hasDestinations ? styles.hasDestinationsPath : ''}
                    `}
                    onClick={() => handleDistrictClick(district)}
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    aria-label={`${district.name} District`}
                    role="button"
                    tabIndex={0}
                  />
                );
              })}
            </g>

            {/* 3. Detailed Konkan Coastline Highlight */}
            <path
              d={KONKAN_COASTLINE_PATH}
              fill="none"
              className={styles.coastlineStroke}
            />

            {/* 4. Major Division Watermark Labels */}
            <g className={styles.divisionLabels}>
              <text x="210" y="470" className={styles.divLabelKonkan} transform="rotate(-65 210,470)">
                {t('konkanRegion', 'KONKAN')}
              </text>
              <text x="295" y="420" className={styles.divLabel}>
                {t('westernMhRegion', 'WESTERN MAHARASHTRA')}
              </text>
              <text x="360" y="155" className={styles.divLabel}>
                {t('khandeshRegion', 'KHANDESH')}
              </text>
              <text x="500" y="275" className={styles.divLabel}>
                {t('marathwadaRegion', 'MARATHWADA')}
              </text>
              <text x="730" y="235" className={styles.divLabel}>
                {t('vidarbhaRegion', 'VIDARBHA')}
              </text>
            </g>

            {/* 5. Destination Pins (Projected Lat/Lng) */}
            <g className={styles.pinsLayer}>
              {filteredPins.map((pin) => {
                const isSelected = selectedPinId === pin.id;

                return (
                  <g
                    key={pin.id}
                    transform={`translate(${pin.x}, ${pin.y})`}
                    className={`${styles.pinGroup} ${styles[pin.category]} ${isSelected ? styles.selectedPin : ''}`}
                    onClick={(e) => handlePinClick(pin, e)}
                    cursor="pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={pin.name}
                  >
                    {/* Outer halo */}
                    <circle
                      r={isSelected ? 14 : 9}
                      className={styles.pinHalo}
                    />

                    {/* Core pin dot */}
                    <circle
                      r={isSelected ? 7 : 5}
                      className={styles.pinCenter}
                    />

                    {/* Selected pin label */}
                    {isSelected && (
                      <g className={styles.activePinLabelGroup}>
                        <text y="-14" textAnchor="middle" className={styles.pinTextShadow}>
                          {language === 'mr' ? pin.marathiName : pin.name}
                        </text>
                        <text y="-14" textAnchor="middle" className={styles.pinText}>
                          {language === 'mr' ? pin.marathiName : pin.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Interactive Floating Status Bar */}
          <div className={styles.statusBar}>
            <div className={styles.statusInfo}>
              {hoveredDistrict ? (
                <span>
                  <Compass size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  <strong>
                    {language === 'mr'
                      ? hoveredDistrict.marathiName
                      : language === 'hi'
                      ? hoveredDistrict.hindiName
                      : hoveredDistrict.name}
                  </strong>{' '}
                  ({hoveredDistrict.division} {t('divisionName', 'Division')})
                </span>
              ) : selectedDistrict ? (
                <span>
                  <MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  {t('selectedDistrict', 'Selected')}:{' '}
                  <strong>
                    {language === 'mr'
                      ? selectedDistrict.marathiName
                      : language === 'hi'
                      ? selectedDistrict.hindiName
                      : selectedDistrict.name}
                  </strong>
                </span>
              ) : (
                <span className={styles.hintText}>
                  <Info size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  {t('mapSub', 'Click any district or destination pin to explore')}
                </span>
              )}
            </div>

            {selectedDistrictId && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={handleClearSelection}
                title={t('clearSelection', 'Clear Selection')}
              >
                <X size={12} /> {t('clearSelection', 'Clear Selection')}
              </button>
            )}
          </div>
        </div>

        {/* Selected Destination / District Preview Card (Stationary) */}
        <div className={styles.previewPanel}>
          {/* If a District with multiple destinations is selected, show District Explorer Banner */}
          {selectedDistrict && (
            <div className={styles.districtCard}>
              <div className={styles.districtCardHeader}>
                <div>
                  <span className={styles.districtEyebrow}>
                    {selectedDistrict.division} {t('divisionName', 'Division')}
                  </span>
                  <h4 className={styles.districtTitle}>
                    {language === 'mr'
                      ? selectedDistrict.marathiName
                      : language === 'hi'
                      ? selectedDistrict.hindiName
                      : selectedDistrict.name}{' '}
                    {t('districtName', 'District')}
                  </h4>
                  <p className={styles.districtHq}>
                    {t('headquarters', 'Headquarters')}: {selectedDistrict.headquarters}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.districtCloseBtn}
                  onClick={handleClearSelection}
                  aria-label="Close district view"
                >
                  <X size={14} />
                </button>
              </div>

              {districtDestinations.length > 0 ? (
                <div className={styles.districtDestList}>
                  <span className={styles.districtDestTitle}>
                    {t('destinationsInDistrict', 'Attractions in this district')}:
                  </span>
                  <div className={styles.districtChips}>
                    {districtDestinations.map(dest => (
                      <button
                        key={dest.id}
                        type="button"
                        className={`${styles.districtDestChip} ${activePin?.slug === dest.slug ? styles.activeChip : ''}`}
                        onClick={() => setSelectedPinId(dest.slug)}
                      >
                        {dest.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className={styles.noDestText}>
                  {t('noDestDestinationsInDistrict', 'No major listed destinations in this district yet. Check regional circuits!')}
                </p>
              )}
            </div>
          )}

          {/* Active Destination Card */}
          {matchedDestination && (
            <div className={styles.destinationCard}>
              <div className={styles.cardMedia}>
                <img
                  src={matchedDestination.thumbnail || matchedDestination.heroImage}
                  alt={matchedDestination.name}
                  className={styles.cardImage}
                />
                <span className={styles.cardCategory}>
                  <Badge variant={matchedDestination.category} size="sm">
                    {matchedDestination.category.toUpperCase()}
                  </Badge>
                </span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardMetaRow}>
                  <span className={styles.cardDistrict}>
                    <MapPin size={13} color="var(--color-secondary)" /> {matchedDestination.district} • {matchedDestination.region}
                  </span>
                  <span className={styles.cardRating}>
                    <Star size={13} color="var(--color-accent)" style={{ fill: 'var(--color-accent)' }} /> {matchedDestination.rating}
                  </span>
                </div>

                <h4 className={styles.cardTitle}>{matchedDestination.name}</h4>
                <p className={styles.cardMarathi}>{matchedDestination.marathiName}</p>
                <p className={styles.cardSummary}>{matchedDestination.summary}</p>

                <div className={styles.cardDetailsGrid}>
                  <div>
                    <span className={styles.detailLabel}>{t('elevation', 'Elevation / Circuit')}:</span>
                    <span className={styles.detailValue}>
                      {matchedDestination.elevation || matchedDestination.circuit}
                    </span>
                  </div>
                  <div>
                    <span className={styles.detailLabel}>{t('bestSeason', 'Best Season')}:</span>
                    <span className={styles.detailValue}>{matchedDestination.bestTime}</span>
                  </div>
                </div>

                <Link
                  to={`/${matchedDestination.category}/${matchedDestination.slug}`}
                  className={styles.cardActionBtn}
                >
                  <span>{t('exploreFullGuide', 'Explore Full Guide & Coordinates')}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
