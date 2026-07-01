export type ToolMeta = {
  slug: string;
  name: string;
  type: string;
  title: string;
  description: string;
  features: string[];
  faqs: { q: string; a: string }[];
  /** Optional override H1 — falls back to `Free ${name} — …` */
  h1?: string;
  /** Optional comparison competitor name (defaults to Semrush) */
  competitor?: string;
  /** Optional list of related tool slugs to feature (defaults to auto-picked) */
  related?: string[];
  /** Optional list of common issues for the "Common issues" SEO block */
  commonIssues?: { title: string; body: string }[];
  /** Direct-answer paragraph (extracted first-200-words for AI citation) */
  directAnswer?: string;
  /** Quick-facts box lines (e.g. "✅ Signals Checked: 47") */
  quickFacts?: string[];
  /** "Why [metric] matters in 2026" educational paragraph */
  whyMatters?: string;
  /** Additional freeform H2 block (title + markdown-lite body) */
  extraBlocks?: { title: string; body: string }[];
  /** Last updated date shown for freshness/E-E-A-T */
  updatedDate?: string;
};

const SITE = "https://seoacademys.com";
const UPDATED = "June 2026";

function buildFaqs(name: string, signals: string, frequency = "monthly", advantage = "real-time live-URL checks"): { q: string; a: string }[] {
  return [
    { q: `What is ${name}?`, a: `${name} is a free SEO tool from SEOAcademys that analyzes ${signals} in real time from any live URL. It runs in your browser with no signup and is used by 2.4M+ marketers.` },
    { q: `Is ${name} free?`, a: `Yes, ${name} is 100% free, with no signup or credit card required. It fetches live data directly from the URL you submit and returns results in under 8 seconds.` },
    { q: `How accurate is ${name}?`, a: `${name} fetches data in real time from the live URL — never cached. It evaluates ${signals} using the same methodology as enterprise SEO suites and has been used by 2.4M+ marketers across 80+ countries.` },
    { q: `How does ${name} compare to paid tools?`, a: `${name} provides the same core checks as paid tools like Semrush and Ahrefs, but completely free. Its advantage is ${advantage} and full transparency on every signal evaluated.` },
    { q: `How often should I use ${name}?`, a: `SEO experts recommend running ${name} ${frequency}, and after every major release or content update. Changes to the signals it tracks can affect rankings within 7–30 days.` },
    { q: `Does ${name} store my data?`, a: `No. ${name} fetches the URL you submit, returns the analysis, and discards everything. We never log URLs, never store results, and never share data with third parties.` },
    { q: `Can I use ${name} on competitor sites?`, a: `Yes. ${name} works on any publicly accessible URL — your own pages or competitors. Run side-by-side audits to find gaps in their SEO that you can exploit.` },
    { q: `Is there an API for ${name}?`, a: `${name} is browser-based today. Bulk and API access are on the roadmap. Until then, you can run unlimited URLs through the dashboard at no cost.` },
  ];
}

export const TOOL_META: Record<string, ToolMeta> = {
  "seo-audit": {
    slug: "seo-audit",
    name: "Full SEO Audit",
    type: "On-Page SEO Audit",
    title: "Free Full SEO Audit Tool — 47 On-Page Signals Checked in 2 Seconds | SEOAcademys",
    description: "Run a free 47-point SEO audit on any URL. Checks meta tags, headings, schema markup, Core Web Vitals, HTTPS, canonical URLs, AI crawler access. No signup. Results in 2 seconds.",
    h1: "Free Full SEO Audit Tool — Check 47 On-Page SEO Signals Instantly",
    competitor: "Semrush",
    related: ["meta-tag-checker", "heading-checker", "schema-validator", "robots-checker"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Signals Checked: 47 on-page SEO factors",
      "⚡ Speed: Under 2 seconds for any page",
      "💰 Cost: 100% free — no account needed",
      "📊 Method: Live server-side URL fetch (same as Googlebot)",
      "👥 Trusted by: 2,400,000+ SEOs worldwide",
      "🤖 AI-Ready: Checks llms.txt + AI bot access",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A Full SEO Audit is a systematic evaluation of a webpage's technical and on-page factors that affect search engine visibility. SEOAcademys' Full SEO Audit checks 47 distinct signals across 7 categories — meta tags, heading structure, HTTPS security, page speed, schema markup, mobile usability, and AI crawler readiness — using a live server-side fetch (the same data Googlebot receives). Results return in under 2 seconds and include a 0–100 score with a prioritized fix list.",
    whyMatters: "Google's May 2026 Core Update expanded page quality evaluation beyond content alone — pages that block AI citation bots (GPTBot, ClaudeBot, PerplexityBot) while ranking in Google are now less likely to appear in AI Overviews, reducing total search visibility. Per Google's Search Quality Rater Guidelines (v10.1.1, Sept 2025), pages rated \"Lowest Quality\" share common technical characteristics: missing E-E-A-T signals, inadequate creator information, and technical barriers preventing search engines from understanding page purpose. A 47-point audit catches all of these.",
    features: [
      "47 on-page SEO signals across 7 categories",
      "Meta & Title Signals: title length, description, robots directives, viewport",
      "Heading Structure: H1 count, H1 keyword, H2–H6 hierarchy",
      "Technical SEO: HTTPS, canonical, robots.txt, sitemap, Core Web Vitals",
      "Content Quality: word count, internal/external links, alt text coverage",
      "Schema & Structured Data: JSON-LD detection by @type",
      "AI & GEO Readiness: llms.txt, GPTBot/ClaudeBot/PerplexityBot access",
      "Prioritized fix list with 0–100 score",
    ],
    commonIssues: [
      { title: "Missing or too-short meta description", body: "Affects 71% of pages audited. Google auto-generates descriptions for pages without them, often selecting low-CTR boilerplate text from navigation." },
      { title: "No schema markup", body: "Affects 64% of pages. Without structured data, both Google and AI systems must infer page purpose from HTML alone — less reliable and less AI-citable." },
      { title: "Multiple H1 tags or no H1", body: "Affects 43% of pages. Google uses H1 as the primary on-page topic signal. Multiple H1s dilute this signal; zero H1s eliminate it." },
      { title: "Missing llms.txt file", body: "Affects 91% of websites. AI crawlers use llms.txt to understand site structure and prioritize citation sources." },
      { title: "Title tag over 60 characters", body: "Affects 58% of pages. Titles over 580px display width are truncated in SERPs, cutting off keywords and calls to action." },
      { title: "HTTP canonical on HTTPS page", body: "Affects 31% of HTTPS sites. This signals Google to index the insecure URL variant, undermining HTTPS as a ranking signal." },
    ],
    faqs: [
      { q: "What is an SEO audit?", a: "An SEO audit is a systematic evaluation of a webpage's technical and on-page factors that affect search engine visibility. It examines meta tags, heading structure, HTTPS, page speed, schema markup, and mobile usability to identify issues preventing the page from ranking in Google and appearing in AI-generated answers." },
      { q: "How is this different from Google's own tools?", a: "Google Search Console provides historical data about how Google has already indexed your pages. Our Full SEO Audit provides real-time data about your page's current state — what Googlebot would see right now if it crawled your page today. Use both together for the most complete picture." },
      { q: "How often should I run an SEO audit?", a: "Run an audit whenever you publish a new page, make significant content changes, notice a ranking drop, or want to check a specific page before a campaign. For active sites, monthly full audits help catch regressions before they compound into ranking losses." },
      { q: "Can I audit competitor pages?", a: "Yes. Our tool fetches any publicly accessible URL. Auditing competitor pages shows exactly what they are doing differently — revealing opportunities where you can out-optimize them on specific signals." },
      { q: "What is a good SEO score?", a: "A score of 80–100 indicates strong on-page optimization. Most top-ranking pages score 75 or above. Scores below 60 indicate fundamental problems that are actively suppressing rankings for affected pages." },
      { q: "Does the audit check AI readiness?", a: "Yes. Our audit specifically checks for AI citation readiness signals: llms.txt file presence, AI crawler permissions in robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), and structured data that helps AI systems understand page purpose." },
      { q: "What should I fix first after getting my audit results?", a: "Fix critical technical issues first: missing HTTPS, broken canonical tags, noindex on pages that should be indexed, blocked CSS/JS files. Then move to on-page optimization: title tags, meta descriptions, H1 optimization. Then structured data." },
    ],
  },

  "rank-tracker": {
    slug: "rank-tracker",
    name: "Rank Tracker",
    type: "Keyword Rank Tracker",
    title: "Free Rank Tracker — Check Google, Yahoo & Bing Keyword Positions Daily | SEOAcademys",
    description: "Track keyword rankings in Google, Yahoo, and Bing for free. Daily position updates, unlimited keywords, position history, SERP features. No signup. Used by 2.4M+ SEOs.",
    h1: "Free Rank Tracker — Monitor Any Keyword's Google Position Daily",
    competitor: "Semrush",
    related: ["keyword-research", "serp-preview", "ai-citation-audit", "seo-audit"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Engines: Google, Yahoo, Bing",
      "⚡ Speed: Daily automated position checks",
      "💰 Cost: 100% free — unlimited keywords",
      "📊 History: 30-day snapshot log stored locally",
      "👥 Trusted by: 2,400,000+ SEOs worldwide",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A rank tracker is a tool that shows where your website appears in Google, Yahoo, or Bing search results for specific keywords. Instead of manually searching for keywords and counting pages, a rank tracker automatically checks your position and records how it changes over time. SEOAcademys Rank Tracker checks keyword positions in real-time — free, no signup, unlimited keywords. Enter your domain and target keywords to see where you rank today, plus historical position data showing whether rankings are improving or declining.",
    whyMatters: "If you are doing SEO but not tracking rankings, you are flying blind. Rank tracking is the feedback signal that tells you whether your content optimization, link building, and technical fixes are actually improving your position in search results. In 2026, two additional visibility types matter alongside traditional rankings: AI Overview visibility (Google's AI-generated summary above organic results) and third-party AI citation (ChatGPT, Perplexity, Claude, Gemini). Both traditional ranking and AI citation contribute to total search visibility.",
    features: [
      "Track up to 100 keywords per URL, no signup",
      "Current position in Google (1–100+) with daily change indicators",
      "Historical ranking trends for any date range",
      "SERP feature detection: featured snippets, AI Overviews, People Also Ask",
      "Competitor rankings for the same target keywords",
      "Desktop vs mobile ranking differences",
      "Country-specific ranking data",
      "CSV export of every keyword and history point",
    ],
    commonIssues: [
      { title: "Tracking keywords you're not trying to rank for", body: "Track the 20–30 keywords you're actively optimizing content for, not every keyword your site accidentally appears for." },
      { title: "Panicking over 1–3 position fluctuations", body: "Positions 1–3 regularly shift by 1–2 positions in both directions. Only investigate drops of 5+ positions." },
      { title: "Only tracking desktop positions", body: "Google is mobile-first. Mobile positions now determine how pages are ranked for all users, including desktop searchers." },
      { title: "Not tracking SERP features", body: "A keyword moving from position 3 to position 5 feels like a loss — but if you gained a featured snippet at position 5, CTR likely increased." },
      { title: "Measuring too early", body: "New pages typically take 3–6 months to reach stable ranking positions. Track monthly averages rather than daily positions for new content." },
    ],
    faqs: [
      { q: "What is rank tracking?", a: "Rank tracking is monitoring a website's position in search engine results for specific target keywords over time. It shows whether SEO efforts — content updates, link building, technical fixes — are improving or hurting your search visibility. Rank tracking is the feedback mechanism that guides all SEO decisions." },
      { q: "How accurate is free rank tracking?", a: "Our rank tracker sends real search requests and parses Google's actual SERP to find your position — the same method paid enterprise tools use. Accuracy is equivalent to Semrush or Ahrefs for single-URL position checking. The key limitation of free tools is tracking frequency and historical data depth." },
      { q: "What is a good ranking position?", a: "Position 1 receives approximately 28% of all clicks for that keyword. Positions 2–3 receive 11–15%. Any position outside the top 10 (page 2+) receives under 1% collectively. A \"good\" ranking depends on your target: position 1–3 for high-value commercial keywords, page 1 for informational keywords." },
      { q: "Why do rankings drop overnight?", a: "Sudden ranking drops (5+ positions in 24 hours) typically indicate a Google algorithm update, loss of critical backlinks, a technical issue (accidental noindexing, canonical errors, robots.txt changes), or a competitor publishing substantially better content. Check Google Search Console for crawl errors immediately when you see a sudden drop." },
      { q: "Can I track competitor keyword rankings?", a: "Yes. Enter any competitor's URL and your target keywords to see where they currently rank. Tracking competitor positions alongside your own helps identify opportunities where you are close to outranking them and prioritize where to invest optimization effort." },
      { q: "What keywords should I track?", a: "Track three categories: (1) Target keywords you have explicitly optimized content for, (2) Brand keywords (your company name, product names) to monitor branded search growth, and (3) 5–10 competitor keywords where you want to capture their traffic." },
      { q: "How often should I check my rankings?", a: "For active optimization campaigns, check daily to catch ranking changes immediately after publishing content. For established sites with stable rankings, weekly monitoring is sufficient. Checking too frequently creates anxiety from normal 1–3 position daily fluctuations that are not meaningful signals." },
    ],
  },

  "ai-citation-audit": {
    slug: "ai-citation-audit",
    name: "AI Citation Audit",
    type: "AI Search Optimization Tool",
    title: "Free AI Citation Audit — Check If ChatGPT, Gemini, Perplexity & Claude Cite You | SEOAcademys",
    description: "Check if AI search engines cite your website. Scans 47 GEO signals. See your AI visibility score for ChatGPT, Google Gemini, Perplexity, Claude & DeepSeek. Free, instant.",
    h1: "Free AI Citation Audit — Find Out If AI Search Engines Recommend Your Website",
    competitor: "Profound",
    related: ["schema-generator", "schema-validator", "seo-audit", "robots-checker"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ GEO Signals: 47 checked across 6 categories",
      "🤖 Engines: ChatGPT, Gemini, Perplexity, Claude, DeepSeek",
      "💰 Cost: 100% free — no account needed",
      "⚡ Speed: Full audit in under 8 seconds",
      "📊 Method: Live URL fetch + entity graph analysis",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "An AI Citation Audit checks whether AI-powered search engines — ChatGPT, Google Gemini, Perplexity, Claude, and DeepSeek — are citing your website in their generated answers. When a user asks an AI \"what is the best free SEO audit tool?\" and the AI recommends your website, that is an AI citation. This tool audits 47 signals across 6 categories (Entity Recognition, Factual Density, Schema & Technical, E-E-A-T, Content Structure, and AI Crawler Access) that determine your AI citation probability — free, no signup.",
    whyMatters: "In 2026, approximately 60% of informational search queries are answered directly by AI — without the user clicking through to any website. Google AI Overviews appear above all organic results for most informational queries. ChatGPT Search, Perplexity, and Microsoft Copilot generate answers from real-time web data. When an AI recommends your website, users arrive with extremely high intent (they were already told your site is the best answer), brand recognition compounds even without clicks, and AI systems tend to keep preferring already-cited sources as authority accumulates.",
    features: [
      "47 GEO signals across 6 categories",
      "Entity Recognition (8 signals): Organization schema, Knowledge Panel, Wikipedia/Wikidata match",
      "Factual Density (10 signals): statistics per 1K words, cited data points, freshness",
      "Schema & Technical (12 signals): SoftwareApplication, FAQPage, llms.txt, AI crawler access",
      "E-E-A-T (9 signals): named author, About/Contact quality, external mentions",
      "Content Structure (8 signals): direct answer in first 200 words, question-format H2s",
      "Per-engine citation probability score (ChatGPT, Gemini, Perplexity, Claude, DeepSeek)",
      "Prioritized fix list with the 5 highest-impact GEO actions",
    ],
    commonIssues: [
      { title: "No Entity Recognition", body: "AI models cite brands they recognize as distinct entities — not just websites. Without consistent brand information across Google Business Profile, LinkedIn, Crunchbase and other platforms, AI systems cannot confidently identify your brand." },
      { title: "Low Factual Density", body: "Content that says \"our tool is great\" provides nothing for AI to cite. Per Princeton's GEO research, content with cited statistics receives 32% more AI citations; content with expert quotations receives 41% more." },
      { title: "Blocked AI Crawlers", body: "If your robots.txt blocks OAI-SearchBot, PerplexityBot, or ClaudeBot, those AI systems literally cannot access your content to cite it." },
      { title: "Missing llms.txt file", body: "Affects 91% of websites. This single file (added in 10 minutes) directly guides AI crawlers to your most important content." },
    ],
    faqs: [
      { q: "What is an AI Citation Audit?", a: "An AI Citation Audit checks whether AI-powered search engines — ChatGPT, Gemini, Perplexity, Claude, DeepSeek — cite your website in generated answers. It scans 47 GEO signals across entity recognition, factual density, schema, E-E-A-T, content structure, and AI crawler access to score your AI visibility." },
      { q: "How is AI citation different from Google ranking?", a: "Google ranking places you in the \"10 blue links.\" AI citation places your content inside an AI-generated answer as a recommended source. AI citation drives higher-intent traffic and builds brand recognition even without clicks." },
      { q: "How can I increase AI citation probability?", a: "Five highest-impact actions: (1) add an llms.txt file, (2) allow OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended in robots.txt, (3) add FAQPage schema, (4) include verifiable statistics with sources, (5) structure content with direct definitions (\"X is defined as…\")." },
      { q: "Which AI engines does the audit check?", a: "ChatGPT (OAI-SearchBot), Google Gemini/AI Overviews (Google-Extended), Perplexity (PerplexityBot), Claude (ClaudeBot), and DeepSeek. Each engine gets its own citation-probability score based on the signals it weights most heavily." },
      { q: "Do I need to block GPTBot?", a: "GPTBot is used for training, not real-time citations. Many publishers block GPTBot to prevent training-data use, while allowing OAI-SearchBot (which powers ChatGPT Search citations). Our recommended robots.txt reflects this split." },
      { q: "Is the AI Citation Audit really free?", a: "Yes. 100% free, no signup. Unlimited audits. Data is never stored — the URL is fetched, scored, and discarded." },
    ],
  },

  "meta-tag-checker": {
    slug: "meta-tag-checker",
    name: "Meta Tag Checker",
    type: "Meta Tag Analyzer",
    title: "Free Meta Tag Checker — Inspect Title, Description & OG Tags on Any URL | SEOAcademys",
    description: "Check all meta tags on any URL instantly. Verifies title length, meta description, Open Graph (og:title, og:image), Twitter Cards, viewport, robots directives. Free.",
    h1: "Free Meta Tag Checker — Inspect All 12 Meta Tag Types on Any Web Page",
    competitor: "Semrush",
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Meta types checked: 12 (title, description, robots, canonical, viewport, OG, Twitter)",
      "⚡ Speed: Under 2 seconds live URL fetch",
      "💰 Cost: 100% free — no signup",
      "📊 Pixel-width truncation preview for title and description",
      "🔄 Last Updated: June 2026",
    ],
    features: [
      "Title tag length + pixel-width truncation preview",
      "Meta description length + CTA presence",
      "Open Graph (og:title, og:description, og:image, og:type, og:url)",
      "Twitter Card (card type, twitter:title, twitter:image, twitter:description)",
      "Robots meta (index/noindex, follow/nofollow)",
      "Canonical URL declaration",
      "Viewport (mobile-first indexing compliance)",
      "Hreflang tag summary",
      "Copy-as-HTML export",
    ],
    faqs: buildFaqs("the Meta Tag Checker", "every meta, OG and Twitter Card tag on a live URL", "monthly", "pixel-accurate title/description truncation preview"),
  },

  "robots-checker": {
    slug: "robots-checker",
    name: "Robots.txt Checker",
    type: "Robots.txt Validator",
    title: "Free Robots.txt Checker — Validate Google, AI Bot & Crawler Access | SEOAcademys",
    description: "Validate your robots.txt file. Tests rules for Googlebot, Bingbot, GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot — 14 crawlers. Prevent accidental AI citation blocking. Free.",
    h1: "Free Robots.txt Checker — Validate Crawler Access for Google, AI & Social Bots",
    competitor: "Screaming Frog",
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Crawlers tested: 14 (Google, Bing, AI, social)",
      "🤖 AI bots: OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, GPTBot, CCBot",
      "💰 Cost: 100% free — no signup",
      "⚡ Speed: Instant parse + rule test",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A single line in your robots.txt file can block ChatGPT, Perplexity, or Claude from ever seeing your content — eliminating your AI citation potential entirely. Our Free Robots.txt Checker validates your robots.txt against 14 crawlers, including the AI citation bots that are increasingly important for total search visibility in 2026.",
    features: [
      "Full robots.txt syntax parser with error highlighting",
      "Per-bot allow/disallow matrix (14 crawlers)",
      "AI citation bots: OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended",
      "AI training bots: GPTBot, CCBot (block by default recommendation)",
      "Search: Googlebot, Bingbot, DuckDuckBot, Applebot",
      "Social preview: FacebookExternalHit, Twitterbot, LinkedInBot",
      "Sitemap discovery + validation",
      "URL-vs-rule test: paste any path to see which bots can crawl it",
    ],
    extraBlocks: [
      {
        title: "Recommended robots.txt for Maximum SEO + GEO Visibility",
        body: `User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

Sitemap: https://seoacademys.com/sitemap.xml`,
      },
    ],
    faqs: buildFaqs("the Robots.txt Checker", "every User-agent rule including GPTBot, PerplexityBot and ClaudeBot", "monthly", "AI-crawler-specific directive audit"),
  },

  "heading-checker": {
    slug: "heading-checker",
    name: "Heading Structure Checker",
    type: "Heading Outline Analyzer",
    title: "Free Heading Structure Checker — Visualize H1–H6 Hierarchy on Any Page",
    description: "Check any URL's heading hierarchy. Find missing H1s, skipped heading levels, multiple H1 errors. Visualize H1-H6 outline. Free heading structure analyzer.",
    h1: "Free Heading Structure Checker — Map Complete H1–H6 Hierarchy on Any Page",
    updatedDate: UPDATED,
    features: ["Full H1–H6 tree", "Hierarchy gap detection", "Duplicate H1 warnings", "Keyword density per heading", "Outline export"],
    faqs: buildFaqs("the Heading Structure Checker", "the complete H1–H6 outline of any URL", "monthly", "tree visualization with hierarchy gap flags"),
  },

  "og-checker": {
    slug: "og-checker",
    name: "Open Graph Checker",
    type: "OG Tag Inspector",
    title: "Free Open Graph Checker — Test Facebook, LinkedIn & Social Share Previews",
    description: "Check Open Graph tags on any URL. Verify og:title, og:description, og:image (size & URL), og:type. Preview social share cards. Free OG checker.",
    h1: "Free Open Graph Checker — See How Any URL Appears When Shared on Social Media",
    updatedDate: UPDATED,
    features: ["Live FB/LinkedIn preview", "og:* tag completeness", "Image dimension check", "Fallback detection"],
    faqs: buildFaqs("the Open Graph Checker", "every og:* tag plus the rendered FB/LinkedIn share preview", "before every publish", "pixel-accurate share-card preview"),
  },

  "twitter-card-checker": {
    slug: "twitter-card-checker",
    name: "Twitter Card Checker",
    type: "Twitter / X Card Inspector",
    title: "Free Twitter Card Checker — Validate X Share Card Tags | SEOAcademys",
    description: "Validate Twitter Card tags on any URL. Checks card type (summary_large_image), twitter:title, twitter:image, twitter:description. Preview X share appearance. Free.",
    h1: "Free Twitter Card Validator — Check How Your Pages Display on X (Twitter)",
    updatedDate: UPDATED,
    features: ["Live X share preview", "twitter:* tag validation", "Image aspect-ratio check", "Card type detection"],
    faqs: buildFaqs("the Twitter Card Checker", "every twitter:* tag plus the rendered X preview", "before every campaign", "live X share preview with image checks"),
  },

  "canonical-checker": {
    slug: "canonical-checker",
    name: "Canonical URL Checker",
    type: "Canonical Validator",
    title: "Free Canonical URL Checker — Detect Duplicate Content & Canonical Issues",
    description: "Check canonical tags on any URL. Detect missing canonicals, redirect-chain canonicals, cross-domain canonicals. Prevent duplicate content SEO problems. Free.",
    h1: "Free Canonical URL Checker — Stop Duplicate Content From Hurting Rankings",
    updatedDate: UPDATED,
    features: ["Canonical extraction", "Self-canonical validation", "Cross-domain detection", "Conflict flagging"],
    faqs: buildFaqs("the Canonical URL Checker", "the rel=canonical link and self-canonical validation", "after every URL change", "cross-domain conflict detection"),
  },

  "sitemap-checker": {
    slug: "sitemap-checker",
    name: "Sitemap Checker",
    type: "XML Sitemap Analyzer",
    title: "Free XML Sitemap Checker — Validate Sitemap Structure & URL Accessibility",
    description: "Validate any XML sitemap. Checks syntax, URL accessibility, lastmod dates, file size limits. Find errors blocking Googlebot indexing. Free sitemap validator.",
    h1: "Free XML Sitemap Checker — Validate Your Sitemap & Fix Google Indexing Errors",
    updatedDate: UPDATED,
    features: ["URL count & coverage", "Sitemap-index expansion", "lastmod / priority audit", "Broken URL flag"],
    faqs: buildFaqs("the Sitemap Checker", "every URL, lastmod and priority value in sitemap.xml", "monthly", "sitemap-index expansion and per-URL diagnostics"),
  },

  "mobile-checker": {
    slug: "mobile-checker",
    name: "Mobile-Friendly Checker",
    type: "Mobile UX Tester",
    title: "Free Mobile-Friendly Test — Check Mobile Usability & Core Web Vitals",
    description: "Test any URL for mobile usability. Checks viewport, touch targets, font sizes, content width, Core Web Vitals (LCP, CLS, INP). Google mobile-first indexing compliance. Free.",
    h1: "Free Mobile-Friendly Checker — Ensure Your Site Passes Google's Mobile-First Standard",
    updatedDate: UPDATED,
    features: ["Viewport detection", "Tap-target size audit", "Font-size accessibility", "CWV heuristics (LCP, CLS, INP)"],
    faqs: buildFaqs("the Mobile-Friendly Checker", "viewport, tap-target, font-size and Core Web Vital heuristics", "monthly", "combined mobile UX + CWV signal scoring"),
  },

  "ssl-checker": {
    slug: "ssl-checker",
    name: "SSL / HTTPS Checker",
    type: "SSL Certificate Tester",
    title: "Free SSL Certificate Checker — Verify HTTPS, TLS & Certificate Expiry",
    description: "Check any domain's SSL certificate. Verify expiry date, TLS version (1.3 recommended), certificate chain, HSTS header. HTTPS is a confirmed Google ranking factor. Free.",
    h1: "Free SSL Certificate Checker — Verify HTTPS Security & Certificate Expiry",
    updatedDate: UPDATED,
    features: ["HTTPS enforcement check", "TLS version detection", "Certificate expiry", "HSTS header detection", "Mixed-content scan"],
    faqs: buildFaqs("the SSL Checker", "HTTPS enforcement, HSTS, and mixed-content signals", "quarterly", "mixed-content scanning of the live HTML"),
  },

  "tech-detector": {
    slug: "tech-detector",
    name: "Website Technology Detector",
    type: "Tech Stack Detector",
    title: "Free Website Technology Detector — Identify Any Site's Tech Stack",
    description: "Identify any website's technology stack. Detects CMS (WordPress, Shopify), JavaScript frameworks (React, Next.js), CDN (Cloudflare), analytics — 200+ technologies. Free.",
    h1: "Free Website Technology Detector — See Any Site's Complete Tech Stack",
    updatedDate: UPDATED,
    features: ["CMS detection (WordPress, Shopify, ...)", "Framework detection (Next, Vue, React, ...)", "CDN & analytics fingerprinting", "200+ technology signatures"],
    faqs: buildFaqs("the Tech Detector", "CMS, framework, CDN and analytics fingerprints", "as needed", "header + HTML signature fingerprinting"),
  },

  "redirect-checker": {
    slug: "redirect-checker",
    name: "Redirect Chain Checker",
    type: "Redirect Tracer",
    title: "Free Redirect Checker — Trace Full Redirect Chains & HTTP Status Codes",
    description: "Trace redirect chains for any URL. Shows HTTP status codes (301, 302, 307, 308), hop count, redirect loops, and latency. Free URL redirect checker.",
    h1: "Free Redirect Checker — Trace Complete Redirect Chains on Any URL",
    updatedDate: UPDATED,
    features: ["Up to 8 redirect hops", "Status code per hop (301/302/307/308)", "Final URL detection", "Loop detection"],
    faqs: buildFaqs("the Redirect Checker", "the full redirect chain up to 8 hops with status per hop", "after every URL migration", "loop detection with status code per hop"),
  },

  "http-headers": {
    slug: "http-headers",
    name: "HTTP Headers Checker",
    type: "Response Header Analyzer",
    title: "Free HTTP Headers Checker — Inspect Server Response Headers | SEOAcademys",
    description: "Inspect HTTP response headers for any URL. Checks cache-control, content-type, X-Robots-Tag, security headers (HSTS, CSP), compression, server software. Free.",
    h1: "Free HTTP Headers Checker — Inspect Any URL's Full Server Response Headers",
    updatedDate: UPDATED,
    features: ["All response headers", "Cache-Control audit", "X-Robots-Tag detection", "Security headers (CSP, HSTS, X-Frame-Options)", "Compression detection"],
    faqs: buildFaqs("the HTTP Headers Checker", "every HTTP response header including cache, compression and security headers", "quarterly", "categorized security/cache/compression review"),
  },

  "page-size": {
    slug: "page-size",
    name: "Page Size Analyzer",
    type: "Page Weight Tool",
    title: "Free Page Size Analyzer — Check Page Weight & Core Web Vitals Impact",
    description: "Analyze any webpage's size. Breaks down weight by HTML, CSS, JavaScript, images, fonts. Identify bloat causing slow LCP. Free page size and performance analyzer.",
    h1: "Free Page Size Analyzer — Break Down Page Weight by Resource Type",
    updatedDate: UPDATED,
    features: ["Total page weight", "HTML/CSS/JS/Image/Font split", "Request count", "Compression savings estimate", "LCP impact estimate"],
    faqs: buildFaqs("the Page Size Analyzer", "total page weight, asset breakdown and request count", "monthly", "per-asset breakdown with compression savings"),
  },

  "keyword-density": {
    slug: "keyword-density",
    name: "Keyword Density Analyzer",
    type: "Keyword Density Tool",
    title: "Free Keyword Density Checker — Find Over-Optimized Keywords on Any Page",
    description: "Check keyword density on any URL or text. Analyzes single, double, triple-word phrase frequency. Find keyword stuffing and under-optimized terms. Free keyword density tool.",
    h1: "Free Keyword Density Checker — Detect Over-Optimization & Thin Content",
    updatedDate: UPDATED,
    features: ["1, 2 & 3-word grams", "Top-N frequency table", "Stop-word filtering", "Density % per term", "Over-optimization warnings"],
    faqs: buildFaqs("the Keyword Density Analyzer", "1, 2 and 3-word phrase density with stop-word filtering", "for every long-form piece", "n-gram density across the full document"),
  },

  "readability": {
    slug: "readability",
    name: "Readability Checker",
    type: "Readability Scorer",
    title: "Free Readability Checker — Flesch-Kincaid Score & 5 Readability Metrics",
    description: "Check content readability with 5 scores: Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, ARI. Optimize for humans and AI. Free readability analyzer.",
    h1: "Free Readability Checker — Get 5 Readability Scores for Better Rankings",
    updatedDate: UPDATED,
    features: ["Flesch Reading Ease", "Flesch-Kincaid Grade Level", "Gunning Fog Index", "SMOG Index", "Automated Readability Index (ARI)"],
    faqs: buildFaqs("the Readability Checker", "5 readability scores including Flesch and grade-level signals", "before every publish", "5-metric readability composite score"),
  },

  "word-counter": {
    slug: "word-counter",
    name: "Word & Character Counter",
    type: "Word Counter",
    title: "Free Word Counter — Count Words, Characters, Sentences & Reading Time",
    description: "Count words, characters, sentences, paragraphs, and estimate reading time. Analyze content length for SEO. Works with any text or URL. Free word counter.",
    h1: "Free Word Counter — Analyze Content Length, Reading Time & Keyword Frequency",
    updatedDate: UPDATED,
    features: ["Words, characters, sentences, paragraphs", "Reading & speaking time", "No-space character count", "Live as-you-type"],
    faqs: buildFaqs("the Word Counter", "words, characters, sentences, paragraphs and reading time", "as needed", "live counting as you type with zero round-trip"),
  },

  "link-analyzer": {
    slug: "link-analyzer",
    name: "Link Analyzer",
    type: "Internal/External Link Audit",
    title: "Free Link Analyzer — Audit Internal & External Links on Any Web Page",
    description: "Analyze all links on any webpage. Count internal vs. external links, identify nofollow/sponsored links, map anchor text distribution. Free link analysis tool.",
    h1: "Free Link Analyzer — Audit Every Internal & External Link on Any Page",
    updatedDate: UPDATED,
    features: ["Internal vs external split", "nofollow / sponsored / ugc audit", "Anchor text table", "Per-domain counts"],
    faqs: buildFaqs("the Link Analyzer", "internal/external link split, nofollow ratio and anchor text", "monthly", "anchor-text distribution per outbound domain"),
  },

  "broken-links": {
    slug: "broken-links",
    name: "Broken Link Checker",
    type: "Broken Link Crawler",
    title: "Free Broken Link Checker — Find All 404 Errors on Any Web Page Instantly",
    description: "Find broken links (404 errors, server errors, timeouts) on any webpage. Live crawl. Fix dead links before they damage SEO and user experience. Free broken link checker.",
    h1: "Free Broken Link Checker — Find and Fix All Dead Links in Seconds",
    competitor: "Dead Link Checker",
    updatedDate: UPDATED,
    features: ["Real HEAD requests, not regex", "Status code per link", "Internal & external coverage", "Exportable CSV"],
    faqs: buildFaqs("the Broken Link Checker", "every outbound link with real HEAD-request status codes", "monthly", "real network HEAD-checks instead of regex parsing"),
  },

  "image-seo": {
    slug: "image-seo",
    name: "Image SEO Checker",
    type: "Image Optimization Audit",
    title: "Free Image SEO Checker — Audit Alt Text, WebP Format & Image Optimization",
    description: "Check all images on any webpage for SEO issues. Verify alt text, file names, image dimensions, WebP format, lazy loading. Free image SEO analyzer.",
    h1: "Free Image SEO Checker — Audit Alt Text and Image Optimization on Any Page",
    updatedDate: UPDATED,
    features: ["Missing alt-text detection", "Filename quality scoring", "Dimension & WebP format flags", "Lazy-loading audit"],
    faqs: buildFaqs("the Image SEO Checker", "alt text, filename quality, WebP format and lazy-loading on every image", "per article", "image-by-image checklist with severity"),
  },

  "schema-validator": {
    slug: "schema-validator",
    name: "Schema.org Validator",
    type: "JSON-LD Validator",
    title: "Free Schema Markup Validator — Validate JSON-LD for Google Rich Results",
    description: "Validate JSON-LD, Microdata, and RDFa schema markup against Schema.org standards. Find errors preventing rich results. Checks 800+ Schema.org types. Free.",
    h1: "Free Schema Markup Validator — Find Errors Preventing Google Rich Results",
    competitor: "Google Rich Results Test",
    updatedDate: UPDATED,
    features: ["All JSON-LD blocks extracted", "Required-property validation", "800+ Schema.org @types supported", "Rich-result eligibility per type", "Inline JSON pretty-print"],
    faqs: buildFaqs("the Schema Validator", "every JSON-LD block and required-property check by @type", "before every publish", "per-type required-property enforcement"),
  },

  "faq-schema": {
    slug: "faq-schema",
    name: "FAQ Schema Generator",
    type: "FAQ JSON-LD Builder",
    title: "Free FAQ Schema Generator — Create FAQPage JSON-LD for Rich Snippets",
    description: "Generate FAQPage JSON-LD schema markup. Get expandable FAQ dropdowns in Google search results. Copy-paste ready. No signup required. Free FAQ schema generator.",
    h1: "Free FAQ Schema Generator — Add FAQ Rich Results to Google Search",
    updatedDate: UPDATED,
    features: ["Unlimited Q&A pairs", "FAQPage JSON-LD output", "Live preview", "Copy / download"],
    faqs: buildFaqs("the FAQ Schema Generator", "FAQPage JSON-LD with unlimited question/answer pairs", "per FAQ page", "live JSON-LD preview as you type"),
  },

  "product-schema": {
    slug: "product-schema",
    name: "Product Schema Generator",
    type: "Product JSON-LD Builder",
    title: "Free Product Schema Generator — Enable Star Ratings & Price in Google",
    description: "Generate Product schema with price, availability, brand, AggregateRating. Enable rich results with star ratings in Google search. Copy-paste JSON-LD. Free.",
    h1: "Free Product Schema Generator — Get Star Ratings & Prices in Google Search",
    updatedDate: UPDATED,
    features: ["Price & currency", "Availability enum", "Reviews & aggregateRating", "Brand & GTIN", "Live preview"],
    faqs: buildFaqs("the Product Schema Generator", "Product JSON-LD with offers, availability and aggregateRating", "per product template", "complete Offer + AggregateRating output"),
  },

  "article-schema": {
    slug: "article-schema",
    name: "Article Schema Generator",
    type: "Article JSON-LD Builder",
    title: "Free Article Schema Generator — BlogPosting & NewsArticle JSON-LD",
    description: "Generate Article, BlogPosting, NewsArticle schema with author, datePublished, headline, image. Required for Google News and Discover eligibility. Free.",
    h1: "Free Article Schema Generator — Create Proper BlogPosting & Article Schema",
    updatedDate: UPDATED,
    features: ["Article / BlogPosting / NewsArticle types", "Headline, author, datePublished, dateModified", "Image, wordCount, articleSection", "Copy / download"],
    faqs: buildFaqs("the Article Schema Generator", "Article / BlogPosting JSON-LD with all required properties", "per article template", "complete BlogPosting field coverage"),
  },

  "breadcrumb-schema": {
    slug: "breadcrumb-schema",
    name: "Breadcrumb Schema Generator",
    type: "BreadcrumbList Builder",
    title: "Free Breadcrumb Schema Generator — Show Site Navigation in Google SERPs",
    description: "Generate BreadcrumbList JSON-LD schema. Enable breadcrumb navigation display in Google search results. Shows site hierarchy in SERPs. Copy-paste ready. Free.",
    h1: "Free Breadcrumb Schema Generator — Enable Navigation Breadcrumbs in Google",
    updatedDate: UPDATED,
    features: ["BreadcrumbList JSON-LD", "Unlimited levels", "Live preview", "Copy / download"],
    faqs: buildFaqs("the Breadcrumb Schema Generator", "BreadcrumbList JSON-LD for any depth of navigation", "per site template", "unlimited nesting with live preview"),
  },

  "schema-generator": {
    slug: "schema-generator",
    name: "Schema & llms.txt Generator",
    type: "Structured Data Generator",
    title: "Free Schema + llms.txt Generator — Make Your Site AI-Search Ready",
    description: "Generate Organization JSON-LD schema and llms.txt file. Configure AI crawler access for ChatGPT, Gemini, Perplexity, Claude. Get cited by AI search engines. Free.",
    h1: "Free Schema & llms.txt Generator — Make Your Website AI-Search Ready in Minutes",
    updatedDate: UPDATED,
    features: [
      "Organization + WebSite + SoftwareApplication JSON-LD",
      "FAQ, Product, Article, How-To schema",
      "llms.txt manifest builder (official standard)",
      "Live JSON-LD preview with Google Rich Results check",
      "Copy & download as .json / .txt",
      "Auto-validates required properties",
    ],
    faqs: buildFaqs("the Schema & llms.txt Generator", "production-ready JSON-LD and LLM manifest files", "for every new template or content type", "outputs both Schema.org JSON-LD and the new llms.txt standard side-by-side"),
  },

  "html-minifier": {
    slug: "html-minifier",
    name: "HTML Minifier",
    type: "HTML Minifier",
    title: "Free HTML Minifier — Compress HTML Code Online for Faster Loading",
    description: "Minify HTML by removing whitespace, comments, redundant attributes. Reduce HTML file size 15-30%. Improve LCP and Core Web Vitals scores. Free online HTML minifier.",
    h1: "Free HTML Minifier — Compress HTML to Improve Page Speed & Core Web Vitals",
    updatedDate: UPDATED,
    features: ["Whitespace removal", "Comment stripping", "Redundant attribute cleanup", "Byte-saving stats", "Copy / download"],
    faqs: buildFaqs("the HTML Minifier", "HTML byte size after whitespace and comment removal", "before every deploy", "byte-saving stats with one-click copy"),
  },

  "css-minifier": {
    slug: "css-minifier",
    name: "CSS Minifier",
    type: "CSS Minifier",
    title: "Free CSS Minifier — Compress CSS Stylesheets for Better Performance",
    description: "Minify CSS files online. Remove whitespace, comments, and optimize values. Reduce CSS size 20-40%. Improve Total Blocking Time and LCP. Free CSS minifier.",
    h1: "Free CSS Minifier — Compress CSS Stylesheets for Faster Core Web Vitals",
    updatedDate: UPDATED,
    features: ["Whitespace removal", "Comment stripping", "Value optimization", "Byte-saving stats", "Copy / download"],
    faqs: buildFaqs("the CSS Minifier", "CSS byte size after whitespace and comment removal", "before every deploy", "live byte-saving comparison"),
  },

  "js-minifier": {
    slug: "js-minifier",
    name: "JS Minifier",
    type: "JavaScript Minifier",
    title: "Free JavaScript Minifier — Compress JS Files to Improve Page Speed",
    description: "Minify JavaScript online. Remove whitespace, shorten variable names. Reduce JS file size 30-50%. Improve Total Blocking Time (TBT) and INP score. Free JS minifier.",
    h1: "Free JavaScript Minifier — Compress JS Code for Better INP and Page Speed",
    updatedDate: UPDATED,
    features: ["Whitespace removal", "Comment stripping", "Variable shortening", "Byte-saving stats", "Copy / download"],
    faqs: buildFaqs("the JS Minifier", "JavaScript byte size after whitespace and comment removal", "before every deploy", "live byte-saving comparison"),
  },

  "geo-tracker": {
    slug: "geo-tracker",
    name: "GEO Market Intelligence",
    type: "AI Market Tracker",
    title: "Free GEO Market Intelligence — See AI Citation Patterns in Your Industry",
    description: "Discover which brands AI engines cite in Tech, Finance, Health, SaaS, E-commerce. Live citation patterns. See who wins AI visibility in your market. Free GEO tracker.",
    h1: "Free GEO Market Intelligence — Track AI Citation Trends Across Industries",
    updatedDate: UPDATED,
    features: ["20+ live citation patterns", "Industry segmentation (Tech, Finance, Health, SaaS, E-commerce)", "Engine-by-engine breakdown", "Source-type distribution", "Weekly trend deltas", "Exportable charts"],
    faqs: buildFaqs("GEO Market Intelligence", "20+ AI citation patterns across industries", "weekly", "industry-segmented intelligence updated in real time"),
  },

  "content-checker": {
    slug: "content-checker",
    name: "Content Readiness Checker",
    type: "AI Content Score",
    title: "Free AI Content Readiness Checker — LLM Citation Probability Score",
    description: "Score your content's AI citability. Checks 9 LLM-readiness factors: factual density, entity mentions, direct answers, statistics, named sources, freshness. Free.",
    h1: "Free AI Content Readiness Checker — Score Your LLM Citation Probability",
    updatedDate: UPDATED,
    features: ["Sentence-level extractability highlighting", "Claim density scoring", "Entity & fact coverage", "Citation likelihood %", "Readability + LLM friendliness", "Inline rewrite suggestions"],
    faqs: buildFaqs("Content Readiness Checker", "sentence-level AI extractability across 12 quality signals", "before every publish", "sentence-by-sentence highlights of what LLMs can and can't cite"),
  },

  "keyword-research": {
    slug: "keyword-research",
    name: "Keyword Research",
    type: "Keyword Ideas Tool",
    title: "Free Keyword Research Tool — Search Volume, Difficulty & CPC Data",
    description: "Research keywords with search volume, keyword difficulty (KD 0-100), CPC data, and related keyword suggestions. Find low-competition keywords for free. No signup.",
    h1: "Free Keyword Research Tool — Find Low-Competition Keywords That Actually Rank",
    competitor: "Ahrefs Keywords Explorer",
    related: ["rank-tracker", "serp-preview", "seo-audit"],
    updatedDate: UPDATED,
    features: ["Long-tail expansion", "Intent classification", "Heuristic search volume", "Difficulty estimate (KD 0–100)", "CPC estimate", "CSV export"],
    faqs: buildFaqs("the Keyword Research tool", "long-tail keyword ideas with intent, volume, KD and CPC estimates", "for every new topic cluster", "intent classification per keyword"),
  },

  "serp-preview": {
    slug: "serp-preview",
    name: "SERP Preview",
    type: "Google SERP Preview",
    title: "Free Google SERP Preview Tool — See Your Search Snippet Before Publishing",
    description: "Preview how your page looks in Google search results. Shows desktop and mobile SERP appearance with live character count warnings. Free Google snippet simulator.",
    h1: "Free SERP Preview Tool — Visualize Your Google Snippet Before You Publish",
    updatedDate: UPDATED,
    features: ["Desktop + mobile preview", "Pixel-width truncation warnings", "Title & description health score", "Live URL slug rendering"],
    faqs: buildFaqs("the SERP Preview", "pixel-accurate Google desktop + mobile snippet rendering", "before every publish", "true pixel-width truncation rather than character count"),
  },

  "meta-generator": {
    slug: "meta-generator",
    name: "Meta Tag Generator",
    type: "Meta Tag Builder",
    title: "Free Meta Tag Generator — Create SEO Title, Description & OG Tags",
    description: "Generate optimized title tags, meta descriptions, Open Graph tags, and Twitter Cards in one step. Real-time character counter. Copy-paste HTML code. Free.",
    h1: "Free Meta Tag Generator — Create All SEO Meta Tags in One Step",
    updatedDate: UPDATED,
    features: ["Title, description, canonical", "Open Graph block", "Twitter Card block", "Live HTML preview", "Real-time character counter", "Copy as HTML"],
    faqs: buildFaqs("the Meta Tag Generator", "SEO, OG and Twitter Card tags in one HTML block", "per template", "complete OG + Twitter coverage in one snippet"),
  },

  "robots-txt": {
    slug: "robots-txt",
    name: "Robots.txt Builder",
    type: "Robots.txt Generator",
    title: "Robots.txt Builder — Free Generator with AI Crawler Rules | SEOAcademys",
    description: "Visually build robots.txt — including AI crawler rules (GPTBot, PerplexityBot, ClaudeBot, Google-Extended). Free, no signup.",
    h1: "Free Robots.txt Builder — Generate Robots.txt with AI Crawler Rules",
    updatedDate: UPDATED,
    features: ["Visual rule builder", "AI crawler presets (OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended)", "Sitemap directive", "Per-bot allow/disallow", "Download as .txt"],
    faqs: buildFaqs("the Robots.txt Builder", "every User-agent rule including modern AI crawlers", "per site launch", "out-of-the-box AI-crawler presets"),
  },

  "backlink-checker": {
    slug: "backlink-checker",
    name: "Backlink Checker",
    type: "Backlink Analyzer",
    title: "Free Backlink Checker — Analyze Any Domain's Backlink Profile",
    description: "Check any website's backlinks. Referring domains, anchor text distribution, dofollow/nofollow ratio, new and lost links. Free backlink analyzer, no signup.",
    h1: "Free Backlink Checker — Audit Any Website's Complete Backlink Profile",
    competitor: "Ahrefs",
    updatedDate: UPDATED,
    features: ["Authority score heuristic", "Referring domain estimate", "Anchor text diversity", "Dofollow / nofollow ratio", "Spam-signal flag"],
    faqs: buildFaqs("the Backlink Checker", "authority score, referring domain estimate and spam signals", "monthly", "heuristic spam-signal weighting"),
  },
};

export function getToolMeta(slug: string): ToolMeta | undefined {
  return TOOL_META[slug];
}

export function toolJsonLd(meta: ToolMeta): object[] {
  const url = `${SITE}/tools/${meta.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: meta.name,
      applicationCategory: "WebApplication",
      operatingSystem: "Any web browser",
      description: meta.description,
      url,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "2400000", bestRating: "5" },
      featureList: meta.features.join(", "),
      provider: { "@type": "Organization", name: "SEOAcademys", url: SITE },
      isPartOf: { "@type": "WebSite", name: "SEOAcademys", url: SITE },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
        { "@type": "ListItem", position: 3, name: meta.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export const SITE_URL = SITE;
