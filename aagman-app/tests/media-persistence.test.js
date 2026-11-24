import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import { DESTINATIONS } from '../src/data/destinations.js';
import { FESTIVALS } from '../src/data/festivals.js';
import { extractYouTubeId, isValidYouTubeUrl, normalizeYouTubeUrl } from '../src/utils/youtubeValidator.js';

test('YouTube validator accepts supported HTTPS YouTube URL forms', () => {
  for (const url of [
    'https://www.youtube.com/watch?v=abcdefghijk',
    'https://youtu.be/abcdefghijk',
    'https://m.youtube.com/watch?v=abcdefghijk',
    'https://www.youtube.com/shorts/abcdefghijk',
    'https://www.youtube.com/embed/abcdefghijk'
  ]) {
    assert.equal(isValidYouTubeUrl(url), true, url);
    assert.equal(extractYouTubeId(url), 'abcdefghijk');
    assert.equal(normalizeYouTubeUrl(url), 'https://www.youtube.com/watch?v=abcdefghijk');
  }
});

test('YouTube validator rejects lookalike hosts, non-HTTPS and malformed URLs', () => {
  for (const url of [
    'https://youtube.com.evil.example/watch?v=abcdefghijk',
    'https://evil.example/youtube.com/watch?v=abcdefghijk',
    'http://www.youtube.com/watch?v=abcdefghijk',
    'https://www.youtube.com/watch?v=short',
    'https://www.youtube.com.evil.example/abcdefghijk',
    'not a url'
  ]) {
    assert.equal(isValidYouTubeUrl(url), false, url);
    assert.equal(extractYouTubeId(url), null);
  }
});

test('catalogue migration seeds every destination and festival without overwriting existing records', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261126120000_content_catalogue_media_sync.sql', import.meta.url),
    'utf8'
  );
  assert.match(migration, /on conflict \(slug\) do nothing/i);
  for (const item of DESTINATIONS) {
    assert.ok(migration.includes(`'${item.id}'`), `Missing destination slug ${item.id}`);
    assert.ok(migration.includes(`'${item.name.replaceAll("'", "''")}'`), `Missing destination ${item.id}`);
  }
  for (const item of FESTIVALS) {
    assert.ok(migration.includes(`'${item.id}'`), `Missing festival slug ${item.id}`);
    assert.ok(migration.includes(`'${item.name.replaceAll("'", "''")}'`), `Missing festival ${item.id}`);
  }
});

test('media uploads cannot report temporary object URLs as saved media', async () => {
  const mediaManager = await readFile(
    new URL('../src/components/admin/MediaManager.jsx', import.meta.url),
    'utf8'
  );
  assert.doesNotMatch(mediaManager, /URL\.createObjectURL/);
  assert.match(mediaManager, /\.upload\(filePath, file/);
  assert.match(mediaManager, /upsert:\s*false/);
  assert.match(mediaManager, /multiple/);
  assert.match(mediaManager, /entitySlug/);
  assert.match(mediaManager, /setUploadError/);
});

test('media schema uses a JSON gallery for both content types and stores video slug associations', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261126120000_content_catalogue_media_sync.sql', import.meta.url),
    'utf8'
  );
  assert.match(migration, /alter column gallery type jsonb/i);
  assert.match(migration, /add column if not exists gallery jsonb/i);
  assert.match(migration, /add column if not exists destination_slug text/i);
  assert.match(migration, /add column if not exists festival_slug text/i);
});

test('content service keeps public slugs separate from database UUIDs', async () => {
  const service = await readFile(
    new URL('../src/services/contentService.js', import.meta.url),
    'utf8'
  );
  assert.match(service, /dbId:\s*row\.id/);
  assert.match(service, /id:\s*row\.slug/);
  assert.match(service, /id:\s*cleanRecord\.dbId/);
  assert.match(service, /onConflict:\s*'id'/);
});

test('video service uses the database as production source of truth and preserves offline catalogue', async () => {
  const service = await readFile(
    new URL('../src/services/videoService.js', import.meta.url),
    'utf8'
  );
  assert.match(service, /if \(isSupabaseConfigured\) return \[\]/);
  assert.match(service, /return CURATED_VIDEOS\.map/);
  assert.match(service, /destination_slug:/);
  assert.match(service, /festival_slug:/);
  assert.match(service, /Database videos query failed/);
});

test('admin function grants preserve RLS checks while removing public RPC access', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261127120000_admin_function_privileges.sql', import.meta.url),
    'utf8'
  );
  assert.match(migration, /revoke all on function public\.handle_new_user\(\) from public, anon, authenticated/i);
  assert.match(migration, /revoke all on function private\.has_admin_role\(text\) from public, anon, authenticated/i);
  assert.match(migration, /grant execute on function private\.is_admin\(\) to anon, authenticated/i);
  assert.match(migration, /grant execute on function private\.has_admin_role\(text\) to authenticated/i);
  assert.match(migration, /set search_path = ''/i);
  assert.match(migration, /create schema if not exists private/i);
});

test('RLS optimization keeps auth ownership checks in scalar subqueries', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261128120000_rls_policy_performance.sql', import.meta.url),
    'utf8'
  );
  assert.match(migration, /\(select auth\.uid\(\)\)/i);
  assert.match(migration, /Admins can update permitted admin profiles/i);
  assert.match(migration, /private\.is_admin\(\)/i);
  assert.match(migration, /private\.has_admin_role/i);
  assert.match(migration, /revoke all on function public\.is_admin\(\) from public, anon, authenticated/i);
});
