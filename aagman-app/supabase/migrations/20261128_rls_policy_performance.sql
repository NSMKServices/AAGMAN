-- Avoid per-row auth.uid() evaluation and consolidate duplicate admin profile policies.
-- Authorization semantics remain unchanged; ownership checks are still enforced.

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can view own wishlist" on public.wishlists;
create policy "Users can view own wishlist"
  on public.wishlists for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can add to own wishlist" on public.wishlists;
create policy "Users can add to own wishlist"
  on public.wishlists for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can remove from own wishlist" on public.wishlists;
create policy "Users can remove from own wishlist"
  on public.wishlists for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can view own trips" on public.trips;
create policy "Users can view own trips"
  on public.trips for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create own trips" on public.trips;
create policy "Users can create own trips"
  on public.trips for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own trips" on public.trips;
create policy "Users can update own trips"
  on public.trips for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own trips" on public.trips;
create policy "Users can delete own trips"
  on public.trips for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can view own trip stops" on public.trip_stops;
create policy "Users can view own trip stops"
  on public.trip_stops for select to authenticated
  using (exists (
    select 1 from public.trips t
    where t.id = trip_stops.trip_id and t.user_id = (select auth.uid())
  ));

drop policy if exists "Users can add own trip stops" on public.trip_stops;
create policy "Users can add own trip stops"
  on public.trip_stops for insert to authenticated
  with check (exists (
    select 1 from public.trips t
    where t.id = trip_stops.trip_id and t.user_id = (select auth.uid())
  ));

drop policy if exists "Users can update own trip stops" on public.trip_stops;
create policy "Users can update own trip stops"
  on public.trip_stops for update to authenticated
  using (exists (
    select 1 from public.trips t
    where t.id = trip_stops.trip_id and t.user_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.trips t
    where t.id = trip_stops.trip_id and t.user_id = (select auth.uid())
  ));

drop policy if exists "Users can delete own trip stops" on public.trip_stops;
create policy "Users can delete own trip stops"
  on public.trip_stops for delete to authenticated
  using (exists (
    select 1 from public.trips t
    where t.id = trip_stops.trip_id and t.user_id = (select auth.uid())
  ));

-- Combine admin-profile SELECT policies into one permissive policy.
drop policy if exists "Active admins can view admin profiles" on public.admin_profiles;
drop policy if exists "Admins can read own profile" on public.admin_profiles;
create policy "Admins can view permitted admin profiles"
  on public.admin_profiles for select to authenticated
  using (is_admin() or id = (select auth.uid()));

-- Combine own-profile and super-admin UPDATE policies while preserving role protection.
drop policy if exists "Admins can update own non-sensitive profile info" on public.admin_profiles;
drop policy if exists "Super admins can update any admin profile" on public.admin_profiles;
create policy "Admins can update permitted admin profiles"
  on public.admin_profiles for update to authenticated
  using (
    is_super_admin()
    or (id = (select auth.uid()) and is_active = true)
  )
  with check (
    is_super_admin()
    or (
      id = (select auth.uid())
      and is_active = true
      and role = (
        select own_profile.role
        from public.admin_profiles own_profile
        where own_profile.id = (select auth.uid())
      )
    )
  );

drop policy if exists "Only super admins can delete admin profiles" on public.admin_profiles;
create policy "Only super admins can delete admin profiles"
  on public.admin_profiles for delete to authenticated
  using (is_super_admin() and id <> (select auth.uid()));
