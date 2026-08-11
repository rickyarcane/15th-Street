import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { HorizontalLockup } from "./Logo";
import { PillNav } from "./PillNav";

const NAV = [
  { to: "/properties", label: "Our Properties" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Pages whose hero is dark (charcoal) — header text should be sand while transparent.
  const darkHero = pathname === "/" || pathname === "/shop" || pathname === "/contact";
  const onDark = darkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-sand/95 backdrop-blur-sm border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        <HorizontalLockup onDark={onDark} size={36} />
        <div className="hidden md:block">
          <PillNav
            items={NAV.map((n) => ({ label: n.label, href: n.to }))}
            activeHref={pathname}
            baseColor="transparent"
            pillColor={onDark ? "#F2EADD" : "#1E1B17"}
            pillTextColor={onDark ? "#1E1B17" : "#F2EADD"}
            hoveredPillTextColor={onDark ? "#1E1B17" : "#F2EADD"}
            initialLoadAnimation
          />
        </div>
        <button
          className={`md:hidden p-2 ${onDark ? "text-sand" : "text-charcoal"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-sand">
          <nav className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-3 text-[15px] font-medium text-charcoal hover:bg-linen rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
