ALTER TABLE public.destinations
  ADD COLUMN IF NOT EXISTS opening_hours text,
  ADD COLUMN IF NOT EXISTS how_to_reach text,
  ADD COLUMN IF NOT EXISTS facilities jsonb NOT NULL DEFAULT '[]'::jsonb;
