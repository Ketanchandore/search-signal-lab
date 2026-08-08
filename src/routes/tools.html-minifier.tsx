import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useMemo, useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { Copy } from "lucide-react";

type Kind = "html" | "css" | "js";

function minify(kind: Kind, input: string) {
  if (kind === "html") {
    return input
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/>\s+</g, "><")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  if (kind === "css") {
    return input
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s*([{}:;,>])\s*/g, "$1")
      .replace(/;}/g, "}")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  // js — safe-ish: remove block comments + single-line + extra whitespace
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*([{}();,:=<>])\s*/g, "$1")
    .trim();
}

function Page({ kind }: { kind: Kind }) {
  const [input, setInput] = useState("");
  const out = useMemo(() => { try { return minify(kind, input); } catch { return ""; } }, [kind, input]);
  const ratio = input.length ? Math.round(((input.length - out.length) / input.length) * 100) : 0;
  return (
    <ToolPanel>
      <ToolHeader title={`${kind.toUpperCase()} Minifier`} desc={`Paste ${kind.toUpperCase()} — minified output appears instantly with savings %.`} />
      <div className="grid lg:grid-cols-2 gap-4">
        <Card3D tilt={false} className="p-4"><div className="text-xs text-muted-foreground mb-2">Input · {input.length} chars</div><textarea value={input} onChange={e=>setInput(e.target.value)} rows={16} className="w-full font-mono text-xs bg-background border border-border rounded p-3 outline-none focus:border-primary" placeholder={`Paste ${kind}…`} /></Card3D>
        <Card3D tilt={false} className="p-4">
          <div className="flex items-center justify-between mb-2"><div className="text-xs text-muted-foreground">Minified · {out.length} chars · saved {ratio}%</div><button onClick={()=>navigator.clipboard.writeText(out)} className="text-xs px-2 py-1 rounded border border-border hover:border-primary hover:text-primary inline-flex gap-1 items-center"><Copy className="size-3" />Copy</button></div>
          <pre className="w-full font-mono text-xs bg-background border border-border rounded p-3 h-[388px] overflow-auto whitespace-pre-wrap">{out}</pre>
        </Card3D>
      </div>
    </ToolPanel>
  );
}

export const Route = createFileRoute("/tools/html-minifier")({ head: () => toolHead("html-minifier")replace(/;}/g, "}")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  // js — safe-ish: remove block comments + single-line + extra whitespace
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*([{}();,:=<>])\s*/g, "$1")
    .trim();
}

function Page({ kind }: { kind: Kind }) {
  const [input, setInput] = useState("");
  const out = useMemo(() => { try { return minify(kind, input); } catch { return ""; } }, [kind, input]);
  const ratio = input.length ? Math.round(((input.length - out.length) / input.length) * 100) : 0;
  return (
    <ToolPanel>
      <ToolHeader title={`${kind.toUpperCase()} Minifier`} desc={`Paste ${kind.toUpperCase()} — minified output appears instantly with savings %.`} />
      <div className="grid lg:grid-cols-2 gap-4">
        <Card3D tilt={false} className="p-4"><div className="text-xs text-muted-foreground mb-2">Input · {input.length} chars</div><textarea value={input} onChange={e=>setInput(e.target.value)} rows={16} className="w-full font-mono text-xs bg-background border border-border rounded p-3 outline-none focus:border-primary" placeholder={`Paste ${kind}…`} /></Card3D>
        <Card3D tilt={false} className="p-4">
          <div className="flex items-center justify-between mb-2"><div className="text-xs text-muted-foreground">Minified · {out.length} chars · saved {ratio}%</div><button onClick={()=>navigator.clipboard.writeText(out)} className="text-xs px-2 py-1 rounded border border-border hover:border-primary hover:text-primary inline-flex gap-1 items-center"><Copy className="size-3" />Copy</button></div>
          <pre className="w-full font-mono text-xs bg-background border border-border rounded p-3 h-[388px] overflow-auto whitespace-pre-wrap">{out}</pre>
        </Card3D>
      </div>
    </ToolPanel>
  );
}

export const Route = createFileRoute("/tools/html-minifier")({ head: () => ({ meta: [{ title: "HTML Minifier — SEOAcademys" }] }), component: () => <Page kind="html" /> });
export { Page as MinifierPage, minify };
