import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageContainer } from "@/components/Layout";
import { listConnections, connectProperty, disconnectProperty, PROVIDERS, type DataConnection } from "@/lib/connections.functions";
import { toast } from "sonner";
import { Loader2, Link2, Unlink } from "lucide-react";

export const Route = createFileRoute("/_authenticated/connections")({
  head: () => ({
    meta: [
      { title: "Connect Search Console, GA4 & Bing | SEOAcademys" },
      { name: "description", content: "Connect one property at a time from Google Search Console, GA4 or Bing Webmaster Tools so the AI assistant can diagnose it." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Connect Search Console, GA4 & Bing | SEOAcademys" },
      { property: "og:description", content: "One active project at a time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Connect Search Console, GA4 & Bing | SEOAcademys" },
      { name: "twitter:description", content: "One active project at a time." },
    ],
  }),
  component: ConnectionsPage,
});

function ConnectionsPage() {
  const load = useServerFn(listConnections);
  const add = useServerFn(connectProperty);
  const remove = useServerFn(disconnectProperty);
  const [rows, setRows] = useState<DataConnection[]>([]);
  const [provider, setProvider] = useState<string>("gsc");
  const [property, setProperty] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { load().then(setRows).catch(() => undefined); }, [load]);
  const active = rows.find((r) => r.active);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const row = await add({ data: { provider, property } });
      setRows((r) => [row, ...r]);
      setProperty("");
      toast.success("Project connected");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not connect");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageContainer>
      <div className="py-8 sm:py-12 max-w-3xl">
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Connected project</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          One project can be active at a time. Disconnect the current one before switching. The AI assistant and the bulk audit runner both use this property as their default target.
        </p>

        <section className="mt-6 rounded-2xl border border-border bg-surface/50 p-5">
          {active ? (
            <div className="flex flex-wrap items-center gap-3">
              <Link2 className="size-5 text-primary" />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{PROVIDERS.find((p) => p.id === active.provider)?.label}</div>
                <div className="truncate text-sm text-muted-foreground">{active.property}</div>
              </div>
              <button
                onClick={async () => { await remove({ data: { id: active.id } }); setRows((r) => r.filter((x) => x.id !== active.id)); toast.success("Disconnected"); }}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:border-destructive hover:text-destructive"
              >
                <Unlink className="size-4" /> Disconnect
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[auto_1fr_auto]">
              <select value={provider} onChange={(e) => setProvider(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
                {PROVIDERS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
              <input
                required
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                placeholder="example.com or G-XXXXXXXXXX"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Link2 className="size-4" />} Connect
              </button>
            </form>
          )}
        </section>
      </div>
    </PageContainer>
  );
}
