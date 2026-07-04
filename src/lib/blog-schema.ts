import { SITE_URL } from "./tool-meta";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-06-01" */
  datePublished: string;
  /** ISO date string; defaults to datePublished */
  dateModified?: string;
  author?: string;
  /** Absolute or root-relative image URL. Optional. */
  image?: string;
  /** Reading time in minutes for the ReadAction snippet */
  readingTime?: number;
  /** Category / topic label (e.g. "GEO", "Core Updates") */
  category?: string;
  /** FAQ entries embedded in the article */
  faqs?: { q: string; a: string }[];
};

/**
 * Article + BreadcrumbList (+ optional FAQPage) JSON-LD for a blog post.
 * Returns an array of schema.org objects — inject via head().scripts or a
 * <script type="application/ld+json"> tag.
 */
export function blogPostJsonLd(post: BlogPostMeta): object[] {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${SITE_URL}${post.image}`
    : undefined;

  const blocks: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified ?? post.datePublished,
      author: {
        "@type": "Organization",
        name: post.author ?? "SEOAcademys Editorial Team",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "SEOAcademys",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon.ico`,
        },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      ...(image ? { image } : {}),
      ...(post.category ? { articleSection: post.category } : {}),
      ...(post.readingTime ? { timeRequired: `PT${post.readingTime}M` } : {}),
      inLanguage: "en",
      isPartOf: { "@type": "Blog", name: "SEOAcademys Blog", url: `${SITE_URL}/blog` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faqs && post.faqs.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return blocks;
}

/**
 * CollectionPage + Breadcrumb JSON-LD for the /blog index.
 */
export function blogIndexJsonLd(posts: BlogPostMeta[]): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "SEOAcademys Blog",
      description:
        "SEO + GEO strategy, Google Core Update analysis, and AI search citation research — updated for 2026.",
      url: `${SITE_URL}/blog`,
      publisher: { "@type": "Organization", name: "SEOAcademys", url: SITE_URL },
      blogPost: posts.slice(0, 20).map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.datePublished,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      ],
    },
  ];
}

/**
 * Helper: build head().meta + head().links + head().scripts for a blog post
 * in one shot. Route file just spreads the return value.
 */
export function blogPostHead(post: BlogPostMeta) {
  const path = `/blog/${post.slug}`;
  const image = post.image ?? undefined;
  return {
    meta: [
      { title: `${post.title} | SEOAcademys Blog` },
      { name: "description", content: post.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: post.author ?? "SEOAcademys Editorial Team" },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: path },
      ...(image ? [{ property: "og:image", content: image }] : []),
      { property: "article:published_time", content: post.datePublished },
      { property: "article:modified_time", content: post.dateModified ?? post.datePublished },
      ...(post.category ? [{ property: "article:section", content: post.category }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: post.title },
      { name: "twitter:description", content: post.description },
      ...(image ? [{ name: "twitter:image", content: image }] : []),
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: blogPostJsonLd(post).map((b) => ({
      type: "application/ld+json",
      children: JSON.stringify(b),
    })),
  };
}
