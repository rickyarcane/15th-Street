import { createFileRoute, Link } from "@tanstack/react-router";
import { StatsStrip } from "@/components/site/StatsStrip";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Crown Management" },
      { name: "description", content: "A property management brand connecting guests with curated stays — and the art and furniture inside them." },
      { property: "og:title", content: "About — Crown Management" },
      { property: "og:description", content: "Where comfort and experience converge." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-4">Our Story</p>
          <h1 className="font-display font-bold text-[44px] md:text-[56px] leading-[1.08] text-charcoal max-w-3xl">
            Where comfort and experience converge
          </h1>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-body text-[20px] md:text-[22px] leading-[1.55] text-charcoal/90">
            Connecting you with your home away from home. What started as a single property management
            company grew into a brand providing guests the opportunity to purchase unique art and furniture
            pieces staged throughout our properties.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="font-display italic text-[32px] md:text-[40px] leading-[1.25] text-charcoal">
            "We believe exceptional design should be lived in — not just admired."
          </blockquote>
        </div>
      </section>

      <StatsStrip />

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <p className="eyebrow mb-4">Our Ethos</p>
            <p className="font-body text-[18px] leading-[1.65] text-charcoal/90">
              We believe in exceptional customer service, so Crown Management is just a phone call or text
              away! We are dedicated to providing clients with world-class stays in the heart of DC!
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <span className="font-display font-bold text-[160px] leading-none text-clay/15">CM</span>
          </div>
        </div>
      </section>

      <section className="bg-linen py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-4">Our Principles</p>
          <h2 className="font-display font-medium text-[32px] md:text-[40px] leading-[1.15] text-charcoal mb-12">
            How we operate
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { n: "01", t: "Customer Experience", d: "The hallmark of our operations. We strive for our spaces to feel like your home away from home." },
              { n: "02", t: "Transparency", d: "No BS over here! No hidden fees. No extra red tape." },
              { n: "03", t: "Efficiency", d: "We've built efficiency into each step of the customer experience. We're slashing the time from browsing to booking!" },
              { n: "04", t: "Around the Clock Support", d: "We can't always predict when things might go awry, but The Crown will be here to help you navigate 24/7!" },
            ].map((p) => (
              <div key={p.n} className="bg-sand border border-line rounded-[4px] p-8">
                <p className="font-mono uppercase tracking-[0.12em] text-[11px] text-clay">{p.n}</p>
                <h3 className="mt-2 font-display text-[26px] text-charcoal">{p.t}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-taupe">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display font-medium text-[40px] md:text-[56px] leading-[1.1] text-charcoal">
            Ready to stay?
          </h2>
          <Link
            to="/properties"
            className="mt-8 inline-flex bg-charcoal text-sand px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-clay transition-colors duration-150"
          >
            Browse our properties
          </Link>
        </div>
      </section>
    </>
  );
}
