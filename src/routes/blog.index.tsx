import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { blogIndexJsonLd, type BlogPostMeta } from "@/lib/blog-schema";
import { Card3D } from "@/components/Card3D";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

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
  return (
    <PageContainer>
      <header className="max-w-3xl mb-10">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">SEOAcademys Blog</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          SEO &amp; GEO Guides Built on 2.4M+ Real Website Audits
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Every guide below is written by the{" "}
          <Link to="/blog/author/team" className="text-primary underline underline-offset-4">
            SEOAcademys editorial team
          </Link>{" "}
          and grounded in data from our own audit database. No fabricated statistics, no recycled advice — and each guide links
          to the free tool that performs the check for you.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((p) => (
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
    </PageContainer>
  );
}
