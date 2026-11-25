/**
 * AAGMAN - YouTube Video Service (Hardened & Audited)
 * Manages video records, association with destinations & festivals, and validation.
 * Operates against Supabase when available with strict error checks and audit logging.
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { extractYouTubeId, isValidYouTubeUrl, getYouTubeThumbnail, normalizeYouTubeUrl } from '../utils/youtubeValidator';
import { auditService } from './auditService';

const STORAGE_KEY = 'aagman_custom_videos';

// The database stores destination_id and festival_id as UUIDs. The built-in
// catalogue uses readable slug IDs, so only real UUID values may be persisted
// in those foreign-key columns. Names remain available for display/matching.
const isUuid = value => typeof value === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

function loadStoredVideos() {
  // The public catalogue starts empty. Videos are supplied by the backend.
  if (isSupabaseConfigured) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      if (Array.isArray(stored)) return stored;
    }
  } catch (e) {
    console.warn('Failed loading stored videos:', e);
  }
  return [];
}

function saveStoredVideos(videos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  } catch (e) {
    console.warn('Failed saving videos to localStorage:', e);
  }
}

// In-memory cache
let videoCache = loadStoredVideos();
const listeners = new Set();

function notifyListeners() {
  listeners.forEach(fn => fn(videoCache));
}

export const videoService = {
  subscribe(fn) {
    listeners.add(fn);
    fn(videoCache);
    return () => listeners.delete(fn);
  },

  async getAllVideos() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw new Error(`Database videos query failed: ${error.message}`);
        videoCache = (data || []).map(row => ({
          id: row.id,
          title: row.title,
          youtubeUrl: row.youtube_url,
          youtubeId: row.youtube_id,
          description: row.description || '',
          thumbnail: row.thumbnail_url || getYouTubeThumbnail(row.youtube_id),
          destination: row.destination_name || row.destination_slug || row.destination_id || '',
          destinationId: row.destination_slug || row.destination_id,
          festivalId: row.festival_slug || row.festival_id,
          destinationDbId: row.destination_id,
          festivalDbId: row.festival_id,
          category: row.category || 'heritage',
          district: row.district || 'Maharashtra',
          duration: row.duration || 'Video',
          creator: row.creator || 'AAGMAN Heritage Series',
          isActive: row.is_active ?? true,
          isFeatured: row.is_featured ?? false,
          updatedAt: row.updated_at
        }));
        saveStoredVideos(videoCache);
        notifyListeners();
        return videoCache;
      } catch (err) {
        console.error('Supabase videos query failed:', err);
        throw err;
      }
    }
    return videoCache;
  },

  getVideosForDestination(destId, destName) {
    const targetId = (destId || '').toLowerCase();
    const targetName = (destName || '').toLowerCase();

    return videoCache.filter(v => {
      if (!v.isActive) return false;
      if (v.destinationId && v.destinationId.toLowerCase() === targetId) return true;
      if (v.destination && (v.destination.toLowerCase() === targetName || v.destination.toLowerCase().includes(targetId))) return true;
      return false;
    });
  },

  getVideosForFestival(festId, festName) {
    const targetId = (festId || '').toLowerCase();
    const targetName = (festName || '').toLowerCase();

    return videoCache.filter(v => {
      if (!v.isActive) return false;
      if (v.festivalId && v.festivalId.toLowerCase() === targetId) return true;
      if (v.title && targetName && v.title.toLowerCase().includes(targetName)) return true;
      return false;
    });
  },

  async createVideo(input, adminProfile = null) {
    const { title, youtubeUrl, description, destinationId, destinationName, festivalId, category, district, duration, creator, isFeatured, isActive } = input;

    // 1. Validation
    if (!title || !title.trim()) {
      throw new Error('Video title is required.');
    }

    if (!youtubeUrl || !isValidYouTubeUrl(youtubeUrl)) {
      throw new Error('Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=... or https://youtu.be/...).');
    }

    const youtubeId = extractYouTubeId(youtubeUrl);
    const normalizedUrl = normalizeYouTubeUrl(youtubeUrl);

    // 2. Duplicate Check
    const exists = videoCache.some(v => v.youtubeId === youtubeId);
    if (exists) {
      throw new Error('A video record with this exact YouTube URL/ID already exists in the catalog.');
    }

    if (isSupabaseConfigured) {
      const { data: duplicate, error: duplicateError } = await supabase
        .from('videos')
        .select('id')
        .eq('youtube_id', youtubeId)
        .maybeSingle();
      if (duplicateError) throw new Error(`Could not verify duplicate YouTube video: ${duplicateError.message}`);
      if (duplicate) throw new Error('A video record with this exact YouTube URL/ID already exists in the database.');
    }

    const newVideo = {
      id: `vid-${Date.now()}`,
      title: title.trim(),
      youtubeUrl: normalizedUrl,
      youtubeId,
      thumbnail: input.thumbnail || getYouTubeThumbnail(youtubeId, 'hqdefault'),
      description: (description || '').trim(),
      destination: destinationName || destinationId || '',
      destinationId: destinationId || null,
      destinationDbId: isUuid(destinationId) ? destinationId : null,
      festivalId: festivalId || null,
      festivalDbId: isUuid(festivalId) ? festivalId : null,
      category: category || 'heritage',
      district: district || 'Maharashtra',
      duration: duration || 'Video',
      creator: creator || 'AAGMAN Official Contributor',
      isFeatured: Boolean(isFeatured),
      isActive: isActive !== false,
      updatedAt: new Date().toISOString()
    };

    // 3. Supabase insert with error verification
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('videos')
          .insert({
            id: newVideo.id,
            title: newVideo.title,
            youtube_url: newVideo.youtubeUrl,
            youtube_id: newVideo.youtubeId,
            description: newVideo.description,
            thumbnail_url: newVideo.thumbnail,
            destination_id: newVideo.destinationDbId || null,
            destination_slug: newVideo.destinationId || null,
            destination_name: newVideo.destination,
            festival_id: newVideo.festivalDbId || null,
            festival_slug: newVideo.festivalId || null,
            category: newVideo.category,
            district: newVideo.district,
            duration: newVideo.duration,
            creator: newVideo.creator,
            is_featured: newVideo.isFeatured,
            is_active: newVideo.isActive
          })
          .select()
          .single();

        if (error) {
          throw new Error(`Database video insert failed: ${error.message}. Transaction cancelled.`);
        }

        if (data) {
          newVideo.id = data.id;
        }
      } catch (err) {
        console.error('Supabase video insert error:', err);
        throw err;
      }
    }

    // 4. Update memory cache and local storage
    videoCache = [newVideo, ...videoCache];
    saveStoredVideos(videoCache);
    notifyListeners();

    // 5. Audit Logging
    await auditService.logAction({
      adminProfile,
      action: 'VIDEO_CREATE',
      entityType: 'video',
      entityId: newVideo.id,
      details: {
        title: newVideo.title,
        youtubeId: newVideo.youtubeId,
        destinationId: newVideo.destinationId
      }
    });

    return newVideo;
  },

  async updateVideo(id, updates, adminProfile = null) {
    const existing = videoCache.find(v => v.id === id);
    if (!existing) {
      throw new Error(`Video with ID "${id}" not found.`);
    }

    let youtubeId = existing.youtubeId;
    let normalizedUrl = existing.youtubeUrl;
    let thumbnail = updates.thumbnail || existing.thumbnail;

    if (updates.youtubeUrl && updates.youtubeUrl !== existing.youtubeUrl) {
      if (!isValidYouTubeUrl(updates.youtubeUrl)) {
        throw new Error('Please enter a valid YouTube URL.');
      }
      youtubeId = extractYouTubeId(updates.youtubeUrl);
      normalizedUrl = normalizeYouTubeUrl(updates.youtubeUrl);
      if (!updates.thumbnail) {
        thumbnail = getYouTubeThumbnail(youtubeId, 'hqdefault');
      }
    }

    if (isSupabaseConfigured && youtubeId !== existing.youtubeId) {
      const { data: duplicate, error: duplicateError } = await supabase
        .from('videos')
        .select('id')
        .eq('youtube_id', youtubeId)
        .neq('id', id)
        .maybeSingle();
      if (duplicateError) throw new Error(`Could not verify duplicate YouTube video: ${duplicateError.message}`);
      if (duplicate) throw new Error('Another video record already uses this YouTube URL/ID.');
    }

    const updated = {
      ...existing,
      ...updates,
      destination: updates.destinationName || updates.destination || existing.destination,
      youtubeUrl: normalizedUrl,
      youtubeId,
      thumbnail,
      updatedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('videos')
          .upsert({
            id,
            title: updated.title,
            youtube_url: updated.youtubeUrl,
            youtube_id: updated.youtubeId,
            description: updated.description,
            thumbnail_url: updated.thumbnail,
            destination_id: updated.destinationDbId || (isUuid(updated.destinationId) ? updated.destinationId : null),
            destination_slug: isUuid(updated.destinationId) ? null : (updated.destinationId || null),
            destination_name: updated.destination,
            festival_id: updated.festivalDbId || (isUuid(updated.festivalId) ? updated.festivalId : null),
            festival_slug: isUuid(updated.festivalId) ? null : (updated.festivalId || null),
            category: updated.category,
            district: updated.district,
            duration: updated.duration || 'Video',
            creator: updated.creator || 'AAGMAN Official Contributor',
            is_featured: updated.isFeatured,
            is_active: updated.isActive,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });

        if (error) {
          throw new Error(`Database video update failed: ${error.message}.`);
        }
      } catch (err) {
        console.error('Supabase video update error:', err);
        throw err;
      }
    }

    videoCache = videoCache.map(v => v.id === id ? updated : v);
    saveStoredVideos(videoCache);
    notifyListeners();

    // Audit Logging
    await auditService.logAction({
      adminProfile,
      action: 'VIDEO_UPDATE',
      entityType: 'video',
      entityId: id,
      details: {
        title: updated.title,
        isActive: updated.isActive
      }
    });

    return updated;
  },

  async deleteVideo(id, adminProfile = null) {
    const target = videoCache.find(v => v.id === id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('videos')
          .delete()
          .eq('id', id);

        if (error) {
          throw new Error(`Database video delete failed: ${error.message}.`);
        }
      } catch (err) {
        console.error('Supabase video delete error:', err);
        throw err;
      }
    }

    videoCache = videoCache.filter(v => v.id !== id);
    saveStoredVideos(videoCache);
    notifyListeners();

    // Audit Logging
    await auditService.logAction({
      adminProfile,
      action: 'VIDEO_DELETE',
      entityType: 'video',
      entityId: id,
      details: {
        deletedTitle: target?.title || id
      }
    });

    return true;
  }
};
