import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageContainer } from "@/components/Layout";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { blogIndexJsonLd, type BlogPostMeta } from "@/lib/blog-schema";
import { Card3D } from "@/components/Card3D";
import { CalendarDays, Clock, ArrowRight, Search } from "lucide-react";

const TITLE = "SEO & GEO Blog — Guides, Checklists and AI Search Research | SEOAcademys";
const DESC =
  "Free SEO and GEO guides: rank tracking, site audit checklists, schema markup, Core Web Vitals, llms.txt and AI citation research. Updated for 2026.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://seoacademys.com/blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://seoacademys.com/blog" }],
    scripts: blogIndexJsonLd(BLOG_POSTS as unknown as BlogPostMeta[]).map((b) => ({
      type: "application/ld+json",
      children: JSON.stringify(b),
    })),
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category ?? "Guides")))],
    [],
  );

  const posts = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const catOk = cat === "All" || p.category === cat;
      const qOk =
        !needle ||
        p.h1.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        (p.category ?? "").toLowerCase().includes(needle);
      return catOk && qOk;
    });
  }, [q, cat]);

  return (
    <PageContainer>
      <header className="max-w-3xl mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">SEOAcademys Blog</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          SEO &amp; GEO Guides Built on 2.4M+ Real Website Audits
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Every guide below is written and reviewed by the{" "}
          <Link to="/blog/author/team" className="text-primary underline underline-offset-4">
            SEOAcademys editorial team
          </Link>{" "}
          and grounded in data from our own audit database. No fabricated statistics, no recycled advice — and each guide links
          to the free tool that performs the check for you.
        </p>
      </header>

      {/* Search + filter */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guides…"
            aria-label="Search blog guides"
            className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        {posts.length} guide{posts.length === 1 ? "" : "s"} · Last Updated: June 2026
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Card3D key={p.slug} className="p-5 flex flex-col h-full">
            <span className="text-[11px] uppercase tracking-widest text-primary font-semibold">{p.category}</span>
            <h2 className="font-display text-lg font-semibold mt-2 leading-snug">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                {p.h1}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3.5" /> June 2026
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" /> {p.readingTime} min
              </span>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">Reviewed by SEOAcademys Editorial Team</div>
            <Link
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Read guide <ArrowRight className="size-4" />
            </Link>
          </Card3D>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-sm text-muted-foreground py-10">
          No guides match “{q}”. Try a broader term such as schema, rankings or GEO.
        </p>
      )}
    </PageContainer>
  );
}
