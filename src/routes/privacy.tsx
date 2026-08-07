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
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Cookies & Consent</h2>
            <p>Analytics and advertising storage are set to <strong>denied</strong> until you accept our cookie banner. Declining keeps every tool fully functional.</p>
            <p className="mt-2">You can change your choice at any time by clearing site data for seoacademys.com in your browser, which brings the banner back.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Google Analytics 4 Disclosure</h2>
            <p>We use Google Analytics 4 (measurement ID G-WEMSSMC2E8) to count page views and which free tools are used.</p>
            <p className="mt-2">IP anonymization is enabled and Google Consent Mode v2 is implemented, so no analytics cookie is written before you accept.</p>
            <p className="mt-2">Events we record are limited to: page views, tool runs, report exports and tool errors. We never send URLs you audit, form contents or personal identifiers to Google.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Google AdSense Disclosure</h2>
            <p>This site may display advertising served by Google AdSense and its certified partners to keep all 37 tools free.</p>
            <p className="mt-2">Google and third-party vendors use cookies to serve ads based on a user's prior visits to this and other websites. Ad cookies load only after you accept our consent banner.</p>
            <p className="mt-2">You can opt out of personalized advertising at any time through <a href="https://www.google.com/settings/ads" rel="noopener nofollow" target="_blank" className="text-primary underline">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" rel="noopener nofollow" target="_blank" className="text-primary underline">aboutads.info</a>. EU, UK and Swiss visitors are served ads under Google's IAB TCF-compatible consent flow.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Third-Party Services</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cloudflare (CDN & DDoS protection)</li>
              <li>Google Analytics 4 (anonymized traffic analytics)</li>
              <li>Google AdSense (advertising, consent-gated)</li>
              <li>Supabase (authentication and saved audit history for signed-in users)</li>
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
