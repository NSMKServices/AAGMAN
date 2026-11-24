-- ==============================================================================
-- AAGMAN: MAHARASHTRA TOURISM PLATFORM
-- MIGRATION: 20261123_analytics_audit_hardening.sql
-- DESCRIPTION: Milestone 3 Analytics Optimization, Security Hardening & Audit Expansion
-- AUTHOR: Senior Software Architect & Database Security Lead
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ANALYTICS PERFORMANCE INDEXES (NON-DESTRUCTIVE & IDEMPOTENT)
-- ------------------------------------------------------------------------------

-- Optimize destination analytics queries (status, category, district, timestamps)
CREATE INDEX IF NOT EXISTS idx_destinations_updated_at 
    ON public.destinations(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_destinations_status_category 
    ON public.destinations(status, category);

CREATE INDEX IF NOT EXISTS idx_destinations_district_status 
    ON public.destinations(district, status);

-- Optimize festival analytics queries
CREATE INDEX IF NOT EXISTS idx_festivals_updated_at 
    ON public.festivals(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_festivals_status_district 
    ON public.festivals(status, district);

-- Optimize video directory queries
CREATE INDEX IF NOT EXISTS idx_videos_created_at 
    ON public.videos(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_videos_dest_fest 
    ON public.videos(destination_id, festival_id);

-- Optimize audit log queries for the Admin Audit Trail
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at 
    ON public.admin_audit_logs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_action 
    ON public.admin_audit_logs(action);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_entity 
    ON public.admin_audit_logs(entity_type, entity_id);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_created 
    ON public.admin_audit_logs(admin_id, created_at DESC);

-- ------------------------------------------------------------------------------
-- 2. HARDEN AUDIT LOG RLS PERMISSIONS
-- ------------------------------------------------------------------------------

-- Allow Content Managers and Super Admins to review administrative audit logs
-- (Editors and public users remain strictly barred from audit inspection)
DROP POLICY IF EXISTS "Super admins can view audit logs" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Authorized admins can view audit logs" ON public.admin_audit_logs;

CREATE POLICY "Authorized admins can view audit logs"
    ON public.admin_audit_logs
    FOR SELECT
    TO authenticated
    USING (public.has_admin_role('content_manager'));

-- Ensure insert policy allows active admins
DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.admin_audit_logs;

CREATE POLICY "Admins can insert audit logs"
    ON public.admin_audit_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- Re-verify immutability: Under NO circumstances can audit records be updated or deleted
-- (No UPDATE or DELETE policies are granted on public.admin_audit_logs)

-- ------------------------------------------------------------------------------
-- 3. AUDIT LOGGING TRIGGER FOR DESTINATIONS & FESTIVALS (DATABASE-LEVEL INTEGRITY)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.fn_audit_content_changes()
RETURNS TRIGGER AS $$
DECLARE
    v_admin_id UUID;
    v_action TEXT;
    v_entity TEXT;
    v_entity_id TEXT;
    v_details JSONB;
BEGIN
    v_admin_id := auth.uid();
    v_entity := TG_TABLE_NAME;

    IF TG_OP = 'INSERT' THEN
        v_action := UPPER(v_entity) || '_CREATE';
        v_entity_id := NEW.id::TEXT;
        v_details := jsonb_build_object(
            'name', NEW.name,
            'status', NEW.status,
            'operation', 'INSERT'
        );
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status <> NEW.status THEN
            v_action := UPPER(v_entity) || '_STATUS_CHANGE';
        ELSE
            v_action := UPPER(v_entity) || '_UPDATE';
        END IF;
        v_entity_id := NEW.id::TEXT;
        v_details := jsonb_build_object(
            'name', NEW.name,
            'old_status', OLD.status,
            'new_status', NEW.status,
            'operation', 'UPDATE'
        );
    ELSIF TG_OP = 'DELETE' THEN
        v_action := UPPER(v_entity) || '_DELETE';
        v_entity_id := OLD.id::TEXT;
        v_details := jsonb_build_object(
            'name', OLD.name,
            'deleted_status', OLD.status,
            'operation', 'DELETE'
        );
    END IF;

    -- Only record if performed by an authenticated administrator
    IF v_admin_id IS NOT NULL THEN
        INSERT INTO public.admin_audit_logs (
            admin_id,
            action,
            entity_type,
            entity_id,
            details,
            ip_address,
            user_agent
        ) VALUES (
            v_admin_id,
            v_action,
            v_entity,
            v_entity_id,
            v_details,
            'PostgreSQL Trigger',
            'PostgreSQL Internal'
        );
    END IF;

    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Prevent blocking business transaction if audit logging encounters transient lock
        RAISE WARNING 'Audit trigger error on %: %', TG_TABLE_NAME, SQLERRM;
        IF TG_OP = 'DELETE' THEN RETURN OLD; ELSE RETURN NEW; END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Attach triggers to destinations and festivals if tables exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'destinations') THEN
        DROP TRIGGER IF EXISTS trg_audit_destinations ON public.destinations;
        CREATE TRIGGER trg_audit_destinations
            AFTER INSERT OR UPDATE OR DELETE ON public.destinations
            FOR EACH ROW EXECUTE FUNCTION public.fn_audit_content_changes();
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'festivals') THEN
        DROP TRIGGER IF EXISTS trg_audit_festivals ON public.festivals;
        CREATE TRIGGER trg_audit_festivals
            AFTER INSERT OR UPDATE OR DELETE ON public.festivals
            FOR EACH ROW EXECUTE FUNCTION public.fn_audit_content_changes();
    END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 4. VERIFY STORAGE BUCKET INTEGRITY
-- ------------------------------------------------------------------------------
-- Ensure destination-media bucket exists with proper constraints
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'storage' AND table_name = 'buckets') THEN
        INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
        VALUES (
            'destination-media',
            'destination-media',
            true,
            5242880,
            ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
        )
        ON CONFLICT (id) DO UPDATE SET
            public = true,
            file_size_limit = 5242880,
            allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    END IF;
END $$;
