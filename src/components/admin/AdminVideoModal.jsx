import React, { useState, useEffect } from 'react';
import { extractYouTubeId, isValidYouTubeUrl, getYouTubeThumbnail } from '../../utils/youtubeValidator';
import { contentService } from '../../services/contentService';
import styles from './AdminModal.module.css';

export default function AdminVideoModal({ isOpen, onClose, onSave, videoToEdit }) {
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [festivalId, setFestivalId] = useState('');
  const [category, setCategory] = useState('heritage');
  const [district, setDistrict] = useState('Maharashtra');
  const [duration, setDuration] = useState('12:00');
  const [creator, setCreator] = useState('AAGMAN Heritage Series');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const [destinations, setDestinations] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    async function loadContent() {
      const dests = await contentService.getAllDestinations();
      const fests = await contentService.getAllFestivals();
      setDestinations(dests);
      setFestivals(fests);
    }
    loadContent();
  }, []);

  useEffect(() => {
    if (videoToEdit) {
      setTitle(videoToEdit.title || '');
      setYoutubeUrl(videoToEdit.youtubeUrl || '');
      setDescription(videoToEdit.description || '');
      setDestinationId(videoToEdit.destinationId || '');
      setFestivalId(videoToEdit.festivalId || '');
      setCategory(videoToEdit.category || 'heritage');
      setDistrict(videoToEdit.district || 'Maharashtra');
      setDuration(videoToEdit.duration || '12:00');
      setCreator(videoToEdit.creator || 'AAGMAN Heritage Series');
      setIsFeatured(videoToEdit.isFeatured ?? true);
      setIsActive(videoToEdit.isActive ?? true);
    } else {
      setTitle('');
      setYoutubeUrl('');
      setDescription('');
      setDestinationId('');
      setFestivalId('');
      setCategory('heritage');
      setDistrict('Maharashtra');
      setDuration('12:00');
      setCreator('AAGMAN Heritage Series');
      setIsFeatured(true);
      setIsActive(true);
    }
    setValidationError(null);
  }, [videoToEdit, isOpen]);

  if (!isOpen) return null;

  const validId = extractYouTubeId(youtubeUrl);
  const previewThumb = validId ? getYouTubeThumbnail(validId, 'hqdefault') : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);

    if (!title.trim()) {
      setValidationError('Please enter a video title.');
      return;
    }

    if (!youtubeUrl.trim() || !isValidYouTubeUrl(youtubeUrl)) {
      setValidationError('Please provide a valid YouTube URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...).');
      return;
    }

    const selectedDest = destinations.find(d => d.id === destinationId);

    onSave({
      id: videoToEdit?.id,
      title: title.trim(),
      youtubeUrl: youtubeUrl.trim(),
      description: description.trim(),
      destinationId: destinationId || null,
      destinationName: selectedDest ? selectedDest.name : '',
      festivalId: festivalId || null,
      category,
      district,
      duration,
      creator,
      isFeatured,
      isActive
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {videoToEdit ? 'Edit YouTube Documentary' : 'Add Official YouTube Documentary'}
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
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>Video Title *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Sovereign Throne: Fort Raigad Aerial Exploration"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>YouTube URL * (Standard or youtu.be link)</label>
              <input
                type="url"
                className={styles.input}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                required
              />
            </div>

            {/* Live YouTube Thumbnail Preview */}
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <div className={styles.youtubePreviewBox}>
                {previewThumb ? (
                  <div className={styles.thumbWrap}>
                    <img src={previewThumb} alt="YouTube thumbnail" className={styles.thumbImage} />
                    <div className={styles.verifiedBadge}>✓ Valid YouTube ID: {validId}</div>
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.testLink}
                    >
                      Test YouTube Link (Opens in New Tab) ↗
                    </a>
                  </div>
                ) : (
                  <div className={styles.emptyPreview}>
                    <span>Enter a valid YouTube link above to automatically verify the video ID and preview thumbnail.</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.label}>Cultural Description / Summary</label>
              <textarea
                className={styles.textarea}
                rows={3}
                placeholder="Brief synopsis of what travelers will see in this documentary..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Associated Destination</label>
              <select
                className={styles.select}
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
              >
                <option value="">-- None / General Maharashtra --</option>
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.category})</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Associated Festival</label>
              <select
                className={styles.select}
                value={festivalId}
                onChange={(e) => setFestivalId(e.target.value)}
              >
                <option value="">-- None / General --</option>
                {festivals.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="forts">Historic Forts & Treks</option>
                <option value="temples">Sacred Temples & Shrines</option>
                <option value="beaches">Konkan Coast & Beaches</option>
                <option value="heritage">UNESCO Caves & Monuments</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>District</label>
              <input
                type="text"
                className={styles.input}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Duration Label</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. 14:20"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Creator / Filmmaker</label>
              <input
                type="text"
                className={styles.input}
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </div>

            <div className={styles.checkboxGroup} style={{ gridColumn: '1 / -1' }}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                <span>Feature on Homepage and Destination highlights</span>
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <span>Active (Visible on public Videos page)</span>
              </label>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnSubmit}>
              {videoToEdit ? 'Save Changes' : 'Publish Video Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
