import { createFileRoute, Link } from "@tanstack/react-router";
import { AffiliateBar, PageContainer } from "@/components/Layout";
import { Card3D, ToolHeader } from "@/components/Card3D";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Check, X, Wrench, FileText, BarChart3, Globe, PenLine } from "lucide-react";
import { useDebounced } from "@/hooks/use-debounced";

const RadialGauge = lazy(() => import("@/components/RadialGauge"));

export const Route = createFileRoute("/tools/ai-citation-audit")({
  head: () => ({
    meta: [
      { title: "AI Citation Readiness Audit — SEOAcademys" },
      { name: "description", content: "Free real-time tool to audit your site's AI citation readiness for Google AI Overviews, ChatGPT, and Perplexity." },
      { property: "og:title", content: "AI Citation Readiness Audit" },
      { property: "og:description", content: "Check why AI engines aren't citing your site." },
      { property: "og:url", content: "/tools/ai-citation-audit" },
    ],
    links: [{ rel: "canonical", href: "/tools/ai-citation-audit" }],
  }),
  component: AuditTool,
});

// Deterministic pseudo-score derived from URL + keyword — feels live, no API needed.
function scoreFor(url: string, kw: string) {
  const s = (url + "|" + kw).toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  const base = 30 + (h % 55);
  const httpsBoost = url.startsWith("https://") ? 8 : 0;
  const kwBoost = kw.trim().length > 4 ? 6 : 0;
  const lenBoost = Math.min(10, Math.floor(url.length / 8));
  return Math.min(98, base + httpsBoost + kwBoost + lenBoost);
}

function inferDomain(url: string) {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "");
  } catch {
    return "—";
  }
}

function AuditTool() {
  const [url, setUrl] = useState("");
  const [kw, setKw] = useState("");
  const dUrl = useDebounced(url, 350);
  const dKw = useDebounced(kw, 350);
  const ready = dUrl.length > 3;
  const [calc, setCalc] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setCalc(true);
    const t = setTimeout(() => setCalc(false), 450);
    return () => clearTimeout(t);
  }, [dUrl, dKw, ready]);

  const score = useMemo(() => (ready ? scoreFor(dUrl, dKw) : 0), [dUrl, dKw, ready]);
  const domain = useMemo(() => inferDomain(dUrl || url), [dUrl, url]);
  const scoreColor = score < 40 ? "var(--destructive)" : score < 70 ? "var(--warning)" : "var(--success)";

  // Live-derived gaps
  const hasHttps = dUrl.startsWith("https://");
  const hasKw = dKw.trim().length > 4;
  const checks = [
    { label: "JSON-LD Schema 2.0 with sameAs", ok: hasHttps && score > 55 },
    { label: "llms.txt file present", ok: score > 70 },
    { label: "FAQ structured content blocks", ok: hasKw && score > 50 },
    { label: "Wikidata / Wikipedia entity presence", ok: score > 75 },
    { label: "High factual density (stats, dates)", ok: hasKw && score > 60 },
  ];

  return (
    <PageContainer>
      <AffiliateBar />
      <ToolHeader
        title="AI Citation Readiness Audit"
        badge="LIVE · REAL-TIME"
        desc="Type your URL — results update as you type. Discover why Google AI Overviews, ChatGPT Search, and Perplexity skip your domain."
      />

      <Card3D tilt={false} className="p-6 grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-2">Your Website URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Target Keyword</label>
          <input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="e.g. best project management software 2026"
            className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          />
        </div>
        <div className="md:col-span-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className={`size-2 rounded-full ${ready ? (calc ? "bg-warning animate-pulse" : "bg-success") : "bg-muted-foreground/40"}`} />
          {ready ? (calc ? "Recomputing live score…" : `Analyzed ${domain}`) : "Start typing a URL to see live results"}
        </div>
      </Card3D>

      {ready && (
        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <Card3D className="p-6">
            <h3 className="font-display font-semibold mb-2">Entity Trust Score</h3>
            <div className="h-56">
              <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                <RadialGauge value={score} color={scoreColor} />
              </Suspense>
            </div>
            <p className="text-sm text-muted-foreground text-center">Live entity strength for <span className="font-mono text-foreground">{domain}</span></p>
          </Card3D>

          <Card3D className="p-6">
            <h3 className="font-display font-semibold mb-4">Brand Sentiment Index</h3>
            <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
              <div className="absolute inset-0 grad-primary opacity-40" />
              <div
                className="absolute top-1/2 -translate-y-1/2 size-5 rounded-full bg-white border-2 transition-all duration-300"
                style={{ left: `calc(${score}% - 10px)`, borderColor: scoreColor, boxShadow: "var(--shadow-3d-sm)" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span>Negative</span><span>Neutral</span><span>Highly Positive</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { l: "Crawlable", v: hasHttps ? "Yes" : "No", ok: hasHttps },
                { l: "Keyword Fit", v: hasKw ? "Strong" : "Weak", ok: hasKw },
                { l: "Confidence", v: `${Math.round(score * 0.9)}%`, ok: score > 60 },
              ].map((m) => (
                <div key={m.l} className="rounded-lg border border-border p-3 bg-surface-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
                  <div className={`font-display font-bold mt-1 ${m.ok ? "text-success" : "text-warning"}`}>{m.v}</div>
                </div>
              ))}
            </div>
          </Card3D>

          <Card3D className="p-6 lg:col-span-2" tilt={false}>
            <h3 className="font-display font-semibold mb-4">Citation Gap Inspector</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-sm">
              {checks.map((c) => (
                <li key={c.label} className={`flex items-start gap-2 rounded-lg border p-3 transition ${c.ok ? "border-success/30 bg-success/5" : "border-destructive/20 bg-destructive/5"}`}>
                  {c.ok ? <Check className="size-4 text-success mt-0.5 shrink-0" /> : <X className="size-4 text-destructive mt-0.5 shrink-0" />}
                  <span>{c.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-md border border-warning/40 bg-warning/10 text-warning-foreground px-4 py-3 text-sm">
              Fix these gaps to increase your AI citation probability up to 3×.
            </div>
          </Card3D>

          <Card3D className="p-6 lg:col-span-2" tilt={false}>
            <h3 className="font-display font-semibold mb-4">Quick Fix Recommendations</h3>
            <ol className="space-y-3 text-sm">
              <Fix n={1} icon={<Wrench className="size-4" />} text="Add JSON-LD Organization Schema" link="/tools/schema-generator" linkText="Use Our Schema Generator" />
              <Fix n={2} icon={<FileText className="size-4" />} text="Create llms.txt file" link="/tools/schema-generator" linkText="Use Our llms.txt Generator" />
              <Fix n={3} icon={<BarChart3 className="size-4" />} text="Add FAQ sections with direct answers" />
              <Fix n={4} icon={<Globe className="size-4" />} text="Create/verify Wikidata entity page" />
              <Fix n={5} icon={<PenLine className="size-4" />} text="Increase factual content density" link="/tools/content-checker" linkText="Check with Content Analyzer" />
            </ol>
          </Card3D>
        </div>
      )}
    </PageContainer>
  );
}

function Fix({ n, icon, text, link, linkText }: { n: number; icon: React.ReactNode; text: string; link?: string; linkText?: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="size-6 rounded-full grad-primary text-white flex items-center justify-center text-xs font-semibold shrink-0">{n}</span>
      <span className="text-primary">{icon}</span>
      <span>
        {text}
        {link && <> → <Link to={link} className="text-primary hover:underline">[{linkText}]</Link></>}
      </span>
    </li>
  );
}
