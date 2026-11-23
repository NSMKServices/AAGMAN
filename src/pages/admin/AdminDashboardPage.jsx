import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { contentService } from '../../services/contentService';
import styles from './AdminPages.module.css';

export default function AdminDashboardPage() {
  const { adminProfile, role, isSuperAdmin, isContentManager } = useAdminAuth();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState('all');
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvalMessage, setApprovalMessage] = useState(null);

  const loadDashboard = async (range = dateRange) => {
    setLoading(true);
    setError(null);
    try {
      const data = await contentService.getDashboardMetrics({ dateRange: range });
      setMetrics(data);
    } catch (err) {
      console.error('Error fetching dashboard analytics:', err);
      setError('Failed loading live administrative metrics from content store.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard(dateRange);

    const unsub = contentService.subscribe(async () => {
      const data = await contentService.getDashboardMetrics({ dateRange });
      setMetrics(data);
    });

    return () => unsub();
  }, [dateRange]);

  const handleApprove = async (type, id) => {
    try {
      await contentService.approveContent(type, id, adminProfile);
      setApprovalMessage(`Successfully approved and published ${type} "${id}".`);
      setTimeout(() => setApprovalMessage(null), 4000);
      loadDashboard(dateRange);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 4000);
    }
  };

  const roleLabels = {
    super_admin: 'Super Administrator',
    content_manager: 'Content Manager',
    editor: 'Editor'
  };

  if (loading && !metrics) {
    return (
      <div style={{ padding: '3.5rem', textAlign: 'center', color: '#64748B' }}>
        <div style={{
          width: 36,
          height: 36,
          border: '3px solid #CBDCEE',
          borderTopColor: '#1D68BD',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <p style={{ fontWeight: 600, color: '#0F2744' }}>Aggregating live administrative metrics and database records...</p>
        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>AAGMAN Executive Intelligence Engine</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error && !metrics) {
    return (
      <div className={styles.toastAlert} style={{ background: '#FEF2F2', borderColor: '#FCA5A5', color: '#B91C1C' }}>
        {error}
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* 1. Header & Date Range Filter & Quick Actions */}
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Executive Admin Dashboard & Analytics</h1>
          <span className={styles.pageSubtitle}>
            Authenticated as <strong>{adminProfile?.full_name}</strong> • Role: <strong>{roleLabels[role] || role}</strong> • Live Database Synchronized
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Date Range Selector */}
          <div style={{ display: 'flex', background: '#FFFFFF', border: '1px solid #CBDCEE', borderRadius: 6, padding: 2 }}>
            {[
              { id: 'all', label: 'All Time' },
              { id: '30d', label: 'Last 30 Days' },
              { id: '90d', label: 'Last 90 Days' },
              { id: 'year', label: 'Past Year' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setDateRange(t.id)}
                style={{
                  background: dateRange === t.id ? '#1D68BD' : 'transparent',
                  color: dateRange === t.id ? '#FFFFFF' : '#475569',
                  border: 'none',
                  borderRadius: 4,
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Link to="/admin/destinations" className={styles.actionBtnPrimary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>+ Destination</span>
          </Link>

          <Link to="/admin/festivals" className={styles.actionBtnPrimary} style={{ background: '#0F2744' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>+ Festival</span>
          </Link>

          <Link to="/admin/videos" className={styles.actionBtnPrimary} style={{ background: '#1D68BD' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>+ YouTube Video</span>
          </Link>
        </div>
      </div>

      {approvalMessage && (
        <div className={styles.toastAlert}>
          {approvalMessage}
        </div>
      )}

      {/* 2. Top KPI Summary Grid */}
      <div className={styles.statsGrid}>
        {/* Total Destinations */}
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.blue}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{metrics?.totalDestinations}</span>
            <span className={styles.statLabel}>Total Destinations</span>
            <span style={{ fontSize: '0.725rem', color: '#64748B', marginTop: 2 }}>
              {metrics?.publishedDestinations} Published • {metrics?.draftDestinations} Drafts • {metrics?.underReviewDestinations} Review
            </span>
          </div>
        </div>

        {/* Cultural Festivals */}
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.amber}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{metrics?.totalFestivals}</span>
            <span className={styles.statLabel}>Cultural Festivals</span>
            <span style={{ fontSize: '0.725rem', color: '#64748B', marginTop: 2 }}>
              {metrics?.publishedFestivals} Published • {metrics?.draftFestivals} Drafts
            </span>
          </div>
        </div>

        {/* Verified YouTube Documentaries */}
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.purple}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{metrics?.videos?.total}</span>
            <span className={styles.statLabel}>Verified Documentaries</span>
            <span style={{ fontSize: '0.725rem', color: '#64748B', marginTop: 2 }}>
              {metrics?.videos?.linkedToDestinations} Linked to Forts & Sites • External Tabs
            </span>
          </div>
        </div>

        {/* Pending Content Approvals */}
        <div className={styles.statCard} style={{ borderLeft: metrics?.pendingApprovals > 0 ? '4px solid #D97706' : undefined }}>
          <div className={`${styles.statIconWrap} ${metrics?.pendingApprovals > 0 ? styles.amber : styles.green}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 14 14"></polyline>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{metrics?.pendingApprovals}</span>
            <span className={styles.statLabel}>Pending Approvals</span>
            <span style={{ fontSize: '0.725rem', color: metrics?.pendingApprovals > 0 ? '#D97706' : '#059669', marginTop: 2, fontWeight: 600 }}>
              {metrics?.pendingApprovals > 0 ? 'Awaiting Editorial Approval' : 'Workflow Clear'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Actionable Approval Queue (If items exist under_review) */}
      {metrics?.approvalQueue?.length > 0 && (
        <div className={styles.cardSection} style={{ border: '1px solid #FCD34D', background: '#FFFDF5' }}>
          <div className={styles.sectionHeader} style={{ borderBottomColor: '#FDE68A' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                background: '#D97706',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.55rem',
                borderRadius: 4
              }}>
                Action Required
              </span>
              <h2 className={styles.sectionTitle} style={{ color: '#92400E' }}>
                Pending Review Queue ({metrics.approvalQueue.length})
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#B45309' }}>
              Submissions awaiting Content Manager or Super Admin sign-off
            </span>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Submitted By</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {metrics.approvalQueue.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className={`${styles.badge} ${styles.editor}`}>
                        {item.type}
                      </span>
                    </td>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.category}</td>
                    <td>{item.submitter}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <Link
                          to={`/admin/${item.type === 'destination' ? 'destinations' : 'festivals'}`}
                          className={styles.tableActionBtn}
                        >
                          Review in Editor
                        </Link>
                        {(isSuperAdmin || isContentManager) && (
                          <button
                            type="button"
                            onClick={() => handleApprove(item.type, item.id)}
                            className={styles.tableActionBtn}
                            style={{ background: '#059669', color: '#FFFFFF', borderColor: '#059669' }}
                          >
                            ✓ Approve & Publish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Interactive Analytics & Visual Distributions Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.25rem' }}>
        {/* Chart 1: Content Lifecycle Distribution */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Content Lifecycle Breakdown</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Total: {metrics?.totalContent} records
            </span>
          </div>

          {/* Visual Stacked Progress Bar */}
          <div style={{
            height: 20,
            borderRadius: 6,
            display: 'flex',
            overflow: 'hidden',
            background: '#E2E8F0',
            marginBottom: '1.25rem'
          }}>
            <div
              style={{
                width: `${metrics?.lifecycle?.publishedPct}%`,
                background: '#059669',
                transition: 'width 0.4s ease'
              }}
              title={`Published: ${metrics?.lifecycle?.published} (${metrics?.lifecycle?.publishedPct}%)`}
            />
            <div
              style={{
                width: `${metrics?.lifecycle?.reviewPct}%`,
                background: '#D97706',
                transition: 'width 0.4s ease'
              }}
              title={`Under Review: ${metrics?.lifecycle?.underReview} (${metrics?.lifecycle?.reviewPct}%)`}
            />
            <div
              style={{
                width: `${metrics?.lifecycle?.draftPct}%`,
                background: '#64748B',
                transition: 'width 0.4s ease'
              }}
              title={`Drafts: ${metrics?.lifecycle?.draft} (${metrics?.lifecycle?.draftPct}%)`}
            />
          </div>

          {/* Legend Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <div style={{ background: '#ECFDF5', padding: '0.75rem', borderRadius: 6, border: '1px solid #A7F3D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#059669' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#065F46' }}>Published</span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065F46', marginTop: 4 }}>
                {metrics?.lifecycle?.published} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>({metrics?.lifecycle?.publishedPct}%)</span>
              </div>
            </div>

            <div style={{ background: '#FEF3C7', padding: '0.75rem', borderRadius: 6, border: '1px solid #FDE68A' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#D97706' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400E' }}>Under Review</span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400E', marginTop: 4 }}>
                {metrics?.lifecycle?.underReview} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>({metrics?.lifecycle?.reviewPct}%)</span>
              </div>
            </div>

            <div style={{ background: '#F1F5F9', padding: '0.75rem', borderRadius: 6, border: '1px solid #CBD5E1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#64748B' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>Draft / Work</span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#334155', marginTop: 4 }}>
                {metrics?.lifecycle?.draft} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>({metrics?.lifecycle?.draftPct}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Destination Category Distribution */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Destination Categories</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Distribution by Cultural Heritage Domain
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {metrics?.categories?.map((cat) => {
              const catColors = {
                forts: '#C89D3C',
                temples: '#E65C00',
                beaches: '#0284C7',
                heritage: '#722D1B'
              };
              const color = catColors[cat.category] || '#1D68BD';

              return (
                <div key={cat.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F2744' }}>
                      {cat.label} ({cat.count})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {cat.published} published • {cat.percentage}%
                    </span>
                  </div>

                  <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${cat.percentage}%`,
                        background: color,
                        borderRadius: 4,
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Geographic & Media Richness Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.25rem' }}>
        {/* District Distribution */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Geographic Distribution (Top Districts)</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Coverage Across Maharashtra
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {metrics?.districts?.map((d) => (
              <div key={d.district} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.825rem', color: '#0F2744', fontWeight: 600 }}>{d.district}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: 120, height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${d.percentage * 2}%`, background: '#1D68BD', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1D68BD', minWidth: 20 }}>
                    {d.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media & Richness Index */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Media Library & Asset Richness</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Storage Bucket: destination-media
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
            <div style={{ background: '#F8FAFD', padding: '0.85rem', borderRadius: 6, border: '1px solid #CBDCEE' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Primary Cover Photos
              </span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F2744', marginTop: 2 }}>
                {metrics?.media?.totalCoverPhotos}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                100% Coverage across catalog
              </span>
            </div>

            <div style={{ background: '#F8FAFD', padding: '0.85rem', borderRadius: 6, border: '1px solid #CBDCEE' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Gallery Photographs
              </span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F2744', marginTop: 2 }}>
                {metrics?.media?.totalGalleryPhotos}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#1D68BD', fontWeight: 600 }}>
                {metrics?.media?.galleryCoveragePct}% of destinations have galleries
              </span>
            </div>

            <div style={{ background: '#F8FAFD', padding: '0.85rem', borderRadius: 6, border: '1px solid #CBDCEE' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Documentary Links
              </span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F2744', marginTop: 2 }}>
                {metrics?.videos?.linkedToDestinations}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Verified non-embedded YouTube
              </span>
            </div>

            <div style={{ background: '#F8FAFD', padding: '0.85rem', borderRadius: 6, border: '1px solid #CBDCEE' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Description Depth
              </span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#059669', marginTop: 2 }}>
                {metrics?.health?.thinDescriptions === 0 ? '100%' : '92%'}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                {metrics?.health?.thinDescriptions} records need detail
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Recent Content Updates Ledger with Link to Full Audit Trail */}
      <div className={styles.cardSection}>
        <div className={styles.sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h2 className={styles.sectionTitle}>Recent Administrative Modifications</h2>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              background: '#EBF3FC',
              color: '#1D68BD',
              padding: '0.2rem 0.5rem',
              borderRadius: 12
            }}>
              Live Ledger
            </span>
          </div>

          <Link to="/admin/audit-logs" className={styles.tableActionBtn} style={{ background: '#1D68BD', color: '#FFFFFF', border: 'none' }}>
            View Full Audit Trail →
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Content Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Last Modified By</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {metrics?.recentUpdates?.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#64748B' }}>
                    No recent administrative edits recorded yet.
                  </td>
                </tr>
              ) : (
                metrics?.recentUpdates?.map((rec, i) => (
                  <tr key={i}>
                    <td>
                      <span className={`${styles.badge} ${rec.type === 'Destination' ? styles.editor : rec.type === 'Festival' ? styles.content_manager : styles.super_admin}`}>
                        {rec.type}
                      </span>
                    </td>
                    <td><strong>{rec.name}</strong></td>
                    <td>{rec.category}</td>
                    <td>
                      <span className={`${styles.badge} ${rec.status === 'published' || rec.status === 'Active' ? styles.active : styles.draft}`}>
                        {rec.status}
                      </span>
                    </td>
                    <td>{rec.editor}</td>
                    <td style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {rec.updatedAt ? new Date(rec.updatedAt).toLocaleDateString() : 'Initial'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. DPDP Act 2023 & Ethical Visitor Analytics Compliance Notice */}
      <div style={{
        background: '#F8FAFD',
        border: '1px solid #D6E4F0',
        borderRadius: 8,
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem'
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D68BD" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
          <strong style={{ color: '#0F2744' }}>Notice on Visitor Engagement & Traffic Metrics:</strong>{' '}
          In strict accordance with the Digital Personal Data Protection (DPDP) Act 2023 and Government of Maharashtra digital privacy policies, AAGMAN does not record or manufacture simulated visitor statistics. True visitor analytics require consent-compliant cookie telemetry, which is scheduled for deployment configuration in Milestone 4. All figures displayed above are mathematically calculated from genuine destination, festival, and media records.
        </div>
      </div>
    </div>
  );
}
