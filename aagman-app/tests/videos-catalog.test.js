import test from 'node:test';
import assert from 'node:assert/strict';
import { CURATED_VIDEOS } from '../src/data/videos.js';

test('curated video records use unique YouTube IDs and canonical URLs', () => {
  const ids = CURATED_VIDEOS.map(video => video.youtubeId);
  assert.equal(new Set(ids).size, ids.length, 'YouTube IDs must not be reused for different destinations');

  for (const video of CURATED_VIDEOS) {
    const url = new URL(video.youtubeUrl);
    assert.equal(url.hostname, 'www.youtube.com');
    assert.equal(url.pathname, '/watch');
    assert.equal(url.searchParams.get('v'), video.youtubeId, `${video.id} URL must match its YouTube ID`);
    assert.match(video.thumbnail, new RegExp(`img\\.youtube\\.com/vi/${video.youtubeId}/`));
  }
});

test('every curated video has English, Marathi and Hindi display content', () => {
  for (const video of CURATED_VIDEOS) {
    for (const field of ['title', 'destination', 'summary']) {
      assert.ok(video[field]?.trim(), `${video.id} is missing ${field}`);
      assert.ok(video[`${field}Mr`]?.trim(), `${video.id} is missing Marathi ${field}`);
      assert.ok(video[`${field}Hi`]?.trim(), `${video.id} is missing Hindi ${field}`);
    }
  }
});

test('curated video catalogue does not invent unverified durations', () => {
  for (const video of CURATED_VIDEOS) {
    assert.equal(video.duration, 'Video', `${video.id} should use a neutral duration until verified`);
  }
});
