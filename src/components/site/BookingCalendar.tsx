/**
 * Google Calendar availability embed.
 *
 * The calendar ID defaults to the Crown Management booking calendar. To point
 * at a different calendar, set VITE_BOOKING_CALENDAR_ID (an email-style
 * calendar ID from Google Calendar → Settings → "Integrate calendar").
 * The calendar must be public ("Make available to public" — free/busy is
 * enough for availability) for the embed to render.
 */
const CALENDAR_ID = import.meta.env.VITE_BOOKING_CALENDAR_ID || "info@crownmgmt.biz";

const EMBED_SRC =
  "https://calendar.google.com/calendar/embed?" +
  new URLSearchParams({
    src: CALENDAR_ID,
    mode: "MONTH",
    showTitle: "0",
    showPrint: "0",
    showTabs: "0",
    showCalendars: "0",
    showTz: "0",
    bgcolor: "#E7DCCB",
    color: "#B5572F",
  }).toString();

export function BookingCalendar() {
  return (
    <section className="py-16 bg-linen" id="availability">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="eyebrow mb-4">Availability</p>
        <h2 className="font-display font-medium text-[32px] md:text-[40px] leading-[1.15] text-charcoal">
          Check our booking calendar
        </h2>
        <p className="mt-4 text-[16px] leading-[1.6] text-taupe max-w-2xl">
          Dates shown as busy are already reserved. Found an open window? Send an inquiry and
          we&apos;ll confirm your stay directly — no platform fees.
        </p>
        <div className="mt-8 bg-sand border border-line rounded-[4px] overflow-hidden">
          <iframe
            src={EMBED_SRC}
            title="Crown Management booking availability calendar"
            className="w-full h-[420px] md:h-[560px] border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-4 font-mono uppercase tracking-[0.12em] text-[11px] text-taupe">
          All bookings are confirmed directly by our team.
        </p>
      </div>
    </section>
  );
}
