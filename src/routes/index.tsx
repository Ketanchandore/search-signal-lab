import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { ArrowRight, Search, Code2, FileText, BarChart3, AlertTriangle, Database, FileCode } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEOAcademys — Free GEO & AI Search Intelligence Hub" },
      { name: "description", content: "Check if your website is being cited by Google AI Overviews, ChatGPT Search, and Perplexity. Free GEO tools and education." },
      { property: "og:title", content: "SEOAcademys — Free GEO & AI Search Intelligence Hub" },
      { property: "og:description", content: "Check if your website is being cited by Google AI Overviews, ChatGPT Search, and Perplexity." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function useCount(target: number, suffix = "") {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const dur = 1500;
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / dur);
      setN(Math.floor(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return `${n.toLocaleString()}${suffix}`;
}

function StatCard({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const display = useCount(value, suffix);
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="font-display text-3xl sm:text-4xl font-bold text-primary">{display}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

const tools = [
  { to: "/tools/ai-citation-audit", icon: Search, name: "AI Citation Audit", desc: "Score your site's visibility to LLM citations." },
  { to: "/tools/schema-generator", icon: Code2, name: "Schema & llms.txt Generator", desc: "Generate JSON-LD and llms.txt instantly." },
  { to: "/tools/content-checker", icon: FileText, name: "Content Readiness Checker", desc: "Analyze content for LLM extraction quality." },
  { to: "/tools/geo-tracker", icon: BarChart3, name: "GEO Market Intelligence", desc: "See who Google AI, ChatGPT & Perplexity cite." },
];

function Home() {
  return (
    <PageContainer>
      <section className="py-12 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground mb-6">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Free · No signup · Open knowledge
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05]">
          Is Your Website <span className="text-primary">Invisible</span><br className="hidden sm:block" /> to AI Search?
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg">
          Google AI Overviews, ChatGPT Search & Perplexity now answer 60% of queries without a click.
          Check if your brand is being cited — or ignored.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/tools/ai-citation-audit"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Run Free AI Audit <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/learn"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-border hover:border-primary hover:text-primary transition"
          >
            Learn GEO Free
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard value={1100000000} label="Websites Affected" />
          <StatCard value={46} label="CTR Drop with AI Overviews" suffix="%" />
          <StatCard value={17} label="GEO Market by 2034" suffix="B $" />
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-center font-display text-3xl font-bold mb-10">The 3 Reasons AI Ignores You</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Database, title: "Your brand is not an Entity", body: "Google's Knowledge Graph doesn't recognize you. LLMs can't cite what they can't identify." },
            { icon: FileText, title: "Low Factual Density", body: "Your content lacks the stats, dates, and named entities LLMs extract for direct answers." },
            { icon: FileCode, title: "Missing Schema 2.0 & llms.txt", body: "AI crawlers like GPTBot and PerplexityBot need explicit declarations to surface your pages." },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-surface p-6">
              <p.icon className="size-6 text-primary mb-4" />
              <h3 className="font-display font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl font-bold">Free Tools</h2>
          <Link to="/learn" className="text-sm text-primary hover:underline">Browse all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="group rounded-xl border border-border bg-surface p-5 hover:border-primary transition">
              <t.icon className="size-5 text-primary mb-3" />
              <div className="font-semibold">{t.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
              <div className="mt-4 text-sm text-primary inline-flex items-center gap-1">Try Free <ArrowRight className="size-3 group-hover:translate-x-0.5 transition" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <AlertTriangle className="size-4 text-warning" />
          Used by SEOs from:
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-muted-foreground">
          {["Startups", "Agencies", "E-commerce", "SaaS Teams", "Bloggers"].map((x) => (
            <span key={x} className="font-display font-semibold">{x}</span>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
