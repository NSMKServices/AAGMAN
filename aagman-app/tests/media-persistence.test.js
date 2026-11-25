import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
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

test('content migration prepares media columns without seeding sample destinations or festivals', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261126120000_content_catalogue_media_sync.sql', import.meta.url),
    'utf8'
  );
  assert.match(migration, /alter column gallery type jsonb/i);
  assert.match(migration, /add column if not exists destination_slug text/i);
  assert.match(migration, /add column if not exists festival_slug text/i);
  assert.doesNotMatch(migration, /insert into public\.destinations/i);
  assert.doesNotMatch(migration, /insert into public\.festivals/i);
});

test('homepage highlight migration allows five unique positions per destination category and festivals', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261129120000_homepage_featured_content.sql', import.meta.url),
    'utf8'
  );
  assert.match(migration, /add column if not exists featured_order integer/i);
  assert.match(migration, /featured_order between 1 and 5/i);
  assert.match(migration, /destinations_category_featured_order_uidx/i);
  assert.match(migration, /festivals_featured_order_uidx/i);
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

test('video service uses the database as the only catalogue source', async () => {
  const service = await readFile(
    new URL('../src/services/videoService.js', import.meta.url),
    'utf8'
  );
  assert.ok(service.includes('function loadStoredVideos()'));
  assert.ok(service.includes('return [];'));
  assert.doesNotMatch(service, /CURATED_VIDEOS/);
  assert.match(service, /destination_slug:/);
  assert.match(service, /festival_slug:/);
  assert.match(service, /Database videos query failed/);
});


test('blank-site migration removes legacy public access and only seeded demo videos', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261201120000_remove_legacy_content_policies.sql', import.meta.url),
    'utf8'
  );
  assert.match(migration, /drop policy if exists "Public can view destinations"/i);
  assert.match(migration, /drop policy if exists "Public can view festivals"/i);
  assert.match(migration, /private\.has_admin_role\('content_manager'\)/i);
  assert.match(migration, /delete from public\.videos[\s\S]*?'vid-raigad'[\s\S]*?'vid-sinhagad'/i);
  assert.match(migration, /alter publication supabase_realtime add table public\.destinations/i);
  assert.match(migration, /alter publication supabase_realtime add table public\.festivals/i);
  assert.match(migration, /alter publication supabase_realtime add table public\.videos/i);
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

test('place manager schema links UUID destinations and festivals and supports live updates', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261125130000_destination_festival_relationships.sql', import.meta.url),
    'utf8'
  );
  assert.match(migration, /destination_id uuid not null references public\.destinations\(id\)/i);
  assert.match(migration, /festival_id uuid not null references public\.festivals\(id\)/i);
  assert.match(migration, /enable row level security/i);
  assert.match(migration, /alter publication supabase_realtime add table public\.destination_festivals/i);
});

test('place editor persists visitor hours, directions, and facilities', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20261125140000_destination_visitor_information.sql', import.meta.url),
    'utf8'
  );
  const modal = await readFile(
    new URL('../src/components/admin/AdminDestinationModal.jsx', import.meta.url),
    'utf8'
  );
  const service = await readFile(
    new URL('../src/services/contentService.js', import.meta.url),
    'utf8'
  );
  const detail = await readFile(
    new URL('../src/pages/DestinationDetailPage.jsx', import.meta.url),
    'utf8'
  );
  assert.match(migration, /add column if not exists opening_hours text/i);
  assert.match(migration, /add column if not exists how_to_reach text/i);
  assert.match(migration, /add column if not exists facilities jsonb/i);
  assert.match(modal, /Opening Hours \/ Timings/);
  assert.match(modal, /How to Reach/);
  assert.match(modal, /Visitor Facilities/);
  assert.match(service, /opening_hours: cleanRecord\.openingHours/);
  assert.match(service, /how_to_reach: cleanRecord\.howToReach/);
  assert.match(service, /facilities: cleanRecord\.facilities/);
  assert.match(detail, /destination\.openingHours/);
  assert.match(detail, /destination\.facilities/);
});
