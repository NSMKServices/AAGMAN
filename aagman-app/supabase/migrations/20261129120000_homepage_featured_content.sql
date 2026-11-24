-- Admin-managed homepage highlights. A null position means the record is not featured.
alter table public.destinations
  add column if not exists featured_order integer;

alter table public.festivals
  add column if not exists featured_order integer;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'destinations_featured_order_range'
      and conrelid = 'public.destinations'::regclass
  ) then
    alter table public.destinations
      add constraint destinations_featured_order_range
      check (featured_order is null or featured_order between 1 and 5);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'festivals_featured_order_range'
      and conrelid = 'public.festivals'::regclass
  ) then
    alter table public.festivals
      add constraint festivals_featured_order_range
      check (featured_order is null or featured_order between 1 and 5);
  end if;
end $$;

-- One slot per destination category, and five independently managed festival slots.
create unique index if not exists destinations_category_featured_order_uidx
  on public.destinations (category, featured_order)
  where featured_order is not null;

create unique index if not exists festivals_featured_order_uidx
  on public.festivals (featured_order)
  where featured_order is not null;
