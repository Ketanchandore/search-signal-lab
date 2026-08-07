import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageContainer } from "@/components/Layout";
import { CheckCircle2, Wrench, Zap, Sparkles } from "lucide-react";

const TITLE = "Changelog — Every SEOAcademys Release & New Free Tool";
const DESC =
  "Full release history for SEOAcademys: new free SEO and GEO tools, engine upgrades, performance work and bug fixes, with version filters and dates.";
const URL = "https://seoacademys.com/changelog";

type EntryType = "feature" | "improvement" | "fix";

type Release = {
  version: string;
  date: string;
  iso: string;
  headline: string;
  items: { type: EntryType; text: string }[];
};

const RELEASES: Release[] = [
  {
    version: "v2.4",
    date: "June 2026",
    iso: "2026-06-18",
    headline: "AI SEO Assistant and bulk audit reports",
    items: [
      { type: "feature", text: "AI SEO Assistant answers questions using your connected Search Console, GA4 and Bing properties." },
      { type: "feature", text: "Bulk audit runner: tick any combination of tools and run them against one URL in a single pass." },
      { type: "feature", text: "Printable PDF report export for every bulk audit run." },
      { type: "improvement", text: "Audit engine expanded to 47 signals across access, index, content and experience layers." },
    ],
  },
  {
    version: "v2.3",
    date: "June 2026",
    iso: "2026-06-04",
    headline: "Blog engine, tool hubs and structured data everywhere",
    items: [
      { type: "feature", text: "Blog launched with 10 in-depth GEO and SEO guides, search and category filters." },
      { type: "feature", text: "Three tool hubs: SEO Audit Hub, AI & GEO Hub and Schema Hub." },
      { type: "improvement", text: "Article, FAQPage and BreadcrumbList JSON-LD added to every content page." },
      { type: "improvement", text: "Canonical tags and per-page Open Graph metadata across all routes." },
    ],
  },
  {
    version: "v2.2",
    date: "May 2026",
    iso: "2026-05-21",
    headline: "Accounts, connections and saved history",
    items: [
      { type: "feature", text: "Email and Google sign-in, with a dashboard for saved website projects." },
      { type: "feature", text: "Connect Search Console, GA4 and Bing Webmaster properties as default audit targets." },
      { type: "improvement", text: "Audit runs are stored per account so you can compare against last month." },
      { type: "fix", text: "Mobile tool drawer now scrolls the full tool list on short screens." },
    ],
  },
  {
    version: "v2.1",
    date: "May 2026",
    iso: "2026-05-06",
    headline: "GEO toolkit and AI crawler checks",
    items: [
      { type: "feature", text: "AI Citation Audit scores how quotable a page is for ChatGPT, Gemini, Perplexity and Claude." },
      { type: "feature", text: "GEO Market Intelligence tracker for citation share by engine." },
      { type: "feature", text: "llms.txt generator added to the Schema Generator." },
      { type: "improvement", text: "Robots checker now reports AI crawler access separately from classic crawlers." },
    ],
  },
  {
    version: "v2.0",
    date: "April 2026",
    iso: "2026-04-15",
    headline: "Light theme rebuild and real-time tools",
    items: [
      { type: "feature", text: "Complete visual rebuild on a cool light theme with depth-based 3D cards." },
      { type: "improvement", text: "Every tool now updates live as you type, with debounced server fetches." },
      { type: "improvement", text: "Mobile navigation rebuilt with a bottom tab bar and slide-out tool drawer." },
      { type: "fix", text: "Removed horizontal page scroll on small viewports." },
    ],
  },
  {
    version: "v1.0",
    date: "March 2026",
    iso: "2026-03-02",
    headline: "SEOAcademys launch with 37 free tools",
    items: [
      { type: "feature", text: "Launched 37 free SEO tools covering audit, on-page, schema, content and utilities." },
      { type: "feature", text: "No signup, no usage caps, no stored URLs." },
    ],
  },
];

const ICONS: Record<EntryType, React.ReactNode> = {
  feature: <Sparkles className="size-3.5" />,
  improvement: <Zap className="size-3.5" />,
  fix: <Wrench className="size-3.5" />,
};

const BADGE: Record<EntryType, string> = {
  feature: "bg-primary/10 text-primary border-primary/30",
  improvement: "bg-accent/10 text-accent border-accent/30",
  fix: "bg-muted text-muted-foreground border-border",
};

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "SEOAcademys changelog",
          url: URL,
          itemListElement: RELEASES.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${r.version} — ${r.headline}`,
          })),
        }),
      },
    ],
  }),
  component: Changelog,
});

function Changelog() {
  const [version, setVersion] = useState("all");
  const [type, setType] = useState<"all" | EntryType>("all");

  const majors = useMemo(
    () => Array.from(new Set(RELEASES.map((r) => r.version.split(".")[0]))),
    [],
  );

  const filtered = RELEASES.filter((r) => version === "all" || r.version.startsWith(version))
    .map((r) => ({ ...r, items: type === "all" ? r.items : r.items.filter((i) => i.type === type) }))
    .filter((r) => r.items.length > 0);

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-mono mb-3">Changelog</div>
        <h1 className="font-display text-4xl font-bold tracking-tight">What's new in SEOAcademys</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Every release ships new free tools, engine accuracy work or speed improvements. Nothing here moves behind a paywall.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Last Updated: June 2026</p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          <Chip active={version === "all"} onClick={() => setVersion("all")}>All versions</Chip>
          {majors.map((m) => (
            <Chip key={m} active={version === m} onClick={() => setVersion(m)}>
              {m}.x
            </Chip>
          ))}
          <span className="w-px bg-border mx-1" />
          {(["all", "feature", "improvement", "fix"] as const).map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(t)}>
              {t === "all" ? "All changes" : t === "feature" ? "New" : t === "improvement" ? "Improved" : "Fixed"}
            </Chip>
          ))}
        </div>

        {/* Timeline */}
        <ol className="mt-10 relative border-l border-border pl-6 space-y-10">
          {filtered.map((r) => (
            <li key={r.version} className="relative">
              <span className="absolute -left-[31px] top-1 grid place-items-center size-5 rounded-full bg-primary text-primary-foreground">
                <CheckCircle2 className="size-3.5" />
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-display text-xl font-bold">{r.version}</h2>
                <time dateTime={r.iso} className="text-xs font-mono text-muted-foreground">
                  {r.date}
                </time>
              </div>
              <h3 className="mt-1 text-sm font-medium text-foreground">{r.headline}</h3>
              <ul className="mt-3 space-y-2">
                {r.items.map((it, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span
                      className={`shrink-0 h-fit inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${BADGE[it.type]}`}
                    >
                      {ICONS[it.type]}
                      {it.type === "feature" ? "New" : it.type === "improvement" ? "Improved" : "Fixed"}
                    </span>
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {filtered.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">No entries match those filters.</p>
        )}
      </div>
    </PageContainer>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
        active ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}
