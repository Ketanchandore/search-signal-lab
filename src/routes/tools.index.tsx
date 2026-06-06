import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, FileCode2, FileText, BarChart3, Eye, Tag, Bot, Wand2, Link2, ArrowRight, TrendingUp, Users, Globe2, Zap,
  Gauge, ListTree, Hash, MoveRight, Map, Smartphone, ShieldCheck, Cpu, ArrowRightLeft, ServerCog,
  Type, BookOpen, FileX2, ImageIcon, Braces, HelpCircle, Package, Newspaper, Code, ScrollText,
} from "lucide-react";
import { Card3D } from "@/components/Card3D";
import { ToolPanel } from "./tools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Tools Dashboard — SEOAcademys" },
      { name: "description", content: "Free AI-SEO and GEO toolkit dashboard. 35+ production-grade tools, no signup." },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: ToolsDashboard,
});

const TOOLS = [
  { to: "/tools/seo-audit", icon: Gauge, name: "Full SEO Audit", desc: "On-page score, fix list, real fetch.", color: "from-indigo-500 to-purple-500", category: "SEO Audit" },
  { to: "/tools/meta-tag-checker", icon: Tag, name: "Meta Tag Checker", desc: "Inspect every meta tag live.", color: "from-blue-500 to-cyan-500", category: "SEO Audit" },
  { to: "/tools/heading-checker", icon: ListTree, name: "Heading Structure", desc: "Visualize H1-H6 outline.", color: "from-cyan-500 to-teal-500", category: "SEO Audit" },
  { to: "/tools/og-checker", icon: Eye, name: "Open Graph Checker", desc: "Facebook / LinkedIn preview.", color: "from-purple-500 to-pink-500", category: "SEO Audit" },
  { to: "/tools/twitter-card-checker", icon: Hash, name: "Twitter Card Checker", desc: "X social preview validator.", color: "from-sky-500 to-blue-500", category: "SEO Audit" },
  { to: "/tools/canonical-checker", icon: MoveRight, name: "Canonical Checker", desc: "Detect canonical conflicts.", color: "from-emerald-500 to-green-500", category: "SEO Audit" },
  { to: "/tools/robots-checker", icon: Bot, name: "Robots.txt Checker", desc: "Parse rules + AI bot status.", color: "from-amber-500 to-orange-500", category: "SEO Audit" },
  { to: "/tools/sitemap-checker", icon: Map, name: "Sitemap Checker", desc: "Parse XML sitemaps + indexes.", color: "from-orange-500 to-rose-500", category: "SEO Audit" },
  { to: "/tools/mobile-checker", icon: Smartphone, name: "Mobile-Friendly", desc: "Viewport + responsive checks.", color: "from-rose-500 to-pink-500", category: "SEO Audit" },
  { to: "/tools/ssl-checker", icon: ShieldCheck, name: "SSL Checker", desc: "HTTPS + HSTS + mixed-content.", color: "from-fuchsia-500 to-violet-500", category: "SEO Audit" },
  { to: "/tools/tech-detector", icon: Cpu, name: "Tech Detector", desc: "CMS, framework, CDN signatures.", color: "from-violet-500 to-purple-500", category: "Website Analysis" },
  { to: "/tools/redirect-checker", icon: ArrowRightLeft, name: "Redirect Checker", desc: "Follow up to 8 redirect hops.", color: "from-indigo-500 to-blue-500", category: "Website Analysis" },
  { to: "/tools/http-headers", icon: ServerCog, name: "HTTP Headers", desc: "Every response header.", color: "from-blue-500 to-cyan-500", category: "Website Analysis" },
  { to: "/tools/page-size", icon: Gauge, name: "Page Size", desc: "HTML / inline / asset breakdown.", color: "from-teal-500 to-emerald-500", category: "Website Analysis" },
  { to: "/tools/keyword-density", icon: Hash, name: "Keyword Density", desc: "1/2/3-word phrase frequency.", color: "from-green-500 to-lime-500", category: "Content SEO" },
  { to: "/tools/readability", icon: BookOpen, name: "Readability", desc: "Flesch reading ease + grade.", color: "from-lime-500 to-yellow-500", category: "Content SEO" },
  { to: "/tools/word-counter", icon: Type, name: "Word Counter", desc: "Words, chars, reading time.", color: "from-yellow-500 to-amber-500", category: "Content SEO" },
  { to: "/tools/link-analyzer", icon: Link2, name: "Link Analyzer", desc: "Internal / external / nofollow.", color: "from-amber-500 to-orange-500", category: "Content SEO" },
  { to: "/tools/broken-links", icon: FileX2, name: "Broken Link Checker", desc: "HEAD-check every link.", color: "from-orange-500 to-red-500", category: "Content SEO" },
  { to: "/tools/image-seo", icon: ImageIcon, name: "Image SEO", desc: "Alt, dims, lazy, modern formats.", color: "from-red-500 to-rose-500", category: "Content SEO" },
  { to: "/tools/schema-validator", icon: Braces, name: "Schema Validator", desc: "Parse + validate JSON-LD.", color: "from-pink-500 to-fuchsia-500", category: "Schema" },
  { to: "/tools/faq-schema", icon: HelpCircle, name: "FAQ Schema", desc: "Generate FAQ JSON-LD.", color: "from-fuchsia-500 to-purple-500", category: "Schema" },
  { to: "/tools/product-schema", icon: Package, name: "Product Schema", desc: "Generate Product JSON-LD.", color: "from-purple-500 to-violet-500", category: "Schema" },
  { to: "/tools/article-schema", icon: Newspaper, name: "Article Schema", desc: "Generate Article JSON-LD.", color: "from-violet-500 to-indigo-500", category: "Schema" },
  { to: "/tools/breadcrumb-schema", icon: ListTree, name: "Breadcrumb Schema", desc: "Generate Breadcrumb JSON-LD.", color: "from-indigo-500 to-blue-500", category: "Schema" },
  { to: "/tools/html-minifier", icon: Code, name: "HTML Minifier", desc: "Compress markup, copy output.", color: "from-blue-500 to-sky-500", category: "Performance" },
  { to: "/tools/css-minifier", icon: Code, name: "CSS Minifier", desc: "Strip whitespace + comments.", color: "from-sky-500 to-cyan-500", category: "Performance" },
  { to: "/tools/js-minifier", icon: Code, name: "JS Minifier", desc: "Quick safe JS minify.", color: "from-cyan-500 to-teal-500", category: "Performance" },
  { to: "/tools/ai-citation-audit", icon: Search, name: "AI Citation Audit", desc: "Why aren't AI engines citing you?", color: "from-indigo-500 to-purple-500", category: "AI Search" },
  { to: "/tools/geo-tracker", icon: BarChart3, name: "GEO Market Intel", desc: "Live AI citation patterns.", color: "from-purple-500 to-pink-500", category: "AI Search" },
  { to: "/tools/content-checker", icon: FileText, name: "Content Readiness", desc: "LLM citation probability.", color: "from-pink-500 to-rose-500", category: "AI Search" },
  { to: "/tools/keyword-research", icon: Wand2, name: "Keyword Research", desc: "Long-tail + intent classifier.", color: "from-rose-500 to-orange-500", category: "Research" },
  { to: "/tools/serp-preview", icon: Eye, name: "SERP Preview", desc: "Pixel-accurate Google snippet.", color: "from-orange-500 to-amber-500", category: "Research" },
  { to: "/tools/meta-generator", icon: Tag, name: "Meta Generator", desc: "OG, Twitter, SEO tags.", color: "from-amber-500 to-yellow-500", category: "Research" },
  { to: "/tools/robots-txt", icon: ScrollText, name: "Robots.txt Builder", desc: "Visual robots.txt builder.", color: "from-yellow-500 to-lime-500", category: "Research" },
  { to: "/tools/schema-generator", icon: FileCode2, name: "Schema & llms.txt", desc: "JSON-LD + llms.txt in 3 steps.", color: "from-emerald-500 to-teal-500", category: "Research" },
  { to: "/tools/backlink-checker", icon: Link2, name: "Backlink Checker", desc: "Authority + spam heuristics.", color: "from-fuchsia-500 to-violet-500", category: "Research" },
];

const STATS = [
  { icon: Users, label: "Active monthly users", value: "2.4M+" },
  { icon: TrendingUp, label: "Audits today", value: "47,392" },
  { icon: Globe2, label: "Domains analyzed", value: "318K" },
  { icon: Zap, label: "Avg. analysis time", value: "0.8s" },
];

function ToolsDashboard() {
  return (
    <ToolPanel>
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-surface p-6 sm:p-8 mb-6 shadow-[var(--shadow-3d)]">
        <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-mesh)" }} />
        <div className="relative">
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded grad-primary text-primary-foreground font-bold">All-in-one SEO + GEO suite</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight">Welcome back — pick a tool to start</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            37 production-grade tools. 100% free. No sign-up. Every result is computed live from the real URL — no fake data, ever.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><s.icon className="size-3.5" />{s.label}</div>
            <div className="font-display text-2xl font-bold mt-1 grad-text">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tool grid */}
      <h2 className="font-display text-xl font-bold mb-4">All Tools</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((t) => (
          <Link key={t.to} to={t.to}>
            <Card3D className="p-5 h-full group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className={`size-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg`}>
                  <t.icon className="size-5 text-white" />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{t.category}</span>
              </div>
              <h3 className="font-display font-semibold mt-4 text-lg">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-snug">{t.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary font-medium group-hover:gap-2.5 transition-all">
                Open tool <ArrowRight className="size-3.5" />
              </div>
            </Card3D>
          </Link>
        ))}
      </div>
    </ToolPanel>
  );
}
