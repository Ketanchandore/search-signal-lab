import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";

const TITLE = "Privacy Policy — SEOAcademys | What We Collect & How We Use It";
const DESC = "SEOAcademys privacy policy. What data we collect, how it's used, cookie policy, third-party services, GDPR compliance, and your privacy rights.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://seoacademys.com/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 prose prose-slate max-w-none">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-2">Privacy Policy — SEOAcademys</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: June 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">What We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>URLs you submit for analysis (processed in-memory, not stored)</li>
              <li>Anonymous usage analytics (page views, feature usage — via Google Analytics 4)</li>
              <li>Contact form submissions (name, email, message)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">What We Do NOT Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account information — we have no user accounts</li>
              <li>Payment data — all tools are 100% free</li>
              <li>Personal browsing history outside SEOAcademys</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Cookies</h2>
            <p>We use Google Analytics 4 with IP anonymization enabled. No third-party advertising cookies.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Third-Party Services</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cloudflare (CDN & DDoS protection)</li>
              <li>Google Analytics 4 (anonymized traffic analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your Rights (GDPR / CCPA)</h2>
            <p>You have the right to request deletion of any personal data we hold about you. Submit deletion requests via our <a href="/contact" className="text-primary underline">contact form</a>. We respond within 30 days.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Contact</h2>
            <p>Questions about this policy? Reach us via the <a href="/contact" className="text-primary underline">contact page</a>.</p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
