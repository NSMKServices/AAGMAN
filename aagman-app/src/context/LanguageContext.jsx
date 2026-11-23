import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Brand & Header
    brandName: "AAGMAN",
    brandSubtitle: "Maharashtra Tourism & Heritage",
    stateMotto: "Jai Jai Maharashtra Majha, Garja Maharashtra Majha",
    officialPlatform: "Official Maharashtra Cultural & Heritage Tourism Platform",

    // Navigation Links & Dropdowns
    home: "Home",
    explore: "Explore",
    destinations: "Destinations",
    forts: "Historic Forts",
    temples: "Sacred Temples",
    beaches: "Konkan Beaches",
    heritage: "UNESCO Caves",
    allDestinations: "All Destinations",
    festivals: "Festivals & Events",
    itineraries: "Travel Circuits",
    circuits: "Signature Circuits",
    planner: "Smart Journey Planner",
    aiPlanner: "AI Itinerary Planner",
    budgetPlanner: "Budget Planner",
    interactiveMap: "Interactive Map",
    videos: "Videos & Experiences",
    about: "About AAGMAN",
    faq: "Travel FAQ & Guidelines",
    contact: "Contact Liaison",
    dashboard: "Traveler Dashboard",
    myTrips: "My Trips",
    wishlist: "My Wishlist",
    settings: "Settings",
    adminPortal: "Admin Portal",
    login: "Sign In",
    register: "Register",
    logout: "Sign Out",
    welcomeUser: "Welcome",
    account: "Account & Profile",

    // Search & Actions
    searchPlaceholder: "Search forts, temples, beaches, heritage caves...",
    searchButton: "Search",
    exploreBtn: "Explore Maharashtra",
    planTripBtn: "Plan Custom Itinerary",
    planThisRoute: "Plan This Route",
    viewDetails: "View Details →",
    exploreFullGuide: "Explore Full Guide & Coordinates",
    addToWishlist: "Save to Wishlist",
    removeFromWishlist: "Saved in Wishlist",
    viewPlan: "View Full Plan",
    knowMore: "Know More",
    itemsSaved: "places saved",
    noTripsYet: "No trips planned yet",
    clearSelection: "Clear Selection",
    resetMap: "Reset Map View",
    filterBy: "Filter by",
    allSites: "All Sites",

    // Hero & Home Section Headings
    welcome: "Welcome to Maharashtra",
    heroTitle: "Discover the Grandeur of Maharashtra",
    heroSubtitle: "Explore historic Maratha hill citadels, sacred pilgrimage shrines, pristine Konkan shores, and ancient rock-cut UNESCO caves.",
    featuredDestinations: "Featured Destinations",
    featuredSub: "Layered visual exploration of Maharashtra's finest heritage monuments and natural sanctuaries.",
    exploreByTheme: "Explore by Heritage Theme",
    exploreByThemeSub: "Immerse in four quintessential pillars of Maharashtrian topography and culture.",
    upcomingFestivals: "Upcoming Cultural Festivals",
    upcomingFestivalsSub: "Experience vibrant folk music, dhol-tasha, traditional culinary feasts, and community devotion.",
    interactiveAtlasTitle: "Interactive Geographic Atlas",
    interactiveAtlasSub: "Pinpoint destinations, inspect 36 administrative districts, and discover curated travel routes across Maharashtra.",
    travelerWisdomTitle: "Heritage Wisdom & Travel Tips",
    quickResourcesTitle: "Quick Resources & Helplines",

    // Map Specific
    mapEyebrow: "Interactive Geographic Atlas",
    mapTitle: "Explore Maharashtra by Region & Circuit",
    mapSub: "Select markers or districts on the map to inspect regional forts, temples, beaches, and world heritage sanctuaries.",
    arabianSea: "ARABIAN SEA",
    arabianSeaLocal: "ARABIAN SEA (अरबी समुद्र)",
    konkanRegion: "KONKAN",
    westernMhRegion: "WESTERN MAHARASHTRA",
    khandeshRegion: "KHANDESH (NORTH MAHARASHTRA)",
    marathwadaRegion: "MARATHWADA",
    vidarbhaRegion: "VIDARBHA",
    selectedDistrict: "Selected District",
    districtName: "District",
    divisionName: "Division",
    headquarters: "Headquarters",
    destinationsInDistrict: "Attractions in this district",
    noDestinationsInDistrict: "No major listed destinations in this district yet. Check regional circuits!",
    elevation: "Elevation / Circuit",
    bestSeason: "Best Season",
    timings: "Timings",
    entryFee: "Entry Fee",
    difficulty: "Difficulty",
    rating: "Rating",
    category: "Category",
    region: "Region",

    // Travel Circuits
    circuitKonkanTitle: "Konkan Coastal & Sea Forts Circuit",
    circuitKonkanDesc: "Cruise the pristine Arabian Sea coastline, visit impregnable island fortresses, dive in coral reefs at Tarkarli, and savor authentic Malvani cuisine with Solkadhi.",
    circuitSahyadriTitle: "Sahyadri High Trekking Citadels",
    circuitSahyadriDesc: "Walk the footsteps of Chhatrapati Shivaji Maharaj across the dramatic ridges, cliff-edge bastions, and cloud-veiled plateaus of the Western Ghats.",
    circuitUnescoTitle: "UNESCO World Heritage Rock-Cut Trail",
    circuitUnescoDesc: "Marvel at 1,500-year-old Buddhist frescoes at Ajanta, the world's largest monolithic rock excavation at Ellora Cave 16, and the medieval defenses of Daulatabad.",
    circuitPilgrimageTitle: "Sacred Jyotirlinga & Devasthan Circuit",
    circuitPilgrimageDesc: "A transformative spiritual yatra through Maharashtra's holiest shrines, river ghats of the Godavari, and ancient Hemadpanthi basalt sanctuaries.",
    curatedRoadTrips: "Curated Road Trips",
    signatureCircuitsTitle: "Signature Maharashtra Travel Circuits",
    signatureCircuitsSub: "Seamless itineraries connecting iconic destinations by road and rail across the state.",
    keyStops: "Key Stops",
    bestTimeToVisit: "Best Time to Visit",

    // Category Names & Subtitles
    fortsTitle: "Historic Forts of Maharashtra",
    fortsSubtitle: "Centuries of Maratha chivalry etched into the cliffs of the Sahyadri mountains.",
    templesTitle: "Sacred Temples & Pilgrimages",
    templesSubtitle: "Millennia of devotion, ancient Hemadpanthi architecture, and sacred river ghats.",
    beachesTitle: "Konkan Coastal Beaches",
    beachesSubtitle: "720 kilometers of untouched golden sands, palm fronds, and azure Arabian waters.",
    heritageTitle: "UNESCO Caves & Heritage Monuments",
    heritageSubtitle: "Masterpieces of rock-cut architecture, Buddhist frescoes, and royal palaces.",

    // Dashboard & Planning
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
    estimatedCost: "Est. Cost",
    duration: "Duration",
    season: "Best Season",

    // 36 Districts (English)
    district_ahmednagar: "Ahmednagar (Ahilyanagar)",
    district_akola: "Akola",
    district_amravati: "Amravati",
    district_aurangabad: "Chhatrapati Sambhajinagar",
    district_beed: "Beed",
    district_bhandara: "Bhandara",
    district_buldhana: "Buldhana",
    district_chandrapur: "Chandrapur",
    district_dhule: "Dhule",
    district_gadchiroli: "Gadchiroli",
    district_gondia: "Gondia",
    district_hingoli: "Hingoli",
    district_jalgaon: "Jalgaon",
    district_jalna: "Jalna",
    district_kolhapur: "Kolhapur",
    district_latur: "Latur",
    district_mumbai_city: "Mumbai City",
    district_mumbai_suburban: "Mumbai Suburban",
    district_nagpur: "Nagpur",
    district_nanded: "Nanded",
    district_nandurbar: "Nandurbar",
    district_nashik: "Nashik",
    district_dharashiv: "Dharashiv (Osmanabad)",
    district_palghar: "Palghar",
    district_parbhani: "Parbhani",
    district_pune: "Pune",
    district_raigad: "Raigad",
    district_ratnagiri: "Ratnagiri",
    district_sangli: "Sangli",
    district_satara: "Satara",
    district_sindhudurg: "Sindhudurg",
    district_solapur: "Solapur",
    district_thane: "Thane",
    district_wardha: "Wardha",
    district_washim: "Washim",
    district_yavatmal: "Yavatmal",

    // Helplines & Footer
    helplineTitle: "Helplines & Assistance",
    mtdcHelpline: "MTDC Tourist Helpline",
    emergencyHelpline: "Emergency Response",
    sahyadriRescue: "Sahyadri Trekker Rescue",
    contactTourismLiaison: "Contact Tourism Liaison →",
    copyright: "Official Maharashtra Cultural & Heritage Tourism Platform. Preserving and promoting the royal history, cultural heritage, and natural wonders of Maharashtra.",
    rightsReserved: "All Rights Reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    language: "Language",
    theme: "Theme",
    lightMode: "Light Theme",
    darkMode: "Dark Theme"
  },

  mr: {
    // Brand & Header
    brandName: "आगमन",
    brandSubtitle: "महाराष्ट्र पर्यटन आणि वारसा",
    stateMotto: "जय जय महाराष्ट्र माझा, गर्जा महाराष्ट्र माझा",
    officialPlatform: "अधिकृत महाराष्ट्र सांस्कृतिक व वारसा पर्यटन मंच",

    // Navigation Links & Dropdowns
    home: "मुख्यपृष्ठ",
    explore: "पर्यटन दर्शन",
    destinations: "पर्यटन स्थळे",
    forts: "ऐतिहासिक किल्ले",
    temples: "पवित्र मंदिरे",
    beaches: "कोकण समुद्रकिनारे",
    heritage: "युनेस्को वारसा लेणी",
    allDestinations: "सर्व पर्यटन स्थळे",
    festivals: "सण आणि उत्सव",
    itineraries: "पर्यटन मार्ग (सर्किट्स)",
    circuits: "विशेष सहल मार्ग",
    planner: "स्मार्ट सहल नियोजक",
    aiPlanner: "एआय सहल नियोजक",
    budgetPlanner: "खर्च अंदाजपत्रक",
    interactiveMap: "महाराष्ट्राचा नकाशा",
    videos: "व्हिडिओ आणि अनुभव",
    about: "आगमन बद्दल",
    faq: "प्रवास मार्गदर्शक व प्रश्न",
    contact: "पर्यटन संपर्क",
    dashboard: "पर्यटक डॅशबोर्ड",
    myTrips: "माझ्या सहली",
    wishlist: "माझी आवडती ठिकाणे",
    settings: "सेटिंग्ज",
    adminPortal: "प्रशासक कक्ष",
    login: "लॉग इन",
    register: "नोंदणी करा",
    logout: "बाहेर पडा",
    welcomeUser: "स्वागत",
    account: "खाते व माहिती",

    // Search & Actions
    searchPlaceholder: "किल्ले, मंदिरे, समुद्रकिनारे, प्राचीन लेणी शोधा...",
    searchButton: "शोधा",
    exploreBtn: "महाराष्ट्र दर्शन",
    planTripBtn: "सहल आखा",
    planThisRoute: "हा मार्ग निवडा",
    viewDetails: "सविस्तर माहिती →",
    exploreFullGuide: "संपूर्ण माहिती व नकाशे पहा",
    addToWishlist: "आवडत्या यादीत जोडा",
    removeFromWishlist: "यादीतून काढा",
    viewPlan: "संपूर्ण नियोजन पहा",
    knowMore: "अधिक माहिती",
    itemsSaved: "ठिकाणे जतन केली",
    noTripsYet: "सहलीचे नियोजन नाही",
    clearSelection: "निवड रद्द करा",
    resetMap: "नकाशा पूर्ववत करा",
    filterBy: "वर्गीकरण",
    allSites: "सर्व स्थळे",

    // Hero & Home Section Headings
    welcome: "शिवछत्रपतींच्या महाराष्ट्रात आपले स्वागत आहे",
    heroTitle: "भव्य आणि ऐतिहासिक महाराष्ट्राचे दर्शन",
    heroSubtitle: "गर्जा महाराष्ट्र माझा! ऐतिहासिक शिवकालीन दुर्ग, पवित्र तीर्थक्षेत्रे, निळाशार कोकण किनारा आणि अजिंठा-वेरूळची जगप्रसिद्ध लेणी अनुभवा.",
    featuredDestinations: "वैशिष्ट्यपूर्ण पर्यटन स्थळे",
    featuredSub: "महाराष्ट्राच्या उत्कृष्ट वारसा स्मारके आणि निसर्ग पर्यटनाचे 3D दर्शन.",
    exploreByTheme: "वारसा प्रकारानुसार पर्यटन",
    exploreByThemeSub: "महाराष्ट्राच्या चार प्रमुख सांस्कृतिक आणि भौगोलिक स्तंभांचा अनुभव घ्या.",
    upcomingFestivals: "आगामी सांस्कृतिक सण व उत्सव",
    upcomingFestivalsSub: "ढोल-ताशांचा गजर, लोककला, पारंपारिक मेजवानी आणि सामुदायिक भक्तीचा अपूर्व सोहळा.",
    interactiveAtlasTitle: "महाराष्ट्राचा भौगोलिक नकाशा",
    interactiveAtlasSub: "महाराष्ट्रातील 36 जिल्ह्यांमधील किल्ले, समुद्रकिनारे, मंदिरे आणि लेणी शोधा.",
    travelerWisdomTitle: "वारसा ज्ञान आणि प्रवास टीप",
    quickResourcesTitle: "महत्त्वाचे दुवे आणि मदत क्रमांक",

    // Map Specific
    mapEyebrow: "परस्परसंवादी भौगोलिक नकाशा",
    mapTitle: "विभाग आणि मार्गानुसार महाराष्ट्र दर्शन",
    mapSub: "विभागीय किल्ले, मंदिरे, समुद्रकिनारे आणि जागतिक वारसा स्थळे पाहण्यासाठी नकाशावरील जिल्ह्यावर किंवा चिन्हांवर क्लिक करा.",
    arabianSea: "अरबी समुद्र",
    arabianSeaLocal: "अरबी समुद्र (ARABIAN SEA)",
    konkanRegion: "कोकण",
    westernMhRegion: "पश्चिम महाराष्ट्र",
    khandeshRegion: "खानदेश (उत्तर महाराष्ट्र)",
    marathwadaRegion: "मराठवाडा",
    vidarbhaRegion: "विदर्भ",
    selectedDistrict: "निवडलेला जिल्हा",
    districtName: "जिल्हा",
    divisionName: "विभाग",
    headquarters: "मुख्यालय",
    destinationsInDistrict: "या जिल्ह्यातील प्रमुख पर्यटन स्थळे",
    noDestinationsInDistrict: "या जिल्ह्यात सध्या सूचीबद्ध प्रमुख स्थळे उपलब्ध नाहीत. प्रादेशिक सर्किट्स पहा!",
    elevation: "उंची / सर्किट",
    bestSeason: "उत्तम हंगाम",
    timings: "वेळ",
    entryFee: "प्रवेश शुल्क",
    difficulty: "काठीण्य पातळी",
    rating: "दर्जा",
    category: "प्रवर्ग",
    region: "विभाग",

    // Travel Circuits
    circuitKonkanTitle: "कोकण सागरी किनारा आणि जलदुर्ग सर्किट",
    circuitKonkanDesc: "निळ्याशार अरबी समुद्राच्या किनाऱ्यावरून प्रवास, अजिंक्य जलदुर्ग, तारकर्ली येथील प्रवाळ दर्शन आणि अस्सल मालवणी सोलकढीचा आस्वाद.",
    circuitSahyadriTitle: "सह्याद्री गडकोट आणि दुर्ग भ्रमंती सर्किट",
    circuitSahyadriDesc: "छत्रपती शिवाजी महाराजांच्या पदस्पर्शाने पावन झालेले कडे, बुरुज, माच्या आणि सह्याद्रीच्या उंच पर्वतरांगांचा थरारक अनुभव.",
    circuitUnescoTitle: "युनेस्को जागतिक वारसा प्राचीन लेणी सर्किट",
    circuitUnescoDesc: "अजिंठ्यातील १५०० वर्षे जुनी भित्तीचित्रे, वेरूळमधील जगातील सर्वात मोठे एकसंध कैलास मंदिर आणि दौलताबादचा अभेद्य किल्ला.",
    circuitPilgrimageTitle: "पवित्र ज्योतिर्लिंग आणि देवस्थान सर्किट",
    circuitPilgrimageDesc: "महाराष्ट्रातील पवित्र तीर्थक्षेत्रे, गोदावरीचे पवित्र घाट आणि प्राचीन हेमाडपंथी मंदिरांची अध्यात्मिक वारी.",
    curatedRoadTrips: "नियोजित रस्ते सहली",
    signatureCircuitsTitle: "महाराष्ट्राचे प्रमुख पर्यटन मार्ग",
    signatureCircuitsSub: "रस्ते आणि रेल्वेने जोडलेले राज्यातील प्रमुख पर्यटन स्थळांचे परिपूर्ण नियोजन.",
    keyStops: "महत्त्वाचे थांबे",
    bestTimeToVisit: "भेट देण्यासाठी उत्तम काळ",

    // Category Names & Subtitles
    fortsTitle: "महाराष्ट्राचे ऐतिहासिक किल्ले",
    fortsSubtitle: "सह्याद्रीच्या उत्तुंग कड्यांवर कोरलेला मराठ्यांचा पराक्रमी इतिहास.",
    templesTitle: "पवित्र मंदिरे आणि तीर्थक्षेत्रे",
    templesSubtitle: "शतकानुशतकांची भक्तीपरंपरा, हेमाडपंथी स्थापत्य आणि पवित्र नदीघाट.",
    beachesTitle: "कोकणचा निसर्गरम्य समुद्रकिनारा",
    beachesSubtitle: "७२० किलोमीटरचा विस्तीर्ण सोनेरी वाळूचा किनारा आणि नारळी-सुपारीच्या बागा.",
    heritageTitle: "युनेस्को जागतिक वारसा आणि लेणी",
    heritageSubtitle: "प्राचीन भारतीय पाषाणशिल्पकला, बौद्ध भित्तीचित्रे आणि राजवाडे.",

    // Dashboard & Planning
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
    estimatedCost: "अंदाजे खर्च",
    duration: "कालावधी",
    season: "योग्य हंगाम",

    // 36 Districts (Marathi)
    district_ahmednagar: "अहिल्यानगर (अहमदनगर)",
    district_akola: "अकोला",
    district_amravati: "अमरावती",
    district_aurangabad: "छत्रपती संभाजीनगर",
    district_beed: "बीड",
    district_bhandara: "भंडारा",
    district_buldhana: "बुलढाणा",
    district_chandrapur: "चंद्रपूर",
    district_dhule: "धुळे",
    district_gadchiroli: "गडचिरोली",
    district_gondia: "गोंदिया",
    district_hingoli: "हिंगोली",
    district_jalgaon: "जळगाव",
    district_jalna: "जालना",
    district_kolhapur: "कोल्हापूर",
    district_latur: "लातूर",
    district_mumbai_city: "मुंबई शहर",
    district_mumbai_suburban: "मुंबई उपनगर",
    district_nagpur: "नागपूर",
    district_nanded: "नांदेड",
    district_nandurbar: "नंदुरबार",
    district_nashik: "नाशिक",
    district_dharashiv: "धाराशिव (उस्मानाबाद)",
    district_palghar: "पालघर",
    district_parbhani: "परभणी",
    district_pune: "पुणे",
    district_raigad: "रायगड",
    district_ratnagiri: "रत्नागिरी",
    district_sangli: "सांगली",
    district_satara: "सातारा",
    district_sindhudurg: "सिंधुदुर्ग",
    district_solapur: "सोलापूर",
    district_thane: "ठाणे",
    district_wardha: "वर्धा",
    district_washim: "वाशीम",
    district_yavatmal: "यवतमाळ",

    // Helplines & Footer
    helplineTitle: "मदत कक्ष आणि आपत्कालीन संपर्क",
    mtdcHelpline: "एमटीडीसी पर्यटक मदत कक्ष",
    emergencyHelpline: "आपत्कालीन प्रतिसाद कक्ष",
    sahyadriRescue: "सह्याद्री ट्रेकर्स बचाव पथक",
    contactTourismLiaison: "पर्यटन समन्वयकांशी संपर्क साधा →",
    copyright: "अधिकृत महाराष्ट्र सांस्कृतिक व वारसा पर्यटन मंच. महाराष्ट्राचा शाही इतिहास, वारसा आणि नैसर्गिक वैभवाचे जतन व संवर्धन.",
    rightsReserved: "सर्व हक्क सुरक्षित",
    privacyPolicy: "गोपनीयता धोरण",
    termsOfService: "सेवा अटी",
    language: "भाषा",
    theme: "थीम",
    lightMode: "प्रकाशित स्वरूप",
    darkMode: "गडद स्वरूप"
  },

  hi: {
    // Brand & Header
    brandName: "आगमन",
    brandSubtitle: "महाराष्ट्र पर्यटन एवं धरोहर",
    stateMotto: "जय जय महाराष्ट्र माझा, गर्जा महाराष्ट्र माझा",
    officialPlatform: "आधिकारिक महाराष्ट्र सांस्कृतिक एवं विरासत पर्यटन मंच",

    // Navigation Links & Dropdowns
    home: "मुख्य पृष्ठ",
    explore: "पर्यटन दर्शन",
    destinations: "पर्यटन स्थल",
    forts: "ऐतिहासिक किले",
    temples: "पवित्र मंदिर",
    beaches: "कोंकण समुद्र तट",
    heritage: "यूनेस्को धरोहर गुफाएं",
    allDestinations: "सभी पर्यटन स्थल",
    festivals: "त्योहार एवं उत्सव",
    itineraries: "यात्रा परिपथ (सर्किट्स)",
    circuits: "प्रमुख यात्रा परिपथ",
    planner: "स्मार्ट यात्रा योजनाकार",
    aiPlanner: "एआई यात्रा योजनाकार",
    budgetPlanner: "बजट योजनाकार",
    interactiveMap: "महाराष्ट्र का नक्शा",
    videos: "वीडियो एवं अनुभव",
    about: "आगमन के बारे में",
    faq: "यात्रा दिशानिर्देश एवं प्रश्न",
    contact: "पर्यटन संपर्क",
    dashboard: "पर्यटक डैशबोर्ड",
    myTrips: "मेरी यात्राएं",
    wishlist: "पसंदीदा स्थल",
    settings: "सेटिंग्स",
    adminPortal: "प्रशासक पोर्टल",
    login: "लॉग इन",
    register: "पंजीकरण करें",
    logout: "लॉग आउट",
    welcomeUser: "स्वागत",
    account: "खाता एवं प्रोफाइल",

    // Search & Actions
    searchPlaceholder: "किले, मंदिर, समुद्र तट, प्राचीन गुफाएं खोजें...",
    searchButton: "खोजें",
    exploreBtn: "महाराष्ट्र दर्शन",
    planTripBtn: "यात्रा योजना बनाएं",
    planThisRoute: "यह मार्ग चुनें",
    viewDetails: "विवरण देखें →",
    exploreFullGuide: "सम्पूर्ण मार्गदर्शिका एवं मानचित्र देखें",
    addToWishlist: "पसंदीदा में जोड़ें",
    removeFromWishlist: "सूची से हटाएं",
    viewPlan: "पूरी योजना देखें",
    knowMore: "अधिक जानें",
    itemsSaved: "स्थान सहेजे गए",
    noTripsYet: "कोई यात्रा नियोजित नहीं",
    clearSelection: "चयन साफ़ करें",
    resetMap: "नक्शा रीसेट करें",
    filterBy: "वर्गीकरण",
    allSites: "सभी स्थल",

    // Hero & Home Section Headings
    welcome: "महाराष्ट्र में आपका हार्दिक स्वागत है",
    heroTitle: "गौरवशाली महाराष्ट्र की यात्रा करें",
    heroSubtitle: "छत्रपति शिवाजी महाराज के ऐतिहासिक दुर्ग, पवित्र ज्योतिर्लिंग, सुरम्य कोंकण तट और अजंता-एलोरा की यूनेस्को गुफाओं का अनुभव करें।",
    featuredDestinations: "प्रमुख दर्शनीय स्थल",
    featuredSub: "महाराष्ट्र के ऐतिहासिक स्मारकों और प्राकृतिक सौंदर्य का त्रि-आयामी (3D) दर्शन।",
    exploreByTheme: "थीम के अनुसार पर्यटन",
    exploreByThemeSub: "महाराष्ट्र की संस्कृति और भूगोल के चार प्रमुख स्तंभों का अनुभव करें।",
    upcomingFestivals: "आगामी सांस्कृतिक त्योहार एवं उत्सव",
    upcomingFestivalsSub: "ढोल-ताशे की गूंज, लोक परंपराएं, पारंपरिक खानपान और सामूहिक भक्ति का उत्सव।",
    interactiveAtlasTitle: "महाराष्ट्र का भौगोलिक नक्शा",
    interactiveAtlasSub: "महाराष्ट्र के 36 जिलों में स्थित ऐतिहासिक किले, समुद्र तट, मंदिर और गुफाएं देखें।",
    travelerWisdomTitle: "धरोहर ज्ञान एवं यात्रा सुझाव",
    quickResourcesTitle: "महत्वपूर्ण संसाधन एवं हेल्पलाइन",

    // Map Specific
    mapEyebrow: "संवादात्मक भौगोलिक एटलस",
    mapTitle: "क्षेत्र एवं परिपथ के अनुसार महाराष्ट्र दर्शन",
    mapSub: "किले, मंदिर, समुद्र तट और विश्व धरोहर स्थलों का विवरण देखने के लिए नक्शे पर जिले या मार्कर पर क्लिक करें।",
    arabianSea: "अरब सागर",
    arabianSeaLocal: "अरब सागर (ARABIAN SEA)",
    konkanRegion: "कोंकण",
    westernMhRegion: "पश्चिमी महाराष्ट्र",
    khandeshRegion: "खानदेश (उत्तरी महाराष्ट्र)",
    marathwadaRegion: "मराठवाड़ा",
    vidarbhaRegion: "विदर्भ",
    selectedDistrict: "चयनित जिला",
    districtName: "जिला",
    divisionName: "प्रभाग",
    headquarters: "मुख्यालय",
    destinationsInDistrict: "इस जिले के प्रमुख आकर्षण",
    noDestinationsInDistrict: "इस जिले में वर्तमान में कोई सूचीबद्ध मुख्य स्थल नहीं है। क्षेत्रीय परिपथ देखें!",
    elevation: "ऊंचाई / परिपथ",
    bestSeason: "उत्तम समय",
    timings: "समय",
    entryFee: "प्रवेश शुल्क",
    difficulty: "कठिनाई स्तर",
    rating: "रेटिंग",
    category: "श्रेणी",
    region: "क्षेत्र",

    // Travel Circuits
    circuitKonkanTitle: "कोंकण तटीय एवं सागरी दुर्ग परिपथ",
    circuitKonkanDesc: "अरब सागर के शांत तटों की यात्रा, अभेद्य जलदुर्गों का भ्रमण, तारकर्ली में कोरल रीफ डाइविंग और प्रामाणिक मालवणी व्यंजनों का स्वाद।",
    circuitSahyadriTitle: "सह्याद्रि दुर्ग एवं ट्रेकिंग परिपथ",
    circuitSahyadriDesc: "छत्रपति शिवाजी महाराज के पराक्रमी किलों, ऊंची पहाड़ियों और सह्याद्रि की वादियों का रोमांचक अनुभव।",
    circuitUnescoTitle: "यूनेस्को विश्व धरोहर शैल-उत्कीर्ण परिपथ",
    circuitUnescoDesc: "अजंता की 1500 वर्ष पुरानी बौद्ध भित्तिचित्र कला, एलोरा का विशाल कैलाश मंदिर और दौलताबाद का ऐतिहासिक दुर्ग।",
    circuitPilgrimageTitle: "पवित्र ज्योतिर्लिंग एवं देवालय परिपथ",
    circuitPilgrimageDesc: "महाराष्ट्र के पावन ज्योतिर्लिंग, गोदावरी के पवित्र घाट और प्राचीन हेमाडपंथी मंदिरों की आध्यात्मिक यात्रा।",
    curatedRoadTrips: "नियोजित सड़क यात्राएं",
    signatureCircuitsTitle: "महाराष्ट्र के प्रमुख यात्रा परिपथ",
    signatureCircuitsSub: "सड़क और रेल मार्ग से जुड़े प्रसिद्ध पर्यटन स्थलों का संपूर्ण मार्ग।",
    keyStops: "प्रमुख पड़ाव",
    bestTimeToVisit: "भ्रमण का सर्वोत्तम समय",

    // Category Names & Subtitles
    fortsTitle: "महाराष्ट्र के ऐतिहासिक किले",
    fortsSubtitle: "सह्याद्रि पर्वतमाला की चोटियों पर अंकित मराठा साम्राज्य का अमर शौर्य।",
    templesTitle: "पवित्र मंदिर एवं तीर्थस्थल",
    templesSubtitle: "प्राचीन हेमाडपंथी वास्तुकला, सदियों पुरानी भक्ति परंपरा और पवित्र नदी घाट।",
    beachesTitle: "कोंकण के सुंदर समुद्र तट",
    beachesSubtitle: "720 किलोमीटर में फैले सुनहरे रेत के तट, नारियल के बाग और अरब सागर की लहरें।",
    heritageTitle: "यूनेस्को विश्व धरोहर एवं गुफाएं",
    heritageSubtitle: "प्राचीन भारतीय रॉक-कट वास्तुकला, बौद्ध भित्तिचित्र और ऐतिहासिक महल।",

    // Dashboard & Planning
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
    estimatedCost: "अनुमानित खर्च",
    duration: "अवधि",
    season: "उत्तम समय",

    // 36 Districts (Hindi)
    district_ahmednagar: "अहिल्यानगर (अहमदनगर)",
    district_akola: "अकोला",
    district_amravati: "अमरावती",
    district_aurangabad: "छत्रपति संभाजीनगर",
    district_beed: "बीड",
    district_bhandara: "भंडारा",
    district_buldhana: "बुलढाणा",
    district_chandrapur: "चंद्रपुर",
    district_dhule: "धुले",
    district_gadchiroli: "गढ़चिरोली",
    district_gondia: "गोंदिया",
    district_hingoli: "हिंगोली",
    district_jalgaon: "जलगांव",
    district_jalna: "जालना",
    district_kolhapur: "कोल्हापुर",
    district_latur: "लातूर",
    district_mumbai_city: "मुंबई शहर",
    district_mumbai_suburban: "मुंबई उपनगर",
    district_nagpur: "नागपुर",
    district_nanded: "नांदेड़",
    district_nandurbar: "नंदुरबार",
    district_nashik: "नासिक",
    district_dharashiv: "धाराशिव (उस्मानाबाद)",
    district_palghar: "पालघर",
    district_parbhani: "परभणी",
    district_pune: "पुणे",
    district_raigad: "रायगढ़",
    district_ratnagiri: "रत्नागिरी",
    district_sangli: "सांगली",
    district_satara: "सातारा",
    district_sindhudurg: "सिंधुदुर्ग",
    district_solapur: "सोलापुर",
    district_thane: "ठाणे",
    district_wardha: "वर्धा",
    district_washim: "वाशिम",
    district_yavatmal: "यवतमाल",

    // Helplines & Footer
    helplineTitle: "सहायता एवं आपातकालीन संपर्क",
    mtdcHelpline: "एमटीडीसी पर्यटक हेल्पलाइन",
    emergencyHelpline: "आपातकालीन सेवा",
    sahyadriRescue: "सह्याद्रि ट्रेकर बचाव दल",
    contactTourismLiaison: "पर्यटन संपर्क अधिकारी से जुड़ें →",
    copyright: "आधिकारिक महाराष्ट्र सांस्कृतिक एवं विरासत पर्यटन मंच। महाराष्ट्र के शाही इतिहास, सांस्कृतिक विरासत और प्राकृतिक सौंदर्य का संरक्षण।",
    rightsReserved: "सर्वाधिकार सुरक्षित",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    language: "भाषा",
    theme: "थीम",
    lightMode: "लाइट थीम",
    darkMode: "डार्क थीम"
  }
};

const SUPPORTED_LANGUAGES = ['en', 'mr', 'hi'];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem('aagman_language') || localStorage.getItem('aagman_lang');
      return SUPPORTED_LANGUAGES.includes(stored) ? stored : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (newLang) => {
    const validLang = SUPPORTED_LANGUAGES.includes(newLang) ? newLang : 'en';
    setLanguageState(validLang);
    try {
      localStorage.setItem('aagman_language', validLang);
      localStorage.setItem('aagman_lang', validLang);
      document.documentElement.lang = validLang;
    } catch (e) {
      console.warn('Could not persist language to localStorage', e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('aagman_language', language);
      localStorage.setItem('aagman_lang', language);
      document.documentElement.lang = language;
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [language]);

  const t = (key, fallback) => {
    if (!key) return '';
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en?.[key] || fallback || key;
  };

  const getDistrictName = (districtId) => {
    const key = `district_${districtId.replace(/-/g, '_')}`;
    return t(key, districtId);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      changeLanguage: setLanguage,
      t,
      getDistrictName,
      supportedLanguages: SUPPORTED_LANGUAGES
    }}>
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
