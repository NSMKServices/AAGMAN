-- ==============================================================================
-- AAGMAN: MAHARASHTRA TOURISM PLATFORM
-- MIGRATION: 20261123_content_media_management.sql
-- DESCRIPTION: Content Management (Destinations, Festivals), YouTube Videos & Storage
-- AUTHOR: Senior Frontend Architect & Database Security Lead
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. CONTENT PUBLICATION STATUS ENUM
-- ------------------------------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_status') THEN
        CREATE TYPE public.content_status AS ENUM (
            'draft',
            'under_review',
            'published',
            'archived'
        );
    END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 2. DESTINATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.destinations (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    marathi_name TEXT,
    category TEXT NOT NULL CHECK (category IN ('forts', 'temples', 'beaches', 'heritage')),
    district TEXT NOT NULL,
    region TEXT DEFAULT 'Maharashtra',
    circuit TEXT,
    description TEXT,
    hero_image TEXT,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    best_time_to_visit TEXT,
    entry_fee TEXT DEFAULT 'Free entry',
    status public.content_status NOT NULL DEFAULT 'published',
    last_edited_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_destinations_category ON public.destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_status ON public.destinations(status);
CREATE INDEX IF NOT EXISTS idx_destinations_district ON public.destinations(district);
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON public.destinations(slug);

-- ------------------------------------------------------------------------------
-- 3. FESTIVALS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.festivals (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    marathi_name TEXT,
    dates TEXT,
    location TEXT,
    district TEXT DEFAULT 'Maharashtra',
    description TEXT,
    image TEXT,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    significance TEXT,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    status public.content_status NOT NULL DEFAULT 'published',
    last_edited_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_festivals_status ON public.festivals(status);
CREATE INDEX IF NOT EXISTS idx_festivals_district ON public.festivals(district);

-- ------------------------------------------------------------------------------
-- 4. YOUTUBE VIDEOS DIRECTORY TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    youtube_url TEXT NOT NULL UNIQUE,
    youtube_id TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    destination_id TEXT REFERENCES public.destinations(id) ON DELETE SET NULL,
    destination_name TEXT,
    festival_id TEXT REFERENCES public.festivals(id) ON DELETE SET NULL,
    category TEXT DEFAULT 'heritage',
    district TEXT DEFAULT 'Maharashtra',
    duration TEXT DEFAULT 'Video',
    creator TEXT DEFAULT 'AAGMAN Official Contributor',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_videos_destination ON public.videos(destination_id);
CREATE INDEX IF NOT EXISTS idx_videos_festival ON public.videos(festival_id);
CREATE INDEX IF NOT EXISTS idx_videos_category ON public.videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_active ON public.videos(is_active);

-- ------------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- 5.1 Destinations RLS
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published destinations" ON public.destinations;
CREATE POLICY "Public can view published destinations"
    ON public.destinations FOR SELECT
    TO anon, authenticated
    USING (status = 'published' OR public.is_admin());

DROP POLICY IF EXISTS "Editors and above can insert destinations" ON public.destinations;
CREATE POLICY "Editors and above can insert destinations"
    ON public.destinations FOR INSERT
    TO authenticated
    WITH CHECK (public.has_admin_role('editor'));

DROP POLICY IF EXISTS "Editors and above can update destinations" ON public.destinations;
CREATE POLICY "Editors and above can update destinations"
    ON public.destinations FOR UPDATE
    TO authenticated
    USING (public.has_admin_role('editor'))
    WITH CHECK (public.has_admin_role('editor'));

DROP POLICY IF EXISTS "Content Managers and Super Admins can delete destinations" ON public.destinations;
CREATE POLICY "Content Managers and Super Admins can delete destinations"
    ON public.destinations FOR DELETE
    TO authenticated
    USING (public.has_admin_role('content_manager'));

-- 5.2 Festivals RLS
ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published festivals" ON public.festivals;
CREATE POLICY "Public can view published festivals"
    ON public.festivals FOR SELECT
    TO anon, authenticated
    USING (status = 'published' OR public.is_admin());

DROP POLICY IF EXISTS "Editors and above can insert festivals" ON public.festivals;
CREATE POLICY "Editors and above can insert festivals"
    ON public.festivals FOR INSERT
    TO authenticated
    WITH CHECK (public.has_admin_role('editor'));

DROP POLICY IF EXISTS "Editors and above can update festivals" ON public.festivals;
CREATE POLICY "Editors and above can update festivals"
    ON public.festivals FOR UPDATE
    TO authenticated
    USING (public.has_admin_role('editor'))
    WITH CHECK (public.has_admin_role('editor'));

DROP POLICY IF EXISTS "Content Managers and Super Admins can delete festivals" ON public.festivals;
CREATE POLICY "Content Managers and Super Admins can delete festivals"
    ON public.festivals FOR DELETE
    TO authenticated
    USING (public.has_admin_role('content_manager'));

-- 5.3 Videos RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active videos" ON public.videos;
CREATE POLICY "Public can view active videos"
    ON public.videos FOR SELECT
    TO anon, authenticated
    USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Editors and above can insert videos" ON public.videos;
CREATE POLICY "Editors and above can insert videos"
    ON public.videos FOR INSERT
    TO authenticated
    WITH CHECK (public.has_admin_role('editor'));

DROP POLICY IF EXISTS "Editors and above can update videos" ON public.videos;
CREATE POLICY "Editors and above can update videos"
    ON public.videos FOR UPDATE
    TO authenticated
    USING (public.has_admin_role('editor'))
    WITH CHECK (public.has_admin_role('editor'));

DROP POLICY IF EXISTS "Content Managers and Super Admins can delete videos" ON public.videos;
CREATE POLICY "Content Managers and Super Admins can delete videos"
    ON public.videos FOR DELETE
    TO authenticated
    USING (public.has_admin_role('content_manager'));

-- ------------------------------------------------------------------------------
-- 6. SUPABASE STORAGE BUCKET CONFIGURATION (destination-media)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'destination-media',
    'destination-media',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE
SET public = true, file_size_limit = 5242880;

DROP POLICY IF EXISTS "Public can view destination media" ON storage.objects;
CREATE POLICY "Public can view destination media"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'destination-media');

DROP POLICY IF EXISTS "Active admins can upload destination media" ON storage.objects;
CREATE POLICY "Active admins can upload destination media"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'destination-media' AND public.is_admin());

DROP POLICY IF EXISTS "Content managers can update destination media" ON storage.objects;
CREATE POLICY "Content managers can update destination media"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'destination-media' AND public.has_admin_role('content_manager'));

DROP POLICY IF EXISTS "Content managers can delete destination media" ON storage.objects;
CREATE POLICY "Content managers can delete destination media"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'destination-media' AND public.has_admin_role('content_manager'));
