-- AAGMAN content/media persistence foundation.
-- Safe to rerun: prepare content/media columns without inserting sample destinations or festivals.
alter table public.destinations
  alter column gallery type jsonb
  using case when gallery is null then '[]'::jsonb else to_jsonb(gallery) end;
alter table public.destinations alter column gallery set default '[]'::jsonb;

alter table public.festivals
  add column if not exists gallery jsonb not null default '[]'::jsonb;

alter table public.videos
  add column if not exists destination_slug text,
  add column if not exists festival_slug text;

create index if not exists videos_destination_slug_idx on public.videos (destination_slug);
create index if not exists videos_festival_slug_idx on public.videos (festival_slug);
create index if not exists videos_youtube_id_idx on public.videos (youtube_id);

-- Do not seed destination or festival records: the public catalogue starts empty.
-- Administrators create and publish all place and festival content through the CMS.

-- Link existing curated video rows to the canonical catalogue slugs.
update public.videos set destination_slug = 'raigad-fort'
where destination_slug is null and lower(coalesce(destination_name,'')) like '%raigad%';
update public.videos set destination_slug = 'ajanta-caves'
where destination_slug is null and lower(coalesce(destination_name,'')) like '%ajanta%';
update public.videos set destination_slug = 'tarkarli-beach'
where destination_slug is null and lower(coalesce(destination_name,'')) like '%tarkarli%';
update public.videos set destination_slug = 'ellora-caves'
where destination_slug is null and lower(coalesce(destination_name,'')) like '%ellora%';
update public.videos set destination_slug = 'trimbakeshwar'
where destination_slug is null and lower(coalesce(destination_name,'')) like '%trimbak%';
update public.videos set destination_slug = 'sinhagad-fort'
where destination_slug is null and lower(coalesce(destination_name,'')) like '%sinhagad%';
