import React, { useState, useEffect, useMemo } from 'react';
import { auditService } from '../../services/auditService';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from './AdminPages.module.css';

export default function AdminAuditLogsPage() {
  const { adminProfile, role, isSuperAdmin } = useAdminAuth();

  const [logs, setLogs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const pageSize = 15;

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const result = await auditService.getLogs({
        search,
        action: selectedAction,
        entityType: selectedEntity,
        startDate,
        endDate,
        page: currentPage,
        limit: pageSize
      });

      setLogs(result.logs);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Failed fetching audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [search, selectedAction, selectedEntity, startDate, endDate, currentPage]);

  const handleExportJson = () => {
    const jsonStr = auditService.exportLogsAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aagman-audit-trail-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return '—';
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return isoString;
    }
  };

  const getActionBadgeClass = (action = '') => {
    if (action.includes('PUBLISH') || action.includes('LOGIN')) return styles.super_admin;
    if (action.includes('UPDATE') || action.includes('CHANGE')) return styles.content_manager;
    if (action.includes('DELETE') || action.includes('DEACTIVATE')) return styles.draft;
    return styles.editor;
  };

  return (
    <div className={styles.pageContainer}>
      {/* 1. Header & Quick Actions */}
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Administrative Activity & Audit Trail</h1>
          <span className={styles.pageSubtitle}>
            Append-only tamper-evident logs for administrative actions, content lifecycle, and system security events.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportJson}
            className={styles.actionBtnPrimary}
            style={{ background: '#0F2744' }}
            title="Export sanitized audit trail in JSON format"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Export Audit Trail (JSON)</span>
          </button>
        </div>
      </div>

      {/* Security Immutable Notice Banner */}
      <div style={{
        background: '#F0F9FF',
        border: '1px solid #BAE6FD',
        borderRadius: 8,
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        color: '#0369A1',
        fontSize: '0.825rem'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <div>
          <strong>Cryptographic Append-Only Integrity:</strong> In accordance with Maharashtra e-Governance security standards, audit records cannot be edited or deleted by any administrative role. All entries are timestamped and linked to verified administrator IDs.
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className={styles.cardSection} style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <input
              type="text"
              placeholder="Search by action, administrator, entity ID, or details..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className={styles.searchInput}
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          {/* Action Filter */}
          <select
            value={selectedAction}
            onChange={(e) => { setSelectedAction(e.target.value); setCurrentPage(1); }}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 6,
              border: '1px solid #CBDCEE',
              fontSize: '0.85rem',
              color: '#0F2744',
              background: '#FFFFFF',
              outline: 'none'
            }}
          >
            <option value="">All Action Types</option>
            <option value="AUTH_LOGIN">Login Event (AUTH_LOGIN)</option>
            <option value="AUTH_LOGOUT">Logout Event (AUTH_LOGOUT)</option>
            <option value="DESTINATION_CREATE">Destination Create</option>
            <option value="DESTINATION_UPDATE">Destination Update</option>
            <option value="DESTINATION_PUBLISH">Destination Publish</option>
            <option value="DESTINATION_DELETE">Destination Delete</option>
            <option value="FESTIVAL_CREATE">Festival Create</option>
            <option value="FESTIVAL_UPDATE">Festival Update</option>
            <option value="FESTIVAL_DELETE">Festival Delete</option>
            <option value="VIDEO_CREATE">Video Create</option>
            <option value="VIDEO_UPDATE">Video Update</option>
            <option value="VIDEO_DELETE">Video Delete</option>
            <option value="MEDIA_UPLOAD">Media Upload</option>
            <option value="MEDIA_DELETE">Media Delete</option>
            <option value="USER_ROLE_CHANGE">Admin Role Change</option>
            <option value="USER_STATUS_CHANGE">Admin Status Change</option>
            <option value="SETTINGS_UPDATE">Settings Modified</option>
          </select>

          {/* Entity Filter */}
          <select
            value={selectedEntity}
            onChange={(e) => { setSelectedEntity(e.target.value); setCurrentPage(1); }}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 6,
              border: '1px solid #CBDCEE',
              fontSize: '0.85rem',
              color: '#0F2744',
              background: '#FFFFFF',
              outline: 'none'
            }}
          >
            <option value="">All Entities</option>
            <option value="destination">Destinations</option>
            <option value="festival">Festivals</option>
            <option value="video">Videos</option>
            <option value="media">Media Storage</option>
            <option value="user">Admin Accounts</option>
            <option value="settings">System Settings</option>
            <option value="auth">Authentication</option>
          </select>

          {/* Date Range Inputs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
              title="From date"
              style={{
                padding: '0.5rem 0.65rem',
                borderRadius: 6,
                border: '1px solid #CBDCEE',
                fontSize: '0.8rem',
                color: '#0F2744'
              }}
            />
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }}
              title="To date"
              style={{
                padding: '0.5rem 0.65rem',
                borderRadius: 6,
                border: '1px solid #CBDCEE',
                fontSize: '0.8rem',
                color: '#0F2744'
              }}
            />
            {(startDate || endDate || search || selectedAction || selectedEntity) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedAction('');
                  setSelectedEntity('');
                  setStartDate('');
                  setEndDate('');
                  setCurrentPage(1);
                }}
                className={styles.tableActionBtn}
                title="Reset all filters"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className={styles.cardSection}>
        <div className={styles.sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h2 className={styles.sectionTitle}>Recorded Audit Events</h2>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              background: '#EBF3FC',
              color: '#1D68BD',
              padding: '0.2rem 0.5rem',
              borderRadius: 12
            }}>
              {totalCount} events logged
            </span>
          </div>

          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
            Showing page {currentPage} of {totalPages}
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748B' }}>
            <div style={{
              width: 32,
              height: 32,
              border: '3px solid #CBDCEE',
              borderTopColor: '#1D68BD',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 0.75rem'
            }} />
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Retrieving authenticated audit trail...</p>
          </div>
        ) : logs.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBDCEE" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h3 style={{ margin: '0 0 0.5rem', color: '#0F2744', fontSize: '1.05rem' }}>No Audit Records Found</h3>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              No operations matched your specified filter criteria. Try adjusting your search query or date range.
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Target ID</th>
                  <th>Administrator</th>
                  <th>IP / Origin</th>
                  <th style={{ textAlign: 'right' }}>Payload</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', color: '#475569' }}>
                      {formatTimestamp(log.created_at)}
                    </td>

                    <td>
                      <span className={`${styles.badge} ${getActionBadgeClass(log.action)}`}>
                        {log.action}
                      </span>
                    </td>

                    <td>
                      <span style={{
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        color: '#0F2744'
                      }}>
                        {log.entity_type}
                      </span>
                    </td>

                    <td>
                      <code style={{
                        background: '#F1F5F9',
                        padding: '0.15rem 0.4rem',
                        borderRadius: 4,
                        fontSize: '0.775rem',
                        color: '#334155'
                      }}>
                        {log.entity_id || '—'}
                      </code>
                    </td>

                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ fontSize: '0.825rem', color: '#0F2744' }}>{log.admin_name}</strong>
                        <span style={{ fontSize: '0.725rem', color: '#64748B' }}>{log.admin_email}</span>
                      </div>
                    </td>

                    <td style={{ fontSize: '0.775rem', color: '#64748B', whiteSpace: 'nowrap' }}>
                      {log.ip_address || 'Internal'}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedLog(log)}
                        className={styles.tableActionBtn}
                        style={{ background: '#EBF3FC', color: '#1D68BD', border: '1px solid #CBDCEE' }}
                      >
                        Inspect Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            borderTop: '1px solid #EDF2F7',
            marginTop: '1rem',
            flexWrap: 'wrap',
            gap: '0.85rem'
          }}>
            <span style={{ fontSize: '0.825rem', color: '#64748B' }}>
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} events
            </span>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={styles.tableActionBtn}
              >
                Previous
              </button>

              <span style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.825rem',
                fontWeight: 700,
                color: '#0F2744',
                background: '#F1F5F9',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center'
              }}>
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={styles.tableActionBtn}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inspect Detail Modal */}
      {selectedLog && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(11, 27, 51, 0.65)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 10,
            width: '100%',
            maxWidth: 640,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 40px rgba(11, 27, 51, 0.25)',
            border: '1px solid #CBDCEE'
          }}>
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0F2744' }}>
                  Audit Event Details
                </h3>
                <span style={{ fontSize: '0.775rem', color: '#64748B' }}>
                  Log Entry ID: <code>{selectedLog.id}</code>
                </span>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  color: '#64748B'
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                <div style={{ background: '#F8FAFD', padding: '0.65rem 0.85rem', borderRadius: 6, border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Action</span>
                  <div style={{ fontWeight: 700, color: '#0F2744', marginTop: 2 }}>{selectedLog.action}</div>
                </div>

                <div style={{ background: '#F8FAFD', padding: '0.65rem 0.85rem', borderRadius: 6, border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Entity Type</span>
                  <div style={{ fontWeight: 700, color: '#0F2744', marginTop: 2 }}>{selectedLog.entity_type} ({selectedLog.entity_id})</div>
                </div>

                <div style={{ background: '#F8FAFD', padding: '0.65rem 0.85rem', borderRadius: 6, border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Administrator</span>
                  <div style={{ fontWeight: 700, color: '#0F2744', marginTop: 2 }}>{selectedLog.admin_name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{selectedLog.admin_email}</div>
                </div>

                <div style={{ background: '#F8FAFD', padding: '0.65rem 0.85rem', borderRadius: 6, border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Recorded At</span>
                  <div style={{ fontWeight: 700, color: '#0F2744', marginTop: 2 }}>{formatTimestamp(selectedLog.created_at)}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>IP: {selectedLog.ip_address}</div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.775rem', fontWeight: 700, color: '#475569' }}>Sanitized JSON Details Payload:</span>
                  <button
                    onClick={() => handleCopyId(JSON.stringify(selectedLog.details, null, 2))}
                    className={styles.tableActionBtn}
                  >
                    {copiedId ? '✓ Copied' : 'Copy JSON'}
                  </button>
                </div>
                <pre style={{
                  background: '#0F1E36',
                  color: '#93C5FD',
                  padding: '1rem',
                  borderRadius: 6,
                  fontSize: '0.8rem',
                  overflowX: 'auto',
                  margin: 0,
                  fontFamily: 'Consolas, Monaco, monospace',
                  lineHeight: 1.45
                }}>
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>

              {selectedLog.user_agent && (
                <div style={{ fontSize: '0.725rem', color: '#64748B' }}>
                  <strong>Client User-Agent:</strong> {selectedLog.user_agent}
                </div>
              )}
            </div>

            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'flex-end',
              background: '#F8FAFD'
            }}>
              <button
                onClick={() => setSelectedLog(null)}
                className={styles.actionBtnPrimary}
                style={{ background: '#64748B' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
