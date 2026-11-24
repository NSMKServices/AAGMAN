/**
 * Strict YouTube URL validation and thumbnail helpers.
 * Accepts canonical watch, short, shorts and embed URLs only on YouTube hosts.
 */
const VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;
const ALLOWED_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtu.be']);

export function extractYouTubeId(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' || !ALLOWED_HOSTS.has(url.hostname.toLowerCase())) return null;

  let id = null;
  if (url.hostname.toLowerCase().endsWith('youtu.be')) {
    id = url.pathname.split('/').filter(Boolean)[0] || null;
  } else if (url.pathname === '/watch') {
    id = url.searchParams.get('v');
  } else {
    const parts = url.pathname.split('/').filter(Boolean);
    if (['embed', 'shorts', 'live'].includes(parts[0])) id = parts[1] || null;
  }
  return id && VIDEO_ID.test(id) ? id : null;
}

export function isValidYouTubeUrl(url) {
  return extractYouTubeId(url) !== null;
}

export function getYouTubeThumbnail(videoIdOrUrl, quality = 'hqdefault') {
  const videoId = extractYouTubeId(videoIdOrUrl) ||
    (typeof videoIdOrUrl === 'string' && VIDEO_ID.test(videoIdOrUrl) ? videoIdOrUrl : null);
  if (!videoId) return null;
  const safeQuality = ['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'].includes(quality)
    ? quality
    : 'hqdefault';
  return `https://img.youtube.com/vi/${videoId}/${safeQuality}.jpg`;
}

export function normalizeYouTubeUrl(url) {
  const videoId = extractYouTubeId(url);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
}
