import { Link } from "@tanstack/react-router";

export function WordmarkLogo({ variant = "charcoal", className = "" }: { variant?: "charcoal" | "sand"; className?: string }) {
  const color = variant === "sand" ? "text-sand" : "text-charcoal";
  return (
    <Link
      to="/"
      className={`font-display font-medium uppercase tracking-[0.14em] text-[18px] leading-none ${color} ${className}`}
      aria-label="Crown Management home"
    >
      Crown Management
    </Link>
  );
}

export function Monogram({
  size = 40,
  variant = "solid",
  className = "",
}: {
  size?: number;
  variant?: "solid" | "inverse";
  className?: string;
}) {
  const bg = variant === "solid" ? "bg-charcoal text-sand" : "bg-sand text-charcoal";
  const divider = variant === "solid" ? "bg-sand/55" : "bg-charcoal/55";
  return (
    <div
      className={`inline-flex items-center justify-center font-display font-bold ${bg} ${className}`}
      style={{ width: size, height: size, borderRadius: 4, lineHeight: 1 }}
      aria-hidden
    >
      <span style={{ fontSize: size * 0.45 }}>C</span>
      <span
        className={`mx-1 ${divider}`}
        style={{ width: 1.5, height: size * 0.5 }}
      />
      <span style={{ fontSize: size * 0.45 }}>M</span>
    </div>
  );
}

export function HorizontalLockup({
  onDark = false,
  size = 40,
  className = "",
  asLink = true,
}: {
  onDark?: boolean;
  size?: number;
  className?: string;
  asLink?: boolean;
}) {
  const text = onDark ? "text-sand" : "text-charcoal";
  const inner = (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram size={size} variant="solid" />
      <span
        className={`font-display font-medium uppercase tracking-[0.14em] text-[18px] leading-none ${text}`}
      >
        Crown Management
      </span>
    </span>
  );
  if (!asLink) return inner;
  return (
    <Link to="/" aria-label="Crown Management home" className="inline-flex">
      {inner}
    </Link>
  );
}

export function Descriptor({ className = "" }: { className?: string }) {
  return (
    <div className={`font-mono uppercase tracking-[0.16em] text-[10px] text-taupe ${className}`}>
      Washington, DC · Stays &amp; Objects
    </div>
  );
}
