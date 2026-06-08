import { createFileRoute } from "@tanstack/react-router";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section, KV } from "@/components/UrlTool";
import { getMeta } from "@/lib/html-analyzer";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/meta-tag-checker")({
  head: () => ({ meta: [{ title: "Free Meta Tag Checker — Inspect Any URL Instantly | SEOAcademys" }, { name: "description", content: "Check title length, meta description, OG tags, Twitter cards on any URL. Live fetch, real data. Free SEO tool." }, { property: "og:title", content: "Free Meta Tag Checker — Inspect Any URL Instantly" }, { property: "og:description", content: "Live title, description, OG and Twitter tag inspector. Free." }, { property: "og:url", content: "/tools/meta-tag-checker" }], links: [{ rel: "canonical", href: "/tools/meta-tag-checker" }] }),
  component: () => (
    <ToolPanel>
      <ToolHeader title="Meta Tag Checker" desc="Inspect every meta tag of any URL — title, description, robots, viewport, charset, canonical." />
      <UrlTool>{(r) => <View html={r.html} />}</UrlTool>
    </ToolPanel>
  ),
});

function View({ html }: { html: string }) {
  const m = useMemo(() => getMeta(html), [html]);
  return (
    <Section title="Meta tags found">
      <KV k="<title>" v={`${m.title} (${m.title.length} chars)`} ok={m.title.length >= 30 && m.title.length <= 65} />
      <KV k="description" v={`${m.description} (${m.description.length} chars)`} ok={m.description.length >= 80 && m.description.length <= 165} />
      <KV k="keywords" v={m.keywords} />
      <KV k="robots" v={m.robots} />
      <KV k="viewport" v={m.viewport} ok={!!m.viewport} />
      <KV k="charset" v={m.charset} ok={!!m.charset} />
      <KV k="canonical" v={m.canonical} ok={!!m.canonical} />
      <KV k="<html lang>" v={m.lang} ok={!!m.lang} />
    </Section>
  );
}
