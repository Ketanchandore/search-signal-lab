import { createFileRoute } from "@tanstack/react-router";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section } from "@/components/UrlTool";
import { getLinks } from "@/lib/html-analyzer";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/link-analyzer")({
  head: () => ({ meta: [{ title: "Internal & External Link Analyzer — SEOAcademys" }] }),
  component: () => (
    <ToolPanel>
      <ToolHeader title="Link Analyzer" desc="See every link on the page — internal vs external, follow vs nofollow." />
      <UrlTool>{(r) => <View html={r.html} url={r.finalUrl} />}</UrlTool>
    </ToolPanel>
  ),
});

function View({ html, url }: { html: string; url: string }) {
  const links = useMemo(() => getLinks(html, url), [html, url]);
  const internal = links.filter(l => l.internal);
  const external = links.filter(l => !l.internal);
  return (
    <>
      <Section title="Summary">
        <div className="grid grid-cols-4 gap-3 text-center">
          {[["Total",links.length],["Internal",internal.length],["External",external.length],["Nofollow",links.filter(l=>l.nofollow).length]].map(([k,v])=>(
            <div key={k as string} className="rounded border border-border bg-surface-2 p-3"><div className="text-xs text-muted-foreground">{k}</div><div className="font-display text-2xl font-bold">{v}</div></div>
          ))}
        </div>
      </Section>
      {[["Internal",internal],["External",external]].map(([label,arr]) => (
        <Section key={label as string} title={`${label} links (${(arr as typeof links).length})`}>
          <div className="max-h-80 overflow-auto text-sm space-y-1">
            {(arr as typeof links).slice(0,200).map((l,i) => (
              <div key={i} className="flex gap-3 py-1 border-b border-border/40">
                {l.nofollow && <span className="text-[10px] px-1.5 py-0.5 rounded bg-warning/20 text-warning">nofollow</span>}
                <a href={l.href} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate flex-1">{l.text || l.href}</a>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
