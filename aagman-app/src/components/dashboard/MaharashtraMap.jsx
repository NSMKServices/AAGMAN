import React, { useState, useEffect } from 'react';
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
  Info,
  Layers
} from '../common/Icons';
import { useLanguage } from '../../context/LanguageContext';
import { contentService } from '../../services/contentService';
import {
  MAHARASHTRA_DISTRICTS,
  MAHARASHTRA_DIVISIONS,
  PROJECTED_DESTINATIONS,
  ARABIAN_SEA_PATH,
  KONKAN_COASTLINE_PATH
} from '../../data/maharashtraGeoData';
import styles from './MaharashtraMap.module.css';

export default function MaharashtraMap() {
  const { language, t } = useLanguage();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDivision, setActiveDivision] = useState('all');
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedPinId, setSelectedPinId] = useState(null);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const unsubscribe = contentService.subscribe(({ destinations: records }) => setDestinations(records));
    contentService.getAllDestinations();
    return unsubscribe;
  }, []);

  const publishedDestinations = destinations.filter(item => item.status === 'published');

  // Filter destination pins by category and optional division
  const filteredPins = PROJECTED_DESTINATIONS.filter(pin => publishedDestinations.some(item =>
    item.slug === pin.slug || (item.name || '').toLowerCase() === (pin.name || '').toLowerCase()
  )).filter(pin => {
    const matchesCategory = activeCategory === 'all' || pin.category === activeCategory;
    if (!matchesCategory) return false;

    if (activeDivision === 'all') return true;
    const parentDistrict = MAHARASHTRA_DISTRICTS.find(d => d.id === pin.districtId);
    return parentDistrict && parentDistrict.division.toLowerCase().includes(activeDivision.toLowerCase());
  });

  // Selected destination data
  const activePin = filteredPins.find(p => p.id === selectedPinId) || filteredPins[0] || null;
  const matchedDestination = publishedDestinations.find(d =>
    d.slug === activePin?.slug || (d.name || '').toLowerCase() === (activePin?.name || '').toLowerCase()
  ) || null;

  // Selected district data
  const selectedDistrict = MAHARASHTRA_DISTRICTS.find(d => d.id === selectedDistrictId);

  // Destinations in the selected district
  const districtDestinations = selectedDistrictId
    ? publishedDestinations.filter(d => {
        const distName = selectedDistrict?.name?.toLowerCase() || '';
        const distMarathi = selectedDistrict?.marathiName || '';
        return (
          (d.district || '').toLowerCase().includes(distName) ||
          (d.marathiName && d.marathiName.includes(distMarathi)) ||
          selectedDistrict.destinations.includes(d.slug)
        );
      })
    : [];

  const getDistrictDisplayName = (d) => {
    if (!d) return '';
    if (language === 'mr') return d.marathiName || d.name;
    if (language === 'hi') return d.hindiName || d.name;
    return d.name;
  };

  const getPinDisplayName = (pin) => {
    if (!pin) return '';
    if (language === 'mr') return pin.marathiName || pin.name;
    if (language === 'hi') return pin.hindiName || pin.name;
    return pin.name;
  };

  const handleDistrictClick = (district) => {
    if (selectedDistrictId === district.id) {
      setSelectedDistrictId(null);
    } else {
      setSelectedDistrictId(district.id);
      // If district has destinations, highlight the first one
      const foundDest = filteredPins.find(p => district.destinations.includes(p.slug));
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

  const handleResetFilters = () => {
    setActiveCategory('all');
    setActiveDivision('all');
    setSelectedDistrictId(null);
    setSelectedPinId('raigad');
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
            {t('allSites', 'All Sites')} ({publishedDestinations.length})
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

      {/* Division Selector Sub-Bar */}
      <div className={styles.divisionBar} role="group" aria-label="Filter by administrative division">
        <span className={styles.divisionLabel}>
          <Layers size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          {t('filterByDivision', 'Division')}:
        </span>
        <button
          type="button"
          className={`${styles.divisionBtn} ${activeDivision === 'all' ? styles.activeDivisionBtn : ''}`}
          onClick={() => setActiveDivision('all')}
        >
          {t('allDivisions', 'All Maharashtra (36 Districts)')}
        </button>
        <button
          type="button"
          className={`${styles.divisionBtn} ${activeDivision === 'Konkan' ? styles.activeDivisionBtn : ''}`}
          onClick={() => setActiveDivision('Konkan')}
        >
          {language === 'mr' ? 'कोकण' : language === 'hi' ? 'कोंकण' : 'Konkan'}
        </button>
        <button
          type="button"
          className={`${styles.divisionBtn} ${activeDivision === 'Pune' ? styles.activeDivisionBtn : ''}`}
          onClick={() => setActiveDivision('Pune')}
        >
          {language === 'mr' ? 'पुणे / पश्चिम महा.' : language === 'hi' ? 'पुणे संभाग' : 'Pune (Western MH)'}
        </button>
        <button
          type="button"
          className={`${styles.divisionBtn} ${activeDivision === 'Nashik' ? styles.activeDivisionBtn : ''}`}
          onClick={() => setActiveDivision('Nashik')}
        >
          {language === 'mr' ? 'नाशिक / खान्देश' : language === 'hi' ? 'नासिक / खानदेश' : 'Nashik (Khandesh)'}
        </button>
        <button
          type="button"
          className={`${styles.divisionBtn} ${activeDivision === 'Chhatrapati Sambhajinagar' ? styles.activeDivisionBtn : ''}`}
          onClick={() => setActiveDivision('Chhatrapati Sambhajinagar')}
        >
          {language === 'mr' ? 'छ. संभाजीनगर (मराठवाडा)' : language === 'hi' ? 'छ. संभाजीनगर (मराठवाड़ा)' : 'Marathwada'}
        </button>
        <button
          type="button"
          className={`${styles.divisionBtn} ${activeDivision === 'Amravati' || activeDivision === 'Nagpur' ? styles.activeDivisionBtn : ''}`}
          onClick={() => setActiveDivision(activeDivision === 'Amravati' ? 'Nagpur' : 'Amravati')}
        >
          {language === 'mr' ? 'विदर्भ (अमरावती / नागपूर)' : language === 'hi' ? 'विदर्भ (अमरावती / नागपुर)' : 'Vidarbha'}
        </button>
      </div>

      {/* Main Map + Details Layout */}
      <div className={styles.mapLayout}>
        {/* SVG Map Section - Fixed Stationary ViewBox 0 0 1000 750 */}
        <div className={styles.svgWrapper}>
          <svg
            viewBox="0 0 1000 750"
            preserveAspectRatio="xMidYMid meet"
            className={styles.svgMap}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Interactive map of Maharashtra with 36 administrative districts and tourism destination markers"
          >
            <defs>
              {/* Sea Water Gradient */}
              <linearGradient id="arabianSeaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C2D8EC" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#D8E8F5" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#EBF3F9" stopOpacity="0.2" />
              </linearGradient>

              {/* District Base Gradient */}
              <linearGradient id="districtFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-surface-elevated, #FFF9F0)" />
                <stop offset="100%" stopColor="var(--color-parchment, #F8EBDD)" />
              </linearGradient>

              {/* Soft Drop Shadow for State Boundary */}
              <filter id="boundaryShadow" x="-5%" y="-5%" width="115%" height="115%">
                <feDropShadow dx="1.5" dy="3" stdDeviation="4" floodColor="#40291C" floodOpacity="0.1" />
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
              <line x1="-30" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.35" />
            </g>

            {/* 2. All 36 Administrative District Boundaries */}
            <g className={styles.districtsLayer} filter="url(#boundaryShadow)">
              {MAHARASHTRA_DISTRICTS.map((district) => {
                const isSelected = selectedDistrictId === district.id;
                const isHovered = hoveredDistrict?.id === district.id;
                const hasDestinations = district.destinations && district.destinations.length > 0;
                const isDivisionMatch = activeDivision === 'all' || district.division.toLowerCase().includes(activeDivision.toLowerCase());

                return (
                  <path
                    key={district.id}
                    d={district.svgPath}
                    className={`
                      ${styles.districtPath} 
                      ${isSelected ? styles.selectedDistrictPath : ''} 
                      ${isHovered ? styles.hoveredDistrictPath : ''}
                      ${hasDestinations ? styles.hasDestinationsPath : ''}
                      ${!isDivisionMatch ? styles.dimmedDistrictPath : ''}
                    `}
                    onClick={() => handleDistrictClick(district)}
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    aria-label={`${getDistrictDisplayName(district)} District`}
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

            {/* 4. Major Division Watermark Labels (Localized) */}
            <g className={styles.divisionLabels}>
              <text x="195" y="440" className={styles.divLabelKonkan} transform="rotate(-68 195,440)">
                {language === 'mr' ? 'कोकण' : language === 'hi' ? 'कोंकण' : 'KONKAN'}
              </text>
              <text x="310" y="440" className={styles.divLabel}>
                {language === 'mr' ? 'पश्चिम महाराष्ट्र' : language === 'hi' ? 'पश्चिम महाराष्ट्र' : 'WESTERN MAHARASHTRA'}
              </text>
              <text x="350" y="155" className={styles.divLabel}>
                {language === 'mr' ? 'खान्देश' : language === 'hi' ? 'खानदेश' : 'KHANDESH'}
              </text>
              <text x="500" y="285" className={styles.divLabel}>
                {language === 'mr' ? 'मराठवाडा' : language === 'hi' ? 'मराठवाड़ा' : 'MARATHWADA'}
              </text>
              <text x="670" y="220" className={styles.divLabel}>
                {language === 'mr' ? 'पश्चिम विदर्भ' : language === 'hi' ? 'पश्चिम विदर्भ' : 'WEST VIDARBHA'}
              </text>
              <text x="815" y="220" className={styles.divLabel}>
                {language === 'mr' ? 'पूर्व विदर्भ' : language === 'hi' ? 'पूर्व विदर्भ' : 'EAST VIDARBHA'}
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
                    aria-label={getPinDisplayName(pin)}
                  >
                    {/* Outer halo */}
                    <circle
                      r={isSelected ? 13 : 8}
                      className={styles.pinHalo}
                    />

                    {/* Core pin dot */}
                    <circle
                      r={isSelected ? 6.5 : 4.5}
                      className={styles.pinCenter}
                    />

                    {/* Selected pin label */}
                    {isSelected && (
                      <g className={styles.activePinLabelGroup}>
                        <text y="-14" textAnchor="middle" className={styles.pinTextShadow}>
                          {getPinDisplayName(pin)}
                        </text>
                        <text y="-14" textAnchor="middle" className={styles.pinText}>
                          {getPinDisplayName(pin)}
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
                  <strong>{getDistrictDisplayName(hoveredDistrict)}</strong>{' '}
                  ({hoveredDistrict.division} {t('divisionName', 'Division')})
                </span>
              ) : selectedDistrict ? (
                <span>
                  <MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  {t('selectedDistrict', 'Selected')}: <strong>{getDistrictDisplayName(selectedDistrict)}</strong>
                </span>
              ) : (
                <span className={styles.hintText}>
                  <Info size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  {t('mapSub', 'Click any district or destination pin to explore')}
                </span>
              )}
            </div>

            {(selectedDistrictId || activeCategory !== 'all' || activeDivision !== 'all') && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={handleResetFilters}
                title={t('resetMap', 'Reset Map View')}
              >
                <X size={12} /> {t('resetMap', 'Reset Map View')}
              </button>
            )}
          </div>
        </div>

        {/* Selected Destination / District Preview Card (Stationary) */}
        <div className={styles.previewPanel}>
          {/* If a District is selected, show District Explorer Banner */}
          {selectedDistrict && (
            <div className={styles.districtCard}>
              <div className={styles.districtCardHeader}>
                <div>
                  <span className={styles.districtEyebrow}>
                    {selectedDistrict.division} {t('divisionName', 'Division')}
                  </span>
                  <h4 className={styles.districtTitle}>
                    {getDistrictDisplayName(selectedDistrict)} {t('districtName', 'District')}
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
                        onClick={() => setSelectedPinId(PROJECTED_DESTINATIONS.find(pin => pin.slug === dest.slug)?.id || null)}
                      >
                        {language === 'mr' ? dest.marathiName || dest.name : dest.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className={styles.noDestText}>
                  {t('noDestinationsInDistrict', 'No major listed destinations in this district yet. Check regional circuits!')}
                </p>
              )}
            </div>
          )}

          {/* Active Destination Card */}
          {!matchedDestination && !selectedDistrict && (
            <p className={styles.noDestText}>No published destinations yet. Add and publish places in the admin dashboard to populate this map.</p>
          )}
          {matchedDestination && (
            <div className={styles.destinationCard}>
              <div className={styles.cardMedia}>
                <img
                  src={matchedDestination.thumbnail || matchedDestination.heroImage || '/assets/homepage/hero/raigad-banner.jpg'}
                  alt={matchedDestination.name}
                  className={styles.cardImage}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className={styles.cardCategory}>
                  <Badge variant={matchedDestination.category} size="sm">
                    {t(matchedDestination.category, matchedDestination.category.toUpperCase())}
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

                <h4 className={styles.cardTitle}>
                  {language === 'mr' ? matchedDestination.marathiName || matchedDestination.name : matchedDestination.name}
                </h4>
                {language !== 'mr' && matchedDestination.marathiName && (
                  <p className={styles.cardMarathi}>{matchedDestination.marathiName}</p>
                )}
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
