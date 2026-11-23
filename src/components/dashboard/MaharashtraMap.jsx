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
  ArrowRight
} from '../common/Icons';
import { DESTINATIONS } from '../../data/destinations';
import styles from './MaharashtraMap.module.css';

// Geographically calibrated pins representing major tourism clusters across Maharashtra
const MAP_PINS = [
  // Konkan & Mumbai Region
  { id: "raigad", slug: "raigad", name: "Raigad Fort", category: "forts", district: "Raigad", region: "Konkan", x: 260, y: 345 },
  { id: "kashid", slug: "kashid", name: "Kashid Beach", category: "beaches", district: "Raigad", region: "Konkan", x: 235, y: 325 },
  { id: "murud-janjira", slug: "murud-janjira", name: "Murud-Janjira", category: "forts", district: "Raigad", region: "Konkan", x: 230, y: 350 },
  { id: "elephanta-caves", slug: "elephanta-caves", name: "Elephanta Caves", category: "heritage", district: "Mumbai", region: "Konkan", x: 238, y: 295 },
  { id: "csmt-station", slug: "csmt-station", name: "CSMT Mumbai", category: "heritage", district: "Mumbai", region: "Konkan", x: 222, y: 290 },
  { id: "ganpatipule", slug: "ganpatipule", name: "Ganpatipule Beach", category: "beaches", district: "Ratnagiri", region: "Konkan", x: 255, y: 435 },
  { id: "sindhudurg", slug: "sindhudurg", name: "Sindhudurg Fort", category: "forts", district: "Sindhudurg", region: "Konkan", x: 278, y: 510 },
  { id: "tarkarli", slug: "tarkarli", name: "Tarkarli Coral Beach", category: "beaches", district: "Sindhudurg", region: "Konkan", x: 272, y: 525 },

  // Western Maharashtra & Sahyadris
  { id: "sinhagad", slug: "sinhagad", name: "Sinhagad Fort", category: "forts", district: "Pune", region: "Western Maharashtra", x: 315, y: 345 },
  { id: "rajgad", slug: "rajgad", name: "Rajgad Fort", category: "forts", district: "Pune", region: "Western Maharashtra", x: 305, y: 360 },
  { id: "torna", slug: "torna", name: "Torna Fort", category: "forts", district: "Pune", region: "Western Maharashtra", x: 295, y: 365 },
  { id: "shivneri", slug: "shivneri", name: "Shivneri Fort", category: "forts", district: "Pune", region: "Western Maharashtra", x: 325, y: 278 },
  { id: "lohagad-visapur", slug: "lohagad-visapur", name: "Lohagad Fort", category: "forts", district: "Pune", region: "Western Maharashtra", x: 290, y: 308 },
  { id: "mayureshwar", slug: "mayureshwar", name: "Morgaon (Ashtavinayak)", category: "temples", district: "Pune", region: "Western Maharashtra", x: 370, y: 355 },
  { id: "pratapgad", slug: "pratapgad", name: "Pratapgad Fort", category: "forts", district: "Satara", region: "Western Maharashtra", x: 300, y: 400 },
  { id: "panhala", slug: "panhala", name: "Panhala Fort", category: "forts", district: "Kolhapur", region: "Western Maharashtra", x: 330, y: 475 },
  { id: "pandharpur", slug: "pandharpur", name: "Pandharpur Mandir", category: "temples", district: "Solapur", region: "Western Maharashtra", x: 445, y: 415 },

  // North Maharashtra / Khandesh
  { id: "trimbakeshwar", slug: "trimbakeshwar", name: "Trimbakeshwar", category: "temples", district: "Nashik", region: "North Maharashtra", x: 300, y: 218 },
  { id: "kalsubai", slug: "kalsubai", name: "Kalsubai Peak", category: "forts", district: "Ahmednagar", region: "North Maharashtra", x: 320, y: 242 },
  { id: "harishchandragad", slug: "harishchandragad", name: "Harishchandragad", category: "forts", district: "Ahmednagar", region: "North Maharashtra", x: 325, y: 256 },
  { id: "shirdi", slug: "shirdi", name: "Shirdi Sai Baba", category: "temples", district: "Ahmednagar", region: "North Maharashtra", x: 380, y: 232 },

  // Marathwada & Vidarbha
  { id: "ellora-caves", slug: "ellora-caves", name: "Ellora Caves (Kailasa)", category: "heritage", district: "Chhatrapati Sambhajinagar", region: "Marathwada", x: 420, y: 212 },
  { id: "ajanta-caves", slug: "ajanta-caves", name: "Ajanta Caves", category: "heritage", district: "Chhatrapati Sambhajinagar", region: "Marathwada", x: 480, y: 172 }
];

export default function MaharashtraMap() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPin, setSelectedPin] = useState(MAP_PINS[0]);

  const filteredPins = activeCategory === 'all'
    ? MAP_PINS
    : MAP_PINS.filter(p => p.category === activeCategory);

  const matchedDestination = DESTINATIONS.find(d => d.slug === selectedPin?.slug) || DESTINATIONS[0];

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapHeader}>
        <div>
          <span className={styles.eyebrow}>Interactive Geographic Atlas</span>
          <h3 className={styles.mapTitle}>Explore Maharashtra by Region & Circuit</h3>
          <p className={styles.mapSub}>
            Select markers on the map to inspect regional forts, temples, beaches, and world heritage sanctuaries.
          </p>
        </div>

        {/* Category Filter Pills (Icons only, no emojis) */}
        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Sites ({MAP_PINS.length})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'forts' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('forts')}
          >
            <Castle size={14} /> Forts
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'temples' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('temples')}
          >
            <Landmark size={14} /> Temples
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'beaches' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('beaches')}
          >
            <Umbrella size={14} /> Beaches
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'heritage' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('heritage')}
          >
            <BookOpen size={14} /> Heritage
          </button>
        </div>
      </div>

      <div className={styles.mapLayout}>
        {/* SVG Maharashtra Vector Graphic - Calibrated tight viewport 160 100 660 470 */}
        <div className={styles.svgWrapper}>
          <svg
            viewBox="170 100 645 465"
            className={styles.svgMap}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Map of Maharashtra with interactive destination markers"
          >
            <defs>
              <linearGradient id="mhLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9F0" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#F5DFCA" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F8EBDD" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FFF9F0" stopOpacity="0.1" />
              </linearGradient>
              <filter id="mapShadow" x="-5%" y="-5%" width="115%" height="115%">
                <feDropShadow dx="2" dy="5" stdDeviation="6" floodColor="#541D16" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Coastline indication */}
            <path
              d="M 180,220 C 220,280 230,400 270,555 L 170,555 L 170,220 Z"
              fill="url(#seaGradient)"
              opacity="0.8"
            />
            <text x="180" y="440" className={styles.seaLabel} transform="rotate(-75 180,440)">
              ARABIAN SEA (अरबी समुद्र)
            </text>

            {/* Maharashtra State Polygon Boundary */}
            <path
              d="M 215,190 
                 L 260,150 
                 L 330,130 
                 L 430,110 
                 L 530,125 
                 L 640,110 
                 L 740,140 
                 L 790,210 
                 L 810,310 
                 L 760,400 
                 L 680,450 
                 L 570,470 
                 L 490,520 
                 L 410,540 
                 L 340,570 
                 L 270,555 
                 L 255,470 
                 L 230,370 
                 L 210,310 
                 L 215,190 Z"
              className={styles.statePath}
              filter="url(#mapShadow)"
            />

            {/* Major Regional Zones */}
            <g className={styles.regionLabels}>
              <text x="210" y="380" className={styles.regionKonkan}>KONKAN</text>
              <text x="325" y="380" className={styles.regionText}>WESTERN MAHARASHTRA</text>
              <text x="325" y="195" className={styles.regionText}>KHANDESH</text>
              <text x="465" y="275" className={styles.regionText}>MARATHWADA</text>
              <text x="645" y="265" className={styles.regionText}>VIDARBHA</text>
            </g>

            {/* Interactive Pins */}
            {filteredPins.map((pin) => {
              const isSelected = selectedPin?.id === pin.id;
              return (
                <g
                  key={pin.id}
                  transform={`translate(${pin.x}, ${pin.y})`}
                  className={`${styles.pinGroup} ${isSelected ? styles.selectedPin : ''}`}
                  onClick={() => setSelectedPin(pin)}
                  cursor="pointer"
                >
                  <circle
                    r={isSelected ? 14 : 9}
                    className={`${styles.pinPulse} ${styles[pin.category]}`}
                  />
                  <circle
                    r={isSelected ? 8 : 6}
                    className={`${styles.pinDot} ${styles[pin.category]}`}
                  />
                  {isSelected && (
                    <text y="-14" textAnchor="middle" className={styles.pinLabel}>
                      {pin.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Destination Details Preview Box */}
        {matchedDestination && (
          <div className={styles.previewBox}>
            <div className={styles.previewImageWrapper}>
              <img
                src={matchedDestination.thumbnail || matchedDestination.heroImage}
                alt={matchedDestination.name}
                className={styles.previewImage}
              />
              <span className={styles.previewCategory}>
                <Badge variant={matchedDestination.category} size="sm">
                  {matchedDestination.category.toUpperCase()}
                </Badge>
              </span>
            </div>

            <div className={styles.previewInfo}>
              <div className={styles.previewMeta}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={13} color="var(--color-secondary)" /> {matchedDestination.district} District • {matchedDestination.region}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={13} color="var(--color-accent)" style={{ fill: 'var(--color-accent)' }} /> {matchedDestination.rating}
                </span>
              </div>
              <h4 className={styles.previewTitle}>{matchedDestination.name}</h4>
              <p className={styles.previewMarathi}>{matchedDestination.marathiName}</p>
              <p className={styles.previewSummary}>{matchedDestination.summary}</p>
              
              <div className={styles.previewDetailsRow}>
                <div>
                  <span className={styles.detailLabel}>Elevation / Circuit:</span>
                  <span className={styles.detailValue}>
                    {matchedDestination.elevation || matchedDestination.circuit}
                  </span>
                </div>
                <div>
                  <span className={styles.detailLabel}>Best Season:</span>
                  <span className={styles.detailValue}>{matchedDestination.bestTime}</span>
                </div>
              </div>

              <Link
                to={`/${matchedDestination.category}/${matchedDestination.slug}`}
                className={styles.exploreBtn}
              >
                <span>Explore Full Guide & Coordinates</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
