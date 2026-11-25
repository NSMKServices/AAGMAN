/**
 * AAGMAN - Unified Content Management Service (Hardened & Audited)
 * Manages destinations, festivals, publication workflows, and executive analytics.
 * Connects to Supabase when live credentials exist and maintains local fallback synchronization.
 * Integrates comprehensive audit logging and robust error propagation.
 */
import { videoService } from './videoService';
import { auditService } from './auditService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DESTINATIONS_STORAGE_KEY = 'aagman_content_destinations';
const FESTIVALS_STORAGE_KEY = 'aagman_content_festivals';

const isUuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const makeUuid = () => globalThis.crypto?.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ch => {
  const random = Math.random() * 16 | 0;
  return (ch === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
});

function loadLocalContent(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const records = JSON.parse(raw);
    return Array.isArray(records) ? records.filter(item => item.lastEditedBy !== 'System Import') : [];
  } catch (e) {
    console.warn('Failed loading stored content:', e);
    return [];
  }
}

// Public content is sourced from Supabase only; browser storage is never a catalogue source.
let destinationsCache = [];
let festivalsCache = [];
const contentListeners = new Set();
let contentRealtimeChannel = null;

function startContentRealtime() {
  if (!isSupabaseConfigured || contentRealtimeChannel) return;
  contentRealtimeChannel = supabase
    .channel('aagman-public-content')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'destinations' }, () => {
      contentService.getAllDestinations().catch(error => console.error('Live destination refresh failed:', error));
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'festivals' }, () => {
      contentService.getAllFestivals().catch(error => console.error('Live festival refresh failed:', error));
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'destination_festivals' }, () => {
      notifyContentListeners();
    })
    .subscribe();
}

function saveLocalDestinations(data) {
  try {
    localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed saving destinations to storage:', e);
  }
}

function saveLocalFestivals(data) {
  try {
    localStorage.setItem(FESTIVALS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed saving festivals to storage:', e);
  }
}

function notifyContentListeners() {
  contentListeners.forEach(fn => fn({ destinations: destinationsCache, festivals: festivalsCache }));
}

export const contentService = {
  subscribe(fn) {
    contentListeners.add(fn);
    fn({ destinations: destinationsCache, festivals: festivalsCache });
    startContentRealtime();
    return () => {
      contentListeners.delete(fn);
      if (contentListeners.size === 0 && contentRealtimeChannel) {
        supabase.removeChannel(contentRealtimeChannel);
        contentRealtimeChannel = null;
      }
    };
  },

  // --------------------------------------------------------------------------
  // DESTINATIONS
  // --------------------------------------------------------------------------
  async getAllDestinations() {
    if (!isSupabaseConfigured) {
      destinationsCache = [];
      notifyContentListeners();
      return [];
    }
    const { data, error } = await supabase.from('destinations').select('*').order('name', { ascending: true });
    if (error) {
      destinationsCache = [];
      notifyContentListeners();
      throw new Error(`Database destinations query failed: ${error.message}`);
    }
    destinationsCache = (data || []).map(row => ({
      id: row.slug || row.id, slug: row.slug || row.id, dbId: row.id,
      name: row.name || '', marathiName: row.marathi_name || '', category: row.category || '',
      district: row.district || '', region: row.region || '', circuit: row.circuit || '',
      latitude: row.latitude ?? null, longitude: row.longitude ?? null,
      description: row.description || '', summary: row.description || '',
      heroImage: row.hero_image || row.image_url || '', image: row.hero_image || row.image_url || '',
      thumbnail: row.hero_image || row.image_url || '', gallery: row.gallery || [], highlights: row.highlights || [],
      attractions: row.highlights || [], bestTimeToVisit: row.best_time_to_visit || '',
      bestTime: row.best_time_to_visit || '', entryFee: row.entry_fee || '',
      featuredOrder: row.featured_order ?? null, status: row.status || 'draft',
      updatedAt: row.updated_at, lastEditedBy: row.last_edited_by || 'Editor'
    }));
    saveLocalDestinations(destinationsCache);
    notifyContentListeners();
    return destinationsCache;
  },

  getDestinationByIdOrSlug(idOrSlug) {
    if (!idOrSlug) return null;
    const key = idOrSlug.toLowerCase();
    return destinationsCache.find(d => 
      (d.id && d.id.toLowerCase() === key) || 
      (d.slug && d.slug.toLowerCase() === key)
    ) || null;
  },

  async saveDestination(destData, adminProfile) {
    if (!destData.name || !destData.name.trim()) {
      throw new Error('Destination name is required.');
    }

    if (!destData.category) {
      throw new Error('Destination category is required (forts, temples, beaches, heritage, nature, or wildlife).');
    }

    // RBAC check: Editors cannot publish directly
    const role = adminProfile?.role || 'editor';
    let targetStatus = destData.status || 'published';
    if (role === 'editor' && targetStatus === 'published') {
      targetStatus = 'under_review';
    }

    const generatedSlug = destData.slug 
      ? destData.slug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-')
      : destData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    const id = generatedSlug;
    const existingRecord = destinationsCache.find(d => d.id === destData.id || d.slug === generatedSlug);
    const dbId = destData.dbId || existingRecord?.dbId || (isUuid(destData.id) ? destData.id : null) || makeUuid();
    const isNew = !existingRecord;

    const now = new Date().toISOString();
    const editorName = adminProfile?.full_name || 'Administrator';

    const cleanRecord = {
      ...destData,
      id,
      dbId,
      slug: generatedSlug,
      name: destData.name.trim(),
      marathiName: destData.marathiName || '',
      category: destData.category,
      district: destData.district || 'Maharashtra',
      region: destData.region || 'Maharashtra',
      circuit: destData.circuit || '',
      description: destData.description || '',
      heroImage: destData.heroImage || destData.image || '',
      image: destData.heroImage || destData.image || '',
      gallery: Array.isArray(destData.gallery) ? destData.gallery : [],
      highlights: Array.isArray(destData.highlights) ? destData.highlights : [],
      bestTimeToVisit: destData.bestTimeToVisit || '',
      entryFee: destData.entryFee || 'Free entry',
      status: targetStatus,
      featuredOrder: destData.featuredOrder ? Number(destData.featuredOrder) : null,
      updatedAt: now,
      lastEditedBy: editorName
    };

    if (cleanRecord.featuredOrder && (!Number.isInteger(cleanRecord.featuredOrder) || cleanRecord.featuredOrder < 1 || cleanRecord.featuredOrder > 5)) {
      throw new Error('Homepage highlight position must be between 1 and 5.');
    }
    if (cleanRecord.featuredOrder && !['temples', 'forts', 'heritage', 'beaches'].includes(cleanRecord.category)) {
      throw new Error('Homepage highlights are available only for temples, forts, heritage sites and beaches.');
    }

    if (cleanRecord.featuredOrder && destinationsCache.some(item =>
      item.id !== cleanRecord.id &&
      item.category === cleanRecord.category &&
      Number(item.featuredOrder) === cleanRecord.featuredOrder
    )) {
      throw new Error(`Homepage position ${cleanRecord.featuredOrder} is already assigned in the ${cleanRecord.category} category. Choose another position or remove the existing highlight first.`);
    }

    // 1. Supabase Persistence (with strict error propagation)
    if (isSupabaseConfigured) {
      try {
        const payload = {
          id: cleanRecord.dbId,
          slug: cleanRecord.slug,
          name: cleanRecord.name,
          marathi_name: cleanRecord.marathiName,
          category: cleanRecord.category,
          district: cleanRecord.district,
          region: cleanRecord.region,
          latitude: cleanRecord.latitude,
          longitude: cleanRecord.longitude,
          circuit: cleanRecord.circuit,
          description: cleanRecord.description,
          hero_image: cleanRecord.heroImage,
          gallery: cleanRecord.gallery,
          highlights: cleanRecord.highlights,
          best_time_to_visit: cleanRecord.bestTimeToVisit,
          entry_fee: cleanRecord.entryFee,
          status: cleanRecord.status,
          featured_order: cleanRecord.featuredOrder,
          last_edited_by: cleanRecord.lastEditedBy,
          updated_at: now
        };

        const { error } = await supabase.from('destinations').upsert(payload, { onConflict: 'id' });
        if (error) {
          throw new Error(`Database synchronization failed: ${error.message}. Transaction cancelled to preserve data consistency.`);
        }
      } catch (err) {
        console.error('Supabase destination upsert error:', err);
        throw err;
      }
    }

    // 2. Local Cache Update
    if (isNew) {
      destinationsCache = [cleanRecord, ...destinationsCache];
    } else {
      destinationsCache = destinationsCache.map(d => d.id === id ? cleanRecord : d);
    }

    saveLocalDestinations(destinationsCache);
    notifyContentListeners();

    // 3. Audit Logging
    const actionName = isNew 
      ? 'DESTINATION_CREATE' 
      : (cleanRecord.status === 'published' ? 'DESTINATION_PUBLISH' : 'DESTINATION_UPDATE');

    await auditService.logAction({
      adminProfile,
      action: actionName,
      entityType: 'destination',
      entityId: cleanRecord.slug,
      details: {
        name: cleanRecord.name,
        category: cleanRecord.category,
        district: cleanRecord.district,
        status: cleanRecord.status
      }
    });

    return cleanRecord;
  },

  async deleteDestination(id, userRole, adminProfile) {
    if (userRole === 'editor') {
      throw new Error('Permission Denied: Editors cannot delete destination records. Contact a Content Manager or Super Admin.');
    }

    const target = destinationsCache.find(d => d.id === id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('destinations').delete().eq('id', target?.dbId || id);
        if (error) {
          throw new Error(`Database delete failed: ${error.message}.`);
        }
      } catch (err) {
        console.error('Supabase destination delete error:', err);
        throw err;
      }
    }

    destinationsCache = destinationsCache.filter(d => d.id !== id);
    saveLocalDestinations(destinationsCache);
    notifyContentListeners();

    // Audit Logging
    await auditService.logAction({
      adminProfile,
      action: 'DESTINATION_DELETE',
      entityType: 'destination',
      entityId: id,
      details: {
        deletedName: target?.name || id,
        deletedCategory: target?.category || 'unknown'
      }
    });

    return true;
  },

  // --------------------------------------------------------------------------
  // FESTIVALS
  // --------------------------------------------------------------------------
  async getAllFestivals() {
    if (!isSupabaseConfigured) {
      festivalsCache = [];
      notifyContentListeners();
      return [];
    }
    const { data, error } = await supabase.from('festivals').select('*').order('name', { ascending: true });
    if (error) {
      festivalsCache = [];
      notifyContentListeners();
      throw new Error(`Database festivals query failed: ${error.message}`);
    }
    festivalsCache = (data || []).map(row => ({
      id: row.slug || row.id, slug: row.slug || row.id, dbId: row.id,
      name: row.name || '', marathiName: row.marathi_name || '', dates: row.dates || '',
      location: row.location || '', district: row.district || '', description: row.description || '',
      image: row.image || '', gallery: row.gallery || [], significance: row.significance || '',
      highlights: row.highlights || [], featuredOrder: row.featured_order ?? null,
      status: row.status || 'draft', updatedAt: row.updated_at, lastEditedBy: row.last_edited_by || 'Editor'
    }));
    saveLocalFestivals(festivalsCache);
    notifyContentListeners();
    return festivalsCache;
  },

  async saveFestival(festData, adminProfile) {
    if (!festData.name || !festData.name.trim()) {
      throw new Error('Festival name is required.');
    }

    const role = adminProfile?.role || 'editor';
    let targetStatus = festData.status || 'published';
    if (role === 'editor' && targetStatus === 'published') {
      targetStatus = 'under_review';
    }

    const generatedSlug = festData.slug || festData.id || festData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const id = generatedSlug;
    const existingRecord = festivalsCache.find(f => f.id === festData.id || f.slug === generatedSlug);
    const dbId = festData.dbId || existingRecord?.dbId || (isUuid(festData.id) ? festData.id : null) || makeUuid();
    const isNew = !existingRecord;

    const now = new Date().toISOString();
    const editorName = adminProfile?.full_name || 'Administrator';

    const cleanRecord = {
      ...festData,
      id,
      dbId,
      slug: generatedSlug,
      name: festData.name.trim(),
      marathiName: festData.marathiName || '',
      dates: festData.dates || '',
      location: festData.location || '',
      district: festData.district || 'Maharashtra',
      description: festData.description || '',
      image: festData.image || '',
      gallery: Array.isArray(festData.gallery) ? festData.gallery : [],
      significance: festData.significance || '',
      highlights: Array.isArray(festData.highlights) ? festData.highlights : [],
      status: targetStatus,
      featuredOrder: festData.featuredOrder ? Number(festData.featuredOrder) : null,
      updatedAt: now,
      lastEditedBy: editorName
    };

    if (cleanRecord.featuredOrder && (!Number.isInteger(cleanRecord.featuredOrder) || cleanRecord.featuredOrder < 1 || cleanRecord.featuredOrder > 5)) {
      throw new Error('Festival highlight position must be between 1 and 5.');
    }

    if (cleanRecord.featuredOrder && festivalsCache.some(item =>
      item.id !== cleanRecord.id && Number(item.featuredOrder) === cleanRecord.featuredOrder
    )) {
      throw new Error(`Festival highlight position ${cleanRecord.featuredOrder} is already assigned. Choose another position or remove the existing highlight first.`);
    }

    if (isSupabaseConfigured) {
      try {
        const payload = {
          id: cleanRecord.dbId,
          slug: cleanRecord.slug,
          name: cleanRecord.name,
          marathi_name: cleanRecord.marathiName,
          dates: cleanRecord.dates,
          location: cleanRecord.location,
          district: cleanRecord.district,
          description: cleanRecord.description,
          image: cleanRecord.image,
          gallery: cleanRecord.gallery,
          significance: cleanRecord.significance,
          highlights: cleanRecord.highlights,
          status: cleanRecord.status,
          featured_order: cleanRecord.featuredOrder,
          last_edited_by: cleanRecord.lastEditedBy,
          updated_at: now
        };

        const { error } = await supabase.from('festivals').upsert(payload, { onConflict: 'id' });
        if (error) {
          throw new Error(`Database synchronization failed: ${error.message}. Transaction cancelled to preserve data consistency.`);
        }
      } catch (err) {
        console.error('Supabase festival upsert error:', err);
        throw err;
      }
    }

    if (isNew) {
      festivalsCache = [cleanRecord, ...festivalsCache];
    } else {
      festivalsCache = festivalsCache.map(f => f.id === id ? cleanRecord : f);
    }

    saveLocalFestivals(festivalsCache);
    notifyContentListeners();

    // Audit Logging
    const actionName = isNew 
      ? 'FESTIVAL_CREATE' 
      : (cleanRecord.status === 'published' ? 'FESTIVAL_PUBLISH' : 'FESTIVAL_UPDATE');

    await auditService.logAction({
      adminProfile,
      action: actionName,
      entityType: 'festival',
      entityId: cleanRecord.id,
      details: {
        name: cleanRecord.name,
        location: cleanRecord.location,
        status: cleanRecord.status
      }
    });

    return cleanRecord;
  },

  async deleteFestival(id, userRole, adminProfile) {
    if (userRole === 'editor') {
      throw new Error('Permission Denied: Editors cannot delete festival records. Contact a Content Manager or Super Admin.');
    }

    const target = festivalsCache.find(f => f.id === id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('festivals').delete().eq('id', target?.dbId || id);
        if (error) {
          throw new Error(`Database delete failed: ${error.message}.`);
        }
      } catch (err) {
        console.error('Supabase festival delete error:', err);
        throw err;
      }
    }

    festivalsCache = festivalsCache.filter(f => f.id !== id);
    saveLocalFestivals(festivalsCache);
    notifyContentListeners();

    // Audit Logging
    await auditService.logAction({
      adminProfile,
      action: 'FESTIVAL_DELETE',
      entityType: 'festival',
      entityId: id,
      details: {
        deletedName: target?.name || id
      }
    });

    return true;
  },

  /**
   * One-click approval transition from under_review to published
   */
  async approveContent(type, id, adminProfile) {
    if (adminProfile?.role === 'editor') {
      throw new Error('Unauthorized: Editors cannot approve or publish content.');
    }

    if (type === 'destination') {
      const item = destinationsCache.find(d => d.id === id || d.slug === id);
      if (!item) throw new Error('Destination not found');
      return this.saveDestination({ ...item, status: 'published' }, adminProfile);
    } else if (type === 'festival') {
      const item = festivalsCache.find(f => f.id === id);
      if (!item) throw new Error('Festival not found');
      return this.saveFestival({ ...item, status: 'published' }, adminProfile);
    }
  },

  // --------------------------------------------------------------------------
  // PLACE MANAGER: DESTINATION / FESTIVAL ASSOCIATIONS
  // --------------------------------------------------------------------------
  async getFestivalIdsForDestination(destinationId) {
    if (!isSupabaseConfigured) throw new Error('Place associations require the connected Supabase project.');
    const destination = destinationsCache.find(item => item.id === destinationId || item.slug === destinationId);
    const dbId = destination?.dbId || (isUuid(destinationId) ? destinationId : null);
    if (!dbId) throw new Error('Save this destination before associating festivals.');
    const { data, error } = await supabase
      .from('destination_festivals')
      .select('festival_id')
      .eq('destination_id', dbId);
    if (error) throw new Error(`Could not load associated festivals: ${error.message}`);
    return (data || []).map(row => {
      const festival = festivalsCache.find(item => item.dbId === row.festival_id);
      return festival?.id || row.festival_id;
    });
  },

  async setDestinationFestivals(destinationId, festivalIds = []) {
    if (!isSupabaseConfigured) throw new Error('Place associations require the connected Supabase project.');
    const destination = destinationsCache.find(item => item.id === destinationId || item.slug === destinationId);
    const dbId = destination?.dbId || (isUuid(destinationId) ? destinationId : null);
    if (!dbId) throw new Error('Save this destination before associating festivals.');
    const festivalDbIds = [...new Set(festivalIds)].map(id => {
      const festival = festivalsCache.find(item => item.id === id || item.slug === id || item.dbId === id);
      return festival?.dbId || (isUuid(id) ? id : null);
    }).filter(Boolean);
    const { data: existingLinks, error: readError } = await supabase
      .from('destination_festivals')
      .select('festival_id')
      .eq('destination_id', dbId);
    if (readError) throw new Error(`Could not read existing festival associations: ${readError.message}`);

    const existingIds = (existingLinks || []).map(row => row.festival_id);
    const idsToAdd = festivalDbIds.filter(id => !existingIds.includes(id));
    const idsToRemove = existingIds.filter(id => !festivalDbIds.includes(id));

    if (idsToAdd.length) {
      const rows = idsToAdd.map(festival_id => ({ destination_id: dbId, festival_id }));
      const { error } = await supabase.from('destination_festivals').insert(rows);
      if (error) throw new Error(`Could not save festival associations: ${error.message}`);
    }
    if (idsToRemove.length) {
      const { error } = await supabase.from('destination_festivals')
        .delete().eq('destination_id', dbId).in('festival_id', idsToRemove);
      if (error) throw new Error(`Could not remove festival associations: ${error.message}`);
    }
    return festivalIds;
  },

  // --------------------------------------------------------------------------
  // EXECUTIVE DASHBOARD & ADVANCED ANALYTICS CALCULATION
  // --------------------------------------------------------------------------
  async getDashboardMetrics({ dateRange = 'all' } = {}) {
    let destinations = await this.getAllDestinations();
    let festivals = await this.getAllFestivals();
    let videos = await videoService.getAllVideos();

    // Filter by Date Range if specified
    const now = Date.now();
    let rangeCutoff = 0;
    if (dateRange === '30d') rangeCutoff = now - (86400000 * 30);
    else if (dateRange === '90d') rangeCutoff = now - (86400000 * 90);
    else if (dateRange === 'year') rangeCutoff = now - (86400000 * 365);

    if (rangeCutoff > 0) {
      destinations = destinations.filter(d => new Date(d.updatedAt || 0).getTime() >= rangeCutoff);
      festivals = festivals.filter(f => new Date(f.updatedAt || 0).getTime() >= rangeCutoff);
      videos = videos.filter(v => new Date(v.updatedAt || 0).getTime() >= rangeCutoff);
    }

    // 1. Destination Statistics
    const destPublished = destinations.filter(d => d.status === 'published').length;
    const destDraft = destinations.filter(d => d.status === 'draft').length;
    const destReview = destinations.filter(d => d.status === 'under_review').length;
    const destArchived = destinations.filter(d => d.status === 'archived').length;

    // 2. Festival Statistics
    const festPublished = festivals.filter(f => f.status === 'published').length;
    const festDraft = festivals.filter(f => f.status === 'draft').length;
    const festReview = festivals.filter(f => f.status === 'under_review').length;
    const festArchived = festivals.filter(f => f.status === 'archived').length;

    // 3. Overall Content Publication Ratios
    const totalContent = destinations.length + festivals.length;
    const totalPublished = destPublished + festPublished;
    const totalDraft = destDraft + festDraft;
    const totalUnderReview = destReview + festReview;
    const totalArchived = destArchived + festArchived;

    const publishedPct = totalContent > 0 ? Math.round((totalPublished / totalContent) * 100) : 0;
    const draftPct = totalContent > 0 ? Math.round((totalDraft / totalContent) * 100) : 0;
    const reviewPct = totalContent > 0 ? Math.round((totalUnderReview / totalContent) * 100) : 0;

    // 4. Destination Category Distribution
    const categories = ['forts', 'temples', 'beaches', 'heritage', 'nature', 'wildlife'];
    const categoryCounts = categories.map(cat => {
      const matched = destinations.filter(d => (d.category || '').toLowerCase() === cat);
      return {
        category: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: matched.length,
        percentage: destinations.length > 0 ? Math.round((matched.length / destinations.length) * 100) : 0,
        published: matched.filter(m => m.status === 'published').length,
        draft: matched.filter(m => m.status !== 'published').length
      };
    });

    // 5. Geographic District Distribution (Top 6 Districts in Maharashtra)
    const districtMap = {};
    destinations.forEach(d => {
      const dist = d.district || 'Unassigned';
      districtMap[dist] = (districtMap[dist] || 0) + 1;
    });
    const districtDistribution = Object.entries(districtMap)
      .map(([district, count]) => ({
        district,
        count,
        percentage: destinations.length > 0 ? Math.round((count / destinations.length) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // 6. Media Library & Coverage Statistics
    const totalCoverPhotos = [
      ...destinations.filter(d => Boolean(d.heroImage || d.image)),
      ...festivals.filter(f => Boolean(f.image))
    ].length;

    let totalGalleryPhotos = 0;
    let destinationsWithGallery = 0;
    destinations.forEach(d => {
      if (Array.isArray(d.gallery) && d.gallery.length > 0) {
        totalGalleryPhotos += d.gallery.length;
        destinationsWithGallery += 1;
      }
    });

    const galleryCoveragePct = destinations.length > 0
      ? Math.round((destinationsWithGallery / destinations.length) * 100)
      : 0;

    // 7. YouTube Video Statistics
    const totalVideos = videos.length;
    const activeVideos = videos.filter(v => v.isActive).length;
    const featuredVideos = videos.filter(v => v.isFeatured).length;
    const destLinkedVideos = videos.filter(v => Boolean(v.destinationId || v.destination)).length;
    const festLinkedVideos = videos.filter(v => Boolean(v.festivalId)).length;

    // 8. Pending Approval Queue Items
    const approvalQueue = [
      ...destinations.filter(d => d.status === 'under_review').map(d => ({
        id: d.id,
        type: 'destination',
        title: d.name,
        category: d.category,
        submitter: d.lastEditedBy || 'Editor',
        updatedAt: d.updatedAt
      })),
      ...festivals.filter(f => f.status === 'under_review').map(f => ({
        id: f.id,
        type: 'festival',
        title: f.name,
        category: 'Cultural Festival',
        submitter: f.lastEditedBy || 'Editor',
        updatedAt: f.updatedAt
      }))
    ];

    // 9. Content Health Index
    const missingCoverImages = [
      ...destinations.filter(d => !d.heroImage && !d.image),
      ...festivals.filter(f => !f.image)
    ].length;

    const destinationsWithoutVideo = destinations.filter(d => {
      const associated = videoService.getVideosForDestination(d.id, d.name);
      return associated.length === 0;
    }).length;

    const thinDescriptions = [
      ...destinations.filter(d => !d.description || d.description.length < 60),
      ...festivals.filter(f => !f.description || f.description.length < 60)
    ].length;

    // 10. Recent Content Updates
    const allUpdates = [
      ...destinations.map(d => ({ type: 'Destination', id: d.id, name: d.name, category: d.category, status: d.status, updatedAt: d.updatedAt, editor: d.lastEditedBy })),
      ...festivals.map(f => ({ type: 'Festival', id: f.id, name: f.name, category: 'Cultural Festival', status: f.status, updatedAt: f.updatedAt, editor: f.lastEditedBy })),
      ...videos.map(v => ({ type: 'Video', id: v.id, name: v.title, category: v.category, status: v.isActive ? 'Active' : 'Inactive', updatedAt: v.updatedAt, editor: v.creator }))
    ].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)).slice(0, 8);

    return {
      dateRange,
      totalDestinations: destinations.length,
      publishedDestinations: destPublished,
      draftDestinations: destDraft,
      underReviewDestinations: destReview,
      archivedDestinations: destArchived,

      totalFestivals: festivals.length,
      publishedFestivals: festPublished,
      draftFestivals: festDraft,
      underReviewFestivals: festReview,
      archivedFestivals: festArchived,

      totalContent,
      lifecycle: {
        published: totalPublished,
        draft: totalDraft,
        underReview: totalUnderReview,
        archived: totalArchived,
        publishedPct,
        draftPct,
        reviewPct
      },

      categories: categoryCounts,
      districts: districtDistribution,

      media: {
        totalCoverPhotos,
        totalGalleryPhotos,
        destinationsWithGallery,
        galleryCoveragePct
      },

      videos: {
        total: totalVideos,
        active: activeVideos,
        featured: featuredVideos,
        linkedToDestinations: destLinkedVideos,
        linkedToFestivals: festLinkedVideos
      },

      approvalQueue,
      pendingApprovals: approvalQueue.length,
      recentUpdates: allUpdates,

      health: {
        missingCoverImages,
        destinationsWithoutVideo,
        thinDescriptions
      }
    };
  }
};
