import React, { useState } from 'react';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Check, Landmark, AlertCircle } from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        category: 'General Inquiry',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className={styles.contactPage}>
      {/* Header Banner */}
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>
              {language === 'mr' ? 'पर्यटक मदत कक्ष व संपर्क' : language === 'hi' ? 'पर्यटक सहायता एवं संपर्क' : 'ASSISTANCE & INQUIRIES'}
            </span>
            <h1 className={styles.heroTitle}>{t('contactTitle', 'Contact AAGMAN Support')}</h1>
            <p className={styles.heroSubtitle}>
              {t('contactSub', 'Have questions regarding Sahyadri trekking guidelines, temple puja timings, or regional Maharashtra road conditions? Our liaison network is here to assist.')}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Form & Directory Grid */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.contactGrid}>
            {/* Left: Traveler Inquiry Form */}
            <div className={styles.formCard}>
              <h2 className={styles.cardHeading}>{t('sendInquiry', 'Send an Official Inquiry')}</h2>
              <p className={styles.cardSub}>
                {t('inquirySub', 'Fill out the traveler assistance form below and our team will get back to you within 24 to 48 business hours.')}
              </p>

              {submitted ? (
                <div className={styles.successBox}>
                  <span className={styles.successIcon}>
                    <Check size={18} />
                  </span>
                  <div>
                    <strong className={styles.successTitle}>
                      {language === 'mr' ? 'चौकशी यशस्वीरीत्या पाठवली गेली!' : language === 'hi' ? 'पूछताछ सफलतापूर्वक भेजी गई!' : 'Inquiry Dispatched Successfully!'}
                    </strong>
                    <p className={styles.successDesc}>
                      {t('messageSentSuccess', 'Your message has been sent successfully. A tourism liaison officer will reply shortly.')}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('fullName', 'Full Name')} *</label>
                      <input
                        type="text"
                        required
                        className={styles.input}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tanaji Jadhav"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('emailLabel', 'Email Address')} *</label>
                      <input
                        type="email"
                        required
                        className={styles.input}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="traveler@example.com"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('inquiryCategory', 'Inquiry Category')}</label>
                    <select
                      className={styles.select}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="General Inquiry">
                        {language === 'mr' ? 'सामान्य पर्यटन माहिती' : language === 'hi' ? 'सामान्य पर्यटन जानकारी' : 'General Tourism Information'}
                      </option>
                      <option value="Fort Trekking Permits">
                        {language === 'mr' ? 'गडकोट ट्रेकिंग आणि वनविभाग परवाने' : language === 'hi' ? 'किला ट्रेकिंग एवं वन विभाग अनुमति' : 'Fort Trekking & Forest Department Permits'}
                      </option>
                      <option value="Temple Darshan">
                        {language === 'mr' ? 'मंदिर दर्शन आणि धार्मिक संकेत' : language === 'hi' ? 'मंदिर दर्शन एवं दिशानिर्देश' : 'Temple Darshan Passes & Dress Codes'}
                      </option>
                      <option value="Konkan Coastal Travel">
                        {language === 'mr' ? 'कोकण रो-रो आणि फेरी वेळापत्रक' : language === 'hi' ? 'कोंकण रो-रो एवं नौका समय' : 'Konkan Coastal Ro-Ro & Ferry Timings'}
                      </option>
                      <option value="MTDC Bookings">
                        {language === 'mr' ? 'एमटीडीसी रिसॉर्ट आरक्षण' : language === 'hi' ? 'एमटीडीसी रिसॉर्ट बुकिंग' : 'MTDC Resort Reservation Guidance'}
                      </option>
                      <option value="Platform Feedback">
                        {language === 'mr' ? 'तांत्रिक अभिप्राय' : language === 'hi' ? 'तकनीकी सुझाव' : 'Platform Technical Feedback'}
                      </option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('subject', 'Subject')} *</label>
                    <input
                      type="text"
                      required
                      className={styles.input}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Harishchandragad monsoon night shelter rules"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('message', 'Your Message')} *</label>
                    <textarea
                      required
                      rows={5}
                      className={styles.textarea}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'mr' ? 'आपला प्रश्न येथे सविस्तर लिहा...' : language === 'hi' ? 'कृपया अपना प्रश्न विस्तार से लिखें...' : 'Please provide details of your travel query or itinerary question...'}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
                    {t('sendMessage', 'Send Official Inquiry →')}
                  </Button>
                </form>
              )}
            </div>

            {/* Right: Official Directory & Emergency Numbers */}
            <div className={styles.infoCol}>
              {/* Official Tourism HQ */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>
                  <span className={styles.cardIcon}>
                    <Landmark size={20} />
                  </span>
                  <div>
                    <h3 className={styles.infoCardTitle}>
                      {language === 'mr' ? 'महाराष्ट्र पर्यटन मुख्यालय' : language === 'hi' ? 'महाराष्ट्र पर्यटन मुख्यालय' : 'Maharashtra Tourism Headquarters'}
                    </h3>
                    <span className={styles.infoCardSub}>Official Liaison Directorate</span>
                  </div>
                </div>

                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <strong>{language === 'mr' ? 'पत्ता' : language === 'hi' ? 'पता' : 'Address'}:</strong>
                    <p>MTDC Central Office, C.D.O. Hutments, Opp. LIC Building, Madame Cama Road, Nariman Point, Mumbai 400021</p>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>{t('mtdcHelpline', 'Toll-Free Helpline')}:</strong>
                    <p><a href="tel:1800229930" className={styles.phoneLink}>1800-229-930</a> (Mon – Sat, 9 AM – 7 PM)</p>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>{language === 'mr' ? 'अधिकृत ईमेल' : language === 'hi' ? 'आधिकारिक ईमेल' : 'Official Email'}:</strong>
                    <p>info@maharashtratourism.gov.in</p>
                  </div>
                </div>
              </div>

              {/* 24x7 State Emergency Helplines */}
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>
                  <span className={styles.cardIcon}>
                    <AlertCircle size={20} />
                  </span>
                  <div>
                    <h3 className={styles.infoCardTitle}>{t('helplineTitle', '24x7 Emergency Helplines')}</h3>
                    <span className={styles.infoCardSub}>
                      {language === 'mr' ? 'आपत्कालीन सहकार्य' : language === 'hi' ? 'आपातकालीन सहायता' : 'Immediate Traveler Response'}
                    </span>
                  </div>
                </div>

                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <strong>{t('emergencyHelpline', 'Unified Emergency')}:</strong>
                    <p><a href="tel:112" className={styles.phoneLink}>112</a> ({language === 'mr' ? 'पोलीस, रुग्णवाहिका, अग्निशामक' : language === 'hi' ? 'पुलिस, एम्बुलेंस, अग्निशमन' : 'Police, Medical & Fire'})</p>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>{t('sahyadriRescue', 'Sahyadri Mountain Rescue')}:</strong>
                    <p><a href="tel:+919422012345" className={styles.phoneLink}>+91 94220 12345</a> ({language === 'mr' ? 'दुर्ग ट्रेकर्स मदत कक्ष' : language === 'hi' ? 'ट्रेकर्स बचाव दल' : 'Trekkers Distress Line'})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
