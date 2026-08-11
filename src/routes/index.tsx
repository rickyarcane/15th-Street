import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { StatsStrip } from "@/components/site/StatsStrip";
import { StripedPlaceholder } from "@/components/site/Placeholder";
import { HorizontalLockup } from "@/components/site/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crown Management — Stays & Objects in Washington, DC" },
      { name: "description", content: "Curated short-term residences in the heart of DC. Stay in the design — take it home." },
      { property: "og:title", content: "Crown Management — Stays & Objects" },
      { property: "og:description", content: "Curated short-term residences in the heart of DC. Stay in the design — take it home." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const ART_HOUSE_IMG =
  "https://images.homes.com/listings/210/3167689394-010294422/406-15th-st-se-washington-dc-unit-b-primaryphoto.jpg";

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-charcoal -mt-16 pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ART_HOUSE_IMG})` }}
        />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 text-center">
          <p className="eyebrow mb-6" style={{ color: "#FFFFFF" }}>
            Washington, DC · Stays & Objects
          </p>
          <h1 className="font-display font-bold text-white text-[44px] md:text-[76px] leading-[1.05] max-w-4xl mx-auto">
            Where comfort and experience converge
          </h1>
          <p className="mt-6 font-body text-[18px] md:text-[22px] leading-[1.5] text-white/80 max-w-2xl mx-auto">
            Curated short-term residences in the heart of DC. Every detail considered.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-charcoal text-sand px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-clay transition-colors duration-150"
            >
              Browse our properties <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-white text-white bg-transparent px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-white hover:text-charcoal transition-colors duration-150"
            >
              Browse our collections <ArrowRight size={16} />
            </Link>
          </div>
          <p className="mt-6 font-mono uppercase tracking-[0.16em] text-[11px] text-white/60">
            Book direct · no platform fees
          </p>
        </div>
      </section>

      <StatsStrip />

      {/* Residences */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-4">Our Residences</p>
          <h2 className="font-display font-medium text-[32px] md:text-[40px] leading-[1.15] text-charcoal max-w-2xl">
            Curated stays in Washington, DC
          </h2>
          <p className="mt-4 text-[17px] text-taupe max-w-xl">Two homes, designed end to end.</p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <PropertyCard
              image={<img src={ART_HOUSE_IMG} alt="The Art House" className="w-full h-full object-cover" />}
              eyebrow="Capitol Hill · Washington, DC"
              title="The Art House"
              meta="2 BR · 2.5 BA · 1,700 SQ FT"
              ctaHref="/contact?type=book"
              ctaLabel="Inquire →"
            />
            <PropertyCard
              image={<StripedPlaceholder label="Coming Soon" className="w-full h-full" />}
              eyebrow="Hill East · Washington, DC"
              title="Hill East Hide Away"
              meta="A second curated residence."
            />
          </div>

          <div className="mt-12 text-center">
            <Link to="/properties" className="text-clay underline underline-offset-4 hover:decoration-2 font-medium">
              View all properties →
            </Link>
          </div>
        </div>
      </section>

      {/* The Collection */}
      <section className="py-24 bg-sand">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-4">The Collection</p>
          <h2 className="font-display font-medium text-[32px] md:text-[40px] leading-[1.15] text-charcoal">
            Stay in the design.
          </h2>
          <p className="mt-3 font-display italic text-[22px] text-taupe">Take it home.</p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { eyebrow: "Local Maker · DC", title: "Walnut Console", meta: "White oak · 72×34 in" },
              { eyebrow: "Local Maker · DC", title: "Untitled No. 4", meta: "Oil on linen · 36×48 in" },
              { eyebrow: "Handcrafted", title: "Iron Arc Lamp", meta: "Patinated steel · 78 in" },
            ].map((p) => (
              <ObjectCard key={p.title} {...p} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/shop" className="text-clay underline underline-offset-4 hover:decoration-2 font-medium">
              View the full collection →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-linen">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-10">Guest Words</p>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                quote: "A truly singular stay. The art, the light, the quiet — nothing like a hotel.",
                who: "M.T., Capitol Hill · Oct 2024",
              },
              {
                quote:
                  "We booked two nights and extended to two weeks. Crown Management thought of everything.",
                who: "R.A., Brookland · Jan 2025",
              },
            ].map((t) => (
              <figure key={t.who} className="bg-sand border border-line p-8 rounded-[4px]">
                <span className="block font-display text-clay text-[64px] leading-none mb-2">"</span>
                <blockquote className="font-display italic text-[22px] leading-[1.4] text-charcoal">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 font-mono uppercase tracking-[0.16em] text-[11px] text-taupe">
                  — {t.who}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Band */}
      <section className="py-24 bg-charcoal text-sand">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="flex justify-center mb-10">
            <HorizontalLockup onDark size={44} asLink={false} />
          </div>
          <h2 className="font-display font-medium text-[40px] md:text-[56px] leading-[1.1] text-sand max-w-2xl mx-auto">
            Ready for something different?
          </h2>
          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-sand text-charcoal px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-clay hover:text-sand transition-colors duration-150"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PropertyCard({
  image,
  eyebrow,
  title,
  meta,
  ctaHref,
  ctaLabel,
}: {
  image: React.ReactNode;
  eyebrow: string;
  title: string;
  meta: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <article className="bg-linen border border-line rounded-[4px] overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,27,23,0.08)]">
      <div className="aspect-[3/2] bg-sand">{image}</div>
      <div className="p-6">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h3 className="font-display font-medium text-[28px] leading-tight text-charcoal">{title}</h3>
        <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-taupe">{meta}</p>
        {ctaHref && ctaLabel && (
          <Link to={ctaHref} className="mt-5 inline-block text-clay underline underline-offset-4 hover:decoration-2 font-medium">
            {ctaLabel}
          </Link>
        )}
      </div>
    </article>
  );
}

function ObjectCard({ eyebrow, title, meta }: { eyebrow: string; title: string; meta: string }) {
  return (
    <article className="bg-linen border border-line rounded-[4px] overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,27,23,0.08)]">
      <div className="aspect-[4/5]">
        <StripedPlaceholder label="Placeholder" className="w-full h-full" />
      </div>
      <div className="p-5">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h3 className="font-display font-medium text-[22px] leading-tight text-charcoal">{title}</h3>
        <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-taupe">{meta}</p>
        <span className="mt-4 inline-block text-clay underline underline-offset-4 font-medium text-[14px]">
          Inquire →
        </span>
      </div>
    </article>
  );
}
