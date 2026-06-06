import { createFileRoute } from "@tanstack/react-router";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section } from "@/components/UrlTool";
import { detectTech, wpThemeDetect } from "@/lib/html-analyzer";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/tech-detector")({
  head: () => ({ meta: [{ title: "Website Technology Detector — SEOAcademys" }] }),
  component: () => (
    <ToolPanel>
      <ToolHeader title="Website Technology Detector" desc="Detect CMS, framework, CDN, analytics and more from HTML + headers." />
      <UrlTool>{(r) => <View html={r.html} headers={r.headers} />}</UrlTool>
    </ToolPanel>
  ),
});

function View({ html, headers }: { html: string; headers: Record<string,string> }) {
  const sigs = useMemo(() => detectTech(html, headers), [html, headers]);
  const theme = useMemo(() => wpThemeDetect(html), [html]);
  const groups = sigs.reduce<Record<string, typeof sigs>>((a, s) => { (a[s.category] ||= []).push(s); return a; }, {});
  return (
    <>
      {theme && <Section title="WordPress theme"><div className="font-mono">{theme}</div></Section>}
      {Object.entries(groups).map(([cat, items]) => (
        <Section key={cat} title={cat}>
          <div className="flex flex-wrap gap-2">
            {items.map((t, i) => <span key={i} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">{t.name}</span>)}
          </div>
        </Section>
      ))}
      {sigs.length === 0 && <Section title="Result"><p className="text-sm text-muted-foreground">No common signatures detected.</p></Section>}
    </>
  );
}
