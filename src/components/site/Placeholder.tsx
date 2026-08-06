export function StripedPlaceholder({
  label = "Placeholder",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`striped-placeholder flex items-center justify-center ${className}`}>
      <span className="font-mono uppercase tracking-[0.16em] text-[11px] text-taupe bg-sand/80 px-3 py-1.5 rounded-sm">
        {label}
      </span>
    </div>
  );
}
