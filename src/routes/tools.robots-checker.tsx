import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { fetchUrl } from "@/lib/fetch-url.functions";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/tools/robots-checker")({
  head: () => ({ meta: [{ title: "Robots.txt Checker — SEOAcademys" }] }),
  component: Page,
});

function Page() {
  const fn = useServerFn(fetchUrl);
  const [url, setUrl] = useState("");
  const [out, setOut] = useState<{ body: string; rules: { ua: string; allow: string[]; disallow: string[]; sitemap: string[] }[]; sitemaps: string[]; aiBots: { name: string; blocked: boolean }[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    let u = url.trim(); if (!u) return;
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    try {
      const origin = new URL(u).origin + "/robots.txt";
      setLoading(true);
      const r = await fn({ data: { url: origin } });
      const body = r.html || "";
      setOut({ body, ...parse(body) });
    } finally { setLoading(false); }
  };

  return (
    <ToolPanel>
      <ToolHeader title="Robots.txt Checker" desc="Fetch and parse the robots.txt of any domain. Detect AI crawler rules." />
      <Card3D tilt={false} className="p-4 mb-6">
        <div className="flex gap-2">
          <input value={url} onChange={(e)=>setUrl(e.target.value)} onKeyDown={(e)=>e.key==='Enter'&&run()} placeholder="https://example.com" className="flex-1 px-3 py-2.5 rounded-md bg-background border border-border outline-none focus:border-primary" />
          <button onClick={run} disabled={loading} className="px-5 py-2.5 rounded-md grad-primary text-primary-foreground font-semibold inline-flex items-center gap-2">{loading && <Loader2 className="size-4 animate-spin" />}Fetch robots.txt</button>
        </div>
      </Card3D>
      {out && (
        <>
          <Card3D tilt={false} className="p-5 mb-4">
            <h3 className="font-display font-semibold mb-3">Raw file</h3>
            <pre className="text-xs bg-surface-2 p-3 rounded max-h-72 overflow-auto whitespace-pre-wrap font-mono">{out.body || "(empty / not found)"}</pre>
          </Card3D>
          <Card3D tilt={false} className="p-5 mb-4">
            <h3 className="font-display font-semibold mb-3">AI crawler status</h3>
            <ul className="grid sm:grid-cols-2 gap-2">{out.aiBots.map(b => <li key={b.name} className={`text-sm flex justify-between rounded border p-2 ${b.blocked ? "border-destructive/30 bg-destructive/5" : "border-success/30 bg-success/5"}`}><span>{b.name}</span><span className={b.blocked ? "text-destructive" : "text-success"}>{b.blocked ? "Blocked" : "Allowed"}</span></li>)}</ul>
          </Card3D>
          <Card3D tilt={false} className="p-5 mb-4">
            <h3 className="font-display font-semibold mb-3">Rules by User-Agent</h3>
            {out.rules.map((r,i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="font-mono text-sm text-primary mb-1">User-agent: {r.ua}</div>
                {r.allow.map(a=> <div key={a} className="text-xs ml-4 text-success">Allow: {a}</div>)}
                {r.disallow.map(a=> <div key={a} className="text-xs ml-4 text-destructive">Disallow: {a}</div>)}
              </div>
            ))}
          </Card3D>
          {out.sitemaps.length > 0 && (
            <Card3D tilt={false} className="p-5"><h3 className="font-display font-semibold mb-3">Sitemaps declared</h3>{out.sitemaps.map(s => <a key={s} href={s} target="_blank" rel="noreferrer" className="block text-sm text-primary hover:underline">{s}</a>)}</Card3D>
          )}
        </>
      )}
    </ToolPanel>
  );
}

const AI_BOTS = ["GPTBot","ChatGPT-User","OAI-SearchBot","ClaudeBot","Claude-Web","anthropic-ai","PerplexityBot","Google-Extended","CCBot","Bytespider","Amazonbot","Applebot-Extended"];

function parse(body: string) {
  const lines = body.split(/\r?\n/);
  const rules: { ua: string; allow: string[]; disallow: string[]; sitemap: string[] }[] = [];
  let cur: typeof rules[number] | null = null;
  const sitemaps: string[] = [];
  for (const raw of lines) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const [k, ...rest] = line.split(":");
    const v = rest.join(":").trim();
    const key = k.toLowerCase();
    if (key === "user-agent") { cur = { ua: v, allow: [], disallow: [], sitemap: [] }; rules.push(cur); }
    else if (cur && key === "allow") cur.allow.push(v);
    else if (cur && key === "disallow") cur.disallow.push(v);
    else if (key === "sitemap") sitemaps.push(v);
  }
  const star = rules.find(r => r.ua === "*");
  const aiBots = AI_BOTS.map(name => {
    const own = rules.find(r => r.ua.toLowerCase() === name.toLowerCase());
    const r = own || star;
    const blocked = !!r && r.disallow.includes("/");
    return { name, blocked };
  });
  return { rules, sitemaps, aiBots };
}
