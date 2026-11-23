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
import styles from './HeritageCulturePage.module.css';

const HERITAGE_SECTIONS = [
  {
    id: 'maratha-swarajya',
    title: 'The Maratha Swarajya & Shivaji Maharaj',
    Icon: Castle,
    tag: 'Imperial History',
    badgeVariant: 'forts',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    summary: 'The birth of "Hindavi Swarajya" in the Sahyadri mountains—where visionary military strategy, naval fortification, and enlightened governance shaped modern India.',
    narrative: `In the 17th century, Chhatrapati Shivaji Maharaj established a sovereign people\'s empire known as "Hindavi Swarajya" in Western Maharashtra. Recognizing the impregnable topography of the Western Ghats (Sahyadris), he fortified hilltops and coastal islands, creating over 300 defensive strongholds.

His military doctrine—Ganimi Kava (guerilla warfare)—revolutionized warfare by utilizing the steep cliffs, dense forests, and narrow mountain passes of Maharashtra. Shivaji Maharaj also established the pioneering Maratha Navy under Kanhoji Angre, building sea fortresses like Sindhudurg, Murud-Janjira, and Suvarnadurg to protect the Konkan coastline from European colonial fleets.`,
    highlights: [
      { label: 'Key Capitals', value: 'Rajgad (early capital) and Raigad (site of royal coronation in 1674)' },
      { label: 'Naval Bastions', value: 'Sindhudurg, Vijaydurg, Suvarnadurg, Padmadurg' },
      { label: 'Military Innovation', value: 'Ganimi Kava (lightning mountain warfare) & specialized Sahyadri hill fortification' },
      { label: 'Administrative Ethos', value: 'Religious tolerance, protection of women, agrarian reform, and Marathi court dictionary' }
    ]
  },
  {
    id: 'bhakti-saints',
    title: 'The Bhakti Movement & Sant Tradition',
    Icon: Landmark,
    tag: 'Spiritual Legacy',
    badgeVariant: 'gold',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    summary: 'The democratic spiritual revolution of Maharashtra—where saint-poets composed devotional poetry in the people\'s language, uniting communities across caste lines.',
    narrative: `Between the 13th and 17th centuries, Maharashtra witnessed the profound Varkari Bhakti revolution centered on Lord Vitthala of Pandharpur. Pioneer saints rejected rigid orthodoxy and composed sublime abhangas and ovies in Prakrit Marathi, fostering an egalitarian spiritual culture that continues to define the Maharashtrian soul.

Every year during the month of Ashadh (June-July), more than 1.5 million pilgrims (Varkaris) undertake the 21-day "Pandharpur Wari" walking on foot alongside the padukas (sacred footwear) of Sant Dnyaneshwar and Sant Tukaram, chanting "Gyanba Tukaram" in one of the world\'s oldest continuous mass pilgrimages.`,
    highlights: [
      { label: 'Sant Dnyaneshwar (1275–1296)', value: 'Authored Dnyaneshwari (Marathi commentary on Bhagavad Gita) and Amrutanubhav at age 16' },
      { label: 'Sant Tukaram (1608–1650)', value: 'The poet-saint of Dehu whose Gatha (thousands of abhangas) preached compassion and social equality' },
      { label: 'Sant Eknath (1533–1599)', value: 'Pioneered "Bharud" folk dramas with spiritual allegories; revitalized Dnyaneshwari text at Paithan' },
      { label: 'Samarth Ramdas (1608–1681)', value: 'Spiritual mentor of Shivaji Maharaj; authored Dasbodh integrating spirituality with civic duty' }
    ]
  },
  {
    id: 'art-architecture',
    title: 'Hemadpanthi, Peshwa Wadas & Warli Art',
    Icon: Building,
    tag: 'Architecture & Craft',
    badgeVariant: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f4439066?auto=format&fit=crop&w=1200&q=80',
    summary: 'From mortarless basalt stone temples and sprawling aristocratic Peshwa mansions to tribal ritual painting and royal silk weaving.',
    narrative: `Maharashtra\'s architectural tradition spans multiple golden epochs:
1. Rock-cut Cave Architecture: UNESCO World Heritage wonders at Ajanta, Ellora (Kailash Temple carved from a single basalt rock), and Elephanta Caves.
2. Hemadpanthi Style: Medieval stone temples (such as Ambreshwar, Gondeshwar, and Bhimashankar) constructed using black basalt stone blocks interlocked with tenon-and-mortise joints without using mortar or cement.
3. Peshwa Wada Architecture: Grand timber-frame mansions (e.g., Shaniwar Wada, Vishrambaug Wada, Nana Wada) characterized by courtyards (Chowk), wooden pillar carvings, secret escape tunnels, and rainwater harvesting cisterns.
4. Warli Tribal Art: 2,500-year-old geometric paintings by the Warli tribe using rice flour paste on mud walls, depicting human community dances (Tarpa) and communion with nature.
5. Paithani Silk Weaving: Royal handloom silks woven in Paithan and Yeola with pure gold zari borders and intricate peacock (Mor) motifs, patronized by Maratha and Peshwa royalty.`,
    highlights: [
      { label: 'Rock-Cut Marvel', value: 'Ellora Cave 16 (Kailasa) — largest monolithic rock excavation in the world, carved top-to-bottom' },
      { label: 'Wada Architecture', value: 'Multi-courtyard courtyards, teakwood pillars, suru columns, and ornate wooden balconies' },
      { label: 'Tribal Craft', value: 'Warli paintings using white pigment made from rice paste, water, and gum on cow dung and clay walls' },
      { label: 'Textile Legacy', value: 'Paithani saris with kaleidoscopic pallus and Narali (coconut) zari borders' }
    ]
  },
  {
    id: 'culinary-traditions',
    title: 'Flavors of Maharashtra: Coastal to Plateau',
    Icon: Utensils,
    tag: 'Gastronomy',
    badgeVariant: 'beaches',
    heroImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    summary: 'A dramatic culinary landscape ranging from fiery Kolhapuri curries and Malvani coconut seafood to sweet Puran Poli and refreshing Solkadhi.',
    narrative: `Maharashtrian gastronomy mirrors its geographic diversity between the humid Konkan coast and the arid Deccan plateau:
- Konkan & Malvan: Dominated by fresh catch, coconut milk, kokum (Garcinia indica), and spicy Malvani masala. The quintessential digestion drink is "Solkadhi", prepared from coconut milk and pink kokum.
- Desh & Western Maharashtra: Hearty peasant food built around Jowar and Bajra bhakris paired with spicy Pithla (gram flour curry), Thecha (coarsely ground green chilies and garlic), and Shenga Chutney (roasted peanut powder).
- Kolhapur: Renowned for royal meat delicacies—Tambda Rassa (spicy red broth) and Pandhra Rassa (soothing white coconut-bone broth) served alongside succulent mutton sukka.
- Festive Delights: Puran Poli (sweet flatbread stuffed with chana dal, jaggery, and cardamom), Ukdiche Modak (steamed rice-flour dumplings stuffed with fresh coconut and jaggery, served during Ganeshotsav with ghee), and Misal Pav (sprouted bean curry with spicy farsan and lime).`,
    highlights: [
      { label: 'Signature Coastal', value: 'Malvani Surmai Fry, Bombil Fry, Solkadhi, and Kombdi Vade' },
      { label: 'Heartland Staples', value: 'Pithla Bhakri with Hirvi Mirchi Thecha and raw onion' },
      { label: 'Royal Broths', value: 'Kolhapuri Tambda Rassa (red spice broth) and Pandhra Rassa (white mild soup)' },
      { label: 'Royal Festive Sweet', value: 'Ukdiche Modak with pure cow ghee and fragrant Puran Poli' }
    ]
  }
];

export default function HeritageCulturePage() {
  const [activeTab, setActiveTab] = useState(HERITAGE_SECTIONS[0].id);

  const currentSection = HERITAGE_SECTIONS.find(s => s.id === activeTab) || HERITAGE_SECTIONS[0];

  return (
    <div className={styles.heritagePage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>संस्कृती आणि इतिहास</span>
            <h1 className={styles.heroTitle}>Maharashtra Heritage & Living Traditions</h1>
            <p className={styles.heroSubtitle}>
              Explore the glorious chronicle of Hindavi Swarajya, the spiritual verses of the Bhakti saints, monolithic basalt rock temples, and centuries of vibrant folk arts.
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
                <span className={styles.tabTitle}>{section.title.split('&')[0]}</span>
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
                alt={currentSection.title}
                className={styles.featureImage}
              />
              <div className={styles.mediaOverlay}>
                <Badge variant={currentSection.badgeVariant}>
                  {currentSection.tag}
                </Badge>
              </div>
            </div>

            <div className={styles.featureDetails}>
              <div className={styles.featureHeader}>
                <span className={styles.sectionIcon}>{currentSection.icon}</span>
                <h2 className={styles.featureTitle}>{currentSection.title}</h2>
              </div>

              <p className={styles.featureSummary}>{currentSection.summary}</p>

              <div className={styles.narrativeBox}>
                {currentSection.narrative.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className={styles.narrativeParagraph}>{paragraph}</p>
                ))}
              </div>

              <div className={styles.highlightsGrid}>
                {currentSection.highlights.map((h, i) => (
                  <div key={i} className={styles.highlightItem}>
                    <span className={styles.highlightLabel}>{h.label}</span>
                    <span className={styles.highlightValue}>{h.value}</span>
                  </div>
                ))}
              </div>

              <div className={styles.featureActions}>
                <Link to="/explore">
                  <Button variant="primary">Explore Related Sites</Button>
                </Link>
                <Link to="/planner">
                  <Button variant="outline">Plan Heritage Circuit</Button>
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
            <span className={styles.subTitle}>Living Expressions</span>
            <h2 className={styles.title}>Folk Arts & Traditions of Maharashtra</h2>
            <p className={styles.description}>
              Every region of Maharashtra pulses with its own rhythms, theatrical performances, and musical storytelling traditions.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <Music size={26} />
              </div>
              <h3 className={styles.pillarTitle}>Powada Ballads</h3>
              <p className={styles.pillarText}>
                Heroic martial ballads composed by Shahirs celebrating the exploits of Shivaji Maharaj and Tanaji Malusare with rhythmic Dholki and Daf accompaniment.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <Sparkles size={26} />
              </div>
              <h3 className={styles.pillarTitle}>Lavani & Tamasha</h3>
              <p className={styles.pillarText}>
                Sensuous, energetic folk dance accompanied by the frantic beats of the Dholki and ghungroos, originating as royal court entertainment during the Peshwa era.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <Award size={26} />
              </div>
              <h3 className={styles.pillarTitle}>Gondhal & Jagran</h3>
              <p className={styles.pillarText}>
                Dramatic nocturnal thanksgiving rituals dedicated to Goddess Bhavani of Tuljapur and Lord Khandoba of Jejuri, performed with the Sambal and Tuntune instruments.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <Compass size={26} />
              </div>
              <h3 className={styles.pillarTitle}>Varkari Wari</h3>
              <p className={styles.pillarText}>
                The annual walking pilgrimage to Pandharpur spanning 250 kilometers, where pilgrims dance in rhythmic circles (Ringan) chanting divine abhangas.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
