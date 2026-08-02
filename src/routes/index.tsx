import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { Hero3D } from "@/components/Hero3D";
import { ArrowRight, Search, Code2, FileText, BarChart3, Database, FileCode, Star, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LiveTicker, HowItWorks, FeatureShowcase, ComparisonTable, TestimonialsGrid, FAQSection, FinalCTA } from "@/components/HomeSections";

const HOME_TITLE = "Free SEO Tools — AI Audit, Rank Tracker, Schema Generator | SEOAcademys";
const HOME_DESC = "37 free SEO tools used by 2.4M+ marketers. AI Citation Audit, Rank Tracker, Schema Generator, Site Audit — no signup. Rank #1 in Google & AI Search.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "keywords", content: "free SEO tools, AI citation audit, GEO, generative engine optimization, ChatGPT SEO, AI Overviews, Perplexity SEO, schema generator, llms.txt, rank tracker" },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:url", content: "https://seoacademys.com/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SEOAcademys" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
    ],
    links: [{ rel: "canonical", href: "https://seoacademys.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SEOAcademys",
          url: "https://seoacademys.com",
          logo: "https://seoacademys.com/logo.png",
          description: "Free SEO tools platform used by 2.4M+ marketers. Provides AI Citation Audit, Rank Tracker, Schema Generator, and 34 more free SEO tools.",
          foundingDate: "2024",
          numberOfEmployees: "1-10",
          sameAs: [
            "https://twitter.com/seoacademys",
            "https://www.linkedin.com/company/seoacademys",
            "https://www.producthunt.com/products/seoacademys",
            "https://github.com/seoacademys",
          ],
          knowsAbout: ["SEO", "Generative Engine Optimization", "AI Search Optimization", "Schema Markup", "llms.txt", "Rank Tracking", "Technical SEO"],
          hasOfferCatalog: { "@type": "OfferCatalog", name: "Free SEO Tools", numberOfItems: "37" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SEOAcademys",
          url: "https://seoacademys.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://seoacademys.com/tools?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Home,
});

function useCount(target: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const dur = 1800;
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / dur);
      setN(Math.floor(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return n;
}

function fmt(n: number, suffix = "") {
  if (suffix === "M+") return `${(n / 1_000_000).toFixed(1)}M+`;
  if (suffix === "K+") return `${(n / 1000).toFixed(0)}K+`;
  return `${n.toLocaleString()}${suffix}`;
}

function StatCard({ value, label, suffix = "", icon: Icon }: { value: number; label: string; suffix?: string; icon: React.ElementType }) {
  const n = useCount(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl border border-border bg-surface/50 backdrop-blur p-6 overflow-hidden group"
    >
      <div className="absolute -top-12 -right-12 size-32 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition" style={{ background: "var(--primary)" }} />
      <Icon className="size-5 text-primary mb-3" />
      <div className="font-display text-3xl sm:text-4xl font-bold text-foreground">{fmt(n, suffix)}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

const tools = [
  { to: "/tools/ai-citation-audit", icon: Search, name: "AI Citation Audit", desc: "Score your visibility across ChatGPT, Gemini & Perplexity in 8 seconds.", color: "oklch(0.72 0.17 162)" },
  { to: "/tools/schema-generator", icon: Code2, name: "Schema & llms.txt Generator", desc: "Generate production-ready JSON-LD and llms.txt instantly.", color: "oklch(0.7 0.2 240)" },
  { to: "/tools/content-checker", icon: FileText, name: "Content Readiness Checker", desc: "AI extraction quality scoring — sentence-by-sentence highlighting.", color: "oklch(0.65 0.2 300)" },
  { to: "/tools/geo-tracker", icon: BarChart3, name: "GEO Market Intelligence", desc: "20+ live citation patterns across Tech, Finance, Health, SaaS.", color: "oklch(0.78 0.17 70)" },
];

const logos = ["Shopify", "HubSpot", "Notion", "Vercel", "Linear", "Stripe", "Figma", "Webflow", "Framer", "Cloudflare"];

function Home() {
  return (
    <>
      <PageContainer>
        {/* HERO */}
        <section className="grid grid-cols-1 sm:grid-cols-[1.15fr_0.85fr] lg:grid-cols-[1.05fr_0.95fr] gap-5 lg:gap-8 items-center pt-5 sm:pt-12 pb-8 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-[11px] sm:text-xs text-primary mb-4 sm:mb-5 font-mono max-w-full">
              <span className="size-1.5 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="truncate">LIVE · 2,438,902 scans · 187 today</span>
            </div>
            <h1 className="font-display text-[2rem] leading-[1.12] sm:text-5xl lg:text-6xl font-bold tracking-tight">


              Rank #1 in{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-br from-primary via-primary to-emerald-300 bg-clip-text text-transparent">
                  AI Search.
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-2 bg-primary/30 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
              <br />Not just Google.
            </h1>
            <p className="mt-4 sm:mt-5 max-w-xl text-muted-foreground text-[15px] sm:text-lg leading-relaxed">
              ChatGPT, Gemini &amp; Perplexity now answer <b className="text-foreground">60% of queries</b> without a click.
              Run the world's most-used free GEO toolkit — built by SEOs who rank #1 in AI Overviews daily.
            </p>
            <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link
                to="/tools/ai-citation-audit"
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 text-sm sm:text-base sm:px-6 sm:py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold overflow-hidden"
              >
                <span className="relative z-10">Run Free AI Audit</span>
                <ArrowRight className="size-4 relative z-10 group-hover:translate-x-1 transition" />
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center justify-center px-5 py-3 text-sm sm:text-base sm:px-6 sm:py-3.5 rounded-lg border border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition font-medium"
              >
                Learn GEO Free
              </Link>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-xs text-muted-foreground">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-3 sm:size-3.5 fill-warning text-warning" />)}
                <span className="ml-1 text-foreground font-medium">4.9</span>
              </div>
              <span className="hidden sm:inline">·</span>
              <span>Trusted by <b className="text-foreground">2.4M+ marketers</b></span>
              <span className="hidden sm:inline">·</span>
              <span>No signup</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="min-w-0 w-full flex items-center justify-center"
          >


            <Hero3D />
          </motion.div>
        </section>


        {/* STATS */}
        <section className="py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value={2438902} suffix="M+" label="AI Audits Run" icon={Zap} />
            <StatCard value={94} suffix="%" label="Citation Win Rate" icon={TrendingUp} />
            <StatCard value={187000} suffix="K+" label="Active Marketers" icon={ShieldCheck} />
            <StatCard value={47} suffix="B$" label="GEO Market by 2030" icon={Star} />
          </div>
        </section>

        <LiveTicker />


        {/* LOGOS MARQUEE */}
        <section className="py-10 border-y border-border overflow-hidden">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Teams from these companies use SEOAcademys
          </p>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-12 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...logos, ...logos].map((l, i) => (
                <span key={i} className="font-display text-2xl font-bold text-muted-foreground/60 hover:text-primary transition">
                  {l}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display text-3xl sm:text-4xl font-bold mb-3"
          >
            Why AI Engines Ignore <span className="text-primary">99% of websites</span>
          </motion.h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Three silent killers that block your brand from appearing in AI answers.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Database, title: "You're not an Entity", body: "Google's Knowledge Graph doesn't know you exist. LLMs can't cite what they can't identify in their training data.", num: "01" },
              { icon: FileText, title: "Low Factual Density", body: "Your content lacks the verifiable stats, dated facts & named entities that LLMs extract as direct answers.", num: "02" },
              { icon: FileCode, title: "No Schema 2.0 / llms.txt", body: "AI crawlers (GPTBot, PerplexityBot, ClaudeBot) need explicit signals. Without them, your pages are invisible.", num: "03" },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border border-border bg-surface/50 p-7 overflow-hidden"
              >
                <div className="absolute top-4 right-4 font-display font-bold text-5xl text-primary/10 group-hover:text-primary/20 transition">{p.num}</div>
                <div className="size-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <p.icon className="size-6 text-primary group-hover:text-primary-foreground transition" />
                </div>
                <h3 className="font-display font-bold text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.div>
            ))}
          </div>
        </section>

        <HowItWorks />


        {/* TOOLS */}
        <section className="py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-mono mb-2">100% Free Forever</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">The complete GEO toolkit</h2>
            </div>
            <Link to="/learn" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Browse curriculum <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {tools.map((t, i) => (
              <motion.div
                key={t.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={t.to}
                  className="group relative block rounded-2xl border border-border bg-surface/50 p-6 hover:border-primary transition overflow-hidden h-full"
                >
                  <div className="absolute -top-20 -right-20 size-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition" style={{ background: t.color }} />
                  <div className="relative flex items-start gap-4">
                    <div className="size-12 rounded-xl border border-border bg-background flex items-center justify-center shrink-0 group-hover:scale-110 transition" style={{ boxShadow: `0 4px 20px color-mix(in oklab, ${t.color} 25%, transparent)` }}>
                      <t.icon className="size-5" style={{ color: t.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-display font-bold text-lg">{t.name}</div>
                      <div className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.desc}</div>
                      <div className="mt-4 text-sm font-medium inline-flex items-center gap-1.5" style={{ color: t.color }}>
                        Launch tool <ArrowRight className="size-3.5 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <FeatureShowcase />
        <ComparisonTable />
        <TestimonialsGrid />
        <FAQSection />
        <FinalCTA />
      </PageContainer>
    </>
  );
}

