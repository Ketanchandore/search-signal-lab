import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { SITE_URL } from "@/lib/tool-meta";

const TITLE = "How SEOAcademys Works — Live URL Fetch, 47 Signals, Zero Storage";
const DESC =
  "How SEOAcademys runs its free SEO and GEO checks: server-side live URL fetching, the 47-signal model, scoring methodology, data retention and accuracy limits.";

const FAQS = [
  { q: "How does SEOAcademys fetch my page?", a: "Every check performs a server-side HTTP request to the URL you submit, following redirects up to eight hops, and analyses the returned HTML exactly as a crawler would. Nothing is fetched from a cache." },
  { q: "Do you store the URLs I submit?", a: "No. URLs are processed in memory to produce the result and discarded. We do not log submitted URLs, store results or share anything with third parties." },
  { q: "Why do results differ from another SEO tool?", a: "Tools weight signals differently and some render JavaScript while others read raw HTML. Compare individual signals rather than composite scores across products." },
  { q: "Does SEOAcademys execute JavaScript?", a: "Checks analyse the server-rendered HTML response. For client-rendered sites, some content may only exist after hydration, which is also how many crawlers first see the page." },
  { q: "Are the tools rate limited?", a: "There is no account-based cap. Reasonable per-minute limits protect the service and the sites being fetched." },
];

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/how-it-works` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/how-it-works` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <PageContainer>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">How SEOAcademys Works</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          SEOAcademys runs every check against your live URL in real time. There is no cached index and no stored history — you
          submit a URL, our server fetches it the way a crawler would, and the analysis is returned in seconds.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Last Updated: June 2026 · Reviewed by SEOAcademys Editorial Team</p>

        <h2 className="font-display text-2xl font-bold mt-10 mb-3">The four-step pipeline</h2>
        <ol className="space-y-4 text-muted-foreground">
          {[
            ["Fetch", "A server-side request retrieves the URL, following up to eight redirects and recording every status code along the chain."],
            ["Parse", "The returned HTML is parsed into structured signals: head tags, headings, links, images, schema blocks and response headers."],
            ["Score", "Each signal is evaluated against a documented threshold — for example a title between 30 and 65 characters, or a canonical tag present and self-referencing."],
            ["Report", "Results are grouped by severity so you can fix blockers before cosmetic issues, with the exact value found shown next to each check."],
          ].map(([t, b], i) => (
            <li key={t} className="rounded-lg border border-border bg-surface p-4">
              <h3 className="font-semibold text-foreground mb-1">{i + 1}. {t}</h3>
              <p className="text-sm leading-relaxed">{b}</p>
            </li>
          ))}
        </ol>

        <h2 className="font-display text-2xl font-bold mt-10 mb-3">What the 47-signal model covers</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
          <li>Access: HTTP status, HTTPS, robots.txt directives and AI crawler rules</li>
          <li>Indexing: canonical tags, meta robots, sitemap presence and redirect chains</li>
          <li>On-page: title, meta description, heading hierarchy, image alt coverage</li>
          <li>Structured data: JSON-LD presence, type validity and required properties</li>
          <li>Experience: viewport, responsive hints, page weight and response time</li>
          <li>GEO: direct answers, factual density, entity clarity and llms.txt</li>
        </ul>

        <h2 className="font-display text-2xl font-bold mt-10 mb-3">Accuracy and limits</h2>
        <p className="text-muted-foreground leading-relaxed">
          Checks read the server-rendered response. Sites that render content entirely client-side may report fewer signals — which
          is also how many crawlers first see them. Third-party estimates such as keyword volume are directional, not exact.
        </p>

        <h2 className="font-display text-2xl font-bold mt-10 mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-surface p-4">
              <h3 className="font-semibold mb-1.5">{f.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold mt-10 mb-3">Next steps</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
          <li><Link to="/tools/seo-audit-hub" className="text-primary hover:underline">Run the SEO audit hub</Link></li>
          <li><Link to="/tools/ai-geo-hub" className="text-primary hover:underline">Check your AI citation readiness</Link></li>
          <li><Link to="/api-docs" className="text-primary hover:underline">API access roadmap</Link></li>
        </ul>
      </div>
    </PageContainer>
  );
}
