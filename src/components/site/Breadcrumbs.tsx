import { Link, useRouterState } from "@tanstack/react-router";

const LABELS: Record<string, string> = {
  properties: "Our Properties",
  about: "About",
  shop: "The Collection",
  contact: "Contact",
  reviews: "Guest Reviews",
  privacy: "Privacy Policy",
  "thank-you": "Thank You",
};

function toLabel(segment: string) {
  return LABELS[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Working breadcrumb trail built from the current route, with
 * BreadcrumbList structured data for search engines.
 * `onDark` flips the palette for pages with a charcoal hero.
 */
export function Breadcrumbs({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = [
    { href: "/", label: "Home" },
    ...segments.map((seg, i) => ({
      href: "/" + segments.slice(0, i + 1).join("/"),
      label: toLabel(seg),
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href,
    })),
  };

  const base = onDark ? "text-sand/60" : "text-taupe";
  const link = onDark ? "text-sand/80 hover:text-clay" : "text-charcoal/80 hover:text-clay";
  const current = onDark ? "text-sand" : "text-charcoal";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`font-mono uppercase tracking-[0.14em] text-[11px] ${base} ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className={current}>
                  {c.label}
                </span>
              ) : (
                <Link
                  to={c.href}
                  className={`${link} transition-colors underline-offset-4 hover:underline`}
                >
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {/* Escaping "<" keeps the JSON-LD inert even if a future dynamic route
          segment ever carried attacker-controlled text. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </nav>
  );
}
