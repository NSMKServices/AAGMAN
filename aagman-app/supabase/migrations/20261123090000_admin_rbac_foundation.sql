-- ==============================================================================
-- AAGMAN: MAHARASHTRA TOURISM PLATFORM
-- MIGRATION: 20261123_admin_rbac_foundation.sql
-- DESCRIPTION: Complete Admin Authentication & Role-Based Authorization (RBAC) Foundation
-- AUTHOR: Senior Frontend Architect & Database Security Lead
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. SETUP EXTENSIONS & PREREQUISITES
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 2. CREATE ADMIN ROLE ENUM / DOMAIN
-- ------------------------------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role') THEN
        CREATE TYPE public.admin_role AS ENUM (
            'super_admin',
            'content_manager',
            'editor'
        );
    END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 3. CREATE ADMIN PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.admin_role NOT NULL DEFAULT 'editor',
    is_active BOOLEAN NOT NULL DEFAULT true,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    last_sign_in_at TIMESTAMPTZ,
    
    CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Documentation comment
COMMENT ON TABLE public.admin_profiles IS 'Stores role-based administrative profiles linked to Supabase auth.users.';
COMMENT ON COLUMN public.admin_profiles.role IS 'Role hierarchy: super_admin (all), content_manager (content CRUD & publish), editor (content create/edit)';
COMMENT ON COLUMN public.admin_profiles.is_active IS 'Flag to disable admin access without deleting account.';

-- ------------------------------------------------------------------------------
-- 4. CREATE PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON public.admin_profiles(role);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_is_active ON public.admin_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON public.admin_profiles(email);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_created ON public.admin_profiles(created_at DESC);

-- ------------------------------------------------------------------------------
-- 5. TRIGGER FOR UPDATED_AT
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_admin_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER trigger_admin_profiles_updated_at
    BEFORE UPDATE ON public.admin_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_admin_updated_at();

-- ------------------------------------------------------------------------------
-- 6. SECURITY HELPER FUNCTIONS (SECURITY DEFINER)
-- ------------------------------------------------------------------------------

-- Check if current authenticated user is an active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.admin_profiles 
        WHERE id = auth.uid() 
          AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Check if current authenticated user is an active super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.admin_profiles 
        WHERE id = auth.uid() 
          AND role = 'super_admin'::public.admin_role
          AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Role hierarchy check
CREATE OR REPLACE FUNCTION public.has_admin_role(required_role text)
RETURNS BOOLEAN AS $$
DECLARE
    user_role public.admin_role;
    user_active boolean;
BEGIN
    SELECT role, is_active INTO user_role, user_active
    FROM public.admin_profiles
    WHERE id = auth.uid();

    IF NOT FOUND OR NOT user_active THEN
        RETURN false;
    END IF;

    -- Super Admin has all privileges
    IF user_role = 'super_admin'::public.admin_role THEN
        RETURN true;
    END IF;

    -- Content Manager has content_manager and editor privileges
    IF required_role = 'content_manager' AND user_role = 'content_manager'::public.admin_role THEN
        RETURN true;
    END IF;

    -- Editor privileges
    IF required_role = 'editor' AND (user_role = 'content_manager'::public.admin_role OR user_role = 'editor'::public.admin_role) THEN
        RETURN true;
    END IF;

    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function for authenticated user to get their own profile safely
CREATE OR REPLACE FUNCTION public.get_my_admin_profile()
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT json_build_object(
        'id', id,
        'email', email,
        'full_name', full_name,
        'role', role,
        'is_active', is_active,
        'avatar_url', avatar_url,
        'phone', phone,
        'created_at', created_at,
        'last_sign_in_at', last_sign_in_at
    )::JSONB INTO result
    FROM public.admin_profiles
    WHERE id = auth.uid() AND is_active = true;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES FOR ADMIN PROFILES
-- ------------------------------------------------------------------------------
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 7.1 SELECT: Active admins can view admin profiles; ordinary users CANNOT
DROP POLICY IF EXISTS "Active admins can view admin profiles" ON public.admin_profiles;
CREATE POLICY "Active admins can view admin profiles"
    ON public.admin_profiles
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 7.2 INSERT: ONLY Super Admins can create admin profiles
DROP POLICY IF EXISTS "Only super admins can create admin profiles" ON public.admin_profiles;
CREATE POLICY "Only super admins can create admin profiles"
    ON public.admin_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_super_admin());

-- 7.3 UPDATE: Super Admin can update any profile; Admins can update own profile (except role and is_active)
DROP POLICY IF EXISTS "Super admins can update any admin profile" ON public.admin_profiles;
CREATE POLICY "Super admins can update any admin profile"
    ON public.admin_profiles
    FOR UPDATE
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "Admins can update own non-sensitive profile info" ON public.admin_profiles;
CREATE POLICY "Admins can update own non-sensitive profile info"
    ON public.admin_profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid() AND is_active = true)
    WITH CHECK (
        id = auth.uid() 
        AND role = (SELECT role FROM public.admin_profiles WHERE id = auth.uid())
        AND is_active = true
    );

-- 7.4 DELETE: ONLY Super Admins can delete admin profiles (cannot delete self)
DROP POLICY IF EXISTS "Only super admins can delete admin profiles" ON public.admin_profiles;
CREATE POLICY "Only super admins can delete admin profiles"
    ON public.admin_profiles
    FOR DELETE
    TO authenticated
    USING (public.is_super_admin() AND id <> auth.uid());

-- ------------------------------------------------------------------------------
-- 8. CREATE ADMIN AUDIT LOGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_id ON public.admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON public.admin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_action ON public.admin_audit_logs(action);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only super admins can view audit logs
DROP POLICY IF EXISTS "Super admins can view audit logs" ON public.admin_audit_logs;
CREATE POLICY "Super admins can view audit logs"
    ON public.admin_audit_logs
    FOR SELECT
    TO authenticated
    USING (public.is_super_admin());

-- Active admins can insert audit logs
DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.admin_audit_logs;
CREATE POLICY "Admins can insert audit logs"
    ON public.admin_audit_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- Audit logs are strictly immutable: NO UPDATE, NO DELETE
-- (No policies granted for UPDATE or DELETE, ensuring complete audit integrity)

-- ------------------------------------------------------------------------------
-- 9. CONTENT TABLES RBAC TEMPLATE (DESTINATIONS & FESTIVALS)
-- ------------------------------------------------------------------------------

-- Ensure destinations table has RLS enabled if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'destinations') THEN
        ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
        
        -- Public read access
        DROP POLICY IF EXISTS "Public can view destinations" ON public.destinations;
        CREATE POLICY "Public can view destinations"
            ON public.destinations FOR SELECT
            TO anon, authenticated
            USING (true);
            
        -- Editors and above can create destinations
        DROP POLICY IF EXISTS "Editors and above can create destinations" ON public.destinations;
        CREATE POLICY "Editors and above can create destinations"
            ON public.destinations FOR INSERT
            TO authenticated
            WITH CHECK (public.has_admin_role('editor'));

        -- Editors and above can update destinations
        DROP POLICY IF EXISTS "Editors and above can update destinations" ON public.destinations;
        CREATE POLICY "Editors and above can update destinations"
            ON public.destinations FOR UPDATE
            TO authenticated
            USING (public.has_admin_role('editor'))
            WITH CHECK (public.has_admin_role('editor'));

        -- Content managers and super admins can delete destinations
        DROP POLICY IF EXISTS "Content managers can delete destinations" ON public.destinations;
        CREATE POLICY "Content managers can delete destinations"
            ON public.destinations FOR DELETE
            TO authenticated
            USING (public.has_admin_role('content_manager'));
    END IF;
END $$;

-- Ensure festivals table has RLS enabled if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'festivals') THEN
        ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;
        
        -- Public read access
        DROP POLICY IF EXISTS "Public can view festivals" ON public.festivals;
        CREATE POLICY "Public can view festivals"
            ON public.festivals FOR SELECT
            TO anon, authenticated
            USING (true);
            
        -- Editors and above can create festivals
        DROP POLICY IF EXISTS "Editors and above can create festivals" ON public.festivals;
        CREATE POLICY "Editors and above can create festivals"
            ON public.festivals FOR INSERT
            TO authenticated
            WITH CHECK (public.has_admin_role('editor'));

        -- Editors and above can update festivals
        DROP POLICY IF EXISTS "Editors and above can update festivals" ON public.festivals;
        CREATE POLICY "Editors and above can update festivals"
            ON public.festivals FOR UPDATE
            TO authenticated
            USING (public.has_admin_role('editor'))
            WITH CHECK (public.has_admin_role('editor'));

        -- Content managers and super admins can delete festivals
        DROP POLICY IF EXISTS "Content managers can delete festivals" ON public.festivals;
        CREATE POLICY "Content managers can delete festivals"
            ON public.festivals FOR DELETE
            TO authenticated
            USING (public.has_admin_role('content_manager'));
    END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 10. SETUP INSTRUCTIONS & SEEDING SCRIPT FOR FIRST SUPER ADMIN
-- ------------------------------------------------------------------------------
/*
================================================================================
HOW TO SEED THE FIRST SUPER ADMIN IN SUPABASE:
================================================================================

Step 1: Go to the Supabase Dashboard -> Authentication -> Users.
Step 2: Click "Add User" -> "Create User" and enter:
        Email: admin@aagman.maharashtra.gov.in (or your preferred admin email)
        Password: [Secure Password]
        Auto-confirm User: Checked (YES)

Step 3: Copy the generated User UID (e.g., 'a1b2c3d4-e5f6-7890-abcd-ef1234567890').

Step 4: Run the following SQL snippet in the Supabase SQL Editor:

INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
VALUES (
    'YOUR_USER_UID_HERE',
    'admin@aagman.maharashtra.gov.in',
    'Director General - Maharashtra Tourism',
    'super_admin',
    true
)
ON CONFLICT (id) DO UPDATE 
SET role = 'super_admin', is_active = true;

================================================================================
*/
