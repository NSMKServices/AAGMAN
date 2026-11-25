import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import { CURATED_VIDEOS } from '../src/data/videos.js';

test('bundled public video catalogue is empty and backend-managed', () => {
  assert.deepEqual(CURATED_VIDEOS, []);
});

test('the historical seed migration is not used as a runtime catalogue fallback', async () => {
  const service = await readFile(
    new URL('../src/services/videoService.js', import.meta.url),
    'utf8'
  );
  assert.doesNotMatch(service, /CURATED_VIDEOS/);
  assert.match(service, /function loadStoredVideos\(\)[\s\S]*?return \[\]/);
  assert.match(service, /from\('videos'\)/);
});
