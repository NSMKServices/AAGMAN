import React from 'react';
import Container from '../components/layout/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  Castle,
  Landmark,
  Trees,
  Compass,
  Shield,
  ArrowRight
} from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className={styles.aboutPage}>
      {/* Hero Banner */}
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>
              {language === 'mr' ? 'महाराष्ट्र वारसा आणि पर्यटन पुढाकार' : language === 'hi' ? 'महाराष्ट्र धरोहर एवं पर्यटन पहल' : 'MAHARASHTRA HERITAGE & TOURISM INITIATIVE'}
            </span>
            <h1 className={styles.heroTitle}>{t('aboutTitle', 'About AAGMAN')}</h1>
            <p className={styles.heroSubtitle}>
              {t('aboutSub', 'A comprehensive discovery and travel-planning portal dedicated to celebrating the timeless majesty, royal forts, sacred pilgrimages, and living traditions of Maharashtra.')}
            </p>
          </div>
        </Container>
      </section>

      {/* Core Mission & Story */}
      <section className={styles.missionSection}>
        <Container>
          <div className={styles.gridTwoCol}>
            <div className={styles.textCol}>
              <Badge variant="gold">{t('ourMission', 'OUR MISSION & VISION')}</Badge>
              <h2 className={styles.sectionHeading}>{t('missionHeading', "Inspiring Modern Travelers to Explore Maharashtra's Soul")}</h2>
              <p className={styles.paragraph}>
                <strong>AAGMAN</strong> ("{language === 'mr' ? 'आगमन — भव्य स्वागत' : language === 'hi' ? 'आगमन — भव्य स्वागत' : 'AAGMAN — The Grand Arrival'}") {language === 'mr'
                  ? 'प्राचीन ऐतिहासिक वारसा आणि आधुनिक डिजिटल तंत्रज्ञान यांना जोडण्यासाठी स्थापन केले गेले आहे. सह्याद्रीच्या उत्तुंग कड्यांपासून वेरूळच्या कैलास मंदिरापर्यंत आणि निळ्याशार कोकण किनाऱ्यापासून विदर्भाच्या जंगलांपर्यंत, महाराष्ट्र ही जगातील सर्वात समृद्ध सांस्कृतिक भूमी आहे.'
                  : language === 'hi'
                  ? 'प्राचीन ऐतिहासिक धरोहर और आधुनिक डिजिटल तकनीक को जोड़ने के लिए स्थापित किया गया है। सह्याद्रि के ऊंचे किलों से लेकर एलोरा के कैलाश मंदिर और शांत कोंकण तट तक, महाराष्ट्र विश्व की सबसे समृद्ध सांस्कृतिक भूमियों में से एक है।'
                  : 'was established to bridge ancient heritage with contemporary digital exploration. From the soaring mist-shrouded bastions of the Western Ghats (Sahyadris) to the monolithic basalt excavations of Ellora and the tranquil coconut groves of the Konkan coast, Maharashtra represents one of the world\'s richest civilizational landscapes.'}
              </p>
              <p className={styles.paragraph}>
                {language === 'mr'
                  ? 'आम्ही विश्वास ठेवतो की प्रवास ज्ञानवर्धक, पर्यावरणपूरक आणि सुलभ असावा. आगमन दुर्गभ्रमंतीकार, भाविक आणि पर्यटकांना अचूक भौगोलिक माहिती, स्थानिक खाद्यसंस्कृती आणि दिवसनिहाय नियोजन प्रदान करते.'
                  : language === 'hi'
                  ? 'हमारा मानना है कि यात्रा समृद्ध, जिम्मेदार और सुलभ होनी चाहिए। आगमन यात्रियों, श्रद्धालुओं और परिवारों को सटीक भौगोलिक निर्देश, स्थानीय भोजन और दैनिक यात्रा योजनाएं प्रदान करता है।'
                  : 'We believe travel should be enriching, responsible, and accessible. AAGMAN empowers explorers, pilgrims, and families with curated historical narratives, accurate geographical coordinates, authentic local culinary recommendations, and practical day-by-day travel itineraries.'}
              </p>
            </div>

            <div className={styles.statCardsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>350+</span>
                <strong className={styles.statLabel}>
                  {language === 'mr' ? 'ऐतिहासिक गडकोट' : language === 'hi' ? 'ऐतिहासिक दुर्ग' : 'Historic Fortresses'}
                </strong>
                <p className={styles.statSub}>
                  {language === 'mr' ? 'छत्रपती शिवाजी महाराजांच्या स्वराज्याचे बालेकिल्ले' : language === 'hi' ? 'छत्रपति शिवाजी महाराज के स्वराज्य के किले' : "Citadels of Chhatrapati Shivaji Maharaj's Swarajya"}
                </p>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statNumber}>720 km</span>
                <strong className={styles.statLabel}>
                  {language === 'mr' ? 'विस्तीर्ण कोकण किनारा' : language === 'hi' ? 'कोंकण समुद्र तट' : 'Pristine Konkan Coast'}
                </strong>
                <p className={styles.statSub}>
                  {language === 'mr' ? 'सोनेरी वाळू, जलदुर्ग आणि प्रवाळ सागरी जीवन' : language === 'hi' ? 'सुनहरी रेत, जलदुर्ग एवं कोरल समुद्री जीवन' : 'Golden sands, sea forts & coral marine life'}
                </p>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statNumber}>5</span>
                <strong className={styles.statLabel}>
                  {language === 'mr' ? 'युनेस्को जागतिक वारसा स्थळे' : language === 'hi' ? 'यूनेस्को विश्व धरोहर स्थल' : 'UNESCO World Heritage Sites'}
                </strong>
                <p className={styles.statSub}>
                  {language === 'mr' ? 'अजिंठा, वेरूळ, घारापुरी, सीएसएमटी व सह्याद्री' : language === 'hi' ? 'अजंता, एलोरा, एलिफेंटा, सीएसएमटी एवं पश्चिमी घाट' : 'Ajanta, Ellora, Elephanta, CSMT & Western Ghats'}
                </p>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statNumber}>36</span>
                <strong className={styles.statLabel}>
                  {language === 'mr' ? 'एकत्रित ३६ जिल्हे' : language === 'hi' ? 'एकजुट ३६ जिले' : 'Districts Unified'}
                </strong>
                <p className={styles.statSub}>
                  {language === 'mr' ? 'कोकण, पश्चिम महाराष्ट्र, मराठवाडा, विदर्भ व खान्देश' : language === 'hi' ? 'कोंकण, पश्चिमी महाराष्ट्र, मराठवाड़ा, विदर्भ एवं खानदेश' : 'Konkan, Western Maharashtra, Marathwada, Vidarbha & Khandesh'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Guiding Principles */}
      <section className={styles.pillarsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.subHeading}>
              {language === 'mr' ? 'मूल्ये आणि तत्वे' : language === 'hi' ? 'मार्गदर्शक सिद्धांत' : 'ETHICAL TOURISM'}
            </span>
            <h2 className={styles.mainHeading}>
              {language === 'mr' ? 'आमचे प्रमुख वारसा स्तंभ' : language === 'hi' ? 'हमारे मुख्य धरोहर स्तंभ' : 'Our Core Heritage Pillars'}
            </h2>
            <p className={styles.leadText}>
              {language === 'mr'
                ? 'आगमन मधील प्रत्येक पर्यटन स्थळ आणि प्रवास मार्ग सांस्कृतिक सत्यतेच्या निकषांवर आधारित आहे.'
                : language === 'hi'
                ? 'आगमन पर प्रत्येक स्थल और यात्रा मार्ग सांस्कृतिक गरिमा के सिद्धांतों पर आधारित है।'
                : 'Every destination and travel route within AAGMAN is curated according to strict principles of cultural integrity.'}
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <Castle size={24} color="var(--color-secondary)" />
              </div>
              <h3 className={styles.pillarTitle}>
                {language === 'mr' ? 'गडकोट संवर्धन आणि स्वच्छता' : language === 'hi' ? 'किला संरक्षण एवं स्वच्छता' : 'Fort Conservation & Clean Sahyadris'}
              </h3>
              <p className={styles.pillarDesc}>
                {language === 'mr'
                  ? 'गडांवर प्लास्टिकमुक्त भ्रमंती, शून्य कचरा आणि स्वराज्याची पायाभरणी करणाऱ्या वीरांच्या स्मृतीचा सन्मान.'
                  : language === 'hi'
                  ? 'किलों पर प्लास्टिक-मुक्त ट्रेकिंग, शून्य कचरा और स्वराज्य के वीर योद्धाओं की स्मृति का सम्मान।'
                  : 'Promoting zero-trace trekking, banning plastic litter on mountain ramparts, and honoring the sacred memory of Maratha warriors who built sovereign freedom across the Deccan.'}
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <Landmark size={24} color="var(--color-accent)" />
              </div>
              <h3 className={styles.pillarTitle}>
                {language === 'mr' ? 'पवित्र तीर्थक्षेत्र शिष्टाचार' : language === 'hi' ? 'पवित्र तीर्थस्थल शिष्टाचार' : 'Sacred Pilgrimage Etiquette'}
              </h3>
              <p className={styles.pillarDesc}>
                {language === 'mr'
                  ? 'ज्योतिर्लिंग, अष्टविनायक आणि संतांच्या समाधी मंदिरांमध्ये भक्तिभाव, योग्य वस्त्रसंस्कृती आणि शांतता राखण्याचे मार्गदर्शन.'
                  : language === 'hi'
                  ? 'ज्योतिर्लिंग, अष्टविनायक और संत समाधि स्थलों पर श्रद्धा, पारंपरिक वेशभूषा और शांति बनाए रखने का मार्गदर्शन।'
                  : 'Providing respectful guidance for visitors to Jyotirlingas, Ashtavinayak temples, and Sant samadhis, upholding devotional sanctity, proper dress codes, and peaceful darshan.'}
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <Trees size={24} color="var(--color-secondary)" />
              </div>
              <h3 className={styles.pillarTitle}>
                {language === 'mr' ? 'ग्रामीण आणि कृषी पर्यटनाला पाठबळ' : language === 'hi' ? 'ग्रामीण एवं कृषि पर्यटन को बढ़ावा' : 'Empowering Rural & Agri-Tourism'}
              </h3>
              <p className={styles.pillarDesc}>
                {language === 'mr'
                  ? 'ग्रामीण भागातील चुलीवरचे जेवण, वारली चित्रकला, पैठणी विणकर आणि गावातील होमस्टेला पर्यटनाचा थेट लाभ.'
                  : language === 'hi'
                  ? 'ग्रामीण होमस्टे, पारंपरिक भोजन, वारली चित्रकार और पैठणी बुनकरों को पर्यटन से सीधा प्रोत्साहन।'
                  : 'Directing tourism value to local village homestays, traditional chulivarchi food artisans, Warli painters, and Paithani handloom weavers across rural Maharashtra.'}
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconBox}>
                <Compass size={24} color="var(--color-highlight)" />
              </div>
              <h3 className={styles.pillarTitle}>
                {language === 'mr' ? 'अचूक भौगोलिक माहिती' : language === 'hi' ? 'सटीक भौगोलिक जानकारी' : 'Authentic Geographic Accuracy'}
              </h3>
              <p className={styles.pillarDesc}>
                {language === 'mr'
                  ? 'सत्यापित रस्ते, अधिकृत बस/रेल्वे मार्ग आणि खरी माहिती, कोणत्याही कृत्रिम किंवा चुकीच्या माहितीशिवाय.'
                  : language === 'hi'
                  ? 'सत्यापित मार्ग, सार्वजनिक परिवहन और सटीक निर्देशांक, बिना किसी भ्रामक जानकारी के।'
                  : 'Providing verified road circuits, public transit connectivity details, and accurate coordinates without AI hallucinations or fabricated tourism ratings.'}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Cultural Heritage Banner */}
      <section className={styles.mottoSection}>
        <Container>
          <div className={styles.mottoBanner}>
            <div className={styles.mottoContent}>
              <Shield size={36} color="var(--color-accent)" />
              <h3 className={styles.mottoHeading}>
                "प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता शाहसूनोः शिवस्यैषा मुद्रा भद्राय राजते"
              </h3>
              <p className={styles.mottoTranslation}>
                "{language === 'mr'
                  ? 'प्रतिपदेच्या चंद्रकलेप्रमाणे प्रतिदिनी वृद्धिंगत होणारी, जगाला वंद्य असणारी शहाजीपुत्र शिवाजीची ही राजमुद्रा लोककल्याणासाठी सदैव तळपत राहो.'
                  : language === 'hi'
                  ? 'प्रतिपदा के चंद्रमा की भांति प्रतिदिन बढ़ने वाली और विश्व द्वारा पूजित शाहजी के पुत्र शिवाजी की यह राजमुद्रा लोककल्याण के लिए सुशोभित है।'
                  : 'Ever-increasing like the crescent moon, and adored by the universe, this royal seal of Shivaji, the son of Shahaji, shines forth for the welfare of all.'}"
              </p>
              <div className={styles.mottoActions}>
                <Button to="/explore" variant="accent">
                  {t('exploreBtn', 'Explore All Destinations')}
                </Button>
                <Button to="/contact" variant="outline">
                  {t('contact', 'Connect With Liaison')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
