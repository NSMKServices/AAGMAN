import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { DESTINATIONS } from '../../data/destinations';
import styles from './MaharashtraMap.module.css';

// Geographically calibrated pins on an 800x600 SVG canvas representing Maharashtra
const MAP_PINS = [
  // Konkan & Mumbai Region
  { id: "raigad", slug: "raigad", name: "Raigad Fort", category: "forts", district: "Raigad", x: 250, y: 350 },
  { id: "kashid", slug: "kashid", name: "Kashid Beach", category: "beaches", district: "Raigad", x: 230, y: 330 },
  { id: "murud-janjira", slug: "murud-janjira", name: "Murud-Janjira", category: "forts", district: "Raigad", x: 225, y: 355 },
  { id: "elephanta-caves", slug: "elephanta-caves", name: "Elephanta Caves", category: "heritage", district: "Mumbai", x: 235, y: 300 },
  { id: "csmt-station", slug: "csmt-station", name: "CSMT Mumbai", category: "heritage", district: "Mumbai", x: 220, y: 295 },
  { id: "ganpatipule", slug: "ganpatipule", name: "Ganpatipule Beach", category: "beaches", district: "Ratnagiri", x: 250, y: 440 },
  { id: "sindhudurg", slug: "sindhudurg", name: "Sindhudurg Fort", category: "forts", district: "Sindhudurg", x: 275, y: 520 },
  { id: "tarkarli", slug: "tarkarli", name: "Tarkarli Coral Beach", category: "beaches", district: "Sindhudurg", x: 270, y: 535 },

  // Western Maharashtra / Sahyadris
  { id: "sinhagad", slug: "sinhagad", name: "Sinhagad Fort", category: "forts", district: "Pune", x: 310, y: 350 },
  { id: "rajgad", slug: "rajgad", name: "Rajgad Fort", category: "forts", district: "Pune", x: 300, y: 365 },
  { id: "torna", slug: "torna", name: "Torna Fort", category: "forts", district: "Pune", x: 290, y: 370 },
  { id: "shivneri", slug: "shivneri", name: "Shivneri Fort", category: "forts", district: "Pune", x: 320, y: 280 },
  { id: "lohagad-visapur", slug: "lohagad-visapur", name: "Lohagad Fort", category: "forts", district: "Pune", x: 285, y: 310 },
  { id: "mayureshwar", slug: "mayureshwar", name: "Morgaon (Ashtavinayak)", category: "temples", district: "Pune", x: 365, y: 360 },
  { id: "pratapgad", slug: "pratapgad", name: "Pratapgad Fort", category: "forts", district: "Satara", x: 295, y: 405 },
  { id: "panhala", slug: "panhala", name: "Panhala Fort", category: "forts", district: "Kolhapur", x: 325, y: 485 },
  { id: "pandharpur", slug: "pandharpur", name: "Pandharpur Vitthal Mandir", category: "temples", district: "Solapur", x: 440, y: 420 },

  // North Maharashtra / Khandesh
  { id: "trimbakeshwar", slug: "trimbakeshwar", name: "Trimbakeshwar Jyotirlinga", category: "temples", district: "Nashik", x: 295, y: 220 },
  { id: "kalsubai", slug: "kalsubai", name: "Kalsubai Peak", category: "forts", district: "Ahmednagar", x: 315, y: 245 },
  { id: "harishchandragad", slug: "harishchandragad", name: "Harishchandragad", category: "forts", district: "Ahmednagar", x: 320, y: 260 },
  { id: "shirdi", slug: "shirdi", name: "Shirdi Sai Baba Mandir", category: "temples", district: "Ahmednagar", x: 375, y: 235 },

  // Marathwada
  { id: "ellora-caves", slug: "ellora-caves", name: "Ellora Caves (Kailasa)", category: "heritage", district: "Chhatrapati Sambhajinagar", x: 415, y: 215 },
  { id: "ajanta-caves", slug: "ajanta-caves", name: "Ajanta Caves", category: "heritage", district: "Chhatrapati Sambhajinagar", x: 475, y: 175 }
];

export default function MaharashtraMap({ compact = false }) {
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
          <span className={styles.eyebrow}>Geographical Heritage Atlas</span>
          <h3 className={styles.mapTitle}>Explore Maharashtra Circuit Map</h3>
        </div>

        {/* Category Filter Pills */}
        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Sites
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'forts' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('forts')}
          >
            🏰 Forts
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'temples' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('temples')}
          >
            🛕 Temples
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'beaches' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('beaches')}
          >
            🏖️ Beaches
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === 'heritage' ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory('heritage')}
          >
            🏛️ Heritage
          </button>
        </div>
      </div>

      <div className={styles.mapLayout}>
        {/* SVG Maharashtra Vector Graphic */}
        <div className={styles.svgWrapper}>
          <svg
            viewBox="0 0 820 600"
            className={styles.svgMap}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Map of Maharashtra with interactive destination markers"
          >
            <defs>
              <linearGradient id="mhLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1DF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#F5DFCA" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E3F2FD" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#BBDEFB" stopOpacity="0.4" />
              </linearGradient>
              <filter id="mapShadow" x="-5%" y="-5%" width="115%" height="115%">
                <feDropShadow dx="3" dy="6" stdDeviation="8" floodColor="#722D1B" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Arabian Sea representation */}
            <path
              d="M 50,220 C 120,280 140,400 180,590 L 0,590 L 0,220 Z"
              fill="url(#seaGradient)"
              opacity="0.8"
            />
            <text x="80" y="460" className={styles.seaLabel} transform="rotate(-65 80,460)">
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
              <text x="320" y="380" className={styles.regionText}>WESTERN MAHARASHTRA</text>
              <text x="320" y="190" className={styles.regionText}>KHANDESH</text>
              <text x="460" y="270" className={styles.regionText}>MARATHWADA</text>
              <text x="640" y="260" className={styles.regionText}>VIDARBHA</text>
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
                <span>📍 {matchedDestination.district} District</span>
                <span>⭐ {matchedDestination.rating}</span>
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
                Explore Full Guide & Coordinates →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
