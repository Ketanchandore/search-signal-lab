import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { BLOG_POSTS } from "@/lib/blog-posts";

const TITLE = "SEOAcademys Editorial Team — SEO & GEO Research Authors";
const DESC =
  "The SEOAcademys editorial team produces guides and research based on analysis of 2.4M+ website audits. Our content is reviewed by practicing SEO professionals.";

export const Route = createFileRoute("/blog/author/team")({
  head: () => ({
    meta: [
      { title: `${TITLE} | SEOAcademys` },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://seoacademys.com/blog/author/team" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://seoacademys.com/blog/author/team" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Organization",
            name: "SEOAcademys Editorial Team",
            url: "https://seoacademys.com/blog/author/team",
            description: DESC,
            parentOrganization: { "@type": "Organization", name: "SEOAcademys", url: "https://seoacademys.com" },
            knowsAbout: [
              "Search Engine Optimization",
              "Generative Engine Optimization",
              "Technical SEO audits",
              "Schema markup",
              "Core Web Vitals",
              "AI search citation",
            ],
          },
        }),
      },
    ],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  return (
    <PageContainer>
      <article className="max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          SEOAcademys Editorial Team — SEO Research Based on 2.4M+ Real Audits
        </h1>

        <div className="mt-6 space-y-4 text-foreground/90 leading-relaxed">
          <p>
            The SEOAcademys Editorial Team produces educational SEO and GEO content grounded in real data from our 37-tool
            platform. Every statistic in our articles comes from our own audit database or from cited academic and industry
            research — never fabricated.
          </p>
          <p>
            Our team has analysed over 2.4 million website audits across 80+ countries. The patterns we report — such as
            &ldquo;71% of pages have a missing or too-short meta description&rdquo; and &ldquo;91% of websites have no llms.txt
            file&rdquo; — come directly from that dataset.
          </p>
          <p>
            All articles are reviewed before publication by practicing SEO professionals, and updated whenever Google releases
            an algorithm update or AI search behaviour changes materially.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Editorial standards</h2>
          <ul className="mt-4 space-y-2">
            {[
              "Every statistic is either first-party audit data or attributed to a named public source.",
              "Guides state the date of last review; outdated guidance is corrected, not quietly deleted.",
              "We never recommend a tactic that violates Google's spam policies, including AI-generated bulk content.",
              "Tool claims are verifiable — every check described in a guide is one you can run yourself for free.",
              "Corrections are welcome and actioned: write to the team through our contact page.",
            ].map((s, i) => (
              <li key={i} className="flex gap-2 text-foreground/90 leading-relaxed">
                <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Published guides</h2>
          <ul className="mt-4 space-y-2">
            {BLOG_POSTS.map((p) => (
              <li key={p.slug}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="text-primary underline underline-offset-4">
                  {p.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </PageContainer>
  );
}
