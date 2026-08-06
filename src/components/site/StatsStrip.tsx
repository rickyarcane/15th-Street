import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const STATS = [
  { value: 2, suffix: "", label: "PROPERTIES AND COUNTING" },
  { value: 4.9, suffix: "", label: "Avg Rating", decimals: 1 },
  { value: 2, suffix: "", label: "DC/MD Markets" },
  { value: 24, suffix: "/7", label: "Guest Support" },
] as const;

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.6, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="font-display font-bold text-[56px] md:text-[64px] leading-none text-charcoal">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-sand border-y border-line py-12">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center gap-3 py-6 md:py-2 ${
              i > 0 ? "md:border-l md:border-line" : ""
            }`}
          >
            <Counter to={s.value} decimals={(s as any).decimals ?? 0} suffix={s.suffix} />
            <span className="eyebrow text-taupe">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
