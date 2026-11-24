-- Harden exposed admin helper functions without breaking RLS policy evaluation.
-- The public content SELECT policy calls is_admin() for anonymous visitors, so that
-- boolean-only helper remains executable by anon; role mutation helpers are auth-only.

alter function public.update_updated_at() set search_path = public, pg_temp;
alter function public.handle_admin_updated_at() set search_path = public, pg_temp;

-- Keep SECURITY DEFINER lookup functions on an empty search_path. All objects
-- referenced in their bodies are schema-qualified.
alter function public.is_admin() set search_path = '';
alter function public.is_super_admin() set search_path = '';
alter function public.has_admin_role(text) set search_path = '';
alter function public.get_my_admin_profile() set search_path = '';

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.get_my_admin_profile() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon, authenticated;
revoke all on function public.is_super_admin() from public, anon, authenticated;
revoke all on function public.has_admin_role(text) from public, anon, authenticated;

-- is_admin() is referenced by public-read RLS policies and only returns a boolean
-- derived from auth.uid(); anonymous users always evaluate to false.
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.has_admin_role(text) to authenticated;

-- Cover existing foreign keys used by trip stop and wishlist lookups/deletes.
create index if not exists idx_trip_stops_destination_id
  on public.trip_stops(destination_id);
create index if not exists idx_wishlists_destination_id
  on public.wishlists(destination_id);

-- Remove the verified duplicate user_id index; idx_trips_user remains in place.
drop index if exists public.idx_trips_user_id;
