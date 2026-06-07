import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Search, FileCode2, FileText, BarChart3, Globe2,
  Eye, Tag, Bot, Link2, ChevronLeft, ChevronRight, Sparkles, Wand2,
  Gauge, Hash, Type, ListTree, ShieldCheck, ArrowRightLeft, ServerCog,
  Map, Smartphone, Cpu, ImageIcon, FileX2, BookOpen, Code, Braces, ScrollText, HelpCircle, Package, Newspaper, MoveRight,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "SEOAcademys Tools Dashboard — Free GEO & AI SEO Suite" },
      { name: "description", content: "Free AI-SEO tools dashboard. Citation audit, schema, keyword research, SERP preview, backlinks, and more." },
    ],
  }),
  component: ToolsLayout,
});

type NavItem = { to: string; label: string; icon: typeof Search; badge?: string };
type NavGroup = { label: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [{ to: "/tools", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "SEO Audit",
    items: [
      { to: "/tools/seo-audit", label: "Full SEO Audit", icon: Gauge, badge: "HOT" },
      { to: "/tools/meta-tag-checker", label: "Meta Tag Checker", icon: Tag },
      { to: "/tools/heading-checker", label: "Heading Structure", icon: ListTree },
      { to: "/tools/og-checker", label: "Open Graph Checker", icon: Eye },
      { to: "/tools/twitter-card-checker", label: "Twitter Card Checker", icon: Hash },
      { to: "/tools/canonical-checker", label: "Canonical URL", icon: MoveRight },
      { to: "/tools/robots-checker", label: "Robots.txt Checker", icon: Bot },
      { to: "/tools/sitemap-checker", label: "Sitemap Checker", icon: Map },
      { to: "/tools/mobile-checker", label: "Mobile-Friendly", icon: Smartphone },
      { to: "/tools/ssl-checker", label: "SSL Checker", icon: ShieldCheck },
    ],
  },
  {
    label: "Website Analysis",
    items: [
      { to: "/tools/tech-detector", label: "Tech Detector", icon: Cpu },
      { to: "/tools/redirect-checker", label: "Redirect Checker", icon: ArrowRightLeft },
      { to: "/tools/http-headers", label: "HTTP Headers", icon: ServerCog },
      { to: "/tools/page-size", label: "Page Size Analyzer", icon: Gauge },
    ],
  },
  {
    label: "Content SEO",
    items: [
      { to: "/tools/keyword-density", label: "Keyword Density", icon: Hash },
      { to: "/tools/readability", label: "Readability", icon: BookOpen },
      { to: "/tools/word-counter", label: "Word Counter", icon: Type },
      { to: "/tools/link-analyzer", label: "Link Analyzer", icon: Link2 },
      { to: "/tools/broken-links", label: "Broken Link Checker", icon: FileX2 },
      { to: "/tools/image-seo", label: "Image SEO Checker", icon: ImageIcon },
    ],
  },
  {
    label: "Schema & Structured Data",
    items: [
      { to: "/tools/schema-validator", label: "Schema Validator", icon: Braces },
      { to: "/tools/faq-schema", label: "FAQ Schema", icon: HelpCircle },
      { to: "/tools/product-schema", label: "Product Schema", icon: Package },
      { to: "/tools/article-schema", label: "Article Schema", icon: Newspaper },
      { to: "/tools/breadcrumb-schema", label: "Breadcrumb Schema", icon: ListTree },
      { to: "/tools/schema-generator", label: "Schema & llms.txt", icon: FileCode2 },
    ],
  },
  {
    label: "Performance",
    items: [
      { to: "/tools/html-minifier", label: "HTML Minifier", icon: Code },
      { to: "/tools/css-minifier", label: "CSS Minifier", icon: Code },
      { to: "/tools/js-minifier", label: "JS Minifier", icon: Code },
    ],
  },
  {
    label: "AI Search & GEO",
    items: [
      { to: "/tools/ai-citation-audit", label: "AI Citation Audit", icon: Search, badge: "LIVE" },
      { to: "/tools/geo-tracker", label: "GEO Market Intel", icon: BarChart3 },
      { to: "/tools/content-checker", label: "Content Readiness", icon: FileText },
    ],
  },
  {
    label: "Research",
    items: [
      { to: "/tools/keyword-research", label: "Keyword Research", icon: Wand2 },
      { to: "/tools/serp-preview", label: "SERP Preview", icon: Eye },
      { to: "/tools/meta-generator", label: "Meta Tag Generator", icon: Tag },
      { to: "/tools/robots-txt", label: "Robots.txt Builder", icon: ScrollText },
      { to: "/tools/backlink-checker", label: "Backlink Checker", icon: Link2 },
    ],
  },
];

function ToolsLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex sticky top-14 self-start h-[calc(100vh-3.5rem)] flex-col border-r border-border bg-surface/80 backdrop-blur transition-[width] duration-200",
          collapsed ? "w-[68px]" : "w-[260px]",
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          {!collapsed && (
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" /> SEO Suite
            </div>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="ml-auto inline-flex size-7 items-center justify-center rounded-md border border-border bg-background hover:text-primary hover:border-primary"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-6 space-y-5">
          {NAV.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <div className="px-3 mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/80 font-semibold">
                  {group.label}
                </div>
              )}
              <ul className="space-y-0.5">
                {group.items.map((it) => {
                  const active = path === it.to;
                  const Icon = it.icon;
                  return (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        title={collapsed ? it.label : undefined}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition relative",
                          active
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        {active && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r grad-primary" />
                        )}
                        <Icon className={cn("size-4 shrink-0", active && "text-primary")} />
                        {!collapsed && (
                          <>
                            <span className="truncate">{it.label}</span>
                            {it.badge && (
                              <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full grad-primary text-primary-foreground font-bold">
                                {it.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {!collapsed && (
          <div className="m-3 p-3 rounded-lg border border-primary/20 bg-primary/5">
            <div className="text-xs font-semibold text-primary">Pro Tip</div>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              All tools run 100% in your browser. Nothing leaves your device.
            </p>
          </div>
        )}
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-14 z-30 border-b border-border bg-surface/70 backdrop-blur">
          <div className="flex items-center gap-3 px-4 md:px-8 h-12 text-xs">
            <Link to="/tools" className="text-muted-foreground hover:text-primary">Tools</Link>
            <Crumb path={path} />
            <div className="ml-auto hidden sm:flex items-center gap-2 text-muted-foreground">
              <span className="inline-flex size-2 rounded-full bg-success animate-pulse" />
              All systems live
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

const NAMES: Record<string, string> = {
  "ai-citation-audit": "AI Citation Audit",
  "geo-tracker": "GEO Market Intel",
  "content-checker": "Content Readiness",
  "schema-generator": "Schema & llms.txt",
  "meta-generator": "Meta Tag Generator",
  "robots-txt": "Robots.txt Builder",
  "serp-preview": "SERP Preview",
  "keyword-research": "Keyword Research",
  "backlink-checker": "Backlink Checker",
  "seo-audit": "Full SEO Audit",
  "meta-tag-checker": "Meta Tag Checker",
  "heading-checker": "Heading Structure",
  "og-checker": "Open Graph Checker",
  "twitter-card-checker": "Twitter Card Checker",
  "canonical-checker": "Canonical URL",
  "robots-checker": "Robots.txt Checker",
  "sitemap-checker": "Sitemap Checker",
  "mobile-checker": "Mobile-Friendly",
  "ssl-checker": "SSL Checker",
  "tech-detector": "Tech Detector",
  "redirect-checker": "Redirect Checker",
  "http-headers": "HTTP Headers",
  "page-size": "Page Size",
  "keyword-density": "Keyword Density",
  "readability": "Readability",
  "word-counter": "Word Counter",
  "link-analyzer": "Link Analyzer",
  "broken-links": "Broken Links",
  "image-seo": "Image SEO",
  "schema-validator": "Schema Validator",
  "faq-schema": "FAQ Schema",
  "product-schema": "Product Schema",
  "article-schema": "Article Schema",
  "breadcrumb-schema": "Breadcrumb Schema",
  "html-minifier": "HTML Minifier",
  "css-minifier": "CSS Minifier",
  "js-minifier": "JS Minifier",
};

function Crumb({ path }: { path: string }) {
  const slug = path.split("/tools/")[1];
  if (!slug) return null;
  return (
    <>
      <span className="text-muted-foreground">/</span>
      <span className="text-foreground font-medium">{NAMES[slug] ?? slug}</span>
    </>
  );
}

export function ToolPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("px-4 md:px-8 py-6 max-w-[1400px] mx-auto", className)}>
      <ToolSeo />
      {children}
    </div>
  );
}

export { Globe2 };
