import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import SectionHeader from '../components/common/SectionHeader';
import Destination3DGallery from '../components/home/Destination3DGallery';
import MaharashtraMap from '../components/dashboard/MaharashtraMap';
import {
  Compass,
  Castle,
  Landmark,
  Umbrella,
  BookOpen,
  Mountain,
  Trees,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Route,
  Wallet,
  Play,
  ExternalLink,
  Shield,
  Utensils,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Info
} from '../components/common/Icons';
import { CURATED_VIDEOS } from '../data/videos';
import { useLanguage } from '../context/LanguageContext';
import { contentService } from '../services/contentService';
import styles from './HomePage.module.css';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=85",
    tag: "DISCOVER MAHARASHTRA",
    title: "Discover Maharashtra, Your Way",
    subtitle: "Explore destinations, heritage, coastlines and festivals added by the AAGMAN team."
  }
];

const HERO_TRANSLATIONS = [
  {
    tagMr: "महाराष्ट्राचा शोध घ्या",
    tagHi: "महाराष्ट्र की खोज करें",
    titleMr: "आपल्या पद्धतीने महाराष्ट्र अनुभवावा",
    titleHi: "महाराष्ट्र को अपने अंदाज़ में जानें",
    subtitleMr: "AAGMAN टीमने जोडलेली पर्यटनस्थळे, वारसा, समुद्रकिनारे आणि उत्सव शोधा.",
    subtitleHi: "AAGMAN टीम द्वारा जोड़े गए पर्यटन स्थलों, विरासत, समुद्र तटों और त्योहारों को देखें।"
  }
];

const DISCOVERY_CATEGORIES = [
  {
    title: "Historic Forts",
    marathi: "गड-किल्ले", hindi: "ऐतिहासिक किले",
    count: "350+ Sites",
    description: "Impregnable Sahyadri hill citadels & coastal sea fortresses of the Marathas.",
    path: "/forts",
    icon: Castle,
    tag: "Citadels"
  },
  {
    title: "Sacred Temples",
    marathi: "तीर्थक्षेत्रे", hindi: "पवित्र तीर्थस्थल",
    count: "5 Jyotirlingas",
    description: "Trimbakeshwar, Ashtavinayak, Pandharpur Vitthal & ancient sacred sanctums.",
    path: "/temples",
    icon: Landmark,
    tag: "Pilgrimage"
  },
  {
    title: "Konkan Beaches",
    marathi: "सागरकिनारे", hindi: "समुद्र तट",
    count: "720 km Coast",
    description: "Pristine white sand bays, coastal forts, scuba reefs & quiet fishing coves.",
    path: "/beaches",
    icon: Umbrella,
    tag: "Coastal"
  },
  {
    title: "UNESCO Heritage",
    marathi: "जागतिक वारसा", hindi: "विश्व धरोहर",
    count: "5 World Sites",
    description: "Ajanta Buddhist murals, Ellora monolithic Kailasa, and Elephanta rock art.",
    path: "/heritage",
    icon: BookOpen,
    tag: "Monuments"
  },
  {
    title: "Hill Stations",
    marathi: "थंड हवेची ठिकाणे", hindi: "हिल स्टेशन",
    count: "Sahyadri Retreats",
    description: "Mahabaleshwar, Matheran, Panchgani, Amboli & Chikhaldara plateau vistas.",
    path: "/explore?category=hills",
    icon: Mountain,
    tag: "Highlands"
  },
  {
    title: "Nature & Wildlife",
    marathi: "वन्यजीव व निसर्ग", hindi: "वन्यजीव और प्रकृति",
    count: "6 National Parks",
    description: "Tadoba tiger reserve, Kaas flower valley, Koyna sanctuary & dense forests.",
    path: "/explore?category=wildlife",
    icon: Trees,
    tag: "Wildlife"
  },
  {
    title: "Festivals & Events",
    marathi: "उत्सव व परंपरा", hindi: "त्योहार और परंपराएँ",
    count: "Year-Round",
    description: "Ganeshotsav, Shiv Jayanti, Pandharpur Wari & Ellora classical arts festivals.",
    path: "/festivals",
    icon: Sparkles,
    tag: "Culture"
  },
  {
    title: "Cultural Traditions",
    marathi: "संस्कृती व वारसा", hindi: "संस्कृति और विरासत",
    count: "Living Heritage",
    description: "Warli tribal art, Paithani silk weaving, Powada ballads & culinary masteries.",
    path: "/heritage-culture",
    icon: Compass,
    tag: "Tradition"
  }
];

const SUGGESTED_CIRCUITS = [
  {
    id: "maratha-imperial",
    name: "The Maratha Imperial Fort Circuit",
    route: "Pune → Sinhagad → Rajgad → Raigad → Pratapgad",
    duration: "4 Days / 3 Nights",
    pace: "Active Trekking",
    budget: "₹8,500 – ₹14,000",
    highlights: ["Shivaji Maharaj coronation site", "Sunrise over Sahyadri cloud-sea", "Authentic village Pithla Bhakri"]
  },
  {
    id: "konkan-coastal",
    name: "The Golden Konkan Coastal Trail",
    route: "Alibaug → Murud-Janjira → Ganpatipule → Tarkarli",
    duration: "5 Days / 4 Nights",
    pace: "Relaxed Coastal",
    budget: "₹12,000 – ₹18,500",
    highlights: ["Undefeated Murud island fort", "Snorkeling at Sindhudurg coral beds", "Sunset at Ganpatipule mandir"]
  },
  {
    id: "caves-jyotirlinga",
    name: "Sacred Jyotirlinga & UNESCO Cave Circuit",
    route: "Nashik → Trimbakeshwar → Shirdi → Ellora → Ajanta",
    duration: "4 Days / 3 Nights",
    pace: "Cultural Exploration",
    budget: "₹7,000 – ₹12,500",
    highlights: ["Godavari holy source darshan", "Monolithic Kailasa rock temple", "Two millennia old Ajanta murals"]
  }
];

// Homepage copy is kept together so every visible section follows the selected language.
const HOME_COPY = {
  en: {
    circuitNames: ["The Maratha Imperial Fort Circuit", "The Golden Konkan Coastal Trail", "Sacred Jyotirlinga & UNESCO Cave Circuit"],
    circuitPaces: ["Active Trekking", "Relaxed Coastal", "Cultural Exploration"],
    circuitHighlights: [["Shivaji Maharaj coronation site", "Sunrise over Sahyadri cloud-sea", "Authentic village Pithla Bhakri"], ["Undefeated Murud island fort", "Snorkeling at Sindhudurg coral beds", "Sunset at Ganpatipule mandir"], ["Godavari holy source darshan", "Monolithic Kailasa rock temple", "Two millennia old Ajanta murals"]],
    circuitRoutes: ["Pune → Sinhagad → Rajgad → Raigad → Pratapgad", "Alibaug → Murud-Janjira → Ganpatipule → Tarkarli", "Nashik → Trimbakeshwar → Shirdi → Ellora → Ajanta"],
    festivalView: "View Details", district: "District", watchEyebrow: "CINEMATIC JOURNEYS", watchTitle: "Watch Maharashtra: Curated Destination Videos", watchSub: "Explore destination films, aerial views and cultural documentaries from across Maharashtra.", watchYoutube: "Watch on YouTube", allVideos: "Explore All Destination Videos",
    categoryTitles: ["Historic Forts", "Sacred Temples", "Konkan Beaches", "UNESCO Heritage", "Hill Stations", "Nature & Wildlife", "Festivals & Events", "Cultural Traditions"],
    categoryCounts: ["350+ Sites", "5 Jyotirlingas", "720 km Coast", "5 World Sites", "Sahyadri Retreats", "6 National Parks", "Year-Round", "Living Heritage"],
    categoryDescriptions: [
      "Sahyadri hill forts and coastal sea fortresses that shaped Maratha history.",
      "Trimbakeshwar, the Ashtavinayak temples, Pandharpur and other sacred places.",
      "Konkan beaches, coastal forts, clear waters and quiet fishing villages.",
      "Ajanta and Ellora caves, Elephanta and Maharashtra’s other heritage landmarks.",
      "Mahabaleshwar, Matheran, Amboli and scenic mountain plateaus.",
      "Tadoba, Kaas, Koyna and the forests and wildlife of Maharashtra.",
      "Ganeshotsav, Shiv Jayanti, Pandharpur Wari and regional celebrations.",
      "Warli art, Paithani weaving, Powada and traditional Maharashtrian food."
    ],
    explore: "Explore", allDestinations: "View all destinations",
    showcaseEyebrow: "CURATED SHOWCASE", cultureEyebrow: "EXPEDITIONS & TRADITIONS",
    cultureTitle: "Festivals & Cultural Celebrations",
    cultureSub: "Discover living traditions, seasonal festivals and travel routes across Maharashtra.",
    livingTraditions: "LIVING TRADITIONS", festivalCalendar: "Cultural Festival Calendar", allFestivals: "All Festivals",
    expeditionBlueprints: "EXPEDITION BLUEPRINTS", recommendedCircuits: "Recommended Travel Circuits", openPlanner: "Open Planner",
    route: "Route:", estimatedBudget: "Estimated Budget:", customizePlan: "Customize Plan",
    viewDetails: "View Details", culturalSignificance: "Cultural Significance:", keyHighlights: "Key Highlights:", celebrationGallery: "Celebration Gallery:",
    notableFeatures: "Notable Features:", district: "District", exploreDestination: "Explore Destination",
    savedWishlist: "Saved in Wishlist", addWishlist: "Add to Wishlist", planJourney: "Plan Journey Here",
    previousSlide: "Previous slide", nextSlide: "Next slide"
  },
  mr: {
    circuitNames: ["मराठा साम्राज्याचा किल्ले पर्यटन मार्ग","सुवर्ण कोकण किनारपट्टी सहल","पवित्र ज्योतिर्लिंग आणि युनेस्को लेणी सहल"],
    circuitPaces: ["सक्रिय गडभ्रमंती","निवांत किनारी सहल","सांस्कृतिक भ्रमंती"],
    circuitHighlights: [["शिवाजी महाराजांच्या राज्याभिषेकाचे स्थळ","सह्याद्रीच्या पर्वतरांगांवरील सूर्योदय","पारंपरिक पिठलं-भाकरीचा आस्वाद"],["अभेद्य मुरुड जलदुर्ग","सिंधुदुर्ग परिसरातील स्नॉर्केलिंग","गणपतीपुळे मंदिराजवळील सूर्यास्त"],["गोदावरीच्या उगमस्थानी दर्शन","एकाश्म कैलास मंदिर","दोन हजार वर्षांपूर्वीची अजिंठा चित्रकला"]],
    circuitRoutes: ["पुणे → सिंहगड → राजगड → रायगड → प्रतापगड","अलिबाग → मुरुड-जंजिरा → गणपतीपुळे → तारकर्ली","नाशिक → त्र्यंबकेश्वर → शिर्डी → वेरूळ → अजिंठा"],
    festivalView: "माहिती पहा", district: "जिल्हा",
    watchEyebrow: "चित्रमय महाराष्ट्र", watchTitle: "महाराष्ट्र दर्शन: निवडक पर्यटन व्हिडिओ", watchSub: "महाराष्ट्रातील पर्यटन स्थळे, संस्कृती आणि वारशाचे हवाई दृश्य व माहितीपट अनुभवा.", watchYoutube: "YouTube वर पहा", allVideos: "सर्व पर्यटन व्हिडिओ पहा",
    categoryTitles: ["ऐतिहासिक किल्ले", "पवित्र मंदिरे", "कोकणातील समुद्रकिनारे", "जागतिक वारसा स्थळे", "थंड हवेची ठिकाणे", "निसर्ग आणि वन्यजीव", "सण आणि उत्सव", "सांस्कृतिक परंपरा"],
    categoryCounts: ["३५०+ स्थळे", "५ ज्योतिर्लिंगे", "७२० कि.मी. किनारपट्टी", "५ जागतिक वारसा स्थळे", "सह्याद्रीची निसर्गरम्य ठिकाणे", "६ राष्ट्रीय उद्याने", "वर्षभर उत्सव", "जिवंत सांस्कृतिक वारसा"],
    categoryDescriptions: [
      "सह्याद्रीतील डोंगरी किल्ले आणि मराठ्यांच्या इतिहासाचे साक्षीदार असलेले सागरी दुर्ग.",
      "त्र्यंबकेश्वर, अष्टविनायक, पंढरपूर आणि महाराष्ट्रातील इतर पवित्र तीर्थक्षेत्रे.",
      "कोकणचे समुद्रकिनारे, सागरी किल्ले, स्वच्छ पाणी आणि शांत मासेमारी गावे.",
      "अजिंठा-वेरूळ लेणी, घारापुरी आणि महाराष्ट्रातील इतर ऐतिहासिक वारसास्थळे.",
      "महाबळेश्वर, माथेरान, आंबोली आणि निसर्गरम्य पर्वतीय पठारे.",
      "ताडोबा, कास, कोयना तसेच महाराष्ट्रातील जंगले आणि वन्यजीव.",
      "गणेशोत्सव, शिवजयंती, पंढरपूरची वारी आणि विविध प्रादेशिक उत्सव.",
      "वारली चित्रकला, पैठणी विणकाम, पोवाडे आणि महाराष्ट्रीय खाद्यपरंपरा."
    ],
    explore: "पहा", allDestinations: "सर्व पर्यटन स्थळे पहा",
    showcaseEyebrow: "निवडक पर्यटन स्थळे", cultureEyebrow: "सहली आणि परंपरा",
    cultureTitle: "सण आणि सांस्कृतिक उत्सव",
    cultureSub: "महाराष्ट्रातील जिवंत परंपरा, ऋतूनुसार साजरे होणारे सण आणि पर्यटन मार्ग अनुभवा.",
    livingTraditions: "जिवंत परंपरा", festivalCalendar: "सांस्कृतिक उत्सव दिनदर्शिका", allFestivals: "सर्व उत्सव",
    expeditionBlueprints: "सहल मार्ग", recommendedCircuits: "शिफारस केलेले पर्यटन मार्ग", openPlanner: "सहल नियोजक उघडा",
    route: "मार्ग:", estimatedBudget: "अंदाजित खर्च:", customizePlan: "सहल सानुकूलित करा",
    viewDetails: "अधिक माहिती", culturalSignificance: "सांस्कृतिक महत्त्व:", keyHighlights: "मुख्य वैशिष्ट्ये:", celebrationGallery: "उत्सव छायाचित्रे:",
    notableFeatures: "प्रमुख वैशिष्ट्ये:", district: "जिल्हा", exploreDestination: "पर्यटन स्थळ पहा",
    savedWishlist: "आवडत्या यादीत जतन केले", addWishlist: "आवडत्या यादीत जोडा", planJourney: "येथे सहल आखा",
    previousSlide: "मागील स्लाइड", nextSlide: "पुढील स्लाइड"
  },
  hi: {
    circuitNames: ["मराठा साम्राज्य किला यात्रा मार्ग","स्वर्णिम कोंकण तटीय यात्रा","पवित्र ज्योतिर्लिंग और यूनेस्को गुफा यात्रा"],
    circuitPaces: ["सक्रिय किले की पदयात्रा","आरामदायक तटीय यात्रा","सांस्कृतिक भ्रमण"],
    circuitHighlights: [["शिवाजी महाराज के राज्याभिषेक का स्थल","सह्याद्रि पर्वतमाला पर सूर्योदय","पारंपरिक पिठला-भाकरी का स्वाद"],["अजेय मुरुड समुद्री किला","सिंधुदुर्ग के पास स्नॉर्कलिंग","गणपतिपुले मंदिर के पास सूर्यास्त"],["गोदावरी के उद्गम पर दर्शन","एकाश्म कैलास मंदिर","दो हजार वर्ष पुरानी अजंता चित्रकला"]],
    circuitRoutes: ["पुणे → सिंहगढ़ → राजगढ़ → रायगढ़ → प्रतापगढ़","अलीबाग → मुरुड-जंजीरा → गणपतिपुले → तारकर्ली","नासिक → त्र्यंबकेश्वर → शिर्डी → एलोरा → अजंता"],
    festivalView: "विवरण देखें", district: "जिला",
    watchEyebrow: "महाराष्ट्र की सिनेमाई यात्रा", watchTitle: "महाराष्ट्र देखें: चुनिंदा पर्यटन वीडियो", watchSub: "महाराष्ट्र के पर्यटन स्थलों, संस्कृति और विरासत के हवाई दृश्य तथा वृत्तचित्र देखें।", watchYoutube: "YouTube पर देखें", allVideos: "सभी पर्यटन वीडियो देखें",
    categoryTitles: ["ऐतिहासिक किले", "पवित्र मंदिर", "कोंकण के समुद्र तट", "विश्व धरोहर स्थल", "हिल स्टेशन", "प्रकृति और वन्यजीव", "त्योहार और आयोजन", "सांस्कृतिक परंपराएँ"],
    categoryCounts: ["350+ स्थल", "5 ज्योतिर्लिंग", "720 किमी तटरेखा", "5 विश्व धरोहर स्थल", "सह्याद्रि के पर्वतीय स्थल", "6 राष्ट्रीय उद्यान", "वर्ष भर उत्सव", "जीवंत सांस्कृतिक विरासत"],
    categoryDescriptions: [
      "सह्याद्रि के पहाड़ी किले और मराठा इतिहास के साक्षी समुद्री दुर्ग।",
      "त्र्यंबकेश्वर, अष्टविनायक, पंढरपुर और महाराष्ट्र के अन्य पवित्र तीर्थ।",
      "कोंकण के समुद्र तट, तटीय किले, स्वच्छ जल और शांत मछुआरा गाँव।",
      "अजंता-एलोरा की गुफाएँ, एलीफेंटा और महाराष्ट्र के अन्य ऐतिहासिक धरोहर स्थल।",
      "महाबलेश्वर, माथेरान, अंबोली और सुंदर पर्वतीय पठार।",
      "ताडोबा, कास, कोयना तथा महाराष्ट्र के वन और वन्यजीव।",
      "गणेशोत्सव, शिव जयंती, पंढरपुर वारी और क्षेत्रीय उत्सव।",
      "वारली कला, पैठणी बुनाई, पोवाड़ा और पारंपरिक महाराष्ट्रीय भोजन।"
    ],
    explore: "देखें", allDestinations: "सभी पर्यटन स्थल देखें",
    showcaseEyebrow: "चयनित पर्यटन स्थल", cultureEyebrow: "यात्राएँ और परंपराएँ",
    cultureTitle: "त्योहार और सांस्कृतिक उत्सव",
    cultureSub: "महाराष्ट्र की जीवंत परंपराओं, मौसमी त्योहारों और यात्रा मार्गों को जानें।",
    livingTraditions: "जीवंत परंपराएँ", festivalCalendar: "सांस्कृतिक त्योहार कैलेंडर", allFestivals: "सभी त्योहार",
    expeditionBlueprints: "यात्रा योजनाएँ", recommendedCircuits: "अनुशंसित यात्रा मार्ग", openPlanner: "योजना खोलें",
    route: "मार्ग:", estimatedBudget: "अनुमानित बजट:", customizePlan: "योजना अनुकूलित करें",
    viewDetails: "विवरण देखें", culturalSignificance: "सांस्कृतिक महत्व:", keyHighlights: "मुख्य विशेषताएँ:", celebrationGallery: "उत्सव चित्रावली:",
    notableFeatures: "मुख्य विशेषताएँ:", district: "जिला", exploreDestination: "पर्यटन स्थल देखें",
    savedWishlist: "पसंदीदा सूची में सहेजा", addWishlist: "पसंदीदा सूची में जोड़ें", planJourney: "यहाँ यात्रा की योजना बनाएँ",
    previousSlide: "पिछली स्लाइड", nextSlide: "अगली स्लाइड"
  }
};

const TRAVEL_GUIDE_COPY = {
  en: { eyebrow: "TRAVEL WISDOM", title: "Plan Your Journey: Field Guide & Etiquette", subtitle: "Essential seasonal timelines, mountain trekking sanctity, culinary traditions, and 24x7 state tourist helplines.", cards: [
    { title: "Best Seasons to Visit", items: [["Monsoon (Jun – Sep):", "Sahyadri waterfalls, mist-draped ghats, and lush hill treks (Sinhagad, Rajgad, Malshej)."], ["Winter (Oct – Feb):", "Clear skies and cool weather ideal for fort expeditions and heritage cave exploration."], ["Coastal (Nov – Apr):", "Calm seas for scuba diving at Tarkarli and quiet Konkan beach retreats."]] },
    { title: "Fort & Trekking Sanctity", items: [["Sacred Ground:", "Maharashtra fortresses are sacred historical monuments. Respect memorial shrines and temples."], ["Leave No Trace:", "Carry all plastic and waste back. Protect natural cisterns (Devtaki) from pollution."], ["Local Guides:", "Hire certified village guides in base villages (Gunjawane, Velhe, Donje) to support rural livelihoods."]] },
    { title: "Authentic Local Cuisine", items: [["Ghat Cuisine:", "Steaming hot Pithla Bhakri with fiery Thecha (crushed green chillies) and fresh dahi."], ["Konkan Coast:", "Fresh Surmai fish curry, Tisrya (clams), Rice Bhakri, and digestive Solkadhi."], ["Festive Delights:", "Ukadiche Modak (steamed rice-coconut sweets) and puran poli with ghee."]] },
    { title: "Safety & Regulations", items: [["Early Ascents:", "Start high-altitude fort treks by 06:00 AM to avoid midday heat in the Western Ghats."], ["ASI Permits:", "Cave monuments at Ajanta, Ellora, and Elephanta close on specific weekdays (Tuesdays / Mondays)."], ["24/7 Helpline:", "MTDC Tourist Support: 1800-229-930 | Emergency Services: 112."]] }
  ] },
  mr: { eyebrow: "प्रवास मार्गदर्शन", title: "तुमच्या सहलीचे नियोजन: मार्गदर्शक आणि शिष्टाचार", subtitle: "भेट देण्याचे योग्य ऋतू, गडभ्रमंतीचे नियम, स्थानिक खाद्यसंस्कृती आणि चोवीस तास उपलब्ध पर्यटन मदत क्रमांक.", cards: [
    { title: "भेट देण्यासाठी सर्वोत्तम ऋतू", items: [["पावसाळा (जून – सप्टेंबर):", "सह्याद्रीतील धबधबे, धुक्याने वेढलेले घाट आणि हिरवाईने नटलेले सिंहगड, राजगड व माळशेज येथील डोंगरमार्ग."], ["हिवाळा (ऑक्टोबर – फेब्रुवारी):", "स्वच्छ आकाश आणि आल्हाददायक हवामानामुळे किल्ले व ऐतिहासिक लेणी पाहण्यासाठी उत्तम काळ."], ["किनारपट्टी (नोव्हेंबर – एप्रिल):", "तारकर्ली येथे स्कूबा डायव्हिंगसाठी अनुकूल समुद्र आणि कोकणातील निवांत समुद्रकिनारे."]] },
    { title: "किल्ले आणि गडभ्रमंतीचे नियम", items: [["पवित्र ऐतिहासिक स्थळे:", "महाराष्ट्रातील किल्ले ही पवित्र ऐतिहासिक स्मारके आहेत. समाधीस्थळे आणि मंदिरांचा आदर राखा."], ["स्वच्छता राखा:", "प्लास्टिक व इतर कचरा परत घेऊन जा. नैसर्गिक देवटाक्यांचे प्रदूषणापासून संरक्षण करा."], ["स्थानिक मार्गदर्शक:", "ग्रामीण रोजगाराला हातभार लावण्यासाठी गुंजवणे, वेल्हे आणि डोणजे येथील प्रमाणित स्थानिक मार्गदर्शकांची मदत घ्या."]] },
    { title: "महाराष्ट्राची अस्सल खाद्यसंस्कृती", items: [["घाटमाथ्यावरील खाद्यपदार्थ:", "गरमागरम पिठलं-भाकरी, तिखट ठेचा आणि ताजे दही यांचा आस्वाद घ्या."], ["कोकण किनारपट्टी:", "सुरमईचे कालवण, तिसऱ्या, तांदळाची भाकरी आणि पाचक सोलकढी चाखा."], ["सणासुदीचे पदार्थ:", "उकडीचे मोदक आणि तुपासह पुरणपोळीचा आस्वाद घ्या."]] },
    { title: "सुरक्षा आणि नियम", items: [["पहाटेची चढाई:", "पश्चिम घाटातील दुपारचे ऊन टाळण्यासाठी उंच किल्ल्यांची चढाई सकाळी ६ वाजेपूर्वी सुरू करा."], ["ASI प्रवेश नियम:", "अजिंठा, वेरूळ आणि एलिफंटा येथील लेणी काही ठरावीक वारांना बंद असतात; भेटीपूर्वी अधिकृत वेळापत्रक तपासा."], ["२४ तास मदत क्रमांक:", "MTDC पर्यटन सहाय्य: 1800-229-930 | आपत्कालीन सेवा: 112."]] }
  ] },
  hi: { eyebrow: "यात्रा मार्गदर्शन", title: "अपनी यात्रा की योजना: मार्गदर्शिका और शिष्टाचार", subtitle: "यात्रा के उपयुक्त मौसम, किले की पदयात्रा के नियम, स्थानीय खानपान और चौबीसों घंटे उपलब्ध पर्यटन सहायता।", cards: [
    { title: "यात्रा के लिए सर्वोत्तम मौसम", items: [["मानसून (जून – सितंबर):", "सह्याद्रि के झरने, धुंध से ढके घाट और सिंहगढ़, राजगढ़ तथा मालशेज की हरी-भरी पहाड़ी यात्राएँ।"], ["सर्दियाँ (अक्टूबर – फरवरी):", "किलों और ऐतिहासिक गुफाओं की यात्रा के लिए साफ आसमान और सुहावना मौसम।"], ["तटीय मौसम (नवंबर – अप्रैल):", "तारकरली में स्कूबा डाइविंग के लिए शांत समुद्र और कोंकण के सुकून भरे समुद्र तट।"]] },
    { title: "किले और पदयात्रा के नियम", items: [["पवित्र ऐतिहासिक स्थल:", "महाराष्ट्र के किले पवित्र ऐतिहासिक स्मारक हैं। समाधि स्थलों और मंदिरों का सम्मान करें।"], ["स्वच्छता बनाए रखें:", "प्लास्टिक और अन्य कचरा वापस ले जाएँ। प्राकृतिक जलकुंडों (देवटाकी) को प्रदूषण से बचाएँ।"], ["स्थानीय गाइड:", "ग्रामीण आजीविका को समर्थन देने के लिए गुंजवणे, वेल्हे और डोंजे के प्रमाणित स्थानीय गाइड लें।"]] },
    { title: "महाराष्ट्र का पारंपरिक खानपान", items: [["घाट क्षेत्र का भोजन:", "गरम पिठला-भाकरी, तीखी ठेचा चटनी और ताज़े दही का स्वाद लें।"], ["कोंकण तट:", "सुरमई मछली की करी, तिसऱ्या (सीप), चावल की भाकरी और सोलकढ़ी का आनंद लें।"], ["त्योहारों के पकवान:", "उकड़ीचे मोदक और घी के साथ पूरन पोली का स्वाद लें।"]] },
    { title: "सुरक्षा और नियम", items: [["सुबह की चढ़ाई:", "पश्चिमी घाट की दोपहर की गर्मी से बचने के लिए ऊँचे किलों की चढ़ाई सुबह 6 बजे तक शुरू करें।"], ["ASI प्रवेश नियम:", "अजंता, एलोरा और एलीफेंटा की गुफाएँ कुछ निश्चित दिनों में बंद रहती हैं; जाने से पहले आधिकारिक समय-सारणी जाँचें।"], ["24 घंटे सहायता:", "MTDC पर्यटक सहायता: 1800-229-930 | आपातकालीन सेवा: 112."]] }
  ] }
};

export default function HomePage() {
  const { t, language } = useLanguage();
  const copy = HOME_COPY[language] || HOME_COPY.en;
  const travelGuide = TRAVEL_GUIDE_COPY[language] || TRAVEL_GUIDE_COPY.en;
  const localizedVideo = (video, field) => video[`${field}${language === 'mr' ? 'Mr' : language === 'hi' ? 'Hi' : ''}`] || video[field] || '';
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const unsubscribe = contentService.subscribe(({ destinations: destinationRecords, festivals: festivalRecords }) => {
      setDestinations(destinationRecords);
      setFestivals(festivalRecords);
    });
    contentService.getAllDestinations();
    contentService.getAllFestivals();
    return unsubscribe;
  }, []);

  const featuredCategoryOrder = ['temples', 'forts', 'heritage', 'beaches'];
  const featuredDestinations = destinations
    .filter(item => item.status === 'published' && item.featuredOrder)
    .sort((a, b) => {
      const categoryDifference = featuredCategoryOrder.indexOf(a.category) - featuredCategoryOrder.indexOf(b.category);
      return (categoryDifference < 0 ? 99 : categoryDifference) || Number(a.featuredOrder) - Number(b.featuredOrder);
    });
  const featuredFestivals = festivals
    .filter(item => item.status === 'published' && item.featuredOrder)
    .sort((a, b) => Number(a.featuredOrder) - Number(b.featuredOrder));

  const nextHeroSlide = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevHeroSlide = () => {
    setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentHero = { ...HERO_SLIDES[heroIndex], ...(HERO_TRANSLATIONS[heroIndex] || {}) };

  return (
    <div className={styles.homepageRoot}>
      {/* ========================================================
          SECTION A: LARGE EDITORIAL HERO BANNER
          ======================================================== */}
      <section className={styles.heroBanner}>
        <div className={styles.heroBackground}>
          <img
            src={currentHero.image}
            alt={currentHero[`title${language === 'mr' ? 'Mr' : language === 'hi' ? 'Hi' : ''}`] || currentHero.title}
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <Container className={styles.heroContent}>
          <span className={styles.heroBadge}>
            <Shield size={14} color="var(--color-accent)" />
            <span>{currentHero[`tag${language === 'mr' ? 'Mr' : language === 'hi' ? 'Hi' : ''}`] || currentHero.tag}</span>
          </span>
          <h1 className={styles.heroTitle}>{currentHero.title}</h1>
          <p className={styles.heroSubtitle}>{currentHero[`subtitle${language === 'mr' ? 'Mr' : language === 'hi' ? 'Hi' : ''}`] || currentHero.subtitle}</p>

          <div className={styles.heroActions}>
            <Button to="/explore" variant="primary" size="lg">
              <span>{t('exploreBtn', 'Explore Maharashtra')}</span>
              <ArrowRight size={16} />
            </Button>
            <Button to="/planner" variant="accent" size="lg">
              <span>{t('planTripBtn', 'Plan Custom Itinerary')}</span>
              <Sparkles size={16} />
            </Button>
          </div>

          {/* Carousel Slide Indicators & Controls */}
          <div className={styles.carouselControls}>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={prevHeroSlide}
              aria-label={copy.previousSlide}
            >
              <ChevronLeft size={18} />
            </button>
            <div className={styles.carouselDots}>
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.dot} ${idx === heroIndex ? styles.activeDot : ''}`}
                  onClick={() => setHeroIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={nextHeroSlide}
              aria-label={copy.nextSlide}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION B: QUICK DISCOVERY SHORTCUTS (8 CATEGORIES)
          ======================================================== */}
      <section className={styles.discoverySection}>
        <Container>
          <SectionHeader
            eyebrow={t('explore', 'QUICK DISCOVERY')}
            title={t('exploreByTheme', 'Explore Maharashtra')}
            description={t('exploreByThemeSub', 'From 350+ Maratha fortresses to sacred Jyotirlingas and untouched Konkan waters, choose your experience.')}
          />

          <div className={styles.discoveryGrid}>
            {DISCOVERY_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link key={idx} to={cat.path} className={styles.discoveryCard}>
                  <div className={styles.discHeader}>
                    <div className={styles.discIconBox}>
                      <IconComp size={22} color="var(--color-secondary)" />
                    </div>
                    <span className={styles.discCount}>{(idx === 6 ? festivals.filter(item => item.status === 'published').length : idx === 7 ? 0 : destinations.filter(item => item.status === 'published' && item.category === ['forts', 'temples', 'beaches', 'heritage', 'nature', 'wildlife'][idx]).length) + (idx === 6 ? ' festivals' : ' places')}</span>
                  </div>
                  <h3 className={styles.discTitle}>{copy.categoryTitles[idx]}</h3>
                  <span className={styles.discMarathi}>{language === 'mr' ? cat.marathi : language === 'hi' ? cat.hindi : cat.title}</span>
                  <p className={styles.discDesc}>{copy.categoryDescriptions[idx]}</p>
                  <span className={styles.discAction}>
                    <span>{copy.explore}</span>
                    <ArrowRight size={13} />
                  </span>
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <Button to="/explore" variant="outline" size="md">
              <span>{t('allDestinations', 'View All Destinations')}</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION C: INTERACTIVE MAHARASHTRA MAP
          ======================================================== */}
      <section className={styles.mapSectionWrapper}>
        <Container>
          <SectionHeader
            eyebrow={t('mapEyebrow', 'GEOGRAPHICAL DIRECTORY')}
            title={t('interactiveAtlasTitle', 'Interactive Maharashtra Tourism Map')}
            description={t('interactiveAtlasSub', 'Filter destinations across Western Maharashtra, Konkan, Marathwada, and Vidarbha with detailed location previews.')}
          />
          <MaharashtraMap />
        </Container>
      </section>

      {/* ========================================================
          SECTION D: FEATURED HERITAGE DESTINATIONS
          ======================================================== */}
      <section className={styles.destinationsSection}>
        <Container>
          <SectionHeader
            eyebrow={copy.showcaseEyebrow}
            title={t('featuredDestinations', 'Featured Destinations')}
            description={t('featuredSub', 'Experience Maharashtra\'s most celebrated historic fortresses, monolithic rock temples, and sun-kissed coastlines in interactive 3D.')}
          />

          <Destination3DGallery destinations={featuredDestinations} />
        </Container>
      </section>

      {/* ========================================================
          SECTION E & F: FESTIVALS & TRAVEL CIRCUITS (TWO COLUMNS)
          ======================================================== */}
      <section className={styles.culturePlanningSection}>
        <Container>
          <SectionHeader
            eyebrow={copy.cultureEyebrow}
            title={copy.cultureTitle}
            description={copy.cultureSub}
          />
          <div className={styles.twoColGrid}>
            {/* Column 1: Festivals of Maharashtra */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeaderRow}>
                <div>
                  <span className={styles.subHeading}>{copy.livingTraditions}</span>
                  <h3 className={styles.blockTitle}>{copy.festivalCalendar}</h3>
                </div>
                <Link to="/festivals" className={styles.headerLink}>
                  <span>{copy.allFestivals}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className={styles.festivalList}>
                {featuredFestivals.length === 0 && (
                  <p className={styles.festivalDesc}>No festivals have been featured yet. Add festivals and choose a homepage highlight position in the admin dashboard.</p>
                )}
                {featuredFestivals.slice(0, 5).map((fest) => (
                  <div key={fest.id} className={styles.festivalItem}>
                    <img src={fest.image} alt={fest.name} className={styles.festivalThumb} />
                    <div className={styles.festivalMeta}>
                      <div className={styles.festTimeRow}>
                        <Calendar size={12} color="var(--color-secondary)" />
                        <span className={styles.festivalDate}>{language === "mr" ? fest.datesMr || fest.dates : language === "hi" ? fest.datesHi || fest.dates : fest.dates}</span>
                      </div>
                      <h4 className={styles.festivalName}>{language === "mr" ? fest.marathiName || fest.name : language === "hi" ? fest.nameHi || fest.name : fest.name}</h4>
                      
                      <p className={styles.festivalDesc}>{language === "mr" ? fest.descriptionMr || fest.description : language === "hi" ? fest.descriptionHi || fest.description : fest.description}</p>
                      <div className={styles.festActionRow}>
                        <span className={styles.festLocation}>
                          <MapPin size={12} color="var(--color-text-muted)" /> {language === "mr" ? fest.locationMr || fest.location : language === "hi" ? fest.locationHi || fest.location : fest.location.split('(')[0]}
                        </span>
                        <button
                          type="button"
                          className={styles.knowMoreBtn}
                          onClick={() => setSelectedFestival(fest)}
                        >
                          {copy.festivalView} ↗
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Suggested Travel Circuits */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeaderRow}>
                <div>
                  <span className={styles.subHeading}>{copy.expeditionBlueprints}</span>
                  <h3 className={styles.blockTitle}>{copy.recommendedCircuits}</h3>
                </div>
                <Link to="/planner" className={styles.headerLink}>
                  <span>{copy.openPlanner}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className={styles.circuitsList}>
                {SUGGESTED_CIRCUITS.map((circuit) => (
                  <div key={circuit.id} className={styles.circuitCard}>
                    <div className={styles.circuitTopRow}>
                      <Badge variant="forts" size="sm">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Route size={12} /> {copy.circuitPaces[SUGGESTED_CIRCUITS.indexOf(circuit)]}
                        </span>
                      </Badge>
                      <span className={styles.circuitDuration}>
                        <Clock size={12} /> {circuit.duration}
                      </span>
                    </div>

                    <h4 className={styles.circuitName}>{copy.circuitNames[SUGGESTED_CIRCUITS.indexOf(circuit)]}</h4>
                    <p className={styles.circuitRoute}>
                      <strong>{copy.route}</strong> {copy.circuitRoutes[SUGGESTED_CIRCUITS.indexOf(circuit)]}
                    </p>

                    <ul className={styles.circuitHighlights}>
                      {copy.circuitHighlights[SUGGESTED_CIRCUITS.indexOf(circuit)].map((h, i) => (
                        <li key={i}>
                          <Check size={12} color="var(--color-secondary)" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.circuitFooter}>
                      <div className={styles.budgetGroup}>
                        <span className={styles.budgetLabel}>{copy.estimatedBudget}</span>
                        <strong className={styles.budgetValue}>{circuit.budget}</strong>
                      </div>
                      <Link to="/planner" className={styles.circuitBtn}>
                        <span>{copy.customizePlan}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cultural Decree Card */}
              <div className={styles.decreeBox}>
                <Shield size={24} color="var(--color-accent)" />
                <div>
                  <p className={styles.decreeText}>
                    "गडकोट म्हणजेच राज्य... जसा ज्यास गड, त्याचे तसे राज्य."
                  </p>
                  <span className={styles.decreeCitation}>
                    — रामचंद्रपंत अमात्य (आज्ञापत्र, १६९८)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION G: WATCH MAHARASHTRA (CURATED DESTINATION VIDEOS)
          ======================================================== */}
      <section className={styles.watchSection}>
        <Container>
          <SectionHeader
            eyebrow={copy.watchEyebrow}
            title={copy.watchTitle}
            description={copy.watchSub}
          />

          <div className={styles.videoGrid}>
            {CURATED_VIDEOS.map((video) => (
              <a
                key={video.id}
                href={video.youtubeUrl || video.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoCard}
                title={`Watch ${localizedVideo(video, 'title')} on YouTube`}
              >
                <div className={styles.videoThumbWrapper}>
                  <img
                    src={video.thumbnail}
                    alt={localizedVideo(video, 'title')}
                    className={styles.videoThumb}
                    loading="lazy"
                  />
                  <div className={styles.playIconOverlay}>
                    <Play size={18} color="#FFFFFF" style={{ fill: '#FFFFFF', marginLeft: '2px' }} />
                  </div>
                  <span className={styles.videoDuration}>{video.duration}</span>
                  <span className={styles.ytBadge}>
                    <span>{copy.watchYoutube}</span>
                    <ExternalLink size={12} />
                  </span>
                </div>
                <div className={styles.videoInfo}>
                  <span className={styles.videoCategory}>{localizedVideo(video, 'destination') || t(video.category, video.category)}</span>
                  <h4 className={styles.videoTitle}>{localizedVideo(video, 'title')}</h4>
                  <p className={styles.videoSub}>{localizedVideo(video, 'summary')}</p>
                </div>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <Button to="/videos" variant="outline" size="md">
              <span>{copy.allVideos}</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </Container>
      </section>

      {/* ========================================================
          SECTION H: AUTHENTIC TRAVEL GUIDE & ESSENTIALS
          ======================================================== */}
      <section className={styles.guideSection}>
        <Container>
          <SectionHeader eyebrow={travelGuide.eyebrow} title={travelGuide.title} description={travelGuide.subtitle} />
          <div className={styles.guideGrid}>
            {travelGuide.cards.map((card, index) => {
              const GuideIcon = [Calendar, Shield, Utensils, Info][index];
              return (
                <div className={styles.guideCard} key={card.title}>
                  <div className={styles.guideIconBox}><GuideIcon size={22} color="var(--color-secondary)" /></div>
                  <h3 className={styles.guideCardTitle}>{card.title}</h3>
                  <ul className={styles.guideList}>
                    {card.items.map(([label, description]) => (
                      <li key={label}><strong>{label}</strong> {description}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================
          MODAL: FESTIVAL DETAILS
          ======================================================== */}
      {selectedFestival && (
        <Modal
          isOpen={Boolean(selectedFestival)}
          onClose={() => setSelectedFestival(null)}
          title={selectedFestival.name}
          subtitle={`${selectedFestival.location} • ${selectedFestival.dates}`}
        >
          <img
            src={selectedFestival.image}
            alt={selectedFestival.name}
            style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}
          />
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
            {selectedFestival.marathiName}
          </h4>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>
            {selectedFestival.description}
          </p>
          <div style={{ background: 'var(--color-parchment)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '1rem' }}>
            <strong style={{ display: 'block', color: 'var(--color-secondary)', marginBottom: '0.35rem' }}>{copy.culturalSignificance}</strong>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{language === "mr" ? selectedFestival.significanceMr || selectedFestival.significance : language === "hi" ? selectedFestival.significanceHi || selectedFestival.significance : selectedFestival.significance}</p>
          </div>
          <strong style={{ display: 'block', marginBottom: '0.5rem' }}>{copy.keyHighlights}</strong>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {(language === "mr" ? selectedFestival.highlightsMr || selectedFestival.highlights : language === "hi" ? selectedFestival.highlightsHi || selectedFestival.highlights : selectedFestival.highlights)?.map((h, i) => (
              <li key={i} style={{ marginBottom: '0.25rem', fontSize: '0.9rem' }}>{h}</li>
            ))}
          </ul>

          {(selectedFestival.gallery || []).length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>{copy.celebrationGallery}</strong>
                <code style={{ fontSize: '0.65rem', color: 'var(--color-secondary)' }}>/assets/festivals/{selectedFestival.id}/</code>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                {getFestivalGallery(selectedFestival.id).map((img, i) => (
                  <div key={i} style={{ borderRadius: 'var(--radius-xs)', overflow: 'hidden', border: '1px solid var(--color-border)', background: 'var(--color-surface-elevated)' }}>
                    <div style={{ position: 'relative', width: '100%', height: '90px' }}>
                      <img
                        src={img.src}
                        alt={img.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                        onError={(e) => {
                          if (img.fallback && e.currentTarget.src !== img.fallback) {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = img.fallback;
                          }
                        }}
                      />
                      <span style={{ position: 'absolute', top: 3, right: 3, background: 'rgba(40, 20, 15, 0.85)', color: 'var(--color-accent)', fontSize: '0.55rem', padding: '1px 4px', borderRadius: '2px', fontFamily: 'monospace' }}>
                        {img.slot}.jpg
                      </span>
                    </div>
                    <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.4rem', color: 'var(--color-primary)' }}>
                      {img.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
