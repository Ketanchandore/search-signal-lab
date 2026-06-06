import { createFileRoute } from "@tanstack/react-router";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section, KV } from "@/components/UrlTool";
import { getMeta, getHeadings, getImages, getJsonLd, getLinks, detectTech, wordTokens } from "@/lib/html-analyzer";
import { Check, X } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/seo-audit")({
  head: () => ({ meta: [{ title: "Free SEO Audit Tool — Real On-Page Analyzer | SEOAcademys" }, { name: "description", content: "Audit any URL: meta, headings, OG, schema, links, images, redirects, tech stack — all real, no signup." }] }),
  component: Page,
});

function Page() {
  return (
    <ToolPanel>
      <ToolHeader title="SEO Audit Tool" badge="REAL FETCH" desc="Live on-page SEO audit. We fetch the URL server-side and analyze its actual HTML." />
      <UrlTool>
        {(r) => <Audit r={r} />}
      </UrlTool>
    </ToolPanel>
  );
}

function Audit({ r }: { r: ReturnType<typeof Object> }) {
  const result = r as { html: string; headers: Record<string, string>; finalUrl: string; status: number; redirectChain: { url: string; status: number }[]; bytes: number };
  const meta = useMemo(() => getMeta(result.html), [result.html]);
  const headings = useMemo(() => getHeadings(result.html), [result.html]);
  const links = useMemo(() => getLinks(result.html, result.finalUrl), [result.html, result.finalUrl]);
  const images = useMemo(() => getImages(result.html, result.finalUrl), [result.html, result.finalUrl]);
  const jsonld = useMemo(() => getJsonLd(result.html), [result.html]);
  const tech = useMemo(() => detectTech(result.html, result.headers), [result.html, result.headers]);

  const wordCount = useMemo(() => wordTokens(result.html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")).length, [result.html]);
  const missingAlt = images.filter((i) => !i.alt).length;
  const h1Count = headings.filter((h) => h.level === 1).length;
  const issues = [
    { ok: !!meta.title && meta.title.length >= 30 && meta.title.length <= 65, msg: `Title length (${meta.title.length} chars, ideal 30-65)` },
    { ok: !!meta.description && meta.description.length >= 80 && meta.description.length <= 165, msg: `Description length (${meta.description.length} chars, ideal 80-165)` },
    { ok: h1Count === 1, msg: `Exactly one H1 (found ${h1Count})` },
    { ok: !!meta.viewport, msg: "Viewport meta present (mobile)" },
    { ok: !!meta.canonical, msg: "Canonical URL declared" },
    { ok: result.finalUrl.startsWith("https://"), msg: "Served over HTTPS" },
    { ok: !!meta.og.title, msg: "Open Graph title present" },
    { ok: missingAlt === 0, msg: `All ${images.length} images have alt text (${missingAlt} missing)` },
    { ok: jsonld.length > 0, msg: `Structured data present (${jsonld.length} JSON-LD blocks)` },
    { ok: result.bytes < 1_500_000, msg: `Page size under 1.5MB (${(result.bytes/1024).toFixed(0)}KB)` },
  ];
  const score = Math.round((issues.filter(i => i.ok).length / issues.length) * 100);

  return (
    <>
      <Section title={`Overall SEO Score: ${score}/100`}>
        <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
          <div className={`h-full ${score >= 80 ? "bg-success" : score >= 60 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${score}%` }} />
        </div>
        <ul className="grid md:grid-cols-2 gap-2 text-sm">
          {issues.map((i) => (
            <li key={i.msg} className={`flex gap-2 p-2.5 rounded border ${i.ok ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
              {i.ok ? <Check className="size-4 text-success shrink-0 mt-0.5" /> : <X className="size-4 text-destructive shrink-0 mt-0.5" />}
              <span>{i.msg}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Meta tags">
        <KV k="Title" v={meta.title} ok={!!meta.title} />
        <KV k="Description" v={meta.description} ok={!!meta.description} />
        <KV k="Canonical" v={meta.canonical} />
        <KV k="Robots" v={meta.robots || "default (index, follow)"} />
        <KV k="Viewport" v={meta.viewport} ok={!!meta.viewport} />
        <KV k="Language" v={meta.lang} />
        <KV k="Charset" v={meta.charset} />
      </Section>

      <Section title={`Headings (${headings.length})`}>
        <ul className="text-sm space-y-1 max-h-72 overflow-auto">
          {headings.map((h, i) => (
            <li key={i} className="flex gap-3 py-1">
              <span className="font-mono text-xs px-1.5 py-0.5 rounded grad-primary text-primary-foreground">H{h.level}</span>
              <span>{h.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={`Links (${links.length})`}>
        <div className="grid grid-cols-3 gap-3 text-center mb-3">
          <Stat label="Internal" value={links.filter(l => l.internal).length} />
          <Stat label="External" value={links.filter(l => !l.internal).length} />
          <Stat label="Nofollow" value={links.filter(l => l.nofollow).length} />
        </div>
      </Section>

      <Section title={`Images (${images.length})`}>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat label="Total" value={images.length} />
          <Stat label="Missing alt" value={missingAlt} bad={missingAlt > 0} />
          <Stat label="Lazy loaded" value={images.filter(i => i.loading === "lazy").length} />
        </div>
      </Section>

      <Section title="Technology detected">
        <div className="flex flex-wrap gap-2">
          {tech.length === 0 && <span className="text-sm text-muted-foreground">No common signatures detected.</span>}
          {tech.map((t, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">{t.name} <span className="text-muted-foreground">· {t.category}</span></span>
          ))}
        </div>
      </Section>

      <Section title="Content stats">
        <KV k="Word count" v={String(wordCount)} />
        <KV k="JSON-LD blocks" v={String(jsonld.length)} />
        <KV k="Redirects followed" v={String(Math.max(0, result.redirectChain.length - 1))} />
      </Section>
    </>
  );
}

function Stat({ label, value, bad }: { label: string; value: number; bad?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-display text-2xl font-bold ${bad ? "text-destructive" : ""}`}>{value}</div>
    </div>
  );
}
