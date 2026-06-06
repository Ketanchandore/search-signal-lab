import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { fetchUrl } from "@/lib/fetch-url.functions";
import { getLinks } from "@/lib/html-analyzer";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/tools/broken-links")({
  head: () => ({ meta: [{ title: "Broken Link Checker — SEOAcademys" }] }),
  component: Page,
});

function Page() {
  const fn = useServerFn(fetchUrl);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [results, setResults] = useState<{ href: string; status: number; ok: boolean }[]>([]);

  const run = async () => {
    let u = url.trim(); if (!u) return;
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    setLoading(true); setResults([]);
    try {
      const main = await fn({ data: { url: u } });
      const all = getLinks(main.html, main.finalUrl).filter(l => /^https?:/i.test(l.href));
      const unique = Array.from(new Set(all.map(l => l.href))).slice(0, 40);
      setProgress({ done: 0, total: unique.length });
      const out: typeof results = [];
      const batch = 6;
      for (let i = 0; i < unique.length; i += batch) {
        const chunk = unique.slice(i, i + batch);
        const res = await Promise.all(chunk.map(async (href) => {
          try {
            const r = await fn({ data: { url: href, method: "HEAD" } });
            return { href, status: r.status, ok: r.status > 0 && r.status < 400 };
          } catch { return { href, status: 0, ok: false }; }
        }));
        out.push(...res);
        setProgress({ done: out.length, total: unique.length });
        setResults([...out]);
      }
    } finally { setLoading(false); }
  };

  const broken = results.filter(r => !r.ok);
  return (
    <ToolPanel>
      <ToolHeader title="Broken Link Checker" desc="Crawls the first 40 unique links on a page and HEAD-checks each one." />
      <Card3D tilt={false} className="p-4 mb-6">
        <div className="flex gap-2">
          <input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()} placeholder="https://example.com" className="flex-1 px-3 py-2.5 rounded-md bg-background border border-border" />
          <button onClick={run} disabled={loading} className="px-5 py-2.5 rounded-md grad-primary text-primary-foreground font-semibold inline-flex gap-2 items-center">{loading && <Loader2 className="size-4 animate-spin" />}Scan</button>
        </div>
        {loading && progress.total>0 && <div className="mt-3 text-xs text-muted-foreground">Checked {progress.done} / {progress.total}…</div>}
      </Card3D>
      {results.length>0 && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Card3D tilt={false} className="p-4 text-center"><div className="text-xs text-muted-foreground">Total</div><div className="font-display text-3xl font-bold">{results.length}</div></Card3D>
            <Card3D tilt={false} className="p-4 text-center"><div className="text-xs text-muted-foreground">OK</div><div className="font-display text-3xl font-bold text-success">{results.length-broken.length}</div></Card3D>
            <Card3D tilt={false} className="p-4 text-center"><div className="text-xs text-muted-foreground">Broken</div><div className="font-display text-3xl font-bold text-destructive">{broken.length}</div></Card3D>
          </div>
          <Card3D tilt={false} className="p-4">
            <h3 className="font-display font-semibold mb-3">Results</h3>
            <div className="max-h-96 overflow-auto text-sm space-y-1">
              {results.map((r,i) => (
                <div key={i} className="flex gap-3 py-1 border-b border-border/40">
                  <span className={`font-mono text-xs w-12 ${r.ok ? "text-success" : "text-destructive"}`}>{r.status || "ERR"}</span>
                  <a href={r.href} target="_blank" rel="noreferrer" className="truncate text-primary hover:underline">{r.href}</a>
                </div>
              ))}
            </div>
          </Card3D>
        </>
      )}
    </ToolPanel>
  );
}
