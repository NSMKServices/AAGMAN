import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import styles from './MediaManager.module.css';

export default function MediaManager({
  coverImage = '',
  onCoverImageChange,
  gallery = [],
  onGalleryChange,
  label = 'Content Photographs & Media'
}) {
  const [coverUrlInput, setCoverUrlInput] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [newGalleryAlt, setNewGalleryAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  // File upload to Supabase Storage with graceful offline fallback
  const handleFileUpload = async (file, targetType) => {
    if (!file) return;

    // 1. File Type and Size Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid image format. Supported formats: JPEG, PNG, WebP, SVG.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File exceeds 5MB size limit. Please optimize or choose a smaller image.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    try {
      if (isSupabaseConfigured) {
        // Attempt upload to destination-media bucket
        const { data, error } = await supabase.storage
          .from('destination-media')
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (error) {
          console.warn('Supabase storage upload error, falling back to local object URL:', error.message);
          const localUrl = URL.createObjectURL(file);
          applyUploadedUrl(localUrl, targetType, file.name);
          setUploadSuccess('Image loaded in local preview mode (Supabase bucket requires execution of migration).');
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('destination-media')
            .getPublicUrl(filePath);

          applyUploadedUrl(publicUrl, targetType, file.name);
          setUploadSuccess('Image successfully uploaded to Supabase Storage (destination-media)!');
        }
      } else {
        // Offline / sandbox fallback
        const localUrl = URL.createObjectURL(file);
        applyUploadedUrl(localUrl, targetType, file.name);
        setUploadSuccess('Image loaded in local preview mode.');
      }
    } catch (err) {
      console.warn('Storage exception, using object URL fallback:', err);
      const localUrl = URL.createObjectURL(file);
      applyUploadedUrl(localUrl, targetType, file.name);
      setUploadSuccess('Image loaded in preview mode.');
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadSuccess(null);
        setUploadError(null);
      }, 4000);
    }
  };

  const applyUploadedUrl = (url, targetType, fileName) => {
    if (targetType === 'cover') {
      onCoverImageChange(url);
    } else if (targetType === 'gallery') {
      const newEntry = {
        url,
        caption: newGalleryCaption || fileName || 'Gallery view',
        alt: newGalleryAlt || fileName || 'Photographic capture'
      };
      onGalleryChange([...gallery, newEntry]);
      setNewGalleryUrl('');
      setNewGalleryCaption('');
      setNewGalleryAlt('');
    }
  };

  const handleApplyCoverUrl = (e) => {
    e.preventDefault();
    if (!coverUrlInput.trim()) return;
    onCoverImageChange(coverUrlInput.trim());
    setCoverUrlInput('');
  };

  const handleAddGalleryItem = (e) => {
    e.preventDefault();
    if (!newGalleryUrl.trim()) return;

    const newEntry = {
      url: newGalleryUrl.trim(),
      caption: newGalleryCaption.trim() || 'Gallery photograph',
      alt: newGalleryAlt.trim() || 'Cultural documentation image'
    };

    onGalleryChange([...gallery, newEntry]);
    setNewGalleryUrl('');
    setNewGalleryCaption('');
    setNewGalleryAlt('');
  };

  const handleRemoveGalleryItem = (indexToRemove) => {
    onGalleryChange(gallery.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className={styles.mediaContainer}>
      <h3 className={styles.sectionHeader}>{label}</h3>

      {uploadError && (
        <div className={styles.alertError}>
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className={styles.alertSuccess}>
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* 1. Main Cover Image */}
      <div className={styles.coverSection}>
        <span className={styles.fieldLabel}>Primary Cover Photograph</span>

        <div className={styles.coverPreviewCard}>
          <div className={styles.coverImageWrap}>
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover Preview"
                className={styles.coverImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80';
                }}
              />
            ) : (
              <div className={styles.placeholderBox}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>No cover image assigned</span>
              </div>
            )}
          </div>

          <div className={styles.coverControls}>
            <div className={styles.urlInputRow}>
              <input
                type="text"
                placeholder="Paste remote URL (Unsplash, HTTPS) or /assets/..."
                value={coverUrlInput}
                onChange={(e) => setCoverUrlInput(e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                onClick={handleApplyCoverUrl}
                className={styles.btnSecondary}
              >
                Set URL
              </button>
            </div>

            <div className={styles.uploadRow}>
              <label className={styles.uploadBtn}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={(e) => handleFileUpload(e.target.files[0], 'cover')}
                  disabled={isUploading}
                  style={{ display: 'none' }}
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>{isUploading ? 'Uploading...' : 'Upload New Cover (5MB Max)'}</span>
              </label>

              {coverImage && (
                <button
                  type="button"
                  onClick={() => onCoverImageChange('')}
                  className={styles.removeBtn}
                >
                  Remove Cover
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Gallery Photographs */}
      <div className={styles.gallerySection}>
        <div className={styles.galleryHeaderRow}>
          <span className={styles.fieldLabel}>Additional Gallery Photographs ({gallery.length})</span>
          <span className={styles.hintText}>Captures of architecture, interiors, landscape, and rituals</span>
        </div>

        {/* Existing Gallery Grid */}
        {gallery.length > 0 && (
          <div className={styles.galleryGrid}>
            {gallery.map((item, idx) => {
              const url = typeof item === 'string' ? item : item.url;
              const caption = typeof item === 'string' ? `Photo #${idx + 1}` : item.caption;

              return (
                <div key={idx} className={styles.galleryCard}>
                  <img
                    src={url}
                    alt={caption || `Gallery ${idx + 1}`}
                    className={styles.galleryThumb}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className={styles.galleryMeta}>
                    <span className={styles.galleryCaption} title={caption}>{caption}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryItem(idx)}
                      className={styles.galleryRemoveBtn}
                      title="Remove from gallery"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Gallery Item Form */}
        <div className={styles.addGalleryBox}>
          <span className={styles.addGalleryTitle}>Add to Gallery</span>
          <div className={styles.addGalleryInputs}>
            <input
              type="text"
              placeholder="Image URL (https://... or /assets/...)"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Caption (e.g. Maha Darwaja, Evening Aarti)"
              value={newGalleryCaption}
              onChange={(e) => setNewGalleryCaption(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Alt text (for accessibility)"
              value={newGalleryAlt}
              onChange={(e) => setNewGalleryAlt(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.addGalleryActions}>
            <button
              type="button"
              onClick={handleAddGalleryItem}
              className={styles.btnSecondary}
              disabled={!newGalleryUrl.trim()}
            >
              + Add to Gallery
            </button>

            <label className={styles.uploadBtnSmall}>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={(e) => handleFileUpload(e.target.files[0], 'gallery')}
                disabled={isUploading}
                style={{ display: 'none' }}
              />
              <span>Upload Photo to Gallery</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
