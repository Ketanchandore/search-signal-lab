import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { SITE_URL } from "@/lib/tool-meta";

const TITLE = "SEOAcademys API — Roadmap for Programmatic SEO & GEO Checks";
const DESC =
  "Planned SEOAcademys API: programmatic access to the 47-signal audit, schema validation and AI citation scoring. See the planned endpoints and request early access.";

export const Route = createFileRoute("/api-docs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/api-docs` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/api-docs` }],
  }),
  component: ApiDocs,
});

const ENDPOINTS = [
  ["GET /v1/audit", "Full 47-signal on-page audit for a single URL."],
  ["GET /v1/meta", "Title, description, canonical, robots, Open Graph and Twitter tags."],
  ["GET /v1/schema", "Extract and validate every JSON-LD block on a page."],
  ["GET /v1/links", "Internal and external link inventory with rel attributes and status codes."],
  ["GET /v1/geo", "AI citation readiness score across the six GEO signal categories."],
];

function ApiDocs() {
  return (
    <PageContainer>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">SEOAcademys API</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The browser tools are free and unlimited today. A public HTTP API is on the roadmap for teams that need to run the same
          checks inside CI pipelines, dashboards and bulk workflows.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Status: planned · Last Updated: June 2026</p>

        <h2 className="font-display text-2xl font-bold mt-10 mb-3">Planned endpoints</h2>
        <div className="space-y-3">
          {ENDPOINTS.map(([e, d]) => (
            <div key={e} className="rounded-lg border border-border bg-surface p-4">
              <code className="text-sm font-mono text-primary">{e}</code>
              <p className="text-sm text-muted-foreground mt-1.5">{d}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold mt-10 mb-3">What you can use today</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
          <li><Link to="/dashboard" className="text-primary hover:underline">Bulk audit runner</Link> — select tools, run them together, export a PDF report</li>
          <li><Link to="/tools" className="text-primary hover:underline">All 37 tools</Link> — unlimited single-URL checks, no signup</li>
          <li><Link to="/contact" className="text-primary hover:underline">Contact us</Link> to register interest in early API access</li>
        </ul>
      </div>
    </PageContainer>
  );
}
