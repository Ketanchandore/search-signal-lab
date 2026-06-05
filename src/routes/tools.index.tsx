import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, FileCode2, FileText, BarChart3, Eye, Tag, Bot, Wand2, Link2, ArrowRight, TrendingUp, Users, Globe2, Zap,
} from "lucide-react";
import { Card3D } from "@/components/Card3D";
import { ToolPanel } from "./tools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Tools Dashboard — SEOAcademys" },
      { name: "description", content: "Free AI-SEO and GEO toolkit dashboard. 9 production-grade tools, no signup." },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: ToolsDashboard,
});

const TOOLS = [
  { to: "/tools/ai-citation-audit", icon: Search, name: "AI Citation Audit", desc: "Why aren't AI engines citing your domain?", color: "from-indigo-500 to-purple-500", category: "AI Search" },
  { to: "/tools/geo-tracker", icon: BarChart3, name: "GEO Market Intel", desc: "20+ live AI citation patterns across industries.", color: "from-purple-500 to-pink-500", category: "AI Search" },
  { to: "/tools/content-checker", icon: FileText, name: "Content Readiness", desc: "Live LLM citation probability scoring.", color: "from-blue-500 to-cyan-500", category: "AI Search" },
  { to: "/tools/schema-generator", icon: FileCode2, name: "Schema & llms.txt", desc: "JSON-LD + llms.txt in 3 steps.", color: "from-cyan-500 to-teal-500", category: "Technical" },
  { to: "/tools/meta-generator", icon: Tag, name: "Meta Tag Generator", desc: "Title, description, OG, Twitter cards.", color: "from-emerald-500 to-green-500", category: "Technical" },
  { to: "/tools/robots-txt", icon: Bot, name: "Robots.txt Builder", desc: "Visual robots.txt with AI crawler rules.", color: "from-amber-500 to-orange-500", category: "Technical" },
  { to: "/tools/serp-preview", icon: Eye, name: "SERP Preview", desc: "See your snippet before Google does.", color: "from-orange-500 to-rose-500", category: "Technical" },
  { to: "/tools/keyword-research", icon: Wand2, name: "Keyword Research", desc: "Long-tail expander + intent classifier.", color: "from-rose-500 to-pink-500", category: "Research" },
  { to: "/tools/backlink-checker", icon: Link2, name: "Backlink Checker", desc: "Estimate authority + spam signals.", color: "from-fuchsia-500 to-violet-500", category: "Research" },
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
            9 production-grade tools. 100% free. No sign-up. Every result is computed live in your browser — no data leaves your device.
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
