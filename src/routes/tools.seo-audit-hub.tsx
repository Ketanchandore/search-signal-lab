import { createFileRoute } from "@tanstack/react-router";
import { HubPage, hubHead, type HubDef } from "@/components/HubPage";

const hub: HubDef = {
  path: "/tools/seo-audit-hub",
  title: "Free SEO Audit Hub — 15 Technical & On-Page Checks in One Place | SEOAcademys",
  description:
    "Every free SEO audit tool in one hub: full site audit, meta tags, headings, canonicals, robots.txt, sitemap, redirects, HTTPS, mobile and page speed. No signup.",
  h1: "SEO Audit Hub — Every Technical & On-Page Check, Free",
  intro: [
    "An SEO audit is a systematic review of the technical and on-page signals that decide whether a page can be crawled, indexed and ranked. This hub groups every free audit tool on SEOAcademys into one workflow so you can move from discovery to fix without switching products.",
    "Start with the full audit for a 47-signal overview, then use the focused checkers below to confirm each fix. Every tool fetches the live URL server-side, exactly as a crawler would, and stores nothing.",
  ],
  slugs: [
    "seo-audit",
    "meta-tag-checker",
    "heading-checker",
    "canonical-checker",
    "robots-checker",
    "sitemap-checker",
    "redirect-checker",
    "http-headers",
    "ssl-checker",
    "mobile-checker",
    "page-size",
    "broken-links",
  ],
  sections: [
    {
      h2: "What order should you run an SEO audit in?",
      body: [
        "Fix crawlability before content. A perfect page that a crawler cannot reach earns nothing.",
        "Work through the four layers in sequence, re-checking after each change.",
      ],
      list: [
        "Access layer: robots.txt, HTTP status, HTTPS and redirects",
        "Index layer: canonical tags, sitemap coverage and meta robots directives",
        "Content layer: title, meta description, heading hierarchy and internal links",
        "Experience layer: mobile viewport, page weight and Core Web Vitals",
      ],
    },
    {
      h2: "How often should a site be audited?",
      body: [
        "Audit the full site quarterly, and audit any page you edit on the day you publish it.",
        "Run the access-layer checks immediately after every deployment, since most catastrophic SEO regressions are introduced by a config change rather than a content change.",
      ],
    },
    {
      h2: "What does a free audit miss compared with paid crawlers?",
      body: [
        "Paid crawlers walk thousands of URLs and store history. These tools audit one URL at a time in real time.",
        "For most sites the signals are identical — the difference is scale and reporting, not accuracy.",
      ],
    },
  ],
  faqs: [
    { q: "What is an SEO audit?", a: "An SEO audit is a structured review of the technical, on-page and content signals that determine whether search engines can crawl, index and rank a page. It produces a prioritized list of fixes rather than a single score." },
    { q: "Is this SEO audit hub really free?", a: "Yes. Every tool linked here is free, requires no signup and has no usage cap." },
    { q: "Which audit tool should I run first?", a: "Run the Full SEO Audit first for a 47-signal overview, then use the focused checkers to fix and verify each issue it reports." },
    { q: "How long does an audit take?", a: "A single-URL audit completes in a few seconds. A full manual pass across the layers described above typically takes 30 to 60 minutes for a small site." },
    { q: "Do these tools work on competitor sites?", a: "Yes. Any publicly accessible URL can be audited, which makes side-by-side comparison straightforward." },
  ],
};

export const Route = createFileRoute("/tools/seo-audit-hub")({
  head: () => hubHead(hub),
  component: () => <HubPage hub={hub} />,
});
