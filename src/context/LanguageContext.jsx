import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    brandSubtitle: "Maharashtra Tourism & Heritage",
    dashboard: "Dashboard",
    exploreDestinations: "Explore Destinations",
    heritageCulture: "Heritage & Culture",
    interactiveMap: "Interactive Map",
    festivals: "Festivals & Events",
    myTrips: "My Trips",
    wishlist: "My Wishlist",
    budgetPlanner: "Budget Planner",
    aiPlanner: "AI Itinerary Planner",
    faq: "Travel FAQ",
    settings: "Settings",
    searchPlaceholder: "Search forts, temples, beaches, heritage caves...",
    welcome: "Welcome to Maharashtra",
    heroTitle: "Discover the Grandeur of Maharashtra",
    heroSubtitle: "Explore historic Maratha hill citadels, sacred pilgrimage shrines, pristine Konkan shores, and ancient rock-cut UNESCO caves.",
    exploreBtn: "Explore Maharashtra",
    planTripBtn: "Plan Custom Itinerary",
    wishlistTitle: "My Wishlist",
    upcomingTrip: "Upcoming Adventure",
    tripBudget: "Trip Budget",
    travelTips: "Today's Travel Tip",
    exploreMapTitle: "Explore Maharashtra Map",
    festivalCalendarTitle: "Cultural Festival Calendar",
    yourItineraryTitle: "Your Saved Itinerary",
    watchMaharashtraTitle: "Watch Maharashtra",
    todaysTipTitle: "Heritage Wisdom & Tip",
    quickLinksTitle: "Quick Resources",
    viewPlan: "View Full Plan",
    knowMore: "Know More",
    allDestinations: "All Destinations",
    forts: "Historic Forts",
    temples: "Sacred Temples",
    beaches: "Konkan Beaches",
    heritage: "UNESCO Caves",
    itemsSaved: "places saved",
    noTripsYet: "No trips planned yet",
    estimatedCost: "Est. Cost",
    duration: "Duration",
    season: "Best Season",
    timings: "Timings",
    entryFee: "Entry Fee",
    addToWishlist: "Save to Wishlist",
    removeFromWishlist: "Saved in Wishlist",
    viewDetails: "View Details →",
    language: "Language",
    theme: "Theme",
    lightMode: "Light Theme",
    darkMode: "Dark Theme"
  },
  mr: {
    brandSubtitle: "महाराष्ट्र पर्यटन आणि वारसा",
    dashboard: "मुख्यपृष्ठ (डॅशबोर्ड)",
    exploreDestinations: "पर्यटन स्थळे शोधा",
    heritageCulture: "वारसा आणि संस्कृती",
    interactiveMap: "महाराष्ट्राचा नकाशा",
    festivals: "सण आणि उत्सव",
    myTrips: "माझ्या सहली",
    wishlist: "माझी आवडती ठिकाणे",
    budgetPlanner: "खर्च अंदाजपत्रक (बजेट)",
    aiPlanner: "स्मार्ट सहल नियोजक",
    faq: "वारंवार विचारले जाणारे प्रश्न",
    settings: "सेटिंग्ज",
    searchPlaceholder: "किल्ले, मंदिरे, समुद्रकिनारे, लेणी शोधा...",
    welcome: "शिवछत्रपतींच्या महाराष्ट्रात आपले स्वागत आहे",
    heroTitle: "भव्य आणि ऐतिहासिक महाराष्ट्राचे दर्शन",
    heroSubtitle: "गर्जा महाराष्ट्र माझा! ऐतिहासिक शिवकालीन दुर्ग, पवित्र तीर्थक्षेत्रे, निळाशार कोकण किनारा आणि अजिंठा-वेरूळची जगप्रसिद्ध लेणी अनुभवा.",
    exploreBtn: "महाराष्ट्र दर्शन",
    planTripBtn: "सहल आखा",
    wishlistTitle: "जतन केलेली ठिकाणे",
    upcomingTrip: "आगामी सहल",
    tripBudget: "सहलीचा खर्च",
    travelTips: "आजचा प्रवास सल्ला",
    exploreMapTitle: "महाराष्ट्राचा परस्परसंवादी नकाशा",
    festivalCalendarTitle: "सांस्कृतिक सण व उत्सव दिनदर्शिका",
    yourItineraryTitle: "तुमचे सहल नियोजन",
    watchMaharashtraTitle: "महाराष्ट्र दर्शन (व्हिडिओ)",
    todaysTipTitle: "वारसा ज्ञान आणि प्रवास टीप",
    quickLinksTitle: "महत्त्वाचे दुवे",
    viewPlan: "संपूर्ण नियोजन पहा",
    knowMore: "अधिक माहिती",
    allDestinations: "सर्व पर्यटन स्थळे",
    forts: "ऐतिहासिक किल्ले",
    temples: "पवित्र मंदिरे",
    beaches: "कोकण समुद्रकिनारे",
    heritage: "युनेस्को वारसा लेणी",
    itemsSaved: "ठिकाणे जतन केली",
    noTripsYet: "सहलीचे नियोजन नाही",
    estimatedCost: "अंदाजे खर्च",
    duration: "कालावधी",
    season: "योग्य हंगाम",
    timings: "वेळ",
    entryFee: "प्रवेश शुल्क",
    addToWishlist: "आवडत्या यादीत जोडा",
    removeFromWishlist: "यादीतून काढा",
    viewDetails: "सविस्तर माहिती →",
    language: "भाषा",
    theme: "थीम",
    lightMode: "प्रकाशित स्वरूप",
    darkMode: "गडद स्वरूप"
  },
  hi: {
    brandSubtitle: "महाराष्ट्र पर्यटन एवं धरोहर",
    dashboard: "डैशबोर्ड",
    exploreDestinations: "पर्यटन स्थल खोजें",
    heritageCulture: "धरोहर एवं संस्कृति",
    interactiveMap: "महाराष्ट्र का नक्शा",
    festivals: "त्योहार एवं उत्सव",
    myTrips: "मेरी यात्राएं",
    wishlist: "पसंदीदा स्थल",
    budgetPlanner: "बजट योजनाकार",
    aiPlanner: "स्मार्ट यात्रा नियोजक",
    faq: "सामान्य प्रश्न",
    settings: "सेटिंग्स",
    searchPlaceholder: "किले, मंदिर, समुद्र तट, प्राचीन गुफाएं खोजें...",
    welcome: "महाराष्ट्र में आपका हार्दिक स्वागत है",
    heroTitle: "गौरवशाली महाराष्ट्र की यात्रा करें",
    heroSubtitle: "छत्रपति शिवाजी महाराज के ऐतिहासिक दुर्ग, पवित्र ज्योतिर्लिंग, सुरम्य कोंकण तट और अजंता-एलोरा की यूनेस्को गुफाओं का अनुभव करें।",
    exploreBtn: "महाराष्ट्र दर्शन",
    planTripBtn: "यात्रा योजना बनाएं",
    wishlistTitle: "मेरी पसंदीदा सूची",
    upcomingTrip: "आगामी यात्रा",
    tripBudget: "यात्रा बजट",
    travelTips: "आज का यात्रा सुझाव",
    exploreMapTitle: "महाराष्ट्र का संवादात्मक नक्शा",
    festivalCalendarTitle: "सांस्कृतिक उत्सव कैलेंडर",
    yourItineraryTitle: "आपकी यात्रा योजना",
    watchMaharashtraTitle: "महाराष्ट्र दर्शन",
    todaysTipTitle: "धरोहर सुझाव",
    quickLinksTitle: "त्वरित लिंक",
    viewPlan: "योजना देखें",
    knowMore: "अधिक जानें",
    allDestinations: "सभी स्थल",
    forts: "ऐतिहासिक किले",
    temples: "पवित्र मंदिर",
    beaches: "कोंकण तट",
    heritage: "यूनेस्को गुफाएं",
    itemsSaved: "स्थान सहेजे गए",
    noTripsYet: "कोई यात्रा नहीं",
    estimatedCost: "अनुमानित खर्च",
    duration: "अवधि",
    season: "उत्तम समय",
    timings: "समय",
    entryFee: "प्रवेश शुल्क",
    addToWishlist: "पसंदीदा में जोड़ें",
    removeFromWishlist: "सूची से हटाएं",
    viewDetails: "विवरण देखें →",
    language: "भाषा",
    theme: "थीम",
    lightMode: "लाइट थीम",
    darkMode: "डार्क थीम"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('aagman_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aagman_lang', language);
      document.documentElement.lang = language;
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [language]);

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
