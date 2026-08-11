import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Guest Reviews — Crown Management" },
      {
        name: "description",
        content:
          "Read what guests say about their stays at The Art House and Hill East Hide Away — and share your own review of your Crown Management stay.",
      },
      { property: "og:title", content: "Guest Reviews — Crown Management" },
      {
        property: "og:description",
        content: "Guest words on Crown Management stays in Washington, DC.",
      },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

const PROPERTIES: Record<string, string> = {
  "the-art-house": "The Art House",
  "hill-east-hide-away": "Hill East Hide Away",
  general: "General",
};

const BODY_MIN = 10;
const BODY_MAX = 1000;

type Review = {
  id: string;
  display_name: string;
  property: string;
  rating: number;
  body: string;
  created_at: string;
};

function Reviews() {
  return (
    <>
      <section className="bg-charcoal text-sand py-20 -mt-16 pt-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Breadcrumbs onDark className="mb-8" />
          <p className="eyebrow mb-4 text-clay">Guest Words</p>
          <h1 className="font-display font-medium text-[40px] md:text-[56px] leading-[1.1] text-sand max-w-2xl">
            Reviews from our guests
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-sand/80 max-w-xl">
            Stayed with us? We&apos;d love to hear about it. Sign in with Google to leave a review —
            reviews are published after a quick moderation check.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid gap-12 lg:grid-cols-[1fr_420px] items-start">
          <ReviewList />
          <ReviewForm />
        </div>
      </section>
    </>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} className={i <= n ? "fill-clay text-clay" : "text-line"} />
      ))}
    </span>
  );
}

function ReviewList() {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    supabase
      .from("guest_reviews")
      .select("id, display_name, property, rating, body, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          setReviews([]);
        } else {
          setReviews((data as Review[]) ?? []);
        }
      });
  }, []);

  if (reviews === null) {
    return <p className="text-taupe">Loading reviews…</p>;
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-linen border border-line rounded-[4px] p-10">
        <p className="eyebrow mb-3">Be the First</p>
        <h2 className="font-display text-[28px] text-charcoal">No published reviews yet.</h2>
        <p className="mt-3 text-[16px] leading-[1.6] text-taupe">
          Recently stayed at one of our residences? Sign in and share your experience — your words
          will appear here once approved.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {reviews.map((r) => (
        <figure key={r.id} className="bg-linen border border-line rounded-[4px] p-8">
          <div className="flex items-center justify-between gap-4">
            <Stars n={r.rating} />
            <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-taupe">
              {PROPERTIES[r.property] ?? r.property}
            </span>
          </div>
          <blockquote className="mt-4 font-display italic text-[20px] leading-[1.45] text-charcoal">
            {r.body}
          </blockquote>
          <figcaption className="mt-5 font-mono uppercase tracking-[0.16em] text-[11px] text-taupe">
            — {r.display_name} ·{" "}
            {new Date(r.created_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function ReviewForm() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [property, setProperty] = useState("the-art-house");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/reviews` },
    });
    if (error) toast.error(error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    const trimmed = body.trim();
    if (trimmed.length < BODY_MIN) {
      return toast.error(`Please write at least ${BODY_MIN} characters.`);
    }
    setLoading(true);
    // Display name comes from the verified Google profile — not free-typed —
    // so reviewers can't impersonate someone else.
    const displayName =
      (session.user.user_metadata.full_name as string | undefined)?.slice(0, 80) ||
      session.user.email?.split("@")[0] ||
      "Guest";
    const { error } = await supabase.from("guest_reviews").insert({
      user_id: session.user.id,
      display_name: displayName,
      property,
      rating,
      body: trimmed.slice(0, BODY_MAX),
    });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        return toast.error("You've already reviewed this residence — thank you!");
      }
      return toast.error(error.message);
    }
    setSubmitted(true);
  };

  if (!authReady) return null;

  if (submitted) {
    return (
      <div className="bg-linen border border-line rounded-[4px] p-8 text-center">
        <p className="eyebrow mb-3">Received</p>
        <h2 className="font-display text-[26px] text-charcoal">Thank you for your review.</h2>
        <p className="mt-3 text-[15px] leading-[1.6] text-taupe">
          It will appear on this page once our team has approved it.
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-charcoal text-sand rounded-[4px] p-8">
        <p className="eyebrow mb-3 text-clay">Leave a Review</p>
        <h2 className="font-display text-[26px] text-sand">Share your stay.</h2>
        <p className="mt-3 text-[15px] leading-[1.6] text-sand/70">
          To keep our reviews genuine, we ask guests to sign in with Google before posting. We only
          receive your name and email — never your password.
        </p>
        <button
          onClick={signIn}
          className="mt-6 w-full inline-flex items-center justify-center gap-3 bg-sand text-charcoal px-6 py-3.5 rounded-sm font-body text-[14px] font-semibold tracking-[0.02em] hover:bg-clay hover:text-sand transition-colors duration-150"
        >
          <GoogleMark />
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-linen border border-line rounded-[4px] p-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="eyebrow">Leave a Review</p>
        <button
          type="button"
          onClick={signOut}
          className="font-mono uppercase tracking-[0.12em] text-[10px] text-taupe underline underline-offset-4 hover:text-clay"
        >
          Sign out
        </button>
      </div>
      <p className="text-[13px] text-taupe mb-5">
        Posting as{" "}
        <strong className="text-charcoal">
          {(session.user.user_metadata.full_name as string | undefined) || session.user.email}
        </strong>
      </p>
      <div className="grid gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="label-mono text-taupe">Residence</span>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className={inputCls}
          >
            {Object.entries(PROPERTIES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-col gap-1.5">
          <span className="label-mono text-taupe">Rating</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                aria-label={`${i} star${i > 1 ? "s" : ""}`}
                className="p-1"
              >
                <Star
                  size={22}
                  className={i <= rating ? "fill-clay text-clay" : "text-line hover:text-taupe"}
                />
              </button>
            ))}
          </div>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="label-mono text-taupe">Your review</span>
          <textarea
            required
            minLength={BODY_MIN}
            maxLength={BODY_MAX}
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What made your stay memorable?"
            className={`${inputCls} resize-y`}
          />
          <span className="font-mono text-[10px] text-taupe text-right">
            {body.trim().length}/{BODY_MAX}
          </span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-charcoal text-sand px-6 py-3.5 rounded-sm font-body text-[14px] font-semibold tracking-[0.02em] hover:bg-clay transition-colors duration-150 disabled:bg-line disabled:text-taupe"
        >
          {loading ? "Submitting…" : "Submit Review"}
        </button>
        <p className="font-mono uppercase tracking-[0.12em] text-[10px] text-taupe text-center">
          One review per residence · published after moderation
        </p>
      </div>
    </form>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

const inputCls =
  "w-full bg-sand border border-line rounded-sm px-3 py-2.5 text-[14px] text-charcoal placeholder:text-taupe focus:outline-none focus:border-clay";
