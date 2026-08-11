import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  type: z.enum(["book", "inquire-piece", "general"]).optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact — Crown Management" },
      { name: "description", content: "Talk to Crown Management about a stay, a piece from the collection, or anything else. We reply within 24 hours." },
      { property: "og:title", content: "Contact — Crown Management" },
      { property: "og:description", content: "We want to hear from you." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const TYPE_MAP: Record<string, string> = {
  book: "I want to book a stay",
  "inquire-piece": "I want to inquire about a piece",
  general: "General inquiry",
};

function Contact() {
  const { type } = Route.useSearch();
  const [inquiry, setInquiry] = useState<string>(type ? TYPE_MAP[type] : TYPE_MAP.general);

  useEffect(() => {
    if (type) setInquiry(TYPE_MAP[type]);
  }, [type]);

  return (
    <>
      <section className="bg-charcoal text-sand py-20 -mt-16 pt-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="eyebrow mb-4 text-clay">Get in Touch</p>
          <h1 className="font-display font-medium text-[40px] md:text-[56px] leading-[1.1] text-sand max-w-2xl">
            We want to hear from you
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-3">Email</p>
              <a href="mailto:info@crownmgmt.com" className="font-display text-[28px] text-clay underline underline-offset-4 hover:decoration-2">
                info@crownmgmt.com
              </a>
            </div>
            <div className="space-y-2">
              <p className="eyebrow">Markets</p>
              <p className="text-[16px] text-charcoal">Washington, DC · Maryland</p>
            </div>
            <div className="space-y-2">
              <p className="eyebrow">Response Time</p>
              <p className="text-[16px] text-charcoal">Within 24 hours</p>
            </div>
            <div className="pt-4 border-t border-line space-y-2">
              <p className="eyebrow">Browse</p>
              <Link to="/properties" className="block text-clay underline underline-offset-4 hover:decoration-2">
                Browse Properties →
              </Link>
              <Link to="/shop" className="block text-clay underline underline-offset-4 hover:decoration-2">
                Browse the Collection →
              </Link>
            </div>
          </div>

          <ContactForm inquiry={inquiry} setInquiry={setInquiry} />
        </div>
      </section>
    </>
  );
}

function ContactForm({ inquiry, setInquiry }: { inquiry: string; setInquiry: (s: string) => void }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      ...form,
      inquiry_type: inquiry,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    setSent(true);
    toast.success("Thanks — we'll be in touch within 24 hours.");
  };

  if (sent) {
    return (
      <div className="bg-linen border border-line rounded-[4px] p-10 text-center">
        <p className="eyebrow mb-3">Sent</p>
        <h2 className="font-display text-[28px] text-charcoal">Thanks — we'll be in touch within 24 hours.</h2>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-linen border border-line rounded-[4px] p-8">
      <p className="eyebrow mb-4">Send Us a Message</p>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name">
            <input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Last Name">
            <input required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className={inputCls} />
          </Field>
        </div>
        <Field label="Email">
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Phone Number">
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
        </Field>
        <Field label="What can we help you with?">
          <select value={inquiry} onChange={(e) => setInquiry(e.target.value)} className={inputCls}>
            {Object.values(TYPE_MAP).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-charcoal text-sand px-6 py-3.5 rounded-sm font-body text-[14px] font-semibold tracking-[0.02em] hover:bg-clay transition-colors duration-150 disabled:bg-line disabled:text-taupe"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full bg-sand border border-line rounded-sm px-3 py-2.5 text-[14px] text-charcoal placeholder:text-taupe focus:outline-none focus:border-clay";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-mono text-taupe">{label}</span>
      {children}
    </label>
  );
}
