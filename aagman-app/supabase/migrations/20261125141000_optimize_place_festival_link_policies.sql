DROP POLICY IF EXISTS "Editors can manage place festival links" ON public.destination_festivals;
DROP POLICY IF EXISTS "Public can view published place festival links" ON public.destination_festivals;

CREATE POLICY "Public and admins can view place festival links"
  ON public.destination_festivals FOR SELECT
  TO anon, authenticated
  USING (
    (
      EXISTS (
        SELECT 1 FROM public.destinations d
        WHERE d.id = destination_id AND d.status = 'published'
      )
      AND EXISTS (
        SELECT 1 FROM public.festivals f
        WHERE f.id = festival_id AND f.status = 'published'
      )
    )
    OR private.is_admin()
  );

CREATE POLICY "Editors can insert place festival links"
  ON public.destination_festivals FOR INSERT
  TO authenticated
  WITH CHECK (private.has_admin_role('editor'));

CREATE POLICY "Editors can delete place festival links"
  ON public.destination_festivals FOR DELETE
  TO authenticated
  USING (private.has_admin_role('editor'));
