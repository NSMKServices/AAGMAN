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
import styles from './FaqPage.module.css';

const FAQ_DATA = [
  {
    category: 'Sahyadri Trekking & Forts',
    Icon: Castle,
    items: [
      {
        q: 'Do I need prior permits to trek forts in Maharashtra?',
        a: 'Most historic forts (like Sinhagad, Rajgad, Torna, Lohagad) do not require advance permits for daytime trekking. However, sanctuaries such as Kalsubai Harishchandragad Wildlife Sanctuary and Vasota Fort (Koyna Wildlife Sanctuary) require an entry pass from the Maharashtra Forest Department at the base check-post. A nominal eco-development fee (₹30–₹50) is charged.'
      },
      {
        q: 'Is night camping allowed on forts like Rajgad or Harishchandragad?',
        a: 'Night camping rules vary by district and season. On Rajgad, Padmavati Temple offers traditional shelter where trekkers often stay overnight respectfully. On Harishchandragad, the ancient Buddhist caves provide natural rock shelters. However, during heavy monsoon storms, night camping on open cliff-edges like Konkan Kada is strictly prohibited for safety.'
      },
      {
        q: 'Where can I find drinking water while trekking in the Sahyadris?',
        a: 'Most Maratha forts feature ancient rock-cut water cisterns (called "Taake") excavated into the basalt stone. Many (such as the Dev Taake on Sinhagad and Padmavati cisterns on Rajgad) hold potable, natural spring water year-round. It is recommended to use water purification tablets or carry at least 2–3 liters of water per person during summer treks.'
      }
    ]
  },
  {
    category: 'Sacred Temples & Darshan Etiquette',
    Icon: Landmark,
    items: [
      {
        q: 'What is the dress code for visiting major Maharashtra temples?',
        a: 'Traditional modest attire is required across all major shrines (Trimbakeshwar, Shirdi, Pandharpur, Bhimashankar, Tuljapur). Men are recommended to wear dhotis/kurtas or trousers with shirts; women are expected to wear saris, salwar suits, or modest dresses. Shorts, sleeveless clothing, and beachwear are not permitted in temple inner sanctums (Garbhagriha).'
      },
      {
        q: 'How can I book online VIP Darshan for Shirdi and Jyotirlinga temples?',
        a: 'Online darshan passes and special aarti tickets can be booked through official trust portals: Shri Saibaba Sansthan Trust (online.sai.org.in), Shri Trimbakeshwar Sansthan, and Shri Vitthal Birdev Trust Pandharpur. Booking 2 to 4 weeks in advance is advised for weekend and festive dates.'
      },
      {
        q: 'Are mobile phones and cameras allowed inside temple complexes?',
        a: 'Mobile phones and electronic photography are strictly prohibited inside the sanctum sanctorum of Shirdi, Pandharpur, and Trimbakeshwar. Safe electronic locker counters are available near temple entry gates.'
      }
    ]
  },
  {
    category: 'Accommodation & MTDC Booking',
    Icon: Building,
    items: [
      {
        q: 'How do I book MTDC (Maharashtra Tourism Development Corporation) resorts?',
        a: 'MTDC runs panoramic government-managed resorts at premier heritage and scenic spots (e.g., MTDC Ganpatipule Beach, MTDC Mahabaleshwar, MTDC Tarkarli Water Sports, and MTDC Ajanta Fardapur). Stays can be reserved through their official booking portal (maharashtratourism.gov.in) or verified booking partners.'
      },
      {
        q: 'What is Maharashtra Agri-Tourism and village homestay scheme?',
        a: 'The Maharashtra Agri-Tourism Development Corporation (ATDC) supports certified rural farmstays in Baramati, Junnar, Satara, and Konkan. Travelers experience authentic farming life, mango orchards, bullock cart rides, and home-cooked Chulivarchi Pithla-Bhakri prepared on traditional earthen stoves.'
      }
    ]
  },
  {
    category: 'Transportation & Mountain Ghat Driving',
    Icon: Car,
    items: [
      {
        q: 'What are the essential precautions for driving on Maharashtra ghat roads?',
        a: 'Sahyadri ghats (e.g., Amba Ghat, Varandha Ghat, Malshej Ghat, Tamhini Ghat) feature sharp hairpin curves and dense monsoon fog. Always drive in low gear when descending to avoid brake overheating, keep headlights on during foggy conditions, watch for rockfall warning signs during heavy rains, and avoid overtaking on blind turns.'
      },
      {
        q: 'How can I travel by Ro-Ro car ferry from Mumbai to Alibaug / Mandwa?',
        a: 'The M2M Ferries Ro-Ro service operates between Bhaucha Dhakka (Ferry Wharf, Mumbai) and Mandwa Jetty (Alibaug). It accommodates passengers and vehicles (cars, motorcycles, bicycles) in an air-conditioned 60-minute voyage across Mumbai harbor, bypassing 3+ hours of highway traffic.'
      }
    ]
  }
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_DATA;

    const query = searchQuery.toLowerCase();
    return FAQ_DATA.map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query)
      )
    })).filter(cat => cat.items.length > 0);
  }, [searchQuery]);

  return (
    <div className={styles.faqPage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>मार्गदर्शन आणि वारंवार विचारले जाणारे प्रश्न</span>
            <h1 className={styles.heroTitle}>Maharashtra Travel Guidance & FAQ</h1>
            <p className={styles.heroSubtitle}>
              Official advice on fort trekking permits, sacred temple dress codes, MTDC resort reservations, and driving through Sahyadri mountain ghats.
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
              placeholder="Search travel guidelines (e.g., permits, dress code, camping, MTDC)..."
            />
          </div>
        </Container>
      </section>

      {/* Main Accordion List */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.faqLayout}>
            {/* FAQ List */}
            <div className={styles.accordionContainer}>
              {filteredCategories.length === 0 ? (
                <div className={styles.noResults}>
                  <p>No questions matched your search query. Try searching for "trek", "temple", or "ferry".</p>
                </div>
              ) : (
                filteredCategories.map((cat, catIdx) => (
                  <div key={cat.category} className={styles.categorySection}>
                    <div className={styles.categoryHeader}>
                      <span className={styles.categoryIcon}>
                        <cat.Icon size={20} />
                      </span>
                      <h2 className={styles.categoryTitle}>{cat.category}</h2>
                    </div>

                    <div className={styles.questionsList}>
                      {cat.items.map((item, itemIdx) => {
                        const itemKey = `${catIdx}-${itemIdx}`;
                        const isOpen = !!openItems[itemKey];

                        return (
                          <div
                            key={itemIdx}
                            className={`${styles.faqCard} ${isOpen ? styles.cardOpen : ''}`}
                          >
                            <button
                              type="button"
                              className={styles.questionBtn}
                              onClick={() => toggleItem(itemKey)}
                              aria-expanded={isOpen}
                            >
                              <span className={styles.questionText}>{item.q}</span>
                              <span className={styles.arrowIcon}>{isOpen ? '−' : '+'}</span>
                            </button>

                            {isOpen && (
                              <div className={styles.answerBox}>
                                <p className={styles.answerText}>{item.a}</p>
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

            {/* Helpline & Quick Assistance Sidebar */}
            <div className={styles.helplineCol}>
              <div className={styles.helplineCard}>
                <h3 className={styles.helplineHeading}>
                  <AlertCircle size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  24x7 Traveler Helplines
                </h3>
                <div className={styles.helplineList}>
                  <div className={styles.helplineItem}>
                    <span className={styles.helplineName}>Maharashtra Tourism (MTDC)</span>
                    <a href="tel:1800229930" className={styles.helplinePhone}>1800-229-930</a>
                    <span className={styles.helplineDesc}>Toll-Free Tourist Info & Booking</span>
                  </div>

                  <div className={styles.helplineItem}>
                    <span className={styles.helplineName}>State Emergency & Police</span>
                    <a href="tel:112" className={styles.helplinePhone}>112</a>
                    <span className={styles.helplineDesc}>Immediate Police, Fire & Medical</span>
                  </div>

                  <div className={styles.helplineItem}>
                    <span className={styles.helplineName}>Sahyadri Mountain Rescue</span>
                    <a href="tel:9422012345" className={styles.helplinePhone}>+91 94220 12345</a>
                    <span className={styles.helplineDesc}>Trekker search & emergency rescue</span>
                  </div>

                  <div className={styles.helplineItem}>
                    <span className={styles.helplineName}>MSRTC Bus Inquiry</span>
                    <a href="tel:1800221250" className={styles.helplinePhone}>1800-221-250</a>
                    <span className={styles.helplineDesc}>State transport bus schedules</span>
                  </div>
                </div>
              </div>

              <div className={styles.tipsCard}>
                <h4 className={styles.tipsHeading}>
                  <Trees size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  Eco-Tourism Pledge
                </h4>
                <p className={styles.tipsText}>
                  Always preserve the sanctity and heritage of our historical forts. Do not litter plastic bottles or deface ancient basalt stone walls. Carry your waste back down the mountain.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
