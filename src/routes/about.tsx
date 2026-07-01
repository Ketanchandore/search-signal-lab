import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";

const TITLE = "About SEOAcademys — Free SEO + GEO Tools for 2.4M+ Marketers Worldwide";
const DESC = "SEOAcademys provides 37 free production-grade SEO and GEO tools. Learn our mission, team, methodology, and why 2.4M+ marketers worldwide trust our free platform.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://seoacademys.com/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://seoacademys.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About SEOAcademys",
          url: "https://seoacademys.com/about",
          description: DESC,
          publisher: { "@type": "Organization", name: "SEOAcademys", url: "https://seoacademys.com" },
        }),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-10">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-mono mb-3">About</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">About SEOAcademys — Our Mission, Team & Tool Methodology</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            SEOAcademys was founded in 2024 with one conviction: professional-grade SEO and GEO data should be free for every marketer, not locked behind $500/month subscriptions.
          </p>
        </div>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Every result from our tools comes from a live, real-time fetch of your actual URL — server-side, the same way Googlebot and AI crawlers access your pages. We do not serve cached data. We do not estimate. You see exactly what search engines see.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">What We've Built</h2>
          <p className="text-muted-foreground leading-relaxed">
            37 production-grade tools covering every category of SEO and GEO optimization: technical site audit, rank tracking, keyword research, schema markup validation, AI citation analysis, content optimization, performance analysis, and link auditing.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Since launching, our platform has processed <strong className="text-foreground">2.4 million+ user audits</strong> across <strong className="text-foreground">318,000+ unique domains</strong> in <strong className="text-foreground">80+ countries</strong>. Every day, 47,000+ audits run on our platform.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Our Tool Methodology</h2>
          <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">First: Real data only.</strong> We fetch live URLs server-side. If a tool cannot access a URL in real-time, it tells you — it does not return estimated or cached data.</p>
          <p className="mt-3 text-muted-foreground leading-relaxed"><strong className="text-foreground">Second: Actionable results.</strong> Every issue surfaced by our tools includes what it means, why it matters, and how to fix it. Data without context is useless.</p>
          <p className="mt-3 text-muted-foreground leading-relaxed"><strong className="text-foreground">Third: Current standards.</strong> We update our tools when Google releases algorithm updates, when AI platforms change their citation behavior, or when web standards evolve. Our Full SEO Audit was updated in June 2026 to reflect the May 2026 Core Update requirements.</p>
        </section>

        <section className="rounded-xl border border-border bg-surface-2 p-6">
          <h2 className="font-display text-xl font-bold mb-2">SEOAcademys Editorial Team</h2>
          <p className="text-sm text-muted-foreground">Published by SEOAcademys | SEO & GEO Research Team</p>
          <p className="text-sm text-muted-foreground mt-1">Experience: Analysis of 2,400,000+ website audits across 80+ countries</p>
          <p className="text-sm text-muted-foreground mt-1">Last Updated: June 2026</p>
        </section>

        <div className="flex gap-3">
          <Link to="/tools" className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold">Browse all 37 tools</Link>
          <Link to="/contact" className="px-5 py-3 rounded-lg border border-border hover:border-primary hover:text-primary transition font-medium">Contact us</Link>
        </div>
      </div>
    </PageContainer>
  );
}
