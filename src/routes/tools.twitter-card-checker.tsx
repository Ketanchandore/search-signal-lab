import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section, KV } from "@/components/UrlTool";
import { getMeta } from "@/lib/html-analyzer";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/twitter-card-checker")({
  head: () => toolHead("twitter-card-checker") => <View html={r.html} />}</UrlTool>
    </ToolPanel>
  ),
});

function View({ html }: { html: string }) {
  const m = useMemo(() => getMeta(html), [html]);
  const t = m.twitter;
  const img = t.image || m.og.image;
  return (
    <>
      <Section title="Twitter tags">
        {["card","site","creator","title","description","image"].map(k => <KV key={k} k={`twitter:${k}`} v={t[k] || ""} ok={!!t[k]} />)}
      </Section>
      <Section title="Preview">
        <div className="max-w-md rounded-2xl overflow-hidden border border-border bg-background">
          {img && <img src={img} alt="" className="w-full aspect-[2/1] object-cover" />}
          <div className="p-3">
            <div className="font-semibold">{t.title || m.title}</div>
            <div className="text-sm text-muted-foreground line-clamp-2">{t.description || m.description}</div>
          </div>
        </div>
      </Section>
    </>
  );
}
