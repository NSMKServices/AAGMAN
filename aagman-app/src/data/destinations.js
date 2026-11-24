/**
 * AAGMAN - Canonical Destinations Dataset
 * Comprehensive, verified information for Maharashtra Tourism & Heritage Platform
 * Categories: forts, temples, beaches, heritage
 */
import { ALL_DESTINATION_IMAGE_REGISTRY } from './imageRegistry';

export const DESTINATIONS = [
  // ==========================================
  // FORTS & SAHYADRI TREKKING (17 DESTINATIONS)
  // ==========================================
  {
    id: "raigad-fort",
    slug: "raigad",
    name: "Raigad Fort",
    marathiName: "किल्ले रायगड",
    nameHi: "रायगढ़ किला",
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
    nameHi: "सिंहगढ़ किला",
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
    nameHi: "प्रतापगढ़ किला",
    category: "forts",
    circuit: "Satara Hill Circuit",
    district: "Satara",
    region: "Western Maharashtra",
    elevation: "1,080 m (3,540 ft)",
    difficulty: "Easy (Paved Stairs)",
    bestTime: "September to April",
    timings: "06:00 AM – 06:00 PM",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "मुरुड-जंजीरा समुद्री किला",
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
    nameHi: "शिवनेरी किला",
    category: "forts",
    circuit: "Junnar Heritage Circuit",
    district: "Pune",
    region: "Western Maharashtra",
    elevation: "1,067 m (3,500 ft)",
    difficulty: "Easy to Moderate (Well-maintained Steps)",
    bestTime: "July to March",
    timings: "05:30 AM – 06:30 PM",
    entryFee: "₹25 (ASI fee)",
    heroImage: "https://images.unsplash.com/photo-1626014303757-6466299b39be?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1626014303757-6466299b39be?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "राजगढ़ किला",
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
    nameHi: "तोरणा किला (प्रचंडगढ़)",
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
    nameHi: "हरिश्चंद्रगढ़",
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
    nameHi: "सिंधुदुर्ग किला",
    category: "forts",
    circuit: "Malvan Coastal Circuit",
    district: "Sindhudurg",
    region: "Konkan",
    elevation: "Sea Level (Island Fort)",
    difficulty: "Easy (Ferry Access)",
    bestTime: "October to May",
    timings: "08:00 AM – 05:30 PM",
    entryFee: "₹50 (Ferry: ₹90)",
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "पन्हाला किला",
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
    nameHi: "लोहगढ़ और विसापुर किले",
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
    nameHi: "कलसूबाई शिखर",
    category: "forts",
    circuit: "Sahyadri Summits",
    district: "Ahmednagar",
    region: "Western Maharashtra",
    elevation: "1,646 m (5,400 ft) — Everest of Maharashtra",
    difficulty: "Moderate (Steel Ladders Installed)",
    bestTime: "July to February",
    timings: "05:00 AM – 06:00 PM",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "त्र्यंबकेश्वर मंदिर",
    category: "temples",
    circuit: "Jyotirlinga & Godavari Circuit",
    district: "Nashik",
    region: "North Maharashtra",
    bestTime: "October to March (Also Shravan month)",
    timings: "05:30 AM – 09:00 PM",
    entryFee: "Free (VIP Darshan: ₹200)",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "मोरगांव मयूरेश्वर मंदिर",
    category: "temples",
    circuit: "Ashtavinayak Circuit",
    district: "Pune",
    region: "Western Maharashtra",
    bestTime: "September to February",
    timings: "05:00 AM – 10:00 PM",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "शिरडी साईं बाबा मंदिर",
    category: "temples",
    circuit: "Spiritual Shrines",
    district: "Ahmednagar",
    region: "Western Maharashtra",
    bestTime: "October to March",
    timings: "04:00 AM – 11:15 PM",
    entryFee: "Free (VIP passes online)",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "पंढरपुर विठ्ठल मंदिर",
    category: "temples",
    circuit: "Warkari Bhakti Circuit",
    district: "Solapur",
    region: "Western Maharashtra",
    bestTime: "Ashadhi / Kartiki Ekadashi & Winter",
    timings: "04:00 AM – 11:00 PM",
    entryFee: "Free (Online E-pass available)",
    heroImage: "https://images.unsplash.com/photo-1609766418204-94aae0ecfddc?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1609766418204-94aae0ecfddc?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "काशीद समुद्र तट",
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
    nameHi: "गणपतिपुले समुद्र तट",
    category: "beaches",
    circuit: "Ratnagiri Coastal Circuit",
    district: "Ratnagiri",
    region: "Konkan",
    bestTime: "September to May",
    timings: "Open 24 Hours",
    entryFee: "Free",
    heroImage: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "तारकर्ली समुद्र तट",
    category: "beaches",
    circuit: "Malvan Marine Circuit",
    district: "Sindhudurg",
    region: "Konkan",
    bestTime: "October to April",
    timings: "Open 24 Hours",
    entryFee: "Free (Scuba: ₹1,500 – ₹2,500)",
    heroImage: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "अजंता गुफाएँ (विश्व धरोहर)",
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
    nameHi: "एलोरा गुफाएँ और कैलाश मंदिर",
    category: "heritage",
    circuit: "UNESCO Heritage Circuit",
    district: "Chhatrapati Sambhajinagar",
    region: "Marathwada",
    bestTime: "October to March",
    timings: "06:00 AM – 06:00 PM (Closed on Tuesdays)",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    heroImage: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "एलीफेंटा गुफाएँ (विश्व धरोहर)",
    category: "heritage",
    circuit: "Mumbai Maritime Heritage",
    district: "Mumbai / Raigad",
    region: "Konkan",
    bestTime: "November to March",
    timings: "09:00 AM – 05:30 PM (Closed on Mondays)",
    entryFee: "₹40 (Ferry return: ₹260)",
    heroImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80",
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
    nameHi: "छत्रपति शिवाजी महाराज टर्मिनस",
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
  },
  // Additional destinations across forts, temples and the Konkan coast
{
  "id": "purandar-fort",
  "slug": "purandar",
  "name": "Purandar Fort",
  "marathiName": "पुरंदर किल्ला",
  "nameHi": "पुरंदर किला",
  "category": "forts",
  "circuit": "Pune Fort Circuit",
  "district": "Pune",
  "region": "Western Maharashtra",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80",
  "summary": "A hill fort near Saswad associated with the early history of Chhatrapati Shivaji Maharaj and the Maratha state.",
  "summaryMr": "सासवडजवळील डोंगरी किल्ला; छत्रपती शिवाजी महाराज आणि मराठा स्वराज्याच्या आरंभीच्या इतिहासाशी संबंधित.",
  "summaryHi": "सासवड के पास स्थित पहाड़ी किला, जो छत्रपति शिवाजी महाराज और मराठा स्वराज्य के प्रारंभिक इतिहास से जुड़ा है।",
  "history": "Purandar has held strategic importance across successive Deccan powers. It is also remembered as the birthplace of Sambhaji Maharaj.",
  "historyMr": "दख्खनमधील विविध सत्तांच्या काळात पुरंदरला सामरिक महत्त्व होते. संभाजी महाराजांचे जन्मस्थान म्हणूनही या किल्ल्याची ओळख आहे.",
  "historyHi": "दक्कन की विभिन्न सत्ताओं के दौर में पुरंदर का सामरिक महत्व रहा। इसे संभाजी महाराज के जन्मस्थान के रूप में भी याद किया जाता है।",
  "attractions": [
    "Bale Killa and fort gateways",
    "Upper and lower fortifications",
    "Views of the Saswad countryside"
  ],
  "attractionsMr": [
    "बालेकिल्ला आणि प्रवेशद्वारे",
    "वरचा व खालचा किल्ला",
    "सासवड परिसराचे विहंगम दृश्य"
  ],
  "attractionsHi": [
    "बाले किला और प्रवेश द्वार",
    "ऊपरी और निचली किलेबंदी",
    "सासवड क्षेत्र के दृश्य"
  ],
  "coordinates": {
    "lat": 18.2815,
    "lng": 73.9734,
    "mapsUrl": "https://maps.google.com/?q=18.2815,73.9734"
  },
  "howToReach": {
    "air": "Pune Airport; onward road travel to Saswad.",
    "rail": "Pune railway station; onward road travel.",
    "road": "Reach Saswad from Pune, then continue to the fort access point."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे सासवडकडे रस्त्याने.",
    "rail": "पुणे रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "पुण्याहून सासवडमार्गे किल्ल्याच्या प्रवेशस्थळापर्यंत जा."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सासवड तक सड़क मार्ग.",
    "rail": "पुणे रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "पुणे से सासवड होकर किले के प्रवेश स्थल तक जाएँ।"
  },
  "localCuisine": "Pune-style misal, bhakri and local Maharashtrian meals.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "rajmachi-fort",
  "slug": "rajmachi",
  "name": "Rajmachi Fort",
  "marathiName": "राजमाची किल्ला",
  "nameHi": "राजमाची किला",
  "category": "forts",
  "circuit": "Sahyadri Trek Circuit",
  "district": "Pune",
  "region": "Western Maharashtra",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80",
  "summary": "A scenic hill-fort complex above the Bor Ghat, known for its twin strongholds and trekking routes.",
  "summaryMr": "बोरघाटाच्या माथ्यावर असलेला निसर्गरम्य दुर्गसमूह; दोन बालेकिल्ले आणि ट्रेकिंग मार्गांसाठी प्रसिद्ध.",
  "summaryHi": "बोर घाट के ऊपर स्थित सुंदर पहाड़ी दुर्ग समूह, जो अपने दो किलों और ट्रेकिंग मार्गों के लिए जाना जाता है।",
  "history": "Rajmachi consists of Shrivardhan and Manaranjan forts and historically overlooked an important route through the Sahyadris.",
  "historyMr": "राजमाचीमध्ये श्रीवर्धन आणि मनरंजन हे दोन किल्ले आहेत. सह्याद्रीतील महत्त्वाच्या घाटमार्गावर त्याचे नियंत्रण होते.",
  "historyHi": "राजमाची में श्रीवर्धन और मनरंजन नामक दो किले हैं। यह सह्याद्रि के एक महत्वपूर्ण घाट मार्ग पर नजर रखता था।",
  "attractions": [
    "Shrivardhan Fort",
    "Manaranjan Fort",
    "Udhhewadi village and valley viewpoints"
  ],
  "attractionsMr": [
    "श्रीवर्धन किल्ला",
    "मनरंजन किल्ला",
    "उधेवाडी गाव आणि दरीतील दृश्यबिंदू"
  ],
  "attractionsHi": [
    "श्रीवर्धन किला",
    "मनरंजन किला",
    "उधेवाडी गाँव और घाटी के दृश्य स्थल"
  ],
  "coordinates": {
    "lat": 18.835,
    "lng": 73.387,
    "mapsUrl": "https://maps.google.com/?q=18.835,73.387"
  },
  "howToReach": {
    "air": "Pune Airport; onward road journey.",
    "rail": "Lonavala railway station, then local transport or trek.",
    "road": "Access via Lonavala or Kondivade; confirm the selected trekking route locally."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "लोणावळा रेल्वे स्थानक; पुढे स्थानिक वाहतूक किंवा पायी मार्ग.",
    "road": "लोणावळा किंवा कोंढिवडे मार्गे जा; निवडलेला ट्रेक मार्ग स्थानिक पातळीवर तपासा."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "लोणावला रेलवे स्टेशन; फिर स्थानीय वाहन या पैदल मार्ग.",
    "road": "लोणावला या कोंढिवडे से पहुँचें; चुने गए ट्रेक मार्ग की स्थानीय पुष्टि करें।"
  },
  "localCuisine": "Local village meals and Maharashtrian snacks.",
  "sourceUrl": "https://maharashtratourism.gov.in/adventure-tourism/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "vijaydurg-fort",
  "slug": "vijaydurg",
  "name": "Vijaydurg Fort",
  "marathiName": "विजयदुर्ग किल्ला",
  "nameHi": "विजयदुर्ग किला",
  "category": "forts",
  "circuit": "Konkan Sea Fort Circuit",
  "district": "Sindhudurg",
  "region": "Konkan",
  "bestTime": "October to March",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80",
  "summary": "A historic sea fort on the Konkan coast, associated with Maratha naval history.",
  "summaryMr": "कोकण किनाऱ्यावरील ऐतिहासिक जलदुर्ग; मराठा आरमाराच्या इतिहासाशी संबंधित.",
  "summaryHi": "कोंकण तट पर स्थित ऐतिहासिक समुद्री किला, जो मराठा नौसैनिक इतिहास से जुड़ा है।",
  "history": "Vijaydurg was an important coastal stronghold and naval base during the Maratha period.",
  "historyMr": "मराठा काळात विजयदुर्ग महत्त्वाचा किनारी दुर्ग आणि आरमारी तळ होता.",
  "historyHi": "मराठा काल में विजयदुर्ग एक महत्वपूर्ण तटीय दुर्ग और नौसैनिक अड्डा था।",
  "attractions": [
    "Sea-facing fort walls",
    "Historic bastions and gateways",
    "Views of the creek and Arabian Sea"
  ],
  "attractionsMr": [
    "समुद्राकडे असलेल्या तटबंद्या",
    "ऐतिहासिक बुरुज आणि प्रवेशद्वारे",
    "खाडी व अरबी समुद्राचे दृश्य"
  ],
  "attractionsHi": [
    "समुद्र की ओर बनी किले की दीवारें",
    "ऐतिहासिक बुर्ज और प्रवेश द्वार",
    "खाड़ी और अरब सागर के दृश्य"
  ],
  "coordinates": {
    "lat": 16.5584,
    "lng": 73.337,
    "mapsUrl": "https://maps.google.com/?q=16.5584,73.337"
  },
  "howToReach": {
    "air": "Sindhudurg or Goa airport; onward road journey.",
    "rail": "Kankavli or Rajapur Road railway station; onward road travel.",
    "road": "Reach Vijaydurg village by road along the Konkan coast."
  },
  "howToReachMr": {
    "air": "सिंधुदुर्ग किंवा गोवा विमानतळ; पुढे रस्त्याने.",
    "rail": "कणकवली किंवा राजापूर रोड रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "कोकण किनारपट्टीवरील रस्त्याने विजयदुर्ग गावात पोहोचा."
  },
  "howToReachHi": {
    "air": "सिंधुदुर्ग या गोवा हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "कणकवली या राजापुर रोड रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "कोंकण तटीय सड़क से विजयदुर्ग गाँव पहुँचें।"
  },
  "localCuisine": "Malvani fish thali, solkadhi and local vegetarian meals.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "sajjangad-fort",
  "slug": "sajjangad",
  "name": "Sajjangad Fort",
  "marathiName": "सज्जनगड किल्ला",
  "nameHi": "सज्जनगढ़ किला",
  "category": "forts",
  "circuit": "Satara Spiritual Circuit",
  "district": "Satara",
  "region": "Western Maharashtra",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80",
  "summary": "A hilltop fort and pilgrimage site associated with the saint Samarth Ramdas.",
  "summaryMr": "समर्थ रामदास स्वामी यांच्या स्मृतींशी संबंधित डोंगरी किल्ला आणि तीर्थक्षेत्र.",
  "summaryHi": "समर्थ रामदास स्वामी से जुड़ा पहाड़ी किला और तीर्थस्थल।",
  "history": "Sajjangad became the final residence of Samarth Ramdas Swami and is visited for its historical and spiritual associations.",
  "historyMr": "सज्जनगड हे समर्थ रामदास स्वामी यांचे अंतिम निवासस्थान होते. ऐतिहासिक आणि आध्यात्मिक महत्त्वामुळे येथे भाविक येतात.",
  "historyHi": "सज्जनगढ़ समर्थ रामदास स्वामी का अंतिम निवास स्थान था। इसके ऐतिहासिक और आध्यात्मिक महत्व के कारण श्रद्धालु यहाँ आते हैं।",
  "attractions": [
    "Samarth Ramdas Swami samadhi",
    "Temple complex and fort precinct",
    "Panoramic views of the surrounding hills"
  ],
  "attractionsMr": [
    "समर्थ रामदास स्वामी समाधी",
    "मंदिर समूह आणि किल्ला परिसर",
    "सभोवतालच्या डोंगरांचे विहंगम दृश्य"
  ],
  "attractionsHi": [
    "समर्थ रामदास स्वामी की समाधि",
    "मंदिर परिसर और किले का क्षेत्र",
    "आसपास की पहाड़ियों के दृश्य"
  ],
  "coordinates": {
    "lat": 17.6805,
    "lng": 73.9812,
    "mapsUrl": "https://maps.google.com/?q=17.6805,73.9812"
  },
  "howToReach": {
    "air": "Pune Airport; onward road travel to Satara.",
    "rail": "Satara railway station; local road transport.",
    "road": "About 15 km from Satara; follow local access and visitor guidance."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे साताऱ्याकडे रस्त्याने.",
    "rail": "सातारा रेल्वे स्थानक; पुढे स्थानिक रस्ते वाहतूक.",
    "road": "साताऱ्यापासून सुमारे १५ किमी; स्थानिक प्रवेशसूचना पाळा."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सातारा तक सड़क मार्ग.",
    "rail": "सातारा रेलवे स्टेशन; आगे स्थानीय सड़क परिवहन.",
    "road": "सातारा से लगभग 15 किमी; स्थानीय प्रवेश निर्देशों का पालन करें।"
  },
  "localCuisine": "Satara kanda bhaji, pithla-bhakri and local meals.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "siddhivinayak-temple-mumbai",
  "slug": "siddhivinayak-temple-mumbai",
  "name": "Siddhivinayak Temple",
  "marathiName": "श्री सिद्धिविनायक मंदिर",
  "nameHi": "श्री सिद्धिविनायक मंदिर",
  "category": "temples",
  "circuit": "Mumbai Spiritual Circuit",
  "district": "Mumbai City",
  "region": "Konkan",
  "bestTime": "Throughout the year",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=600&q=80",
  "summary": "One of Mumbai's best-known Ganesh temples and an important place of worship for devotees.",
  "summaryMr": "मुंबईतील प्रसिद्ध गणेश मंदिर आणि भाविकांचे महत्त्वाचे श्रद्धास्थान.",
  "summaryHi": "मुंबई का प्रसिद्ध गणेश मंदिर और श्रद्धालुओं का महत्वपूर्ण पूजा स्थल।",
  "history": "The temple at Prabhadevi is dedicated to Lord Ganesha and attracts devotees throughout the year, especially on Tuesdays and during Ganesh festivities.",
  "historyMr": "प्रभादेवी येथील हे मंदिर भगवान गणेशाला समर्पित असून वर्षभर भाविक येथे येतात; मंगळवार आणि गणेशोत्सवात विशेष गर्दी असते.",
  "historyHi": "प्रभादेवी स्थित यह मंदिर भगवान गणेश को समर्पित है। यहाँ वर्ष भर श्रद्धालु आते हैं, विशेषकर मंगलवार और गणेश उत्सव के दौरान।",
  "attractions": [
    "Main Ganesh shrine",
    "Temple architecture and devotional atmosphere",
    "Nearby Prabhadevi neighbourhood"
  ],
  "attractionsMr": [
    "मुख्य गणेश मंदिर",
    "मंदिराची वास्तुरचना आणि भक्तिमय वातावरण",
    "जवळचा प्रभादेवी परिसर"
  ],
  "attractionsHi": [
    "मुख्य गणेश मंदिर",
    "मंदिर की वास्तुकला और भक्तिमय वातावरण",
    "पास का प्रभादेवी क्षेत्र"
  ],
  "coordinates": {
    "lat": 19.0169,
    "lng": 72.8305,
    "mapsUrl": "https://maps.google.com/?q=19.0169,72.8305"
  },
  "howToReach": {
    "air": "Chhatrapati Shivaji Maharaj International Airport; city transport.",
    "rail": "Prabhadevi station and nearby Mumbai suburban rail connections.",
    "road": "Located in Prabhadevi, Mumbai; use local traffic and parking guidance."
  },
  "howToReachMr": {
    "air": "छत्रपती शिवाजी महाराज आंतरराष्ट्रीय विमानतळ; शहरातील वाहतूक.",
    "rail": "प्रभादेवी स्थानक आणि मुंबई उपनगरी रेल्वे.",
    "road": "मुंबईतील प्रभादेवी येथे; स्थानिक वाहतूक व पार्किंग सूचना तपासा."
  },
  "howToReachHi": {
    "air": "छत्रपति शिवाजी महाराज अंतरराष्ट्रीय हवाई अड्डा; शहर परिवहन.",
    "rail": "प्रभादेवी स्टेशन और मुंबई उपनगरीय रेल संपर्क.",
    "road": "मुंबई के प्रभादेवी में स्थित; स्थानीय यातायात और पार्किंग निर्देश देखें।"
  },
  "localCuisine": "Mumbai street food and traditional Maharashtrian snacks.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "bhimashankar-temple",
  "slug": "bhimashankar",
  "name": "Bhimashankar Temple",
  "marathiName": "भीमाशंकर मंदिर",
  "nameHi": "भीमाशंकर मंदिर",
  "category": "temples",
  "circuit": "Jyotirlinga Pilgrimage Circuit",
  "district": "Pune",
  "region": "Western Maharashtra",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=600&q=80",
  "summary": "A major Shiva pilgrimage site set amid the forested Sahyadri hills.",
  "summaryMr": "सह्याद्रीच्या वनराईत वसलेले भगवान शिवाचे महत्त्वाचे ज्योतिर्लिंग तीर्थक्षेत्र.",
  "summaryHi": "सह्याद्रि के वनाच्छादित पहाड़ों में स्थित भगवान शिव का प्रमुख ज्योतिर्लिंग तीर्थस्थल।",
  "history": "Bhimashankar is traditionally counted among the twelve Jyotirlingas and is closely associated with the surrounding wildlife sanctuary.",
  "historyMr": "भीमाशंकर हे पारंपरिक बारा ज्योतिर्लिंगांपैकी एक मानले जाते. परिसरातील वन्यजीव अभयारण्यामुळेही हे ठिकाण प्रसिद्ध आहे.",
  "historyHi": "भीमाशंकर को परंपरागत रूप से बारह ज्योतिर्लिंगों में गिना जाता है। आसपास का वन्यजीव अभयारण्य भी इस क्षेत्र की विशेषता है।",
  "attractions": [
    "Bhimashankar Jyotirlinga shrine",
    "Ancient temple architecture",
    "Forest trails and viewpoints nearby"
  ],
  "attractionsMr": [
    "भीमाशंकर ज्योतिर्लिंग मंदिर",
    "प्राचीन मंदिर वास्तुरचना",
    "जवळील वनमार्ग आणि दृश्यबिंदू"
  ],
  "attractionsHi": [
    "भीमाशंकर ज्योतिर्लिंग मंदिर",
    "प्राचीन मंदिर वास्तुकला",
    "पास के वन मार्ग और दृश्य स्थल"
  ],
  "coordinates": {
    "lat": 19.0727,
    "lng": 73.5353,
    "mapsUrl": "https://maps.google.com/?q=19.0727,73.5353"
  },
  "howToReach": {
    "air": "Pune Airport; onward road journey.",
    "rail": "Pune railway station; onward road journey.",
    "road": "Reach via the hill roads from Pune or nearby towns; check monsoon road conditions."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "पुणे रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "पुणे किंवा जवळच्या शहरांतून घाटरस्त्याने जा; पावसाळ्यातील रस्त्यांची स्थिती तपासा."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "पुणे रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "पुणे या आसपास के शहरों से पहाड़ी सड़क मार्ग लें; मानसून में सड़क की स्थिति जाँचें।"
  },
  "localCuisine": "Local Maharashtrian vegetarian meals and prasad.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "grishneshwar-temple",
  "slug": "grishneshwar",
  "name": "Grishneshwar Jyotirlinga Temple",
  "marathiName": "घृष्णेश्वर ज्योतिर्लिंग मंदिर",
  "nameHi": "घृष्णेश्वर ज्योतिर्लिंग मंदिर",
  "category": "temples",
  "circuit": "Chhatrapati Sambhajinagar Heritage Circuit",
  "district": "Chhatrapati Sambhajinagar",
  "region": "Marathwada",
  "bestTime": "October to March",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=600&q=80",
  "summary": "A revered Shiva temple near the Ellora Caves and one of the twelve Jyotirlinga shrines.",
  "summaryMr": "एलोरा लेण्यांजवळील भगवान शिवाचे प्रसिद्ध मंदिर; बारा ज्योतिर्लिंगांपैकी एक.",
  "summaryHi": "एलोरा गुफाओं के पास स्थित भगवान शिव का प्रसिद्ध मंदिर और बारह ज्योतिर्लिंगों में से एक।",
  "history": "The temple is part of the Ellora heritage landscape and is an important pilgrimage stop for devotees of Lord Shiva.",
  "historyMr": "हे मंदिर एलोरा वारसा परिसराचा भाग असून भगवान शिवाच्या भक्तांसाठी महत्त्वाचे तीर्थस्थान आहे.",
  "historyHi": "यह मंदिर एलोरा विरासत क्षेत्र का हिस्सा है और भगवान शिव के भक्तों के लिए महत्वपूर्ण तीर्थस्थल है।",
  "attractions": [
    "Jyotirlinga sanctum",
    "Traditional stone temple architecture",
    "Proximity to Ellora Caves"
  ],
  "attractionsMr": [
    "ज्योतिर्लिंग गर्भगृह",
    "पारंपरिक दगडी मंदिर वास्तुरचना",
    "एलोरा लेण्यांजवळील स्थान"
  ],
  "attractionsHi": [
    "ज्योतिर्लिंग गर्भगृह",
    "पारंपरिक पत्थर की मंदिर वास्तुकला",
    "एलोरा गुफाओं के निकट"
  ],
  "coordinates": {
    "lat": 20.0241,
    "lng": 75.1792,
    "mapsUrl": "https://maps.google.com/?q=20.0241,75.1792"
  },
  "howToReach": {
    "air": "Chhatrapati Sambhajinagar Airport; onward road travel.",
    "rail": "Chhatrapati Sambhajinagar railway station; onward road travel.",
    "road": "Located near Ellora, around 30 km from Chhatrapati Sambhajinagar."
  },
  "howToReachMr": {
    "air": "छत्रपती संभाजीनगर विमानतळ; पुढे रस्त्याने.",
    "rail": "छत्रपती संभाजीनगर रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "एलोरा जवळ; छत्रपती संभाजीनगरपासून सुमारे ३० किमी."
  },
  "howToReachHi": {
    "air": "छत्रपति संभाजीनगर हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "छत्रपति संभाजीनगर रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "एलोरा के पास; छत्रपति संभाजीनगर से लगभग 30 किमी।"
  },
  "localCuisine": "Marathwada vegetarian thali and local snacks.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "mahalaxmi-temple-kolhapur",
  "slug": "mahalaxmi-temple",
  "name": "Shree Mahalaxmi Ambabai Temple",
  "marathiName": "श्री महालक्ष्मी अंबाबाई मंदिर",
  "nameHi": "श्री महालक्ष्मी अंबाबाई मंदिर",
  "category": "temples",
  "circuit": "Kolhapur Spiritual Circuit",
  "district": "Kolhapur",
  "region": "Western Maharashtra",
  "bestTime": "October to March",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=600&q=80",
  "summary": "A major Shakti pilgrimage temple in Kolhapur, revered as the shrine of Goddess Ambabai.",
  "summaryMr": "कोल्हापुरातील देवी अंबाबाईचे प्रमुख शक्तिपीठ आणि महत्त्वाचे तीर्थक्षेत्र.",
  "summaryHi": "कोल्हापुर में देवी अंबाबाई का प्रमुख शक्तिपीठ और महत्वपूर्ण तीर्थस्थल।",
  "history": "The temple is an important centre of worship and local heritage, with festivals and rituals drawing devotees through the year.",
  "historyMr": "हे मंदिर उपासना आणि स्थानिक वारशाचे महत्त्वाचे केंद्र आहे. वर्षभर उत्सव आणि विधींसाठी भाविक येथे येतात.",
  "historyHi": "यह मंदिर पूजा और स्थानीय विरासत का महत्वपूर्ण केंद्र है। वर्ष भर उत्सवों और अनुष्ठानों में श्रद्धालु भाग लेते हैं।",
  "attractions": [
    "Ambabai shrine",
    "Temple courtyard and stone architecture",
    "Kirnotsav sun-ray tradition"
  ],
  "attractionsMr": [
    "अंबाबाई देवीचे मंदिर",
    "मंदिर प्रांगण आणि दगडी वास्तुरचना",
    "किरणोत्सवाची सूर्यकिरण परंपरा"
  ],
  "attractionsHi": [
    "अंबाबाई देवी का मंदिर",
    "मंदिर प्रांगण और पत्थर की वास्तुकला",
    "किरणोत्सव की सूर्यकिरण परंपरा"
  ],
  "coordinates": {
    "lat": 16.7008,
    "lng": 74.2333,
    "mapsUrl": "https://maps.google.com/?q=16.7008,74.2333"
  },
  "howToReach": {
    "air": "Kolhapur Airport; limited routes, or Pune/Belgaum airports.",
    "rail": "Kolhapur railway station.",
    "road": "Located in central Kolhapur with city bus, taxi and auto access."
  },
  "howToReachMr": {
    "air": "कोल्हापूर विमानतळ; पर्यायी पुणे किंवा बेळगाव विमानतळ.",
    "rail": "कोल्हापूर रेल्वे स्थानक.",
    "road": "कोल्हापूर शहराच्या मध्यभागी; बस, टॅक्सी आणि रिक्षाने पोहोचता येते."
  },
  "howToReachHi": {
    "air": "कोल्हापुर हवाई अड्डा; विकल्प के रूप में पुणे या बेलगावी.",
    "rail": "कोल्हापुर रेलवे स्टेशन.",
    "road": "कोल्हापुर शहर के मध्य में; बस, टैक्सी और ऑटो उपलब्ध।"
  },
  "localCuisine": "Kolhapuri misal, tambda rassa and pandhra rassa.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "tulja-bhavani-temple",
  "slug": "tuljapur",
  "name": "Tulja Bhavani Temple",
  "marathiName": "तुळजाभवानी मंदिर",
  "nameHi": "तुलजा भवानी मंदिर",
  "category": "temples",
  "circuit": "Marathwada Pilgrimage Circuit",
  "district": "Dharashiv",
  "region": "Marathwada",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1600100397608-f010e42e4e7a?auto=format&fit=crop&w=600&q=80",
  "summary": "A major pilgrimage temple dedicated to Goddess Bhavani at Tuljapur.",
  "summaryMr": "तुळजापूर येथील देवी भवानीला समर्पित महत्त्वाचे तीर्थक्षेत्र.",
  "summaryHi": "तुलजापुर में देवी भवानी को समर्पित प्रमुख तीर्थस्थल।",
  "history": "The temple is a significant Shakti shrine and is closely associated with the religious and cultural history of the region.",
  "historyMr": "हे मंदिर महत्त्वाचे शक्तिपीठ असून परिसराच्या धार्मिक आणि सांस्कृतिक इतिहासाशी जोडलेले आहे.",
  "historyHi": "यह मंदिर प्रमुख शक्तिपीठ है और क्षेत्र के धार्मिक तथा सांस्कृतिक इतिहास से जुड़ा है।",
  "attractions": [
    "Main Bhavani shrine",
    "Temple precinct and traditional rituals",
    "Pilgrim market streets"
  ],
  "attractionsMr": [
    "मुख्य भवानी मंदिर",
    "मंदिर परिसर आणि पारंपरिक विधी",
    "यात्रेकरूंचा बाजार परिसर"
  ],
  "attractionsHi": [
    "मुख्य भवानी मंदिर",
    "मंदिर परिसर और पारंपरिक अनुष्ठान",
    "तीर्थयात्रियों का बाजार क्षेत्र"
  ],
  "coordinates": {
    "lat": 18.0115,
    "lng": 76.0708,
    "mapsUrl": "https://maps.google.com/?q=18.0115,76.0708"
  },
  "howToReach": {
    "air": "Solapur Airport or Pune Airport; onward road travel.",
    "rail": "Solapur railway station; onward road travel.",
    "road": "Tuljapur is connected by road with Solapur and Dharashiv."
  },
  "howToReachMr": {
    "air": "सोलापूर किंवा पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "सोलापूर रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "तुळजापूर सोलापूर आणि धाराशिवशी रस्त्याने जोडलेले आहे."
  },
  "howToReachHi": {
    "air": "सोलापुर या पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "सोलापुर रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "तुलजापुर सड़क मार्ग से सोलापुर और धाराशिव से जुड़ा है।"
  },
  "localCuisine": "Marathwada bhakri, pithla and local vegetarian dishes.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "diveagar-beach",
  "slug": "diveagar",
  "name": "Diveagar Beach",
  "marathiName": "दिवेआगर समुद्रकिनारा",
  "nameHi": "दिवेआगर समुद्र तट",
  "category": "beaches",
  "circuit": "Konkan Coastal Circuit",
  "district": "Raigad",
  "region": "Konkan",
  "bestTime": "October to March",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80",
  "summary": "A quiet Konkan beach known for its broad shoreline, coastal greenery and relaxed village setting.",
  "summaryMr": "विस्तीर्ण किनारा, नारळी-पोफळीची झाडे आणि शांत गावपरिसरासाठी ओळखला जाणारा कोकणातील समुद्रकिनारा.",
  "summaryHi": "चौड़े तट, तटीय हरियाली और शांत गाँव के वातावरण के लिए प्रसिद्ध कोंकण का समुद्र तट।",
  "history": "Diveagar is a coastal village in Raigad district where beach visits can be combined with nearby temples and other Konkan stops.",
  "historyMr": "दिवेआगर हे रायगड जिल्ह्यातील किनारी गाव असून जवळील मंदिरे आणि कोकणातील इतर ठिकाणांसह भेट देता येते.",
  "historyHi": "दिवेआगर रायगढ़ जिले का तटीय गाँव है। यहाँ समुद्र तट के साथ आसपास के मंदिरों और कोंकण के अन्य स्थलों की यात्रा की जा सकती है।",
  "attractions": [
    "Long sandy shoreline",
    "Fishing village atmosphere",
    "Nearby Suvarna Ganesh Temple"
  ],
  "attractionsMr": [
    "लांब वाळूचा किनारा",
    "मच्छीमार गावाचे वातावरण",
    "जवळील सुवर्ण गणेश मंदिर"
  ],
  "attractionsHi": [
    "लंबा रेतीला तट",
    "मछुआरा गाँव का वातावरण",
    "पास का सुवर्ण गणेश मंदिर"
  ],
  "coordinates": {
    "lat": 18.173,
    "lng": 72.991,
    "mapsUrl": "https://maps.google.com/?q=18.173,72.991"
  },
  "howToReach": {
    "air": "Mumbai or Pune airport; onward road journey.",
    "rail": "Mangaon railway station; onward road journey.",
    "road": "Reach via Mangaon and the coastal road network."
  },
  "howToReachMr": {
    "air": "मुंबई किंवा पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "माणगाव रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "माणगाव आणि किनारी रस्त्यांमार्गे पोहोचा."
  },
  "howToReachHi": {
    "air": "मुंबई या पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "माणगाँव रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "माणगाँव और तटीय सड़क मार्ग से पहुँचें।"
  },
  "localCuisine": "Fresh seafood, solkadhi and Konkani vegetarian meals.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "harihareshwar-beach",
  "slug": "harihareshwar",
  "name": "Harihareshwar Beach",
  "marathiName": "हरिहरेश्वर समुद्रकिनारा",
  "nameHi": "हरिहरेश्वर समुद्र तट",
  "category": "beaches",
  "circuit": "Konkan Coastal Circuit",
  "district": "Raigad",
  "region": "Konkan",
  "bestTime": "October to March",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80",
  "summary": "A coastal destination known for its beach, surrounding hills and the nearby Harihareshwar temple.",
  "summaryMr": "समुद्रकिनारा, सभोवतालच्या टेकड्या आणि जवळील हरिहरेश्वर मंदिरासाठी प्रसिद्ध किनारी ठिकाण.",
  "summaryHi": "समुद्र तट, आसपास की पहाड़ियों और पास के हरिहरेश्वर मंदिर के लिए प्रसिद्ध तटीय स्थल।",
  "history": "Harihareshwar is a traditional pilgrimage and coastal destination in Raigad district, often visited with nearby Shrivardhan and Diveagar.",
  "historyMr": "हरिहरेश्वर हे रायगड जिल्ह्यातील पारंपरिक तीर्थक्षेत्र आणि किनारी पर्यटनस्थळ आहे. श्रीवर्धन व दिवेआगरसोबत येथे भेट दिली जाते.",
  "historyHi": "हरिहरेश्वर रायगढ़ जिले का पारंपरिक तीर्थ और तटीय पर्यटन स्थल है। इसे अक्सर श्रीवर्धन और दिवेआगर के साथ देखा जाता है।",
  "attractions": [
    "Harihareshwar Beach",
    "Temple and pradakshina route",
    "Coastal viewpoints and hills"
  ],
  "attractionsMr": [
    "हरिहरेश्वर समुद्रकिनारा",
    "मंदिर आणि प्रदक्षिणा मार्ग",
    "किनारी दृश्यबिंदू आणि टेकड्या"
  ],
  "attractionsHi": [
    "हरिहरेश्वर समुद्र तट",
    "मंदिर और प्रदक्षिणा मार्ग",
    "तटीय दृश्य स्थल और पहाड़ियाँ"
  ],
  "coordinates": {
    "lat": 17.9932,
    "lng": 73.0169,
    "mapsUrl": "https://maps.google.com/?q=17.9932,73.0169"
  },
  "howToReach": {
    "air": "Mumbai or Pune airport; onward road journey.",
    "rail": "Mangaon railway station; onward road journey.",
    "road": "Accessible by road from Shrivardhan and Mangaon."
  },
  "howToReachMr": {
    "air": "मुंबई किंवा पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "माणगाव रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "श्रीवर्धन आणि माणगावमार्गे रस्त्याने पोहोचता येते."
  },
  "howToReachHi": {
    "air": "मुंबई या पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "माणगाँव रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "श्रीवर्धन और माणगाँव से सड़क मार्ग द्वारा पहुँचें।"
  },
  "localCuisine": "Konkani fish curry, rice and solkadhi.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "vengurla-beach",
  "slug": "vengurla",
  "name": "Vengurla Beach",
  "marathiName": "वेंगुर्ला समुद्रकिनारा",
  "nameHi": "वेंगुर्ला समुद्र तट",
  "category": "beaches",
  "circuit": "South Konkan Coastal Circuit",
  "district": "Sindhudurg",
  "region": "Konkan",
  "bestTime": "October to March",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80",
  "summary": "A scenic South Konkan beach known for its coastal landscape and quieter shoreline.",
  "summaryMr": "दक्षिण कोकणातील निसर्गरम्य समुद्रकिनारा; शांत किनारा आणि किनारी निसर्गासाठी ओळखला जातो.",
  "summaryHi": "दक्षिण कोंकण का सुंदर समुद्र तट, जो शांत तटरेखा और तटीय प्राकृतिक दृश्यों के लिए जाना जाता है।",
  "history": "Vengurla is a coastal town in Sindhudurg district with beaches, a historic port setting and nearby coastal viewpoints.",
  "historyMr": "वेंगुर्ला हे सिंधुदुर्ग जिल्ह्यातील किनारी शहर असून येथे समुद्रकिनारे, ऐतिहासिक बंदरपरिसर आणि जवळील दृश्यबिंदू आहेत.",
  "historyHi": "वेंगुर्ला सिंधुदुर्ग जिले का तटीय नगर है, जहाँ समुद्र तट, ऐतिहासिक बंदरगाह क्षेत्र और आसपास के दृश्य स्थल हैं।",
  "attractions": [
    "Vengurla shoreline",
    "Coastal cliffs and viewpoints",
    "Local fishing harbour and markets"
  ],
  "attractionsMr": [
    "वेंगुर्ला किनारा",
    "किनारी कडे आणि दृश्यबिंदू",
    "स्थानिक मासेमारी बंदर आणि बाजार"
  ],
  "attractionsHi": [
    "वेंगुर्ला तटरेखा",
    "तटीय चट्टानें और दृश्य स्थल",
    "स्थानीय मछली पकड़ने का बंदरगाह और बाजार"
  ],
  "coordinates": {
    "lat": 15.8623,
    "lng": 73.631,
    "mapsUrl": "https://maps.google.com/?q=15.8623,73.631"
  },
  "howToReach": {
    "air": "Sindhudurg or Goa airport; onward road journey.",
    "rail": "Kudal or Sawantwadi Road railway station; onward road journey.",
    "road": "Reach Vengurla via the Konkan coastal highway network."
  },
  "howToReachMr": {
    "air": "सिंधुदुर्ग किंवा गोवा विमानतळ; पुढे रस्त्याने.",
    "rail": "कुडाळ किंवा सावंतवाडी रोड रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "कोकण किनारी महामार्गांमार्गे वेंगुर्ला येथे पोहोचा."
  },
  "howToReachHi": {
    "air": "सिंधुदुर्ग या गोवा हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "कुडाल या सावंतवाड़ी रोड रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "कोंकण तटीय राजमार्ग से वेंगुर्ला पहुँचें।"
  },
  "localCuisine": "Malvani fish curry, kokum sherbet and local vegetarian dishes.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "guhagar-beach",
  "slug": "guhagar",
  "name": "Guhagar Beach",
  "marathiName": "गुहागर समुद्रकिनारा",
  "nameHi": "गुहागर समुद्र तट",
  "category": "beaches",
  "circuit": "Ratnagiri Coastal Circuit",
  "district": "Ratnagiri",
  "region": "Konkan",
  "bestTime": "October to March",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80",
  "summary": "A long, peaceful beach on the Ratnagiri coast, bordered by a traditional Konkan town.",
  "summaryMr": "रत्नागिरी किनाऱ्यावरील लांब आणि शांत समुद्रकिनारा; पारंपरिक कोकणी गावाच्या परिसरात.",
  "summaryHi": "रत्नागिरी तट पर लंबा और शांत समुद्र तट, जो पारंपरिक कोंकणी कस्बे के पास स्थित है।",
  "history": "Guhagar is a coastal town in Ratnagiri district and a base for exploring nearby temples, villages and beaches.",
  "historyMr": "गुहागर हे रत्नागिरी जिल्ह्यातील किनारी गाव असून जवळील मंदिरे, गावे आणि समुद्रकिनारे पाहण्यासाठी आधारस्थान आहे.",
  "historyHi": "गुहागर रत्नागिरी जिले का तटीय कस्बा है और आसपास के मंदिरों, गाँवों तथा समुद्र तटों की यात्रा का आधार है।",
  "attractions": [
    "Wide sandy beach",
    "Coastal village and coconut groves",
    "Nearby Vyadeshwar Temple"
  ],
  "attractionsMr": [
    "विस्तीर्ण वाळूचा किनारा",
    "किनारी गाव आणि नारळबागा",
    "जवळील व्याडेश्वर मंदिर"
  ],
  "attractionsHi": [
    "चौड़ा रेतीला तट",
    "तटीय गाँव और नारियल के बाग",
    "पास का व्याडेश्वर मंदिर"
  ],
  "coordinates": {
    "lat": 17.4849,
    "lng": 73.1923,
    "mapsUrl": "https://maps.google.com/?q=17.4849,73.1923"
  },
  "howToReach": {
    "air": "Ratnagiri airport when services are available; otherwise Pune or Mumbai with road transfer.",
    "rail": "Chiplun or Ratnagiri railway station; onward road travel.",
    "road": "Reach via Chiplun and the coastal road."
  },
  "howToReachMr": {
    "air": "रत्नागिरी विमानतळावर सेवा उपलब्ध असल्यास; अन्यथा पुणे किंवा मुंबईहून रस्त्याने.",
    "rail": "चिपळूण किंवा रत्नागिरी रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "चिपळूणमार्गे किनारी रस्त्याने पोहोचा."
  },
  "howToReachHi": {
    "air": "रत्नागिरी हवाई अड्डा उपलब्ध सेवाओं के अनुसार; अन्यथा पुणे या मुंबई से सड़क मार्ग.",
    "rail": "चिपलून या रत्नागिरी रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "चिपलून होकर तटीय सड़क से पहुँचें।"
  },
  "localCuisine": "Konkani seafood, rice bhakri and solkadhi.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
  // Heritage, nature and wildlife destinations
{
  "id": "shaniwar-wada",
  "slug": "shaniwar-wada",
  "name": "Shaniwar Wada",
  "marathiName": "शनिवार वाडा",
  "nameHi": "शनिवार वाड़ा",
  "category": "heritage",
  "circuit": "Pune Heritage Circuit",
  "district": "Pune",
  "region": "Western Maharashtra",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80",
  "summary": "A landmark of Pune's Peshwa-era history, known for its fortified gates and palace remains.",
  "summaryMr": "पुण्याच्या पेशवेकालीन इतिहासाचे प्रतीक; भक्कम प्रवेशद्वारे आणि राजवाड्याच्या अवशेषांसाठी प्रसिद्ध.",
  "summaryHi": "पुणे के पेशवा कालीन इतिहास का प्रतीक, जो अपने किलेबंद द्वारों और महल के अवशेषों के लिए प्रसिद्ध है।",
  "history": "Built in 1732 as the seat of the Peshwas, Shaniwar Wada became a major centre of Maratha political life.",
  "historyMr": "१७३२ मध्ये पेशव्यांचे निवासस्थान म्हणून बांधलेला शनिवार वाडा मराठा राजकारणाचे महत्त्वाचे केंद्र बनला.",
  "historyHi": "1732 में पेशवाओं के निवास के रूप में निर्मित शनिवार वाड़ा मराठा राजनीतिक जीवन का प्रमुख केंद्र बना।",
  "attractions": [
    "Delhi Darwaza",
    "Fortified walls and palace foundations",
    "Fountain and garden precinct"
  ],
  "attractionsMr": [
    "दिल्ली दरवाजा",
    "तटबंदी आणि राजवाड्याचे अवशेष",
    "कारंजे आणि बाग परिसर"
  ],
  "attractionsHi": [
    "दिल्ली दरवाजा",
    "किले की दीवारें और महल की नींव",
    "फव्वारा और उद्यान परिसर"
  ],
  "coordinates": {
    "lat": 18.5196,
    "lng": 73.8553,
    "mapsUrl": "https://maps.google.com/?q=18.5196,73.8553"
  },
  "howToReach": {
    "air": "Pune Airport; city transport to central Pune.",
    "rail": "Pune Junction; local city transport.",
    "road": "Located in central Pune near the old city."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; मध्य पुण्यापर्यंत शहर वाहतूक.",
    "rail": "पुणे जंक्शन; स्थानिक शहर वाहतूक.",
    "road": "जुन्या पुण्याजवळ मध्यवर्ती भागात."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; मध्य पुणे तक शहर परिवहन.",
    "rail": "पुणे जंक्शन; स्थानीय शहर परिवहन.",
    "road": "पुराने शहर के पास मध्य पुणे में स्थित।"
  },
  "localCuisine": "Pune misal, bhakarwadi and traditional Maharashtrian snacks.",
  "sourceUrl": "https://maharashtratourism.gov.in/districts/pune/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "aga-khan-palace",
  "slug": "aga-khan-palace",
  "name": "Aga Khan Palace",
  "marathiName": "आगाखान पॅलेस",
  "nameHi": "आगा खान महल",
  "category": "heritage",
  "circuit": "Pune Freedom Movement Circuit",
  "district": "Pune",
  "region": "Western Maharashtra",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80",
  "summary": "A landmark palace and freedom-movement memorial set within landscaped grounds in Pune.",
  "summaryMr": "पुण्यातील ऐतिहासिक राजवाडा आणि स्वातंत्र्यलढ्याशी संबंधित स्मारक; हिरव्यागार परिसरात वसलेले.",
  "summaryHi": "पुणे का ऐतिहासिक महल और स्वतंत्रता आंदोलन से जुड़ा स्मारक, जो हरित परिसर में स्थित है।",
  "history": "The palace was built in 1892. It is closely associated with the imprisonment of Mahatma Gandhi, Kasturba Gandhi and other leaders during the Quit India movement.",
  "historyMr": "१८९२ मध्ये बांधलेला हा राजवाडा भारत छोडो आंदोलनाच्या काळात महात्मा गांधी, कस्तुरबा गांधी आणि इतर नेत्यांच्या नजरकैदेमुळे इतिहासात महत्त्वाचा ठरला.",
  "historyHi": "1892 में निर्मित यह महल भारत छोड़ो आंदोलन के दौरान महात्मा गांधी, कस्तूरबा गांधी और अन्य नेताओं की नजरबंदी से जुड़ा है।",
  "attractions": [
    "Palace architecture and gardens",
    "Gandhi memorial and museum displays",
    "Memorial spaces associated with Kasturba Gandhi"
  ],
  "attractionsMr": [
    "राजवाड्याची वास्तुरचना आणि बाग",
    "गांधी स्मारक आणि संग्रहालयातील प्रदर्शने",
    "कस्तुरबा गांधींशी संबंधित स्मृतिस्थळे"
  ],
  "attractionsHi": [
    "महल की वास्तुकला और उद्यान",
    "गांधी स्मारक और संग्रहालय की प्रदर्शनी",
    "कस्तूरबा गांधी से जुड़े स्मृति स्थल"
  ],
  "coordinates": {
    "lat": 18.5527,
    "lng": 73.9015,
    "mapsUrl": "https://maps.google.com/?q=18.5527,73.9015"
  },
  "howToReach": {
    "air": "Pune Airport; local transport.",
    "rail": "Pune Junction; local transport.",
    "road": "Located at Yerawada in Pune."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; स्थानिक वाहतूक.",
    "rail": "पुणे जंक्शन; स्थानिक वाहतूक.",
    "road": "पुण्यातील येरवडा येथे."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; स्थानीय परिवहन.",
    "rail": "पुणे जंक्शन; स्थानीय परिवहन.",
    "road": "पुणे के येरवडा क्षेत्र में स्थित।"
  },
  "localCuisine": "Pune's traditional snacks and local cuisine.",
  "sourceUrl": "https://maharashtratourism.gov.in/districts/pune/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "bibi-ka-maqbara",
  "slug": "bibi-ka-maqbara",
  "name": "Bibi Ka Maqbara",
  "marathiName": "बीबी का मकबरा",
  "nameHi": "बीबी का मकबरा",
  "category": "heritage",
  "circuit": "Chhatrapati Sambhajinagar Heritage Circuit",
  "district": "Chhatrapati Sambhajinagar",
  "region": "Marathwada",
  "bestTime": "October to March",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80",
  "summary": "A Mughal-era mausoleum known for its domed profile, gardens and architectural detailing.",
  "summaryMr": "घुमट, बागा आणि स्थापत्य तपशीलांसाठी प्रसिद्ध मुघलकालीन मकबरा.",
  "summaryHi": "गुंबद, उद्यानों और स्थापत्य विवरण के लिए प्रसिद्ध मुगलकालीन मकबरा।",
  "history": "Commissioned in the late 17th century by Prince Azam Shah in memory of his mother Dilras Banu Begum, the monument is often compared with the Taj Mahal.",
  "historyMr": "१७व्या शतकाच्या उत्तरार्धात राजपुत्र आझम शाह यांनी आई दिलरस बानू बेगम यांच्या स्मरणार्थ हे स्मारक बांधले.",
  "historyHi": "17वीं शताब्दी के उत्तरार्ध में राजकुमार आज़म शाह ने अपनी माता दिलरस बानो बेगम की स्मृति में यह स्मारक बनवाया।",
  "attractions": [
    "Central mausoleum and dome",
    "Charbagh-style garden layout",
    "Ornamental arches and minarets"
  ],
  "attractionsMr": [
    "मुख्य मकबरा आणि घुमट",
    "चारबाग पद्धतीची बाग",
    "नक्षीदार कमानी आणि मिनार"
  ],
  "attractionsHi": [
    "मुख्य मकबरा और गुंबद",
    "चारबाग शैली का उद्यान",
    "अलंकरणयुक्त मेहराब और मीनार"
  ],
  "coordinates": {
    "lat": 19.9009,
    "lng": 75.3205,
    "mapsUrl": "https://maps.google.com/?q=19.9009,75.3205"
  },
  "howToReach": {
    "air": "Chhatrapati Sambhajinagar Airport.",
    "rail": "Chhatrapati Sambhajinagar railway station.",
    "road": "Located within Chhatrapati Sambhajinagar city."
  },
  "howToReachMr": {
    "air": "छत्रपती संभाजीनगर विमानतळ.",
    "rail": "छत्रपती संभाजीनगर रेल्वे स्थानक.",
    "road": "छत्रपती संभाजीनगर शहरात."
  },
  "howToReachHi": {
    "air": "छत्रपति संभाजीनगर हवाई अड्डा.",
    "rail": "छत्रपति संभाजीनगर रेलवे स्टेशन.",
    "road": "छत्रपति संभाजीनगर शहर के भीतर स्थित।"
  },
  "localCuisine": "Marathwada thali, naan qalia and local sweets.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "kanheri-caves",
  "slug": "kanheri-caves",
  "name": "Kanheri Caves",
  "marathiName": "कान्हेरी लेणी",
  "nameHi": "कान्हेरी गुफाएँ",
  "category": "heritage",
  "circuit": "Mumbai Buddhist Heritage Circuit",
  "district": "Mumbai Suburban",
  "region": "Konkan",
  "bestTime": "November to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80",
  "summary": "A large group of Buddhist rock-cut caves set inside Sanjay Gandhi National Park.",
  "summaryMr": "संजय गांधी राष्ट्रीय उद्यानातील बौद्ध शैलकृत लेण्यांचा मोठा समूह.",
  "summaryHi": "संजय गांधी राष्ट्रीय उद्यान के भीतर स्थित बौद्ध शैलकृत गुफाओं का बड़ा समूह।",
  "history": "The caves developed over many centuries as a Buddhist monastic and learning centre, with inscriptions, stupas, prayer halls and water systems.",
  "historyMr": "अनेक शतकांत विकसित झालेल्या या बौद्ध केंद्रात शिलालेख, स्तूप, प्रार्थनागृहे आणि पाण्याची व्यवस्था दिसते.",
  "historyHi": "कई शताब्दियों में विकसित इस बौद्ध केंद्र में शिलालेख, स्तूप, प्रार्थना कक्ष और जल व्यवस्था मिलती है।",
  "attractions": [
    "Rock-cut chaityas and viharas",
    "Buddha sculptures and inscriptions",
    "Stone steps and rainwater cisterns"
  ],
  "attractionsMr": [
    "शैलकृत चैत्य आणि विहार",
    "बुद्धमूर्ती आणि शिलालेख",
    "दगडी पायऱ्या आणि पावसाच्या पाण्याची टाकी"
  ],
  "attractionsHi": [
    "शैलकृत चैत्य और विहार",
    "बुद्ध प्रतिमाएँ और शिलालेख",
    "पत्थर की सीढ़ियाँ और वर्षाजल कुंड"
  ],
  "coordinates": {
    "lat": 19.2047,
    "lng": 72.9067,
    "mapsUrl": "https://maps.google.com/?q=19.2047,72.9067"
  },
  "howToReach": {
    "air": "Mumbai airport; onward city transport.",
    "rail": "Borivali railway station; park access by local transport.",
    "road": "Enter through Sanjay Gandhi National Park; follow park ticketing and access rules."
  },
  "howToReachMr": {
    "air": "मुंबई विमानतळ; पुढे शहर वाहतूक.",
    "rail": "बोरिवली रेल्वे स्थानक; उद्यानापर्यंत स्थानिक वाहतूक.",
    "road": "संजय गांधी राष्ट्रीय उद्यानातून प्रवेश; उद्यानाचे तिकीट व नियम पाळा."
  },
  "howToReachHi": {
    "air": "मुंबई हवाई अड्डा; आगे शहर परिवहन.",
    "rail": "बोरीवली रेलवे स्टेशन; पार्क तक स्थानीय परिवहन.",
    "road": "संजय गांधी राष्ट्रीय उद्यान से प्रवेश करें और पार्क के नियमों का पालन करें।"
  },
  "localCuisine": "Mumbai snacks and food available around Borivali.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "karla-caves",
  "slug": "karla-caves",
  "name": "Karla Caves",
  "marathiName": "कार्ला लेणी",
  "nameHi": "कार्ला गुफाएँ",
  "category": "heritage",
  "circuit": "Lonavala Buddhist Heritage Circuit",
  "district": "Pune",
  "region": "Western Maharashtra",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80",
  "summary": "An ancient Buddhist rock-cut cave complex near Lonavala, especially known for its grand chaitya hall.",
  "summaryMr": "लोणावळ्याजवळील प्राचीन बौद्ध शैलकृत लेणी; भव्य चैत्यगृहासाठी प्रसिद्ध.",
  "summaryHi": "लोणावला के पास प्राचीन बौद्ध शैलकृत गुफाएँ, जो विशाल चैत्यगृह के लिए प्रसिद्ध हैं।",
  "history": "The caves were developed over several centuries and served Buddhist monastic communities along historic trade routes.",
  "historyMr": "ऐतिहासिक व्यापारी मार्गांवरील बौद्ध संघांसाठी ही लेणी अनेक शतकांत विकसित झाली.",
  "historyHi": "ऐतिहासिक व्यापार मार्गों पर बौद्ध संघों के लिए इन गुफाओं का विकास कई शताब्दियों में हुआ।",
  "attractions": [
    "Grand chaitya hall and carved pillars",
    "Rock-cut prayer spaces",
    "Nearby Ekvira Devi temple"
  ],
  "attractionsMr": [
    "भव्य चैत्यगृह आणि कोरीव स्तंभ",
    "शैलकृत प्रार्थनास्थळे",
    "जवळील एकवीरा देवी मंदिर"
  ],
  "attractionsHi": [
    "विशाल चैत्यगृह और नक्काशीदार स्तंभ",
    "शैलकृत प्रार्थना स्थल",
    "पास का एकवीरा देवी मंदिर"
  ],
  "coordinates": {
    "lat": 18.7833,
    "lng": 73.4725,
    "mapsUrl": "https://maps.google.com/?q=18.7833,73.4725"
  },
  "howToReach": {
    "air": "Pune Airport; onward road journey.",
    "rail": "Malavli railway station; local road transport.",
    "road": "Located near the Mumbai–Pune route, close to Lonavala."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "मळवली रेल्वे स्थानक; स्थानिक रस्ते वाहतूक.",
    "road": "मुंबई–पुणे मार्गाजवळ, लोणावळ्याच्या परिसरात."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "मालवली रेलवे स्टेशन; स्थानीय सड़क परिवहन.",
    "road": "मुंबई–पुणे मार्ग के पास, लोणावला के निकट।"
  },
  "localCuisine": "Lonavala chikki and local Maharashtrian snacks.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "mahabaleshwar",
  "slug": "mahabaleshwar",
  "name": "Mahabaleshwar",
  "marathiName": "महाबळेश्वर",
  "nameHi": "महाबलेश्वर",
  "category": "nature",
  "circuit": "Sahyadri Hill Station Circuit",
  "district": "Satara",
  "region": "Western Maharashtra",
  "bestTime": "October to June",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80",
  "summary": "A popular hill station known for forested hills, viewpoints, lakes and strawberry farms.",
  "summaryMr": "जंगली डोंगर, दृश्यबिंदू, तलाव आणि स्ट्रॉबेरी शेतीसाठी प्रसिद्ध गिरिस्थान.",
  "summaryHi": "वनाच्छादित पहाड़ियों, दृश्य स्थलों, झीलों और स्ट्रॉबेरी खेतों के लिए प्रसिद्ध पर्वतीय स्थल।",
  "history": "Mahabaleshwar developed as a hill retreat in the Sahyadris and is known for its cool climate and surrounding plateau landscape.",
  "historyMr": "सह्याद्रीतील थंड हवेचे ठिकाण म्हणून महाबळेश्वर विकसित झाले. पठारे आणि निसर्गरम्य परिसरासाठी ते प्रसिद्ध आहे.",
  "historyHi": "महाबलेश्वर सह्याद्रि का पर्वतीय विश्राम स्थल है, जो सुहावने मौसम और पठारी प्राकृतिक दृश्यों के लिए जाना जाता है।",
  "attractions": [
    "Venna Lake",
    "Arthur's Seat and other viewpoints",
    "Strawberry farms and local markets"
  ],
  "attractionsMr": [
    "वेण्णा तलाव",
    "आर्थर सीट आणि इतर दृश्यबिंदू",
    "स्ट्रॉबेरी शेती आणि स्थानिक बाजार"
  ],
  "attractionsHi": [
    "वेन्ना झील",
    "आर्थर सीट और अन्य दृश्य स्थल",
    "स्ट्रॉबेरी खेत और स्थानीय बाजार"
  ],
  "coordinates": {
    "lat": 17.9237,
    "lng": 73.6586,
    "mapsUrl": "https://maps.google.com/?q=17.9237,73.6586"
  },
  "howToReach": {
    "air": "Pune Airport; onward road travel.",
    "rail": "Wathar railway station or Pune; onward road travel.",
    "road": "Connected by road from Pune, Satara and Wai."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "वाठार रेल्वे स्थानक किंवा पुणे; पुढे रस्त्याने.",
    "road": "पुणे, सातारा आणि वाई येथून रस्त्याने जोडलेले."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "वाठार रेलवे स्टेशन या पुणे; आगे सड़क मार्ग.",
    "road": "पुणे, सातारा और वाई से सड़क मार्ग द्वारा जुड़ा है।"
  },
  "localCuisine": "Fresh strawberries, corn patties and Maharashtrian thali.",
  "sourceUrl": "https://maharashtratourism.gov.in/monsoon-tourism/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "matheran",
  "slug": "matheran",
  "name": "Matheran",
  "marathiName": "माथेरान",
  "nameHi": "माथेरान",
  "category": "nature",
  "circuit": "Raigad Hill Station Circuit",
  "district": "Raigad",
  "region": "Konkan",
  "bestTime": "October to May",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80",
  "summary": "A low-emission hill station known for forest trails, viewpoints and its heritage toy train.",
  "summaryMr": "वनमार्ग, दृश्यबिंदू आणि ऐतिहासिक टॉय ट्रेनसाठी प्रसिद्ध वाहनमुक्त गिरिस्थान.",
  "summaryHi": "वन पगडंडियों, दृश्य स्थलों और विरासत टॉय ट्रेन के लिए प्रसिद्ध वाहन-मुक्त पर्वतीय स्थल।",
  "history": "Matheran is a hill station in the Western Ghats where motor vehicles are restricted in the town area, preserving its walking trails and quiet setting.",
  "historyMr": "माथेरान हे सह्याद्रीतील गिरिस्थान असून शहराच्या मुख्य भागात मोटारवाहनांना बंदी आहे. त्यामुळे पायी मार्ग आणि शांत वातावरण टिकून आहे.",
  "historyHi": "माथेरान सह्याद्रि का पर्वतीय स्थल है जहाँ नगर क्षेत्र में मोटर वाहनों पर प्रतिबंध है, जिससे पैदल मार्ग और शांत वातावरण बना रहता है।",
  "attractions": [
    "Panorama Point",
    "Charlotte Lake",
    "Heritage Matheran toy train and walking paths"
  ],
  "attractionsMr": [
    "पॅनोरमा पॉइंट",
    "चार्लोट तलाव",
    "ऐतिहासिक माथेरान टॉय ट्रेन आणि पायी मार्ग"
  ],
  "attractionsHi": [
    "पैनोरमा पॉइंट",
    "चार्लोट झील",
    "विरासत माथेरान टॉय ट्रेन और पैदल मार्ग"
  ],
  "coordinates": {
    "lat": 18.9894,
    "lng": 73.271,
    "mapsUrl": "https://maps.google.com/?q=18.9894,73.271"
  },
  "howToReach": {
    "air": "Mumbai or Pune airport; onward road and rail journey.",
    "rail": "Neral railway station; toy train service subject to operations.",
    "road": "Reach Dasturi Naka; vehicles are restricted beyond the designated point."
  },
  "howToReachMr": {
    "air": "मुंबई किंवा पुणे विमानतळ; पुढे रस्ते व रेल्वेने.",
    "rail": "नेरळ रेल्वे स्थानक; टॉय ट्रेन सेवा उपलब्धतेनुसार.",
    "road": "दस्तुरी नाक्यापर्यंत जा; पुढे निर्धारित भागात वाहनांना बंदी आहे."
  },
  "howToReachHi": {
    "air": "मुंबई या पुणे हवाई अड्डा; आगे सड़क और रेल मार्ग.",
    "rail": "नेरल रेलवे स्टेशन; टॉय ट्रेन सेवा संचालन पर निर्भर.",
    "road": "दस्तुरी नाका तक पहुँचें; आगे निर्धारित क्षेत्र में वाहन प्रतिबंधित हैं।"
  },
  "localCuisine": "Matheran chikki and local snacks.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "panchgani",
  "slug": "panchgani",
  "name": "Panchgani",
  "marathiName": "पाचगणी",
  "nameHi": "पंचगनी",
  "category": "nature",
  "circuit": "Sahyadri Hill Station Circuit",
  "district": "Satara",
  "region": "Western Maharashtra",
  "bestTime": "October to May",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80",
  "summary": "A hill station known for Table Land, valley views and a pleasant climate.",
  "summaryMr": "टेबल लँड, दरींची दृश्ये आणि आल्हाददायक हवामानासाठी प्रसिद्ध गिरिस्थान.",
  "summaryHi": "टेबल लैंड, घाटी के दृश्यों और सुहावने मौसम के लिए प्रसिद्ध पर्वतीय स्थल।",
  "history": "Panchgani sits among five hills in the Sahyadris and developed as a hill retreat during the colonial period.",
  "historyMr": "सह्याद्रीतील पाच टेकड्यांच्या परिसरात वसलेले पाचगणी वसाहतकालीन काळात थंड हवेचे ठिकाण म्हणून विकसित झाले.",
  "historyHi": "सह्याद्रि की पाँच पहाड़ियों के बीच स्थित पंचगनी औपनिवेशिक काल में पर्वतीय विश्राम स्थल के रूप में विकसित हुआ।",
  "attractions": [
    "Table Land plateau",
    "Sydney Point and Parsi Point",
    "Mapro Garden and strawberry farms"
  ],
  "attractionsMr": [
    "टेबल लँड पठार",
    "सिडनी पॉइंट आणि पारसी पॉइंट",
    "मॅप्रो गार्डन आणि स्ट्रॉबेरी शेती"
  ],
  "attractionsHi": [
    "टेबल लैंड पठार",
    "सिडनी पॉइंट और पारसी पॉइंट",
    "मैप्रो गार्डन और स्ट्रॉबेरी खेत"
  ],
  "coordinates": {
    "lat": 17.9235,
    "lng": 73.8008,
    "mapsUrl": "https://maps.google.com/?q=17.9235,73.8008"
  },
  "howToReach": {
    "air": "Pune Airport; onward road travel.",
    "rail": "Wathar railway station; onward road travel.",
    "road": "Located near Mahabaleshwar and connected by road from Wai and Satara."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "वाठार रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "महाबळेश्वरजवळ; वाई आणि साताऱ्याहून रस्त्याने जोडलेले."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "वाठार रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "महाबलेश्वर के पास; वाई और सातारा से सड़क मार्ग द्वारा जुड़ा है।"
  },
  "localCuisine": "Strawberries, cream, corn and local Maharashtrian food.",
  "sourceUrl": "https://maharashtratourism.gov.in/monsoon-tourism/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "chikhaldara",
  "slug": "chikhaldara",
  "name": "Chikhaldara",
  "marathiName": "चिखलदरा",
  "nameHi": "चिखलदरा",
  "category": "nature",
  "circuit": "Vidarbha Hill Station Circuit",
  "district": "Amravati",
  "region": "Vidarbha",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80",
  "summary": "A hill station in Vidarbha surrounded by forests and viewpoints in the Satpura range.",
  "summaryMr": "सातपुडा पर्वतरांगांतील जंगल आणि दृश्यबिंदूंनी वेढलेले विदर्भातील गिरिस्थान.",
  "summaryHi": "सतपुड़ा पर्वतमाला के जंगलों और दृश्य स्थलों से घिरा विदर्भ का पर्वतीय स्थल।",
  "history": "Chikhaldara is associated with local Mahabharata legends and lies close to the Melghat forest landscape.",
  "historyMr": "चिखलदरा स्थानिक महाभारतकालीन आख्यायिकांशी जोडलेले असून मेळघाटच्या वनप्रदेशाजवळ आहे.",
  "historyHi": "चिखलदरा स्थानीय महाभारत कथाओं से जुड़ा है और मेलघाट के वन क्षेत्र के पास स्थित है।",
  "attractions": [
    "Bhimkund and scenic viewpoints",
    "Gawilgad Fort",
    "Melghat forest landscape"
  ],
  "attractionsMr": [
    "भीमकुंड आणि निसर्गदृश्य बिंदू",
    "गाविलगड किल्ला",
    "मेळघाटचा वनप्रदेश"
  ],
  "attractionsHi": [
    "भीमकुंड और प्राकृतिक दृश्य स्थल",
    "गाविलगढ़ किला",
    "मेलघाट का वन क्षेत्र"
  ],
  "coordinates": {
    "lat": 21.4062,
    "lng": 77.3336,
    "mapsUrl": "https://maps.google.com/?q=21.4062,77.3336"
  },
  "howToReach": {
    "air": "Akola or Nagpur airport; onward road travel.",
    "rail": "Amravati or Badnera railway station; onward road travel.",
    "road": "Connected by road from Amravati and Achalpur."
  },
  "howToReachMr": {
    "air": "अकोला किंवा नागपूर विमानतळ; पुढे रस्त्याने.",
    "rail": "अमरावती किंवा बडनेरा रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "अमरावती आणि अचलपूर येथून रस्त्याने जोडलेले."
  },
  "howToReachHi": {
    "air": "अकोला या नागपुर हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "अमरावती या बडनेरा रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "अमरावती और अचलपुर से सड़क मार्ग द्वारा जुड़ा है।"
  },
  "localCuisine": "Varhadi cuisine and local seasonal produce.",
  "sourceUrl": "https://maharashtratourism.gov.in/nature/chikhaldara/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "lonar-crater",
  "slug": "lonar-crater",
  "name": "Lonar Crater Lake",
  "marathiName": "लोणार सरोवर",
  "nameHi": "लोणार क्रेटर झील",
  "category": "nature",
  "circuit": "Buldhana Natural Heritage Circuit",
  "district": "Buldhana",
  "region": "Vidarbha",
  "bestTime": "October to February",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80",
  "summary": "A rare meteorite-impact crater lake surrounded by a distinctive geological and ecological landscape.",
  "summaryMr": "उल्कापातामुळे निर्माण झालेले दुर्मिळ विवर सरोवर; वैशिष्ट्यपूर्ण भूवैज्ञानिक आणि पर्यावरणीय परिसराने वेढलेले.",
  "summaryHi": "उल्कापिंड के प्रभाव से बना दुर्लभ क्रेटर झील, जिसके आसपास विशिष्ट भूवैज्ञानिक और पारिस्थितिक क्षेत्र है।",
  "history": "Lonar's crater was formed by a meteorite impact and is known for its saline and alkaline lake environment.",
  "historyMr": "उल्कापातामुळे लोणार विवराची निर्मिती झाली. खारट आणि क्षारीय पाण्याचे सरोवर हे त्याचे वैशिष्ट्य आहे.",
  "historyHi": "लोणार क्रेटर का निर्माण उल्कापिंड के प्रभाव से हुआ। इसकी खारी और क्षारीय झील विशेषता है।",
  "attractions": [
    "Crater rim viewpoints",
    "Lonar lake and surrounding ecology",
    "Daitya Sudan Temple"
  ],
  "attractionsMr": [
    "विवराच्या कड्यावरील दृश्यबिंदू",
    "लोणार सरोवर आणि परिसरातील जैवविविधता",
    "दैत्यसूदन मंदिर"
  ],
  "attractionsHi": [
    "क्रेटर किनारे के दृश्य स्थल",
    "लोणार झील और आसपास की पारिस्थितिकी",
    "दैत्यसूदन मंदिर"
  ],
  "coordinates": {
    "lat": 19.975,
    "lng": 76.508,
    "mapsUrl": "https://maps.google.com/?q=19.975,76.508"
  },
  "howToReach": {
    "air": "Chhatrapati Sambhajinagar or Aurangabad airport; onward road travel.",
    "rail": "Malkapur railway station; onward road travel.",
    "road": "Reach Lonar town in Buldhana district by road."
  },
  "howToReachMr": {
    "air": "छत्रपती संभाजीनगर विमानतळ; पुढे रस्त्याने.",
    "rail": "मलकापूर रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "बुलढाणा जिल्ह्यातील लोणार शहरात रस्त्याने पोहोचा."
  },
  "howToReachHi": {
    "air": "छत्रपति संभाजीनगर हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "मलकापुर रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "बुलढाणा जिले के लोणार नगर तक सड़क मार्ग से पहुँचें।"
  },
  "localCuisine": "Varhadi food and local Maharashtrian meals.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "thoseghar-waterfall",
  "slug": "thoseghar",
  "name": "Thoseghar Waterfall",
  "marathiName": "ठोसेघर धबधबा",
  "nameHi": "ठोसेघर जलप्रपात",
  "category": "nature",
  "circuit": "Satara Nature Circuit",
  "district": "Satara",
  "region": "Western Maharashtra",
  "bestTime": "July to October for water flow; October to February for clearer walks",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80",
  "summary": "A series of seasonal waterfalls set amid the Western Ghats near Satara.",
  "summaryMr": "साताऱ्याजवळील सह्याद्रीच्या निसर्गरम्य परिसरातील हंगामी धबधब्यांची मालिका.",
  "summaryHi": "सतारा के पास पश्चिमी घाट के प्राकृतिक क्षेत्र में स्थित मौसमी झरनों की श्रृंखला।",
  "history": "The waterfalls are most prominent during the monsoon and form part of the region's scenic plateau and valley landscape.",
  "historyMr": "पावसाळ्यात धबधबे अधिक प्रवाही असतात. पठारे आणि दऱ्यांच्या निसर्गरम्य परिसराचा हा भाग आहे.",
  "historyHi": "मानसून में झरनों का प्रवाह अधिक होता है। यह पठारों और घाटियों के सुंदर प्राकृतिक क्षेत्र का हिस्सा है।",
  "attractions": [
    "Main waterfall viewpoints",
    "Seasonal cascades during monsoon",
    "Nearby Kaas plateau and Satara landscapes"
  ],
  "attractionsMr": [
    "मुख्य धबधबा दृश्यबिंदू",
    "पावसाळ्यातील धबधबे",
    "जवळील कास पठार आणि सातारा परिसर"
  ],
  "attractionsHi": [
    "मुख्य झरना दृश्य स्थल",
    "मानसून के मौसमी झरने",
    "पास का कास पठार और सतारा क्षेत्र"
  ],
  "coordinates": {
    "lat": 17.5998,
    "lng": 73.891,
    "mapsUrl": "https://maps.google.com/?q=17.5998,73.891"
  },
  "howToReach": {
    "air": "Pune Airport; onward road journey.",
    "rail": "Satara railway station; onward road journey.",
    "road": "About 20 km from Satara; use marked viewpoints and follow safety barriers."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "सातारा रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "साताऱ्यापासून सुमारे २० किमी; निर्धारित दृश्यबिंदू वापरा आणि सुरक्षा कठडे पाळा."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "सातारा रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "सातारा से लगभग 20 किमी; निर्धारित दृश्य स्थलों और सुरक्षा अवरोधों का पालन करें।"
  },
  "localCuisine": "Satara kanda bhaji, pithla-bhakri and local snacks.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "kaas-plateau",
  "slug": "kaas-plateau",
  "name": "Kaas Plateau",
  "marathiName": "कास पठार",
  "nameHi": "कास पठार",
  "category": "nature",
  "circuit": "Satara Natural Heritage Circuit",
  "district": "Satara",
  "region": "Western Maharashtra",
  "bestTime": "Late August to October; access may be regulated",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80",
  "summary": "A high-altitude plateau famous for seasonal wildflowers and biodiversity during the post-monsoon period.",
  "summaryMr": "पावसाळ्यानंतरच्या काळात उमलणाऱ्या रानफुलांसाठी आणि जैवविविधतेसाठी प्रसिद्ध उंच पठार.",
  "summaryHi": "मानसून के बाद खिलने वाले जंगली फूलों और जैव विविधता के लिए प्रसिद्ध ऊँचा पठार।",
  "history": "Kaas is part of the Western Ghats landscape and is recognised for its seasonal flowering ecosystem and conservation importance.",
  "historyMr": "कास हे सह्याद्रीच्या पश्चिम घाट परिसराचा भाग असून हंगामी फुलोरा आणि संवर्धन महत्त्वासाठी ओळखले जाते.",
  "historyHi": "कास पश्चिमी घाट का हिस्सा है और अपने मौसमी पुष्पन तथा संरक्षण महत्व के लिए जाना जाता है।",
  "attractions": [
    "Seasonal wildflower carpets",
    "Plateau viewpoints",
    "Nearby Kaas Lake and Thoseghar region"
  ],
  "attractionsMr": [
    "हंगामी रानफुलांचे गालिचे",
    "पठारावरील दृश्यबिंदू",
    "जवळील कास तलाव आणि ठोसेघर परिसर"
  ],
  "attractionsHi": [
    "मौसमी जंगली फूलों की चादर",
    "पठार के दृश्य स्थल",
    "पास की कास झील और ठोसेघर क्षेत्र"
  ],
  "coordinates": {
    "lat": 17.7177,
    "lng": 73.8225,
    "mapsUrl": "https://maps.google.com/?q=17.7177,73.8225"
  },
  "howToReach": {
    "air": "Pune Airport; onward road travel.",
    "rail": "Satara railway station; onward road travel.",
    "road": "Reach via Satara; check seasonal entry permits and visitor limits."
  },
  "howToReachMr": {
    "air": "पुणे विमानतळ; पुढे रस्त्याने.",
    "rail": "सातारा रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "साताऱ्यामार्गे पोहोचा; हंगामी प्रवेश परवानगी आणि मर्यादा तपासा."
  },
  "howToReachHi": {
    "air": "पुणे हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "सातारा रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "सातारा होकर पहुँचें; मौसमी प्रवेश अनुमति और आगंतुक सीमा जाँचें।"
  },
  "localCuisine": "Satara local thali, kanda bhaji and seasonal produce.",
  "sourceUrl": "https://maharashtratourism.gov.in/sitemap/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "tadoba-andhari-tiger-reserve",
  "slug": "tadoba",
  "name": "Tadoba-Andhari Tiger Reserve",
  "marathiName": "ताडोबा-अंधारी व्याघ्र प्रकल्प",
  "nameHi": "ताडोबा-अंधारी बाघ अभयारण्य",
  "category": "wildlife",
  "circuit": "Vidarbha Wildlife Circuit",
  "district": "Chandrapur",
  "region": "Vidarbha",
  "bestTime": "October to June; safari zones and timings vary",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80",
  "summary": "A major tiger reserve in Chandrapur district, known for forest safaris and diverse wildlife.",
  "summaryMr": "चंद्रपूर जिल्ह्यातील महत्त्वाचा व्याघ्र प्रकल्प; जंगल सफारी आणि विविध वन्यजीवांसाठी प्रसिद्ध.",
  "summaryHi": "चंद्रपुर जिले का प्रमुख बाघ अभयारण्य, जो जंगल सफारी और विविध वन्यजीवों के लिए प्रसिद्ध है।",
  "history": "Tadoba-Andhari protects dry deciduous forest habitats and supports tigers, leopards, deer and many bird species.",
  "historyMr": "ताडोबा-अंधारीमध्ये पानझडी वनक्षेत्र असून वाघ, बिबटे, हरीण आणि अनेक पक्षी आढळतात.",
  "historyHi": "ताडोबा-अंधारी में शुष्क पर्णपाती वन हैं, जहाँ बाघ, तेंदुए, हिरण और अनेक पक्षी पाए जाते हैं।",
  "attractions": [
    "Guided jeep safaris in designated zones",
    "Tadoba Lake and forest habitats",
    "Wildlife and birdwatching"
  ],
  "attractionsMr": [
    "निर्धारित क्षेत्रांतील मार्गदर्शित जीप सफारी",
    "ताडोबा तलाव आणि वन अधिवास",
    "वन्यजीव निरीक्षण आणि पक्षीनिरीक्षण"
  ],
  "attractionsHi": [
    "निर्धारित क्षेत्रों में मार्गदर्शित जीप सफारी",
    "ताडोबा झील और वन आवास",
    "वन्यजीव और पक्षी अवलोकन"
  ],
  "coordinates": {
    "lat": 20.2489,
    "lng": 79.3623,
    "mapsUrl": "https://maps.google.com/?q=20.2489,79.3623"
  },
  "howToReach": {
    "air": "Nagpur Airport; onward road transfer.",
    "rail": "Chandrapur or Nagpur railway station; onward road transfer.",
    "road": "Use official reserve gates and pre-book safari permits."
  },
  "howToReachMr": {
    "air": "नागपूर विमानतळ; पुढे रस्त्याने.",
    "rail": "चंद्रपूर किंवा नागपूर रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "अधिकृत प्रवेशद्वार वापरा आणि सफारी परवानगी आगाऊ घ्या."
  },
  "howToReachHi": {
    "air": "नागपुर हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "चंद्रपुर या नागपुर रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "आधिकारिक प्रवेश द्वार का उपयोग करें और सफारी अनुमति पहले बुक करें।"
  },
  "localCuisine": "Chandrapur and Varhadi regional cuisine.",
  "sourceUrl": "https://maharashtratourism.gov.in/wildlife-tourism/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "sanjay-gandhi-national-park",
  "slug": "sanjay-gandhi-national-park",
  "name": "Sanjay Gandhi National Park",
  "marathiName": "संजय गांधी राष्ट्रीय उद्यान",
  "nameHi": "संजय गांधी राष्ट्रीय उद्यान",
  "category": "wildlife",
  "circuit": "Mumbai Nature Circuit",
  "district": "Mumbai Suburban",
  "region": "Konkan",
  "bestTime": "November to February; park operates year-round with closures",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80",
  "summary": "A large protected green space within Mumbai, with forest trails, lakes, wildlife and Kanheri Caves.",
  "summaryMr": "मुंबईतील मोठे संरक्षित हरित क्षेत्र; वनमार्ग, तलाव, वन्यजीव आणि कान्हेरी लेण्यांसाठी प्रसिद्ध.",
  "summaryHi": "मुंबई के भीतर बड़ा संरक्षित हरित क्षेत्र, जो वन पगडंडियों, झीलों, वन्यजीवों और कान्हेरी गुफाओं के लिए जाना जाता है।",
  "history": "The park protects an important forest landscape within the metropolitan region and includes the historic Kanheri Caves.",
  "historyMr": "महानगर क्षेत्रातील महत्त्वाच्या वनप्रदेशाचे संरक्षण करणारे उद्यान; येथे ऐतिहासिक कान्हेरी लेणीही आहेत.",
  "historyHi": "यह उद्यान महानगरीय क्षेत्र के महत्वपूर्ण वन क्षेत्र की रक्षा करता है और इसमें ऐतिहासिक कान्हेरी गुफाएँ भी हैं।",
  "attractions": [
    "Kanheri Caves",
    "Forest trails and nature interpretation",
    "Lakes and designated safari activities"
  ],
  "attractionsMr": [
    "कान्हेरी लेणी",
    "वनमार्ग आणि निसर्ग माहिती केंद्र",
    "तलाव आणि निर्धारित सफारी उपक्रम"
  ],
  "attractionsHi": [
    "कान्हेरी गुफाएँ",
    "वन पगडंडियाँ और प्रकृति व्याख्या",
    "झीलें और निर्धारित सफारी गतिविधियाँ"
  ],
  "coordinates": {
    "lat": 19.2147,
    "lng": 72.9106,
    "mapsUrl": "https://maps.google.com/?q=19.2147,72.9106"
  },
  "howToReach": {
    "air": "Mumbai airport; local city transport.",
    "rail": "Borivali railway station; park entrance is nearby.",
    "road": "Access through Borivali; follow park entry and activity rules."
  },
  "howToReachMr": {
    "air": "मुंबई विमानतळ; स्थानिक शहर वाहतूक.",
    "rail": "बोरिवली रेल्वे स्थानक; उद्यान प्रवेशद्वार जवळ.",
    "road": "बोरिवलीमार्गे प्रवेश; उद्यानाचे नियम पाळा."
  },
  "howToReachHi": {
    "air": "मुंबई हवाई अड्डा; स्थानीय शहर परिवहन.",
    "rail": "बोरीवली रेलवे स्टेशन; पार्क प्रवेश द्वार पास में है।",
    "road": "बोरीवली से प्रवेश करें और पार्क के नियमों का पालन करें।"
  },
  "localCuisine": "Mumbai street food and snacks around Borivali.",
  "sourceUrl": "https://maharashtratourism.gov.in/wildlife-tourism/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "radhanagari-wildlife-sanctuary",
  "slug": "radhanagari",
  "name": "Radhanagari Wildlife Sanctuary",
  "marathiName": "राधानगरी वन्यजीव अभयारण्य",
  "nameHi": "राधानगरी वन्यजीव अभयारण्य",
  "category": "wildlife",
  "circuit": "Kolhapur Wildlife Circuit",
  "district": "Kolhapur",
  "region": "Western Maharashtra",
  "bestTime": "October to May",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80",
  "summary": "A Western Ghats sanctuary known for forest biodiversity and the Indian gaur.",
  "summaryMr": "पश्चिम घाटातील वन्यजीव अभयारण्य; जंगलातील जैवविविधता आणि गव्यांसाठी प्रसिद्ध.",
  "summaryHi": "पश्चिमी घाट का अभयारण्य, जो वन जैव विविधता और भारतीय गौर के लिए प्रसिद्ध है।",
  "history": "Established in 1958, the sanctuary protects forest habitats in the Western Ghats and is associated with gaur conservation.",
  "historyMr": "१९५८ मध्ये स्थापन झालेले हे अभयारण्य पश्चिम घाटातील वन अधिवासांचे आणि गव्यांच्या संवर्धनाचे संरक्षण करते.",
  "historyHi": "1958 में स्थापित यह अभयारण्य पश्चिमी घाट के वन आवासों और भारतीय गौर के संरक्षण से जुड़ा है।",
  "attractions": [
    "Forest landscapes and nature trails",
    "Indian gaur habitat",
    "Birdwatching and biodiversity"
  ],
  "attractionsMr": [
    "वनप्रदेश आणि निसर्गमार्ग",
    "गव्यांचा अधिवास",
    "पक्षीनिरीक्षण आणि जैवविविधता"
  ],
  "attractionsHi": [
    "वन क्षेत्र और प्रकृति पगडंडियाँ",
    "भारतीय गौर का आवास",
    "पक्षी अवलोकन और जैव विविधता"
  ],
  "coordinates": {
    "lat": 16.4026,
    "lng": 73.9954,
    "mapsUrl": "https://maps.google.com/?q=16.4026,73.9954"
  },
  "howToReach": {
    "air": "Kolhapur Airport; onward road journey.",
    "rail": "Kolhapur railway station; onward road journey.",
    "road": "Access through Radhanagari and surrounding villages; check forest access rules."
  },
  "howToReachMr": {
    "air": "कोल्हापूर विमानतळ; पुढे रस्त्याने.",
    "rail": "कोल्हापूर रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "राधानगरी आणि आसपासच्या गावांमार्गे; वनविभागाचे नियम तपासा."
  },
  "howToReachHi": {
    "air": "कोल्हापुर हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "कोल्हापुर रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "राधानगरी और आसपास के गाँवों से पहुँचें; वन विभाग के नियम जाँचें।"
  },
  "localCuisine": "Kolhapuri cuisine and local village meals.",
  "sourceUrl": "https://maharashtratourism.gov.in/wildlife-tourism/",
  "rating": 4.5,
  "reviewsCount": 0
},
{
  "id": "nagzira-wildlife-sanctuary",
  "slug": "nagzira",
  "name": "Nagzira Wildlife Sanctuary",
  "marathiName": "नागझिरा वन्यजीव अभयारण्य",
  "nameHi": "नागझिरा वन्यजीव अभयारण्य",
  "category": "wildlife",
  "circuit": "Vidarbha Wildlife Circuit",
  "district": "Gondia",
  "region": "Vidarbha",
  "bestTime": "October to June; confirm safari availability",
  "timings": "Check current local opening hours before visiting",
  "entryFee": "Check current official entry and access charges",
  "heroImage": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80",
  "thumbnail": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80",
  "summary": "A forest sanctuary in eastern Maharashtra known for wildlife, birdlife and a scenic lake.",
  "summaryMr": "पूर्व महाराष्ट्रातील वन्यजीव अभयारण्य; वन्यजीव, पक्षी आणि निसर्गरम्य तलावासाठी प्रसिद्ध.",
  "summaryHi": "पूर्वी महाराष्ट्र का वन्यजीव अभयारण्य, जो वन्यजीव, पक्षियों और सुंदर झील के लिए जाना जाता है।",
  "history": "Nagzira protects a mix of forest and lake habitats and forms part of the wider Nagzira-Navegaon conservation landscape.",
  "historyMr": "नागझिरा वन आणि तलाव अधिवासांचे संरक्षण करते आणि नागझिरा-नवेगाव संवर्धन क्षेत्राचा भाग आहे.",
  "historyHi": "नागझिरा वन और झील के आवासों की रक्षा करता है और व्यापक नागझिरा-नवेगाँव संरक्षण क्षेत्र का हिस्सा है।",
  "attractions": [
    "Nagzira Lake",
    "Forest safari routes where permitted",
    "Birdwatching and nature observation"
  ],
  "attractionsMr": [
    "नागझिरा तलाव",
    "परवानगी असलेले जंगल सफारी मार्ग",
    "पक्षीनिरीक्षण आणि निसर्ग निरीक्षण"
  ],
  "attractionsHi": [
    "नागझिरा झील",
    "अनुमति वाले जंगल सफारी मार्ग",
    "पक्षी अवलोकन और प्रकृति निरीक्षण"
  ],
  "coordinates": {
    "lat": 21.293,
    "lng": 80.153,
    "mapsUrl": "https://maps.google.com/?q=21.293,80.153"
  },
  "howToReach": {
    "air": "Nagpur airport; onward road journey.",
    "rail": "Gondia railway station; onward road journey.",
    "road": "Reach via Gondia or Bhandara and use designated reserve access."
  },
  "howToReachMr": {
    "air": "नागपूर विमानतळ; पुढे रस्त्याने.",
    "rail": "गोंदिया रेल्वे स्थानक; पुढे रस्त्याने.",
    "road": "गोंदिया किंवा भंडारा मार्गे जाऊन निर्धारित प्रवेशद्वार वापरा."
  },
  "howToReachHi": {
    "air": "नागपुर हवाई अड्डा; आगे सड़क मार्ग.",
    "rail": "गोंदिया रेलवे स्टेशन; आगे सड़क मार्ग.",
    "road": "गोंदिया या भंडारा से पहुँचें और निर्धारित प्रवेश द्वार का उपयोग करें।"
  },
  "localCuisine": "Varhadi cuisine and local rice-based dishes.",
  "sourceUrl": "https://maharashtratourism.gov.in/wildlife-tourism/",
  "rating": 4.5,
  "reviewsCount": 0
}
];

// Enrich destinations with local asset paths while preserving all existing data
DESTINATIONS.forEach(dest => {
  const reg = ALL_DESTINATION_IMAGE_REGISTRY[dest.id];
  if (reg) {
    dest.localAssets = reg.slots;
    dest.assetsFolder = reg.folder;
  }
});
