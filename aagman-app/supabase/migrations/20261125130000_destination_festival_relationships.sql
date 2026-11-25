-- Associate independently managed festivals with one or more destinations.
create table if not exists public.destination_festivals (
  destination_id text not null references public.destinations(id) on delete cascade,
  festival_id text not null references public.festivals(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (destination_id, festival_id)
);

create index if not exists idx_destination_festivals_festival
  on public.destination_festivals (festival_id);

alter table public.destination_festivals enable row level security;

drop policy if exists "Public can view published place festival links" on public.destination_festivals;
create policy "Public can view published place festival links"
  on public.destination_festivals for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.destinations d
      where d.id = destination_id and d.status = 'published'
    )
    and exists (
      select 1 from public.festivals f
      where f.id = festival_id and f.status = 'published'
    )
  );

drop policy if exists "Editors can manage place festival links" on public.destination_festivals;
create policy "Editors can manage place festival links"
  on public.destination_festivals for all
  to authenticated
  using (private.has_admin_role('editor'))
  with check (private.has_admin_role('editor'));

alter table public.destination_festivals replica identity full;
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'destination_festivals'
  ) then
    alter publication supabase_realtime add table public.destination_festivals;
  end if;
end $$;
