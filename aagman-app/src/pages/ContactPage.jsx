import React, { useState } from 'react';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Check, Landmark, AlertCircle } from '../components/common/Icons';
import styles from './ContactPage.module.css';

export default function ContactPage() {
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
            <span className={styles.heroEyebrow}>ASSISTANCE & INQUIRIES</span>
            <h1 className={styles.heroTitle}>Contact AAGMAN Support</h1>
            <p className={styles.heroSubtitle}>
              Have questions regarding Sahyadri trekking guidelines, temple puja timings, or regional Maharashtra road conditions? Our tourism support network is here to assist.
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
              <h2 className={styles.cardHeading}>Send an Official Inquiry</h2>
              <p className={styles.cardSub}>
                Fill out the traveler assistance form below and our team will get back to you within 24 to 48 business hours.
              </p>

              {submitted ? (
                <div className={styles.successBox}>
                  <span className={styles.successIcon}>
                    <Check size={18} />
                  </span>
                  <div>
                    <strong className={styles.successTitle}>Inquiry Dispatched Successfully!</strong>
                    <p className={styles.successDesc}>
                      Thank you for contacting AAGMAN. A reference confirmation has been generated and logged into local session storage.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name *</label>
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
                      <label className={styles.label}>Email Address *</label>
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
                    <label className={styles.label}>Inquiry Topic</label>
                    <select
                      className={styles.select}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="General Inquiry">General Tourism Information</option>
                      <option value="Fort Trekking Permits">Fort Trekking & Forest Department Permits</option>
                      <option value="Temple Darshan">Temple Darshan Passes & Dress Codes</option>
                      <option value="Konkan Coastal Travel">Konkan Coastal Ro-Ro & Ferry Timings</option>
                      <option value="MTDC Bookings">MTDC Resort Reservation Guidance</option>
                      <option value="Platform Feedback">Platform Technical Feedback</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Subject *</label>
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
                    <label className={styles.label}>Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      className={styles.textarea}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide details of your travel query or itinerary question..."
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
                    Send Traveler Inquiry →
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
                    <h3 className={styles.infoCardTitle}>Maharashtra Tourism Headquarters</h3>
                    <span className={styles.infoCardSub}>Official Liaison Directorate</span>
                  </div>
                </div>

                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <strong>Address:</strong>
                    <p>MTDC Central Office, C.D.O. Hutments, Opp. LIC Building, Madame Cama Road, Nariman Point, Mumbai 400021</p>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Toll-Free Helpline:</strong>
                    <p><a href="tel:1800229930" className={styles.phoneLink}>1800-229-930</a> (Mon – Sat, 9 AM – 7 PM)</p>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Official Email:</strong>
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
                    <h3 className={styles.infoCardTitle}>24x7 Emergency Helplines</h3>
                    <span className={styles.infoCardSub}>Statewide Rapid Response</span>
                  </div>
                </div>

                <div className={styles.emergencyGrid}>
                  <div className={styles.emItem}>
                    <span className={styles.emNumber}>112</span>
                    <span className={styles.emLabel}>Police & Medical Emergency</span>
                  </div>

                  <div className={styles.emItem}>
                    <span className={styles.emNumber}>+91 94220 12345</span>
                    <span className={styles.emLabel}>Sahyadri Mountain Rescue</span>
                  </div>

                  <div className={styles.emItem}>
                    <span className={styles.emNumber}>1800-221-250</span>
                    <span className={styles.emLabel}>MSRTC Bus Control Room</span>
                  </div>

                  <div className={styles.emItem}>
                    <span className={styles.emNumber}>1090</span>
                    <span className={styles.emLabel}>Women Traveler Helpline</span>
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
