import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section } from "@/components/UrlTool";
import { getHeadings } from "@/lib/html-analyzer";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/heading-checker")({
  head: () => toolHead("heading-checker") => <View html={r.html} />}</UrlTool>
    </ToolPanel>
  ),
});

function View({ html }: { html: string }) {
  const h = useMemo(() => getHeadings(html), [html]);
  const counts = [1,2,3,4,5,6].map(l => h.filter(x => x.level === l).length);
  let prev = 0; const jumps: string[] = [];
  for (const head of h) { if (prev && head.level > prev + 1) jumps.push(`H${prev} → H${head.level}: ${head.text}`); prev = head.level; }
  return (
    <>
      <Section title="Distribution">
        <div className="grid grid-cols-6 gap-2 text-center">
          {counts.map((c, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface-2 p-3">
              <div className="text-xs text-muted-foreground">H{i+1}</div>
              <div className="font-display text-2xl font-bold">{c}</div>
            </div>
          ))}
        </div>
        {counts[0] !== 1 && <p className="mt-3 text-destructive text-sm">⚠ Page should have exactly one H1 (found {counts[0]}).</p>}
      </Section>
      {jumps.length > 0 && <Section title="Hierarchy jumps">{jumps.map((j, i) => <div key={i} className="text-sm text-warning">⚠ {j}</div>)}</Section>}
      <Section title={`Outline (${h.length} headings)`}>
        <ul className="text-sm space-y-1 max-h-96 overflow-auto">
          {h.map((x, i) => <li key={i} style={{ paddingLeft: (x.level - 1) * 16 }} className="flex gap-2"><span className="font-mono text-[10px] px-1.5 py-0.5 rounded grad-primary text-primary-foreground">H{x.level}</span>{x.text}</li>)}
        </ul>
      </Section>
    </>
  );
}
