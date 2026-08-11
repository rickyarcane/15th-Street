import { createFileRoute, Link } from "@tanstack/react-router";
import { StripedPlaceholder } from "@/components/site/Placeholder";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Collection — Crown Management" },
      {
        name: "description",
        content:
          "Original art and furniture from DC makers — every piece staged in a Crown Management residence is available to take home.",
      },
      { property: "og:title", content: "The Collection — Crown Management" },
      { property: "og:description", content: "Stay in the design. Take it home." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const ART = [
  { title: "Untitled No. 4", meta: "Oil on linen · 36×48 in" },
  { title: "Hill East Study", meta: "Acrylic on panel · 24×30 in" },
  { title: "Anacostia Dawn", meta: "Watercolor · 18×24 in" },
  { title: "Quiet River", meta: "Charcoal · 22×30 in" },
  { title: "Skylight Series I", meta: "Mixed media · 40×40 in" },
  { title: "Brookland Garden", meta: "Oil on canvas · 30×40 in" },
];

const FURN = [
  { title: "Walnut Console", meta: "White oak · hand-finished · 72×34 in" },
  { title: "Linen Daybed", meta: "Belgian linen · ash frame · 78 in" },
  { title: "Iron Arc Lamp", meta: "Patinated steel · 78 in" },
  { title: "Stoneware Bowl", meta: "Hand-thrown · 14 in" },
  { title: "Walnut Stool", meta: "Solid walnut · 18 in" },
  { title: "Brass Mirror", meta: "Aged brass · 28×40 in" },
];

function Shop() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-sand py-24 -mt-16 pt-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Breadcrumbs onDark className="mb-8" />
          <p className="eyebrow mb-4 text-clay">The Collection</p>
          <h1 className="font-display font-bold text-[56px] md:text-[76px] leading-[1.05] text-sand">
            Stay in the design.
          </h1>
          <p className="mt-3 font-display italic text-[24px] md:text-[32px] text-sand/80">
            Take it home.
          </p>
          <p className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-sand/80">
            Every piece in a Crown Management residence is available to take home. Furniture, art,
            objects — curated for the space, available for yours.
          </p>
        </div>
      </section>

      {/* Art */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-4">Original Art</p>
          <h2 className="font-display font-medium text-[32px] md:text-[40px] leading-[1.15] text-charcoal">
            Works by DC makers
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ART.map((p) => (
              <Card key={p.title} eyebrow="Local Maker · DC" {...p} />
            ))}
          </div>
          <p className="mt-10 font-mono uppercase tracking-[0.12em] text-[11px] text-taupe text-center">
            Pricing available upon inquiry · info@crownmgmt.biz
          </p>
        </div>
      </section>

      {/* Furniture */}
      <section className="py-24 bg-linen">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-4">Original Furniture</p>
          <h2 className="font-display font-medium text-[32px] md:text-[40px] leading-[1.15] text-charcoal">
            Objects worth keeping
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FURN.map((p) => (
              <Card key={p.title} eyebrow="Handcrafted" {...p} />
            ))}
          </div>
          <p className="mt-10 font-mono uppercase tracking-[0.12em] text-[11px] text-taupe text-center">
            All pieces staged in our residences — see them in person during your stay.
          </p>
        </div>
      </section>

      {/* Info band */}
      <section className="py-20 bg-charcoal text-sand">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="font-display font-medium text-[28px] md:text-[36px] leading-[1.2] text-sand">
            Interested in a piece? Reach out and we'll connect you with the maker.
          </h2>
          <Link
            to="/contact"
            search={{ type: "inquire-piece" }}
            className="mt-8 inline-flex bg-sand text-charcoal px-7 py-4 rounded-sm font-body text-[15px] font-semibold tracking-[0.02em] hover:bg-clay hover:text-sand transition-colors duration-150"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}

function Card({ eyebrow, title, meta }: { eyebrow: string; title: string; meta: string }) {
  return (
    <article className="bg-sand border border-line rounded-[4px] overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,27,23,0.08)]">
      <div className="aspect-[4/5]">
        <StripedPlaceholder label="Placeholder" className="w-full h-full" />
      </div>
      <div className="p-5">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h3 className="font-display font-medium text-[22px] leading-tight text-charcoal">
          {title}
        </h3>
        <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-taupe">{meta}</p>
        <span className="mt-4 inline-block text-clay underline underline-offset-4 font-medium text-[14px]">
          Inquire →
        </span>
      </div>
    </article>
  );
}
