import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import styles from './MediaManager.module.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function safePathPart(value) {
  return String(value || 'unassigned')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'unassigned';
}

export default function MediaManager({
  coverImage = '',
  onCoverImageChange,
  gallery = [],
  onGalleryChange,
  entityType = 'destination',
  entitySlug = '',
  label = 'Content Photographs & Media'
}) {
  const [coverUrlInput, setCoverUrlInput] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [newGalleryAlt, setNewGalleryAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleFileUpload = async (fileList, targetType) => {
    const files = Array.from(fileList || []).filter(Boolean);
    if (!files.length) return;
    setUploadError(null);
    setUploadSuccess(null);

    if (!isSupabaseConfigured) {
      setUploadError('Photo uploads require the connected Supabase project. No temporary preview was saved.');
      return;
    }
    if (!entitySlug || !String(entitySlug).trim()) {
      setUploadError('Save the destination or festival name first, then upload its photographs.');
      return;
    }
    if (targetType === 'cover' && files.length > 1) {
      setUploadError('Choose one cover photograph at a time.');
      return;
    }

    const invalid = files.find(file => !ALLOWED_TYPES.has(file.type));
    if (invalid) {
      setUploadError('Unsupported image format. Use JPEG, PNG or WebP.');
      return;
    }
    const oversized = files.find(file => file.size > MAX_FILE_SIZE);
    if (oversized) {
      setUploadError(`${oversized.name} exceeds the 5MB upload limit.`);
      return;
    }

    setIsUploading(true);
    const uploadedEntries = [];
    try {
      for (const file of files) {
        const extension = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp';
        const entityPath = `${safePathPart(entityType)}/${safePathPart(entitySlug)}`;
        const filePath = `${entityPath}/${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage
          .from('destination-media')
          .upload(filePath, file, {
            cacheControl: '31536000',
            contentType: file.type,
            upsert: false
          });
        if (error) throw new Error(`Upload failed for ${file.name}: ${error.message}`);

        const { data } = supabase.storage.from('destination-media').getPublicUrl(filePath);
        if (!data?.publicUrl || !/^https:\/\//i.test(data.publicUrl)) {
          throw new Error(`Could not obtain a permanent public URL for ${file.name}.`);
        }
        uploadedEntries.push({
          url: data.publicUrl,
          caption: newGalleryCaption.trim() || file.name.replace(/\.[^.]+$/, ''),
          alt: newGalleryAlt.trim() || file.name.replace(/\.[^.]+$/, '')
        });
      }

      if (targetType === 'cover') {
        onCoverImageChange(uploadedEntries[0].url);
      } else {
        onGalleryChange([...gallery, ...uploadedEntries]);
        setNewGalleryUrl('');
        setNewGalleryCaption('');
        setNewGalleryAlt('');
      }
      setUploadSuccess(`${uploadedEntries.length} photograph${uploadedEntries.length === 1 ? '' : 's'} uploaded to permanent storage. Save the record to publish the changes.`);
    } catch (error) {
      console.error('Supabase media upload failed:', error);
      setUploadError(error.message || 'Photo upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyCoverUrl = (e) => {
    e.preventDefault();
    const value = coverUrlInput.trim();
    if (!/^https:\/\//i.test(value) && !value.startsWith('/assets/')) {
      setUploadError('Enter a valid HTTPS image URL or a local /assets/ path.');
      return;
    }
    onCoverImageChange(value);
    setCoverUrlInput('');
  };

  const handleAddGalleryItem = (e) => {
    e.preventDefault();
    const value = newGalleryUrl.trim();
    if (!/^https:\/\//i.test(value) && !value.startsWith('/assets/')) {
      setUploadError('Enter a valid HTTPS image URL or a local /assets/ path.');
      return;
    }
    onGalleryChange([...gallery, {
      url: value,
      caption: newGalleryCaption.trim() || 'Gallery photograph',
      alt: newGalleryAlt.trim() || 'Cultural documentation image'
    }]);
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
      {uploadError && <div className={styles.alertError} role="alert"><span>{uploadError}</span></div>}
      {uploadSuccess && <div className={styles.alertSuccess} role="status"><span>{uploadSuccess}</span></div>}

      <div className={styles.coverSection}>
        <span className={styles.fieldLabel}>Primary Cover Photograph</span>
        <div className={styles.coverPreviewCard}>
          <div className={styles.coverImageWrap}>
            {coverImage ? (
              <img src={coverImage} alt="Cover preview" className={styles.coverImage} />
            ) : (
              <div className={styles.placeholderBox}>
                <span>No cover image assigned</span>
              </div>
            )}
          </div>
          <div className={styles.coverControls}>
            <div className={styles.urlInputRow}>
              <input type="text" placeholder="Paste HTTPS image URL or /assets/..." value={coverUrlInput}
                onChange={e => setCoverUrlInput(e.target.value)} className={styles.input} />
              <button type="button" onClick={handleApplyCoverUrl} className={styles.btnSecondary}>Set URL</button>
            </div>
            <div className={styles.uploadRow}>
              <label className={styles.uploadBtn}>
                <input type="file" accept="image/jpeg,image/png,image/webp"
                  onChange={e => { handleFileUpload(e.target.files, 'cover'); e.target.value = ''; }}
                  disabled={isUploading} style={{ display: 'none' }} />
                <span>{isUploading ? 'Uploading...' : 'Upload New Cover (5MB Max)'}</span>
              </label>
              {coverImage && <button type="button" onClick={() => onCoverImageChange('')} className={styles.removeBtn}>Remove Cover</button>}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gallerySection}>
        <div className={styles.galleryHeaderRow}>
          <span className={styles.fieldLabel}>Additional Gallery Photographs ({gallery.length})</span>
          <span className={styles.hintText}>Captures of architecture, interiors, landscape and rituals</span>
        </div>
        {gallery.length > 0 && (
          <div className={styles.galleryGrid}>
            {gallery.map((item, idx) => {
              const url = typeof item === 'string' ? item : item.url;
              const caption = typeof item === 'string' ? `Photo #${idx + 1}` : item.caption;
              return (
                <div key={url || idx} className={styles.galleryCard}>
                  <img src={url} alt={typeof item === 'string' ? caption : (item.alt || caption || 'Gallery photograph')} className={styles.galleryThumb} />
                  <div className={styles.galleryMeta}>
                    <span className={styles.galleryCaption} title={caption}>{caption}</span>
                    <button type="button" onClick={() => handleRemoveGalleryItem(idx)} className={styles.galleryRemoveBtn} title="Remove from gallery">✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.addGalleryBox}>
          <span className={styles.addGalleryTitle}>Add to Gallery</span>
          <div className={styles.addGalleryInputs}>
            <input type="text" placeholder="Image URL (https://... or /assets/...)" value={newGalleryUrl}
              onChange={e => setNewGalleryUrl(e.target.value)} className={styles.input} />
            <input type="text" placeholder="Caption" value={newGalleryCaption}
              onChange={e => setNewGalleryCaption(e.target.value)} className={styles.input} />
            <input type="text" placeholder="Alt text (for accessibility)" value={newGalleryAlt}
              onChange={e => setNewGalleryAlt(e.target.value)} className={styles.input} />
          </div>
          <div className={styles.addGalleryActions}>
            <button type="button" onClick={handleAddGalleryItem} className={styles.btnSecondary} disabled={!newGalleryUrl.trim()}>+ Add to Gallery</button>
            <label className={styles.uploadBtnSmall}>
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple
                onChange={e => { handleFileUpload(e.target.files, 'gallery'); e.target.value = ''; }}
                disabled={isUploading} style={{ display: 'none' }} />
              <span>{isUploading ? 'Uploading...' : 'Upload Photos to Gallery'}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
