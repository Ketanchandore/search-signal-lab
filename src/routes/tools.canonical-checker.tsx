import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section, KV } from "@/components/UrlTool";
import { getMeta } from "@/lib/html-analyzer";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/canonical-checker")({
  head: () => toolHead("canonical-checker") => <View html={r.html} finalUrl={r.finalUrl} />}</UrlTool>
    </ToolPanel>
  ),
});

function View({ html, finalUrl }: { html: string; finalUrl: string }) {
  const m = useMemo(() => getMeta(html), [html]);
  const self = m.canonical && new URL(m.canonical, finalUrl).toString().replace(/\/$/,"") === finalUrl.replace(/\/$/,"");
  return (
    <Section title="Canonical inspection">
      <KV k="Page URL" v={finalUrl} />
      <KV k="Declared canonical" v={m.canonical} ok={!!m.canonical} />
      <KV k="Self-referential" v={m.canonical ? (self ? "Yes ✓" : "No (points elsewhere)") : ""} ok={!!m.canonical && !!self} />
    </Section>
  );
}
