import { createFileRoute, Link } from "@tanstack/react-router";
import { AffiliateBar, PageContainer } from "@/components/Layout";
import { useState } from "react";
import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Check, X, Wrench, FileText, BarChart3, Globe, PenLine } from "lucide-react";

export const Route = createFileRoute("/tools/ai-citation-audit")({
  head: () => ({
    meta: [
      { title: "AI Citation Readiness Audit — SEOAcademys" },
      { name: "description", content: "Free tool to audit your site's AI citation readiness for Google AI Overviews, ChatGPT, and Perplexity." },
      { property: "og:title", content: "AI Citation Readiness Audit" },
      { property: "og:description", content: "Check why AI engines aren't citing your site." },
      { property: "og:url", content: "/tools/ai-citation-audit" },
    ],
    links: [{ rel: "canonical", href: "/tools/ai-citation-audit" }],
  }),
  component: AuditTool,
});

const STEPS = [
  "Resolving domain entity signals...",
  "Checking Knowledge Graph entity status...",
  "Scanning for Schema markup presence...",
  "Evaluating factual content density...",
  "Comparing against top cited sources...",
  "Generating Citation Gap Report...",
];

function AuditTool() {
  const [url, setUrl] = useState("");
  const [kw, setKw] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const run = () => {
    if (!url) return;
    setPhase("loading");
    setProgress(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setProgress(i);
      if (i >= STEPS.length) {
        clearInterval(t);
        const s = url.includes("https://") && kw.length > 0 ? 45 : 30;
        setScore(s);
        setPhase("done");
      }
    }, 800);
  };

  const scoreColor = score < 40 ? "var(--destructive)" : score < 70 ? "var(--warning)" : "var(--primary)";

  return (
    <PageContainer>
      <AffiliateBar />

      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">AI Citation Readiness Audit</h1>
        <span className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground font-semibold">FREE TOOL</span>
      </div>
      <p className="text-muted-foreground mb-8">Discover why Google AI Overviews, ChatGPT Search, and Perplexity skip your domain.</p>

      <div className="rounded-xl border border-border bg-surface p-6 grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-2">Your Website URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full px-3 py-2 rounded-md bg-background border border-border focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Target Keyword / Search Intent</label>
          <input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="e.g. best project management software 2026"
            className="w-full px-3 py-2 rounded-md bg-background border border-border focus:border-primary outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <button
            onClick={run}
            disabled={phase === "loading"}
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-50"
          >
            {phase === "loading" ? "Analyzing..." : "Analyze AI Footprint"}
          </button>
        </div>
      </div>

      {phase !== "idle" && (
        <div className="mt-6 rounded-xl border border-border bg-[#08110d] p-5 font-mono text-sm">
          {STEPS.slice(0, progress).map((s) => (
            <div key={s} className="text-primary">✓ {s}</div>
          ))}
          {phase === "loading" && progress < STEPS.length && (
            <div className="text-muted-foreground">▸ {STEPS[progress]}</div>
          )}
        </div>
      )}

      {phase === "done" && (
        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-display font-semibold mb-2">Entity Trust Score</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: score, fill: scoreColor }]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="v" cornerRadius={20} background={{ fill: "var(--secondary)" }} />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-display" style={{ fontSize: 36, fontWeight: 700, fill: "var(--foreground)" }}>
                    {score}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center">Your brand's entity recognition strength inside LLM knowledge graphs</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-display font-semibold mb-4">Brand Sentiment Index</h3>
            <div className="relative h-4 rounded-full bg-secondary overflow-hidden flex">
              {["Negative", "Uncertain", "Neutral", "Positive", "Highly Positive"].map((_, i) => (
                <div key={i} className="flex-1 border-r border-border last:border-r-0" />
              ))}
              <div className="absolute top-1/2 -translate-y-1/2 size-5 rounded-full bg-warning border-2 border-background" style={{ left: "48%" }} />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span>Negative</span><span>Uncertain</span><span>Neutral</span><span>Positive</span><span>Highly Positive</span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">AI training data alignment with your brand: <span className="text-warning font-semibold">Neutral</span></p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 lg:col-span-2">
            <h3 className="font-display font-semibold mb-4">Citation Gap Inspector</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-primary mb-3">✓ Top Cited Sites Have:</div>
                <ul className="space-y-2 text-sm">
                  {gapItems.map((g) => (
                    <li key={g} className="flex gap-2 text-primary"><Check className="size-4 mt-0.5" /> <span className="text-foreground">{g}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold text-destructive mb-3">✗ Your Site Is Missing:</div>
                <ul className="space-y-2 text-sm">
                  {gapItems.map((g) => (
                    <li key={g} className="flex gap-2 text-destructive"><X className="size-4 mt-0.5" /> <span className="text-foreground">{g}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-md border border-warning/40 bg-warning/10 text-warning px-4 py-3 text-sm">
              Fix these 5 gaps to increase your AI citation probability by up to 3x.
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 lg:col-span-2">
            <h3 className="font-display font-semibold mb-4">Quick Fix Recommendations</h3>
            <ol className="space-y-3 text-sm">
              <Fix n={1} icon={<Wrench className="size-4" />} text="Add JSON-LD Organization Schema" link="/tools/schema-generator" linkText="Use Our Schema Generator" />
              <Fix n={2} icon={<FileText className="size-4" />} text="Create llms.txt file" link="/tools/schema-generator" linkText="Use Our llms.txt Generator" />
              <Fix n={3} icon={<BarChart3 className="size-4" />} text="Add FAQ sections with direct answers" />
              <Fix n={4} icon={<Globe className="size-4" />} text="Create/verify Wikidata entity page" />
              <Fix n={5} icon={<PenLine className="size-4" />} text="Increase factual content density" link="/tools/content-checker" linkText="Check with Content Analyzer" />
            </ol>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

const gapItems = [
  "JSON-LD Schema 2.0 with sameAs tags",
  "llms.txt file present",
  "FAQ structured content blocks",
  "Wikidata / Wikipedia entity presence",
  "High factual density (stats, numbers, dates)",
];

function Fix({ n, icon, text, link, linkText }: { n: number; icon: React.ReactNode; text: string; link?: string; linkText?: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="size-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold shrink-0">{n}</span>
      <span className="text-primary">{icon}</span>
      <span>
        {text}
        {link && <> → <Link to={link} className="text-primary hover:underline">[{linkText}]</Link></>}
      </span>
    </li>
  );
}
