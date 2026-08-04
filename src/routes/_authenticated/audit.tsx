import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageContainer } from "@/components/Layout";
import { AUDIT_CHECKS, type CheckResult } from "@/lib/audit-engine";
import { runAudit, type AuditRun } from "@/lib/audit.functions";
import { toast } from "sonner";
import { Loader2, Play, Download, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

export const Route = createFileRoute("/_authenticated/audit")({
  head: () => ({
    meta: [
      { title: "Bulk SEO & GEO Audit Runner | SEOAcademys" },
      { name: "description", content: "Run every SEOAcademys tool on one URL at once and download a full PDF SEO + GEO audit report." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Bulk SEO & GEO Audit Runner | SEOAcademys" },
      { property: "og:description", content: "Tick the tools, hit run, download the report." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bulk SEO & GEO Audit Runner | SEOAcademys" },
      { name: "twitter:description", content: "Tick the tools, hit run, download the report." },
    ],
  }),
  component: AuditPage,
});

const ICON: Record<string, typeof CheckCircle2> = { pass: CheckCircle2, warn: AlertTriangle, fail: XCircle, info: Info };
const COLOR: Record<string, string> = { pass: "text-emerald-600", warn: "text-amber-600", fail: "text-rose-600", info: "text-muted-foreground" };

function AuditPage() {
  const run = useServerFn(runAudit);
  const [url, setUrl] = useState("");
  const [selected, setSelected] = useState<string[]>(AUDIT_CHECKS.map((c) => c.id));
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AuditRun | null>(null);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  async function start(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const r = await run({ data: { url: url.trim(), checks: selected } });
      setResult(r);
      toast.success(`Audit complete — score ${r.score}/100`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Audit failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageContainer>
      <div className="py-8 sm:py-12">
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Bulk Audit Runner</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Enter one URL, tick the tools you want, press Run. Every selected tool crawls the live page and the results land in one downloadable report — no need to open each tool.
        </p>

        <form onSubmit={start} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page"
            className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />} {busy ? "Running…" : "Run audit"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-border bg-surface/50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display font-bold">Tools to run ({selected.length}/{AUDIT_CHECKS.length})</h2>
            <div className="flex gap-2 text-xs">
              <button type="button" onClick={() => setSelected(AUDIT_CHECKS.map((c) => c.id))} className="rounded-md border border-border px-3 py-1.5 hover:border-primary">Select all</button>
              <button type="button" onClick={() => setSelected([])} className="rounded-md border border-border px-3 py-1.5 hover:border-primary">Clear</button>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIT_CHECKS.map((c) => (
              <label key={c.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm hover:border-primary">
                <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggle(c.id)} className="size-4 accent-current text-primary" />
                <span className="min-w-0 flex-1 truncate">{c.label}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">{c.category}</span>
              </label>
            ))}
          </div>
        </div>

        {result && <Report run={result} />}
      </div>
    </PageContainer>
  );
}

function Report({ run }: { run: AuditRun }) {
  return (
    <section className="mt-8 print:mt-0" id="report">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold">Report — {run.url}</h2>
          <p className="text-sm text-muted-foreground">Overall score {run.score}/100 · {run.results.length} tools run</p>
        </div>
        <button onClick={() => window.print()} className="print:hidden inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">
          <Download className="size-4" /> Download PDF
        </button>
      </div>

      <div className="mt-5 grid gap-3">
        {run.results.map((r: CheckResult) => {
          const Icon = ICON[r.status] ?? Info;
          return (
            <article key={r.id} className="rounded-xl border border-border bg-surface/50 p-4 break-inside-avoid">
              <header className="flex items-start gap-3">
                <Icon className={`size-5 shrink-0 ${COLOR[r.status]}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{r.label}</h3>
                    <span className="text-xs text-muted-foreground">{r.category}</span>
                    {r.status !== "info" && <span className="text-xs font-medium">{r.score}/100</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>
                </div>
              </header>
              {r.details.length > 0 && (
                <dl className="mt-3 grid gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
                  {r.details.map((d, i) => (
                    <div key={i} className="flex gap-2 border-b border-border/50 py-1">
                      <dt className="shrink-0 text-muted-foreground">{d.k}</dt>
                      <dd className="min-w-0 flex-1 truncate font-mono">{d.v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
