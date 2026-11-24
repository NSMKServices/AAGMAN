import { readFile } from 'node:fs/promises';
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
    for (const field of ['title', 'destination', 'summary', 'district', 'duration']) {
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

test('database seed migration matches the curated video IDs and YouTube URLs', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261125120000_seed_curated_youtube_videos.sql', import.meta.url),
    'utf8'
  );

  for (const video of CURATED_VIDEOS) {
    assert.ok(migration.includes(`'${video.id}'`), `seed migration is missing ${video.id}`);
    assert.ok(migration.includes(`'${video.youtubeId}'`), `seed migration is missing YouTube ID ${video.youtubeId}`);
    assert.ok(migration.includes(`'${video.youtubeUrl}'`), `seed migration is missing URL for ${video.id}`);
  }
});
