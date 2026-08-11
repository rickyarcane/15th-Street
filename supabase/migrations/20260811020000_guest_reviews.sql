-- Guest reviews: Google-authenticated guests can submit one review per
-- residence; reviews are hidden until approved by the team.

CREATE TABLE public.guest_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 80),
  property text NOT NULL CHECK (property IN ('the-art-house', 'hill-east-hide-away', 'general')),
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body text NOT NULL CHECK (char_length(body) BETWEEN 10 AND 1000),
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- One review per guest per residence (also acts as a spam brake).
CREATE UNIQUE INDEX guest_reviews_one_per_property
  ON public.guest_reviews (user_id, property);

CREATE INDEX guest_reviews_approved_created
  ON public.guest_reviews (approved, created_at DESC);

-- Clients may only read and insert; edits/moderation go through service role.
GRANT SELECT ON public.guest_reviews TO anon;
GRANT SELECT, INSERT ON public.guest_reviews TO authenticated;
GRANT ALL ON public.guest_reviews TO service_role;

ALTER TABLE public.guest_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved reviews; authors can see their own pending ones.
CREATE POLICY "Approved reviews are public"
  ON public.guest_reviews FOR SELECT
  USING (approved = true OR auth.uid() = user_id);

-- Only signed-in users may insert, only as themselves, and never pre-approved.
CREATE POLICY "Signed-in guests can submit their own review"
  ON public.guest_reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND approved = false);
