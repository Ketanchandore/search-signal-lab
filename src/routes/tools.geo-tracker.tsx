import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { AffiliateBar, PageContainer } from "@/components/Layout";
import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { Card3D, ToolHeader } from "@/components/Card3D";
import { useDebounced } from "@/hooks/use-debounced";


export const Route = createFileRoute("/tools/geo-tracker")({
  head: () => toolHead("geo-tracker") => {
      if (filter !== "All" && r.category !== filter) return false;
      if (!ql) return true;
      return r.intent.toLowerCase().includes(ql) || r.domain.toLowerCase().includes(ql) || r.strategy.toLowerCase().includes(ql);
    });
  }, [filter, dq]);

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
      <ToolHeader title="GEO Market Intelligence" badge="LIVE DATA · Updated Weekly" desc="Search and filter 20+ live citation patterns across Tech, Finance, Health, and SaaS. Results update as you type." />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search intent, domain, or strategy…"
            className="w-full pl-9 pr-3 py-2.5 rounded-md bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-md text-sm border transition ${filter === f ? "border-primary text-white grad-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"}`}>
              {f}
            </button>
          ))}
        </div>
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
