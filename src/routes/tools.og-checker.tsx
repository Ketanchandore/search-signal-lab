import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section, KV } from "@/components/UrlTool";
import { getMeta } from "@/lib/html-analyzer";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/og-checker")({
  head: () => toolHead("og-checker"),
  component: () => (
    <ToolPanel>
      <ToolHeader title="Open Graph Checker" desc="Preview how Facebook, LinkedIn and Slack will render your link." />
      <UrlTool>{(r) => <View html={r.html} />}</UrlTool>
    </ToolPanel>
  ),
});

function View({ html }: { html: string }) {
  const m = useMemo(() => getMeta(html), [html]);
  const og = m.og;
  return (
    <>
      <Section title="OG tags">
        {["title","description","image","url","type","site_name","locale"].map(k => <KV key={k} k={`og:${k}`} v={og[k] || ""} ok={!!og[k]} />)}
      </Section>
      <Section title="Live social preview">
        <div className="max-w-md rounded-lg overflow-hidden border border-border bg-background">
          {og.image && <img src={og.image} alt="" className="w-full aspect-[1.91/1] object-cover" />}
          <div className="p-3">
            <div className="text-[10px] uppercase text-muted-foreground">{og.site_name || og.url}</div>
            <div className="font-semibold mt-1">{og.title || m.title || "No og:title"}</div>
            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{og.description || m.description}</div>
          </div>
        </div>
      </Section>
    </>
  );
}
