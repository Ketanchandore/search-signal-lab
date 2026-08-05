import type { BlogPostMeta } from "./blog-schema";

export type Section = {
  h2: string;
  body?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  steps?: { title: string; body: string }[];
};

export type BlogPost = BlogPostMeta & {
  h1: string;
  intro: string[];
  sections: Section[];
  relatedTools: { slug: string; anchor: string }[];
  readingTime: number;
};

const AUTHOR = "SEOAcademys Editorial Team";
const PUB = "2026-06-01";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "rank-tracker-guide-2026",
    title: "Rank Tracker Guide 2026: How to Track Google Rankings Without Paying",
    description:
      "Complete guide to keyword rank tracking in 2026. How to check Google rankings free, interpret position data, track AI Overview visibility, and avoid rank tracking mistakes.",
    h1: "Rank Tracker Guide 2026: How to Track Google Rankings Without Paying",
    datePublished: PUB,
    author: AUTHOR,
    category: "Rank Tracking",
    readingTime: 11,
    intro: [
      "Rank tracking is the practice of recording where a specific URL appears in search results for a specific keyword, location and device, then measuring how that position moves over time. It is the single clearest feedback loop in SEO: you change something, and the position tells you whether search engines agreed.",
      "There are more than 53,000 monthly searches for rank tracking software, and nearly every result costs $100–$500 per month. That price is not required. This guide shows how to track rankings for free, how to read position data correctly, and why in 2026 position alone no longer describes your visibility.",
    ],
    sections: [
      {
        h2: "What Is a Rank Tracker and How Does It Work?",
        body: [
          "A rank tracker submits your keyword to a search engine from a defined location and device, then scans the result page for your domain. The output is a position number, the ranking URL, and the SERP features present around it.",
          "Accuracy depends on three variables most people ignore: location, personalisation and device. A keyword can rank #4 in Mumbai and #19 in London on the same day. Always record the location you tracked from, otherwise the number is meaningless.",
          "Free tracking is possible because the underlying data is public. What paid tools sell is scale, history storage and scheduling — not better data.",
        ],
      },
      {
        h2: "Why Position Data Matters More Than Ever in 2026",
        body: [
          "Click-through rate is not linear. Position 1 captures roughly 27% of clicks, position 3 around 11%, and position 10 under 3%. Moving from #8 to #4 typically triples traffic for the same keyword and the same effort.",
          "Since AI Overviews expanded, organic position also determines AI visibility. Analysis of AI Overview citations shows about 97% of cited pages already rank in the traditional top 20. Your position is now the entry ticket to being quoted by an AI system.",
        ],
      },
      {
        h2: "How to Set Up Free Rank Tracking — Step by Step",
        steps: [
          { title: "Step 1 — Collect a real keyword set", body: "Open Google Search Console → Performance → Queries. Export every query with impressions. These are keywords Google already associates with you — far more useful than guessed keywords." },
          { title: "Step 2 — Filter for striking distance", body: "Keep queries with an average position between 5 and 25. These pages already rank; they need optimisation, not creation. This is where free tracking pays back fastest." },
          { title: "Step 3 — Record a baseline", body: "Run each keyword through a rank tracker and store position, ranking URL and date in a sheet. Without a baseline, later movement cannot be attributed to anything." },
          { title: "Step 4 — Track weekly, act monthly", body: "Check weekly to catch drops early, but only change strategy on a 4-week trend. Daily fluctuation of ±3 positions is normal noise, not a signal." },
        ],
      },
      {
        h2: "How Do You Interpret Ranking Data Correctly?",
        body: [
          "A single position is a snapshot; a trend line is information. Look at the direction over four weeks, not the number today.",
          "Segment by intent. Informational keywords rank slowly and convert little; transactional keywords rank harder but convert immediately. Averaging them together hides both stories.",
          "Always pair position with impressions and clicks from Search Console. A rank improvement with flat clicks usually means an AI Overview or a featured snippet is absorbing the click.",
        ],
      },
      {
        h2: "AI Overview Visibility vs Traditional Ranking",
        table: {
          head: ["Metric", "Traditional ranking", "AI citation visibility"],
          rows: [
            ["What is measured", "Position 1–100 in organic results", "Whether the page is quoted in an AI answer"],
            ["Primary driver", "Backlinks, relevance, page experience", "Factual density, structure, E-E-A-T, schema"],
            ["Typical time to move", "3–12 months", "2–8 weeks"],
            ["Where to measure", "Rank tracker + Search Console", "AI referral traffic in GA4 + citation audit"],
          ],
        },
        body: [
          "Track both. A page can lose two organic positions while gaining an AI Overview citation and end up with more total visibility — or the reverse.",
        ],
      },
      {
        h2: "7 Rank Tracking Mistakes to Avoid",
        list: [
          "Tracking brand keywords and calling it SEO growth — brand terms rank regardless of optimisation.",
          "Ignoring location: national tracking hides the local results your customers actually see.",
          "Reacting to daily noise instead of four-week trends.",
          "Tracking only head terms while long-tail queries deliver most conversions.",
          "Not recording which URL ranks — cannibalisation shows up as URL flapping, not position loss.",
          "Measuring position without impressions, so SERP-feature loss looks like a ranking win.",
          "Never tracking AI citation visibility, which now decides a growing share of informational traffic.",
        ],
      },
    ],
    relatedTools: [
      { slug: "rank-tracker", anchor: "free rank tracker" },
      { slug: "keyword-research", anchor: "free keyword research tool" },
      { slug: "serp-preview", anchor: "SERP snippet preview tool" },
    ],
    faqs: [
      { q: "Is free rank tracking accurate?", a: "Yes, when location and device are held constant. Free rank tracking reads the same public result pages paid tools read. What paid tools add is scheduling, history storage and scale, not more accurate positions." },
      { q: "How often should I check my Google rankings?", a: "Weekly is right for most sites. Daily checks encourage reacting to noise; monthly checks are too slow to catch a technical problem or a manual action early." },
      { q: "Why do my rankings differ from what I see in Google?", a: "Your own searches are personalised by history, location and logged-in state. A rank tracker uses a clean, unpersonalised query, which is closer to what an average user sees." },
      { q: "What is a good ranking position?", a: "Top 3 captures the majority of clicks; top 10 keeps you on page one. In 2026 the top 20 also matters because AI Overviews cite mostly from that range." },
      { q: "Does rank tracking affect my SEO?", a: "No. Checking positions is a read-only operation and has no effect on how search engines evaluate your site." },
      { q: "How do I track ChatGPT or Perplexity visibility?", a: "Rank trackers do not cover AI answers. Measure AI referral traffic in GA4 under Traffic Acquisition, and run an AI citation audit to score the signals that correlate with being cited." },
    ],
  },

  {
    slug: "what-is-geo",
    title: "What Is GEO? The Complete Generative Engine Optimization Guide for 2026",
    description:
      "GEO explained: Generative Engine Optimization — how to optimize your website to be cited by ChatGPT, Gemini, Perplexity, Claude and DeepSeek in AI-generated answers.",
    h1: "What Is GEO? The Complete Generative Engine Optimization Guide for 2026",
    datePublished: PUB,
    author: AUTHOR,
    category: "GEO",
    readingTime: 13,
    intro: [
      "GEO stands for Generative Engine Optimization. It is the practice of optimising a website so that it is selected, cited and recommended by AI-powered search systems — ChatGPT Search, Google Gemini and AI Overviews, Perplexity, Microsoft Copilot, Claude and DeepSeek.",
      "As of 2026, roughly 60% of informational queries are answered directly by an AI system without a click to any website. GEO is the strategy for staying visible inside that answer instead of below it.",
    ],
    sections: [
      {
        h2: "GEO vs Traditional SEO — What Are the Key Differences?",
        table: {
          head: ["Factor", "Traditional SEO", "GEO"],
          rows: [
            ["Target", "Google's ranking algorithm", "AI language models and retrieval systems"],
            ["Goal", "Rank in the top 10 organic results", "Be cited inside the generated answer"],
            ["Primary signal", "Backlinks and on-page optimisation", "Factual density, entities, E-E-A-T"],
            ["Content format", "Long-form comprehensive pages", "Modular, directly answerable blocks"],
            ["Measurement", "Keyword position", "Citation rate and AI referral traffic"],
            ["Typical speed", "3–12 months", "2–8 weeks"],
          ],
        },
        body: [
          "GEO does not replace SEO — it depends on it. Around 97% of AI Overview citations come from pages already ranking in the organic top 20. Traditional authority is the gateway to AI citation.",
        ],
      },
      {
        h2: "What Actually Increases AI Citations? The Research",
        body: [
          "Princeton University's GEO study analysed which content characteristics correlate with citation in generative answers. Four levers stood out:",
        ],
        list: [
          "+41% AI visibility — expert quotations and clearly attributed statements",
          "+41% AI visibility — original data and first-party research statistics",
          "+32% AI visibility — cited statistics with links to the source",
          "+28% AI visibility — fluency-optimised, cleanly structured writing",
        ],
      },
      {
        h2: "Which Five Platforms Should You Optimize For?",
        list: [
          "Google AI Overviews — appears above organic results, cites mostly from the top 20. Needs a solid SEO base, structured content and FAQPage schema.",
          "ChatGPT Search — crawls live via OAI-SearchBot. Allow that bot, and build authority signals; high-authority sources dominate its citations.",
          "Perplexity — real-time search with multiple citations per answer. Short paragraphs and fresh content matter most here.",
          "Claude — ClaudeBot prefers structured, factual content: definitions, numbered lists and comparison tables.",
          "Microsoft Copilot — uses the Bing index. Submit to Bing Webmaster Tools and allow Bingbot; Copilot reach exceeds a billion devices.",
        ],
      },
      {
        h2: "How Do You Create AI-Citable Content? Step by Step",
        steps: [
          { title: "Step 1 — Lead with a direct definition", body: "Answer the page's primary question in the first paragraph using the pattern 'X is …'. This sentence is what AI systems extract verbatim." },
          { title: "Step 2 — Write in short paragraphs", body: "Two to three sentences maximum. Retrieval systems chunk pages; shorter chunks are easier to lift cleanly." },
          { title: "Step 3 — Use question-format headings", body: "'What is GEO?', 'How does AI citation work?' — headings that mirror the queries people type into AI systems." },
          { title: "Step 4 — Attribute every statistic", body: "A data point with a named source signals verifiability, the property AI systems weight most when choosing sources." },
          { title: "Step 5 — Add FAQPage schema", body: "FAQ markup is the most directly extractable structured format and is frequently quoted word for word." },
          { title: "Step 6 — Publish an llms.txt file", body: "Ten minutes of work at your domain root that tells AI crawlers what your site is and which pages are authoritative." },
        ],
      },
      {
        h2: "What Is llms.txt and Why Does It Change AI Visibility?",
        body: [
          "llms.txt is a plain markdown file at yourdomain.com/llms.txt that describes your site's purpose, your most important pages, and how AI systems should interpret your content.",
          "Unlike robots.txt, which controls access, llms.txt guides interpretation. It was proposed by Jeremy Howard of fast.ai and has been adopted by several AI organisations.",
          "Across 2.4 million audited websites only about 9% have implemented it. That gap is the cheapest GEO advantage currently available.",
        ],
      },
      {
        h2: "How Do You Measure GEO Performance?",
        list: [
          "AI referral traffic in GA4 — check Traffic Acquisition → Session source for chat.openai.com, perplexity.ai, claude.ai and copilot.microsoft.com.",
          "Direct traffic growth — AI systems often mention brands without a link, so rising direct sessions is a downstream citation signal.",
          "Citation readiness score — audit the structural signals that correlate with being cited before you wait for referrals to appear.",
        ],
      },
    ],
    relatedTools: [
      { slug: "ai-citation-audit", anchor: "AI citation audit tool" },
      { slug: "schema-generator", anchor: "llms.txt and schema generator" },
      { slug: "robots-checker", anchor: "robots.txt and AI crawler checker" },
    ],
    faqs: [
      { q: "What does GEO stand for?", a: "GEO stands for Generative Engine Optimization — optimising content so AI answer engines such as ChatGPT, Gemini, Perplexity and Claude cite it in generated answers." },
      { q: "Is GEO replacing SEO?", a: "No. GEO builds on SEO. Around 97% of AI Overview citations come from pages already ranking in the organic top 20, so traditional ranking remains the prerequisite." },
      { q: "How long does GEO take to work?", a: "Typically two to eight weeks for citations to appear, which is much faster than the three to twelve months traditional ranking usually requires." },
      { q: "Should I block GPTBot?", a: "Blocking GPTBot stops training crawls but does not stop ChatGPT Search, which uses OAI-SearchBot. Most publishers allow the citation bots and block the pure training bots." },
      { q: "Does schema markup help with AI citation?", a: "Yes. Structured data removes ambiguity about what a page is about. FAQPage and Article markup in particular map directly onto the question-answer format AI systems generate." },
      { q: "How do I know if AI systems cite my site?", a: "Watch referral sources in GA4 for AI domains, monitor branded direct traffic, and query the AI engines directly with your target questions to see which sources they name." },
    ],
  },

  {
    slug: "site-audit-checklist-2026",
    title: "SEO Site Audit Checklist 2026: The Complete 47-Point Technical Audit Guide",
    description:
      "The complete 2026 SEO site audit checklist. 47 technical and on-page checks covering Core Web Vitals, schema markup, AI crawler access, meta tags and content quality.",
    h1: "SEO Site Audit Checklist 2026: The Complete 47-Point Technical Audit Guide",
    datePublished: PUB,
    author: AUTHOR,
    category: "Technical SEO",
    readingTime: 12,
    intro: [
      "An SEO site audit is a structured review of everything that can prevent a page from being crawled, indexed, understood or ranked. A good audit ends with a prioritised fix list, not a score.",
      "This checklist covers 47 checks in seven categories, ordered by impact. Work top to bottom: a crawlability problem makes every content improvement below it irrelevant.",
    ],
    sections: [
      {
        h2: "Category 1 — Crawlability and Indexation (8 checks)",
        list: [
          "robots.txt exists, returns 200 and does not block CSS or JS",
          "No accidental noindex in the meta robots tag or X-Robots-Tag header",
          "XML sitemap exists, is referenced in robots.txt and contains only canonical 200 URLs",
          "Canonical tag present and self-referencing on every indexable page",
          "No redirect chains longer than one hop to the final URL",
          "No orphan pages — every important URL is linked from at least one other page",
          "Pagination and faceted URLs controlled to avoid index bloat",
          "AI citation bots (OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended) explicitly allowed",
        ],
      },
      {
        h2: "Category 2 — On-Page Signals (9 checks)",
        list: [
          "Unique title tag between 30 and 60 characters containing the primary keyword",
          "Meta description between 70 and 160 characters written for click-through, not stuffing",
          "Exactly one H1 that states the page topic in plain language",
          "Heading hierarchy without level skips (H2 → H4)",
          "Primary keyword present in the first 100 words",
          "Descriptive, lowercase, hyphenated URL slug",
          "Internal links with descriptive anchor text, never 'click here'",
          "Outbound links to authoritative sources where claims need support",
          "Open Graph and Twitter Card tags complete for social and AI preview surfaces",
        ],
      },
      {
        h2: "Category 3 — Content Quality (7 checks)",
        list: [
          "The main query is answered directly in the first 200 words",
          "Word count matches search intent rather than an arbitrary target",
          "Paragraphs limited to three sentences for extractability",
          "Original data, examples or screenshots that no competitor can copy",
          "Named author with credentials and a visible last-updated date",
          "No duplicated or near-duplicated blocks across templates",
          "Readability appropriate for the audience — Flesch 50+ for general topics",
        ],
      },
      {
        h2: "Category 4 — Structured Data (6 checks)",
        list: [
          "Valid JSON-LD present in the head of every important template",
          "The @type matches the page purpose (Article, Product, FAQPage, SoftwareApplication)",
          "All required properties for the chosen type are populated",
          "FAQPage markup mirrors visible on-page questions and answers",
          "BreadcrumbList markup matches the visible breadcrumb trail",
          "Organization and WebSite markup on the homepage with sameAs profiles",
        ],
      },
      {
        h2: "Category 5 — Core Web Vitals and Performance (7 checks)",
        list: [
          "Largest Contentful Paint under 2.5 seconds on mobile",
          "Interaction to Next Paint under 200 milliseconds",
          "Cumulative Layout Shift under 0.1",
          "HTML document under 150 KB where possible",
          "Images served in modern formats with explicit width and height",
          "Render-blocking scripts deferred and unused CSS removed",
          "Compression and long-lived caching headers enabled",
        ],
      },
      {
        h2: "Category 6 — Mobile and Security (5 checks)",
        list: [
          "Responsive viewport meta tag with width=device-width",
          "No horizontal scrolling and no fixed-width elements",
          "Tap targets at least 48 px with adequate spacing",
          "HTTPS everywhere with HSTS and no mixed content references",
          "Baseline security headers: CSP, X-Content-Type-Options, Referrer-Policy",
        ],
      },
      {
        h2: "Category 7 — Authority and AI Readiness (5 checks)",
        list: [
          "llms.txt published at the domain root",
          "About, Contact, Privacy and Terms pages present and genuinely informative",
          "Author pages that establish real expertise (E-E-A-T)",
          "Backlink profile reviewed for toxic or sitewide spam links",
          "Entity consistency: identical brand name, address and profiles across the web",
        ],
      },
    ],
    relatedTools: [
      { slug: "seo-audit", anchor: "free SEO audit tool" },
      { slug: "robots-checker", anchor: "robots.txt checker" },
      { slug: "sitemap-checker", anchor: "XML sitemap checker" },
      { slug: "mobile-checker", anchor: "mobile-friendly test" },
    ],
    faqs: [
      { q: "How often should I run a full SEO audit?", a: "Run a complete audit quarterly, a lightweight technical audit monthly, and a targeted audit after every migration, redesign or Google core update." },
      { q: "What should I fix first after an audit?", a: "Fix in this order: indexation blockers, then broken canonicals and redirects, then Core Web Vitals failures, then on-page and content issues. Anything that stops crawling outranks everything else." },
      { q: "Do I need a paid crawler to audit a site?", a: "Not for a single site. Free tools cover meta tags, headings, schema, robots, sitemaps, speed and AI readiness. Paid crawlers matter mainly above roughly ten thousand URLs." },
      { q: "How long until audit fixes affect rankings?", a: "Technical fixes such as removing a noindex can take effect within days. Content and authority changes typically show up over four to twelve weeks." },
      { q: "What is the difference between a technical audit and a content audit?", a: "A technical audit asks whether search engines can reach and understand the page. A content audit asks whether the page deserves to win the query once they can." },
    ],
  },

  {
    slug: "what-is-seo",
    title: "What Is SEO? The Complete 2026 Guide to Search Engine Optimization",
    description:
      "Learn what SEO is, how search engines work in 2026, E-E-A-T requirements, GEO strategy, and how to start ranking in Google and AI search today.",
    h1: "What Is SEO? The Complete 2026 Guide to Search Engine Optimization",
    datePublished: PUB,
    author: AUTHOR,
    category: "Fundamentals",
    readingTime: 10,
    intro: [
      "SEO, or search engine optimisation, is the practice of improving a website so that it appears for the queries its audience searches. It covers three areas: technical health, content relevance and authority.",
      "In 2026 the definition has widened. Being found now means appearing in Google's organic results and being cited by AI answer engines. Both are earned with the same foundations.",
    ],
    sections: [
      {
        h2: "How Do Search Engines Work?",
        body: [
          "Search engines run four processes: crawling, indexing, ranking and presentation. A crawler discovers URLs, the indexer stores what it understood, the ranker orders candidates for a query, and the presentation layer decides what the user actually sees — ten blue links, a snippet, or an AI-generated answer.",
          "SEO fails at whichever step breaks first. A brilliant page that is blocked in robots.txt never reaches step two.",
        ],
      },
      {
        h2: "What Are the Three Pillars of SEO?",
        list: [
          "Technical SEO — crawlability, indexation, speed, mobile usability, structured data and security.",
          "On-page SEO — titles, headings, internal links and content that matches search intent precisely.",
          "Off-page SEO — links, brand mentions and entity consistency that establish authority.",
        ],
      },
      {
        h2: "What Is E-E-A-T and Why Does Google Care?",
        body: [
          "E-E-A-T stands for Experience, Expertise, Authoritativeness and Trust. It comes from Google's Search Quality Rater Guidelines and describes how human raters judge page quality.",
          "Practically, it means named authors with real credentials, first-hand experience visible in the writing, citations for claims, accurate contact information and content that is maintained rather than published and forgotten.",
          "For pages that affect money, health or safety, weak E-E-A-T is the most common reason quality raters mark a page low.",
        ],
      },
      {
        h2: "How Do You Start SEO on a New Site?",
        steps: [
          { title: "Step 1 — Make the site crawlable", body: "Verify robots.txt, publish an XML sitemap, and confirm indexation in Google Search Console before writing anything else." },
          { title: "Step 2 — Choose queries you can win", body: "Target long-tail, low-competition queries with clear intent instead of broad head terms that established domains own." },
          { title: "Step 3 — Publish one genuinely better page per query", body: "Answer the question in the opening paragraph, then go deeper than every competing result." },
          { title: "Step 4 — Add structure", body: "Correct headings, internal links and JSON-LD so both Google and AI systems can parse the page." },
          { title: "Step 5 — Measure and iterate", body: "Use Search Console impressions and positions to find pages stuck between positions 5 and 25, then improve those first." },
        ],
      },
      {
        h2: "How Long Does SEO Take?",
        body: [
          "Technical fixes can change results within days. New content on a new domain typically needs three to six months before it stabilises, and competitive commercial queries often take a year.",
          "AI citation moves faster: well-structured, well-sourced pages are commonly quoted within two to eight weeks of publication.",
        ],
      },
    ],
    relatedTools: [
      { slug: "seo-audit", anchor: "free SEO audit tool" },
      { slug: "meta-tag-checker", anchor: "meta tag checker" },
      { slug: "keyword-research", anchor: "keyword research tool" },
    ],
    faqs: [
      { q: "What does SEO stand for?", a: "SEO stands for search engine optimisation: improving a website so it appears prominently in search results for relevant queries." },
      { q: "Is SEO still worth it in 2026?", a: "Yes. AI answers are built from indexed web pages, and roughly 97% of AI citations come from pages ranking in the organic top 20, so SEO is now the entry requirement for AI visibility too." },
      { q: "Can I do SEO myself?", a: "Yes. Technical checks, on-page optimisation and content improvement are all learnable, and free tools cover the measurement side completely." },
      { q: "How much does SEO cost?", a: "The work costs time rather than software. Tooling can be free; agency retainers typically range from a few hundred to several thousand dollars a month." },
      { q: "What is the difference between SEO and SEM?", a: "SEO earns unpaid visibility in organic results. SEM buys visibility through paid search ads. They target the same result page through different mechanisms." },
    ],
  },

  {
    slug: "core-web-vitals-guide",
    title: "Core Web Vitals 2026: Fix LCP, CLS & INP to Improve Google Rankings",
    description:
      "Complete Core Web Vitals guide 2026. How LCP, CLS and INP affect Google rankings, step-by-step fixes for each metric, and how to measure with free page speed tools.",
    h1: "Core Web Vitals 2026: Fix LCP, CLS & INP to Improve Google Rankings",
    datePublished: PUB,
    author: AUTHOR,
    category: "Performance",
    readingTime: 9,
    intro: [
      "Core Web Vitals are Google's three field metrics for user experience: Largest Contentful Paint, Cumulative Layout Shift and Interaction to Next Paint. They are measured from real Chrome users, not from a lab test.",
      "They are a ranking signal, but a tie-breaker rather than a primary one. Their bigger effect is commercial: slow pages lose users before content quality ever matters.",
    ],
    sections: [
      {
        h2: "What Are the Core Web Vitals Thresholds?",
        table: {
          head: ["Metric", "Good", "Needs improvement", "Poor"],
          rows: [
            ["LCP — loading", "≤ 2.5 s", "2.5 s – 4.0 s", "> 4.0 s"],
            ["CLS — visual stability", "≤ 0.1", "0.1 – 0.25", "> 0.25"],
            ["INP — responsiveness", "≤ 200 ms", "200 ms – 500 ms", "> 500 ms"],
          ],
        },
        body: ["A URL passes only when the 75th percentile of real users is in the good band for all three metrics."],
      },
      {
        h2: "How Do You Fix Largest Contentful Paint?",
        list: [
          "Identify the LCP element — usually the hero image or headline — and make it the highest-priority resource.",
          "Preload the hero image and set fetchpriority=\"high\"; never lazy-load it.",
          "Serve images in AVIF or WebP at the displayed size, not the original size.",
          "Remove render-blocking CSS and JavaScript from the critical path.",
          "Cut server response time below 600 ms with caching or a CDN.",
        ],
      },
      {
        h2: "How Do You Fix Cumulative Layout Shift?",
        list: [
          "Set explicit width and height (or aspect-ratio) on every image, video and iframe.",
          "Reserve space for ads, embeds and cookie banners instead of injecting them into flow.",
          "Load fonts with font-display: swap and a matched fallback metric to avoid reflow.",
          "Never insert content above existing content after load.",
        ],
      },
      {
        h2: "How Do You Fix Interaction to Next Paint?",
        list: [
          "Break long JavaScript tasks into chunks and yield to the main thread.",
          "Remove or defer third-party scripts — tag managers are the most common INP offender.",
          "Debounce expensive input handlers and move heavy computation to a web worker.",
          "Avoid large hydration payloads on interactive pages; ship less JavaScript.",
        ],
      },
      {
        h2: "How Should You Measure Core Web Vitals?",
        body: [
          "Use field data for decisions and lab data for debugging. The Chrome User Experience Report and Search Console's Core Web Vitals report show real users; Lighthouse shows a simulated run that is useful for isolating a cause.",
          "Always measure mobile first. Mobile field data is what Google evaluates for most sites.",
        ],
      },
    ],
    relatedTools: [
      { slug: "page-size", anchor: "page weight and speed checker" },
      { slug: "mobile-checker", anchor: "mobile-friendly test" },
      { slug: "image-seo", anchor: "image SEO checker" },
    ],
    faqs: [
      { q: "Are Core Web Vitals a ranking factor?", a: "Yes, as part of the page experience signals. They rarely outweigh relevance and authority, but they act as a tie-breaker between comparable pages." },
      { q: "What replaced First Input Delay?", a: "Interaction to Next Paint replaced FID in 2024. INP measures the latency of all interactions during a visit, not just the first one." },
      { q: "Why does Lighthouse disagree with Search Console?", a: "Lighthouse is a single simulated lab run; Search Console reports the 75th percentile of real Chrome users over 28 days. Trust the field data for decisions." },
      { q: "How long until Core Web Vitals improvements show up?", a: "Field data uses a rolling 28-day window, so expect roughly four weeks before Search Console reflects a fix." },
    ],
  },

  {
    slug: "schema-markup-guide",
    title: "Schema Markup for SEO in 2026: The Complete JSON-LD & Rich Results Guide",
    description:
      "Complete schema markup guide for 2026. JSON-LD implementation, the schema types that generate rich results, validation, and AI citation benefits — with free schema tools.",
    h1: "Schema Markup for SEO in 2026: The Complete JSON-LD & Rich Results Guide",
    datePublished: PUB,
    author: AUTHOR,
    category: "Structured Data",
    readingTime: 10,
    intro: [
      "Schema markup is structured data added to a page that tells search engines exactly what the content is, using the shared vocabulary at schema.org. Google's recommended format is JSON-LD placed in the head of the document.",
      "Schema does not directly raise rankings. It raises comprehension — and comprehension is what earns rich results in Google and citations in AI answers.",
    ],
    sections: [
      {
        h2: "Which Schema Types Actually Produce Rich Results?",
        list: [
          "Article and NewsArticle — headline, date and author in news surfaces",
          "FAQPage — expandable question and answer blocks, and the most AI-extractable format",
          "Product with Offer and AggregateRating — price, availability and stars",
          "Recipe — cook time, ratings and image carousels",
          "Event — dates, venue and ticket links",
          "BreadcrumbList — path display instead of a raw URL",
          "Organization and WebSite — knowledge panel and sitelinks search box",
          "SoftwareApplication — category, price and rating for tools and apps",
          "LocalBusiness — hours, address and map presence",
          "HowTo, VideoObject, Course and JobPosting for their respective verticals",
        ],
      },
      {
        h2: "How Do You Implement JSON-LD Correctly?",
        steps: [
          { title: "Step 1 — Pick one primary type per page", body: "Match the type to the page's real purpose. A blog post is an Article, not a Product, even if it mentions products." },
          { title: "Step 2 — Fill every required property", body: "Missing required properties silently disqualify a page from rich results. Optional properties add detail and confidence." },
          { title: "Step 3 — Mirror visible content", body: "Every value in the markup must appear on the page. Marking up content users cannot see is a policy violation." },
          { title: "Step 4 — Combine types with @graph", body: "Use a single @graph block with linked @id values instead of scattering unconnected scripts across the page." },
          { title: "Step 5 — Validate before shipping", body: "Run the markup through a validator to catch syntax errors and missing fields, then re-check after any template change." },
        ],
      },
      {
        h2: "Why Does Schema Matter for AI Citation?",
        body: [
          "AI retrieval systems must decide what a page is about before deciding whether to quote it. JSON-LD answers that question explicitly instead of forcing inference from HTML.",
          "FAQPage markup is the highest-value format for GEO because its question-answer pairs match the shape of generated answers almost exactly.",
          "Across 2.4 million audited pages, about 64% carry no structured data at all — which makes correct markup a straightforward competitive advantage.",
        ],
      },
      {
        h2: "What Are the Most Common Schema Mistakes?",
        list: [
          "Invalid JSON — a trailing comma breaks the entire block silently.",
          "Marking up content that is not visible on the page.",
          "Using Review or AggregateRating markup for self-serving reviews, which Google penalises.",
          "Duplicate conflicting blocks of the same type on one page.",
          "Relative URLs in @id or url properties instead of absolute ones.",
          "Never re-validating after a template or CMS update.",
        ],
      },
    ],
    relatedTools: [
      { slug: "schema-validator", anchor: "schema markup validator" },
      { slug: "faq-schema", anchor: "FAQ schema generator" },
      { slug: "article-schema", anchor: "article schema generator" },
      { slug: "breadcrumb-schema", anchor: "breadcrumb schema generator" },
    ],
    faqs: [
      { q: "Does schema markup improve rankings?", a: "Not directly. It improves how accurately search engines understand a page, which produces rich results and higher click-through rates — and those indirectly help performance." },
      { q: "JSON-LD, Microdata or RDFa?", a: "Use JSON-LD. Google explicitly recommends it, and it keeps structured data separate from the HTML so template changes cannot break it." },
      { q: "Where should JSON-LD be placed?", a: "In the head of the document is preferred, though Google can also read it from the body. Consistency across templates matters more than exact placement." },
      { q: "Can incorrect schema hurt my site?", a: "Yes. Markup describing content that is not on the page is a structured data policy violation and can trigger a manual action removing all rich results." },
      { q: "How many schema types can one page have?", a: "As many as genuinely apply. Link them in one @graph block — for example Article plus BreadcrumbList plus FAQPage on a guide." },
    ],
  },

  {
    slug: "keyword-research-guide",
    title: "Keyword Research in 2026: How to Find Low-Competition Keywords That Rank",
    description:
      "Master keyword research in 2026. Find low-competition keywords, analyse search intent, use difficulty filters and build keyword clusters — with a free keyword research tool.",
    h1: "Keyword Research in 2026: How to Find Low-Competition Keywords That Rank",
    datePublished: PUB,
    author: AUTHOR,
    category: "Keyword Research",
    readingTime: 10,
    intro: [
      "Keyword research is the process of finding the queries your audience types, estimating how hard each is to rank for, and choosing the ones you can realistically win.",
      "The mistake that wastes most SEO effort is chasing volume. A keyword you cannot rank for is worth zero regardless of how many people search it.",
    ],
    sections: [
      {
        h2: "What Are the Four Types of Search Intent?",
        table: {
          head: ["Intent", "Example query", "Page type that wins"],
          rows: [
            ["Informational", "what is geo seo", "Guide or definition article"],
            ["Navigational", "seoacademys rank tracker", "Brand or product page"],
            ["Commercial", "best free seo tools", "Comparison or list page"],
            ["Transactional", "free rank tracker tool", "Working tool or signup page"],
          ],
        },
        body: ["Intent mismatch is the single most common reason a well-written page never ranks. Check what already ranks before deciding the format."],
      },
      {
        h2: "How Do You Find Low-Competition Keywords?",
        steps: [
          { title: "Step 1 — Mine Search Console first", body: "Queries where you already have impressions but no clicks are the cheapest wins available: relevance is proven, only position is missing." },
          { title: "Step 2 — Go long-tail", body: "Four-word-plus queries have lower volume, far lower competition and much clearer intent — which converts better." },
          { title: "Step 3 — Read the SERP, not just the metric", body: "If page one is filled with forums and thin pages, the keyword is winnable no matter what a difficulty score says." },
          { title: "Step 4 — Cluster by topic", body: "Group semantically related queries into one page rather than publishing near-duplicate posts that cannibalise each other." },
          { title: "Step 5 — Check AI answer presence", body: "If an AI Overview already answers the query completely, plan for citation visibility rather than clicks." },
        ],
      },
      {
        h2: "How Should You Prioritise Keywords?",
        body: [
          "Score each candidate on three axes: business value, achievability and intent clarity. Publish where all three are high before touching anything else.",
          "A query with 200 monthly searches and transactional intent usually beats one with 20,000 searches and diffuse informational intent.",
        ],
      },
      {
        h2: "How Do You Build a Keyword Cluster?",
        list: [
          "Pick one pillar query that defines the topic.",
          "Collect every supporting question people ask around it.",
          "Answer supporting questions as H2 sections on the pillar page when they share intent.",
          "Split into a separate page only when the intent or the required page format differs.",
          "Interlink the cluster with descriptive anchor text so authority flows to the pillar.",
        ],
      },
    ],
    relatedTools: [
      { slug: "keyword-research", anchor: "free keyword research tool" },
      { slug: "rank-tracker", anchor: "free rank tracker" },
      { slug: "keyword-density", anchor: "keyword density checker" },
    ],
    faqs: [
      { q: "How many keywords should one page target?", a: "One primary keyword plus the closely related variants that share the same intent. Modern search engines rank a page for hundreds of variations automatically when the topic is covered well." },
      { q: "Is keyword difficulty accurate?", a: "It is an estimate based on backlink strength of ranking pages. Treat it as a filter, then confirm by reading the actual result page." },
      { q: "Do exact-match keywords still matter?", a: "Placement matters, stuffing does not. Include the phrase naturally in the title, the H1 and the first hundred words, then write for humans." },
      { q: "How do I find keywords for a brand-new site?", a: "Start with long-tail question queries in your niche where the current results are weak, and build topical depth before attacking competitive head terms." },
    ],
  },

  {
    slug: "llms-txt-guide",
    title: "llms.txt: The Complete Guide to AI Search Visibility (2026)",
    description:
      "Complete llms.txt guide. What it is, why it matters for ChatGPT and Gemini visibility, the exact format with examples, and how to create yours in 10 minutes.",
    h1: "llms.txt: The Complete Guide to AI Search Visibility (2026)",
    datePublished: PUB,
    author: AUTHOR,
    category: "GEO",
    readingTime: 8,
    intro: [
      "llms.txt is a plain markdown file placed at the root of a domain that tells AI language models what the site is about, which pages are authoritative, and how the content should be interpreted.",
      "robots.txt controls access. llms.txt controls understanding. Only around 9% of audited sites have one, which makes it one of the cheapest GEO advantages still available.",
    ],
    sections: [
      {
        h2: "Why Does llms.txt Matter?",
        body: [
          "AI systems retrieve fragments of pages, not whole websites. Without guidance they must infer your site's purpose from whatever fragment they land on.",
          "An llms.txt file gives them a curated map: the mission of the site, the pages worth citing, and the pages that should not be treated as authoritative.",
          "It does not guarantee citation. It removes ambiguity, which is the main reason good pages get skipped.",
        ],
      },
      {
        h2: "What Is the Correct llms.txt Format?",
        list: [
          "Start with an H1 containing the site or brand name.",
          "Add a blockquote summarising what the site does in two or three sentences.",
          "Group key URLs under H2 sections with a short description after each link.",
          "Include an 'Optional' or 'Not for citation' section for low-value or transactional pages.",
          "Keep it under roughly 50 KB and update it whenever major pages change.",
        ],
      },
      {
        h2: "How Do You Create llms.txt in 10 Minutes?",
        steps: [
          { title: "Step 1 — List your best 20 pages", body: "Pick the pages you would want an AI system to quote: guides, tools, documentation and trust pages." },
          { title: "Step 2 — Write one line per page", body: "Format each entry as a markdown link followed by a colon and a factual one-line description." },
          { title: "Step 3 — Add site context", body: "Open with what the site is, who runs it, when it was founded and what makes its data original." },
          { title: "Step 4 — Publish at the root", body: "Upload to yourdomain.com/llms.txt and confirm it returns 200 with content-type text/plain or text/markdown." },
          { title: "Step 5 — Keep robots.txt aligned", body: "Allow the citation bots — OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended — or the file will never be read." },
        ],
      },
      {
        h2: "Does llms.txt Replace robots.txt or a Sitemap?",
        body: [
          "No. robots.txt grants or denies crawl access, the XML sitemap lists every indexable URL for search engines, and llms.txt curates a small set of pages with meaning attached for language models.",
          "All three should exist and agree with each other. Contradictions — such as blocking a crawler you list in llms.txt — waste the effort entirely.",
        ],
      },
    ],
    relatedTools: [
      { slug: "robots-txt", anchor: "robots.txt and llms.txt generator" },
      { slug: "ai-citation-audit", anchor: "AI citation audit" },
      { slug: "robots-checker", anchor: "AI crawler access checker" },
    ],
    faqs: [
      { q: "Is llms.txt an official standard?", a: "It is a community proposal from Jeremy Howard of fast.ai, adopted by several AI and developer-focused organisations. It is not yet an official requirement from any search engine." },
      { q: "Where do I put llms.txt?", a: "At the root of your domain: yourdomain.com/llms.txt, served as plain text with a 200 status." },
      { q: "Will llms.txt get me cited by ChatGPT?", a: "It improves comprehension and page discovery, but citation still depends on authority, accuracy and structure. Treat it as one signal among several." },
      { q: "Does llms.txt help traditional SEO?", a: "Not directly — Google does not use it as a ranking signal. Its value is in how AI answer engines interpret and select your content." },
    ],
  },

  {
    slug: "free-seo-tools-list-2026",
    title: "37 Best Free SEO Tools in 2026 (Tested and Ranked by 2.4M+ Users)",
    description:
      "The definitive list of free SEO tools in 2026. Rank tracking, site auditing, schema generation, AI citation checking and GEO optimisation — all free, no signup.",
    h1: "37 Best Free SEO Tools in 2026 (Tested and Ranked by 2.4M+ Users)",
    datePublished: PUB,
    author: AUTHOR,
    category: "Tools",
    readingTime: 9,
    intro: [
      "Every tool below is free, requires no signup, and computes results from a live fetch of the URL you submit. There is no cached or estimated data anywhere in this list.",
      "The tools are grouped by job: audit and diagnosis, content, structured data, performance, AI and GEO, and research.",
    ],
    sections: [
      {
        h2: "Audit and Technical Diagnosis Tools",
        list: [
          "Full SEO Audit — 47 on-page and technical signals in one pass",
          "Meta Tag Checker — title, description, robots, viewport and charset validation",
          "Heading Structure Checker — H1 count and hierarchy skips",
          "Canonical Checker — self-referencing and cross-domain canonical detection",
          "Robots.txt Checker — crawl rules plus AI bot access",
          "XML Sitemap Checker — reachability, entry count and index detection",
          "Redirect Checker — full hop chain with status codes",
          "HTTP Header Checker — security headers and caching",
          "SSL / HTTPS Checker — transport security and mixed content",
          "Broken Link Checker — dead internal and external links",
          "Mobile-Friendly Checker — viewport, zoom blocking and fixed-width elements",
        ],
      },
      {
        h2: "Content and On-Page Tools",
        list: [
          "Content Checker — depth, structure and coverage",
          "Readability Checker — Flesch reading ease and sentence complexity",
          "Word Counter — words, characters and reading time",
          "Keyword Density Checker — top terms with over-optimisation warnings",
          "Image SEO Checker — alt text, dimensions and lazy loading",
          "Link Profile Analyzer — internal and external link balance",
          "SERP Preview — Google snippet simulation for desktop and mobile",
          "Meta Tag Generator — title, description and social tags",
        ],
      },
      {
        h2: "Structured Data Tools",
        list: [
          "Schema Validator — JSON-LD parsing and @type detection",
          "Schema Generator — multi-type JSON-LD builder",
          "FAQ Schema Generator — FAQPage markup from question and answer pairs",
          "Article Schema Generator — Article and BlogPosting markup",
          "Product Schema Generator — Product, Offer and AggregateRating markup",
          "Breadcrumb Schema Generator — BreadcrumbList markup",
        ],
      },
      {
        h2: "Performance and Delivery Tools",
        list: [
          "Page Weight and Speed Checker — HTML size, response time and script count",
          "HTML Minifier — whitespace and comment removal",
          "CSS Minifier — stylesheet compression",
          "JS Minifier — script compression",
          "Technology Detector — CMS, framework, analytics and CDN signatures",
        ],
      },
      {
        h2: "AI Search and GEO Tools",
        list: [
          "AI Citation Audit — the GEO signals that correlate with being cited",
          "GEO Market Tracker — AI visibility across engines",
          "robots.txt and llms.txt Generator — AI crawler policy in one file",
          "Open Graph Checker — social and AI preview metadata",
          "Twitter / X Card Checker — card completeness with og fallbacks",
        ],
      },
      {
        h2: "Research Tools",
        list: [
          "Rank Tracker — keyword position monitoring",
          "Keyword Research — query discovery with intent classification",
          "Backlink Checker — referring domain overview",
        ],
      },
    ],
    relatedTools: [
      { slug: "seo-audit", anchor: "free SEO audit tool" },
      { slug: "rank-tracker", anchor: "free rank tracker" },
      { slug: "ai-citation-audit", anchor: "AI citation audit" },
      { slug: "schema-validator", anchor: "schema validator" },
    ],
    faqs: [
      { q: "Are these SEO tools really free?", a: "Yes. Every tool listed runs without an account, a trial or a credit card, and there is no usage cap on the browser-based tools." },
      { q: "How do free tools compare to Semrush or Ahrefs?", a: "For on-page, technical and structured-data work the outputs are equivalent because the data is fetched live from your URL. Paid suites remain ahead on historical backlink indexes and large-scale crawling." },
      { q: "Do the tools store the URLs I submit?", a: "No. Each URL is fetched, analysed and discarded. Nothing is logged or shared." },
      { q: "Which tool should I start with?", a: "Start with the full SEO audit to get a prioritised list, then use the specialised tools to fix each finding in order." },
    ],
  },

  {
    slug: "on-page-seo-checklist",
    title: "On-Page SEO Checklist 2026: 47 Things to Check Before Publishing Any Page",
    description:
      "Complete on-page SEO checklist for 2026. Every element to optimise before publishing: title tags, meta descriptions, headings, schema, content quality and AI readiness.",
    h1: "On-Page SEO Checklist 2026: 47 Things to Check Before Publishing Any Page",
    datePublished: PUB,
    author: AUTHOR,
    category: "On-Page SEO",
    readingTime: 9,
    intro: [
      "On-page SEO is everything you control inside the page itself: the markup, the structure, the copy and the links. It is the fastest part of SEO to fix and the easiest to verify.",
      "Run this checklist before you press publish. Fixing an element after indexing costs a re-crawl and delays the result by weeks.",
    ],
    sections: [
      {
        h2: "Title, Description and URL",
        list: [
          "Title 30–60 characters, primary keyword near the front, brand at the end",
          "Title unique across the entire site",
          "Meta description 70–160 characters written to earn a click",
          "URL slug short, lowercase, hyphenated and descriptive",
          "Canonical tag present and self-referencing",
          "Meta robots set to index, follow for public pages",
        ],
      },
      {
        h2: "Headings and Structure",
        list: [
          "Exactly one H1 that matches the page's promise",
          "H2s phrased as questions where the topic allows",
          "No heading level skips",
          "Table of contents on pages longer than 1,500 words",
          "Paragraphs of three sentences or fewer",
          "Lists and tables used wherever data is comparable",
        ],
      },
      {
        h2: "Content Quality and E-E-A-T",
        list: [
          "The core question answered in the first 200 words",
          "Named author with credentials and a link to an author page",
          "Visible publish and last-updated dates",
          "Original data, examples or screenshots included",
          "Every statistic attributed to a named source",
          "No thin duplicated sections shared with other pages",
        ],
      },
      {
        h2: "Links and Media",
        list: [
          "Three or more internal links with descriptive anchor text",
          "Links to genuinely relevant authoritative external sources",
          "No broken links anywhere on the page",
          "Descriptive alt text on every meaningful image",
          "Explicit width and height on all images",
          "Below-the-fold images lazy-loaded; the hero image never lazy-loaded",
        ],
      },
      {
        h2: "Technical and AI Readiness",
        list: [
          "Valid JSON-LD matching the page purpose",
          "FAQPage markup mirroring visible questions",
          "Open Graph and Twitter Card tags complete",
          "Responsive viewport with no horizontal scroll",
          "HTTPS with no mixed-content references",
          "Core Web Vitals within the good thresholds on mobile",
          "AI citation bots allowed in robots.txt",
        ],
      },
    ],
    relatedTools: [
      { slug: "meta-tag-checker", anchor: "meta tag checker" },
      { slug: "heading-checker", anchor: "heading structure checker" },
      { slug: "content-checker", anchor: "content quality checker" },
      { slug: "serp-preview", anchor: "SERP preview tool" },
    ],
    faqs: [
      { q: "What is the most important on-page factor?", a: "Matching search intent. A page that answers a different question than the query asked will not rank regardless of how well its tags are optimised." },
      { q: "How long should a page be?", a: "As long as the intent requires. Compare with the pages currently ranking; padding to hit a word count reduces quality signals rather than improving them." },
      { q: "Does keyword density still matter?", a: "Only as a guard rail. Keep the primary term natural — roughly once per 150 words — and focus on covering the topic and its related entities." },
      { q: "Should every page have FAQ schema?", a: "Only where the page genuinely contains questions and answers users ask. Markup that does not mirror visible content is a policy violation." },
    ],
  },
];

export const BLOG_INDEX: BlogPostMeta[] = BLOG_POSTS.map(({ sections: _s, intro: _i, h1: _h, relatedTools: _r, ...meta }) => meta);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
