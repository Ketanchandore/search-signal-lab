import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { fetchUrl } from "@/lib/fetch-url.functions";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/tools/ssl-checker")({
  head: () => toolHead("ssl-checker"),
  component: Page,
});

function Page() {
  const fn = useServerFn(fetchUrl);
  const [url, setUrl] = useState("");
  const [out, setOut] = useState<{ https: boolean; hsts: string; mixed: boolean; status: number; finalUrl: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    let u = url.trim(); if (!u) return;
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    setLoading(true);
    try {
      const r = await fn({ data: { url: u } });
      const mixed = /["'](http:\/\/[^"']+)["']/i.test(r.html) && r.finalUrl.startsWith("https://");
      const h = r.headers as Record<string, string>;
      setOut({ https: r.finalUrl.startsWith("https://"), hsts: h["strict-transport-security"] || "", mixed, status: r.status, finalUrl: r.finalUrl });
    } finally { setLoading(false); }
  };

  return (
    <ToolPanel>
      <ToolHeader title="SSL / HTTPS Checker" desc="Verify HTTPS, HSTS header and mixed-content risk for any URL." />
      <Card3D tilt={false} className="p-4 mb-6">
        <div className="flex gap-2">
          <input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()} placeholder="https://example.com" className="flex-1 px-3 py-2.5 rounded-md bg-background border border-border" />
          <button onClick={run} disabled={loading} className="px-5 py-2.5 rounded-md grad-primary text-primary-foreground font-semibold inline-flex gap-2 items-center">{loading && <Loader2 className="size-4 animate-spin" />}Check</button>
        </div>
      </Card3D>
      {out && (
        <Card3D tilt={false} className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {out.https ? <ShieldCheck className="size-10 text-success" /> : <ShieldAlert className="size-10 text-destructive" />}
            <div>
              <div className="text-2xl font-display font-bold">{out.https ? "Secure" : "Not secure"}</div>
              <div className="text-sm text-muted-foreground">{out.finalUrl}</div>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between border-b border-border py-2"><span>HTTPS in use</span><span className={out.https ? "text-success" : "text-destructive"}>{out.https ? "Yes" : "No"}</span></li>
            <li className="flex justify-between border-b border-border py-2"><span>HSTS header</span><span className={out.hsts ? "text-success" : "text-warning"}>{out.hsts || "Missing"}</span></li>
            <li className="flex justify-between border-b border-border py-2"><span>Mixed content (http://)</span><span className={out.mixed ? "text-destructive" : "text-success"}>{out.mixed ? "Detected" : "Clean"}</span></li>
            <li className="flex justify-between py-2"><span>HTTP status</span><span>{out.status}</span></li>
          </ul>
        </Card3D>
      )}
    </ToolPanel>
  );
}
