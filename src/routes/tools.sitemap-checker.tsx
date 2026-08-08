import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { fetchUrl } from "@/lib/fetch-url.functions";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/tools/sitemap-checker")({
  head: () => toolHead("sitemap-checker"),
  component: Page,
});

function Page() {
  const fn = useServerFn(fetchUrl);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ count: number; urls: { loc: string; lastmod?: string; priority?: string }[]; isIndex: boolean; raw: string } | null>(null);

  const run = async () => {
    let u = url.trim(); if (!u) return;
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    if (!/sitemap/i.test(u)) u = new URL(u).origin + "/sitemap.xml";
    setLoading(true);
    try {
      const r = await fn({ data: { url: u } });
      const xml = r.html;
      const isIndex = /<sitemapindex/i.test(xml);
      const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map(m => ({
        loc: m[1].match(/<loc>([\s\S]*?)<\/loc>/i)?.[1].trim() || "",
        lastmod: m[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/i)?.[1].trim(),
        priority: m[1].match(/<priority>([\s\S]*?)<\/priority>/i)?.[1].trim(),
      }));
      const sitemaps = [...xml.matchAll(/<sitemap>[\s\S]*?<loc>([\s\S]*?)<\/loc>/gi)].map(m => ({ loc: m[1].trim() }));
      const all = isIndex ? sitemaps : urls;
      setData({ count: all.length, urls: all as typeof urls, isIndex, raw: xml.slice(0, 4000) });
    } finally { setLoading(false); }
  };

  return (
    <ToolPanel>
      <ToolHeader title="Sitemap Checker" desc="Parse sitemap.xml and sitemap-index files. Live XML analysis." />
      <Card3D tilt={false} className="p-4 mb-6">
        <div className="flex gap-2">
          <input value={url} onChange={(e)=>setUrl(e.target.value)} onKeyDown={(e)=>e.key==='Enter'&&run()} placeholder="https://example.com or .../sitemap.xml" className="flex-1 px-3 py-2.5 rounded-md bg-background border border-border outline-none focus:border-primary" />
          <button onClick={run} disabled={loading} className="px-5 py-2.5 rounded-md grad-primary text-primary-foreground font-semibold inline-flex items-center gap-2">{loading && <Loader2 className="size-4 animate-spin" />}Analyze</button>
        </div>
      </Card3D>
      {data && (
        <>
          <Card3D tilt={false} className="p-5 mb-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded bg-surface-2 p-3 border border-border"><div className="text-xs text-muted-foreground">Type</div><div className="font-bold">{data.isIndex ? "Sitemap Index" : "URL Set"}</div></div>
              <div className="rounded bg-surface-2 p-3 border border-border"><div className="text-xs text-muted-foreground">Entries</div><div className="font-display text-2xl font-bold grad-text">{data.count}</div></div>
              <div className="rounded bg-surface-2 p-3 border border-border"><div className="text-xs text-muted-foreground">With lastmod</div><div className="font-bold">{data.urls.filter(u=>u.lastmod).length}</div></div>
            </div>
          </Card3D>
          <Card3D tilt={false} className="p-5">
            <h3 className="font-display font-semibold mb-3">First 100 URLs</h3>
            <div className="max-h-96 overflow-auto text-xs font-mono space-y-1">
              {data.urls.slice(0,100).map((u,i) => (
                <div key={i} className="flex gap-3 py-1 border-b border-border/40">
                  <a href={u.loc} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate flex-1">{u.loc}</a>
                  {u.lastmod && <span className="text-muted-foreground">{u.lastmod.slice(0,10)}</span>}
                </div>
              ))}
            </div>
          </Card3D>
        </>
      )}
    </ToolPanel>
  );
}
