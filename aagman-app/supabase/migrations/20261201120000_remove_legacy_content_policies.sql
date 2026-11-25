-- Correct legacy permissive RLS policies left alongside the hardened private-helper policies.
-- Permissive SELECT policies are ORed; the old USING (true) policies exposed drafts.
DROP POLICY IF EXISTS "Public can view destinations" ON public.destinations;
DROP POLICY IF EXISTS "Content managers can delete destinations" ON public.destinations;
DROP POLICY IF EXISTS "Editors and above can insert destinations" ON public.destinations;

DROP POLICY IF EXISTS "Public can view festivals" ON public.festivals;
DROP POLICY IF EXISTS "Content managers can delete festivals" ON public.festivals;
DROP POLICY IF EXISTS "Editors and above can insert festivals" ON public.festivals;

-- Replace the stale audit-log policy that referenced the revoked public helper.
DROP POLICY IF EXISTS "Authorized admins can view audit logs" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Super admins can view audit logs" ON public.admin_audit_logs;
CREATE POLICY "Authorized admins can view audit logs"
  ON public.admin_audit_logs FOR SELECT TO authenticated
  USING (private.has_admin_role('content_manager'));

-- Support the existing foreign-key lookups reported by the Supabase performance advisor.
CREATE INDEX IF NOT EXISTS idx_trip_stops_destination_id
  ON public.trip_stops (destination_id);

CREATE INDEX IF NOT EXISTS idx_wishlists_destination_id
  ON public.wishlists (destination_id);

-- Publish catalogue tables to Supabase Realtime so open public pages refresh
-- when an administrator creates, updates, publishes, unpublishes, or deletes content.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'destinations'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.destinations;
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'festivals'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.festivals;
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'videos'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.videos;
    END IF;
  END IF;
END $$;
