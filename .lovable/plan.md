# SEOAcademys — Complete Launch Plan (Multi-Turn)

Aapke pasted rules files (`pasted-2026-07-02*.txt`, `Google_seo_policy.txt`, `website_seo`) ke basis pe scope. Har turn = 1 chunk, taaki review kar sako.

## Already done this turn
- Mobile sidebar scroll fix (sheet ab poori list scroll karta hai)
- Footer expand: 5 columns, all important pages + mobile visible with bottom-nav padding, "Last Updated: June 2026"

## Turn 1 — Reusable SEO content engine (foundation)
- `src/components/ToolSeo.tsx` (already exists) ko extend: props se accept kare `whatItChecks`, `howToUse`, `fullChecklist`, `vsCompetitor`, `faqs`, `relatedTools`, `lastUpdated`
- FAQ JSON-LD + HowTo JSON-LD + SoftwareApplication JSON-LD auto-inject via route `head()`
- Breadcrumb JSON-LD helper
- Internal-linking mesh helper: har tool page pe 4 related tools + 2 learn pages auto-render

## Turn 2-4 — Per-tool 800+ word SEO content (37 tools split into 3 batches)
Batch A (Turn 2): 13 audit/checker tools — seo-audit, meta-tag-checker, heading-checker, schema-validator, canonical-checker, robots-checker, sitemap-checker, mobile-checker, ssl-checker, og-checker, twitter-card-checker, redirect-checker, http-headers
Batch B (Turn 3): 12 generator/utility — schema-generator, meta-generator, robots-txt, article-schema, faq-schema, product-schema, breadcrumb-schema, html/css/js-minifier, page-size, tech-detector, image-seo
Batch C (Turn 4): 12 research/GEO — ai-citation-audit, geo-tracker, keyword-research, keyword-density, rank-tracker, backlink-checker, serp-preview, content-checker, readability, word-counter, link-analyzer, broken-links
Each page gets: H1-H6 structure, direct-answer first 200 words, checklist, "Free vs Competitor" comparison, FAQ block with schema, related-tools mesh.

## Turn 5 — Blog engine + first 10 posts
- `src/routes/blog.tsx` (index with search/filter) + `src/routes/blog.$slug.tsx` (dynamic)
- Content array in `src/lib/blog-posts.ts` with 10 seed posts from pasted files (AI Overviews impact, GEO 2026, E-E-A-T, llms.txt, schema, keyword clustering, backlinks 2026, Core Web Vitals, mobile-first, AdSense readiness)
- Article + Breadcrumb JSON-LD, canonical, og:image (per-post)
- Blog card grid + reading time + author + updated date

## Turn 6 — Extra pages + sitemap/robots refresh
- `/how-it-works`, `/api-docs` (marketing stub), `/changelog`
- `sitemap.xml` regen with all 37 tools + blog slugs + static pages
- `robots.txt` refresh per your pasted rules (allow AI citation bots, block GPTBot/CCBot)
- `llms.txt` regen with full tool list

## Turn 7 — Performance pass (target < 0.5s LCP on 4G)
- Lazy-load Hero3D + RadialGauge (already partial) — audit all heavy imports
- `head().links` preload for LCP font + hero background
- Convert marketing images to AVIF/WebP via `vite-imagetools`
- `defer` GA gtag, add `<link rel="preconnect">` to googletagmanager
- Remove unused shadcn primitives from bundle (tree-shake audit)
- Route-level code splitting verify (TanStack does this by default; confirm no giant shared chunk)

## Turn 8 — AdSense + trust polish
- `ads.txt` placeholder
- Cookie consent banner (required for AdSense EU)
- Author bios + "Reviewed by" bylines on blog + tool pages (E-E-A-T)
- Contact page: real business address slot, response-time SLA
- Privacy policy: add AdSense + GA4 disclosure blocks
- Ad slot components (in-article + sidebar) — hidden until AdSense approved, but structured for one-line enable

## Turn 9 — QA + verify
- Playwright pass: mobile 390px, tablet 768px, desktop 1280px — sidebar scroll, footer, no horizontal scroll, hero layout
- SEO findings scanner run + fix loop
- Lighthouse perf/SEO/Best-Practices/Accessibility ≥ 95

## Technical notes
- All new content pulled verbatim from your pasted files where provided; rest generated per your H1-H6 template
- Every page: `<link rel="canonical">`, `robots index,follow`, `Last Updated: June 2026`
- Zero keyword stuffing (1x per 150 words max)
- Every paragraph ≤ 3 sentences (AI extraction)
- Question-format headings where possible

---

**Reply with "go" to start Turn 1** (or say "skip to Turn X" / "combine turns 2+3" / edit scope).
