import { createFileRoute } from "@tanstack/react-router";
import { HubPage, hubHead, type HubDef } from "@/components/HubPage";

const hub: HubDef = {
  path: "/tools/schema-hub",
  title: "Schema Markup Hub — Free JSON-LD Generators & Validator | SEOAcademys",
  description:
    "Generate and validate schema markup free: FAQPage, Article, Product, Breadcrumb and Organization JSON-LD, plus a live structured data validator. No signup.",
  h1: "Schema Markup Hub — Generate and Validate JSON-LD, Free",
  intro: [
    "Schema markup is structured data added to a page in JSON-LD format so machines can read what the page is about. It powers rich results in Google and gives AI engines an unambiguous description of your entities.",
    "This hub links every free schema generator and the live validator, so you can build markup, paste it into your page, and confirm it parses before you publish.",
  ],
  slugs: ["schema-generator", "schema-validator", "faq-schema", "article-schema", "product-schema", "breadcrumb-schema"],
  sections: [
    {
      h2: "Which schema type should you use?",
      body: ["Match the type to what the page actually is. One primary type per page, with supporting types stacked where relevant."],
      list: [
        "Article — blog posts, guides and news",
        "Product — a single purchasable item with price and availability",
        "FAQPage — a page with genuine question and answer pairs visible to users",
        "BreadcrumbList — any page more than one level deep",
        "Organization and WebSite — sitewide identity, placed once",
        "SoftwareApplication — tool and app pages",
      ],
    },
    {
      h2: "Where should JSON-LD be placed?",
      body: [
        "JSON-LD can appear anywhere in the document, though the head is conventional. Google and AI crawlers parse it wherever it sits.",
        "Never mark up content that is not visible on the page — that is a structured data spam violation and can cost you rich results entirely.",
      ],
    },
    {
      h2: "Does schema improve rankings?",
      body: [
        "Schema is not a direct ranking factor, but it unlocks rich results that raise click-through rate on the same position.",
        "For AI search, schema is more consequential: it removes ambiguity about who published the content, when, and what entity it describes.",
      ],
    },
  ],
  faqs: [
    { q: "What is schema markup?", a: "Schema markup is structured data written in a shared vocabulary from schema.org, usually in JSON-LD, that tells machines what a page's content means rather than just how it looks." },
    { q: "Is JSON-LD better than microdata?", a: "Yes for most cases. Google explicitly recommends JSON-LD because it lives in a single block, is easy to generate and does not entangle markup with page HTML." },
    { q: "Does schema guarantee rich results?", a: "No. Valid schema makes a page eligible for rich results, but Google decides whether to show them based on quality and query context." },
    { q: "Can invalid schema hurt my site?", a: "Invalid markup is usually ignored rather than penalised, but marking up content that is not visible on the page can trigger a structured data manual action." },
    { q: "How do I test my markup?", a: "Paste the page or code into the Schema Validator here for an instant parse check, then confirm eligibility in Google's own Rich Results Test before publishing at scale." },
  ],
};

export const Route = createFileRoute("/tools/schema-hub")({
  head: () => hubHead(hub),
  component: () => <HubPage hub={hub} />,
});
