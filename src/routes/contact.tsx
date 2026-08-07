import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { useState } from "react";

const TITLE = "Contact SEOAcademys — Get Help With Free SEO Tools";
const DESC = "Contact the SEOAcademys team. Support for our 37 free SEO tools. Tool feedback, partnerships, press inquiries. We respond within 24 hours.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://seoacademys.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://seoacademys.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact SEOAcademys",
          url: "https://seoacademys.com/contact",
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-8 space-y-8">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-mono mb-3">Contact</div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Contact SEOAcademys — We Respond Within 24 Hours</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Use our contact form for: tool support and bug reports, feature suggestions, partnership and collaboration inquiries, press and media requests, API access inquiries.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            We are a small team committed to keeping all 37 tools free and functional. We read every message and respond to all inquiries within 24 hours on business days.
          </p>
        </div>

        {sent ? (
          <div className="rounded-xl border border-success/40 bg-success/10 p-6 text-center">
            <div className="font-display text-xl font-bold text-success mb-1">Message sent ✓</div>
            <p className="text-sm text-muted-foreground">We'll reply within 24 hours on business days.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-4 rounded-2xl border border-border bg-surface p-6"
          >
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <input required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:border-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input required type="email" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:border-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Subject</label>
              <select className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:border-primary outline-none">
                <option>Tool support / Bug report</option>
                <option>Feature suggestion</option>
                <option>Partnership / Collaboration</option>
                <option>Press / Media inquiry</option>
                <option>API access</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea required rows={5} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:border-primary outline-none" />
            </div>
            <button type="submit" className="w-full px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold">
              Send message
            </button>
          </form>
        )}

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="font-display text-lg font-bold mb-2">Business details</h2>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed">
              SEOAcademys
              <br />
              {/* TODO: replace with your registered business address before AdSense review */}
              Registered address: add your street, city, postal code and country here
              <br />
              Email: <a href="mailto:hello@seoacademys.com" className="text-primary underline">hello@seoacademys.com</a>
            </address>
            <p className="mt-3 text-xs text-muted-foreground">
              A verifiable physical address is required for Google AdSense approval — replace the placeholder above before submitting.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="font-display text-lg font-bold mb-2">Response-time SLA</h2>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>Bug reports and tool outages — within 8 business hours</li>
              <li>General support and feature requests — within 24 business hours</li>
              <li>Partnerships, press and API access — within 3 business days</li>
              <li>GDPR/CCPA data requests — within 30 days, as required by law</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Support hours: Monday to Friday, 09:00–18:00 IST.</p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
