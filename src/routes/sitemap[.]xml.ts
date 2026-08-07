import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { TOOL_META } from "@/lib/tool-meta";
import { BLOG_POSTS } from "@/lib/blog-posts";


const BASE_URL = "https://seoacademys.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/tools", changefreq: "weekly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.9" },
          { path: "/blog/author/team", changefreq: "monthly", priority: "0.5" },
          ...BLOG_POSTS.map<SitemapEntry>((p) => ({ path: `/blog/${p.slug}`, changefreq: "monthly", priority: "0.8" })),
          { path: "/how-it-works", changefreq: "monthly", priority: "0.6" },
          { path: "/changelog", changefreq: "weekly", priority: "0.6" },
          { path: "/api-docs", changefreq: "monthly", priority: "0.5" },
          { path: "/tools/seo-audit-hub", changefreq: "weekly", priority: "0.8" },
          { path: "/tools/ai-geo-hub", changefreq: "weekly", priority: "0.8" },
          { path: "/tools/schema-hub", changefreq: "weekly", priority: "0.8" },
          { path: "/learn", changefreq: "monthly", priority: "0.7" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },

          ...Object.keys(TOOL_META).map<SitemapEntry>((slug) => ({
            path: `/tools/${slug}`,
            changefreq: "weekly",
            priority: "0.8",
          })),
        ];

        const urls = entries
          .map((e) =>
            [
              "  <url>",
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
