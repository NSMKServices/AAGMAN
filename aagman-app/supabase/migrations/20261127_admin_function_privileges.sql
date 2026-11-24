-- Move SECURITY DEFINER authorization helpers out of the exposed public API schema.
-- RLS policies call these helpers directly; they are not intended as public RPC endpoints.

alter function public.update_updated_at() set search_path = public, pg_temp;
alter function public.handle_admin_updated_at() set search_path = public, pg_temp;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and is_active = true
  );
$$;

create or replace function private.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role = 'super_admin'::public.admin_role
      and is_active = true
  );
$$;

create or replace function private.has_admin_role(required_role text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  user_role public.admin_role;
  user_active boolean;
begin
  select role, is_active into user_role, user_active
  from public.admin_profiles
  where id = auth.uid();

  if not found or not user_active then
    return false;
  end if;

  if user_role = 'super_admin'::public.admin_role then
    return true;
  end if;

  if required_role = 'content_manager'
     and user_role = 'content_manager'::public.admin_role then
    return true;
  end if;

  if required_role = 'editor'
     and user_role in ('content_manager'::public.admin_role, 'editor'::public.admin_role) then
    return true;
  end if;

  return false;
end;
$$;

grant execute on function private.is_admin() to anon, authenticated;
grant execute on function private.is_super_admin() to authenticated;
grant execute on function private.has_admin_role(text) to authenticated;

-- Remove client RPC access to the legacy public helpers and trigger-only function.
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.get_my_admin_profile() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon, authenticated;
revoke all on function public.is_super_admin() from public, anon, authenticated;
revoke all on function public.has_admin_role(text) from public, anon, authenticated;

-- Keep the verified covering index and remove only its duplicate.
drop index if exists public.idx_trips_user_id;
