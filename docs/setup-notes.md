# Site Update — Setup Notes (Aug 11, 2026)

Everything below shipped in this update. Three items need a quick action from
you to fully light up — each is a few minutes.

## 1. Listing photos (needs you)

The Google Drive connected to Claude is your personal account, and the
"Unit A Listing Photos (Enhanced)", "Unit B_enhanced", and Great Room photos
weren't reachable from it. The site is fully wired for them:

1. Export the photos and add them to the repo (or Lovable) under:
   - `public/images/hill-east/` — Unit A enhanced set
   - `public/images/art-house/` — Unit B enhanced set
   - `public/images/great-room.jpg` — hero photo
2. Open `src/lib/property-photos.ts` and swap the URLs for the local paths
   (instructions are at the top of that file). Every page reads from that one
   file — hero, home cards, and both property galleries update automatically.
   The Hill East gallery appears as soon as its array is non-empty.

Alternatively: share those Drive folders with the Google account connected to
Claude and ask Claude to finish the swap.

## 2. Booking calendar (needs you)

The Properties page now embeds a Google Calendar availability view
(`src/components/site/BookingCalendar.tsx`). It points at the calendar ID
`info@crownmgmt.biz` by default. From the crownmgmt admin account:

1. Google Calendar → Settings → the booking calendar → **Access permissions**
   → check "Make available to public" (free/busy is enough).
2. If the booking calendar's ID isn't `info@crownmgmt.biz`, copy the Calendar ID
   from "Integrate calendar" and either set env var `VITE_BOOKING_CALENDAR_ID`
   or edit the default in `BookingCalendar.tsx`.

## 3. Google sign-in for reviews (needs you)

The Guest Reviews page (`/reviews`) requires Google sign-in to post. The
database table ships in `supabase/migrations/20260811020000_guest_reviews.sql`
(applied by Lovable Cloud when this branch syncs). To enable the sign-in
button: in Lovable → Cloud → Auth, enable the **Google** provider (Lovable
Cloud manages the OAuth credentials). Until then, sign-in returns a
"provider not enabled" error; everything else on the page works.

Moderation: new reviews are hidden until approved. To approve, set
`approved = true` on the row (Lovable Cloud → Database → guest_reviews).

Security in place: Google-verified identity required to post, display name
taken from the Google profile (no impersonation), 1–5 rating and 10–1000
character limits enforced in the database, one review per guest per residence,
row-level security so clients can only read approved reviews and can never
edit or pre-approve, moderation gate before anything is public.

## Also in this update (no action needed)

- Email updated to info@crownmgmt.biz everywhere (footer, contact, shop, 404).
- Custom branded 404 page.
- Thank-you page (`/thank-you`) — the contact form now lands there after a
  successful inquiry.
- Working breadcrumbs on every page (with search-engine structured data).
- Sticky mobile booking CTA on all pages except the contact flow.
- Meta descriptions verified/added on every route.
- Privacy policy (`/privacy`) covering DC + US state privacy laws, linked in
  the footer.
- Guest FAQ draft for your review at `docs/guest-faq-DRAFT.md` — **not
  published**; items marked [CONFIRM] need your answers before it goes live.
