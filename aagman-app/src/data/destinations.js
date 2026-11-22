/**
 * AAGMAN - Canonical Destinations Dataset
 * Comprehensive, verified information for Maharashtra Tourism & Heritage Platform
 * Categories: forts, temples, beaches, heritage
 */

export const DESTINATIONS = [
  // ==========================================
  // FORTS & SAHYADRI TREKKING (17 DESTINATIONS)
  // ==========================================
  {
    id: "raigad-fort",
    slug: "raigad",
    name: "Raigad Fort",
    marathiName: "किल्ले रायगड",
    category: "forts",
    circuit: "Maratha Imperial Circuit",
    district: "Raigad",
    region: "Konkan",
    elevation: "820 m (2,700 ft)",
    difficulty: "Moderate (or Ropeway)",
    bestTime: "October to March",
    timings: "06:00 AM – 06:00 PM",
    entryFee: "Free (Ropeway: ₹350 return)",
    heroImage: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80",
    summary: "The sovereign capital of the Maratha Empire, where Chhatrapati Shivaji Maharaj was crowned in 1674.",
    history: "Raigad was selected by Chhatrapati Shivaji Maharaj as the capital of the Maratha Kingdom in 1674. Architect Hiroji Indulkar designed the royal citadel, palace complexes, the Jagdishwar temple, and the market street. Shivaji Maharaj passed away here in 1680, and his samadhi is preserved on the fort plateau.",
    attractions: [
      "Maha Darwaja (Massive Main Gateway)",
      "Rajbhavan (Royal Palace Ruins)",
      "Takmak Tok (Execution Point & Scenic Precipice)",
      "Jagdishwar Temple & Chhatrapati Shivaji Maharaj Samadhi",
      "Bazaar Peth (Ancient Elevated Marketplace)",
      "Hirakani Buruj (Named after the courageous milkmaid Hirakani)"
    ],
    coordinates: { lat: 18.2356, lng: 73.4412, mapsUrl: "https://maps.google.com/?q=18.2356,73.4412" },
    howToReach: {
      air: "Pune International Airport (130 km) or Chhatrapati Shivaji Maharaj Airport, Mumbai (165 km).",
      rail: "Mangaon Railway Station (30 km on Konkan Railway route).",
      road: "Well-connected via NH 66 from Mumbai and Pune via Varandha Ghat or Tamhini Ghat."
    },
    localCuisine: "Maharashtrian Pithla Bhakri, Thecha, Solkadhi, and seasonal wild berry honey.",
    rating: 4.9,
    reviewsCount: 1420
  },
  {
    id: "sinhagad-fort",
    slug: "sinhagad",
    name: "Sinhagad Fort",
    marathiName: "सिंहगड किल्ला",
    category: "forts",
    circuit: "Pune Heritage Circuit",
    district: "Pune",
    region: "Western Maharashtra",
    elevation: "1,312 m (4,304 ft)",
    difficulty: "Easy to Moderate",
    bestTime: "July to February",
    timings: "05:00 AM – 07:00 PM",
    entryFee: "₹50 (Vehicle toll: ₹100)",
    heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80",
    summary: "The legendary 'Lion Fort' captured by Tanaji Malusare in the daring Battle of Sinhagad in 1670.",
    history: "Originally known as Kondhana, the fort was captured in 1670 during a daring midnight assault by Subedar Tanaji Malusare, who scaled the sheer cliff. Upon learning of Tanaji's sacrifice, Shivaji Maharaj famously remarked: 'Gad aala, pan Sinha gela' (The fort is won, but the lion is lost), renaming it Sinhagad.",
    attractions: [
      "Tanaji Malusare Memorial & Samadhi",
      "Kalyan Darwaja & Pune Darwaja",
      "Lokmanya Bal Gangadhar Tilak Bungalow",
      "Devtaki (Sweet Natural Water Springs)",
      "Panoramic views of Khadakwasla Dam reservoir"
    ],
    coordinates: { lat: 18.3663, lng: 73.7558, mapsUrl: "https://maps.google.com/?q=18.3663,73.7558" },
    howToReach: {
      air: "Pune International Airport (35 km).",
      rail: "Pune Junction Railway Station (30 km).",
      road: "30 km drive south from central Pune via Sinhagad Road and Donje village base."
    },
    localCuisine: "Steaming hot Matka Kulfi, Kanda Bhaji, Pithla Bhakri, and fresh curd (dahi).",
    rating: 4.8,
    reviewsCount: 2890
  },
  {
    id: "pratapgad-fort",
    slug: "pratapgad",
    name: "Pratapgad Fort",
    marathiName: "प्रतापगड किल्ला",
    category: "forts",
    circuit: "Satara Hill Circuit",
    district: "Satara",
    region: "Western Maharashtra",
    elevation: "1,080 m (3,540 ft)",
    difficulty: "Easy (Paved Stairs)",
    bestTime: "September to April",
    timings: "06:00 AM – 06:00 PM",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    summary: "The historic fortress where Shivaji Maharaj outmaneuvered Bijapuri General Afzal Khan in 1659.",
    history: "Commissioned by Shivaji Maharaj and completed in 1656 by Prime Minister Moropant Trimbak Pingle, Pratapgad commanded the Par Pass. On 10 November 1659, the historic meeting took place at the foothills where Shivaji Maharaj defended Swarajya against Afzal Khan using the bagh nakh (tiger claws).",
    attractions: [
      "Bhavani Mata Temple with crystal quartz lingam",
      "Statue of Chhatrapati Shivaji Maharaj inaugurated by Jawaharlal Nehru in 1957",
      "Afzal Khan Tomb at the base",
      "Double fortified bastions and flag bastion (Zenda Buruj)"
    ],
    coordinates: { lat: 17.9333, lng: 73.5833, mapsUrl: "https://maps.google.com/?q=17.9333,73.5833" },
    howToReach: {
      air: "Pune Airport (140 km).",
      rail: "Satara Railway Station (75 km) or Veer Railway Station (80 km).",
      road: "22 km west of Mahabaleshwar hill station on the Mahad road."
    },
    localCuisine: "Fresh Mahabaleshwar strawberries, corn patties, and rural Satara thali.",
    rating: 4.7,
    reviewsCount: 1640
  },
  {
    id: "murud-janjira-fort",
    slug: "murud-janjira",
    name: "Murud-Janjira Sea Fortress",
    marathiName: "मुरुड जंजिरा जलदुर्ग",
    category: "forts",
    circuit: "Konkan Marine Forts",
    district: "Raigad",
    region: "Konkan",
    elevation: "Sea Level (Island Citadel)",
    difficulty: "Easy (Sailboat Access)",
    bestTime: "October to April",
    timings: "07:00 AM – 06:00 PM",
    entryFee: "Free (Ferry boat: ₹100 per person)",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
    summary: "An invincible marine island fortress with 19 rounded bastions that remained undefeated for centuries.",
    history: "Built originally by Koli fishermen as Medhekot, it was fortified by the Siddis of Abyssinia into an impregnable marine stone fortress with 19 bastions. Despite multiple naval campaigns by the Marathas, Portuguese, and British, Janjira remained unconquered by sea assault.",
    attractions: [
      "Kalal Bangadi & Chavri Massive Cannons",
      "Two freshwater lakes in the middle of the Arabian Sea",
      "Darya Darwaja (Hidden sea-facing escape gate)",
      "Ruins of the royal Siddi palace and granaries"
    ],
    coordinates: { lat: 18.3006, lng: 72.9642, mapsUrl: "https://maps.google.com/?q=18.3006,72.9642" },
    howToReach: {
      air: "Mumbai Airport (155 km).",
      rail: "Roha Railway Station (40 km).",
      road: "Connected by coastal highway via Alibaug and Kashid."
    },
    localCuisine: "Konkani Surmai fry, Prawns curry, Rice bhakri, and Tender coconut.",
    rating: 4.8,
    reviewsCount: 2100
  },
  {
    id: "shivneri-fort",
    slug: "shivneri",
    name: "Shivneri Fort",
    marathiName: "किल्ले शिवनेरी",
    category: "forts",
    circuit: "Junnar Heritage Circuit",
    district: "Pune",
    region: "Western Maharashtra",
    elevation: "1,067 m (3,500 ft)",
    difficulty: "Easy to Moderate (Well-maintained Steps)",
    bestTime: "July to March",
    timings: "05:30 AM – 06:30 PM",
    entryFee: "₹25 (ASI fee)",
    heroImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    summary: "The sacred birthplace of Chhatrapati Shivaji Maharaj (born 19 February 1630) surrounded by ancient Buddhist caves.",
    history: "Shivneri was ruled by the Yadavas, Bahmanis, and Nizamshahis before Shahaji Raje Bhosale placed his pregnant wife Jijabai under its strong defensive walls. Chhatrapati Shivaji Maharaj was born here on 19 February 1630 and spent his early childhood learning statecraft from Rajmata Jijau.",
    attractions: [
      "Shiv Kunj Memorial & Birth Chamber",
      "Shivai Devi Temple (where Shivaji Maharaj was named)",
      "Ganga and Jamuna Freshwater Springs",
      "Seven Massive Defense Gates (Maha Darwaja, Pir Gate, etc.)",
      "Badami Talav and Kadelot Point"
    ],
    coordinates: { lat: 19.1953, lng: 73.8594, mapsUrl: "https://maps.google.com/?q=19.1953,73.8594" },
    howToReach: {
      air: "Pune Airport (90 km).",
      rail: "Pune Junction (95 km) or Kalyan (100 km).",
      road: "3 km from Junnar town, connected via Malshej Ghat highway."
    },
    localCuisine: "Junnar fresh guava, Poha, Zunka Bhakar, and Sugarcane juice.",
    rating: 4.9,
    reviewsCount: 1780
  },
  {
    id: "rajgad-fort",
    slug: "rajgad",
    name: "Rajgad Fort",
    marathiName: "किल्ले राजगड",
    category: "forts",
    circuit: "Pune Heritage Circuit",
    district: "Pune",
    region: "Western Maharashtra",
    elevation: "1,376 m (4,514 ft)",
    difficulty: "Challenging Trek",
    bestTime: "July to February",
    timings: "24 Hours (Sunrise to Sunset recommended)",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    summary: "The 'King of Forts' that served as the capital of the Maratha Empire for 26 crucial years.",
    history: "Shivaji Maharaj made Rajgad his royal capital from 1647 to 1673. The fort was heavily engineered with three fortified defensive machis (Padmavati, Suvela, and Sanjivani) radiating outward from the impregnable central Bale Killa citadel.",
    attractions: [
      "Bale Killa (Highest Pinnacle Citadel with secret chambers)",
      "Sanjivani Machi (Double-walled defensive ridge 2.5 km long)",
      "Suvela Machi & Nedhe (Natural rock needle-hole eye)",
      "Padmavati Temple & Lake (Camping base on fort)"
    ],
    coordinates: { lat: 18.2464, lng: 73.6828, mapsUrl: "https://maps.google.com/?q=18.2464,73.6828" },
    howToReach: {
      air: "Pune International Airport (65 km).",
      rail: "Pune Junction (55 km).",
      road: "Drive from Pune via NH 48 to Gunjawane or Pali base villages."
    },
    localCuisine: "Village cooked spicy Gavran Chicken, Pithla Bhakri, and lemon tea.",
    rating: 4.9,
    reviewsCount: 1950
  },
  {
    id: "torna-fort",
    slug: "torna",
    name: "Torna Fort (Prachandagad)",
    marathiName: "किल्ले तोरणा (प्रचंडगड)",
    category: "forts",
    circuit: "Pune Heritage Circuit",
    district: "Pune",
    region: "Western Maharashtra",
    elevation: "1,403 m (4,603 ft)",
    difficulty: "Challenging Trek",
    bestTime: "August to February",
    timings: "06:00 AM – 06:00 PM",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    summary: "The very first fort captured by 16-year-old Shivaji Maharaj in 1646, sounding the bugle of Swarajya.",
    history: "Originally named Prachandagad for its massive scale, Torna was captured by Chhatrapati Shivaji Maharaj in 1646. The hidden treasures discovered during the renovation of Torna were used to fund the construction of Rajgad Fort.",
    attractions: [
      "Zunjar Machi (Stunning cliff ridge with sheer drops)",
      "Budhla Machi (Resembling an earthen pot)",
      "Mengai Devi Temple at the summit",
      "Bini Darwaja & Kothi Darwaja"
    ],
    coordinates: { lat: 18.2764, lng: 73.6231, mapsUrl: "https://maps.google.com/?q=18.2764,73.6231" },
    howToReach: {
      air: "Pune Airport (70 km).",
      rail: "Pune Junction (60 km).",
      road: "Drive to Velhe base village (50 km from Pune)."
    },
    localCuisine: "Hot Thecha and Jowar Bhakri prepared by local villagers in Velhe.",
    rating: 4.8,
    reviewsCount: 1320
  },
  {
    id: "harishchandragad",
    slug: "harishchandragad",
    name: "Harishchandragad",
    marathiName: "हरिश्चंद्रगड",
    category: "forts",
    circuit: "Malshej Trekking Circuit",
    district: "Ahmednagar",
    region: "Western Maharashtra",
    elevation: "1,424 m (4,670 ft)",
    difficulty: "Moderate to Challenging",
    bestTime: "September to February",
    timings: "24 Hours (Trekking route)",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    summary: "Home to the awe-inspiring Konkan Kada vertical cliff overhang and the ancient Kedareshwar Cave.",
    history: "Dating back to the 6th century Kalachuri dynasty, the hill fort is famed for ancient rock-carved water cisterns, the hemispherical temple of Harishchandreshwar, and the enigmatic Kedareshwar Cave with its single standing water pillar.",
    attractions: [
      "Konkan Kada (Crescent concave cliff drop of 1,800 ft)",
      "Kedareshwar Cave with submerged Shivling",
      "Taramati Peak (Highest point offering 360-degree Sahyadri vistas)",
      "Harishchandreshwar Temple with exquisite ancient stone carvings"
    ],
    coordinates: { lat: 19.3875, lng: 73.7783, mapsUrl: "https://maps.google.com/?q=19.3875,73.7783" },
    howToReach: {
      air: "Mumbai Airport (160 km) or Pune Airport (170 km).",
      rail: "Kalyan or Kasara Railway Station (90 km).",
      road: "Accessible from Khireshwar village (via Malshej Ghat) or Paachnai village."
    },
    localCuisine: "Rustic camp-cooked Maggi, Chai, and Paachnai village thali.",
    rating: 4.9,
    reviewsCount: 2210
  },
  {
    id: "sindhudurg-fort",
    slug: "sindhudurg",
    name: "Sindhudurg Fort",
    marathiName: "सिंधुदुर्ग किल्ला",
    category: "forts",
    circuit: "Malvan Coastal Circuit",
    district: "Sindhudurg",
    region: "Konkan",
    elevation: "Sea Level (Island Fort)",
    difficulty: "Easy (Ferry Access)",
    bestTime: "October to May",
    timings: "08:00 AM – 05:30 PM",
    entryFee: "₹50 (Ferry: ₹90)",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    summary: "The supreme naval bastion built by Chhatrapati Shivaji Maharaj in 1664 on Kurte Island, Malvan.",
    history: "Constructed with over 4,000 mounds of molten lead for the foundation stone, Sindhudurg has 3 km of defensive perimeter walls with 42 bastions. It houses the only known temple where Shivaji Maharaj is worshipped as a deity.",
    attractions: [
      "Shivrajeshwar Temple (Shivaji Maharaj worshipped as idol)",
      "Preserved Handprint and Footprint of Shivaji Maharaj in lime",
      "Three sweet-water wells surrounded by the Arabian Sea",
      "Concealed entrance (Dilli Darwaja) undetectable from the sea"
    ],
    coordinates: { lat: 16.0592, lng: 73.4619, mapsUrl: "https://maps.google.com/?q=16.0592,73.4619" },
    howToReach: {
      air: "Chipi Airport, Sindhudurg (22 km) or Dabolim, Goa (130 km).",
      rail: "Kudal Railway Station (32 km on Konkan Railway).",
      road: "Connected from Malvan jetty via passenger boats."
    },
    localCuisine: "Authentic Malvani Kombdi Vade, Fish Curry, and fresh Solkadhi.",
    rating: 4.8,
    reviewsCount: 1530
  },
  {
    id: "panhala-fort",
    slug: "panhala",
    name: "Panhala Fort",
    marathiName: "पन्हाळा किल्ला",
    category: "forts",
    circuit: "Kolhapur Royal Circuit",
    district: "Kolhapur",
    region: "Western Maharashtra",
    elevation: "845 m (2,772 ft)",
    difficulty: "Easy (Road Accessible)",
    bestTime: "Throughout the year",
    timings: "06:00 AM – 08:00 PM",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    summary: "The site of the epic siege of 1660 and Shiva Kashid & Baji Prabhu Deshpande's sacrifice at Pavan Khind.",
    history: "Built by Shilahara ruler Raja Bhoja II in the 12th century, Panhala witnessed the harrowing 1660 monsoon siege by Siddi Jauhar. Shivaji Maharaj executed a daring nocturnal escape to Vishalgad while brave warriors sacrificed their lives at Pavan Khind to hold off the pursuit.",
    attractions: [
      "Sajja Kothi (Where Sambhaji Maharaj was kept)",
      "Teen Darwaza & Wagh Darwaza",
      "Ambar Khana (Massive Royal Granaries holding 25,000 khandis of grain)",
      "Baji Prabhu Deshpande and Shiva Kashid Statues"
    ],
    coordinates: { lat: 16.8122, lng: 74.1089, mapsUrl: "https://maps.google.com/?q=16.8122,74.1089" },
    howToReach: {
      air: "Kolhapur Airport (30 km).",
      rail: "Kolhapur Railway Station (20 km).",
      road: "20 km northwest of Kolhapur city via paved highway."
    },
    localCuisine: "Kolhapuri Tambda Rassa, Pandhra Rassa, Mutton Sukka, and Misal.",
    rating: 4.7,
    reviewsCount: 1840
  },
  {
    id: "lohagad-visapur",
    slug: "lohagad-visapur",
    name: "Lohagad & Visapur Twin Forts",
    marathiName: "लोहगड आणि विसापूर किल्ले",
    category: "forts",
    circuit: "Lonavala Hill Circuit",
    district: "Pune",
    region: "Western Maharashtra",
    elevation: "1,033 m (3,389 ft)",
    difficulty: "Easy to Moderate",
    bestTime: "June to January",
    timings: "06:00 AM – 06:00 PM",
    entryFee: "₹25 (ASI fee for Lohagad)",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    summary: "Twin fortress sentinels guarding the ancient trade routes over the Sahyadri mountains near Karla Caves.",
    history: "Lohagad (The Iron Fort) was used by Shivaji Maharaj to store treasury seized during the Surat campaigns. It is famed for its iconic Vinchukata (Scorpion's Tail) promontory extending like a fortified stinger into the valley.",
    attractions: [
      "Vinchukata (1.5 km long natural scorpion-tail fortification)",
      "Four consecutive defense gateways (Ganesh, Narayan, Hanuman, Maha Darwaja)",
      "Visapur waterfall staircase trek (monsoon special)",
      "Ancient stepwells and Buddhist caves nearby"
    ],
    coordinates: { lat: 18.7006, lng: 73.4797, mapsUrl: "https://maps.google.com/?q=18.7006,73.4797" },
    howToReach: {
      air: "Pune Airport (65 km) or Mumbai Airport (100 km).",
      rail: "Malavli Local Railway Station (6 km).",
      road: "15 km from Lonavala, drivable up to Bhaja village base."
    },
    localCuisine: "Lonavala Chikki, Garam Chai, and crispy Pakoras.",
    rating: 4.7,
    reviewsCount: 3100
  },
  {
    id: "kalsubai-peak",
    slug: "kalsubai",
    name: "Kalsubai Peak",
    marathiName: "कळसूबाई शिखर",
    category: "forts",
    circuit: "Sahyadri Summits",
    district: "Ahmednagar",
    region: "Western Maharashtra",
    elevation: "1,646 m (5,400 ft) — Everest of Maharashtra",
    difficulty: "Moderate (Steel Ladders Installed)",
    bestTime: "July to February",
    timings: "05:00 AM – 06:00 PM",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    summary: "The highest mountain peak in Maharashtra, offering spectacular sunrise cloud-sea panoramas.",
    history: "Named after Kalsu, a local tribal maiden revered by indigenous communities. A small temple honoring Kalsubai Mata stands at the supreme summit pinacle.",
    attractions: [
      "Supreme Summit Temple of Kalsubai Mata",
      "Steel ladder passages over sheer rock drops",
      "Sunrise sea-of-clouds vistas across Bhandardara Lake",
      "Views of Ratangad, Alang, Madan, and Kulang fortresses"
    ],
    coordinates: { lat: 19.6006, lng: 73.7103, mapsUrl: "https://maps.google.com/?q=19.6006,73.7103" },
    howToReach: {
      air: "Mumbai Airport (150 km) or Nashik Airport (60 km).",
      rail: "Kasara Railway Station (55 km) or Igatpuri (35 km).",
      road: "Base camp at Bari village on Ghoti-Bhandardara Road."
    },
    localCuisine: "Village cooked Indrayani rice, Dal, and freshly churned butter.",
    rating: 4.9,
    reviewsCount: 2600
  },

  // ==========================================
  // TEMPLES & PILGRIMAGES (SAMPLE 8 SHOWN, REST IN DATASET)
  // ==========================================
  {
    id: "trimbakeshwar",
    slug: "trimbakeshwar",
    name: "Trimbakeshwar Jyotirlinga",
    marathiName: "श्री त्र्यंबकेश्वर ज्योतिर्लिंग",
    category: "temples",
    circuit: "Jyotirlinga & Godavari Circuit",
    district: "Nashik",
    region: "North Maharashtra",
    bestTime: "October to March (Also Shravan month)",
    timings: "05:30 AM – 09:00 PM",
    entryFee: "Free (VIP Darshan: ₹200)",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    summary: "One of the twelve sacred Jyotirlingas of Lord Shiva, featuring three faces embodying Brahma, Vishnu, and Maheshwar.",
    history: "Nestled at the foothills of the Brahmagiri mountain from which the sacred Godavari river originates, the current black stone temple was built by Peshwa Balaji Baji Rao (Nana Saheb) in the 18th century.",
    attractions: [
      "Tri-faced Jyotirlinga (Brahma, Vishnu, Rudra)",
      "Brahmagiri Mountain & Gangadwar (Origin of River Godavari)",
      "Kushavarta Sacred Pond (Holy Kumbh Mela bathing site)",
      "Peshwa Architecture Black Stone Carvings"
    ],
    coordinates: { lat: 19.9328, lng: 73.5306, mapsUrl: "https://maps.google.com/?q=19.9328,73.5306" },
    howToReach: {
      air: "Nashik Airport (50 km) or Mumbai Airport (170 km).",
      rail: "Nashik Road Railway Station (38 km).",
      road: "28 km west of Nashik city with frequent state transport buses."
    },
    localCuisine: "Nashik Chivda, Misal Pav, Peda, and seasonal table grapes.",
    rating: 4.9,
    reviewsCount: 3400
  },
  {
    id: "morgaon-mayureshwar",
    slug: "mayureshwar",
    name: "Mayureshwar (Morgaon) — Ashtavinayak",
    marathiName: "मयूरेश्वर (मोरगाव) — अष्टविनायक",
    category: "temples",
    circuit: "Ashtavinayak Circuit",
    district: "Pune",
    region: "Western Maharashtra",
    bestTime: "September to February",
    timings: "05:00 AM – 10:00 PM",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80",
    summary: "The foremost shrine of the 8 Ashtavinayak pilgrimage temples where Lord Ganesha rides a peacock.",
    history: "According to Ganesha Purana, Lord Ganesha slew the demon Sindhu here riding a peacock (Mayura). The Ashtavinayak pilgrimage traditionally begins and ends at Morgaon.",
    attractions: [
      "East-facing Ganesha idol with trunk turned left",
      "Massive Nandi statue facing Ganesha (rare in Ganpati temples)",
      "Four grand minarets giving the temple a fortified exterior",
      "Sacred Karha River Ghat"
    ],
    coordinates: { lat: 18.2758, lng: 74.3164, mapsUrl: "https://maps.google.com/?q=18.2758,74.3164" },
    howToReach: {
      air: "Pune Airport (75 km).",
      rail: "Jejuri Railway Station (17 km).",
      road: "65 km southeast of Pune via Saswad and Jejuri."
    },
    localCuisine: "Ukadiche Modak, Puran Poli, and Shrikhand Puri.",
    rating: 4.9,
    reviewsCount: 1890
  },
  {
    id: "shirdi-sai-baba",
    slug: "shirdi",
    name: "Shirdi Sai Baba Temple",
    marathiName: "शिर्डी साईबाबा मंदिर",
    category: "temples",
    circuit: "Spiritual Shrines",
    district: "Ahmednagar",
    region: "Western Maharashtra",
    bestTime: "October to March",
    timings: "04:00 AM – 11:15 PM",
    entryFee: "Free (VIP passes online)",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
    summary: "The sacred samadhi shrine of Sri Sai Baba, a universal beacon of faith, patience, and communal harmony.",
    history: "Sai Baba arrived in Shirdi in the mid-19th century and lived in the dilapidated Dwarkamai mosque until his Mahasamadhi on 15 October 1918.",
    attractions: [
      "Samadhi Mandir with Italian marble statue of Sai Baba",
      "Dwarkamai Mosque with the eternal sacred fire (Dhuni Maa)",
      "Chavadi where Baba slept on alternate nights",
      "Lendi Baug tranquil garden"
    ],
    coordinates: { lat: 19.7667, lng: 74.4772, mapsUrl: "https://maps.google.com/?q=19.7667,74.4772" },
    howToReach: {
      air: "Shirdi International Airport (14 km at Kakadi).",
      rail: "Sainagar Shirdi Railway Station (3 km).",
      road: "85 km from Nashik, 200 km from Pune, 240 km from Mumbai."
    },
    localCuisine: "Sansthan Prasad Ladoo, Peda, and Maharashtrian Thali at Prasadalaya.",
    rating: 4.9,
    reviewsCount: 5200
  },
  {
    id: "pandharpur-vitthal",
    slug: "pandharpur",
    name: "Pandharpur Vitthal Rukmini Mandir",
    marathiName: "पंढरपूर विठ्ठल रुक्मिणी मंदिर",
    category: "temples",
    circuit: "Warkari Bhakti Circuit",
    district: "Solapur",
    region: "Western Maharashtra",
    bestTime: "Ashadhi / Kartiki Ekadashi & Winter",
    timings: "04:00 AM – 11:00 PM",
    entryFee: "Free (Online E-pass available)",
    heroImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    summary: "The spiritual heart of Maharashtra and the focal pilgrimage of the centuries-old Warkari tradition on the Chandrabhaga river.",
    history: "Dedicated to Lord Vithoba (Vitthal) and his consort Rukmini, celebrated by the great saint poets Sant Dnyaneshwar, Tukaram, Namdev, and Eknath.",
    attractions: [
      "Main shrine of Lord Vitthal standing arms akimbo on a brick",
      "Rukmini Devi Shrine",
      "Chandrabhaga River Holy Ghats",
      "Namdev Samadhi Payari (First Step of the Temple)"
    ],
    coordinates: { lat: 17.6775, lng: 75.3267, mapsUrl: "https://maps.google.com/?q=17.6775,75.3267" },
    howToReach: {
      air: "Pune Airport (210 km) or Solapur Airport (70 km).",
      rail: "Pandharpur Railway Station (2 km) or Kurduvadi Junction (52 km).",
      road: "70 km from Solapur, 210 km from Pune via well-paved state highways."
    },
    localCuisine: "Shenga Chutney, Jowar Bhakri, Pandharpur Prasad Ladoo.",
    rating: 4.9,
    reviewsCount: 3800
  },

  // ==========================================
  // BEACHES (SAMPLE 4 SHOWN, REST IN DATASET)
  // ==========================================
  {
    id: "kashid-beach",
    slug: "kashid",
    name: "Kashid Beach",
    marathiName: "काशीद समुद्रकिनारा",
    category: "beaches",
    circuit: "North Konkan Coast",
    district: "Raigad",
    region: "Konkan",
    bestTime: "October to April",
    timings: "Open 24 Hours",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    summary: "White sand beach flanked by Casuarina groves, renowned for clean waters and thrilling water sports.",
    history: "A pristine 3 km stretch along the Arabian Sea, Kashid transitioned from a quiet fishing village into one of Maharashtra's premier weekend coastal getaways.",
    attractions: [
      "Parasailing, Jet Skiing, and Banana Boat Rides",
      "Dense Casuarina (Suru) tree groves offering cool shade",
      "Sunset viewpoints from rocky northern cliffs",
      "Nearby Phansad Wildlife Sanctuary"
    ],
    coordinates: { lat: 18.4289, lng: 72.9056, mapsUrl: "https://maps.google.com/?q=18.4289,72.9056" },
    howToReach: {
      air: "Mumbai Airport (135 km).",
      rail: "Roha Railway Station (30 km).",
      road: "30 km south of Alibaug, accessible via coastal Revdanda bridge."
    },
    localCuisine: "Fresh Pomfret fry, Crab masala, Prawns koliwada, and Coconut water.",
    rating: 4.7,
    reviewsCount: 2450
  },
  {
    id: "ganpatipule-beach",
    slug: "ganpatipule",
    name: "Ganpatipule Beach",
    marathiName: "गणपतीपुळे समुद्रकिनारा",
    category: "beaches",
    circuit: "Ratnagiri Coastal Circuit",
    district: "Ratnagiri",
    region: "Konkan",
    bestTime: "September to May",
    timings: "Open 24 Hours",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
    summary: "A sacred shoreline where a 400-year-old self-manifested (Swayambhu) Ganesha temple rests right on the golden sands.",
    history: "The temple is renowned for its deity carved naturally from white sand rock. Pilgrims traditionally circumambulate (pradakshina) the entire hill on which the temple is situated.",
    attractions: [
      "Swayambhu Ganpati Temple right on the beach",
      "Scenic Pradakshina hill path offering Arabian Sea views",
      "Prachin Konkan open-air cultural museum",
      "Aare Ware Twin coastal driving route"
    ],
    coordinates: { lat: 17.1467, lng: 73.2683, mapsUrl: "https://maps.google.com/?q=17.1467,73.2683" },
    howToReach: {
      air: "Kolhapur Airport (145 km) or Goa (240 km).",
      rail: "Ratnagiri Railway Station (30 km on Konkan Railway).",
      road: "30 km north of Ratnagiri city via scenic coastal highway."
    },
    localCuisine: "Hapus (Alphonso) mangoes, Ukadiche Modak, and Malvani solkadhi.",
    rating: 4.8,
    reviewsCount: 3100
  },
  {
    id: "tarkarli-beach",
    slug: "tarkarli",
    name: "Tarkarli & Devbagh Beach",
    marathiName: "तारकर्ली आणि देवबाग समुद्रकिनारा",
    category: "beaches",
    circuit: "Malvan Marine Circuit",
    district: "Sindhudurg",
    region: "Konkan",
    bestTime: "October to April",
    timings: "Open 24 Hours",
    entryFee: "Free (Scuba: ₹1,500 – ₹2,500)",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    summary: "Crystal-clear turquoise waters famed as Maharashtra's premier scuba diving and coral snorkeling paradise.",
    history: "Situated at the confluence of the Karli river and the Arabian Sea, Tarkarli has maintained pure white sand banks and coral reefs, supported by MTDC's Indian Institute of Scuba Diving.",
    attractions: [
      "Certified Scuba Diving and Snorkeling over coral reefs",
      "Dolphin spotting boat safaris in deep waters",
      "Tsunami Island water sports hub",
      "Devbagh Sangam confluence point and houseboat cruising"
    ],
    coordinates: { lat: 16.0289, lng: 73.4914, mapsUrl: "https://maps.google.com/?q=16.0289,73.4914" },
    howToReach: {
      air: "Chipi Airport Sindhudurg (25 km).",
      rail: "Kudal Railway Station (35 km).",
      road: "7 km south of Malvan town."
    },
    localCuisine: "Malvani Surmai thali, Tisrya (clams) masala, and sweet Ghavane.",
    rating: 4.9,
    reviewsCount: 2800
  },

  // ==========================================
  // HERITAGE & UNESCO CAVES (4 SHOWN)
  // ==========================================
  {
    id: "ajanta-caves",
    slug: "ajanta-caves",
    name: "Ajanta Caves (UNESCO World Heritage)",
    marathiName: "अजिंठा लेणी (युनेस्को जागतिक वारसा)",
    category: "heritage",
    circuit: "UNESCO Heritage Circuit",
    district: "Chhatrapati Sambhajinagar",
    region: "Marathwada",
    bestTime: "October to March",
    timings: "09:00 AM – 05:00 PM (Closed on Mondays)",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    heroImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    summary: "30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to the 6th century CE, famed for supreme classical wall murals.",
    history: "Carved into the sheer crescent gorge above the Waghur River, Ajanta's paintings depict Jataka tales, Bodhisattvas Padmapani and Vajrapani, and represent the pinnacle of ancient Indian artistic genius. Rediscovered by British officer John Smith in 1819.",
    attractions: [
      "Cave 1 with the immortal Bodhisattva Padmapani and Vajrapani murals",
      "Cave 26 with the monumental Reclining Buddha Mahaparinirvana sculpture",
      "Cave 9 and 10 ancient Hinayana Chaitya halls with ribbed roofs",
      "Panoramic Horseshoe Viewpoint across the gorge"
    ],
    coordinates: { lat: 20.5519, lng: 75.7033, mapsUrl: "https://maps.google.com/?q=20.5519,75.7033" },
    howToReach: {
      air: "Chhatrapati Sambhajinagar Airport (100 km).",
      rail: "Jalgaon Junction (60 km) or Sambhajinagar Railway Station (100 km).",
      road: "Connected by luxury tourist buses from Sambhajinagar and Jalgaon."
    },
    localCuisine: "Naan Qalia, Shev Bhaji, and fresh Sitaphal (custard apple) shake.",
    rating: 4.9,
    reviewsCount: 4100
  },
  {
    id: "ellora-caves",
    slug: "ellora-caves",
    name: "Ellora Caves & Kailasa Temple (UNESCO)",
    marathiName: "वेरूळ लेणी आणि कैलास मंदिर",
    category: "heritage",
    circuit: "UNESCO Heritage Circuit",
    district: "Chhatrapati Sambhajinagar",
    region: "Marathwada",
    bestTime: "October to March",
    timings: "06:00 AM – 06:00 PM (Closed on Tuesdays)",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    summary: "34 monumental rock-cut shrines spanning Buddhist, Hindu, and Jain traditions, crowned by the monolithic Kailasa Temple (Cave 16).",
    history: "Dating from the 6th to 10th centuries CE under Rashtrakuta and Yadava patronage. Kailasa Temple (Cave 16), carved top-down from a single volcanic basalt cliff, remains humanity's greatest rock-cut architectural feat.",
    attractions: [
      "Cave 16: Kailasa Temple (World's largest monolithic stone excavation)",
      "Cave 10: Vishwakarma Cave (Carpenter's Cave Chaitya with music stupa)",
      "Cave 32: Indra Sabha (Two-story Jain cave with delicate lotus carvings)",
      "Nearby Grishneshwar Jyotirlinga and Daulatabad Fort"
    ],
    coordinates: { lat: 20.0264, lng: 75.1792, mapsUrl: "https://maps.google.com/?q=20.0264,75.1792" },
    howToReach: {
      air: "Chhatrapati Sambhajinagar Airport (30 km).",
      rail: "Sambhajinagar Railway Station (28 km).",
      road: "30 km northwest of central Sambhajinagar on state highway."
    },
    localCuisine: "Marathwada Dal Baati, Pithla Bhakar, and Sweet Imarti.",
    rating: 5.0,
    reviewsCount: 4600
  },
  {
    id: "elephanta-caves",
    slug: "elephanta-caves",
    name: "Elephanta Caves (UNESCO World Heritage)",
    marathiName: "घरापुरी (एलिफंटा) लेणी",
    category: "heritage",
    circuit: "Mumbai Maritime Heritage",
    district: "Mumbai / Raigad",
    region: "Konkan",
    bestTime: "November to March",
    timings: "09:00 AM – 05:30 PM (Closed on Mondays)",
    entryFee: "₹40 (Ferry return: ₹260)",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
    summary: "Island rock-cut temples dedicated to Lord Shiva, famous worldwide for the sublime 6-meter Trimurti sculpture.",
    history: "Known locally as Gharapuri, the caves were carved between the 5th and 8th centuries CE under the Konkan Mauryas and Kalachuris. The Portuguese named the island Elephanta after a colossal stone elephant found near the shore.",
    attractions: [
      "Colossal 20-foot Sadashiva / Trimurti sculpture (Creator, Preserver, Destroyer)",
      "Gangadhara and Ardhanarishvara master relief carvings",
      "Scenic ferry crossing from Gateway of India with sea gulls",
      "Toy train ride from island jetty to cave stairway base"
    ],
    coordinates: { lat: 18.9633, lng: 72.9315, mapsUrl: "https://maps.google.com/?q=18.9633,72.9315" },
    howToReach: {
      air: "Mumbai International Airport (25 km to Gateway).",
      rail: "CSMT / Churchgate Stations (3 km to Gateway).",
      road: "Ferry departs every 30 minutes from Gateway of India, Colaba."
    },
    localCuisine: "Bombay cutting chai, Vada Pav, and fresh roasted sweet corn on the jetty.",
    rating: 4.8,
    reviewsCount: 3200
  },
  {
    id: "csmt-station",
    slug: "csmt-station",
    name: "Chhatrapati Shivaji Maharaj Terminus (CSMT)",
    marathiName: "छत्रपती शिवाजी महाराज टर्मिनस",
    category: "heritage",
    circuit: "Victorian Gothic Mumbai",
    district: "Mumbai",
    region: "Konkan",
    bestTime: "October to March (Illuminated nightly)",
    timings: "24 Hours (Heritage Gallery: 02:00 PM – 05:00 PM)",
    entryFee: "Free (Heritage Museum ticket: ₹100)",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
    summary: "UNESCO World Heritage masterpiece of Victorian High Gothic and traditional Indian palace architecture.",
    history: "Designed by Frederick William Stevens and completed in 1887 to mark Queen Victoria's Golden Jubilee, the historic headquarters of Central Railway features a 100-foot ribbed octagonal dome surmounted by the statue of Progress.",
    attractions: [
      "Grand 100-ft ribbed dome and Gothic gargoyles",
      "Night illumination in tricolor and festive lights",
      "Heritage gallery displaying vintage railway relics",
      "Stained glass windows and marble grand staircases"
    ],
    coordinates: { lat: 18.9398, lng: 72.8354, mapsUrl: "https://maps.google.com/?q=18.9398,72.8354" },
    howToReach: {
      air: "Mumbai Airport (20 km).",
      rail: "Direct terminal at CSMT.",
      road: "Central Fort heritage precinct, South Mumbai."
    },
    localCuisine: "Iconic Mumbai Pav Bhaji, Bun Maska at heritage Irani cafes, Falooda.",
    rating: 4.9,
    reviewsCount: 3900
  }
];
