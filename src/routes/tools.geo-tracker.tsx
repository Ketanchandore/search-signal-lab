import { createFileRoute } from "@tanstack/react-router";
import { AffiliateBar, PageContainer } from "@/components/Layout";
import { useState } from "react";
import { Download } from "lucide-react";

export const Route = createFileRoute("/tools/geo-tracker")({
  head: () => ({
    meta: [
      { title: "GEO Market Intelligence — SEOAcademys" },
      { name: "description", content: "Track which websites Google AI Overviews, ChatGPT Search, and Perplexity cite most." },
      { property: "og:title", content: "GEO Market Intelligence Dashboard" },
      { property: "og:description", content: "Live AI citation data across industries." },
      { property: "og:url", content: "/tools/geo-tracker" },
    ],
    links: [{ rel: "canonical", href: "/tools/geo-tracker" }],
  }),
  component: TrackerTool,
});

type Row = { intent: string; domain: string; engine: "Google AI Overviews" | "ChatGPT Search" | "Perplexity"; type: string; strategy: string; category: string };

const ROWS: Row[] = [
  { intent: "best cloud hosting 2026", domain: "aws.amazon.com", engine: "Google AI Overviews", type: "Direct Answer", strategy: "FAQ Schema + Stats", category: "Tech" },
  { intent: "how to invest in index funds", domain: "investopedia.com", engine: "ChatGPT Search", type: "Expert Guide", strategy: "Entity Authority", category: "Finance" },
  { intent: "symptoms of vitamin D deficiency", domain: "healthline.com", engine: "Perplexity", type: "Medical Info", strategy: "Citation + Sources", category: "Health" },
  { intent: "best CRM software", domain: "g2.com", engine: "Google AI Overviews", type: "Comparison", strategy: "Structured List", category: "SaaS" },
  { intent: "Python vs JavaScript 2026", domain: "stackoverflow.com", engine: "ChatGPT Search", type: "Technical", strategy: "Code + Data", category: "Tech" },
  { intent: "credit card rewards comparison", domain: "nerdwallet.com", engine: "Perplexity", type: "Finance", strategy: "Data Table", category: "Finance" },
  { intent: "remote work productivity tips", domain: "hbr.org", engine: "Google AI Overviews", type: "Authoritative", strategy: "Research Citation", category: "Tech" },
  { intent: "WordPress vs Webflow", domain: "kinsta.com", engine: "Perplexity", type: "Comparison", strategy: "Schema Markup", category: "Tech" },
  { intent: "diabetes management diet", domain: "webmd.com", engine: "ChatGPT Search", type: "Medical", strategy: "Medical Schema", category: "Health" },
  { intent: "AI tools for business 2026", domain: "forbes.com", engine: "Google AI Overviews", type: "News/List", strategy: "Author Entity", category: "Tech" },
  { intent: "best laptops under 50000 INR", domain: "gadgets360.com", engine: "Google AI Overviews", type: "Product", strategy: "Product Schema", category: "E-Commerce" },
  { intent: "GST registration India", domain: "cleartax.in", engine: "Perplexity", type: "Legal/Finance", strategy: "FAQ Schema", category: "Finance" },
  { intent: "how to start dropshipping", domain: "shopify.com/blog", engine: "ChatGPT Search", type: "Tutorial", strategy: "HowTo Schema", category: "E-Commerce" },
  { intent: "free email marketing tools", domain: "mailchimp.com", engine: "Google AI Overviews", type: "SaaS", strategy: "Feature List", category: "SaaS" },
  { intent: "best mutual funds India", domain: "valueresearchonline.com", engine: "Perplexity", type: "Finance", strategy: "Data Table", category: "Finance" },
  { intent: "machine learning roadmap", domain: "towardsdatascience.com", engine: "ChatGPT Search", type: "Education", strategy: "Structured Guide", category: "Tech" },
  { intent: "ecommerce SEO guide", domain: "semrush.com/blog", engine: "Google AI Overviews", type: "SEO", strategy: "Long-form Authority", category: "E-Commerce" },
  { intent: "React vs Next.js", domain: "vercel.com/blog", engine: "ChatGPT Search", type: "Technical", strategy: "Developer Entity", category: "Tech" },
  { intent: "weight loss meal plan", domain: "healthline.com", engine: "Perplexity", type: "Health", strategy: "Structured Plan", category: "Health" },
  { intent: "startup funding options India", domain: "inc42.com", engine: "Google AI Overviews", type: "Business", strategy: "News Authority", category: "Finance" },
];

const FILTERS = ["All", "Tech", "Finance", "Health", "E-Commerce", "SaaS"];

const engineColor = (e: Row["engine"]) =>
  e === "Google AI Overviews" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" :
  e === "ChatGPT Search" ? "bg-primary/15 text-primary border-primary/30" :
  "bg-purple-500/15 text-purple-400 border-purple-500/30";

function TrackerTool() {
  const [filter, setFilter] = useState("All");
  const rows = filter === "All" ? ROWS : ROWS.filter((r) => r.category === filter);

  const downloadCsv = () => {
    const header = ["Intent", "Domain", "Engine", "Type", "Strategy", "Category"];
    const csv = [header.join(",")].concat(rows.map((r) => [r.intent, r.domain, r.engine, r.type, r.strategy, r.category].map((c) => `"${c}"`).join(","))).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const u = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = u; a.download = "geo-citations.csv"; a.click();
    URL.revokeObjectURL(u);
  };

  return (
    <PageContainer>
      <AffiliateBar />
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">GEO Market Intelligence</h1>
        <span className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground font-semibold">LIVE DATA · Updated Weekly</span>
      </div>
      <p className="text-muted-foreground mb-6">Track which websites Google AI Overviews, ChatGPT Search, and Perplexity are citing most across major industries.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-md text-sm border ${filter === f ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">#</th>
                <th className="text-left px-4 py-3">Search Intent</th>
                <th className="text-left px-4 py-3">Top Cited Domain</th>
                <th className="text-left px-4 py-3">AI Engine</th>
                <th className="text-left px-4 py-3">Citation Type</th>
                <th className="text-left px-4 py-3">Key Strategy</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border hover:bg-background/40">
                  <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{r.intent}</td>
                  <td className="px-4 py-3 font-mono text-xs text-primary">{r.domain}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 text-[10px] rounded border ${engineColor(r.engine)}`}>{r.engine}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{r.type}</td>
                  <td className="px-4 py-3">{r.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-border flex justify-end">
          <button onClick={downloadCsv} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-xs hover:border-primary hover:text-primary">
            <Download className="size-3" /> Download CSV
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Insight title="Most Cited Domain Type" value="Comparison / Review Sites" sub="34% of all AI citations" />
        <Insight title="Fastest Growing Strategy" value="FAQ Schema + Direct Answers" sub="+127% YoY" />
        <Insight title="Lowest Competition" value="Regional / Local AI Optimization" sub="India, SE Asia opportunity" />
      </div>
    </PageContainer>
  );
}

function Insight({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{title}</div>
      <div className="font-display text-lg font-bold mt-2 text-primary">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}
