import { useCallback, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { fetchUrl, type FetchResult } from "@/lib/fetch-url.functions";
import { Loader2, Globe, AlertCircle } from "lucide-react";
import { Card3D } from "./Card3D";

type Props = {
  placeholder?: string;
  buttonLabel?: string;
  children: (result: FetchResult) => ReactNode;
  /** override URL initial value */
  initial?: string;
};

export function UrlTool({ placeholder = "https://example.com", buttonLabel = "Analyze", children, initial = "" }: Props) {
  const fn = useServerFn(fetchUrl);
  const [url, setUrl] = useState(initial);
  const [result, setResult] = useState<FetchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const run = useCallback(async () => {
    let u = url.trim();
    if (!u) return;
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    setLoading(true); setErr(""); setResult(null);
    try {
      const r = await fn({ data: { url: u } });
      setResult(r);
      if (!r.ok && r.error) setErr(r.error);
    } catch (e) {
      setErr((e as Error).message);
    } finally { setLoading(false); }
  }, [fn, url]);

  return (
    <>
      <Card3D tilt={false} className="p-4 mb-6">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 rounded-md border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <Globe className="size-4 text-muted-foreground shrink-0" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder={placeholder}
              className="flex-1 py-2.5 bg-transparent outline-none text-sm"
            />
          </div>
          <button
            onClick={run}
            disabled={loading || !url.trim()}
            className="px-5 py-2.5 rounded-md grad-primary text-primary-foreground text-sm font-semibold shadow-[var(--shadow-3d-sm)] hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            {loading ? "Analyzing…" : buttonLabel}
          </button>
        </div>
        {result && (
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <Pill label="Status" value={`${result.status} ${result.statusText}`} ok={result.ok} />
            <Pill label="Final URL" value={result.finalUrl} />
            <Pill label="Size" value={`${(result.bytes / 1024).toFixed(1)} KB`} />
            <Pill label="Time" value={`${result.durationMs} ms`} />
          </div>
        )}
      </Card3D>

      {err && (
        <div className="mb-6 p-4 rounded-md border border-destructive/40 bg-destructive/10 text-destructive flex gap-2 items-start text-sm">
          <AlertCircle className="size-4 mt-0.5" /> <span>{err}</span>
        </div>
      )}

      {result && children(result)}
    </>
  );
}

function Pill({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1">
      <span className="font-semibold text-foreground/80">{label}:</span>
      <span className={ok === undefined ? "" : ok ? "text-success" : "text-destructive"}>{value}</span>
    </span>
  );
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <Card3D tilt={false} className="p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </Card3D>
  );
}

export function KV({ k, v, ok }: { k: string; v: ReactNode; ok?: boolean | null }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-border/60 last:border-0 text-sm">
      <div className="w-44 shrink-0 text-muted-foreground">{k}</div>
      <div className={`flex-1 break-words ${ok === true ? "text-success" : ok === false ? "text-destructive" : ""}`}>{v || <span className="text-muted-foreground italic">—</span>}</div>
    </div>
  );
}
