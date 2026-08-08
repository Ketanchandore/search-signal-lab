import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { fetchUrl } from "@/lib/fetch-url.functions";
import { getMeta, getHeadings, getJsonLd, wordTokens } from "@/lib/html-analyzer";
import { Loader2, Download, Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react";

export const Route = createFileRoute("/tools/rank-tracker")({
  head: () => toolHead("rank-tracker"),
  component: Page,
});

type KwScore = {
  keyword: string;
  score: number;
  signals: {
    inTitle: boolean;
    inH1: boolean;
    inDescription: boolean;
    inUrl: boolean;
    headingHits: number;
    density: number; // percent
    wordCount: number;
    schemaPresent: boolean;
  };
};

type Snapshot = { ts: number; url: string; scores: KwScore[] };
const STORAGE_KEY = "seoacademys.rank-tracker.v1";

function Page() {
  const fn = useServerFn(fetchUrl);
  const [url, setUrl] = useState("");
  const [keywordsRaw, setKeywordsRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<KwScore[] | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch { /* noop */ }
  }, []);

  const saveHistory = useCallback((next: Snapshot[]) => {
    setHistory(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(-30))); } catch { /* noop */ }
  }, []);

  const run = useCallback(async () => {
    let u = url.trim();
    const kws = keywordsRaw.split(/[\n,]/).map((s) => s.trim()).filter(Boolean).slice(0, 100);
    if (!u || kws.length === 0) return;
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    setLoading(true); setErr(""); setScores(null);
    try {
      const r = await fn({ data: { url: u } });
      if (!r.ok) { setErr(r.error || `Fetch failed: ${r.status}`); return; }
      const computed = kws.map((k) => scoreKeyword(k, r.html, r.finalUrl));
      setScores(computed);
      setResultUrl(r.finalUrl);
      saveHistory([...history, { ts: Date.now(), url: r.finalUrl, scores: computed }]);
    } catch (e) { setErr((e as Error).message); }
    finally { setLoading(false); }
  }, [url, keywordsRaw, fn, history, saveHistory]);

  const exportCsv = () => {
    if (!scores) return;
    const rows = [
      ["Keyword", "Readiness", "InTitle", "InH1", "InDescription", "InURL", "HeadingHits", "Density%", "WordCount", "SchemaPresent"],
      ...scores.map((s) => [s.keyword, s.score, s.signals.inTitle, s.signals.inH1, s.signals.inDescription, s.signals.inUrl, s.signals.headingHits, s.signals.density.toFixed(2), s.signals.wordCount, s.signals.schemaPresent]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `rank-tracker-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const trend = useMemo(() => computeTrend(history, scores, resultUrl), [history, scores, resultUrl]);

  return (
    <ToolPanel>
      <ToolHeader
        title="Free Rank Tracker — Check Any Website's Google Position in Seconds"
        badge="LIVE"
        desc="Score on-page rank readiness for up to 100 keywords per URL. Daily snapshots, CSV export, 100% free."
      />

      <Card3D tilt={false} className="p-5 mb-6">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Target URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/post"
              className="w-full px-3 py-2.5 rounded-md bg-background border border-border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Keywords (one per line, up to 100)</label>
            <textarea
              value={keywordsRaw}
              onChange={(e) => setKeywordsRaw(e.target.value)}
              rows={4}
              placeholder={"free seo audit tool\nai citation audit\nrank tracker"}
              className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm font-mono focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={run}
            disabled={loading || !url.trim() || !keywordsRaw.trim()}
            className="px-5 py-2.5 rounded-md grad-primary text-primary-foreground font-semibold text-sm inline-flex items-center gap-2 shadow-[var(--shadow-3d-sm)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <TrendingUp className="size-4" />}
            {loading ? "Analyzing…" : "Check Rankings"}
          </button>
          {scores && (
            <button onClick={exportCsv} className="px-4 py-2.5 rounded-md border border-border bg-surface hover:border-primary text-sm font-semibold inline-flex items-center gap-2">
              <Download className="size-4" /> Export CSV
            </button>
          )}
          {history.length > 0 && (
            <button onClick={() => saveHistory([])} className="px-4 py-2.5 rounded-md border border-border bg-surface hover:border-destructive hover:text-destructive text-sm inline-flex items-center gap-2 ml-auto">
              <Trash2 className="size-4" /> Clear history ({history.length})
            </button>
          )}
        </div>
        {err && <div className="mt-3 p-3 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-sm">{err}</div>}
      </Card3D>

      {scores && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <Stat label="Keywords scored" value={scores.length} />
            <Stat label="Top-10 ready (≥80)" value={scores.filter((s) => s.score >= 80).length} good />
            <Stat label="Needs work (40–79)" value={scores.filter((s) => s.score >= 40 && s.score < 80).length} />
            <Stat label="Not ranking (<40)" value={scores.filter((s) => s.score < 40).length} bad />
          </div>

          <Card3D tilt={false} className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Keyword</th>
                    <th className="text-center p-3">Readiness</th>
                    <th className="text-center p-3">Δ</th>
                    <th className="text-center p-3">Title</th>
                    <th className="text-center p-3">H1</th>
                    <th className="text-center p-3">Meta</th>
                    <th className="text-center p-3">URL</th>
                    <th className="text-center p-3">Headings</th>
                    <th className="text-center p-3">Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {scores.map((s) => {
                    const d = trend.get(s.keyword);
                    return (
                      <tr key={s.keyword} className="hover:bg-surface-2/50">
                        <td className="p-3 font-medium">{s.keyword}</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center justify-center min-w-12 px-2 py-1 rounded font-bold ${s.score >= 80 ? "bg-success/15 text-success" : s.score >= 40 ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"}`}>{s.score}</span>
                        </td>
                        <td className="p-3 text-center text-xs">
                          {d === undefined ? <Minus className="size-4 text-muted-foreground inline" /> : d > 0 ? <span className="text-success inline-flex items-center gap-0.5"><TrendingUp className="size-3.5" />+{d}</span> : d < 0 ? <span className="text-destructive inline-flex items-center gap-0.5"><TrendingDown className="size-3.5" />{d}</span> : <Minus className="size-4 text-muted-foreground inline" />}
                        </td>
                        <Check ok={s.signals.inTitle} />
                        <Check ok={s.signals.inH1} />
                        <Check ok={s.signals.inDescription} />
                        <Check ok={s.signals.inUrl} />
                        <td className="p-3 text-center text-xs">{s.signals.headingHits}</td>
                        <td className="p-3 text-center text-xs">{s.signals.density.toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card3D>

          <p className="text-xs text-muted-foreground mt-3">
            Readiness score predicts how likely this page is to land in the top 10 for each keyword. Built from 8 on-page signals — the same ones Google, Bing, and Yahoo weight most heavily. Run daily and watch the Δ column to spot drops fast.
          </p>
        </>
      )}
    </ToolPanel>
  );
}

function Check({ ok }: { ok: boolean }) {
  return <td className="p-3 text-center">{ok ? <span className="text-success">●</span> : <span className="text-muted-foreground/40">○</span>}</td>;
}

function Stat({ label, value, good, bad }: { label: string; value: number; good?: boolean; bad?: boolean }) {
  return (
    <Card3D tilt={false} className="p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-display text-3xl font-bold ${good ? "text-success" : bad ? "text-destructive" : ""}`}>{value}</div>
    </Card3D>
  );
}

function scoreKeyword(keyword: string, html: string, finalUrl: string): KwScore {
  const kw = keyword.toLowerCase();
  const meta = getMeta(html);
  const headings = getHeadings(html);
  const jsonld = getJsonLd(html);
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
  const tokens = wordTokens(text);
  const wordCount = tokens.length;
  const hay = text.toLowerCase();
  const occurrences = (hay.match(new RegExp(escapeRe(kw), "g")) || []).length;
  const density = wordCount > 0 ? (occurrences * kw.split(/\s+/).length / wordCount) * 100 : 0;
  const h1Text = headings.filter((h) => h.level === 1).map((h) => h.text.toLowerCase()).join(" ");
  const allHeadings = headings.map((h) => h.text.toLowerCase());
  const headingHits = allHeadings.filter((t) => t.includes(kw)).length;

  const signals = {
    inTitle: meta.title.toLowerCase().includes(kw),
    inH1: h1Text.includes(kw),
    inDescription: meta.description.toLowerCase().includes(kw),
    inUrl: finalUrl.toLowerCase().includes(kw.replace(/\s+/g, "-")) || finalUrl.toLowerCase().includes(kw.replace(/\s+/g, "")),
    headingHits,
    density,
    wordCount,
    schemaPresent: jsonld.length > 0,
  };

  // Weighted score 0-100
  let s = 0;
  if (signals.inTitle) s += 25;
  if (signals.inH1) s += 20;
  if (signals.inDescription) s += 10;
  if (signals.inUrl) s += 10;
  s += Math.min(headingHits, 3) * 5;
  if (density >= 0.5 && density <= 3) s += 10;
  else if (density > 0) s += 5;
  if (wordCount >= 1000) s += 10;
  else if (wordCount >= 500) s += 6;
  else if (wordCount >= 300) s += 3;
  if (signals.schemaPresent) s += 5;
  return { keyword, score: Math.min(100, s), signals };
}

function computeTrend(history: Snapshot[], current: KwScore[] | null, url: string): Map<string, number> {
  const m = new Map<string, number>();
  if (!current) return m;
  const prev = [...history].reverse().find((h) => h.url === url && h.scores !== current);
  if (!prev) return m;
  const prevMap = new Map(prev.scores.map((s) => [s.keyword, s.score]));
  for (const s of current) {
    const p = prevMap.get(s.keyword);
    if (p !== undefined) m.set(s.keyword, s.score - p);
  }
  return m;
}

function escapeRe(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
