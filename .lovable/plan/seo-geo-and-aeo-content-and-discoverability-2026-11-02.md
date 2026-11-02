# SEO, GEO, and AEO content and discoverability

## Goal
Make SEOAcademys’ public content accurate, useful, and discoverable at `https://seoacademys.lovable.app`, with practical English-language coverage for readers in the US, UK, Australia, and India.

## Scope
- Correct public canonical, Open Graph, sitemap, robots.txt, and llms.txt URLs so they use the provided `.lovable.app` origin consistently.
- Audit and remove unsupported audience, traffic, ranking, survey, and product-capability claims from public SEO copy and articles. Keep tool claims aligned with what the app actually does.
- Publish a focused set of substantial, source-linked guides covering Google AI search, Search Console opportunity analysis, GA4 organic/referral measurement, crawl/indexing diagnostics, and international SEO. Add the guides to the blog index and sitemap with truthful publication dates and article metadata.
- Keep the sitemap limited to public, indexable pages; do not promise rankings, indexing, AI citations, or millions of visits. Do not create thin duplicate country pages or treat `llms.txt` as a ranking requirement.
- Check the public sitemap and key article pages in the preview; inspect build diagnostics.

## Technical details
- Reuse the existing TanStack routes, article data model, JSON-LD helpers, and sitemap generator.
- Use Google Search Central and Analytics primary documentation as article sources. Present third-party AI visibility as measurable only where direct, verifiable data exists.
- Preserve private/authenticated route behavior and avoid putting user/project data into public articles or crawl files.
