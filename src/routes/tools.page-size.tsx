import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section, KV } from "@/components/UrlTool";

export const Route = createFileRoute("/tools/page-size")({
  head: () => toolHead("page-size") => {
        const inlineJS = (r.html.match(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi) || []).reduce((a,s)=>a+s.length,0);
        const inlineCSS = (r.html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || []).reduce((a,s)=>a+s.length,0);
        const scripts = (r.html.match(/<script\b[^>]*\bsrc=/gi) || []).length;
        const stylesheets = (r.html.match(/<link\b[^>]*rel=["']stylesheet/gi) || []).length;
        const images = (r.html.match(/<img\b/gi) || []).length;
        return (
          <Section title="Breakdown">
            <KV k="Total HTML size" v={`${(r.bytes/1024).toFixed(1)} KB`} ok={r.bytes < 1_500_000} />
            <KV k="Inline JS" v={`${(inlineJS/1024).toFixed(1)} KB`} />
            <KV k="Inline CSS" v={`${(inlineCSS/1024).toFixed(1)} KB`} />
            <KV k="External scripts" v={String(scripts)} />
            <KV k="External stylesheets" v={String(stylesheets)} />
            <KV k="Images referenced" v={String(images)} />
            <KV k="Server response time" v={`${r.durationMs} ms`} ok={r.durationMs < 1000} />
            <KV k="Content-Encoding" v={(r.headers as Record<string,string>)["content-encoding"] || "none"} />
          </Section>
        );
      }}</UrlTool>
    </ToolPanel>
  ),
});
