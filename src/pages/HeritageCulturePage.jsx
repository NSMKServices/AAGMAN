import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  Castle,
  Landmark,
  Building,
  Utensils,
  Music,
  Sparkles,
  Award,
  Compass
} from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';
import styles from './HeritageCulturePage.module.css';

const HERITAGE_SECTIONS = [
  {
    id: 'maratha-swarajya',
    Icon: Castle,
    badgeVariant: 'forts',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    title: {
      en: 'The Maratha Swarajya & Shivaji Maharaj',
      mr: 'मराठा स्वराज्य आणि छत्रपती शिवाजी महाराज',
      hi: 'मराठा स्वराज्य एवं छत्रपति शिवाजी महाराज'
    },
    tag: {
      en: 'Imperial History',
      mr: 'शाही इतिहास',
      hi: 'शाही इतिहास'
    },
    summary: {
      en: 'The birth of "Hindavi Swarajya" in the Sahyadri mountains—where visionary military strategy, naval fortification, and enlightened governance shaped modern India.',
      mr: 'सह्याद्रीच्या कुशीत स्थापन झालेले "हिंदवी स्वराज्य"—जिथे अभेद्य दुर्गबांधणी, गनिमी कावा आणि प्रजाहितदक्ष राज्यकारभाराने भारतीय इतिहासाला नवी दिशा दिली.',
      hi: 'सह्याद्रि की वादियों में स्थापित "हिंदवी स्वराज्य"—जहाँ अद्वितीय सैन्य रणनीति, जलदुर्ग निर्माण और लोककल्याणकारी शासन ने भारतीय इतिहास को नई दिशा दी।'
    },
    narrative: {
      en: `In the 17th century, Chhatrapati Shivaji Maharaj established a sovereign people\'s empire known as "Hindavi Swarajya" in Western Maharashtra. Recognizing the impregnable topography of the Western Ghats (Sahyadris), he fortified hilltops and coastal islands, creating over 300 defensive strongholds.

His military doctrine—Ganimi Kava (guerilla warfare)—revolutionized warfare by utilizing the steep cliffs, dense forests, and narrow mountain passes of Maharashtra. Shivaji Maharaj also established the pioneering Maratha Navy under Kanhoji Angre, building sea fortresses like Sindhudurg, Murud-Janjira, and Suvarnadurg to protect the Konkan coastline from European colonial fleets.`,
      mr: `१७ व्या शतकात छत्रपती शिवाजी महाराजांनी पश्चिम महाराष्ट्रात लोककल्याणकारी "हिंदवी स्वराज्य" स्थापन केले. सह्याद्री पर्वतरांगांची नैसर्गिक दुर्गमता ओळखून त्यांनी ३०० हून अधिक गिरिदुर्ग, जलदुर्ग आणि भुईकोट किल्ल्यांची अभेद्य साखळी उभारली.

त्यांची "गनिमी कावा" ही युद्धनीती डोंगराळ दऱ्याखोऱ्यांचा, घनदाट जंगलांचा आणि वेगवान हालचालींचा प्रभावी वापर करून शत्रूचा पराभव करण्यासाठी जगभर प्रसिद्ध ठरली. महाराजांनी कान्होजी आंग्रे यांच्या नेतृत्वाखाली मराठा आरमार उभारून सिंधुदुर्ग, सुवर्णदुर्ग आणि पद्मदुर्ग यांसारखे जलदुर्ग बांधून कोकण किनारपट्टीचे परकीय आक्रमकांपासून रक्षण केले.`,
      hi: `१७वीं शताब्दी में छत्रपति शिवाजी महाराज ने पश्चिमी महाराष्ट्र में लोककल्याणकारी "हिंदवी स्वराज्य" की नींव रखी। सह्याद्रि की दुर्गम भौगोलिक स्थिति को पहचानते हुए उन्होंने ३०० से अधिक पहाड़ी एवं तटीय किलों की सुदृढ़ श्रृंखला तैयार की।

उनकी "गनिमी कावा" (गुरिल्ला युद्धनीति) ने खड़ी चट्टानों, घने वनों और संकीर्ण पहाड़ी दरों का कुशलतापूर्वक उपयोग कर इतिहास रचा। शिवाजी महाराज ने कान्होजी आंग्रे के नेतृत्व में शक्तिशाली मराठा नौसेना की स्थापना की और सिंधुदुर्ग व सुवर्णदुर्ग जैसे जलदुर्गों के माध्यम से कोंकण तट को औपनिवेशिक आक्रमणों से सुरक्षित किया।`
    },
    highlights: {
      en: [
        { label: 'Key Capitals', value: 'Rajgad (early capital) and Raigad (site of royal coronation in 1674)' },
        { label: 'Naval Bastions', value: 'Sindhudurg, Vijaydurg, Suvarnadurg, Padmadurg' },
        { label: 'Military Innovation', value: 'Ganimi Kava (lightning mountain warfare) & specialized Sahyadri hill fortification' },
        { label: 'Administrative Ethos', value: 'Religious tolerance, protection of women, agrarian reform, and Marathi court dictionary' }
      ],
      mr: [
        { label: 'प्रमुख राजधान्या', value: 'किल्ले राजगड (पहिली राजधानी) आणि किल्ले रायगड (इ.स. १६७४ मधील राज्याभिषेक स्थळ)' },
        { label: 'प्रमुख जलदुर्ग', value: 'सिंधुदुर्ग, विजयदुर्ग, सुवर्णदुर्ग, पद्मदुर्ग' },
        { label: 'युद्धकौशल्य', value: 'गनिमी कावा युद्धतंत्र आणि सह्याद्रीतील अजिंक्य गिरिदुर्ग स्थापत्य' },
        { label: 'प्रशासन मूल्ये', value: 'सर्वधर्मसमभाव, महिलांचा सन्मान, रयतहिताचे शेती धोरण आणि राज्यव्यवहार कोश' }
      ],
      hi: [
        { label: 'प्रमुख राजधानियाँ', value: 'राजगढ़ (आरंभिक राजधानी) और रायगढ़ (१६७४ में ऐतिहासिक राज्याभिषेक स्थल)' },
        { label: 'प्रमुख जलदुर्ग', value: 'सिंधुदुर्ग, विजयदुर्ग, सुवर्णदुर्ग, पद्मदुर्ग' },
        { label: 'सैन्य नवाचार', value: 'गनिमी कावा (गुरिल्ला रणनीति) और सह्याद्रि पहाड़ी दुर्ग निर्माण' },
        { label: 'प्रशासनिक मूल्य', value: 'धार्मिक सहिष्णुता, नारी सम्मान, कृषि सुधार और राज्यव्यवहार कोश' }
      ]
    }
  },
  {
    id: 'bhakti-saints',
    Icon: Landmark,
    badgeVariant: 'gold',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    title: {
      en: 'The Bhakti Movement & Sant Tradition',
      mr: 'वारकरी भक्ती चळवळ आणि संत परंपरा',
      hi: 'वारकरी भक्ति आंदोलन एवं संत परंपरा'
    },
    tag: {
      en: 'Spiritual Legacy',
      mr: 'आध्यात्मिक वारसा',
      hi: 'आध्यात्मिक धरोहर'
    },
    summary: {
      en: 'The democratic spiritual revolution of Maharashtra—where saint-poets composed devotional poetry in the people\'s language, uniting communities across caste lines.',
      mr: 'महाराष्ट्रातील समतेची आध्यात्मिक क्रांती—जिथे संत ज्ञानेश्वर आणि संत तुकारामांनी प्राकृत मराठीत अभंग रचून समाजाला एकात्मतेच्या सूत्रात बांधले.',
      hi: 'महाराष्ट्र की समतावादी आध्यात्मिक क्रांति—जहाँ संत ज्ञानेश्वर और संत तुकाराम ने जनभाषा मराठी में अभंग रचकर समाज को प्रेम और समता का संदेश दिया।'
    },
    narrative: {
      en: `Between the 13th and 17th centuries, Maharashtra witnessed the profound Varkari Bhakti revolution centered on Lord Vitthala of Pandharpur. Pioneer saints rejected rigid orthodoxy and composed sublime abhangas and ovies in Prakrit Marathi, fostering an egalitarian spiritual culture that continues to define the Maharashtrian soul.

Every year during the month of Ashadh (June-July), more than 1.5 million pilgrims (Varkaris) undertake the 21-day "Pandharpur Wari" walking on foot alongside the padukas (sacred footwear) of Sant Dnyaneshwar and Sant Tukaram, chanting "Gyanba Tukaram" in one of the world\'s oldest continuous mass pilgrimages.`,
      mr: `१३ व्या ते १७ व्या शतकादरम्यान पंढरपूरच्या विठूरायाच्या साक्षीने महाराष्ट्रात वारकरी भक्ती चळवळीची मोठी लाट आली. संत ज्ञानेश्वर, संत नामदेव, संत एकनाथ, संत तुकाराम आणि संत चोखामेळा यांनी रूढी-परंपरांना छेद देत लोकभाषेत अमूल्य अभंग वाङ्मय निर्माण केले.

दरवर्षी आषाढ महिन्यात सुमारे १५ लाखांहून अधिक वारकरी संत ज्ञानेश्वर आणि संत तुकाराम महाराजांच्या पालखी सोहळ्यात सहभागी होऊन २५० किमीची पायी पंढरपूर वारी पूर्ण करतात. "ज्ञानोबा माउली तुकाराम" च्या गजरात चालणारी ही वारी महाराष्ट्राच्या समतेचे आणि भक्तीचे जागतिक प्रतीक आहे.`,
      hi: `१३वीं से १७वीं शताब्दी के मध्य पंढरपुर के भगवान विट्ठल के सानिध्य में वारकरी भक्ति आंदोलन का अभूतपूर्व विकास हुआ। संत ज्ञानेश्वर, संत नामदेव, संत एकनाथ और संत तुकाराम ने रूढ़ियों को त्यागकर लोकभाषा में प्रेरक अभंगों की रचना की।

प्रतिवर्ष आषाढ़ मास में १५ लाख से अधिक श्रद्धालु (वारकरी) संत ज्ञानेश्वर और संत तुकाराम की पवित्र पालकी के साथ २५० किमी की पैदल पंढरपुर वारी करते हैं, जो विश्व की प्राचीनतम पदयात्राओं में से एक है।`
    },
    highlights: {
      en: [
        { label: 'Sant Dnyaneshwar (1275–1296)', value: 'Authored Dnyaneshwari (Marathi commentary on Bhagavad Gita) and Amrutanubhav at age 16' },
        { label: 'Sant Tukaram (1608–1650)', value: 'The poet-saint of Dehu whose Gatha (thousands of abhangas) preached compassion and social equality' },
        { label: 'Sant Eknath (1533–1599)', value: 'Pioneered "Bharud" folk dramas with spiritual allegories; revitalized Dnyaneshwari text at Paithan' },
        { label: 'Samarth Ramdas (1608–1681)', value: 'Spiritual mentor of Shivaji Maharaj; authored Dasbodh integrating spirituality with civic duty' }
      ],
      mr: [
        { label: 'संत ज्ञानेश्वर (१२७५–१२९६)', value: 'वयाच्या १६ व्या वर्षी "भावार्थदीपिका" (ज्ञानेश्वरी) आणि "अमृतानुभव" ग्रंथांची रचना' },
        { label: 'संत तुकाराम (१६०८–१६५०)', value: 'देहूचे थोर संत ज्यांच्या गाथेतील अभंगांनी दया, क्षमा आणि सामाजिक समतेची शिकवण दिली' },
        { label: 'संत एकनाथ (१५३३–१५९९)', value: 'पैठणमध्ये भारूड आणि लोकगीतांतून प्रबोधन; ज्ञानेश्वरी ग्रंथाचे शुद्धीकरण' },
        { label: 'समर्थ रामदास (१६०८–१६८१)', value: 'छत्रपती शिवरायांचे मार्गदर्शक; "दासबोध" ग्रंथातून अध्यात्म आणि कर्तव्याचा समन्वय' }
      ],
      hi: [
        { label: 'संत ज्ञानेश्वर (१२७५–१२९६)', value: '१६ वर्ष की अल्पायु में "ज्ञानेश्वरी" और "अमृतानुभव" की रचना कर ज्ञान को सुलभ बनाया' },
        { label: 'संत तुकाराम (१६०८–१६५०)', value: 'देहू के महान संत, जिनकी अभंग गाथा ने करुणा और सामाजिक समरसता की अलख जगाई' },
        { label: 'संत एकनाथ (१५३३–१५९९)', value: 'पैठण में "भारूड़" लोकविधा से जनजागरण किया और ज्ञानेश्वरी का संपादन किया' },
        { label: 'समर्थ रामदास (१६०८–१६८१)', value: 'छत्रपति शिवाजी महाराज के आध्यात्मिक गुरु; "दासबोध" के माध्यम से कर्मयोग सिखाया' }
      ]
    }
  },
  {
    id: 'art-architecture',
    Icon: Building,
    badgeVariant: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f4439066?auto=format&fit=crop&w=1200&q=80',
    title: {
      en: 'Hemadpanthi, Peshwa Wadas & Warli Art',
      mr: 'हेमाडपंती मंदिरे, पेशवेकालीन वाडे आणि वारली कला',
      hi: 'हेमाडपंथी मंदिर, पेशवा वाड़े एवं वारली कला'
    },
    tag: {
      en: 'Architecture & Craft',
      mr: 'वास्तुकला आणि हस्तकला',
      hi: 'वास्तुकला एवं हस्तकला'
    },
    summary: {
      en: 'From mortarless basalt stone temples and sprawling aristocratic Peshwa mansions to tribal ritual painting and royal silk weaving.',
      mr: 'बिन-चुन्याची काळ्या पाषाणातील हेमाडपंती मंदिरे, भव्य पेशवेकालीन वाडे, आदिवासी वारली चित्रे आणि पैठणी विणकाम असा समृद्ध वारसा.',
      hi: 'बिना गारे के बेसाल्ट पत्थरों से निर्मित हेमाडपंथी मंदिर, ऐतिहासिक पेशवा वाड़े, वारली जनजातीय चित्रकला और शाही पैठणी साड़ी।'
    },
    narrative: {
      en: `Maharashtra\'s architectural tradition spans multiple golden epochs:
1. Rock-cut Cave Architecture: UNESCO World Heritage wonders at Ajanta, Ellora (Kailash Temple carved from a single basalt rock), and Elephanta Caves.
2. Hemadpanthi Style: Medieval stone temples (such as Ambreshwar, Gondeshwar, and Bhimashankar) constructed using black basalt stone blocks interlocked with tenon-and-mortise joints without using mortar or cement.
3. Peshwa Wada Architecture: Grand timber-frame mansions (e.g., Shaniwar Wada, Vishrambaug Wada, Nana Wada) characterized by courtyards (Chowk), wooden pillar carvings, secret escape tunnels, and rainwater harvesting cisterns.
4. Warli Tribal Art: 2,500-year-old geometric paintings by the Warli tribe using rice flour paste on mud walls, depicting human community dances (Tarpa) and communion with nature.
5. Paithani Silk Weaving: Royal handloom silks woven in Paithan and Yeola with pure gold zari borders and intricate peacock (Mor) motifs, patronized by Maratha and Peshwa royalty.`,
      mr: `महाराष्ट्राची स्थापत्य परंपरा अनेक सुवर्णकाळांची साक्ष देते:
१. लेणी स्थापत्य: अजिंठा, वेरूळ (एकाच अखंड पाषाणात कोरलेले कैलास मंदिर) आणि घारापुरी (एलिफंटा) या जागतिक वारसा स्थळांमधील अद्वितीय कोरीव काम.
२. हेमाडपंती स्थापत्य: चुना किंवा सिमेंट न वापरता काळ्या बेसाल्ट पाषाणाच्या खाचा एकमेकांत अडकवून बांधलेली अंबरेश्वर, गोंदेश्वर आणि भीमाशंकर मंदिरे.
३. पेशवेकालीन वाडे: शनिवार वाडा, विश्रामबाग वाडा यांसारखे भव्य लाकडी खांब, नक्षीदार चौक आणि पाण्याचे हौद असलेले ऐतिहासिक वाडे.
४. वारली चित्रकला: तांदळाच्या पिठाचा पांढरा रंग वापरून शेणा-मातीच्या भिंतींवर तारपा नृत्य व निसर्गाचे रेखाटन करणारी अडीच हजार वर्षे जुनी आदिवासी कला.
५. पैठणी साडी: पैठण आणि येवला येथे अस्सल सोन्याच्या जरीकामाने आणि मोरपोपटांच्या नक्षीने विणली जाणारी शाही रेशमी पैठणी.`,
      hi: `महाराष्ट्र की वास्तुकला सदियों पुरानी समृद्ध परंपरा का दर्पण है:
१. शैलकृत गुफाएँ: अजंता, एलोरा (एक ही चट्टान को तराशकर बना विश्वविख्यात कैलाश मंदिर) और एलिफेंटा गुफाएँ।
२. हेमाडपंथी शैली: बिना सीमेंट या गारे के, केवल बेसाल्ट पत्थरों को जोड़कर निर्मित अंबरेश्वर, गोंदेश्वर और भीमाशंकर मंदिर।
३. पेशवा वाड़ा वास्तुकला: शनिवार वाड़ा और विश्रामबाग वाड़ा जैसे ऐतिहासिक भवन जिनमें भव्य चौक, नक्काशीदार सागौन के खंभे और गुप्त सुरंगें हैं।
४. वारली चित्रकला: चावल के लेप से मिट्टी की दीवारों पर तारपा नृत्य और प्रकृति को उकेरने वाली प्राचीन जनजातीय लोककला।
५. पैठणी वस्त्र निर्माण: पैठण और येवला में सोने की जरी और मोर के अलंकरण से बुनी जाने वाली पारंपरिक शाही सिल्क साड़ियाँ।`
    },
    highlights: {
      en: [
        { label: 'Rock-Cut Marvel', value: 'Ellora Cave 16 (Kailasa) — largest monolithic rock excavation in the world, carved top-to-bottom' },
        { label: 'Wada Architecture', value: 'Multi-courtyard courtyards, teakwood pillars, suru columns, and ornate wooden balconies' },
        { label: 'Tribal Craft', value: 'Warli paintings using white pigment made from rice paste, water, and gum on cow dung and clay walls' },
        { label: 'Textile Legacy', value: 'Paithani saris with kaleidoscopic pallus and Narali (coconut) zari borders' }
      ],
      mr: [
        { label: 'पाषाणातील चमत्कार', value: 'वेरूळ लेणी क्र. १६ (कैलास मंदिर) — वरून खाली एकाच दगडात कोरलेले जगातील सर्वात मोठे अखंडित मंदिर' },
        { label: 'वाडा स्थापत्य', value: 'चौक, सागवानी खांब, नक्षीदार मेघडंबरी आणि हवेशीर दालनांची पारंपरिक रचना' },
        { label: 'आदिवासी कला', value: 'शेणाच्या भिंतीवर तांदळाच्या पांढऱ्या रंगाने रेखाटलेली तारपा नृत्याची वारली चित्रे' },
        { label: 'वस्त्र वारसा', value: 'नारळी काठ आणि मोराच्या कलात्मक पदराने सजलेली अस्सल पैठणी साडी' }
      ],
      hi: [
        { label: 'शैलकृत अजूबा', value: 'एलोरा गुफा १६ (कैलाश मंदिर) — ऊपर से नीचे की ओर तराशा गया विश्व का सबसे बड़ा एकाश्म मंदिर' },
        { label: 'वाड़ा वास्तुकला', value: 'विशाल चौक, सागौन के नक्काशीदार स्तंभ और पारंपरिक जल संचयन प्रणाली' },
        { label: 'जनजातीय धरोहर', value: 'चावल के घोल से गोबर लिपी दीवारों पर उकेरी गई वारली लोककला' },
        { label: 'वस्त्र शिल्प', value: 'सोने की जरी और पारंपरिक मोर मोटिफ से सुसज्जित भव्य पैठणी सिल्क' }
      ]
    }
  },
  {
    id: 'culinary-traditions',
    Icon: Utensils,
    badgeVariant: 'beaches',
    heroImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    title: {
      en: 'Flavors of Maharashtra: Coastal to Plateau',
      mr: 'महाराष्ट्राची खाद्यसंस्कृती: कोकण ते दख्खन',
      hi: 'महाराष्ट्र की पाक संस्कृति: कोंकण से दक्कन तक'
    },
    tag: {
      en: 'Gastronomy',
      mr: 'खाद्यसंस्कृती',
      hi: 'व्यंजन धरोहर'
    },
    summary: {
      en: 'A dramatic culinary landscape ranging from fiery Kolhapuri curries and Malvani coconut seafood to sweet Puran Poli and refreshing Solkadhi.',
      mr: 'झणझणीत कोल्हापुरी तांबडा-पांढरा रस्सा, मालवणी सोलकढी, पिठलं-भाकरी आणि सणासुदीची पुरणपोळी व उकडीचे मोदक अशी अवीट चव.',
      hi: 'तीखे कोल्हापुरी तांबड़ा-पांढरा रस्सा से लेकर मालवणी सोलकढ़ी, पिठला-भाकरी और पारंपरिक पूरनपोली व उकडीचे मोदक का अनुपम स्वाद।'
    },
    narrative: {
      en: `Maharashtrian gastronomy mirrors its geographic diversity between the humid Konkan coast and the arid Deccan plateau:
- Konkan & Malvan: Dominated by fresh catch, coconut milk, kokum (Garcinia indica), and spicy Malvani masala. The quintessential digestion drink is "Solkadhi", prepared from coconut milk and pink kokum.
- Desh & Western Maharashtra: Hearty peasant food built around Jowar and Bajra bhakris paired with spicy Pithla (gram flour curry), Thecha (coarsely ground green chilies and garlic), and Shenga Chutney (roasted peanut powder).
- Kolhapur: Renowned for royal meat delicacies—Tambda Rassa (spicy red broth) and Pandhra Rassa (soothing white coconut-bone broth) served alongside succulent mutton sukka.
- Festive Delights: Puran Poli (sweet flatbread stuffed with chana dal, jaggery, and cardamom), Ukdiche Modak (steamed rice-flour dumplings stuffed with fresh coconut and jaggery, served during Ganeshotsav with ghee), and Misal Pav (sprouted bean curry with spicy farsan and lime).`,
      mr: `महाराष्ट्राची खाद्यसंस्कृती भौगोलिक विविधतेप्रमाणे समृद्ध आणि वैविध्यपूर्ण आहे:
- कोकण आणि मालवण: नारळाचे दूध, कोकम आणि मालवणी मसाल्याचा वापर; सुरमई-पापलेट फ्राय आणि जेवणानंतर पचनासाठी गुलाबी सोलकढी.
- देश आणि पश्चिम महाराष्ट्र: ज्वारी-बाजरीची गरमागरम भाकरी, झणझणीत पिठलं, हिरव्या मिरचीचा खर्डा (ठेचा) आणि शेंगदाणा चटणी.
- कोल्हापूर: अस्सल कोल्हापुरी तिखट तांबडा रस्सा आणि नारळाच्या दुधातील पांढरा रस्सा या शाही मेजवानीसाठी प्रसिद्ध.
- सणासुदीची मिष्टान्ने: गणेशोत्सवात साजूक तुपासह दिल्या जाणाऱ्या उकडीचे मोदक, होळीची पुरणपोळी आणि झणझणीत कोल्हापुरी/पुणेरी मिसळ पाव.`,
      hi: `महाराष्ट्र के व्यंजन उसकी भौगोलिक विविधता की भांति ही अत्यंत समृद्ध और स्वादिष्ट हैं:
- कोंकण एवं मालवण: नारियल का दूध, कोकम और मालवणी मसालेदार तटीय व्यंजन; पाचन के लिए स्वादिष्ट गुलाबी सोलकढ़ी।
- पश्चिमी महाराष्ट्र (देश): ज्वार-बाजरे की भाकरी, स्वादिष्ट बेसन का पिठला, तीखा हरी मिर्च का ठेचा और मूंगफली चटनी।
- कोल्हापुर: तीखे तांबड़ा रस्सा और सौम्य पांढरा रस्सा की शाही जुगलबंदी के लिए विख्यात।
- उत्सव के पकवान: गणेशोत्सव में शुद्ध घी के साथ उकडीचे मोदक, होली पर पूरनपोली और चटपटी मिसल पाव।`
    },
    highlights: {
      en: [
        { label: 'Signature Coastal', value: 'Malvani Surmai Fry, Bombil Fry, Solkadhi, and Kombdi Vade' },
        { label: 'Heartland Staples', value: 'Pithla Bhakri with Hirvi Mirchi Thecha and raw onion' },
        { label: 'Royal Broths', value: 'Kolhapuri Tambda Rassa (red spice broth) and Pandhra Rassa (white mild soup)' },
        { label: 'Royal Festive Sweet', value: 'Ukdiche Modak with pure cow ghee and fragrant Puran Poli' }
      ],
      mr: [
        { label: 'कोकणी विशेष', value: 'मालवणी सुरमई फ्राय, बोंबील फ्राय, सोलकढी आणि कोळंबी वडे' },
        { label: 'पारंपरिक भोजन', value: 'गरमागरम पिठलं भाकरी, हिरवी मिरचीचा ठेचा आणि कांदा' },
        { label: 'शाही रस्से', value: 'कोल्हापुरी तांबडा रस्सा आणि नारळाच्या दुधाचा सौम्य पांढरा रस्सा' },
        { label: 'उत्सवी पक्वान्न', value: 'साजूक तुपातील उकडीचे मोदक आणि सुगंधी पुरणपोळी' }
      ],
      hi: [
        { label: 'तटीय विशेषता', value: 'मालवणी सुरमई फ्राई, बोंबिल फ्राई, सोलकढ़ी और कोम्बड़ी वड़े' },
        { label: 'पारंपरिक थाली', value: 'गरमागरम पिठला-भाकरी, हरी मिर्च का ठेचा और कच्चा प्याज' },
        { label: 'शाही रस्सा', value: 'कोल्हापुरी तीखा तांबड़ा रस्सा और नारियल युक्त पांढरा रस्सा' },
        { label: 'उत्सव की मिठास', value: 'शुद्ध घी के साथ उकडीचे मोदक और पारंपरिक पूरनपोली' }
      ]
    }
  }
];

const FOLK_ARTS = [
  {
    Icon: Music,
    title: {
      en: 'Powada Ballads',
      mr: 'पोवाडा गायन',
      hi: 'पोवाड़ा गायन'
    },
    text: {
      en: 'Heroic martial ballads composed by Shahirs celebrating the exploits of Shivaji Maharaj and Tanaji Malusare with rhythmic Dholki and Daf accompaniment.',
      mr: 'शाहीर डफ आणि तुणतुण्याच्या तालावर छत्रपती शिवराय आणि तानाजी मालुसरे यांच्या पराक्रमाचे वीरश्रीपूर्ण वर्णन करणारे पोवाडे गातात.',
      hi: 'डफ और ढोलकी की थाप पर शाहिरों द्वारा छत्रपति शिवाजी महाराज और तानाजी मालुसरे के शौर्य का गुणगान करने वाले वीर रस से भरे गीत।'
    }
  },
  {
    Icon: Sparkles,
    title: {
      en: 'Lavani & Tamasha',
      mr: 'लावणी आणि तमाशा',
      hi: 'लावणी एवं तमाशा'
    },
    text: {
      en: 'Sensuous, energetic folk dance accompanied by the frantic beats of the Dholki and ghungroos, originating as royal court entertainment during the Peshwa era.',
      mr: 'ढोलकीच्या तालावर आणि घुंगरांच्या बोलावर सादर केली जाणारी महाराष्ट्राची अत्यंत लोकप्रिय, चैतन्यमयी लोकनृत्य परंपरा.',
      hi: 'ढोलक की तेज थाप और घुँघरुओं की झंकार पर आधारित महाराष्ट्र का अत्यंत ऊर्जावान और लोकप्रिय पारंपरिक लोकनृत्य।'
    }
  },
  {
    Icon: Award,
    title: {
      en: 'Gondhal & Jagran',
      mr: 'गोंधळ आणि जागरण',
      hi: 'गोंधल एवं जागरण'
    },
    text: {
      en: 'Dramatic nocturnal thanksgiving rituals dedicated to Goddess Bhavani of Tuljapur and Lord Khandoba of Jejuri, performed with the Sambal and Tuntune instruments.',
      mr: 'तुळजापूरची भवानी माता आणि जेजुरीच्या खंडोबारायांच्या प्रीत्यर्थ संबळ व तुणतुण्याच्या साथीने रात्रभर सादर केला जाणारा विधीनाट्य जागर.',
      hi: 'तुलजापुर की माता भवानी और जेजुरी के खंडोबा महाराज की आराधना में संबल और तुनतुना वाद्य के साथ रातभर चलने वाला अनुष्ठानिक भक्ति लोकनाट्य।'
    }
  },
  {
    Icon: Compass,
    title: {
      en: 'Varkari Wari',
      mr: 'वारकरी पायी वारी',
      hi: 'वारकरी पदयात्रा वारी'
    },
    text: {
      en: 'The annual walking pilgrimage to Pandharpur spanning 250 kilometers, where pilgrims dance in rhythmic circles (Ringan) chanting divine abhangas.',
      mr: 'टाळ-मृदंगाच्या गजरात, हरिनामाच्या जयघोषात आणि रिंगणात विठूरायाच्या भेटीसाठी २५० किमी चालणारी विश्वातील सर्वात मोठी पायी वारी.',
      hi: 'ताल-मृदंग और हरिनाम के उद्घोष के साथ २५० किमी पैदल चलकर पंढरपुर पहुँचने वाली विश्वप्रसिद्ध आध्यात्मिक समरसता पदयात्रा।'
    }
  }
];

export default function HeritageCulturePage() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(HERITAGE_SECTIONS[0].id);

  const currentSection = HERITAGE_SECTIONS.find(s => s.id === activeTab) || HERITAGE_SECTIONS[0];

  const getLangText = (item) => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    return item[language] || item.en || '';
  };

  const getHighlights = (section) => {
    const list = section.highlights[language] || section.highlights.en || [];
    return list;
  };

  return (
    <div className={styles.heritagePage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {language === 'mr' ? 'संस्कृती आणि इतिहास' : language === 'hi' ? 'संस्कृति एवं इतिहास' : 'Living Heritage & Culture'}
            </span>
            <h1 className={styles.heroTitle}>
              {language === 'mr' ? 'महाराष्ट्राचा सांस्कृतिक वारसा आणि जिवंत परंपरा' : language === 'hi' ? 'महाराष्ट्र की सांस्कृतिक धरोहर एवं जीवंत परंपराएं' : 'Maharashtra Heritage & Living Traditions'}
            </h1>
            <p className={styles.heroSubtitle}>
              {language === 'mr'
                ? 'सह्याद्रीच्या कुशीतील हिंदवी स्वराज्याचा गौरवशाली इतिहास, संतांचे अभंग, पाषाणातील अद्वितीय मंदिरे आणि लोककलांचे दर्शन घ्या.'
                : language === 'hi'
                ? 'सह्याद्रि में हिंदवी स्वराज्य का गौरवमयी इतिहास, संतों के पावन अभंग, एकाश्म पाषाण मंदिर और समृद्ध लोककलाओं की अनूठी यात्रा।'
                : 'Explore the glorious chronicle of Hindavi Swarajya, the spiritual verses of the Bhakti saints, monolithic basalt rock temples, and centuries of vibrant folk arts.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation Pills */}
      <section className={styles.tabSection}>
        <Container>
          <div className={styles.tabsContainer}>
            {HERITAGE_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`${styles.tabBtn} ${activeTab === section.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(section.id)}
              >
                <span className={styles.tabIcon}>
                  <section.Icon size={18} />
                </span>
                <span className={styles.tabTitle}>{getLangText(section.title).split('&')[0].split('आणि')[0].split('एवं')[0].trim()}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Feature Section */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.featureCard}>
            <div className={styles.featureMedia}>
              <img
                src={currentSection.heroImage}
                alt={getLangText(currentSection.title)}
                className={styles.featureImage}
              />
              <div className={styles.mediaOverlay}>
                <Badge variant={currentSection.badgeVariant}>
                  {getLangText(currentSection.tag)}
                </Badge>
              </div>
            </div>

            <div className={styles.featureDetails}>
              <div className={styles.featureHeader}>
                <h2 className={styles.featureTitle}>{getLangText(currentSection.title)}</h2>
              </div>

              <p className={styles.featureSummary}>{getLangText(currentSection.summary)}</p>

              <div className={styles.narrativeBox}>
                {getLangText(currentSection.narrative).split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className={styles.narrativeParagraph}>{paragraph}</p>
                ))}
              </div>

              <div className={styles.highlightsGrid}>
                {getHighlights(currentSection).map((h, i) => (
                  <div key={i} className={styles.highlightItem}>
                    <span className={styles.highlightLabel}>{h.label}</span>
                    <span className={styles.highlightValue}>{h.value}</span>
                  </div>
                ))}
              </div>

              <div className={styles.featureActions}>
                <Link to="/explore">
                  <Button variant="primary">
                    {language === 'mr' ? 'संबंधित ठिकाणे एक्सप्लोर करा' : language === 'hi' ? 'संबंधित स्थल देखें' : 'Explore Related Sites'}
                  </Button>
                </Link>
                <Link to="/planner">
                  <Button variant="outline">
                    {language === 'mr' ? 'वारसा यात्रा नियोजन' : language === 'hi' ? 'धरोहर यात्रा की योजना बनाएं' : 'Plan Heritage Circuit'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cultural Pillars Grid */}
      <section className={styles.pillarsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>
              {language === 'mr' ? 'लोकपरंपरा' : language === 'hi' ? 'लोकपरंपरा' : 'Living Expressions'}
            </span>
            <h2 className={styles.title}>
              {language === 'mr' ? 'महाराष्ट्राच्या लोककला आणि परंपरा' : language === 'hi' ? 'महाराष्ट्र की लोककलाएँ एवं परंपराएँ' : 'Folk Arts & Traditions of Maharashtra'}
            </h2>
            <p className={styles.description}>
              {language === 'mr'
                ? 'महाराष्ट्राच्या प्रत्येक भागात पारंपरिक संगीत, नाट्य आणि लोककलांचे अनोखे चैतन्य अनुभवायला मिळते.'
                : language === 'hi'
                ? 'महाराष्ट्र के प्रत्येक अंचल में लोकसंगीत, नाट्य और पारंपरिक नृत्यों की अनूठी जीवंतता प्रवाहित होती है।'
                : 'Every region of Maharashtra pulses with its own rhythms, theatrical performances, and musical storytelling traditions.'}
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {FOLK_ARTS.map((art, idx) => (
              <div key={idx} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <art.Icon size={26} />
                </div>
                <h3 className={styles.pillarTitle}>{getLangText(art.title)}</h3>
                <p className={styles.pillarText}>{getLangText(art.text)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
