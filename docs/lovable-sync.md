# Lovable ↔ GitHub sync

## Why the Aug 11 updates never appeared in Lovable

The Lovable project (**Crown Management**, `book-with-us-today.lovable.app`) has
no GitHub connection. Nothing committed to this repository reaches Lovable on
its own, and nothing edited in Lovable lands here.

The commits in this repo were exported into git by hand during earlier sessions,
which is why the two sides drifted apart. `docs/setup-notes.md` says the reviews
migration is "applied by Lovable Cloud when this branch syncs" — that sync does
not exist yet, so it never ran.

Two independent gaps compound the problem:

1. The Aug 11 work was committed to `claude/crown-mgmt-site-updates-3eo1x8` and
   never merged. `main` is still the empty initial commit.
2. Even a merge to `main` would not have helped, because Lovable is not
   watching this repository.

## What Lovable is missing

New files, none of which exist in the Lovable project:

- `src/routes/reviews.tsx`, `src/routes/privacy.tsx`, `src/routes/thank-you.tsx`
- `src/components/site/BookingCalendar.tsx`, `Breadcrumbs.tsx`, `StickyMobileCta.tsx`
- `src/lib/property-photos.ts`
- `supabase/migrations/20260811020000_guest_reviews.sql`
- `docs/setup-notes.md`, `docs/guest-faq-DRAFT.md`

Modified files: `src/routes/__root.tsx`, `about.tsx`, `contact.tsx`, `index.tsx`,
`properties.tsx`, `shop.tsx`, `src/components/site/SiteHeader.tsx`,
`SiteFooter.tsx`, `src/integrations/supabase/types.ts`, `src/routeTree.gen.ts`.

## What only exists in Lovable

`src/components/ui/**` — roughly 60 shadcn/ui components — is in the Lovable
project but was never committed here, along with `.env` and `package-lock.json`.
This repository therefore cannot rebuild the site on its own today. Connecting
Lovable to GitHub fixes this in the same step, because Lovable pushes its full
tree on connect.

## Connecting the two

Step 1 has to happen in the Lovable UI; it is an OAuth handshake that cannot be
driven from this repo.

1. In the Lovable editor for Crown Management, open the GitHub integration and
   connect it to `rickyarcane/15th-Street`. Lovable pushes its current tree —
   the pre-Aug-11 state plus the missing `src/components/ui/**` — to the repo.
2. Reconcile: replay the Aug 11 changes on top of whatever Lovable pushed. Do
   this as a merge or a rebase, never a force-push, or the components Lovable
   just contributed will be lost. The changed-file list above is the checklist.
3. Push the reconciled result to the branch Lovable tracks (normally `main`).
   Lovable picks the changes up and applies
   `20260811020000_guest_reviews.sql` to Lovable Cloud.

Expect a conflict in `src/routeTree.gen.ts`. It is generated — resolve it by
regenerating rather than by hand-merging.

## After the sync

`docs/setup-notes.md` lists three manual items that the sync does not cover:
the listing photos, the Google Calendar sharing setting, and enabling the
Google auth provider in Lovable Cloud so the reviews page can accept sign-ins.
