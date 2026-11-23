/**
 * AAGMAN - YouTube Video Validator & Utilities
 * Validates YouTube URLs, extracts 11-character video IDs, and generates safe thumbnail links.
 * Strictly adheres to platform guidelines: NO embedded players, NO YouTube API calls.
 */

// Strict regex matching all standard YouTube URL formats:
// - https://www.youtube.com/watch?v=XXXXXXXXXXX
// - https://m.youtube.com/watch?v=XXXXXXXXXXX
// - https://youtube.com/watch?v=XXXXXXXXXXX
// - https://youtu.be/XXXXXXXXXXX
// - https://www.youtube.com/shorts/XXXXXXXXXXX
// - https://www.youtube.com/embed/XXXXXXXXXXX
const YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&][^\s]*)?/;

/**
 * Extracts 11-character YouTube video ID from a URL.
 * Returns null if the URL is invalid.
 */
export function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const match = trimmed.match(YOUTUBE_REGEX);
  return match && match[1] && match[1].length === 11 ? match[1] : null;
}

/**
 * Checks if a given string is a valid YouTube URL.
 */
export function isValidYouTubeUrl(url) {
  return extractYouTubeId(url) !== null;
}

/**
 * Generates an official YouTube high-definition image thumbnail link.
 * Quality options: 'hqdefault' (480x360), 'mqdefault' (320x180), 'maxresdefault' (1280x720)
 */
export function getYouTubeThumbnail(videoIdOrUrl, quality = 'hqdefault') {
  const videoId = extractYouTubeId(videoIdOrUrl) || (typeof videoIdOrUrl === 'string' && videoIdOrUrl.length === 11 ? videoIdOrUrl : null);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Normalizes any valid YouTube URL into standard canonical format:
 * https://www.youtube.com/watch?v=XXXXXXXXXXX
 */
export function normalizeYouTubeUrl(url) {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/watch?v=${videoId}`;
}
