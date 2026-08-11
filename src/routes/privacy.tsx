import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Crown Management" },
      {
        name: "description",
        content:
          "How Crown Management collects, uses, and protects your information — including your rights under District of Columbia and applicable U.S. state privacy laws.",
      },
      { property: "og:title", content: "Privacy Policy — Crown Management" },
      { property: "og:description", content: "How we collect, use, and protect your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const EFFECTIVE_DATE = "August 11, 2026";

function Privacy() {
  return (
    <>
      <section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <Breadcrumbs className="mb-8" />
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display font-bold text-[44px] md:text-[56px] leading-[1.08] text-charcoal">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono uppercase tracking-[0.12em] text-[12px] text-taupe">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6 space-y-10 text-[16px] leading-[1.7] text-charcoal/85">
          <Block title="Who we are">
            <p>
              Crown Management (&ldquo;Crown Management,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;) operates curated short-term residences in Washington, DC and
              Maryland and offers original art and furniture for purchase. This Privacy Policy
              describes how we collect, use, share, and protect personal information when you visit
              our website, submit an inquiry, book a stay, leave a review, or purchase a piece from
              our collection. For any privacy question or request, contact us at{" "}
              <a
                className="text-clay underline underline-offset-4"
                href="mailto:info@crownmgmt.biz"
              >
                info@crownmgmt.biz
              </a>
              .
            </p>
          </Block>

          <Block title="Information we collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Information you provide.</strong> Name, email address, phone number, and the
                contents of inquiries you submit through our contact forms; booking details such as
                requested dates, party size, and stay preferences; and review content you choose to
                post.
              </li>
              <li>
                <strong>Sign-in information.</strong> If you sign in with Google to leave a review,
                we receive your name, email address, and profile photo from Google. We never see or
                store your Google password. Google&apos;s own privacy policy governs its handling of
                your account.
              </li>
              <li>
                <strong>Information collected automatically.</strong> Standard web log data such as
                IP address, browser type, device type, pages visited, and referring pages. Embedded
                services (such as Google Calendar and Google Fonts) may set cookies or receive your
                IP address when those features load.
              </li>
              <li>
                <strong>Payment information.</strong> We do not collect or store full payment card
                numbers on this website. Any payments are handled directly with our team or through
                a payment processor, whose terms will be provided at the time of payment.
              </li>
            </ul>
          </Block>

          <Block title="How we use information">
            <ul className="list-disc pl-5 space-y-2">
              <li>Responding to inquiries and arranging and managing stays;</li>
              <li>Operating guest reviews, including moderation before publication;</li>
              <li>Facilitating purchases from our collection and connecting you with makers;</li>
              <li>Maintaining the security of our website and preventing fraud and abuse;</li>
              <li>
                Meeting legal, tax, and regulatory obligations, including DC short-term rental
                licensing requirements;
              </li>
              <li>
                With your consent, sending occasional updates about our residences — you may opt out
                at any time.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal information, and we do not share it with
              third parties for cross-context behavioral advertising.
            </p>
          </Block>

          <Block title="When we share information">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Service providers</strong> who host our website, store form submissions,
                provide authentication, or deliver email on our behalf, bound to use it only to
                provide those services;
              </li>
              <li>
                <strong>Makers and artists</strong>, limited to what is needed to complete a
                purchase you initiate from our collection;
              </li>
              <li>
                <strong>Legal and safety</strong> disclosures where required by law, subpoena, or to
                protect the rights, property, or safety of Crown Management, our guests, or others;
              </li>
              <li>
                <strong>Business transfers</strong>, if we are involved in a merger, acquisition, or
                sale of assets, in which case this policy will continue to apply to previously
                collected information.
              </li>
            </ul>
          </Block>

          <Block title="Your rights — District of Columbia residents">
            <p>
              Crown Management is a District of Columbia-based business. DC consumer protection law
              (including the DC Consumer Protection Procedures Act, D.C. Code § 28-3901 et seq.)
              prohibits deceptive trade practices, and DC&apos;s data breach law (D.C. Code §
              28-3851 et seq.) requires us to notify affected DC residents and, where applicable,
              the Office of the Attorney General in the event of a qualifying breach of personal
              information. We maintain reasonable safeguards designed to protect the personal
              information we hold, as required by DC law.
            </p>
          </Block>

          <Block title="Your rights — other U.S. states">
            <p>
              Depending on where you live, state privacy laws — including the California Consumer
              Privacy Act as amended by the CPRA, the Virginia Consumer Data Protection Act, the
              Colorado Privacy Act, the Connecticut Data Privacy Act, the Utah Consumer Privacy Act,
              and similar laws in other states — may grant you rights to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                Know what personal information we have collected about you and request a copy;
              </li>
              <li>Correct inaccurate personal information;</li>
              <li>Delete personal information we hold about you, subject to legal exceptions;</li>
              <li>
                Opt out of the sale or sharing of personal information (we do not sell or share for
                advertising);
              </li>
              <li>Not be discriminated against for exercising any of these rights.</li>
            </ul>
            <p className="mt-3">
              While some of these laws apply only to businesses above certain size thresholds, we
              honor verified access, correction, and deletion requests from any U.S. resident
              regardless of state. To exercise a right, email{" "}
              <a
                className="text-clay underline underline-offset-4"
                href="mailto:info@crownmgmt.biz"
              >
                info@crownmgmt.biz
              </a>{" "}
              with the subject line &ldquo;Privacy Request.&rdquo; We will verify your identity,
              respond within 45 days, and never charge a fee for a reasonable request. If we decline
              a request, we will explain why and how to appeal.
            </p>
          </Block>

          <Block title="Cookies and third-party services">
            <p>
              We use only the cookies and local storage needed for the site to function — for
              example, to keep you signed in while posting a review. Embedded third-party features
              (Google Sign-In, Google Calendar, Google Fonts) may set their own cookies and receive
              standard request data; their use is governed by{" "}
              <a
                className="text-clay underline underline-offset-4"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              . We do not use third-party advertising or tracking networks. Because we do not track
              you across third-party websites, we do not respond to &ldquo;Do Not Track&rdquo;
              signals, though we honor opt-out preference signals where state law requires.
            </p>
          </Block>

          <Block title="Data retention and security">
            <p>
              We keep inquiry and booking records only as long as needed for the purposes above and
              to meet legal and tax obligations, then delete or de-identify them. Reviews remain
              published until you ask us to remove them. We use encryption in transit (HTTPS),
              access controls, and row-level database security to protect stored information. No
              method of transmission or storage is 100% secure; if a breach affecting your personal
              information occurs, we will notify you as required by applicable law.
            </p>
          </Block>

          <Block title="Children's privacy">
            <p>
              Our website and services are directed to adults. We do not knowingly collect personal
              information from children under 13. If you believe a child has provided us personal
              information, contact us and we will delete it.
            </p>
          </Block>

          <Block title="Changes to this policy">
            <p>
              We may update this policy from time to time. The effective date above reflects the
              latest revision, and material changes will be highlighted on this page. Your continued
              use of the site after a change takes effect constitutes acceptance of the updated
              policy.
            </p>
          </Block>

          <Block title="Contact us">
            <p>
              Crown Management · Washington, DC
              <br />
              Email:{" "}
              <a
                className="text-clay underline underline-offset-4"
                href="mailto:info@crownmgmt.biz"
              >
                info@crownmgmt.biz
              </a>
              <br />
              Or use our{" "}
              <Link to="/contact" className="text-clay underline underline-offset-4">
                contact form
              </Link>
              .
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display font-medium text-[26px] leading-[1.2] text-charcoal mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}
