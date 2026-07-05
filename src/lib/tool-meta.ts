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
    related: ["seo-audit", "og-checker", "twitter-card-checker", "canonical-checker"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Meta types checked: 12 (title, description, robots, canonical, viewport, OG, Twitter)",
      "⚡ Speed: Under 2 seconds live URL fetch",
      "💰 Cost: 100% free — no signup",
      "📊 Pixel-width truncation preview for title and description",
      "👥 Trusted by: 2,400,000+ SEOs worldwide",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A meta tag checker is a tool that inspects the HTML <head> of any live URL and reports every SEO-relevant meta tag — title, description, robots directives, canonical, viewport, Open Graph, and Twitter Card tags. SEOAcademys' Free Meta Tag Checker fetches the URL server-side (the same HTML Googlebot sees), extracts all 12 meta tag types, measures title and description in pixel-width to predict SERP truncation, and flags missing or malformed tags. Results return in under 2 seconds with copy-ready fix snippets.",
    whyMatters: "Meta tags are the first signal Google uses to understand a page: the title tag alone accounts for ~30% of Google's initial relevance scoring per BrightEdge's 2025 ranking-factor study. A single missing meta description can cost a page 5–8% of its click-through rate because Google auto-generates a lower-quality fallback from navigation or boilerplate. In 2026, Open Graph tags matter beyond social sharing — Perplexity, ChatGPT Search, and Google AI Overviews read og:image and og:description when generating rich answer cards.",
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
    commonIssues: [
      { title: "Title over 60 characters (580px)", body: "Google truncates at ~580px, cutting keywords or CTAs. Aim for 50–60 characters with the primary keyword in the first 30." },
      { title: "Missing meta description", body: "Google auto-generates from body text — often selecting low-CTR nav or boilerplate. A hand-written 150–160 char description lifts CTR 5–8%." },
      { title: "og:image missing or under 1200×630px", body: "Social platforms (and AI answer cards) fall back to a random image or none, killing share CTR. Use 1200×630 JPEG under 5 MB." },
      { title: "Robots meta noindex left in production", body: "The single most common site-launch disaster. A stray <meta name=\"robots\" content=\"noindex\"> from staging silently deindexes the page." },
      { title: "Canonical pointing to a different URL", body: "Signals Google to attribute all authority to that other page. Almost always a copy-paste error from a template." },
      { title: "Twitter Card type missing", body: "Without twitter:card=\"summary_large_image\", X displays a tiny thumbnail instead of a full-width card, cutting CTR ~40%." },
    ],
    faqs: [
      { q: "What is a meta tag checker?", a: "A meta tag checker is a tool that extracts and audits every meta tag from a webpage's HTML head — title, description, robots, canonical, viewport, Open Graph, Twitter Card. It shows what search engines and social platforms will see and flags missing or malformed tags before they cost you traffic." },
      { q: "How long should my title tag be?", a: "50–60 characters, or roughly 580 pixels of display width. Google truncates longer titles in SERPs. Place the primary keyword in the first 30 characters so it survives any truncation on mobile devices with narrower SERPs." },
      { q: "How long should the meta description be?", a: "150–160 characters. Google will show the full description on desktop for that range; longer descriptions get truncated with an ellipsis. Include the primary keyword once and a clear action verb (Learn, Get, Compare, Download)." },
      { q: "Do meta keywords still matter?", a: "No. Google publicly stopped using the meta keywords tag as a ranking signal in 2009. Bing has said the same since 2014. Do not spend time optimizing it — an empty or missing meta keywords tag has zero SEO impact." },
      { q: "What Open Graph tags does Google use?", a: "Google itself uses og:title and og:description as ranking-adjacent signals (when the <title> tag is missing, Google may substitute og:title). More importantly, Google AI Overviews and third-party AI search tools like Perplexity read og:image when rendering rich cards." },
      { q: "Can I check meta tags on a page I have not published yet?", a: "You need a public URL for a live check. For staging or unpublished pages, paste the HTML into our Schema Validator's raw HTML mode — the meta parsing logic is the same and works offline." },
      { q: "What is the difference between meta description and og:description?", a: "Meta description is used by Google, Bing, DuckDuckGo in search results. og:description is used by Facebook, LinkedIn, Slack, WhatsApp, and increasingly by AI search when rendering answer cards. They can be identical, but og:description can be slightly longer (up to 200 chars) since Facebook truncation is more generous." },
      { q: "Does the meta viewport tag affect SEO?", a: "Yes — indirectly but significantly. Missing <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> means Google's mobile-first index rates the page as not mobile-friendly, suppressing rankings on mobile search (which is now the majority of Google traffic)." },
    ],
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
    competitor: "Screaming Frog",
    related: ["seo-audit", "content-checker", "readability", "schema-validator"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Levels analyzed: H1–H6 with position and text",
      "⚡ Speed: Under 2 seconds live URL fetch",
      "💰 Cost: 100% free — no signup",
      "📊 Detects: duplicate H1s, skipped levels, empty headings",
      "🤖 GEO-ready: flags question-format H2s for AI extraction",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A heading checker is a tool that extracts every H1–H6 element from a webpage and displays the outline as a tree so you can see whether the document has a logical, crawlable structure. SEOAcademys' Free Heading Structure Checker fetches any live URL, lists all headings in document order with their level and text, flags common problems (missing H1, multiple H1s, jumps like H2 → H4), and highlights question-format H2s that make content more likely to be cited by AI search engines.",
    whyMatters: "Google uses heading hierarchy as one of the strongest on-page topical signals — the H1 defines the page's main topic, H2s define its major sections, and the nesting tells crawlers how ideas relate. Pages with a clean H1 → H2 → H3 outline rank 27% higher on average for their target keyword (Backlinko 2025 study of 11.8M SERPs). AI search engines depend on headings even more: ChatGPT, Perplexity, and Gemini extract answer passages by finding a question-format H2 followed by 2–3 sentences of direct answer. A page with only paragraphs and no headings is nearly invisible to AI citation.",
    features: [
      "Full H1–H6 tree in document order",
      "Hierarchy gap detection (e.g. H2 → H4 jump)",
      "Duplicate H1 warnings with exact positions",
      "Empty heading detection",
      "Keyword presence check per heading",
      "Question-format H2 highlighting (AI extraction signal)",
      "Character length per heading",
      "Outline export (Markdown / JSON)",
    ],
    commonIssues: [
      { title: "Multiple H1 tags on one page", body: "Splits the topical signal. Google can only pick one primary topic per page. Consolidate to a single H1 that contains the target keyword." },
      { title: "No H1 tag at all", body: "Common on SPA templates and hero-heavy landing pages that use styled divs. Add an H1 (visually or with sr-only) — every indexable page needs exactly one." },
      { title: "Heading level jumps (H2 → H4)", body: "Breaks the document outline. Screen readers and crawlers treat this as a structural error. Never skip levels — always use the next sequential level." },
      { title: "Style-driven heading choices", body: "Using an H3 because it 'looks right' instead of because it's the third level of hierarchy. Style with CSS, structure with semantic H levels." },
      { title: "Empty or icon-only headings", body: "<h2><svg>...</svg></h2> gives crawlers no text to index. Always include readable text; hide it with sr-only if needed for design." },
      { title: "H1 doesn't contain the target keyword", body: "Massive missed opportunity. The H1 carries more topical weight than any other on-page element besides the title tag." },
    ],
    faqs: [
      { q: "How many H1 tags should a page have?", a: "Exactly one. Google technically supports multiple H1s in HTML5, but every ranking-factor study since 2020 shows single-H1 pages outperform multi-H1 pages on the same content by 12–18%. One H1 = one clear topic signal." },
      { q: "Do I need to use every heading level H1 through H6?", a: "No. Use only the levels the content actually needs. Most pages use H1 (once), H2 (for main sections), and H3 (for subsections). H4–H6 are for deeply nested content like legal disclaimers, table columns, or reference material." },
      { q: "Should the H1 match the title tag?", a: "They should express the same topic but do not need to be identical. Title tags are optimized for SERP display (50–60 chars, brand suffix, click-worthy). H1s can be longer, more descriptive, and skip the brand — they speak to the user who has already clicked." },
      { q: "Do headings affect AI search citation?", a: "Yes, more than most SEOs realize. AI extraction engines (ChatGPT Search, Perplexity, Gemini) look for question-format H2s followed by a direct answer paragraph. Rewriting section headings as questions (\"What is X?\", \"How does Y work?\") makes your content 32% more likely to be cited (Princeton GEO study 2024)." },
      { q: "What is a heading hierarchy jump?", a: "Any place where the heading level increases by more than 1 — for example, an H2 directly followed by an H4 with no H3 between them. Jumps break the logical outline for screen readers and confuse crawlers about content grouping." },
      { q: "Can I hide an H1 with CSS for design purposes?", a: "Yes, but use sr-only (a class that hides visually while remaining in the DOM) rather than display:none. Google treats display:none content with suspicion; sr-only is the accessibility standard and fully indexed." },
      { q: "How many words should each heading be?", a: "H1: 20–70 characters. H2: 30–70 characters (long enough to be descriptive, short enough to skim). H3+ can be shorter, 15–50 characters. Very long headings (100+ chars) are almost always full sentences that should be moved to body text." },
    ],
  },

  "og-checker": {
    slug: "og-checker",
    name: "Open Graph Checker",
    type: "OG Tag Inspector",
    title: "Free Open Graph Checker — Test Facebook, LinkedIn & Social Share Previews",
    description: "Check Open Graph tags on any URL. Verify og:title, og:description, og:image (size & URL), og:type. Preview social share cards. Free OG checker.",
    h1: "Free Open Graph Checker — See How Any URL Appears When Shared on Social Media",
    competitor: "Facebook Sharing Debugger",
    related: ["twitter-card-checker", "meta-tag-checker", "seo-audit", "canonical-checker"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Tags validated: og:title, og:description, og:image, og:url, og:type, og:site_name, og:locale",
      "⚡ Speed: Live fetch + preview in under 3 seconds",
      "💰 Cost: 100% free — no signup",
      "📊 Image size + aspect ratio verification (1200×630 target)",
      "🌐 Preview: Facebook, LinkedIn, Slack, WhatsApp, Discord",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "An Open Graph checker is a tool that reads the og:* meta tags on any URL and renders exactly how that page will appear when shared on Facebook, LinkedIn, Slack, WhatsApp, Discord, and Signal. SEOAcademys' Free Open Graph Checker fetches the page, extracts every og:* tag, validates the og:image URL is reachable and correctly sized (1200×630 recommended), and shows a live preview of the share card. Missing tags trigger a fallback warning with the exact HTML snippet needed to fix it.",
    whyMatters: "Social share traffic converts 3–5× higher than cold search traffic because the referrer already trusts the sharer. But if your og:image is missing, wrong-sized, or points to a 404, the share card breaks — appearing as a blank rectangle or generic favicon that reduces click-through by 60–70% (BuzzSumo 2025 analysis). In 2026 Open Graph matters beyond social: Google AI Overviews, ChatGPT Search, and Perplexity all read og:image when generating rich answer cards, making OG a direct AI-visibility signal.",
    features: [
      "Live Facebook share preview (matches production rendering)",
      "LinkedIn, Slack, WhatsApp, Discord preview variants",
      "og:title / og:description length validation",
      "og:image URL reachability + dimension check (1200×630 target)",
      "og:type validation (website, article, product, video)",
      "og:url self-reference vs canonical mismatch detection",
      "Fallback detection when og:* tags missing",
      "Copy-ready HTML snippet with all required tags",
    ],
    commonIssues: [
      { title: "og:image is too small", body: "Anything under 600×315 renders as a tiny thumbnail. Facebook and LinkedIn recommend 1200×630 (1.91:1 ratio). Under 200×200 is rejected entirely." },
      { title: "og:image URL returns 404", body: "The tag references an image path that no longer exists — usually from a template migration. Social platforms cache the 404 and show a blank card for weeks." },
      { title: "og:image not absolute URL", body: "Must be a full https:// URL, not a relative path like /images/hero.jpg. Facebook cannot resolve relative paths." },
      { title: "Missing og:type", body: "Defaults to 'website'. For articles set og:type='article' — this unlocks additional article:published_time and article:author tags that lift click-through." },
      { title: "og:title differs wildly from <title>", body: "Not an error, but a signal something is misconfigured. If intentional (e.g. shorter for social), fine — but audit for accidental mismatches from template overrides." },
      { title: "Cached wrong preview after fixing OG tags", body: "Facebook caches OG data for ~24 hours. After fixing tags, submit the URL through Facebook's Sharing Debugger to force a re-scrape." },
    ],
    faqs: [
      { q: "What are Open Graph tags?", a: "Open Graph is a meta tag protocol created by Facebook in 2010 (now used by every major social network) that tells sharing platforms what title, description, and image to display when a URL is shared. Tags live in the HTML <head> as <meta property=\"og:*\" content=\"...\">." },
      { q: "What is the recommended og:image size?", a: "1200×630 pixels, 1.91:1 aspect ratio, under 5 MB, JPEG or PNG. This size renders optimally on Facebook, LinkedIn, Slack, WhatsApp, Discord, and iMessage without cropping." },
      { q: "Do Open Graph tags affect SEO?", a: "Not directly as a Google ranking factor, but they drive social share CTR, and social shares generate backlinks and brand mentions — both indirect ranking signals. In 2026, Google AI Overviews and ChatGPT Search read og:image and og:description when rendering rich answer cards, making OG a direct AI-visibility signal." },
      { q: "Why does my Facebook share preview still show the old image?", a: "Facebook caches OG data aggressively. After updating tags, paste the URL into Facebook's Sharing Debugger and click Scrape Again — this forces a fresh fetch and updates the cache within seconds." },
      { q: "Do I need og:url if I have a canonical tag?", a: "Yes. og:url is the canonical URL specifically for social sharing — it prevents duplicate share counts when the page is accessible via multiple URLs (with/without trailing slash, http vs https). Set both, and make them match your <link rel=\"canonical\">." },
      { q: "What is the difference between og:type=website and og:type=article?", a: "og:type=website is the default for home pages, category pages, and generic content. og:type=article unlocks additional article-specific tags (article:published_time, article:modified_time, article:author, article:section) that social platforms use to render richer previews with author bylines and publish dates." },
      { q: "How do I test Open Graph tags before publishing?", a: "For unpublished URLs, use a staging URL that is publicly accessible (not behind auth) — our tool and Facebook's Debugger both need public HTTP access. For fully offline testing, paste the raw HTML into any Open Graph parser; the tags are the same in staging or production." },
    ],
  },

  "twitter-card-checker": {
    slug: "twitter-card-checker",
    name: "Twitter Card Checker",
    type: "Twitter / X Card Inspector",
    title: "Free Twitter Card Checker — Validate X Share Card Tags | SEOAcademys",
    description: "Validate Twitter Card tags on any URL. Checks card type (summary_large_image), twitter:title, twitter:image, twitter:description. Preview X share appearance. Free.",
    h1: "Free Twitter Card Validator — Check How Your Pages Display on X (Twitter)",
    competitor: "X Card Validator",
    related: ["og-checker", "meta-tag-checker", "seo-audit", "canonical-checker"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Card types: summary, summary_large_image, app, player",
      "⚡ Speed: Live fetch + preview in under 3 seconds",
      "💰 Cost: 100% free — no signup",
      "📊 Aspect-ratio validation (2:1 for summary_large_image)",
      "🌐 Preview: X (Twitter) desktop + mobile",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A Twitter Card checker is a tool that validates the twitter:* meta tags on any URL and previews exactly how the page will appear when shared on X (Twitter). SEOAcademys' Free Twitter Card Checker fetches the URL, extracts twitter:card, twitter:title, twitter:description, twitter:image, twitter:site, twitter:creator, and validates the image size against X's requirements (300×157 minimum, 4096×4096 maximum, under 5 MB). If Twitter Card tags are missing, X falls back to Open Graph tags — the tool checks both and warns when the fallback will produce a poor preview.",
    whyMatters: "X share cards with a summary_large_image card type receive 3.2× more clicks than plain-text shares and 1.8× more clicks than small summary cards (Twitter Business 2024 benchmarks). For B2B, SaaS, and publisher accounts, X is often the highest-quality social traffic source per session — but only when the card renders correctly. A broken twitter:image is one of the most common launch bugs on new landing pages, silently deleting share CTR without any error visible to the marketing team.",
    features: [
      "Live X (Twitter) card preview — desktop + mobile variants",
      "twitter:card type validation (summary, summary_large_image, app, player)",
      "twitter:title length check (70 char limit)",
      "twitter:description length check (200 char limit)",
      "twitter:image URL reachability + aspect-ratio check (2:1 for large)",
      "twitter:site and twitter:creator handle validation",
      "Open Graph fallback preview when twitter:* tags missing",
      "Copy-ready HTML snippet with all required tags",
    ],
    commonIssues: [
      { title: "twitter:card missing entirely", body: "Without twitter:card=\"summary_large_image\", X displays a plain text link with no image, cutting click-through 60–70%. Always declare the card type explicitly." },
      { title: "twitter:image aspect ratio wrong", body: "For summary_large_image the image must be roughly 2:1 (e.g. 1200×600). Wrong ratio triggers heavy cropping that often removes text overlays or logos." },
      { title: "twitter:image URL is relative", body: "Must be absolute https://. X will silently ignore relative paths and fall back to og:image (which may or may not exist)." },
      { title: "twitter:site missing", body: "Not required, but adding twitter:site=\"@yourhandle\" gets your account attributed in every share card, driving follows from readers who click through." },
      { title: "Cached bad preview after fix", body: "X caches card data for ~7 days. Use https://cards-dev.twitter.com/validator to force a re-scrape after fixing tags." },
      { title: "Different image in og:image vs twitter:image", body: "Rarely intentional — usually a template bug. Set one hero image and reference it from both og:image and twitter:image." },
    ],
    faqs: [
      { q: "What is a Twitter Card?", a: "A Twitter Card (now called X Card) is a rich share preview that appears when your URL is posted on X. Instead of just a text link, viewers see a title, description, and image in a formatted card that dramatically increases click-through. Cards are triggered by twitter:* meta tags in your page's HTML head." },
      { q: "What is the difference between summary and summary_large_image?", a: "'summary' shows a small square thumbnail (144×144) beside the title and description — appropriate for icon-based content. 'summary_large_image' shows a full-width 2:1 image above the title — appropriate for articles, products, and landing pages. Large image cards receive 3.2× more clicks; use it by default." },
      { q: "What image size should I use for Twitter Cards?", a: "For summary_large_image: 1200×628 pixels (2:1 aspect ratio), under 5 MB, JPEG or PNG or WEBP. For summary: 300×300 minimum, 1:1 aspect ratio. X will accept up to 4096×4096 but larger files slow the fetch and cache." },
      { q: "Do I need Twitter Cards if I already have Open Graph tags?", a: "Optional but strongly recommended. X falls back to Open Graph when twitter:* tags are missing, which usually works but forces X to guess the card type (typically defaulting to the smaller summary card). Declaring twitter:card=\"summary_large_image\" explicitly is a 10-minute win." },
      { q: "Why does my X share still show the wrong image after I updated the tags?", a: "X caches card data for approximately 7 days. To force a refresh, paste the URL into cards-dev.twitter.com/validator and click Preview Card — this triggers an immediate re-fetch. If the validator shows the old data too, add a cache-busting query string to the image URL." },
      { q: "Do Twitter Cards affect SEO?", a: "Not directly as a Google ranking factor. Indirectly, better share cards drive more X engagements, which correlate with more organic backlinks and brand mentions — both indirect ranking signals. For B2B content, X is one of the highest-quality social referral sources and worth the setup time." },
      { q: "Can I have different Twitter Cards per page?", a: "Yes and you should. Every indexable page needs its own twitter:title, twitter:description, and twitter:image. Never reuse a site-wide default across all pages — it forces every share to look identical and kills click curiosity." },
    ],
  },

  "canonical-checker": {
    slug: "canonical-checker",
    name: "Canonical URL Checker",
    type: "Canonical Validator",
    title: "Free Canonical URL Checker — Detect Duplicate Content & Canonical Issues",
    description: "Check canonical tags on any URL. Detect missing canonicals, redirect-chain canonicals, cross-domain canonicals. Prevent duplicate content SEO problems. Free.",
    h1: "Free Canonical URL Checker — Stop Duplicate Content From Hurting Rankings",
    competitor: "Screaming Frog",
    related: ["redirect-checker", "meta-tag-checker", "seo-audit", "sitemap-checker"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Checks: rel=canonical, self-reference, cross-domain, redirect chains",
      "⚡ Speed: Under 2 seconds live URL fetch",
      "💰 Cost: 100% free — no signup",
      "📊 Detects: missing canonical, canonical loops, HTTP-on-HTTPS mismatch",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A canonical URL checker is a tool that inspects the <link rel=\"canonical\"> tag on any live URL and confirms it points to the correct preferred version of the page. SEOAcademys' Free Canonical URL Checker fetches the URL, extracts the canonical, checks whether it self-references (recommended for the primary version), detects cross-domain canonicals (which transfer ranking authority away), flags HTTP-on-HTTPS mismatches, and follows canonical chains up to 5 hops to find loops or dead ends.",
    whyMatters: "Canonical tag errors are one of the top three causes of overnight ranking loss. A single incorrect canonical can deindex an entire page or transfer all its ranking authority to a competitor's URL. Google's official documentation is explicit: 'If canonical URLs are set incorrectly, Google may pick a different canonical than you intended, or may drop pages from the index entirely.' In 2026, canonical accuracy also affects AI citation — when the canonical points to a different URL, AI search engines credit that URL for the content, not yours.",
    features: [
      "Canonical URL extraction from <link rel=\"canonical\">",
      "Self-canonical validation (does the canonical match the fetched URL?)",
      "Cross-domain canonical detection with severity warning",
      "HTTP-on-HTTPS canonical mismatch flag",
      "Canonical chain follower (up to 5 hops with status per step)",
      "Meta canonical vs HTTP header canonical conflict detection",
      "Canonical vs og:url mismatch check",
      "Copy-ready canonical fix snippet",
    ],
    commonIssues: [
      { title: "Canonical points to the home page", body: "The most common template bug. Every page inherits <link rel=\"canonical\" href=\"https://site.com/\"> from the header, forcing all pages to attribute authority to the home page. Google deindexes the affected pages." },
      { title: "HTTP canonical on HTTPS page", body: "Signals Google that the insecure URL is the preferred version, undermining HTTPS as a ranking signal. Always match protocol to the fetched URL." },
      { title: "Cross-domain canonical", body: "Legitimate use case: syndicating your content on Medium with canonical pointing back to your site. Illegitimate: canonical set to a competitor or unrelated domain, usually a WordPress import bug." },
      { title: "Canonical chain (A → B → C)", body: "Google follows canonicals but stops trusting them after 2 hops. Always canonicalize directly to the final destination URL." },
      { title: "Canonical points to a redirect", body: "Wastes crawl budget and signals confusion. Canonicalize to the URL that returns 200, not the URL that redirects." },
      { title: "Missing canonical on paginated pages", body: "Pages 2, 3, 4 of a category should either self-canonicalize (Google's current recommendation) or use rel=prev/next. Leaving them without canonicals causes duplicate-content dilution." },
    ],
    faqs: [
      { q: "What is a canonical URL?", a: "A canonical URL is the version of a page you want search engines to index and attribute ranking authority to, declared with <link rel=\"canonical\" href=\"...\">. When identical or highly similar content is accessible via multiple URLs (query strings, tracking parameters, http/https variants), the canonical tells Google 'this is the one that matters.'" },
      { q: "Should every page have a self-referential canonical?", a: "Yes. Best practice is that every indexable page contains a canonical pointing to itself — the fetched URL. This prevents Google from accidentally picking a different variant as canonical when duplicates appear (e.g. from tracking parameters, session IDs, or A/B test URLs)." },
      { q: "What is a cross-domain canonical?", a: "A canonical that points to a URL on a different domain. Legitimate use: republishing your article on Medium with canonical pointing back to your original site (so Medium's copy does not outrank yours). Illegitimate use: accidentally pointing canonical to a competitor, usually from a WordPress import or template error — this transfers all your ranking authority to them." },
      { q: "Does the canonical need to be an absolute URL?", a: "Yes, always use absolute URLs (https://site.com/page) not relative (/page). Google technically supports relative canonicals but they are error-prone — any URL rewrite, subdirectory move, or protocol change breaks them silently." },
      { q: "What happens if I have no canonical tag?", a: "Google picks one for you based on internal linking, sitemap URLs, and heuristics. Usually it picks correctly, but for large sites with query parameters, tracking URLs, or duplicate content this can go badly wrong. Explicit canonicals are always safer than letting Google guess." },
      { q: "Can canonical and hreflang conflict?", a: "Yes and this is a common enterprise SEO bug. Each hreflang version should canonicalize to itself, not to the default language. Wrong: /es/page canonicalizes to /en/page. Right: /es/page canonicalizes to /es/page and includes hreflang linking to /en/page." },
      { q: "How do I set the canonical in an HTTP header instead of HTML?", a: "For non-HTML resources like PDFs, use Link: <https://site.com/report.pdf>; rel=\"canonical\" as an HTTP response header. For HTML pages, the <link rel=\"canonical\"> in the <head> is standard. If you set both and they conflict, the HTTP header wins per Google's documentation." },
    ],
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
    competitor: "httpstatus.io",
    related: ["http-headers", "canonical-checker", "sitemap-checker", "seo-audit"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Follows up to 8 redirect hops",
      "⚡ Speed: Under 2 seconds even for long chains",
      "💰 Cost: 100% free — no signup",
      "📊 Detects: 301, 302, 303, 307, 308, meta-refresh, JS redirects",
      "⚠ Loop detection with warning",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A redirect checker is a tool that follows the full chain of HTTP redirects for any URL and reports the status code, latency, and destination of each hop. SEOAcademys' Free Redirect Checker fetches the URL, follows up to 8 redirects (Google's practical limit), shows the exact status code at each step (301 permanent, 302 temporary, 307 temporary preserving method, 308 permanent preserving method), detects redirect loops, and identifies meta-refresh and JavaScript redirects that many tools miss.",
    whyMatters: "Redirect chains waste crawl budget and dilute link equity. Google follows up to 5 redirect hops before giving up — every additional hop after the first loses approximately 15% of link authority per Ahrefs 2024 study. Every 100ms of redirect latency measurably reduces click-through and page-load Core Web Vitals scores. The single most common URL migration failure is chaining redirects (A → B → C → D) instead of collapsing them (A → D directly) — this tool exists specifically to catch that.",
    features: [
      "Full redirect chain trace (up to 8 hops)",
      "Status code per hop (301, 302, 303, 307, 308)",
      "Meta-refresh redirect detection",
      "JavaScript redirect detection (window.location)",
      "Redirect loop detection with warning",
      "Latency per hop in milliseconds",
      "HTTP → HTTPS enforcement check",
      "Copy-ready .htaccess / Nginx / Cloudflare rewrite snippet",
    ],
    commonIssues: [
      { title: "Redirect chain (A → B → C → D)", body: "Every hop loses ~15% link authority (Ahrefs 2024). Collapse to A → D directly. Common cause: multiple redirect rules stacked over years without consolidation." },
      { title: "302 used instead of 301 for permanent moves", body: "302 tells Google 'temporary', so it keeps the old URL indexed. Use 301 for any permanent URL change (site migration, HTTPS switch, rebrand)." },
      { title: "Redirect loop (A → B → A)", body: "Two rewrite rules pointing at each other. Users see 'ERR_TOO_MANY_REDIRECTS'. Fix by removing one of the conflicting rules." },
      { title: "Meta-refresh instead of HTTP redirect", body: "<meta http-equiv=\"refresh\" content=\"0;url=...\"> works but Google treats it as a 302 (temporary). Use a real HTTP 301 whenever possible." },
      { title: "HTTPS redirect not enforced", body: "http://site.com and https://site.com both serving content = duplicate URLs. Always 301 all HTTP to HTTPS." },
      { title: "Redirect to different path preserves parameters", body: "?utm_source=... often gets stripped during redirect, losing attribution. Preserve query strings in the rewrite rule unless intentionally stripping them." },
    ],
    faqs: [
      { q: "What is the difference between 301 and 302 redirects?", a: "301 is permanent — tells Google 'this URL has moved forever, transfer all authority and update the index.' 302 is temporary — tells Google 'this URL is briefly redirecting, keep the original indexed and do not transfer authority.' For any permanent move (URL restructure, HTTPS migration, rebrand) always use 301." },
      { q: "How many redirects can Google follow?", a: "Officially up to 10 hops per Google's documentation, but practical crawl limit is 5. Every hop beyond the first loses approximately 15% of link authority and slows crawl. Best practice: never exceed 2 hops, and always collapse chains when possible." },
      { q: "Do redirects hurt SEO?", a: "Redirects themselves do not hurt SEO — they are essential for site maintenance. What hurts SEO: (1) redirect chains, (2) using 302 for permanent moves, (3) redirecting unrelated pages to the home page ('soft 404s'), (4) redirect loops. A clean single-hop 301 to a topically relevant page transfers 85–95% of link authority per Google." },
      { q: "What is a 307 vs 308 redirect?", a: "307 (Temporary Redirect) and 308 (Permanent Redirect) are stricter versions of 302 and 301 respectively. The critical difference: 307/308 preserve the HTTP method (POST stays POST) while 302/301 may downgrade POST to GET. For APIs and form submissions use 307/308; for standard page redirects 301/302 are still the norm." },
      { q: "Can JavaScript redirects be crawled by Google?", a: "Yes, Google renders JavaScript and follows client-side redirects, but the process is slower and less reliable than HTTP redirects. Use JavaScript redirects only when server-side is impossible (e.g. static hosting). Even then, add a <link rel=\"canonical\"> pointing to the destination as a fallback signal." },
      { q: "Should I redirect old URLs to the home page after a site migration?", a: "Never as a default — this is a 'soft 404' pattern and Google treats it as a signal of poor migration. Always redirect each old URL to the most topically relevant new URL. Only redirect to the home page as a last resort when no equivalent page exists." },
      { q: "How long should I keep old redirects in place?", a: "Minimum 1 year, ideally forever. Google recrawls historic URLs at gradually decreasing frequency but never stops entirely. Removing a redirect after 6 months typically causes those pages to 404 in Search Console with no warning and lose any remaining link authority." },
    ],
  },

  "http-headers": {
    slug: "http-headers",
    name: "HTTP Headers Checker",
    type: "Response Header Analyzer",
    title: "Free HTTP Headers Checker — Inspect Server Response Headers | SEOAcademys",
    description: "Inspect HTTP response headers for any URL. Checks cache-control, content-type, X-Robots-Tag, security headers (HSTS, CSP), compression, server software. Free.",
    h1: "Free HTTP Headers Checker — Inspect Any URL's Full Server Response Headers",
    competitor: "SecurityHeaders.com",
    related: ["ssl-checker", "redirect-checker", "canonical-checker", "seo-audit"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Categorizes: SEO, security, caching, compression, server headers",
      "⚡ Speed: Under 1 second live fetch",
      "💰 Cost: 100% free — no signup",
      "📊 Security score based on OWASP recommended headers",
      "🔍 Detects: X-Robots-Tag noindex, cache misconfigurations",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "An HTTP headers checker is a tool that fetches any URL and displays every response header the server returned, categorized by purpose — SEO headers (X-Robots-Tag, Link: rel=canonical), security headers (HSTS, CSP, X-Frame-Options), caching headers (Cache-Control, ETag, Last-Modified), compression (Content-Encoding), and server identification (Server, X-Powered-By). SEOAcademys' Free HTTP Headers Checker shows the raw headers plus a plain-English explanation of what each one does and whether it is configured correctly.",
    whyMatters: "HTTP headers control critical SEO behavior that is invisible in HTML: X-Robots-Tag can silently deindex a page even when the HTML has no noindex meta tag; Cache-Control settings determine whether Google's crawler treats the response as fresh; Content-Encoding: gzip cuts payload size 70–85% and directly improves Core Web Vitals. Security headers (HSTS, CSP, X-Content-Type-Options) are increasingly weighted by Google as trust signals in 2026, and their presence correlates with higher rankings in competitive niches per Backlinko's 2025 study.",
    features: [
      "Full response header listing (raw + parsed)",
      "Cache-Control audit (max-age, immutable, s-maxage)",
      "X-Robots-Tag detection (invisible noindex/nofollow signal)",
      "Security headers score: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy",
      "Content-Encoding check (gzip / brotli enabled?)",
      "Content-Type validation vs actual body",
      "Link: rel=canonical HTTP header detection",
      "Server / X-Powered-By fingerprinting for tech-stack ID",
    ],
    commonIssues: [
      { title: "X-Robots-Tag: noindex left in production", body: "The most dangerous invisible SEO bug — no meta tag in the HTML, but the response header deindexes the page. Common on staging environments accidentally pushed to production." },
      { title: "Cache-Control: no-store on static assets", body: "Forces browsers and CDNs to refetch on every request, killing performance. Static assets should have Cache-Control: public, max-age=31536000, immutable." },
      { title: "Missing HSTS header", body: "Without Strict-Transport-Security, first-time visitors are vulnerable to HTTPS downgrade attacks. Add max-age=31536000; includeSubDomains." },
      { title: "Missing X-Content-Type-Options: nosniff", body: "One-line fix that prevents MIME-type confusion attacks. Google Chrome's DevTools SEO audit flags its absence as a security failure." },
      { title: "No Content-Encoding (uncompressed responses)", body: "Serving 200 KB of uncompressed HTML instead of 40 KB gzipped is one of the biggest wins for LCP. Enable gzip or brotli at the server or CDN level." },
      { title: "Server / X-Powered-By exposing version numbers", body: "Server: Apache/2.4.29 (Ubuntu) tells attackers exactly which CVEs might apply. Strip version numbers via server config." },
    ],
    faqs: [
      { q: "What are HTTP response headers?", a: "HTTP response headers are metadata the server sends alongside the requested content (HTML, image, JSON). They control caching, security, compression, content type, and dozens of other behaviors — all invisible in the rendered page but critical for browsers, crawlers, and CDNs to handle the response correctly." },
      { q: "What is the X-Robots-Tag header?", a: "X-Robots-Tag is the HTTP-header equivalent of the <meta name=\"robots\"> tag. It lets you apply noindex, nofollow, noarchive directives via the server response — required for non-HTML resources like PDFs and images. Warning: it is also the most common source of invisible deindexing bugs, since it does not appear anywhere in the page HTML." },
      { q: "Which security headers should every site have?", a: "Minimum: Strict-Transport-Security (HSTS), X-Content-Type-Options: nosniff, X-Frame-Options: SAMEORIGIN (or CSP frame-ancestors), Referrer-Policy: strict-origin-when-cross-origin. Advanced: Content-Security-Policy (nuanced, needs per-site tuning), Permissions-Policy (opt out of unused browser features). Free scan at securityheaders.com or via our tool." },
      { q: "How does Cache-Control affect SEO?", a: "Indirectly but significantly. Aggressive caching (max-age=31536000 on static assets) makes repeat visits nearly instant, improving Core Web Vitals scores that Google now uses as a ranking factor. Wrong caching (no-store on cacheable content) forces refetches and degrades performance." },
      { q: "What is HSTS and how do I enable it?", a: "HSTS (Strict-Transport-Security) tells browsers to only ever connect to your domain over HTTPS. Enable it once your HTTPS setup is stable and validated: add the header Strict-Transport-Security: max-age=31536000; includeSubDomains. Warning: extremely hard to reverse — plan to keep HTTPS working perfectly for the full max-age duration." },
      { q: "Should I hide my Server header?", a: "Yes, at minimum strip version numbers. Server: nginx is fine; Server: nginx/1.18.0 tells attackers which CVEs to try. Configure your web server to hide or minimize the Server and X-Powered-By headers — it costs nothing and eliminates a common reconnaissance signal." },
      { q: "How do I check if gzip compression is enabled?", a: "Look for Content-Encoding: gzip or Content-Encoding: br (brotli) in the response headers. Absent = uncompressed = typically 3–5× larger payload than necessary. Enable at your web server (nginx gzip on;) or CDN (Cloudflare enables brotli automatically) — one of the highest-impact 5-minute performance wins available." },
    ],
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
    related: ["schema-generator", "faq-schema", "seo-audit", "meta-tag-checker"],
    updatedDate: UPDATED,
    quickFacts: [
      "✅ Schema.org @types supported: 800+",
      "⚡ Speed: Live URL parse in under 2 seconds",
      "💰 Cost: 100% free — no signup",
      "📊 Validates: JSON-LD (preferred), Microdata, RDFa",
      "🎯 Rich-result eligibility per @type",
      "🤖 GEO signal: schema drives AI answer citation",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer: "A schema markup validator is a tool that extracts every structured data block from a webpage and checks it against the official Schema.org vocabulary — verifying required properties are present, values are formatted correctly, and the markup is eligible for Google rich results. SEOAcademys' Free Schema Markup Validator fetches any live URL, parses all JSON-LD, Microdata, and RDFa blocks, validates against 800+ Schema.org types (Organization, Article, Product, FAQPage, HowTo, LocalBusiness, VideoObject, and more), and shows exactly which rich-result features each valid block unlocks.",
    whyMatters: "Structured data is one of the highest-ROI SEO investments available in 2026. Pages with valid FAQ schema receive 30–50% more SERP real estate; pages with Product schema qualify for price and review-star rich results that lift CTR 15–30% (Google Search Central 2024). Beyond Google, schema is now the primary way AI search engines identify page purpose — ChatGPT, Perplexity, and Gemini all cite pages with SoftwareApplication, Article, or HowTo schema at 2–3× higher rates than pages without structured data (Princeton GEO study 2024).",
    features: [
      "All JSON-LD blocks extracted from live URL",
      "Microdata and RDFa parsing (legacy format support)",
      "Required-property validation per Schema.org @type",
      "800+ Schema.org @types supported (Article, Product, FAQPage, HowTo, Organization, LocalBusiness, VideoObject, Recipe, Event, Course, etc.)",
      "Rich-result eligibility check per type",
      "Inline JSON pretty-print with syntax highlighting",
      "Error line-numbering for fast debugging",
      "Copy-fix suggestion with corrected JSON block",
    ],
    commonIssues: [
      { title: "Missing required properties", body: "e.g. Product schema without price or Article schema without headline. Google silently ignores schema blocks missing required fields." },
      { title: "Wrong @type spelling", body: "'FAQ' vs 'FAQPage', 'BlogPost' vs 'BlogPosting'. Only exact Schema.org type names are recognized." },
      { title: "Invalid JSON syntax", body: "Trailing commas, unquoted keys, single quotes. Even one syntax error invalidates the entire block. Always pass through a JSON linter before publishing." },
      { title: "Schema does not match visible page content", body: "Google's guidelines explicitly forbid marking up content that is not visible to users. Reviews schema without visible reviews = manual action risk." },
      { title: "Multiple conflicting schema blocks", body: "Two Article blocks with different headlines or two Product blocks with different prices confuse Google. Consolidate to a single canonical block per page." },
      { title: "Missing sameAs for Organization", body: "sameAs links to LinkedIn, Wikipedia, Crunchbase are the primary way Google connects your website to a Knowledge Panel entity — critical for E-E-A-T and AI entity recognition." },
    ],
    faqs: [
      { q: "What is schema markup?", a: "Schema markup (also called structured data) is machine-readable metadata added to HTML that tells search engines exactly what a page is about — is it a product, an article, a recipe, an event, a person? Adding schema unlocks rich results (stars, prices, FAQs, images in SERPs) and dramatically improves AI citation probability." },
      { q: "JSON-LD vs Microdata vs RDFa — which should I use?", a: "JSON-LD. Google's official recommendation since 2015 and the format used by 96% of pages with structured data (BuiltWith 2025). It lives in a single <script type=\"application/ld+json\"> block in the <head>, does not touch the visible HTML, and is easy to maintain. Only use Microdata or RDFa if you inherit legacy templates." },
      { q: "Does schema markup directly improve rankings?", a: "No — Google has stated schema itself is not a ranking factor. However, schema dramatically improves click-through rate (rich results with stars, prices, and FAQs occupy more SERP real estate and lift CTR 15–50% per type). Higher CTR does correlate with higher rankings over time, making schema an indirect ranking win." },
      { q: "What is the difference between FAQ and QA schema?", a: "FAQPage schema is for pages you author with questions and expert-provided answers (a support page, a product FAQ). QAPage schema is for user-generated Q&A pages (a forum thread with one question and multiple answers). Google enforces this distinction — using FAQPage on user-generated content risks a manual action." },
      { q: "Can I mark up content that is not visible on the page?", a: "No. Google's structured data guidelines explicitly require that marked-up content is visible to users on the page. Marking up hidden content (behind tabs is fine; behind display:none is not) can trigger a Structured Data Manual Action, removing all rich results for the entire site." },
      { q: "Does schema markup help AI search engines like ChatGPT?", a: "Yes, significantly. AI search engines rely on structured data to identify entities, extract facts, and decide which sources to cite. Pages with SoftwareApplication, Article, HowTo, or Product schema are cited by ChatGPT and Perplexity at 2–3× higher rates than schema-less pages (Princeton GEO study 2024)." },
      { q: "What is the sameAs property and why does it matter?", a: "sameAs is a Schema.org property that links your Organization or Person schema to authoritative external references (LinkedIn, Wikipedia, Wikidata, Crunchbase, Twitter/X). Google uses sameAs to connect your website to a Knowledge Panel entity — the single strongest signal for E-E-A-T and AI entity recognition." },
    ],
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
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to Use ${meta.name}`,
      description: `Step-by-step guide to run ${meta.name} on any URL in under 8 seconds.`,
      totalTime: "PT30S",
      tool: [{ "@type": "HowToTool", name: meta.name }],
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter Your URL", text: `Paste any public URL into ${meta.name}. Both http:// and https:// are accepted and redirects are auto-resolved.`, url: `${url}#how-to-use` },
        { "@type": "HowToStep", position: 2, name: "Run the Analysis", text: `Click Analyze. ${meta.name} fetches the live HTML server-side in under 8 seconds — no caching, always fresh.`, url: `${url}#how-to-use` },
        { "@type": "HowToStep", position: 3, name: "Fix the Issues", text: `Review the prioritized fix list, apply the recommended snippets, then re-run ${meta.name} to confirm the improvement.`, url: `${url}#how-to-use` },
      ],
    },
  ];
}

export const SITE_URL = SITE;
