import React, { useState, useEffect } from 'react';
import { videoService } from '../../services/videoService';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminVideoModal from '../../components/admin/AdminVideoModal';
import AdminDeleteConfirmModal from '../../components/admin/AdminDeleteConfirmModal';
import styles from './AdminPages.module.css';

export default function AdminVideosPage() {
  const { adminProfile, isSuperAdmin, isContentManager } = useAdminAuth();
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const canDelete = isSuperAdmin || isContentManager;

  useEffect(() => {
    const unsub = videoService.subscribe((list) => {
      setVideos(list);
    });
    return () => unsub();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredVideos = videos.filter(v => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (v.title && v.title.toLowerCase().includes(term)) ||
      (v.destination && v.destination.toLowerCase().includes(term)) ||
      (v.district && v.district.toLowerCase().includes(term));
    const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingVideo(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditingVideo(v);
    setIsModalOpen(true);
  };

  const handleSaveVideo = async (videoData) => {
    try {
      if (videoData.id) {
        await videoService.updateVideo(videoData.id, videoData, adminProfile);
        showToast(`Video "${videoData.title}" updated successfully.`);
      } else {
        await videoService.createVideo(videoData, adminProfile);
        showToast(`New YouTube documentary "${videoData.title}" added to directory.`);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirmDelete = async () => {
    if (!videoToDelete) return;
    try {
      await videoService.deleteVideo(videoToDelete.id, adminProfile);
      showToast(`Video "${videoToDelete.title}" deleted.`);
      setDeleteModalOpen(false);
      setVideoToDelete(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>YouTube Video & Media Directory</h1>
          <span className={styles.pageSubtitle}>
            Official video documentaries linking to external YouTube pages • No embeds, safe external links.
          </span>
        </div>

        <button className={styles.actionBtnPrimary} onClick={handleOpenAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add YouTube Video</span>
        </button>
      </div>

      {toastMessage && (
        <div className={styles.toastAlert}>
          {toastMessage}
        </div>
      )}

      <div className={styles.cardSection}>
        <div className={styles.filterBar}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
            <input
              type="search"
              placeholder="Search videos by title or destination..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className={styles.selectFilter}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: '0.55rem', borderRadius: 6, border: '1px solid #CBDCEE', fontSize: '0.85rem' }}
            >
              <option value="all">All Categories</option>
              <option value="forts">Historic Forts</option>
              <option value="temples">Sacred Temples</option>
              <option value="beaches">Konkan Beaches</option>
              <option value="heritage">UNESCO Heritage</option>
            </select>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Showing <strong>{filteredVideos.length}</strong> of {videos.length} videos
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Video & Title</th>
                <th>Category</th>
                <th>Destination / Festival</th>
                <th>External YouTube Link</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                    No videos found matching your search.
                  </td>
                </tr>
              ) : (
                filteredVideos.map(video => (
                  <tr key={video.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          style={{ width: 64, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid #CBDCEE' }}
                        />
                        <div>
                          <strong>{video.title}</strong>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                            {video.creator} • {video.duration}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.editor}`}>
                        {video.category}
                      </span>
                    </td>
                    <td>
                      <strong>{video.destination || 'General Maharashtra'}</strong>
                    </td>
                    <td>
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1D68BD', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        title="Open on YouTube in new tab"
                      >
                        <span>Watch on YouTube</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${video.isActive ? styles.active : styles.draft}`}>
                        {video.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {video.isFeatured && (
                        <span className={`${styles.badge} ${styles.super_admin}`} style={{ marginLeft: 4 }}>
                          Featured
                        </span>
                      )}
                    </td>
                    <td>
                      <div className={styles.actionCell}>
                        <button
                          className={styles.tableActionBtn}
                          onClick={() => handleOpenEdit(video)}
                          title="Edit video record"
                        >
                          Edit
                        </button>
                        <button
                          className={styles.tableActionBtn}
                          onClick={() => {
                            setVideoToDelete(video);
                            setDeleteModalOpen(true);
                          }}
                          disabled={!canDelete}
                          title={canDelete ? 'Delete video' : 'Requires Content Manager or Super Admin role'}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminVideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVideo}
        videoToEdit={editingVideo}
      />

      <AdminDeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={videoToDelete?.title}
        itemType="Video Documentary"
      />
    </div>
  );
}
