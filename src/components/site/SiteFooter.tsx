import { Link } from "@tanstack/react-router";
import { WordmarkLogo } from "./Logo";

const NAV = [
  { to: "/properties", label: "Our Properties" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/reviews", label: "Guest Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-sand mt-24">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid gap-10 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <WordmarkLogo variant="sand" />
          <p className="font-mono uppercase tracking-[0.16em] text-[11px] text-sand/60">
            Washington, DC · Maryland
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-[14px]">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sand/80 hover:text-clay transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-[14px]">
          <a
            href="mailto:info@crownmgmt.biz"
            className="text-sand/80 hover:text-clay transition-colors"
          >
            info@crownmgmt.biz
          </a>
          <p className="text-sand/60">Response within 24 hours</p>
        </div>
      </div>
      <div className="border-t border-sand/15">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-3 font-mono uppercase tracking-[0.16em] text-[11px] text-sand/60">
          <span>© 2026 Crown Management</span>
          <Link
            to="/privacy"
            className="hover:text-clay transition-colors underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
