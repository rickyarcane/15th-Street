import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { StripedPlaceholder } from "@/components/site/Placeholder";
import { StarBorder } from "@/components/site/StarBorder";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Our Properties — Crown Management" },
      { name: "description", content: "Curated short-term residences in Washington, DC. The Art House, on Capitol Hill, and more." },
      { property: "og:title", content: "Our Properties — Crown Management" },
      { property: "og:description", content: "Curated short-term residences in Washington, DC." },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: Properties,
});

const GALLERY = [
  "https://images.homes.com/listings/210/3167689394-010294422/406-15th-st-se-washington-dc-unit-b-primaryphoto.jpg",
  "https://images.homes.com/listings/214/4167689394-010294422/406-15th-st-se-washington-dc-unit-b-buildingphoto-2.jpg",
  "https://images.homes.com/listings/117/6167689394-010294422/406-15th-st-se-washington-dc-unit-b-buildingphoto-3.jpg",
  "https://images.homes.com/listings/117/8167689394-010294422/406-15th-st-se-washington-dc-unit-b-buildingphoto-4.jpg",
];
// NOTE: these images sourced from homes.com — confirm usage rights before launch.

function Properties() {
  return (
    <>
      <section className="pt-24 pb-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-4">Our Residences</p>
          <h1 className="font-display font-bold text-[44px] md:text-[56px] leading-[1.08] text-charcoal max-w-3xl">
            Designed to feel like yours
          </h1>
        </div>
      </section>

      <SearchBar />

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-16">
          <ArtHouseDetail />
          <ComingSoonCard />
        </div>
      </section>

      <TrustBand />
    </>
  );
}

function SearchBar() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Booking handled directly — use our contact form.");
  };
  return (
    <section className="py-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <form
          onSubmit={onSubmit}
          className="bg-linen border border-line rounded-[4px] p-4 grid gap-3 md:grid-cols-5 items-end"
        >
          <Field label="Location"><input className={inputCls} placeholder="Washington, DC" /></Field>
          <Field label="Check-in"><input type="date" className={inputCls} /></Field>
          <Field label="Check-out"><input type="date" className={inputCls} /></Field>
          <Field label="Guests"><input type="number" min={1} defaultValue={2} className={inputCls} /></Field>
          <button type="submit" className="bg-charcoal text-sand px-6 py-3 rounded-sm font-body text-[14px] font-semibold tracking-[0.02em] hover:bg-clay transition-colors duration-150">
            Check Availability
          </button>
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full bg-sand border border-line rounded-sm px-3 py-2.5 text-[14px] text-charcoal placeholder:text-taupe focus:outline-none focus:border-clay";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-mono text-taupe">{label}</span>
      {children}
    </label>
  );
}

function ArtHouseDetail() {
  const [active, setActive] = useState(0);
  return (
    <article className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="aspect-[4/3] overflow-hidden rounded-[4px] border border-line bg-linen">
          <img src={GALLERY[active]} alt="The Art House" className="w-full h-full object-cover" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {GALLERY.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`aspect-[3/2] overflow-hidden rounded-sm border ${
                active === i ? "border-clay" : "border-line"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Capitol Hill · Washington, DC 20003</p>
        <h2 className="font-display font-medium text-[40px] leading-[1.1] text-charcoal">The Art House</h2>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-taupe">
          2 BR · 2.5 BA · 1,700 SQ FT · Capitol Hill
        </p>

        <p className="mt-6 text-[17px] leading-[1.65] text-charcoal/85">
          The Art House draws its inspiration from the vibrant creative energy of Washington, DC's Artist
          District, where history, culture, and contemporary expression intersect. Designed as more than a
          residence, the home serves as a private gallery that celebrates local artistry, natural light, and
          thoughtful design.
        </p>
        <p className="mt-4 text-[17px] leading-[1.65] text-charcoal/85">
          The expansive skylight floods the central gallery hallway with daylight, creating an ever-changing
          canvas that highlights curated works by DC artists while fostering a sense of openness, tranquility,
          and connection to the city's creative spirit. Every detail reflects the belief that art should be
          woven into everyday living.
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-taupe">
          {[
            "Soaring ceilings",
            "Multiple skylights",
            "Abundant natural light",
            "1 fireplace",
            "Central heating",
            "On-street parking",
            "Dogs OK (case-by-case)",
          ].map((f, i, a) => (
            <li key={f}>
              {f}
              {i < a.length - 1 && <span className="ml-3 text-line">·</span>}
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-taupe">
          12–36 months · No smoking
        </p>

        <Link
          to="/contact"
          search={{ type: "book" } as any}
          className="mt-8 inline-flex bg-charcoal text-sand px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-clay transition-colors duration-150"
        >
          Inquire about this stay
        </Link>
      </div>
    </article>
  );
}

function ComingSoonCard() {
  return (
    <article className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="aspect-[4/3] rounded-[4px] border border-line overflow-hidden">
        <StripedPlaceholder label="Coming Soon" className="w-full h-full" />
      </div>
      <div>
        <p className="eyebrow mb-3">Hill East · Washington, DC</p>
        <h2 className="font-display font-medium text-[40px] leading-[1.1] text-charcoal">Hill East Hide Away</h2>
        <p className="mt-4 text-[17px] leading-[1.65] text-taupe">
          Another curated stay, in the works. Join the list to hear first.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex border border-charcoal text-charcoal px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-charcoal hover:text-sand transition-colors duration-150"
        >
          Get notified
        </Link>
      </div>
    </article>
  );
}

function TrustBand() {
  return (
    <section className="bg-linen py-20 mt-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="eyebrow mb-4">Direct</p>
        <h2 className="font-display font-medium text-[32px] md:text-[40px] leading-[1.15] text-charcoal">
          Better for you. Better for us.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { t: "Book direct", d: "No platform fees, ever." },
            { t: "Direct communication", d: "Talk to our team — not a queue." },
            { t: "Flexible arrangements", d: "Stays from a weekend to a season." },
          ].map((b) => (
            <StarBorder
              key={b.t}
              as="div"
              color="#FFFFFF"
              thickness={2.5}
              speed="3.5s"
              className="block w-full"
            >
              <div className="bg-charcoal text-sand p-8 rounded-[18px] h-full">
                <h3 className="font-display text-[24px] text-sand">{b.t}</h3>
                <p className="mt-2 text-[15px] text-sand/70">{b.d}</p>
              </div>
            </StarBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
