import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminDestinationModal from '../../components/admin/AdminDestinationModal';
import AdminFestivalModal from '../../components/admin/AdminFestivalModal';
import AdminDeleteConfirmModal from '../../components/admin/AdminDeleteConfirmModal';
import styles from './AdminPages.module.css';

export default function AdminContentPage({ category = 'destinations' }) {
  const { role, adminProfile, isSuperAdmin, isContentManager } = useAdminAuth();

  const [destinations, setDestinations] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');

  // Modals
  const [destModalOpen, setDestModalOpen] = useState(false);
  const [festModalOpen, setFestModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);

  const isDest = category === 'destinations';
  const canDelete = isSuperAdmin || isContentManager;
  const canPublish = isSuperAdmin || isContentManager;

  useEffect(() => {
    const unsub = contentService.subscribe(({ destinations: dList, festivals: fList }) => {
      setDestinations(dList);
      setFestivals(fList);
    });
    contentService.getAllDestinations();
    contentService.getAllFestivals();
    return () => unsub();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const rawList = isDest ? destinations : festivals;

  const filteredList = rawList.filter(item => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (item.name && item.name.toLowerCase().includes(term)) ||
      (item.marathiName && item.marathiName.toLowerCase().includes(term)) ||
      (item.district && item.district.toLowerCase().includes(term));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = isDest
      ? (catFilter === 'all' || item.category === catFilter)
      : true;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    if (isDest) setDestModalOpen(true);
    else setFestModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    if (isDest) setDestModalOpen(true);
    else setFestModalOpen(true);
  };

  const handleSaveDestination = async (data) => {
    try {
      const saved = await contentService.saveDestination(data, adminProfile);
      showToast(`Destination "${saved.name}" successfully saved (${saved.status}). Synchronized with Supabase.`);
      setDestModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveFestival = async (data) => {
    try {
      const saved = await contentService.saveFestival(data, adminProfile);
      showToast(`Festival "${saved.name}" successfully saved (${saved.status}). Synchronized with Supabase.`);
      setFestModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleQuickStatusChange = async (item, newStatus) => {
    if (!canPublish && (newStatus === 'published' || newStatus === 'archived')) {
      alert('Permission Denied: Only Content Managers or Super Administrators can publish or archive records.');
      return;
    }

    try {
      if (isDest) {
        await contentService.saveDestination({ ...item, status: newStatus }, adminProfile);
      } else {
        await contentService.saveFestival({ ...item, status: newStatus }, adminProfile);
      }
      showToast(`Status of "${item.name}" updated to "${newStatus}".`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (isDest) {
        await contentService.deleteDestination(itemToDelete.id, role, adminProfile);
      } else {
        await contentService.deleteFestival(itemToDelete.id, role, adminProfile);
      }
      showToast(`Successfully deleted "${itemToDelete.name}" from ${isDest ? 'destinations' : 'festivals'}.`);
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusBadgeClass = (st) => {
    switch (st) {
      case 'published': return styles.active;
      case 'draft': return styles.draft;
      case 'under_review': return styles.content_manager;
      case 'archived': return styles.editor;
      default: return styles.draft;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>
            {isDest ? 'Destination Content Management' : 'Cultural Festival Management'}
          </h1>
          <span className={styles.pageSubtitle}>
            {isDest 
              ? 'Create, edit, photograph, and manage Maharashtra forts, temples, beaches, and heritage sites.' 
              : 'Create, edit, photograph, and manage annual state cultural festivals and celebrations.'}
          </span>
        </div>

        <button className={styles.actionBtnPrimary} onClick={handleOpenCreate}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Create New {isDest ? 'Destination' : 'Festival'}</span>
        </button>
      </div>

      {toastMessage && (
        <div className={styles.toastAlert}>
          {toastMessage}
        </div>
      )}

      <div className={styles.cardSection}>
        {/* Filters Bar */}
        <div className={styles.filterBar}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
            <input
              type="search"
              placeholder={`Search ${isDest ? 'destinations by name or district...' : 'festivals...'}`}
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '0.55rem', borderRadius: 6, border: '1px solid #CBDCEE', fontSize: '0.85rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="under_review">Under Review</option>
              <option value="archived">Archived</option>
            </select>

            {isDest && (
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                style={{ padding: '0.55rem', borderRadius: 6, border: '1px solid #CBDCEE', fontSize: '0.85rem' }}
              >
                <option value="all">All Categories</option>
                <option value="forts">Historic Forts</option>
                <option value="temples">Sacred Temples</option>
                <option value="beaches">Konkan Beaches</option>
                <option value="heritage">UNESCO Heritage</option>
              </select>
            )}
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Showing <strong>{filteredList.length}</strong> of {rawList.length} entries
          </div>
        </div>

        {/* Content Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Entry Name & Cover</th>
                <th>{isDest ? 'Category' : 'Timing / Dates'}</th>
                <th>District / Location</th>
                <th>Workflow Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                    No {isDest ? 'destinations' : 'festivals'} found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredList.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={item.heroImage || item.image || 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=120&q=80'}
                          alt={item.name}
                          style={{ width: 54, height: 38, objectFit: 'cover', borderRadius: 4, border: '1px solid #CBDCEE' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=120&q=80';
                          }}
                        />
                        <div>
                          <strong>{item.name}</strong>
                          {item.marathiName && (
                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                              {item.marathiName}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.editor}`}>
                        {item.category || item.dates || 'Cultural Event'}
                      </span>
                    </td>
                    <td>{item.district || item.location || 'Maharashtra'}</td>
                    <td>
                      <span className={`${styles.badge} ${getStatusBadgeClass(item.status)}`}>
                        {item.status ? item.status.replace('_', ' ') : 'published'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Initial Data'}
                    </td>
                    <td>
                      <div className={styles.actionCell}>
                        <button
                          className={styles.tableActionBtn}
                          onClick={() => handleOpenEdit(item)}
                          title="Edit full content record, photographs, and media"
                        >
                          Edit
                        </button>

                        {/* Workflow Fast-Action */}
                        {item.status === 'under_review' && canPublish && (
                          <button
                            className={styles.tableActionBtn}
                            style={{ background: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }}
                            onClick={() => handleQuickStatusChange(item, 'published')}
                            title="Approve and publish live"
                          >
                            Approve
                          </button>
                        )}

                        {item.status === 'published' && canPublish && (
                          <button
                            className={styles.tableActionBtn}
                            onClick={() => handleQuickStatusChange(item, 'archived')}
                            title="Move to archive"
                          >
                            Archive
                          </button>
                        )}

                        <button
                          className={styles.tableActionBtn}
                          disabled={!canDelete}
                          onClick={() => {
                            setItemToDelete(item);
                            setDeleteModalOpen(true);
                          }}
                          title={canDelete ? 'Permanently delete this entry' : 'Requires Content Manager or Super Admin role'}
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

      {/* Modals */}
      {isDest && (
        <AdminDestinationModal
          isOpen={destModalOpen}
          onClose={() => setDestModalOpen(false)}
          onSave={handleSaveDestination}
          destinationToEdit={editingItem}
        />
      )}

      {!isDest && (
        <AdminFestivalModal
          isOpen={festModalOpen}
          onClose={() => setFestModalOpen(false)}
          onSave={handleSaveFestival}
          festivalToEdit={editingItem}
        />
      )}

      <AdminDeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.name}
        itemType={isDest ? 'Destination' : 'Festival'}
      />
    </div>
  );
}
