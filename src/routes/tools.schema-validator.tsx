import { createFileRoute } from "@tanstack/react-router";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section } from "@/components/UrlTool";
import { getJsonLd } from "@/lib/html-analyzer";
import { useMemo } from "react";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/tools/schema-validator")({
  head: () => ({ meta: [{ title: "Schema.org Validator — SEOAcademys" }] }),
  component: () => (
    <ToolPanel>
      <ToolHeader title="Schema.org JSON-LD Validator" desc="Find every JSON-LD block on the page, parse it and validate required properties." />
      <UrlTool>{(r) => <View html={r.html} />}</UrlTool>
    </ToolPanel>
  ),
});

const REQUIRED: Record<string,string[]> = {
  Article:["headline","author","datePublished","image"],
  BlogPosting:["headline","author","datePublished","image"],
  Product:["name","image","offers"],
  FAQPage:["mainEntity"],
  Organization:["name","url"],
  BreadcrumbList:["itemListElement"],
  Recipe:["name","recipeIngredient","recipeInstructions"],
  Event:["name","startDate","location"],
  LocalBusiness:["name","address","telephone"],
};

function View({ html }: { html: string }) {
  const blocks = useMemo(() => getJsonLd(html), [html]);
  return (
    <>
      {blocks.length === 0 && <Section title="No JSON-LD found">Add structured data to help Google + AI engines understand your content.</Section>}
      {blocks.map((b, i) => {
        const data = b.data as { ["@type"]?: string | string[] } | null;
        const type = Array.isArray(data?.["@type"]) ? data!["@type"][0] : data?.["@type"];
        const req = type ? REQUIRED[type] || [] : [];
        const obj = (data || {}) as Record<string, unknown>;
        return (
          <Section key={i} title={`Block ${i+1}: ${type || "Unknown type"}`}>
            {b.error && <div className="text-destructive text-sm mb-2">Parse error: {b.error}</div>}
            {req.length > 0 && (
              <ul className="grid sm:grid-cols-2 gap-2 mb-3 text-sm">
                {req.map(k => {
                  const ok = obj[k] !== undefined;
                  return <li key={k} className={`flex gap-2 p-2 rounded border ${ok ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>{ok ? <Check className="size-4 text-success" /> : <X className="size-4 text-destructive" />}{k}</li>;
                })}
              </ul>
            )}
            <pre className="text-xs font-mono bg-surface-2 p-3 rounded max-h-72 overflow-auto">{JSON.stringify(b.data, null, 2)}</pre>
          </Section>
        );
      })}
    </>
  );
}
