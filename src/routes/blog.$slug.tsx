import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog-posts";
import { blogPostHead } from "@/lib/blog-schema";
import { Card3D } from "@/components/Card3D";
import { ArrowRight, CalendarDays, Clock, User } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      return { meta: [{ title: "Guide not found | SEOAcademys" }, { name: "robots", content: "noindex" }] };
    }
    return blogPostHead(post);
  },
  loader: ({ params }) => {
    if (!getBlogPost(params.slug)) throw notFound();
    return null;
  },
  notFoundComponent: PostNotFound,
  component: BlogPostPage,
});

function PostNotFound() {
  return (
    <PageContainer>
      <h1 className="font-display text-2xl font-bold">Guide not found</h1>
      <p className="mt-3 text-muted-foreground">
        This guide does not exist.{" "}
        <Link to="/blog" className="text-primary underline underline-offset-4">
          Browse all SEO &amp; GEO guides
        </Link>
        .
      </p>
    </PageContainer>
  );
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getBlogPost(slug);
  if (!post) return <PostNotFound />;
  const others = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <PageContainer>
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-5">
        <Link to="/" className="hover:text-primary">Home</Link> <span className="mx-1">/</span>
        <Link to="/blog" className="hover:text-primary">Blog</Link> <span className="mx-1">/</span>
        <span className="text-foreground">{post.category}</span>
      </nav>

      <article className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">{post.category}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">{post.h1}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <User className="size-3.5" />
            <Link to="/blog/author/team" className="hover:text-primary">SEOAcademys Editorial Team</Link>
          </span>
          <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> Last updated: June 2026</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {post.readingTime} min read</span>
        </div>

        <div className="mt-7 space-y-4">
          {post.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lg text-foreground leading-relaxed" : "text-foreground/90 leading-relaxed"}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <h2 className="font-display text-sm uppercase tracking-widest text-primary mb-3">Free tools used in this guide</h2>
          <ul className="space-y-1.5 text-sm">
            {post.relatedTools.map((t) => (
              <li key={t.slug}>
                <Link to="/tools/$" params={{ _splat: t.slug }} className="text-primary font-medium underline underline-offset-4">
                  {t.anchor}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {post.sections.map((s, i) => (
          <section key={i} className="mt-10">
            <h2 className="font-display text-2xl font-bold tracking-tight">{s.h2}</h2>
            {s.body?.map((p, j) => (
              <p key={j} className="mt-3 text-foreground/90 leading-relaxed">{p}</p>
            ))}
            {s.list && (
              <ul className="mt-4 space-y-2">
                {s.list.map((li, j) => (
                  <li key={j} className="flex gap-2 text-foreground/90 leading-relaxed">
                    <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.steps && (
              <ol className="mt-4 space-y-3">
                {s.steps.map((st, j) => (
                  <li key={j} className="rounded-xl border border-border bg-card p-4">
                    <h3 className="font-semibold text-sm">{st.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{st.body}</p>
                  </li>
                ))}
              </ol>
            )}
            {s.table && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      {s.table.head.map((h, j) => (
                        <th key={j} className="text-left font-semibold px-4 py-2.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r, j) => (
                      <tr key={j} className="border-t border-border">
                        {r.map((c, k) => (
                          <td key={k} className="px-4 py-2.5 align-top text-muted-foreground">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-3">
              {post.faqs.map((f, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-semibold text-sm">{f.q}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold tracking-tight">Continue reading</h2>
          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            {others.map((o) => (
              <Card3D key={o.slug} className="p-4">
                <h3 className="font-semibold text-sm leading-snug">
                  <Link to="/blog/$slug" params={{ slug: o.slug }} className="hover:text-primary">{o.h1}</Link>
                </h3>
                <Link
                  to="/blog/$slug"
                  params={{ slug: o.slug }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                >
                  Read <ArrowRight className="size-3.5" />
                </Link>
              </Card3D>
            ))}
          </div>
        </section>
      </article>
    </PageContainer>
  );
}
