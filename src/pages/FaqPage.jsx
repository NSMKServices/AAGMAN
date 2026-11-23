import React, { useState, useMemo } from 'react';
import Container from '../components/layout/Container';
import SearchInput from '../components/common/SearchInput';
import Button from '../components/common/Button';
import {
  Castle,
  Landmark,
  Building,
  Car,
  AlertCircle,
  Trees
} from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';
import styles from './FaqPage.module.css';

const FAQ_DATA = [
  {
    category: 'Sahyadri Trekking & Forts',
    categoryMr: 'सह्याद्री गडकोट आणि दुर्गभ्रमंती',
    categoryHi: 'सह्याद्रि ट्रेकिंग एवं दुर्ग',
    Icon: Castle,
    items: [
      {
        q: 'Do I need prior permits to trek forts in Maharashtra?',
        qMr: 'महाराष्ट्रातील किल्ल्यांवर ट्रेकिंग करण्यासाठी पूर्वपरवानगी आवश्यक आहे का?',
        qHi: 'क्या महाराष्ट्र के किलों पर ट्रेकिंग के लिए पूर्व अनुमति की आवश्यकता है?',
        a: 'Most historic forts (like Sinhagad, Rajgad, Torna, Lohagad) do not require advance permits for daytime trekking. However, sanctuaries such as Kalsubai Harishchandragad Wildlife Sanctuary and Vasota Fort (Koyna Wildlife Sanctuary) require an entry pass from the Maharashtra Forest Department at the base check-post. A nominal eco-development fee (₹30–₹50) is charged.',
        aMr: 'सिंहगड, राजगड, तोरणा, लोहगड यांसारख्या बहुतांश किल्ल्यांवर दिवसा भ्रमंतीसाठी पूर्वपरवानगीची गरज नसते. तथापि, कळसूबाई-हरिश्चंद्रगड अभयारण्य आणि वासोटा किल्ला (कोयना अभयारण्य) येथे वन विभागाची तपासणी चौकीवर प्रवेश पावती घ्यावी लागते.',
        aHi: 'सिंहगढ़, राजगढ़, तोरणा जैसे अधिकांश किलों पर दिन में ट्रेकिंग के लिए अग्रिम अनुमति की आवश्यकता नहीं होती। हालांकि कलसुबाई और वासोता जैसे अभयारण्य क्षेत्रों में वन विभाग से नाममात्र शुल्क की प्रवेश पर्ची लेनी होती है।'
      },
      {
        q: 'Is night camping allowed on forts like Rajgad or Harishchandragad?',
        qMr: 'राजगड किंवा हरिश्चंद्रगड यांसारख्या किल्ल्यांवर रात्रीचा मुक्काम करता येतो का?',
        qHi: 'क्या राजगढ़ या हरिश्चंद्रगढ़ जैसे किलों पर रात्रि विश्राम की अनुमति है?',
        a: 'Night camping rules vary by district and season. On Rajgad, Padmavati Temple offers traditional shelter where trekkers often stay overnight respectfully. On Harishchandragad, the ancient Buddhist caves provide natural rock shelters. However, during heavy monsoon storms, night camping on open cliff-edges like Konkan Kada is strictly prohibited for safety.',
        aMr: 'राजगडावरील पद्मावती देवीचे मंदिर आणि हरिश्चंद्रगडावरील प्राचीन गुहांमध्ये ट्रेकर्सना रात्रीचा मुक्काम करता येतो. तथापि, अतिवृष्टी आणि पावसाळ्यात कड्यांवर उघड्यावर तंबू ठोकण्यास सुरक्षेच्या कारणास्तव बंदी असते.',
        aHi: 'राजगढ़ पर पद्मावती मंदिर और हरिश्चंद्रगढ़ की गुफाओं में यात्री पारंपरिक रूप से विश्राम कर सकते हैं। हालांकि भारी मानसून में खुले कगारों पर कैंपिंग प्रतिबंधित रहती है।'
      },
      {
        q: 'Where can I find drinking water while trekking in the Sahyadris?',
        qMr: 'सह्याद्रीत ट्रेकिंग करताना पिण्याचे पाणी कुठे मिळते?',
        qHi: 'सह्याद्रि में ट्रेकिंग के दौरान पीने का पानी कहां मिलता है?',
        a: 'Most Maratha forts feature ancient rock-cut water cisterns (called "Taake") excavated into the basalt stone. Many (such as the Dev Taake on Sinhagad and Padmavati cisterns on Rajgad) hold potable, natural spring water year-round. It is recommended to use water purification tablets or carry at least 2–3 liters of water per person during summer treks.',
        aMr: 'शिवकालीन किल्ल्यांवर कातळात खोदलेली पाण्याची टाकी (टाके) असतात. सिंहगडावरील देवटाके आणि राजगडावरील पद्मावती तलावातील पाणी वर्षभर पिण्यायोग्य असते. तरीही स्वतःसोबत २-३ लिटर पाण्याची बाटली बाळगणे उत्तम.',
        aHi: 'मराठा किलों पर चट्टानों में तराशे गए जलकुंड (टाके) होते हैं, जिनका जल अधिकांशतः प्राकृतिक एवं स्वच्छ होता है। फिर भी गर्मियों में पर्याप्त पेयजल साथ रखना चाहिए।'
      }
    ]
  },
  {
    category: 'Sacred Temples & Darshan Etiquette',
    categoryMr: 'पवित्र मंदिरे आणि दर्शन शिष्टाचार',
    categoryHi: 'पवित्र मंदिर एवं दर्शन शिष्टाचार',
    Icon: Landmark,
    items: [
      {
        q: 'What is the dress code for visiting major Maharashtra temples?',
        qMr: 'महाराष्ट्रातील प्रमुख मंदिरांमध्ये दर्शनासाठी कपड्यांचे काय नियम आहेत?',
        qHi: 'महाराष्ट्र के प्रमुख मंदिरों में दर्शन के लिए क्या ड्रेस कोड है?',
        a: 'Traditional modest attire is required across all major shrines (Trimbakeshwar, Shirdi, Pandharpur, Bhimashankar, Tuljapur). Men are recommended to wear dhotis/kurtas or trousers with shirts; women are expected to wear saris, salwar suits, or modest dresses. Shorts, sleeveless clothing, and beachwear are not permitted in temple inner sanctums (Garbhagriha).',
        aMr: 'त्र्यंबकेश्वर, शिर्डी, पंढरपूर, भीमाशंकर आणि तुळजापूर यांसारख्या प्रमुख मंदिरांमध्ये पारंपारिक आणि सुसंस्कृत पोषाख अनिवार्य आहे. गर्भगृहात जाताना पुरुषांसाठी सोवळे/धोतर किंवा कुर्ता-पायजमा आणि महिलांसाठी साडी किंवा सलवार-कमीज योग्य मानली जाते.',
        aHi: 'त्र्यंबकेश्वर, शिरडी, पंढरपुर, भीमाशंकर आदि मंदिरों में पारंपरिक एवं शालीन पोशाक अनिवार्य है। गर्भगृह में धोती/कुर्ता अथवा साड़ी/सलवार सूट ही मान्य है।'
      },
      {
        q: 'How can I book online VIP Darshan for Shirdi and Jyotirlinga temples?',
        qMr: 'शिर्डी आणि ज्योतिर्लिंग मंदिरांसाठी ऑनलाईन दर्शन पास कसे मिळवावेत?',
        qHi: 'शिरडी एवं ज्योतिर्लिंग मंदिरों के लिए ऑनलाइन दर्शन पास कैसे बुक करें?',
        a: 'Online darshan passes and special aarti tickets can be booked through official trust portals: Shri Saibaba Sansthan Trust (online.sai.org.in), Shri Trimbakeshwar Sansthan, and Shri Vitthal Birdev Trust Pandharpur. Booking 2 to 4 weeks in advance is advised for weekend and festive dates.',
        aMr: 'शिर्डी साईबाबा संस्थान (online.sai.org.in), त्र्यंबकेश्वर देवस्थान आणि पंढरपूर विठ्ठल रुक्मिणी मंदिराच्या अधिकृत संकेतस्थळांवरून २ ते ४ आठवडे आधी ऑनलाईन दर्शन पास आरक्षित करता येतात.',
        aHi: 'श्री साईबाबा संस्थान (online.sai.org.in), त्र्यंबकेश्वर एवं पंढरपुर मंदिर की आधिकारिक वेबसाइटों से दर्शन पास अग्रिम रूप से बुक किए जा सकते हैं।'
      }
    ]
  },
  {
    category: 'Transportation & Mountain Ghat Driving',
    categoryMr: 'वाहतूक आणि सह्याद्री घाट रस्ते मार्गदर्शन',
    categoryHi: 'परिवहन एवं घाट मार्ग दिशानिर्देश',
    Icon: Car,
    items: [
      {
        q: 'What are the essential precautions for driving on Maharashtra ghat roads?',
        qMr: 'महाराष्ट्रातील घाट रस्त्यांवर वाहन चालवताना कोणती काळजी घ्यावी?',
        qHi: 'महाराष्ट्र के घाट मार्गों पर वाहन चलाते समय क्या सावधानियां बरतें?',
        a: 'Sahyadri ghats (e.g., Amba Ghat, Varandha Ghat, Malshej Ghat, Tamhini Ghat) feature sharp hairpin curves and dense monsoon fog. Always drive in low gear when descending to avoid brake overheating, keep headlights on during foggy conditions, watch for rockfall warning signs during heavy rains, and avoid overtaking on blind turns.',
        aMr: 'वरंधा, माळशेज, ताम्हाणी आणि आंबा घाटात तीव्र वळणे आणि दाट धुके असते. घाटातून उतरताना नेहमी छोट्या गिअरचा वापर करावा, ओव्हरटेक करणे टाळावे आणि पावसात दरड कोसळण्याच्या इशाऱ्यांकडे लक्ष द्यावे.',
        aHi: 'माळशेज, ताम्हिणी एवं वरंधा घाटों पर तीव्र मोड़ होते हैं। उतरते समय निचले गियर में गाड़ी चलाएं, कोहरे में हेडलाइट जलाकर रखें और अंध मोड़ों पर ओवरटेक न करें।'
      },
      {
        q: 'How can I travel by Ro-Ro car ferry from Mumbai to Alibaug / Mandwa?',
        qMr: 'मुंबई ते अलिबाग रो-रो कार फेरीने प्रवास कसा करावा?',
        qHi: 'मुंबई से अलीबाग रो-रो कार फेरी से यात्रा कैसे करें?',
        a: 'The M2M Ferries Ro-Ro service operates between Bhaucha Dhakka (Ferry Wharf, Mumbai) and Mandwa Jetty (Alibaug). It accommodates passengers and vehicles (cars, motorcycles, bicycles) in an air-conditioned 60-minute voyage across Mumbai harbor, bypassing 3+ hours of highway traffic.',
        aMr: 'भाऊचा धक्का (मुंबई) ते मांडवा (अलिबाग) दरम्यान चालणारी एम२एम रो-रो फेरी कार आणि प्रवाशांना अवघ्या ६० मिनिटांत पोहोचवते, ज्यामुळे रस्त्यावरील ३ तासांचा प्रवास वाचतो.',
        aHi: 'भाऊचा धक्का (मुंबई) से मांडवा (अलीबाग) के बीच रो-रो नौका सेवा उपलब्ध है जो वाहनों एवं यात्रियों को 60 मिनट में पहुंचाती है।'
      }
    ]
  }
];

export default function FaqPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getCategoryTitle = (cat) => {
    if (language === 'mr') return cat.categoryMr || cat.category;
    if (language === 'hi') return cat.categoryHi || cat.category;
    return cat.category;
  };

  const getItemQ = (item) => {
    if (language === 'mr') return item.qMr || item.q;
    if (language === 'hi') return item.qHi || item.q;
    return item.q;
  };

  const getItemA = (item) => {
    if (language === 'mr') return item.aMr || item.a;
    if (language === 'hi') return item.aHi || item.a;
    return item.a;
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_DATA;

    const query = searchQuery.toLowerCase();
    return FAQ_DATA.map(cat => ({
      ...cat,
      items: cat.items.filter(item => {
        const q = getItemQ(item).toLowerCase();
        const a = getItemA(item).toLowerCase();
        return q.includes(query) || a.includes(query);
      })
    })).filter(cat => cat.items.length > 0);
  }, [searchQuery, language]);

  return (
    <div className={styles.faqPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {language === 'mr' ? 'मार्गदर्शन आणि वारंवार विचारले जाणारे प्रश्न' : language === 'hi' ? 'दिशानिर्देश एवं अक्सर पूछे जाने वाले प्रश्न' : 'TRAVEL GUIDELINES & FAQS'}
            </span>
            <h1 className={styles.heroTitle}>{t('faqTitle', 'Maharashtra Travel Guidance & FAQ')}</h1>
            <p className={styles.heroSubtitle}>
              {t('faqSub', 'Official advice on fort trekking permits, sacred temple dress codes, MTDC resort reservations, and driving through Sahyadri mountain ghats.')}
            </p>
          </div>
        </Container>
      </section>

      {/* Search Bar */}
      <section className={styles.searchSection}>
        <Container>
          <div className={styles.searchBox}>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={language === 'mr' ? 'मार्गदर्शक सूचना शोधा (उदा. परवाने, ड्रेस कोड, पाणी, घाट)...' : language === 'hi' ? 'दिशानिर्देश खोजें (उदा. अनुमति, ड्रेस कोड, कैंपिंग)...' : 'Search travel guidelines (e.g., permits, dress code, camping, MTDC)...'}
            />
          </div>
        </Container>
      </section>

      {/* Main Accordion List */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.faqLayout}>
            <div className={styles.accordionContainer}>
              {filteredCategories.length === 0 ? (
                <div className={styles.noResults}>
                  <p>
                    {language === 'mr'
                      ? 'आपल्या शोधाशी जुळणारा कोणताही प्रश्न सापडला नाही.'
                      : language === 'hi'
                      ? 'आपकी खोज से मेल खाता कोई प्रश्न नहीं मिला।'
                      : 'No questions matched your search query. Try searching for "trek", "temple", or "ferry".'}
                  </p>
                </div>
              ) : (
                filteredCategories.map((cat, catIdx) => (
                  <div key={cat.category} className={styles.categorySection}>
                    <div className={styles.categoryHeader}>
                      <span className={styles.categoryIcon}>
                        <cat.Icon size={20} />
                      </span>
                      <h2 className={styles.categoryTitle}>{getCategoryTitle(cat)}</h2>
                    </div>

                    <div className={styles.questionsList}>
                      {cat.items.map((item, itemIdx) => {
                        const itemKey = `${catIdx}-${itemIdx}`;
                        const isOpen = !!openItems[itemKey];

                        return (
                          <div key={itemIdx} className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
                            <button
                              type="button"
                              className={styles.questionBtn}
                              onClick={() => toggleItem(itemKey)}
                              aria-expanded={isOpen}
                            >
                              <span className={styles.questionText}>{getItemQ(item)}</span>
                              <span className={styles.chevronIcon}>{isOpen ? '−' : '+'}</span>
                            </button>

                            {isOpen && (
                              <div className={styles.answerBody}>
                                <p>{getItemA(item)}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
