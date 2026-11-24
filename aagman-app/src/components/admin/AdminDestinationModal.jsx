import React, { useState, useEffect } from 'react';
import MediaManager from './MediaManager';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from './AdminModal.module.css';

export default function AdminDestinationModal({ isOpen, onClose, onSave, destinationToEdit }) {
  const { role, isSuperAdmin, isContentManager } = useAdminAuth();

  const [name, setName] = useState('');
  const [marathiName, setMarathiName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('forts');
  const [district, setDistrict] = useState('Pune');
  const [region, setRegion] = useState('Western Maharashtra');
  const [circuit, setCircuit] = useState('');
  const [bestTimeToVisit, setBestTimeToVisit] = useState('October – March');
  const [entryFee, setEntryFee] = useState('Free entry');
  const [description, setDescription] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('published');
  const [featuredOrder, setFeaturedOrder] = useState('');
  const [validationError, setValidationError] = useState(null);

  const canPublish = isSuperAdmin || isContentManager;

  useEffect(() => {
    if (destinationToEdit) {
      setName(destinationToEdit.name || '');
      setMarathiName(destinationToEdit.marathiName || '');
      setSlug(destinationToEdit.slug || destinationToEdit.id || '');
      setCategory(destinationToEdit.category || 'forts');
      setDistrict(destinationToEdit.district || '');
      setRegion(destinationToEdit.region || 'Western Maharashtra');
      setCircuit(destinationToEdit.circuit || '');
      setBestTimeToVisit(destinationToEdit.bestTimeToVisit || 'October – March');
      setEntryFee(destinationToEdit.entryFee || 'Free entry');
      setDescription(destinationToEdit.description || '');
      setHighlightsText(Array.isArray(destinationToEdit.highlights) ? destinationToEdit.highlights.join(', ') : '');
      setHeroImage(destinationToEdit.heroImage || destinationToEdit.image || '');
      setGallery(Array.isArray(destinationToEdit.gallery) ? destinationToEdit.gallery : []);
      setStatus(destinationToEdit.status || 'published');
      setFeaturedOrder(destinationToEdit.featuredOrder ? String(destinationToEdit.featuredOrder) : '');
    } else {
      setName('');
      setMarathiName('');
      setSlug('');
      setCategory('forts');
      setDistrict('');
      setRegion('Western Maharashtra');
      setCircuit('');
      setBestTimeToVisit('October – March');
      setEntryFee('Free entry');
      setDescription('');
      setHighlightsText('');
      setHeroImage('');
      setGallery([]);
      setStatus(canPublish ? 'published' : 'draft');
      setFeaturedOrder('');
    }
    setValidationError(null);
  }, [destinationToEdit, isOpen, canPublish]);

  if (!isOpen) return null;

  const handleNameChange = (val) => {
    setName(val);
    if (!destinationToEdit) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim()) {
      setValidationError('Destination name is required.');
      return;
    }

    const highlights = highlightsText
      .split(',')
      .map(h => h.trim())
      .filter(Boolean);

    onSave({
      id: destinationToEdit?.id,
      name: name.trim(),
      marathiName: marathiName.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      district: district.trim(),
      region: region.trim(),
      circuit: circuit.trim(),
      bestTimeToVisit: bestTimeToVisit.trim(),
      entryFee: entryFee.trim(),
      description: description.trim(),
      highlights,
      heroImage: heroImage.trim(),
      image: heroImage.trim(),
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
            {destinationToEdit ? `Edit Destination: ${destinationToEdit.name}` : 'Create New Heritage Destination'}
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
              <label className={styles.label}>Destination Name (English) *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Raigad Fort"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Name in Marathi (देवनागरी)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. किल्ले रायगड"
                value={marathiName}
                onChange={(e) => setMarathiName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>URL Slug (Unique path key) *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="raigad-fort"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
              <span className={styles.hint}>Used in public URL: /forts/{slug || 'slug'}</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tourism Category *</label>
              <select
                className={styles.select}
                value={category}
                onChange={(e) => {
                  const nextCategory = e.target.value;
                  setCategory(nextCategory);
                  if (!['temples', 'forts', 'heritage', 'beaches'].includes(nextCategory)) setFeaturedOrder('');
                }}
              >
                <option value="forts">Forts & Sahyadri Bastions</option>
                <option value="temples">Sacred Temples & Shrines</option>
                <option value="beaches">Konkan Coast & Beaches</option>
                <option value="heritage">UNESCO Caves & Monuments</option>
                <option value="nature">Hill Stations & Natural Wonders</option>
                <option value="wildlife">Wildlife Sanctuaries & Parks</option>
              </select>
            </div>

            {['temples', 'forts', 'heritage', 'beaches'].includes(category) ? (
              <div className={styles.formGroup}>
                <label className={styles.label}>Homepage Highlight Position</label>
                <select className={styles.select} value={featuredOrder} onChange={(e) => setFeaturedOrder(e.target.value)}>
                  <option value="">Not featured</option>
                  {[1, 2, 3, 4, 5].map(position => <option key={position} value={position}>Top {position} in {category}</option>)}
                </select>
                <span className={styles.hint}>Choose one of five positions for this category. Each position can be used once per category.</span>
              </div>
            ) : (
              <div className={styles.formGroup}>
                <label className={styles.label}>Homepage Highlight Position</label>
                <span className={styles.hint}>Homepage highlights are available for temples, forts, heritage sites and beaches.</span>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>District *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Raigad, Pune, Sindhudurg, Nashik"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Region</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Konkan, Western Maharashtra, Marathwada"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tourism Circuit / Cluster</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Maratha Imperial Circuit, Ashtavinayak"
                value={circuit}
                onChange={(e) => setCircuit(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Best Time to Visit</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. October – March (Post-Monsoon)"
                value={bestTimeToVisit}
                onChange={(e) => setBestTimeToVisit(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Entry / Ticket Fee</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. ₹25 (ASI Protected) or Free entry"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
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

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>Historical & Cultural Description</label>
              <textarea
                className={styles.textarea}
                rows={4}
                placeholder="Comprehensive narrative detailing history, architecture, military significance, and travel experience..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>Key Highlights (Comma-separated)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Maha Darwaja, Rajbhavan, Takmak Tok, Shivaji Maharaj Samadhi"
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
              />
            </div>
          </div>

          {/* Media & Photographs Section */}
          <MediaManager
            entityType="destinations"
            entitySlug={slug || name}
            coverImage={heroImage}
            onCoverImageChange={setHeroImage}
            gallery={gallery}
            onGalleryChange={setGallery}
            label="Destination Photography & Visuals"
          />

          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnSubmit}>
              {destinationToEdit ? 'Save Changes' : 'Save Destination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
