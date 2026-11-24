/**
 * AAGMAN - Festivals & Cultural Events Dataset
 * Authentic celebrations across Maharashtra
 */
import { FESTIVALS_IMAGE_REGISTRY } from './imageRegistry';

export const FESTIVALS = [
  {
    id: "ganeshotsav",
    name: "Ganeshotsav (Ganesh Chaturthi)",
    marathiName: "गणेशोत्सव",
    nameHi: "गणेशोत्सव (गणेश चतुर्थी)",
    dates: "August – September (Bhadrapada Shukla Chaturthi)",
    location: "Statewide (Celebrated with grand fervor in Pune & Mumbai)",
    description: "Maharashtra's grandest 10-day cultural festival founded as a public celebration by Lokmanya Tilak in 1893. Features magnificent pandals, traditional Dhol-Tasha pathaks, cultural stage performances, and grand immersion (visarjan) processions.",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80",
    significance: "Celebrates Lord Ganesha, the remover of obstacles. Fosters unity, performing arts, and traditional Maharashtrian hospitality.",
    highlights: ["Manache Ganpati in Pune", "Lalbaugcha Raja in Mumbai", "Dhol Tasha drumming troupes", "Ukadiche Modak feast"]
    datesMr: "ऑगस्ट – सप्टेंबर (भाद्रपद शुद्ध चतुर्थी)",
    datesHi: "अगस्त – सितंबर (भाद्रपद शुक्ल चतुर्थी)",
    locationMr: "संपूर्ण महाराष्ट्र (पुणे आणि मुंबईत विशेष उत्साह)",
    locationHi: "पूरे महाराष्ट्र में (पुणे और मुंबई में विशेष आयोजन)",
    descriptionMr: "महाराष्ट्रातील प्रमुख दहा दिवसांचा सांस्कृतिक उत्सव. भव्य सार्वजनिक मंडप, पारंपरिक ढोल-ताशा पथके, सांस्कृतिक कार्यक्रम आणि गणेश विसर्जन मिरवणुका हे या उत्सवाचे वैशिष्ट्य आहे.",
    descriptionHi: "महाराष्ट्र का प्रमुख दस दिवसीय सांस्कृतिक उत्सव। भव्य सार्वजनिक पंडाल, पारंपरिक ढोल-ताशा दल, सांस्कृतिक कार्यक्रम और गणेश विसर्जन जुलूस इसकी विशेषताएँ हैं।",
    significanceMr: "भगवान गणेशाच्या पूजेबरोबरच हा उत्सव सामुदायिक एकता, कला आणि महाराष्ट्राच्या सांस्कृतिक परंपरांचा उत्सव आहे.",
    significanceHi: "भगवान गणेश की आराधना के साथ यह उत्सव सामुदायिक एकता, कला और महाराष्ट्र की सांस्कृतिक परंपराओं को प्रोत्साहित करता है।",
    highlightsMr: ["पुण्यातील मानाचे गणपती","मुंबईतील लालबागचा राजा","ढोल-ताशा पथकांची वादने","उकडीच्या मोदकांचा नैवेद्य"],
    highlightsHi: ["पुणे के मानाचे गणपति","मुंबई के लालबागचा राजा","ढोल-ताशा दलों की प्रस्तुतियाँ","उकड़ी के मोदक का प्रसाद"],
  },
  {
    id: "shiv-jayanti",
    name: "Chhatrapati Shivaji Maharaj Jayanti",
    marathiName: "शिवजयंती",
    nameHi: "छत्रपति शिवाजी महाराज जयंती",
    dates: "19 February",
    location: "Shivneri Fort, Raigad Fort & Statewide",
    description: "The birth anniversary of the founder of the Maratha Empire, Chhatrapati Shivaji Maharaj. Commemorated with traditional torch processions (mashaal morcha), Powada folk ballads, traditional lezim dances, and state honors at his birthplace on Shivneri.",
    image: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80",
    significance: "Honors the ideals of Swarajya, ethical governance, and the indomitable Maratha spirit.",
    highlights: ["Sunrise cradle ceremony at Shivneri Fort", "Traditional Powada recitals", "Fort illumination at Raigad and Sinhagad"]
    datesMr: "१९ फेब्रुवारी",
    datesHi: "19 फरवरी",
    locationMr: "शिवनेरी किल्ला, रायगड किल्ला आणि संपूर्ण महाराष्ट्र",
    locationHi: "शिवनेरी किला, रायगढ़ किला और पूरे महाराष्ट्र में",
    descriptionMr: "छत्रपती शिवाजी महाराजांच्या जयंतीनिमित्त मिरवणुका, पोवाडे, लेझीम नृत्य आणि विविध सांस्कृतिक कार्यक्रम आयोजित केले जातात.",
    descriptionHi: "छत्रपति शिवाजी महाराज की जयंती पर शोभायात्राएँ, पोवाड़ा लोकगायन, लेज़ीम नृत्य और सांस्कृतिक कार्यक्रम आयोजित किए जाते हैं।",
    significanceMr: "स्वराज्य, सुशासन, धैर्य आणि लोककल्याणाच्या आदर्शांचे स्मरण करण्याचा हा दिवस आहे.",
    significanceHi: "यह दिन स्वराज्य, सुशासन, साहस और लोककल्याण के आदर्शों का स्मरण कराता है।",
    highlightsMr: ["शिवनेरी किल्ल्यावर जन्मस्थळ अभिवादन","पारंपरिक पोवाडा सादरीकरण","रायगड आणि सिंहगडावरील कार्यक्रम"],
    highlightsHi: ["शिवनेरी किले पर जन्मस्थल को अभिवादन","पारंपरिक पोवाड़ा प्रस्तुतियाँ","रायगढ़ और सिंहगढ़ पर आयोजन"],
  },
  {
    id: "pandharpur-wari",
    name: "Pandharpur Ashadhi Wari",
    marathiName: "पंढरपूर आषाढी वारी",
    nameHi: "पंढरपुर आषाढ़ी वारी",
    dates: "June – July (Ashadha month)",
    location: "Alandi / Dehu to Pandharpur (250 km walking pilgrimage)",
    description: "An 800-year-old walking pilgrimage where over a million devout Warkaris accompany the sacred padukas (footprints) of Sant Dnyaneshwar and Sant Tukaram on foot over 21 days to the Vitthal Temple in Pandharpur, chanting 'Gyanba Tukaram'.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    significance: "A UNESCO-recognized intangible cultural heritage marvel of egalitarian bhakti, communal harmony, and spiritual discipline.",
    highlights: ["Bhajan rings (Ringan ceremonies)", "Palkhi processions through rural Maharashtra", "Dip in Chandrabhaga holy river"]
    datesMr: "जून – जुलै (आषाढ महिना)",
    datesHi: "जून – जुलाई (आषाढ़ मास)",
    locationMr: "आळंदी / देहू ते पंढरपूर",
    locationHi: "आलंदी / देहू से पंढरपुर",
    descriptionMr: "संत ज्ञानेश्वर आणि संत तुकाराम यांच्या पालख्यांसोबत वारकरी पायी पंढरपूरच्या विठ्ठल मंदिराकडे प्रस्थान करतात. भजन, कीर्तन आणि सामूहिक भक्ती ही वारीची प्रमुख वैशिष्ट्ये आहेत.",
    descriptionHi: "संत ज्ञानेश्वर और संत तुकाराम की पालखियों के साथ वारकरी पैदल पंढरपुर के विठ्ठल मंदिर की ओर यात्रा करते हैं। भजन, कीर्तन और सामूहिक भक्ति इस वारी की प्रमुख विशेषताएँ हैं।",
    significanceMr: "समता, भक्ती, शिस्त आणि सामुदायिक सहभाग यांची जिवंत परंपरा म्हणून वारीला विशेष महत्त्व आहे.",
    significanceHi: "वारी समानता, भक्ति, अनुशासन और सामुदायिक सहभाग की एक जीवंत परंपरा है।",
    highlightsMr: ["रिंगण सोहळे","पालखी मिरवणुका","चंद्रभागा नदी परिसरातील भक्तीपरंपरा"],
    highlightsHi: ["रिंगण समारोह","पालखी जुलूस","चंद्रभागा नदी के तट पर भक्ति परंपराएँ"],
  },
  {
    id: "ellora-ajanta-festival",
    name: "Ellora-Ajanta International Music & Dance Festival",
    marathiName: "वेरूळ-अजिंठा आंतरराष्ट्रीय महोत्सव",
    nameHi: "एलोरा-अजंता अंतरराष्ट्रीय संगीत एवं नृत्य महोत्सव",
    dates: "January – February",
    location: "Soneri Mahal / Ellora Caves, Chhatrapati Sambhajinagar",
    description: "A prestigious 3-day classical music and dance festival with the ancient rock-cut monolithic Kailasa temple and Soneri Mahal as magnificent backdrops. Features India's greatest classical vocalists, sitarists, Kathak and Odissi dancers.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    significance: "Brings alive ancient Indian heritage through living classical performing arts.",
    highlights: ["Classical dance under illuminated stone arches", "Sitar and flute recitals", "Handicrafts & Paithani saree fair"]
    datesMr: "जानेवारी – फेब्रुवारी (आयोजकांच्या घोषणेनुसार)",
    datesHi: "जनवरी – फरवरी (आयोजकों की घोषणा के अनुसार)",
    locationMr: "सोनेरी महाल / वेरूळ परिसर, छत्रपती संभाजीनगर",
    locationHi: "सोनेरी महल / एलोरा क्षेत्र, छत्रपति संभाजीनगर",
    descriptionMr: "ऐतिहासिक वारसा स्थळांच्या पार्श्वभूमीवर शास्त्रीय संगीत आणि नृत्य सादरीकरणांचा सांस्कृतिक महोत्सव आयोजित केला जातो.",
    descriptionHi: "ऐतिहासिक धरोहर स्थलों की पृष्ठभूमि में शास्त्रीय संगीत और नृत्य प्रस्तुतियों का सांस्कृतिक महोत्सव आयोजित किया जाता है।",
    significanceMr: "प्राचीन वारसा आणि आजच्या शास्त्रीय कलापरंपरा यांना एकत्र आणणारा सांस्कृतिक उपक्रम.",
    significanceHi: "यह सांस्कृतिक आयोजन प्राचीन विरासत और जीवंत शास्त्रीय कला परंपराओं को जोड़ता है।",
    highlightsMr: ["शास्त्रीय नृत्य सादरीकरण","सितार आणि बासरी वादन","स्थानिक हस्तकला व वस्त्रपरंपरा"],
    highlightsHi: ["शास्त्रीय नृत्य प्रस्तुतियाँ","सितार और बाँसुरी वादन","स्थानीय हस्तशिल्प और वस्त्र परंपराएँ"],
  },
  {
    id: "gudhi-padwa",
    name: "Gudhi Padwa (Marathi New Year)",
    marathiName: "गुढीपाडवा",
    nameHi: "गुड़ी पड़वा (मराठी नववर्ष)",
    dates: "March – April (Chaitra Shukla Pratipada)",
    location: "Statewide (Grand Shobha Yatras in Girgaon, Thane, Dombivli, Pune)",
    description: "The traditional New Year day for the people of Maharashtra. Families hoist an auspicious silk-draped 'Gudhi' outside their homes and participate in morning cultural parades (Shobha Yatra) with traditional Nauvari sarees, saffron turbans (pheta), and Enfield rallies.",
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80",
    significance: "Marks the victory of King Shalivahana and the beginning of the vibrant harvest season.",
    highlights: ["Shobha Yatra cultural road rallies", "Puran Poli and Shrikhand feasts", "Rangoli street decorations"]
    datesMr: "मार्च – एप्रिल (चैत्र शुद्ध प्रतिपदा)",
    datesHi: "मार्च – अप्रैल (चैत्र शुक्ल प्रतिपदा)",
    locationMr: "संपूर्ण महाराष्ट्र; पुणे, ठाणे आणि मुंबईत शोभायात्रा",
    locationHi: "पूरे महाराष्ट्र में; पुणे, ठाणे और मुंबई में शोभायात्राएँ",
    descriptionMr: "मराठी नववर्षाची सुरुवात गुढी उभारून केली जाते. घरांसमोर गुढी उभारणे, रांगोळ्या, पारंपरिक वेशभूषा आणि शोभायात्रा ही या दिवसाची वैशिष्ट्ये आहेत.",
    descriptionHi: "मराठी नववर्ष की शुरुआत घरों के बाहर गुड़ी स्थापित करके की जाती है। गुड़ी, रंगोली, पारंपरिक वेशभूषा और शोभायात्राएँ इस दिन की विशेषताएँ हैं।",
    significanceMr: "नवीन वर्ष, मंगलारंभ आणि समृद्धीची आशा यांचे प्रतीक म्हणून गुढीपाडवा साजरा केला जातो.",
    significanceHi: "गुड़ी पड़वा नए वर्ष, शुभारंभ और समृद्धि की आशा का प्रतीक है।",
    highlightsMr: ["सांस्कृतिक शोभायात्रा","पुरणपोळी आणि श्रीखंड","रांगोळी व पारंपरिक सजावट"],
    highlightsHi: ["सांस्कृतिक शोभायात्राएँ","पूरनपोली और श्रीखंड","रंगोली और पारंपरिक सजावट"],
  },
  {
    id: "banganga-festival",
    name: "Banganga Music Festival",
    marathiName: "बाणगंगा संगीत महोत्सव",
    nameHi: "बाणगंगा संगीत महोत्सव",
    dates: "January",
    location: "Banganga Water Tank, Walkeshwar, Mumbai",
    description: "A magical open-air classical music festival held on the ancient stone steps of the sacred 12th-century Banganga Tank, accompanied by soft oil lamps (diyas) floating on the water.",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
    significance: "Revitalizes Mumbai's oldest living heritage precinct through sublime Hindustani classical ragas.",
    highlights: ["Floating diya lamps at dusk", "World-renowned santoor, sarod, and vocalists", "Ancient stone heritage atmosphere"]
    datesMr: "जानेवारी (आयोजकांच्या घोषणेनुसार)",
    datesHi: "जनवरी (आयोजकों की घोषणा के अनुसार)",
    locationMr: "बाणगंगा तलाव, वाळकेश्वर, मुंबई",
    locationHi: "बाणगंगा तालाब, वालकेश्वर, मुंबई",
    descriptionMr: "मुंबईतील ऐतिहासिक बाणगंगा तलाव परिसरात आयोजित होणारा भारतीय शास्त्रीय संगीताचा महोत्सव.",
    descriptionHi: "मुंबई के ऐतिहासिक बाणगंगा तालाब परिसर में आयोजित भारतीय शास्त्रीय संगीत का उत्सव।",
    significanceMr: "बाणगंगा परिसराचा सांस्कृतिक वारसा आणि हिंदुस्थानी शास्त्रीय संगीत यांचा परिचय करून देणारा उपक्रम.",
    significanceHi: "यह आयोजन बाणगंगा क्षेत्र की सांस्कृतिक विरासत और हिंदुस्तानी शास्त्रीय संगीत को सामने लाता है।",
    highlightsMr: ["तलाव परिसरातील दीपप्रकाश","संतूर, सरोद आणि गायन","ऐतिहासिक दगडी घाटांचे वातावरण"],
    highlightsHi: ["तालाब के आसपास दीपों की रोशनी","संतूर, सरोद और गायन","ऐतिहासिक पत्थर की सीढ़ियों का वातावरण"],
  }
];

// Enrich festivals with local asset paths while preserving all existing data
FESTIVALS.forEach(fest => {
  const reg = FESTIVALS_IMAGE_REGISTRY[fest.id];
  if (reg) {
    fest.localAssets = reg.slots;
    fest.assetsFolder = reg.folder;
  }
});
