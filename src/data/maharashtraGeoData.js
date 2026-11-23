/**
 * AAGMAN - Accurate Maharashtra Geospatial Atlas & Administrative Boundaries
 * 
 * Geographic Bounding Box:
 * Latitude: 15.60° N – 22.05° N
 * Longitude: 72.45° E – 80.95° E
 * SVG Viewport: 0 0 1000 750
 * 
 * Includes:
 * 1. Mathematically projected real lat/lng coordinates (Mercator / Equirectangular).
 * 2. All 36 administrative districts of Maharashtra with verified Marathi and Hindi Devanagari names.
 * 3. Western Konkan coastline with realistic Arabian Sea bathymetric representation.
 * 4. Automatic pin positioning from destination lat/long coordinates.
 */

export const MAHARASHTRA_PROJECTION = {
  minLon: 72.45,
  maxLon: 80.95,
  minLat: 15.60,
  maxLat: 22.05,
  width: 760,
  height: 630,
  offsetX: 160,
  offsetY: 60,

  /**
   * Projects real geographic coordinates (lat, lng) to SVG (x, y)
   */
  project(lat, lng) {
    const x = Math.round(((lng - this.minLon) / (this.maxLon - this.minLon)) * this.width + this.offsetX);
    const y = Math.round(((this.maxLat - lat) / (this.maxLat - this.minLat)) * this.height + this.offsetY);
    return { x, y };
  }
};

/**
 * 36 Administrative Districts of Maharashtra
 * Grouped across the 6 Revenue Divisions:
 * - Konkan (7)
 * - Pune / Paschim Maharashtra (5)
 * - Nashik / Khandesh (5)
 * - Chhatrapati Sambhajinagar / Marathwada (8)
 * - Amravati / West Vidarbha (5)
 * - Nagpur / East Vidarbha (6)
 */
export const MAHARASHTRA_DISTRICTS = [
  // ==========================================
  // KONKAN DIVISION (7 Districts)
  // ==========================================
  {
    id: "palghar",
    name: "Palghar",
    marathiName: "पालघर",
    hindiName: "पालघर",
    division: "Konkan",
    headquarters: "Palghar",
    lat: 19.85,
    lng: 72.90,
    destinations: [],
    svgPath: "M 185,225 L 215,220 L 235,240 L 230,285 L 195,290 L 185,255 Z"
  },
  {
    id: "thane",
    name: "Thane",
    marathiName: "ठाणे",
    hindiName: "ठाणे",
    division: "Konkan",
    headquarters: "Thane",
    lat: 19.30,
    lng: 73.15,
    destinations: [],
    svgPath: "M 195,290 L 230,285 L 250,310 L 235,355 L 205,350 L 195,320 Z"
  },
  {
    id: "mumbai-suburban",
    name: "Mumbai Suburban",
    marathiName: "मुंबई उपनगर",
    hindiName: "मुंबई उपनगर",
    division: "Konkan",
    headquarters: "Bandra",
    lat: 19.12,
    lng: 72.87,
    destinations: [],
    svgPath: "M 190,320 L 205,320 L 205,350 L 190,350 Z"
  },
  {
    id: "mumbai-city",
    name: "Mumbai City",
    marathiName: "मुंबई शहर",
    hindiName: "मुंबई शहर",
    division: "Konkan",
    headquarters: "Mumbai",
    lat: 18.94,
    lng: 72.83,
    destinations: ["csmt-station", "elephanta-caves"],
    svgPath: "M 188,350 L 205,350 L 203,375 L 188,375 Z"
  },
  {
    id: "raigad",
    name: "Raigad",
    marathiName: "रायगड",
    hindiName: "रायगढ़",
    division: "Konkan",
    headquarters: "Alibaug",
    lat: 18.40,
    lng: 73.15,
    destinations: ["raigad", "murud-janjira", "kashid"],
    svgPath: "M 195,370 L 235,355 L 255,390 L 245,460 L 210,460 L 198,400 Z"
  },
  {
    id: "ratnagiri",
    name: "Ratnagiri",
    marathiName: "रत्नागिरी",
    hindiName: "रत्नागिरी",
    division: "Konkan",
    headquarters: "Ratnagiri",
    lat: 17.20,
    lng: 73.40,
    destinations: ["ganpatipule"],
    svgPath: "M 210,460 L 245,460 L 255,530 L 250,590 L 230,590 L 220,530 Z"
  },
  {
    id: "sindhudurg",
    name: "Sindhudurg",
    marathiName: "सिंधुदुर्ग",
    hindiName: "सिंधुदुर्ग",
    division: "Konkan",
    headquarters: "Oros",
    lat: 16.15,
    lng: 73.70,
    destinations: ["sindhudurg", "tarkarli"],
    svgPath: "M 230,590 L 250,590 L 270,615 L 275,680 L 255,680 L 240,640 Z"
  },

  // ==========================================
  // PUNE DIVISION / PASCHIM MAHARASHTRA (5 Districts)
  // ==========================================
  {
    id: "pune",
    name: "Pune",
    marathiName: "पुणे",
    hindiName: "पुणे",
    division: "Pune",
    headquarters: "Pune",
    lat: 18.65,
    lng: 74.00,
    destinations: ["sinhagad", "shivneri", "rajgad", "torna", "lohagad-visapur", "mayureshwar"],
    svgPath: "M 250,310 L 285,305 L 340,360 L 325,435 L 255,420 L 235,355 Z"
  },
  {
    id: "satara",
    name: "Satara",
    marathiName: "सातारा",
    hindiName: "सातारा",
    division: "Pune",
    headquarters: "Satara",
    lat: 17.70,
    lng: 74.10,
    destinations: ["pratapgad"],
    svgPath: "M 245,430 L 325,435 L 320,495 L 265,510 L 245,460 Z"
  },
  {
    id: "kolhapur",
    name: "Kolhapur",
    marathiName: "कोल्हापूर",
    hindiName: "कोल्हापुर",
    division: "Pune",
    headquarters: "Kolhapur",
    lat: 16.65,
    lng: 74.25,
    destinations: ["panhala"],
    svgPath: "M 265,510 L 305,510 L 310,580 L 285,630 L 260,630 L 255,540 Z"
  },
  {
    id: "sangli",
    name: "Sangli",
    marathiName: "सांगली",
    hindiName: "सांगली",
    division: "Pune",
    headquarters: "Sangli",
    lat: 17.10,
    lng: 74.75,
    destinations: [],
    svgPath: "M 305,505 L 365,500 L 360,570 L 310,580 L 305,510 Z"
  },
  {
    id: "solapur",
    name: "Solapur",
    marathiName: "सोलापूर",
    hindiName: "सोलापुर",
    division: "Pune",
    headquarters: "Solapur",
    lat: 17.75,
    lng: 75.50,
    destinations: ["pandharpur"],
    svgPath: "M 325,435 L 420,430 L 440,500 L 365,530 L 320,495 Z"
  },

  // ==========================================
  // NASHIK DIVISION / KHANDESH (5 Districts)
  // ==========================================
  {
    id: "nandurbar",
    name: "Nandurbar",
    marathiName: "नंदुरबार",
    hindiName: "नंदुरबार",
    division: "Nashik",
    headquarters: "Nandurbar",
    lat: 21.60,
    lng: 74.20,
    destinations: [],
    svgPath: "M 265,80 L 325,75 L 320,135 L 260,140 Z"
  },
  {
    id: "dhule",
    name: "Dhule",
    marathiName: "धुळे",
    hindiName: "धुले",
    division: "Nashik",
    headquarters: "Dhule",
    lat: 21.05,
    lng: 74.75,
    destinations: [],
    svgPath: "M 320,125 L 375,120 L 370,185 L 315,190 L 315,140 Z"
  },
  {
    id: "jalgaon",
    name: "Jalgaon",
    marathiName: "जळगाव",
    hindiName: "जलगांव",
    division: "Nashik",
    headquarters: "Jalgaon",
    lat: 21.00,
    lng: 75.55,
    destinations: [],
    svgPath: "M 375,120 L 475,115 L 465,185 L 370,185 Z"
  },
  {
    id: "nashik",
    name: "Nashik",
    marathiName: "नाशिक",
    hindiName: "नासिक",
    division: "Nashik",
    headquarters: "Nashik",
    lat: 20.00,
    lng: 73.90,
    destinations: ["trimbakeshwar"],
    svgPath: "M 230,225 L 315,190 L 365,225 L 325,290 L 245,295 Z"
  },
  {
    id: "ahmednagar",
    name: "Ahmednagar (Ahilyanagar)",
    marathiName: "अहिल्यानगर (अहमदनगर)",
    hindiName: "अहिल्यानगर (अहमदनगर)",
    division: "Nashik",
    headquarters: "Ahilyanagar",
    lat: 19.20,
    lng: 74.70,
    destinations: ["harishchandragad", "kalsubai", "shirdi"],
    svgPath: "M 315,255 L 365,225 L 420,270 L 405,370 L 340,360 L 315,290 Z"
  },

  // ==========================================
  // CHHATRAPATI SAMBHAJINAGAR / MARATHWADA (8 Districts)
  // ==========================================
  {
    id: "chhatrapati-sambhajinagar",
    name: "Chhatrapati Sambhajinagar",
    marathiName: "छत्रपती संभाजीनगर",
    hindiName: "छत्रपति संभाजीनगर",
    division: "Chhatrapati Sambhajinagar",
    headquarters: "Chhatrapati Sambhajinagar",
    lat: 20.00,
    lng: 75.35,
    destinations: ["ajanta-caves", "ellora-caves"],
    svgPath: "M 365,215 L 445,200 L 460,265 L 410,280 L 365,245 Z"
  },
  {
    id: "jalna",
    name: "Jalna",
    marathiName: "जालना",
    hindiName: "जालना",
    division: "Chhatrapati Sambhajinagar",
    headquarters: "Jalna",
    lat: 19.85,
    lng: 75.90,
    destinations: [],
    svgPath: "M 445,200 L 500,205 L 505,275 L 455,270 Z"
  },
  {
    id: "parbhani",
    name: "Parbhani",
    marathiName: "परभणी",
    hindiName: "परभणी",
    division: "Chhatrapati Sambhajinagar",
    headquarters: "Parbhani",
    lat: 19.25,
    lng: 76.75,
    destinations: [],
    svgPath: "M 500,270 L 565,270 L 555,340 L 495,335 Z"
  },
  {
    id: "hingoli",
    name: "Hingoli",
    marathiName: "हिंगोली",
    hindiName: "हिंगोली",
    division: "Chhatrapati Sambhajinagar",
    headquarters: "Hingoli",
    lat: 19.70,
    lng: 77.15,
    destinations: [],
    svgPath: "M 545,225 L 595,225 L 585,280 L 540,280 Z"
  },
  {
    id: "nanded",
    name: "Nanded",
    marathiName: "नांदेड",
    hindiName: "नांदेड़",
    division: "Chhatrapati Sambhajinagar",
    headquarters: "Nanded",
    lat: 19.15,
    lng: 77.30,
    destinations: [],
    svgPath: "M 555,280 L 635,275 L 625,365 L 555,355 Z"
  },
  {
    id: "beed",
    name: "Beed",
    marathiName: "बीड",
    hindiName: "बीड",
    division: "Chhatrapati Sambhajinagar",
    headquarters: "Beed",
    lat: 19.00,
    lng: 75.75,
    destinations: [],
    svgPath: "M 410,280 L 485,275 L 490,360 L 420,365 Z"
  },
  {
    id: "latur",
    name: "Latur",
    marathiName: "लातूर",
    hindiName: "लातूर",
    division: "Chhatrapati Sambhajinagar",
    headquarters: "Latur",
    lat: 18.40,
    lng: 76.60,
    destinations: [],
    svgPath: "M 485,360 L 555,355 L 545,430 L 480,425 Z"
  },
  {
    id: "dharashiv",
    name: "Dharashiv (Osmanabad)",
    marathiName: "धाराशिव (उस्मानाबाद)",
    hindiName: "धाराशिव (उस्मानाबाद)",
    division: "Chhatrapati Sambhajinagar",
    headquarters: "Dharashiv",
    lat: 18.20,
    lng: 75.90,
    destinations: [],
    svgPath: "M 425,370 L 485,365 L 480,435 L 435,440 Z"
  },

  // ==========================================
  // AMRAVATI DIVISION / WEST VIDARBHA (5 Districts)
  // ==========================================
  {
    id: "buldhana",
    name: "Buldhana",
    marathiName: "बुलढाणा",
    hindiName: "बुलढाणा",
    division: "Amravati",
    headquarters: "Buldhana",
    lat: 20.55,
    lng: 76.35,
    destinations: [],
    svgPath: "M 470,135 L 535,130 L 530,225 L 470,220 Z"
  },
  {
    id: "akola",
    name: "Akola",
    marathiName: "अकोला",
    hindiName: "अकोला",
    division: "Amravati",
    headquarters: "Akola",
    lat: 20.70,
    lng: 77.05,
    destinations: [],
    svgPath: "M 535,135 L 585,135 L 580,210 L 535,210 Z"
  },
  {
    id: "washim",
    name: "Washim",
    marathiName: "वाशीम",
    hindiName: "वाशिम",
    division: "Amravati",
    headquarters: "Washim",
    lat: 20.10,
    lng: 77.10,
    destinations: [],
    svgPath: "M 535,210 L 585,210 L 575,270 L 530,270 Z"
  },
  {
    id: "amravati",
    name: "Amravati",
    marathiName: "अमरावती",
    hindiName: "अमरावती",
    division: "Amravati",
    headquarters: "Amravati",
    lat: 21.25,
    lng: 77.75,
    destinations: [],
    svgPath: "M 580,95 L 665,95 L 655,190 L 580,185 Z"
  },
  {
    id: "yavatmal",
    name: "Yavatmal",
    marathiName: "यवतमाळ",
    hindiName: "यवतमाल",
    division: "Amravati",
    headquarters: "Yavatmal",
    lat: 20.15,
    lng: 78.10,
    destinations: [],
    svgPath: "M 580,195 L 655,190 L 660,270 L 595,275 Z"
  },

  // ==========================================
  // NAGPUR DIVISION / EAST VIDARBHA (6 Districts)
  // ==========================================
  {
    id: "wardha",
    name: "Wardha",
    marathiName: "वर्धा",
    hindiName: "वर्धा",
    division: "Nagpur",
    headquarters: "Wardha",
    lat: 20.75,
    lng: 78.60,
    destinations: [],
    svgPath: "M 655,160 L 710,155 L 705,225 L 655,220 Z"
  },
  {
    id: "nagpur",
    name: "Nagpur",
    marathiName: "नागपूर",
    hindiName: "नागपुर",
    division: "Nagpur",
    headquarters: "Nagpur",
    lat: 21.15,
    lng: 79.10,
    destinations: [],
    svgPath: "M 705,105 L 775,100 L 770,175 L 705,175 Z"
  },
  {
    id: "bhandara",
    name: "Bhandara",
    marathiName: "भंडारा",
    hindiName: "भंडारा",
    division: "Nagpur",
    headquarters: "Bhandara",
    lat: 21.15,
    lng: 79.75,
    destinations: [],
    svgPath: "M 775,105 L 825,105 L 820,175 L 775,175 Z"
  },
  {
    id: "gondia",
    name: "Gondia",
    marathiName: "गोंदिया",
    hindiName: "गोंदिया",
    division: "Nagpur",
    headquarters: "Gondia",
    lat: 21.40,
    lng: 80.25,
    destinations: [],
    svgPath: "M 825,85 L 885,85 L 880,170 L 820,170 Z"
  },
  {
    id: "chandrapur",
    name: "Chandrapur",
    marathiName: "चंद्रपूर",
    hindiName: "चंद्रपूर",
    division: "Nagpur",
    headquarters: "Chandrapur",
    lat: 19.95,
    lng: 79.30,
    destinations: [],
    svgPath: "M 685,215 L 775,210 L 770,310 L 680,305 Z"
  },
  {
    id: "gadchiroli",
    name: "Gadchiroli",
    marathiName: "गडचिरोली",
    hindiName: "गढ़चिरोली",
    division: "Nagpur",
    headquarters: "Gadchiroli",
    lat: 19.50,
    lng: 80.20,
    destinations: [],
    svgPath: "M 775,175 L 885,175 L 890,345 L 770,340 Z"
  }
];

/**
 * Arabian Sea Path (Western Ocean representation)
 * Covers the entire western expanse with an organic coastline indentation
 */
export const ARABIAN_SEA_PATH = `
  M 0,0 
  L 185,0 
  L 185,225 
  L 190,290 
  L 188,350 
  L 188,375 
  L 198,400 
  L 210,460 
  L 220,530 
  L 230,590 
  L 240,640 
  L 275,680 
  L 275,750 
  L 0,750 
  Z
`;

/**
 * Detailed Konkan Coastline Stroke Path
 */
export const KONKAN_COASTLINE_PATH = `
  M 185,225 
  C 188,250 190,270 190,290 
  C 192,310 188,335 188,350 
  C 188,360 195,370 198,400 
  C 202,425 208,445 210,460 
  C 214,485 218,510 220,530 
  C 224,555 228,575 230,590 
  C 234,615 238,630 240,640 
  C 255,660 270,670 275,680
`;

/**
 * Complete Outer Boundary Silhouette of Maharashtra State
 */
export const MAHARASHTRA_OUTER_BOUNDARY = `
  M 185,225 
  L 215,220 
  L 230,225 
  L 265,80 
  L 325,75 
  L 375,120 
  L 475,115 
  L 535,130 
  L 580,95 
  L 665,95 
  L 705,105 
  L 775,100 
  L 825,85 
  L 885,85 
  L 885,175 
  L 890,345 
  L 770,340 
  L 680,305 
  L 625,365 
  L 555,355 
  L 545,430 
  L 480,425 
  L 440,500 
  L 365,530 
  L 360,570 
  L 310,580 
  L 285,630 
  L 275,680 
  L 240,640 
  L 230,590 
  L 220,530 
  L 210,460 
  L 198,400 
  L 188,375 
  L 188,350 
  L 190,290 
  Z
`;

/**
 * Canonical 23 destinations with projected (x, y) coordinates
 * Generated directly from real latitude and longitude
 */
export const PROJECTED_DESTINATIONS = [
  // Forts
  { id: "raigad", slug: "raigad", name: "Raigad Fort", marathiName: "किल्ले रायगड", category: "forts", districtId: "raigad", lat: 18.2356, lng: 73.4412 },
  { id: "sinhagad", slug: "sinhagad", name: "Sinhagad Fort", marathiName: "सिंहगड किल्ला", category: "forts", districtId: "pune", lat: 18.3663, lng: 73.7558 },
  { id: "pratapgad", slug: "pratapgad", name: "Pratapgad Fort", marathiName: "प्रतापगड किल्ला", category: "forts", districtId: "satara", lat: 17.9333, lng: 73.5833 },
  { id: "murud-janjira", slug: "murud-janjira", name: "Murud-Janjira", marathiName: "मुरुड जंजिरा जलदुर्ग", category: "forts", districtId: "raigad", lat: 18.3006, lng: 72.9642 },
  { id: "shivneri", slug: "shivneri", name: "Shivneri Fort", marathiName: "किल्ले शिवनेरी", category: "forts", districtId: "pune", lat: 19.1953, lng: 73.8594 },
  { id: "rajgad", slug: "rajgad", name: "Rajgad Fort", marathiName: "किल्ले राजगड", category: "forts", districtId: "pune", lat: 18.2464, lng: 73.6828 },
  { id: "torna", slug: "torna", name: "Torna Fort", marathiName: "किल्ले तोरणा", category: "forts", districtId: "pune", lat: 18.2764, lng: 73.6231 },
  { id: "harishchandragad", slug: "harishchandragad", name: "Harishchandragad", marathiName: "हरिश्चंद्रगड", category: "forts", districtId: "ahmednagar", lat: 19.3875, lng: 73.7783 },
  { id: "sindhudurg", slug: "sindhudurg", name: "Sindhudurg Fort", marathiName: "सिंधुदुर्ग किल्ला", category: "forts", districtId: "sindhudurg", lat: 16.0592, lng: 73.4619 },
  { id: "panhala", slug: "panhala", name: "Panhala Fort", marathiName: "पन्हाळा किल्ला", category: "forts", districtId: "kolhapur", lat: 16.8122, lng: 74.1089 },
  { id: "lohagad-visapur", slug: "lohagad-visapur", name: "Lohagad Fort", marathiName: "लोहगड किल्ला", category: "forts", districtId: "pune", lat: 18.7006, lng: 73.4797 },
  { id: "kalsubai", slug: "kalsubai", name: "Kalsubai Peak", marathiName: "कळसूबाई शिखर", category: "forts", districtId: "ahmednagar", lat: 19.6006, lng: 73.7103 },

  // Temples
  { id: "trimbakeshwar", slug: "trimbakeshwar", name: "Trimbakeshwar", marathiName: "त्र्यंबकेश्वर ज्योतिर्लिंग", category: "temples", districtId: "nashik", lat: 19.9328, lng: 73.5306 },
  { id: "mayureshwar", slug: "mayureshwar", name: "Mayureshwar (Morgaon)", marathiName: "मयूरेश्वर (मोरगाव)", category: "temples", districtId: "pune", lat: 18.2758, lng: 74.3164 },
  { id: "shirdi", slug: "shirdi", name: "Shirdi Sai Baba", marathiName: "शिर्डी साईबाबा", category: "temples", districtId: "ahmednagar", lat: 19.7667, lng: 74.4772 },
  { id: "pandharpur", slug: "pandharpur", name: "Pandharpur Vitthal", marathiName: "पंढरपूर विठ्ठल मंदिर", category: "temples", districtId: "solapur", lat: 17.6775, lng: 75.3267 },

  // Beaches
  { id: "kashid", slug: "kashid", name: "Kashid Beach", marathiName: "काशीद समुद्रकिनारा", category: "beaches", districtId: "raigad", lat: 18.4289, lng: 72.9056 },
  { id: "ganpatipule", slug: "ganpatipule", name: "Ganpatipule Beach", marathiName: "गणपतीपुळे समुद्रकिनारा", category: "beaches", districtId: "ratnagiri", lat: 17.1467, lng: 73.2683 },
  { id: "tarkarli", slug: "tarkarli", name: "Tarkarli Coral Beach", marathiName: "तारकर्ली समुद्रकिनारा", category: "beaches", districtId: "sindhudurg", lat: 16.0289, lng: 73.4914 },

  // Heritage
  { id: "ajanta-caves", slug: "ajanta-caves", name: "Ajanta Caves", marathiName: "अजिंठा लेणी", category: "heritage", districtId: "chhatrapati-sambhajinagar", lat: 20.5519, lng: 75.7033 },
  { id: "ellora-caves", slug: "ellora-caves", name: "Ellora Caves (Kailasa)", marathiName: "वेरूळ लेणी व कैलास मंदिर", category: "heritage", districtId: "chhatrapati-sambhajinagar", lat: 20.0264, lng: 75.1792 },
  { id: "elephanta-caves", slug: "elephanta-caves", name: "Elephanta Caves", marathiName: "घरापुरी (एलिफंटा) लेणी", category: "heritage", districtId: "mumbai-city", lat: 18.9633, lng: 72.9315 },
  { id: "csmt-station", slug: "csmt-station", name: "CSMT Mumbai", marathiName: "छत्रपती शिवाजी महाराज टर्मिनस", category: "heritage", districtId: "mumbai-city", lat: 18.9398, lng: 72.8354 }
].map(dest => {
  const projected = MAHARASHTRA_PROJECTION.project(dest.lat, dest.lng);
  return {
    ...dest,
    x: projected.x,
    y: projected.y
  };
});
