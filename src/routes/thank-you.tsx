import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Crown Management" },
      {
        name: "description",
        content:
          "Your inquiry is on its way to the Crown Management team. We reply within 24 hours — usually much sooner.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Thank You — Crown Management" },
      {
        property: "og:description",
        content: "Your inquiry is on its way. We reply within 24 hours.",
      },
      { property: "og:url", content: "/thank-you" },
    ],
    links: [{ rel: "canonical", href: "/thank-you" }],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <>
      <section className="bg-charcoal text-sand py-24 -mt-16 pt-36">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <Breadcrumbs onDark className="justify-center mb-8 [&>ol]:justify-center" />
          <p className="eyebrow mb-6 text-clay">Message Received</p>
          <h1 className="font-display font-medium text-[44px] md:text-[64px] leading-[1.08] text-sand max-w-3xl mx-auto">
            Thank you — we&apos;re on it.
          </h1>
          <p className="mt-6 font-body text-[18px] md:text-[20px] leading-[1.55] text-sand/80 max-w-xl mx-auto">
            Your inquiry is in our inbox. A member of the Crown Management team will be in touch
            within 24 hours — usually much sooner.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-10 text-center">While You Wait</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                to: "/properties",
                title: "Tour the residences",
                desc: "The Art House on Capitol Hill and the Hill East Hide Away.",
              },
              {
                to: "/shop",
                title: "Browse the collection",
                desc: "Every piece staged in our homes is available to take home.",
              },
              {
                to: "/reviews",
                title: "Read guest reviews",
                desc: "Hear from guests who have stayed with us — or leave your own.",
              },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group bg-linen border border-line rounded-[4px] p-8 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,27,23,0.08)]"
              >
                <h2 className="font-display text-[24px] text-charcoal">{c.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.6] text-taupe">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-clay font-medium text-[14px]">
                  Explore{" "}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-14 text-center font-mono uppercase tracking-[0.16em] text-[11px] text-taupe">
            Need something sooner? Email{" "}
            <a href="mailto:info@crownmgmt.biz" className="text-clay underline underline-offset-4">
              info@crownmgmt.biz
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
