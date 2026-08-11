
-- Lock down SECURITY DEFINER email queue functions to service_role only and set fixed search_path
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;

REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;

-- Tighten the permissive contact form INSERT policy with basic validation instead of `true`
DROP POLICY IF EXISTS "Anyone can submit a contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit a contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(email) BETWEEN 3 AND 320
    AND email LIKE '%_@_%.__%'
    AND inquiry_type IS NOT NULL
    AND length(inquiry_type) BETWEEN 1 AND 100
    AND (first_name IS NULL OR length(first_name) <= 100)
    AND (last_name IS NULL OR length(last_name) <= 100)
    AND (phone IS NULL OR length(phone) <= 40)
  );
