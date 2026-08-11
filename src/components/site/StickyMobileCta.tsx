import { Link, useRouterState } from "@tanstack/react-router";

/** Pages where the bar would be redundant or in the way. */
const HIDDEN_ON = ["/contact", "/thank-you"];

/**
 * Mobile-only sticky call-to-action pinned to the bottom of the viewport.
 * Hidden on md+ screens and on the contact/thank-you flow.
 */
export function StickyMobileCta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-charcoal/95 backdrop-blur-sm border-t border-sand/15 px-4 pt-3 flex items-center gap-3"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <p className="flex-1 font-mono uppercase tracking-[0.12em] text-[10px] leading-snug text-sand/70">
        Book direct
        <span className="block text-sand/50">No platform fees</span>
      </p>
      <Link
        to="/contact"
        search={{ type: "book" }}
        className="bg-sand text-charcoal px-5 py-2.5 rounded-sm font-body text-[14px] font-semibold tracking-[0.02em] hover:bg-clay hover:text-sand transition-colors duration-150"
      >
        Book a stay
      </Link>
    </div>
  );
}
