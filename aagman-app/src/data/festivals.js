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
    description: "Maharashtra's grand 10-day cultural festival, popularised as a public celebration by Lokmanya Tilak in the 1890s. Features magnificent pandals, traditional Dhol-Tasha pathaks, cultural stage performances, and grand immersion (visarjan) processions.",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80",
    significance: "Celebrates Lord Ganesha, the remover of obstacles. Fosters unity, performing arts, and traditional Maharashtrian hospitality.",
    highlights: ["Manache Ganpati in Pune", "Lalbaugcha Raja in Mumbai", "Dhol Tasha drumming troupes", "Ukadiche Modak feast"],
    datesMr: "ऑगस्ट – सप्टेंबर (भाद्रपद शुद्ध चतुर्थी)",
    datesHi: "अगस्त – सितंबर (भाद्रपद शुक्ल चतुर्थी)",
    locationMr: "संपूर्ण महाराष्ट्र (पुणे आणि मुंबईत विशेष उत्साह)",
    locationHi: "पूरे महाराष्ट्र में (पुणे और मुंबई में विशेष आयोजन)",
    descriptionMr: "महाराष्ट्रातील प्रमुख दहा दिवसांचा सांस्कृतिक उत्सव. लोकमान्य टिळकांनी १८९० च्या दशकात सार्वजनिक उत्सवाला लोकप्रियता मिळवून दिली. भव्य सार्वजनिक मंडप, पारंपरिक ढोल-ताशा पथके आणि विसर्जन मिरवणुका ही वैशिष्ट्ये आहेत.",
    descriptionHi: "महाराष्ट्र का प्रमुख दस दिवसीय सांस्कृतिक उत्सव। लोकमान्य तिलक ने 1890 के दशक में इसे सार्वजनिक उत्सव के रूप में लोकप्रिय बनाया। भव्य पंडाल, पारंपरिक ढोल-ताशा दल और विसर्जन जुलूस इसकी विशेषताएँ हैं।",
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
    highlights: ["Sunrise cradle ceremony at Shivneri Fort", "Traditional Powada recitals", "Fort illumination at Raigad and Sinhagad"],
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
    significance: "A living pilgrimage tradition centred on devotion, equality, communal harmony, and spiritual discipline.",
    highlights: ["Bhajan rings (Ringan ceremonies)", "Palkhi processions through rural Maharashtra", "Dip in Chandrabhaga holy river"],
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
    dates: "Dates vary by edition; confirm with the current organiser announcement",
    location: "Soneri Mahal / Ellora Caves, Chhatrapati Sambhajinagar",
    description: "A prestigious 3-day classical music and dance festival with the ancient rock-cut monolithic Kailasa temple and Soneri Mahal as magnificent backdrops. Features India's greatest classical vocalists, sitarists, Kathak and Odissi dancers.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    significance: "Brings alive ancient Indian heritage through living classical performing arts.",
    highlights: ["Classical dance under illuminated stone arches", "Sitar and flute recitals", "Handicrafts & Paithani saree fair"],
    datesMr: "आयोजकांच्या चालू घोषणेनुसार तारखा बदलतात",
    datesHi: "आयोजकों की वर्तमान घोषणा के अनुसार तिथियाँ बदलती हैं",
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
    highlights: ["Shobha Yatra cultural road rallies", "Puran Poli and Shrikhand feasts", "Rangoli street decorations"],
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
    dates: "Dates vary by edition; confirm with the current organiser announcement",
    location: "Banganga Water Tank, Walkeshwar, Mumbai",
    description: "A magical open-air classical music festival held on the ancient stone steps of the sacred 12th-century Banganga Tank, accompanied by soft oil lamps (diyas) floating on the water.",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
    significance: "Revitalizes Mumbai's oldest living heritage precinct through sublime Hindustani classical ragas.",
    highlights: ["Floating diya lamps at dusk", "World-renowned santoor, sarod, and vocalists", "Ancient stone heritage atmosphere"],
    datesMr: "आयोजकांच्या चालू घोषणेनुसार तारखा बदलतात",
    datesHi: "आयोजकों की वर्तमान घोषणा के अनुसार तिथियाँ बदलती हैं",
    locationMr: "बाणगंगा तलाव, वाळकेश्वर, मुंबई",
    locationHi: "बाणगंगा तालाब, वालकेश्वर, मुंबई",
    descriptionMr: "मुंबईतील ऐतिहासिक बाणगंगा तलाव परिसरात आयोजित होणारा भारतीय शास्त्रीय संगीताचा महोत्सव.",
    descriptionHi: "मुंबई के ऐतिहासिक बाणगंगा तालाब परिसर में आयोजित भारतीय शास्त्रीय संगीत का उत्सव।",
    significanceMr: "बाणगंगा परिसराचा सांस्कृतिक वारसा आणि हिंदुस्थानी शास्त्रीय संगीत यांचा परिचय करून देणारा उपक्रम.",
    significanceHi: "यह आयोजन बाणगंगा क्षेत्र की सांस्कृतिक विरासत और हिंदुस्तानी शास्त्रीय संगीत को सामने लाता है।",
    highlightsMr: ["तलाव परिसरातील दीपप्रकाश","संतूर, सरोद आणि गायन","ऐतिहासिक दगडी घाटांचे वातावरण"],
    highlightsHi: ["तालाब के आसपास दीपों की रोशनी","संतूर, सरोद और गायन","ऐतिहासिक पत्थर की सीढ़ियों का वातावरण"],
  },
  {
    id: "dahi-handi",
    name: "Dahi Handi",
    marathiName: "दहीहंडी",
    nameHi: "दही हांडी",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/dahi-handi/",
    dates: "August – September (Janmashtami)",
    datesMr: "ऑगस्ट – सप्टेंबर (जन्माष्टमी)",
    datesHi: "अगस्त – सितंबर (जन्माष्टमी)",
    location: "Mumbai, Thane, Pune and other cities",
    locationMr: "मुंबई, ठाणे, पुणे आणि इतर शहरे",
    locationHi: "मुंबई, ठाणे, पुणे और अन्य शहर",
    description: "Teams known as Govindas form human pyramids to reach and break a suspended pot of curd, celebrating the playful stories of Lord Krishna. The event is known for teamwork, music and lively neighbourhood gatherings.",
    descriptionMr: "गोविंदा पथके मानवी मनोरे रचून उंच बांधलेली दह्याची हंडी फोडतात. श्रीकृष्णाच्या बाललीलांचे स्मरण करणाऱ्या या उत्सवात संघभावना, संगीत आणि परिसरातील सामुदायिक सहभाग दिसतो.",
    descriptionHi: "गोविंदा दल मानव पिरामिड बनाकर ऊँचाई पर बाँधी दही की हांडी फोड़ते हैं। श्रीकृष्ण की बाल लीलाओं से जुड़ा यह उत्सव टीमवर्क, संगीत और सामुदायिक भागीदारी का प्रतीक है।",
    significance: "The festival celebrates devotion to Krishna while highlighting coordination, perseverance and community spirit.",
    significanceMr: "श्रीकृष्णावरील भक्ती व्यक्त करताना समन्वय, चिकाटी आणि सामुदायिक एकतेचे महत्त्व अधोरेखित करणारा उत्सव.",
    significanceHi: "यह उत्सव कृष्ण भक्ति के साथ समन्वय, दृढ़ता और सामुदायिक एकता को दर्शाता है।",
    highlights: [
      "Govinda human-pyramid teams",
      "Traditional dhol and music",
      "Community celebrations and handi-breaking events"
    ],
    highlightsMr: [
      "गोविंदा पथकांचे मानवी मनोरे",
      "पारंपरिक ढोल आणि संगीत",
      "सामुदायिक उत्सव आणि हंडी फोडण्याचे कार्यक्रम"
    ],
    highlightsHi: [
      "गोविंदा दलों के मानव पिरामिड",
      "पारंपरिक ढोल और संगीत",
      "सामुदायिक आयोजन और हांडी फोड़ने के कार्यक्रम"
    ],
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "marbat-utsav",
    name: "Marbat Utsav",
    marathiName: "मारबत उत्सव",
    nameHi: "मारबत उत्सव",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/marbat-utsav/",
    dates: "August – September (second day of Pola)",
    datesMr: "ऑगस्ट – सप्टेंबर (पोळ्याच्या दुसऱ्या दिवशी)",
    datesHi: "अगस्त – सितंबर (पोला के दूसरे दिन)",
    location: "Nagpur, especially Itwari",
    locationMr: "नागपूर, विशेषतः इतवारी परिसर",
    locationHi: "नागपुर, विशेषकर इतवारी क्षेत्र",
    description: "A distinctive Nagpur street festival in which large symbolic effigies are carried through the city in processions. The tradition combines community participation with social commentary and the symbolic removal of negativity.",
    descriptionMr: "नागपूरमधील वैशिष्ट्यपूर्ण उत्सवात मोठ्या प्रतीकात्मक मारबत प्रतिमा मिरवणुकीतून नेल्या जातात. सामुदायिक सहभागासोबत सामाजिक प्रश्नांवरील भाष्य आणि नकारात्मकतेचे प्रतीकात्मक उच्चाटन हा या परंपरेचा भाग आहे.",
    descriptionHi: "नागपुर का अनूठा उत्सव, जिसमें बड़ी प्रतीकात्मक मारबत प्रतिमाओं को जुलूस में शहर से ले जाया जाता है। इसमें सामुदायिक भागीदारी, सामाजिक संदेश और नकारात्मकता को दूर करने का प्रतीकात्मक भाव शामिल है।",
    significance: "Marbat Utsav expresses public concerns through symbolic effigies and celebrates Nagpur's distinctive local tradition.",
    significanceMr: "प्रतीकात्मक प्रतिमांमधून सामाजिक भावना व्यक्त करणारा आणि नागपूरची वैशिष्ट्यपूर्ण स्थानिक परंपरा जपणारा उत्सव.",
    significanceHi: "यह उत्सव प्रतीकात्मक पुतलों के माध्यम से सामाजिक चिंताओं को व्यक्त करता है और नागपुर की विशिष्ट स्थानीय परंपरा को जीवित रखता है।",
    highlights: [
      "Kala Marbat and Pivli Marbat effigies",
      "Processions through Nagpur streets",
      "Traditional drumming and community participation"
    ],
    highlightsMr: [
      "काळी मारबत आणि पिवळी मारबत प्रतिमा",
      "नागपूरच्या रस्त्यांवरील मिरवणुका",
      "पारंपरिक ढोलवादन आणि सामुदायिक सहभाग"
    ],
    highlightsHi: [
      "काली मारबत और पीली मारबत प्रतिमाएँ",
      "नागपुर की सड़कों पर जुलूस",
      "पारंपरिक ढोल और सामुदायिक भागीदारी"
    ],
    image: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "jyotiba-jatra",
    name: "Jyotiba Jatra",
    marathiName: "ज्योतिबा यात्रा",
    nameHi: "ज्योतिबा यात्रा",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/jyotiba-jatra/",
    dates: "March – April (Chaitra Purnima)",
    datesMr: "मार्च – एप्रिल (चैत्र पौर्णिमा)",
    datesHi: "मार्च – अप्रैल (चैत्र पूर्णिमा)",
    location: "Jyotiba Temple, Wadi Ratnagiri, Kolhapur",
    locationMr: "ज्योतिबा मंदिर, वाडी रत्नागिरी, कोल्हापूर",
    locationHi: "ज्योतिबा मंदिर, वाडी रत्नागिरी, कोल्हापुर",
    description: "A major pilgrimage gathering at the hilltop Jyotiba Temple near Kolhapur. Devotees take part in processions, worship and the distinctive tradition of applying and tossing pink gulal.",
    descriptionMr: "कोल्हापूरजवळील डोंगरावरील ज्योतिबा मंदिरात मोठी यात्रा भरते. भाविक मिरवणुका, पूजा आणि गुलाल उधळण्याच्या वैशिष्ट्यपूर्ण परंपरेत सहभागी होतात.",
    descriptionHi: "कोल्हापुर के पास पहाड़ी पर स्थित ज्योतिबा मंदिर में बड़ी यात्रा आयोजित होती है। श्रद्धालु जुलूस, पूजा और गुलाल उड़ाने की विशिष्ट परंपरा में भाग लेते हैं।",
    significance: "The Jatra honours Jyotiba and brings devotees together in a shared expression of faith and regional tradition.",
    significanceMr: "ज्योतिबा देवतेप्रती श्रद्धा व्यक्त करणारी आणि सामूहिक भक्ती व प्रादेशिक परंपरा जपणारी यात्रा.",
    significanceHi: "यह यात्रा ज्योतिबा के प्रति श्रद्धा और क्षेत्रीय परंपरा के सामूहिक उत्सव का अवसर है।",
    highlights: [
      "Chaitra Purnima pilgrimage",
      "Palkhi processions and dhol-tasha",
      "Pink gulal traditions"
    ],
    highlightsMr: [
      "चैत्र पौर्णिमेची यात्रा",
      "पालखी मिरवणुका आणि ढोल-ताशा",
      "गुलाल उधळण्याची परंपरा"
    ],
    highlightsHi: [
      "चैत्र पूर्णिमा की यात्रा",
      "पालखी जुलूस और ढोल-ताशा",
      "गुलाल उड़ाने की परंपरा"
    ],
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "shimga-holi",
    name: "Kokanatil Shimga (Holi)",
    marathiName: "कोकणातील शिमगा",
    nameHi: "कोंकण का शिमगा (होली)",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/holi/",
    dates: "February – March (Phalguna)",
    datesMr: "फेब्रुवारी – मार्च (फाल्गुन)",
    datesHi: "फरवरी – मार्च (फाल्गुन)",
    location: "Konkan region, including Ratnagiri, Sindhudurg and Raigad",
    locationMr: "रत्नागिरी, सिंधुदुर्ग आणि रायगडसह कोकण विभाग",
    locationHi: "रत्नागिरी, सिंधुदुर्ग और रायगढ़ सहित कोंकण क्षेत्र",
    description: "The Konkan form of Holi, known as Shimga, combines Holika bonfires with village processions, palkhi traditions, folk songs and dances. Rang Panchami colour celebrations follow in many communities.",
    descriptionMr: "कोकणातील होळीला शिमगा म्हणतात. होळीच्या अग्निविधीसोबत गावातील मिरवणुका, पालखी परंपरा, लोकगीते आणि नृत्ये यांचा उत्सवात समावेश असतो. अनेक ठिकाणी त्यानंतर रंगपंचमी साजरी केली जाते.",
    descriptionHi: "कोंकण में होली को शिमगा कहा जाता है। इसमें होलिका दहन के साथ गाँवों की शोभायात्राएँ, पालखी परंपराएँ, लोकगीत और नृत्य शामिल होते हैं। कई समुदायों में इसके बाद रंगपंचमी मनाई जाती है।",
    significance: "Shimga welcomes the seasonal transition and brings village communities together through local ritual and folk culture.",
    significanceMr: "ऋतुबदलाचे स्वागत करत स्थानिक विधी आणि लोकसंस्कृतीतून गावसमुदायांना एकत्र आणणारा उत्सव.",
    significanceHi: "शिमगा ऋतु परिवर्तन का स्वागत करता है और स्थानीय रीति-रिवाजों तथा लोकसंस्कृति के माध्यम से समुदायों को जोड़ता है।",
    highlights: [
      "Holika bonfires",
      "Village palkhi processions",
      "Shimga folk songs, dance and Rang Panchami"
    ],
    highlightsMr: [
      "होळीची अग्निपूजा",
      "गावातील पालखी मिरवणुका",
      "शिमगा लोकगीते, नृत्य आणि रंगपंचमी"
    ],
    highlightsHi: [
      "होलिका दहन",
      "गाँवों की पालखी शोभायात्राएँ",
      "शिमगा लोकगीत, नृत्य और रंगपंचमी"
    ],
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gauri-aagman",
    name: "Gauri Aagman",
    marathiName: "गौरी आगमन",
    nameHi: "गौरी आगमन",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/gauri-aagman/",
    dates: "August – September (during Ganesh Chaturthi)",
    datesMr: "ऑगस्ट – सप्टेंबर (गणेशोत्सव काळात)",
    datesHi: "अगस्त – सितंबर (गणेश चतुर्थी के दौरान)",
    location: "Mumbai, Pune, Nashik and communities across Maharashtra",
    locationMr: "मुंबई, पुणे, नाशिक आणि संपूर्ण महाराष्ट्रातील समुदाय",
    locationHi: "मुंबई, पुणे, नाशिक और महाराष्ट्र के विभिन्न समुदाय",
    description: "Families welcome Goddess Gauri, associated with Parvati, during the Ganesh festival. Homes and community spaces are decorated, special worship is performed and the idols are later taken for immersion.",
    descriptionMr: "गणेशोत्सवात कुटुंबे पार्वतीचे रूप मानल्या जाणाऱ्या देवी गौरीचे स्वागत करतात. घरे आणि सार्वजनिक जागा सजवल्या जातात, विशेष पूजा केली जाते आणि नंतर मूर्तींचे विसर्जन होते.",
    descriptionHi: "गणेशोत्सव के दौरान परिवार पार्वती के रूप से जुड़ी देवी गौरी का स्वागत करते हैं। घरों और सामुदायिक स्थलों को सजाया जाता है, विशेष पूजा होती है और बाद में मूर्तियों का विसर्जन किया जाता है।",
    significance: "Gauri Aagman celebrates the goddess's arrival and is associated with prosperity, family well-being and community bonds.",
    significanceMr: "देवीच्या आगमनाचा उत्सव असून समृद्धी, कुटुंबकल्याण आणि सामुदायिक नातेसंबंधांशी जोडलेला आहे.",
    significanceHi: "गौरी आगमन देवी के स्वागत का उत्सव है, जो समृद्धि, परिवार के कल्याण और सामुदायिक संबंधों से जुड़ा है।",
    highlights: [
      "Welcoming Gauri idols, often in pairs",
      "Flowers, rangoli and traditional offerings",
      "Family worship and immersion processions"
    ],
    highlightsMr: [
      "गौरी मूर्तींचे स्वागत, अनेकदा ज्येष्ठा-कनिष्ठा रूपात",
      "फुले, रांगोळी आणि पारंपरिक नैवेद्य",
      "कौटुंबिक पूजा आणि विसर्जन मिरवणुका"
    ],
    highlightsHi: [
      "गौरी की मूर्तियों का स्वागत, प्रायः जोड़ी में",
      "फूल, रंगोली और पारंपरिक भोग",
      "पारिवारिक पूजा और विसर्जन जुलूस"
    ],
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "khandoba-jatra",
    name: "Khandoba Jatra",
    marathiName: "खंडोबा यात्रा",
    nameHi: "खंडोबा यात्रा",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/khandoba-jatra/",
    dates: "Somvati Amavasya (dates vary by lunar calendar)",
    datesMr: "सोमवती अमावस्या (चांद्र दिनदर्शिकेनुसार तारीख बदलते)",
    datesHi: "सोमवती अमावस्या (चंद्र पंचांग के अनुसार तिथि बदलती है)",
    location: "Khandoba Temple, Jejuri, Pune district",
    locationMr: "खंडोबा मंदिर, जेजुरी, पुणे जिल्हा",
    locationHi: "खंडोबा मंदिर, जेजुरी, पुणे जिला",
    description: "Devotees visit Jejuri's hilltop Khandoba Temple for worship and processions. Turmeric, known locally as bhandara, is central to the celebration and gives the temple precinct its golden appearance.",
    descriptionMr: "भाविक जेजुरीच्या डोंगरावरील खंडोबा मंदिरात दर्शन आणि मिरवणुकांसाठी येतात. भंडारा म्हणून ओळखला जाणारा हळद हा उत्सवाचा महत्त्वाचा भाग असून मंदिर परिसर सोनेरी दिसतो.",
    descriptionHi: "श्रद्धालु जेजुरी के पहाड़ी खंडोबा मंदिर में पूजा और जुलूस के लिए आते हैं। भंडारा कहलाने वाली हल्दी इस उत्सव का प्रमुख हिस्सा है और मंदिर परिसर को सुनहरा रंग देती है।",
    significance: "The Jatra honours Khandoba and reflects the devotion of farming and warrior communities, with prayers for protection and well-being.",
    significanceMr: "खंडोबा देवतेप्रती भक्ती व्यक्त करणारी आणि शेतकरी व योद्धा समुदायांच्या संरक्षण व कल्याणाच्या प्रार्थनांशी जोडलेली यात्रा.",
    significanceHi: "यह यात्रा खंडोबा के प्रति भक्ति और किसान तथा योद्धा समुदायों की सुरक्षा एवं कल्याण की प्रार्थनाओं से जुड़ी है।",
    highlights: [
      "Pilgrimage up Jejuri hill",
      "Bhandara turmeric traditions",
      "Temple worship, music and processions"
    ],
    highlightsMr: [
      "जेजुरी गडावरील यात्रा",
      "भंडाऱ्याची हळद उधळण्याची परंपरा",
      "मंदिरातील पूजा, संगीत आणि मिरवणुका"
    ],
    highlightsHi: [
      "जेजुरी पहाड़ी की तीर्थयात्रा",
      "भंडारा हल्दी की परंपरा",
      "मंदिर पूजा, संगीत और जुलूस"
    ],
    image: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bail-pola",
    name: "Bail Pola",
    marathiName: "बैलपोळा",
    nameHi: "बैल पोला",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/bail-pola/",
    dates: "August – September (Shravan Amavasya)",
    datesMr: "ऑगस्ट – सप्टेंबर (श्रावण अमावस्या)",
    datesHi: "अगस्त – सितंबर (श्रावण अमावस्या)",
    location: "Rural Maharashtra, especially farming communities",
    locationMr: "ग्रामीण महाराष्ट्र, विशेषतः शेतकरी समुदाय",
    locationHi: "ग्रामीण महाराष्ट्र, विशेषकर किसान समुदाय",
    description: "Farmers honour the bullocks that help cultivate their fields. Cattle are bathed, decorated with colourful ornaments and bells, rested from work and taken in ceremonial processions.",
    descriptionMr: "शेतकरी शेतीकामात मदत करणाऱ्या बैलांचा सन्मान करतात. जनावरांना अंघोळ घालून रंगीबेरंगी सजावट आणि घंटांनी सजवले जाते, कामातून विश्रांती दिली जाते आणि मिरवणुकीत सहभागी केले जाते.",
    descriptionHi: "किसान खेतों में काम करने वाले बैलों का सम्मान करते हैं। पशुओं को नहलाया और रंगीन सजावट तथा घंटियों से सजाया जाता है, उन्हें काम से छुट्टी दी जाती है और जुलूस में शामिल किया जाता है।",
    significance: "Bail Pola recognises the contribution of working cattle to agriculture and the livelihood of farming families.",
    significanceMr: "शेती आणि शेतकरी कुटुंबांच्या उपजीविकेत काम करणाऱ्या जनावरांच्या योगदानाची कृतज्ञतापूर्वक दखल घेणारा सण.",
    significanceHi: "बैल पोला कृषि और किसान परिवारों की आजीविका में काम करने वाले पशुओं के योगदान के प्रति आभार व्यक्त करता है।",
    highlights: [
      "Decorated bullocks and cattle worship",
      "Village processions with drums",
      "Traditional family meals and community visits"
    ],
    highlightsMr: [
      "सजवलेले बैल आणि पशुपूजा",
      "ढोलांसह गावातील मिरवणुका",
      "पारंपरिक कौटुंबिक भोजन आणि भेटीगाठी"
    ],
    highlightsHi: [
      "सजे हुए बैल और पशु पूजा",
      "ढोल के साथ गाँवों की शोभायात्राएँ",
      "पारंपरिक पारिवारिक भोजन और सामुदायिक मुलाकातें"
    ],
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "diwali",
    name: "Diwali (Deepavali)",
    marathiName: "दिवाळी",
    nameHi: "दीवाली",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/diwali/",
    dates: "October – November (five-day festival)",
    datesMr: "ऑक्टोबर – नोव्हेंबर (पाच दिवसांचा सण)",
    datesHi: "अक्टूबर – नवंबर (पाँच दिवसीय पर्व)",
    location: "Across Maharashtra",
    locationMr: "संपूर्ण महाराष्ट्र",
    locationHi: "पूरे महाराष्ट्र में",
    description: "The five-day festival of lights brings families together for lamps, worship, festive food and visits. In Maharashtra, the days include Dhanatrayodashi, Narak Chaturdashi, Lakshmi Pujan, Padwa and Bhaubeej.",
    descriptionMr: "पाच दिवसांचा दीपोत्सव कुटुंबांना दिवे, पूजा, फराळ आणि भेटीगाठींसाठी एकत्र आणतो. महाराष्ट्रात धनत्रयोदशी, नरक चतुर्दशी, लक्ष्मीपूजन, पाडवा आणि भाऊबीज हे दिवस महत्त्वाचे आहेत.",
    descriptionHi: "पाँच दिनों का दीपोत्सव परिवारों को दीप जलाने, पूजा, पकवान और मेल-मिलाप के लिए एकत्र करता है। महाराष्ट्र में धनत्रयोदशी, नरक चतुर्दशी, लक्ष्मी पूजन, पाडवा और भाऊबीज प्रमुख दिन हैं।",
    significance: "Diwali symbolises the triumph of light over darkness and good over evil, while strengthening family and community bonds.",
    significanceMr: "अंधारावर प्रकाशाचा आणि वाईटावर चांगुलपणाचा विजय दर्शवणारा तसेच कौटुंबिक व सामुदायिक नाती दृढ करणारा सण.",
    significanceHi: "दीवाली अंधकार पर प्रकाश और बुराई पर अच्छाई की विजय का प्रतीक है तथा पारिवारिक और सामुदायिक संबंधों को मजबूत करती है।",
    highlights: [
      "Dhanatrayodashi and Narak Chaturdashi",
      "Lakshmi Pujan and rows of lamps",
      "Padwa, Bhaubeej and traditional faraal"
    ],
    highlightsMr: [
      "धनत्रयोदशी आणि नरक चतुर्दशी",
      "लक्ष्मीपूजन आणि दिव्यांच्या रांगा",
      "पाडवा, भाऊबीज आणि पारंपरिक फराळ"
    ],
    highlightsHi: [
      "धनत्रयोदशी और नरक चतुर्दशी",
      "लक्ष्मी पूजन और दीपों की कतारें",
      "पाडवा, भाऊबीज और पारंपरिक फराल"
    ],
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "maharashtra-day",
    name: "Maharashtra Day",
    marathiName: "महाराष्ट्र दिन",
    nameHi: "महाराष्ट्र दिवस",
    sourceUrl: "https://maharashtratourism.gov.in/festivals/maharashtra-din/",
    dates: "1 May",
    datesMr: "१ मे",
    datesHi: "1 मई",
    location: "Across Maharashtra; major state ceremony in Mumbai",
    locationMr: "संपूर्ण महाराष्ट्र; मुंबईत प्रमुख शासकीय सोहळा",
    locationHi: "पूरे महाराष्ट्र में; मुंबई में प्रमुख राज्य समारोह",
    description: "Maharashtra Day marks the formation of the state on 1 May 1960. Flag-hoisting, official ceremonies, cultural programmes and public events commemorate the state's history and the Samyukta Maharashtra movement.",
    descriptionMr: "१ मे १९६० रोजी महाराष्ट्र राज्याची स्थापना झाल्याच्या स्मरणार्थ महाराष्ट्र दिन साजरा केला जातो. ध्वजारोहण, शासकीय समारंभ, सांस्कृतिक कार्यक्रम आणि संयुक्त महाराष्ट्र चळवळीचे स्मरण केले जाते.",
    descriptionHi: "1 मई 1960 को महाराष्ट्र राज्य के गठन की स्मृति में महाराष्ट्र दिवस मनाया जाता है। ध्वजारोहण, सरकारी समारोह, सांस्कृतिक कार्यक्रम और संयुक्त महाराष्ट्र आंदोलन को याद किया जाता है।",
    significance: "The day honours the formation of Maharashtra and the people whose efforts helped establish a Marathi-speaking state.",
    significanceMr: "महाराष्ट्र राज्याच्या निर्मितीचा आणि मराठी भाषिक राज्यासाठी प्रयत्न करणाऱ्या जनतेच्या योगदानाचा गौरव करणारा दिवस.",
    significanceHi: "यह दिन महाराष्ट्र राज्य के गठन और मराठी भाषी राज्य की स्थापना के लिए प्रयास करने वाले लोगों के योगदान का सम्मान करता है।",
    highlights: [
      "State flag-hoisting ceremonies",
      "Cultural programmes and public gatherings",
      "Remembrance of the Samyukta Maharashtra movement"
    ],
    highlightsMr: [
      "राज्यस्तरीय ध्वजारोहण समारंभ",
      "सांस्कृतिक कार्यक्रम आणि सार्वजनिक सभा",
      "संयुक्त महाराष्ट्र चळवळीचे स्मरण"
    ],
    highlightsHi: [
      "राज्य ध्वजारोहण समारोह",
      "सांस्कृतिक कार्यक्रम और सार्वजनिक आयोजन",
      "संयुक्त महाराष्ट्र आंदोलन का स्मरण"
    ],
    image: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80"
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
