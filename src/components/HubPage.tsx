import { Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";
import { Card3D } from "@/components/Card3D";
import { getToolMeta } from "@/lib/tool-meta";
import { SITE_URL } from "@/lib/tool-meta";

export type HubDef = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  slugs: string[];
  sections: { h2: string; body: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
};

export function hubHead(hub: HubDef) {
  const url = `${SITE_URL}${hub.path}`;
  return {
    meta: [
      { title: hub.title },
      { name: "description", content: hub.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: hub.title },
      { property: "og:description", content: hub.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: hub.title },
      { name: "twitter:description", content: hub.description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: hub.h1,
          description: hub.description,
          url,
          isPartOf: { "@type": "WebSite", name: "SEOAcademys", url: SITE_URL },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
            { "@type": "ListItem", position: 3, name: hub.h1, item: url },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hub.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  };
}

export function HubPage({ hub }: { hub: HubDef }) {
  return (
    <PageContainer>
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> ›{" "}
        <Link to="/tools" className="hover:text-primary">Tools</Link> › <span>{hub.h1}</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{hub.h1}</h1>
        {hub.intro.map((p, i) => (
          <p key={i} className="mt-4 text-muted-foreground leading-relaxed">{p}</p>
        ))}
        <p className="mt-4 text-xs text-muted-foreground">Last Updated: June 2026 · Reviewed by SEOAcademys Editorial Team</p>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold mb-4">Which tool should you run first?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hub.slugs.map((slug) => {
            const m = getToolMeta(slug);
            if (!m) return null;
            return (
              <Card3D key={slug} className="p-5 flex flex-col h-full">
                <h3 className="font-display text-base font-semibold">
                  <a href={`/tools/${slug}`} className="hover:text-primary">{m.name}</a>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1 leading-relaxed">{m.description}</p>
                <a href={`/tools/${slug}`} className="mt-3 text-sm font-semibold text-primary">Open tool →</a>
              </Card3D>
            );
          })}
        </div>
      </section>

      {hub.sections.map((s) => (
        <section key={s.h2} className="mt-10 max-w-3xl">
          <h2 className="font-display text-2xl font-bold mb-3">{s.h2}</h2>
          {s.body.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
          ))}
          {s.list && (
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              {s.list.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          )}
        </section>
      ))}

      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          {hub.faqs.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-surface p-4">
              <h3 className="font-semibold mb-1.5">{f.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-3">Keep going</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
          <li><Link to="/tools" className="text-primary hover:underline">All 37 free SEO &amp; GEO tools</Link></li>
          <li><Link to="/blog" className="text-primary hover:underline">SEO &amp; GEO guides on the blog</Link></li>
          <li><Link to="/how-it-works" className="text-primary hover:underline">How SEOAcademys runs its checks</Link></li>
        </ul>
      </section>
    </PageContainer>
  );
}
