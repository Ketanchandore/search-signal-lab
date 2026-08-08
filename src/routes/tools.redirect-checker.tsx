import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section, KV } from "@/components/UrlTool";

export const Route = createFileRoute("/tools/redirect-checker")({
  head: () => toolHead("redirect-checker")." />
      <UrlTool>{(r) => (
        <Section title={`${r.redirectChain.length} hop(s) to final URL`}>
          <ol className="space-y-2 text-sm">
            {r.redirectChain.map((h, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="font-mono text-xs px-1.5 py-0.5 rounded grad-primary text-primary-foreground">{i+1}</span>
                <span className={`font-mono ${h.status >= 300 && h.status < 400 ? "text-warning" : h.status >= 400 ? "text-destructive" : "text-success"}`}>{h.status}</span>
                <a href={h.url} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">{h.url}</a>
              </li>
            ))}
          </ol>
          <div className="mt-4">
            <KV k="Final URL" v={r.finalUrl} ok={r.ok} />
            <KV k="Final status" v={`${r.status} ${r.statusText}`} ok={r.ok} />
          </div>
        </Section>
      )}</UrlTool>
    </ToolPanel>
  ),
});
