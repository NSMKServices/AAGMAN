import React, { useState, useEffect } from 'react';
import MediaManager from './MediaManager';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from './AdminModal.module.css';

export default function AdminFestivalModal({ isOpen, onClose, onSave, festivalToEdit }) {
  const { isSuperAdmin, isContentManager } = useAdminAuth();

  const [name, setName] = useState('');
  const [marathiName, setMarathiName] = useState('');
  const [dates, setDates] = useState('');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('Maharashtra');
  const [description, setDescription] = useState('');
  const [significance, setSignificance] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('published');
  const [featuredOrder, setFeaturedOrder] = useState('');
  const [validationError, setValidationError] = useState(null);

  const canPublish = isSuperAdmin || isContentManager;

  useEffect(() => {
    if (festivalToEdit) {
      setName(festivalToEdit.name || '');
      setMarathiName(festivalToEdit.marathiName || '');
      setDates(festivalToEdit.dates || '');
      setLocation(festivalToEdit.location || '');
      setDistrict(festivalToEdit.district || 'Maharashtra');
      setDescription(festivalToEdit.description || '');
      setSignificance(festivalToEdit.significance || '');
      setHighlightsText(Array.isArray(festivalToEdit.highlights) ? festivalToEdit.highlights.join(', ') : '');
      setImage(festivalToEdit.image || '');
      setGallery(Array.isArray(festivalToEdit.gallery) ? festivalToEdit.gallery : []);
      setStatus(festivalToEdit.status || 'published');
      setFeaturedOrder(festivalToEdit.featuredOrder ? String(festivalToEdit.featuredOrder) : '');
    } else {
      setName('');
      setMarathiName('');
      setDates('');
      setLocation('Statewide');
      setDistrict('Maharashtra');
      setDescription('');
      setSignificance('');
      setHighlightsText('');
      setImage('');
      setGallery([]);
      setStatus(canPublish ? 'published' : 'draft');
      setFeaturedOrder('');
    }
    setValidationError(null);
  }, [festivalToEdit, isOpen, canPublish]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim()) {
      setValidationError('Festival name is required.');
      return;
    }

    const highlights = highlightsText
      .split(',')
      .map(h => h.trim())
      .filter(Boolean);

    onSave({
      id: festivalToEdit?.id,
      name: name.trim(),
      marathiName: marathiName.trim(),
      dates: dates.trim(),
      location: location.trim(),
      district: district.trim(),
      description: description.trim(),
      significance: significance.trim(),
      highlights,
      image: image.trim(),
      gallery,
      status,
      featuredOrder: featuredOrder ? Number(featuredOrder) : null
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {festivalToEdit ? `Edit Festival: ${festivalToEdit.name}` : 'Create New Cultural Festival'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {validationError && (
            <div className={styles.errorAlert}>
              {validationError}
            </div>
          )}

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Festival Name (English) *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Ganeshotsav, Shiv Jayanti"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Name in Marathi (देवनागरी)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. गणेशोत्सव, शिवजयंती"
                value={marathiName}
                onChange={(e) => setMarathiName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Dates / Timing</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. August – September (Bhadrapada)"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Primary Location / Focus</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Statewide (Pune & Mumbai)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>District</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Pune, Mumbai, Statewide"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Publication Workflow Status *</label>
              <select
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="draft">Draft (Work in Progress)</option>
                <option value="under_review">Under Review (Pending Approval)</option>
                <option value="published" disabled={!canPublish}>
                  Published {!canPublish ? '(Requires Content Manager Role)' : ''}
                </option>
                <option value="archived" disabled={!canPublish}>
                  Archived {!canPublish ? '(Requires Content Manager Role)' : ''}
                </option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Homepage Highlight Position</label>
              <select className={styles.select} value={featuredOrder} onChange={(e) => setFeaturedOrder(e.target.value)}>
                <option value="">Not featured</option>
                {[1, 2, 3, 4, 5].map(position => <option key={position} value={position}>Top {position} festival</option>)}
              </select>
              <span className={styles.hint}>Choose one of five festival highlight positions. Each position can be used once.</span>
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>Cultural Significance</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Celebrates Lord Ganesha; 800-year-old egalitarian Warkari pilgrimage"
                value={significance}
                onChange={(e) => setSignificance(e.target.value)}
              />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>Detailed Festival Description</label>
              <textarea
                className={styles.textarea}
                rows={4}
                placeholder="Comprehensive celebration overview, rituals, traditions, and visitor guidelines..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>Event Highlights (Comma-separated)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Dhol Tasha drumming, Lalbaugcha Raja, Ringan ceremonies, Modak feast"
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
              />
            </div>
          </div>

          {/* Media & Photographs Section */}
          <MediaManager
            entityType="festivals"
            entitySlug={festivalToEdit?.slug || festivalToEdit?.id || name}
            coverImage={image}
            onCoverImageChange={setImage}
            gallery={gallery}
            onGalleryChange={setGallery}
            label="Festival Photography & Visuals"
          />

          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnSubmit}>
              {festivalToEdit ? 'Save Changes' : 'Save Festival'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
