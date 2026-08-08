import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section } from "@/components/UrlTool";
import { getImages } from "@/lib/html-analyzer";
import { useMemo } from "react";

export const Route = createFileRoute("/tools/image-seo")({
  head: () => toolHead("image-seo"),
  component: () => (
    <ToolPanel>
      <ToolHeader title="Image SEO Checker" desc="List every <img> tag: alt, dimensions, lazy-loading and file format." />
      <UrlTool>{(r) => <View html={r.html} url={r.finalUrl} />}</UrlTool>
    </ToolPanel>
  ),
});

function View({ html, url }: { html: string; url: string }) {
  const imgs = useMemo(() => getImages(html, url), [html, url]);
  const stats = {
    total: imgs.length,
    noAlt: imgs.filter(i => !i.alt).length,
    lazy: imgs.filter(i => i.loading === "lazy").length,
    modern: imgs.filter(i => /\.(webp|avif)(\?|$)/i.test(i.src)).length,
  };
  return (
    <>
      <Section title="Summary">
        <div className="grid grid-cols-4 gap-3 text-center">
          {Object.entries(stats).map(([k,v]) => <div key={k} className="rounded border border-border bg-surface-2 p-3"><div className="text-xs text-muted-foreground capitalize">{k}</div><div className="font-display text-2xl font-bold">{v}</div></div>)}
        </div>
      </Section>
      <Section title={`All images (${imgs.length})`}>
        <div className="max-h-96 overflow-auto">
          <table className="w-full text-xs"><thead><tr className="text-left text-muted-foreground"><th>Preview</th><th>Src</th><th>Alt</th><th>Loading</th></tr></thead><tbody>
            {imgs.map((im,i) => (
              <tr key={i} className="border-t border-border/60">
                <td className="py-1"><img src={im.src} alt="" className="size-10 object-cover rounded" loading="lazy" /></td>
                <td className="py-1 font-mono break-all max-w-xs truncate">{im.src}</td>
                <td className={`py-1 ${im.alt ? "" : "text-destructive"}`}>{im.alt || "missing"}</td>
                <td className="py-1">{im.loading || "eager"}</td>
              </tr>
            ))}
          </tbody></table>
        </div>
      </Section>
    </>
  );
}
