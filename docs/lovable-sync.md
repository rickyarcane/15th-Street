# Lovable ↔ GitHub sync

**Status: resolved on Aug 14, 2026.** The Lovable project now syncs with GitHub,
and the Aug 11 site updates are in it.

## Which repo is the live one

When the GitHub integration was connected, Lovable created its **own** repository
rather than adopting this one:

> **`rickyarcane/book-with-us-today` — this is the repo Lovable syncs with.**

Lovable tracks its `main`. Push there and Lovable picks the changes up.

This repo (`rickyarcane/15th-Street`) is **not** connected to Lovable and never
was. It holds hand-exported snapshots from earlier sessions. Treat it as an
archive; new work belongs in `book-with-us-today`.

## Why the Aug 11 updates were invisible

Two problems stacked up:

1. The work was committed to `claude/crown-mgmt-site-updates-3eo1x8` in this repo
   and never merged — `main` here is still an empty initial commit.
2. Lovable was not watching this repo at all, so even a merge would have changed
   nothing. The note in `docs/setup-notes.md` saying the reviews migration is
   "applied by Lovable Cloud when this branch syncs" assumed a sync that did not
   exist.

## How it was resolved

Lovable's export turned out to be byte-identical to the pre-update snapshot in
this repo apart from trailing newlines, so the Aug 11 commit applied onto
Lovable's `main` with no conflicts:

- Cherry-picked `3322d7b` onto `book-with-us-today` `main` → commit `a2f320a`.
- 20 files, +1796/−406. All 46 `src/components/ui/**` components preserved.
- Verified with a clean `vite build` before pushing.
- Confirmed Lovable ingested it: `20260811020000_guest_reviews.sql` and
  `src/lib/property-photos.ts` are now present in the project.

`src/routeTree.gen.ts` is generated and gets rewritten on every build, so the
committed version is left as-is rather than churned.

Note that `bun.lock` in `book-with-us-today` resolves to Lovable's private
registry (`europe-west4-npm.pkg.dev`), which returns 403 outside their sandbox.
To build locally, move `bun.lock` aside, run
`bun install --registry https://registry.npmjs.org`, then restore it. Do not
commit a lockfile regenerated that way.

## GitHub sync does not run migrations

Worth knowing for next time: pushing a new file under `supabase/migrations/`
syncs the *file* into the project but does **not** apply it to Lovable Cloud.
After the Aug 11 sync, `guest_reviews` did not exist in the database, and the
giveaway was Lovable regenerating `src/integrations/supabase/types.ts` from the
live schema with no `guest_reviews` entry — silently dropping the type that came
in with the commit.

Applying it took an explicit request to the Lovable agent, which created its own
timestamped migration (`20260814191758_*.sql`). That file is functionally
identical to the original; only comments and a trailing newline differ. Both now
sit in `supabase/migrations/`, which is harmless but means the original
`20260811020000_guest_reviews.sql` is a no-op record rather than the migration
that actually ran.

**Check after any sync that adds a migration:** confirm the new table appears in
the regenerated `types.ts`. If it does not, the migration has not run.

## Remaining manual items

Google auth is now enabled, so reviews sign-in works. Still outstanding from
`docs/setup-notes.md`: the enhanced listing photos, and making the booking
calendar public.
