import { useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { getToolMeta, toolJsonLd } from "@/lib/tool-meta";

/**
 * Injects SoftwareApplication + BreadcrumbList + FAQPage JSON-LD for the
 * currently-mounted /tools/<slug> route. Rendered inside <body> — both Google
 * and AI crawlers (GPTBot, PerplexityBot, ClaudeBot) parse JSON-LD wherever
 * it appears in the document.
 */
export function ToolSeo() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const blocks = useMemo(() => {
    const slug = path.split("/tools/")[1]?.split("/")[0];
    if (!slug) return [];
    const meta = getToolMeta(slug);
    if (!meta) return [];
    return toolJsonLd(meta);
  }, [path]);
  if (blocks.length === 0) return null;
  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}
    </>
  );
}
