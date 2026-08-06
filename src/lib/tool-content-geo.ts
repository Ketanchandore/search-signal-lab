import type { ToolMeta } from "./tool-meta";

/**
 * Batch C — long-form SEO/GEO content packs for the research & GEO tools.
 * Merged into TOOL_META so <ToolContent /> renders the full H1-H6 outline,
 * direct-answer block, checklist, comparison table, FAQ schema and the
 * related-tools internal-link mesh on every page.
 */
export const GEO_CONTENT: Record<string, Partial<ToolMeta>> = {
  "geo-tracker": {
    competitor: "Profound",
    related: ["ai-citation-audit", "content-checker", "schema-generator", "seo-audit"],
    quickFacts: [
      "✅ Patterns tracked: 20+ live AI citation patterns",
      "🤖 Engines: ChatGPT, Gemini, Perplexity, Claude, Copilot",
      "🏭 Industries: Tech, Finance, Health, SaaS, E-commerce",
      "💰 Cost: 100% free — no account needed",
      "📊 Method: Rolling weekly citation sampling",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "GEO Market Intelligence shows which brands and source types AI engines actually cite when answering questions in your industry. Generative Engine Optimization (GEO) is the practice of earning those citations. This free tracker samples AI answers across Tech, Finance, Health, SaaS and E-commerce, then reports which domains appear, which engines cite them, and how the mix shifts week over week. Use it to see whether AI answers in your market favour documentation, comparison pages, forums or news — then build the format that already wins.",
    whyMatters:
      "AI answers now sit above organic results for most informational queries. A citation inside that answer is the new position one. Tracking who gets cited in your category tells you what format and depth the models trust before you invest in content.",
    features: [
      "20+ live AI citation patterns refreshed weekly",
      "Industry segmentation: Tech, Finance, Health, SaaS, E-commerce",
      "Engine-by-engine breakdown across five major AI answer engines",
      "Source-type distribution: docs, blogs, forums, news, product pages",
      "Week-over-week trend deltas so you can spot momentum early",
      "Domain frequency table showing repeat-cited authorities",
      "Format signals: list depth, statistic density, publish freshness",
      "Exportable charts for reporting to clients or stakeholders",
    ],
    commonIssues: [
      { title: "Optimizing for the wrong engine", body: "Perplexity leans on recent news and forums, while Gemini favours established documentation. Check the per-engine split before choosing a content format." },
      { title: "Ignoring source-type mix", body: "If 60% of citations in your niche go to documentation pages, another listicle will not break in. Match the dominant format first." },
      { title: "Treating one sample as a trend", body: "AI answers vary per session. Only act on patterns that persist across two or more weekly samples." },
      { title: "Never re-checking after a content push", body: "Citation share moves within weeks of publishing. Re-run the tracker 30 days after any major content release." },
    ],
    faqs: [
      { q: "What is GEO (Generative Engine Optimization)?", a: "GEO is the practice of optimizing content so AI answer engines cite it. It overlaps with SEO but adds signals models rely on: extractable direct answers, statistic density, named sources, entity clarity and machine-readable schema." },
      { q: "How is GEO Market Intelligence different from rank tracking?", a: "Rank tracking measures your position in the blue-link results. GEO Market Intelligence measures who gets named inside the AI-generated answer, which is a different competition with different winners." },
      { q: "Which industries are covered?", a: "Tech, Finance, Health, SaaS and E-commerce are covered today. Each industry has its own citation mix, because models weigh regulatory, editorial and community sources differently per vertical." },
      { q: "How often is the data refreshed?", a: "Citation patterns are re-sampled weekly. Weekly cadence balances signal quality against the natural session-to-session variance in AI answers." },
      { q: "Can I see which engines cite my own domain?", a: "Run the AI Citation Audit on your URL for a per-engine probability score, then use this tracker to compare your position against the currently-cited domains in your category." },
      { q: "Does GEO replace traditional SEO?", a: "No. AI engines retrieve from the same crawled index, so crawlability, schema and page quality still gate everything. GEO adds a content-format layer on top of solid technical SEO." },
      { q: "Is GEO Market Intelligence free?", a: "Yes, completely free with no signup. There is no query limit and no credit card required." },
    ],
  },

  "content-checker": {
    competitor: "Clearscope",
    related: ["ai-citation-audit", "readability", "keyword-density", "geo-tracker"],
    quickFacts: [
      "✅ Signals scored: 12 LLM-readiness factors",
      "⚡ Speed: Live scoring as you type",
      "💰 Cost: 100% free — unlimited checks",
      "📊 Output: Citation-probability % + sentence highlights",
      "🔒 Privacy: Text never leaves your session",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "The AI Content Readiness Checker scores how likely an AI engine is to quote your content. It reads your draft sentence by sentence and grades 12 signals that determine extractability: does a direct answer appear in the first 200 words, how many verifiable statistics are present, are sources named, are entities explicit rather than pronouns, and are paragraphs short enough to lift cleanly. You get a citation-probability percentage plus inline highlights showing which sentences a model can quote and which are too vague to use.",
    whyMatters:
      "Models quote sentences, not pages. A paragraph that says a tool is powerful gives nothing to extract, while a sentence with a number, a date and a named source can be lifted verbatim into an answer. Scoring extractability before publishing is the cheapest GEO win available.",
    features: [
      "Sentence-level extractability highlighting with pass/fail reasons",
      "Direct-answer detection in the first 200 words",
      "Claim and statistic density per 1,000 words",
      "Named-source and citation coverage check",
      "Entity clarity scan — flags pronoun-heavy sentences",
      "Question-format heading coverage for AI retrieval",
      "Readability blend so human clarity is not sacrificed",
      "Inline rewrite suggestions for every failing sentence",
    ],
    commonIssues: [
      { title: "Burying the answer", body: "If the definition arrives in paragraph six, models often skip the page. Answer the title question in the first two sentences." },
      { title: "Zero verifiable numbers", body: "Content with cited statistics is quoted far more often. Add at least one dated, sourced figure per major section." },
      { title: "Pronoun soup", body: "Sentences starting with it or they lose meaning once extracted. Repeat the entity name inside quotable sentences." },
      { title: "Wall-of-text paragraphs", body: "Keep paragraphs to three sentences or fewer so a model can lift a complete thought without truncation." },
    ],
    faqs: [
      { q: "What is AI content readiness?", a: "AI content readiness measures how easily a language model can extract, understand and quote a passage. It is scored on directness, factual density, entity clarity, structure and source attribution." },
      { q: "How is the citation probability calculated?", a: "Each of the 12 signals is weighted by observed impact on AI citation, then combined into a single percentage. It is a relative readiness indicator, not a guarantee of citation." },
      { q: "Does this replace a keyword tool?", a: "No. Use keyword research to choose the topic and this checker to make the draft quotable. They solve different stages of the same workflow." },
      { q: "Will optimizing for AI hurt human readability?", a: "No. Direct answers, short paragraphs and cited facts improve human comprehension too. The checker blends a readability score so you can see both at once." },
      { q: "Is my draft stored anywhere?", a: "No. Analysis runs in your session and nothing is logged, stored or shared." },
      { q: "What score should I aim for?", a: "Aim for 75% or higher before publishing. Below 50% usually means the page has no extractable direct answer and no verifiable data." },
      { q: "How often should I re-check content?", a: "Re-score any page you update, and audit top-traffic pages quarterly since competitors keep raising factual density." },
    ],
  },

  "keyword-research": {
    quickFacts: [
      "✅ Data points: volume, KD 0–100, CPC, intent",
      "⚡ Speed: Instant long-tail expansion",
      "💰 Cost: 100% free — unlimited seeds",
      "📊 Output: CSV export of every idea",
      "🎯 Extra: Search-intent classification per keyword",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "Keyword research is the process of finding the exact phrases people type into search engines, then choosing the ones you can realistically rank for. This free tool expands any seed keyword into long-tail variations and returns estimated monthly search volume, a keyword difficulty score from 0 to 100, an estimated cost per click, and the search intent behind each phrase. Sort by difficulty to find low-competition terms, group them into topic clusters, and export the whole list as CSV — no signup required.",
    whyMatters:
      "Most sites fail because they target head terms owned by domains with a decade of authority. Long-tail phrases have lower volume individually but convert better and rank faster. Intent labelling matters even more in 2026, because informational queries are increasingly answered by AI while commercial queries still send clicks.",
    features: [
      "Long-tail expansion from any seed keyword",
      "Search-intent classification: informational, commercial, transactional, navigational",
      "Estimated monthly search volume per keyword",
      "Keyword difficulty score from 0 to 100",
      "Estimated cost per click for commercial value context",
      "Question keywords surfaced separately for FAQ and AI targeting",
      "Topic-cluster grouping so related terms map to one page",
      "One-click CSV export of the full keyword set",
    ],
    commonIssues: [
      { title: "Chasing high-volume head terms", body: "A 50,000-volume keyword with KD 85 is unreachable for a new site. Start under KD 30 and build topical depth first." },
      { title: "Ignoring intent", body: "Ranking a product page for an informational query produces traffic that never converts. Match page type to intent." },
      { title: "One page per keyword", body: "Ten near-identical keywords belong on one strong page, not ten thin ones that cannibalize each other." },
      { title: "Never revisiting the list", body: "Difficulty and volume shift every quarter. Re-run research before each new content cycle." },
    ],
    faqs: [
      { q: "What is keyword difficulty?", a: "Keyword difficulty estimates how hard it is to reach page one for a phrase, on a 0 to 100 scale, based on the strength of the pages currently ranking. Under 30 is realistic for newer sites, 30 to 60 needs solid authority, and above 60 usually requires strong backlinks." },
      { q: "How accurate is free search volume data?", a: "Volume figures are directional estimates, not exact counts. Even paid tools report ranges, because Google itself buckets volume data. Use them to compare relative demand between keywords rather than to forecast exact traffic." },
      { q: "What are long-tail keywords?", a: "Long-tail keywords are longer, more specific phrases of three or more words. They have lower search volume but far clearer intent and much lower competition, which is why they are the fastest path to first rankings." },
      { q: "Should I still target informational keywords in 2026?", a: "Yes, but expect fewer clicks and more AI citations. Informational content builds topical authority and brand recognition inside AI answers, which feeds later commercial queries." },
      { q: "How many keywords should one page target?", a: "One primary keyword plus five to fifteen close variants. Search engines already understand synonyms, so a single strong page beats several thin ones." },
      { q: "What is search intent?", a: "Search intent is the goal behind a query: learning something, comparing options, buying, or finding a specific site. The page format that ranks is dictated by intent, so classify before you write." },
      { q: "Is this keyword tool really free?", a: "Yes. There is no signup, no seed limit and no credit card. Export as many keyword sets as you need." },
    ],
  },

  "keyword-density": {
    competitor: "Surfer SEO",
    related: ["content-checker", "readability", "word-counter", "seo-audit"],
    quickFacts: [
      "✅ Analysis: 1, 2 and 3-word n-grams",
      "⚡ Speed: Instant, live as you type",
      "💰 Cost: 100% free — unlimited text",
      "📊 Output: Frequency + density % per term",
      "🧹 Extra: Stop-word filtering built in",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "Keyword density is the percentage of total words on a page that a given keyword makes up. This free checker analyses any URL or pasted text and returns single-word, two-word and three-word phrase frequency with a density percentage for each, stop words filtered out. Use it to catch over-optimization, which reads as spam to both readers and search engines, and to confirm your target topic actually appears often enough to be understood. A natural range is roughly 0.5% to 2.5% for a primary term.",
    whyMatters:
      "Keyword density is no longer a ranking formula, but extreme values still signal problems. Very high density looks like keyword stuffing and can trigger spam classifiers, while near-zero density usually means the page never states its subject clearly enough for retrieval systems to match it.",
    features: [
      "One, two and three-word phrase (n-gram) analysis",
      "Density percentage and raw count for every term",
      "Stop-word filtering so results show meaningful phrases",
      "Over-optimization warnings above the safe threshold",
      "Top-N frequency table sortable by count or density",
      "Works on a live URL or pasted draft text",
      "Total word, sentence and unique-term summary",
      "Highlights terms present in title but missing from body",
    ],
    commonIssues: [
      { title: "Stuffing the exact-match phrase", body: "Repeating a phrase above roughly 3% reads unnaturally and risks spam classification. Use synonyms and related entities instead." },
      { title: "Primary term missing from the first paragraph", body: "If the topic is not named early, retrieval systems have to guess what the page is about." },
      { title: "Ignoring two and three-word phrases", body: "Single-word density is noisy. The phrase-level table is where real over-optimization shows up." },
      { title: "Optimizing density instead of coverage", body: "Covering related subtopics beats hitting a density number. Density is a diagnostic, not a target." },
    ],
    faqs: [
      { q: "What is a good keyword density?", a: "Roughly 0.5% to 2.5% for the primary term. There is no official target, but pages above 3% frequently read as spam and pages near 0% often fail to establish topical relevance." },
      { q: "Does keyword density still matter for SEO?", a: "Not as a ranking factor, but as a diagnostic it still matters. Search engines use semantic matching now, yet extreme density in either direction reliably correlates with weak pages." },
      { q: "What is keyword stuffing?", a: "Keyword stuffing is repeating a phrase unnaturally to manipulate rankings. Google names it as a spam policy violation, and it is one of the easier patterns for automated systems to detect." },
      { q: "Should I include keywords in headings?", a: "Include the topic naturally in the H1 and in relevant H2s. Forcing the exact phrase into every heading is the most common form of visible over-optimization." },
      { q: "Do AI search engines care about density?", a: "They care about clarity, not repetition. Explicit entity naming helps extraction, while repetitive phrasing adds nothing and reduces readability." },
      { q: "Can I check a competitor page?", a: "Yes. Enter any public URL to see which phrases dominate their content, which reveals the topics they treat as core." },
      { q: "Are stop words counted?", a: "They are filtered by default so the table shows meaningful terms, though total word count still includes them." },
    ],
  },

  "readability": {
    competitor: "Hemingway Editor",
    related: ["content-checker", "keyword-density", "word-counter", "seo-audit"],
    quickFacts: [
      "✅ Scores: Flesch Reading Ease + grade level",
      "⚡ Speed: Live recalculation as you type",
      "💰 Cost: 100% free — unlimited text",
      "📊 Output: Grade band + sentence-length metrics",
      "🔒 Privacy: Nothing stored or transmitted",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "Readability measures how much effort a reader needs to understand your text. This free checker computes the Flesch Reading Ease score, maps it to a US school grade band, and reports words per sentence and total sentence count so you can see exactly what is making the writing heavy. For most web content, aim for a Flesch score of 60 or higher, which is roughly an eighth to ninth-grade reading level — the range where the widest audience reads comfortably without the text feeling simplistic.",
    whyMatters:
      "Readability is not a direct ranking factor, but it drives the behaviour that is measured. Clear writing keeps readers on the page, improves conversion, and produces short, self-contained sentences that AI engines can extract cleanly into answers.",
    features: [
      "Flesch Reading Ease score with plain-language interpretation",
      "US grade-level band from very easy to college graduate",
      "Average words per sentence with long-sentence flags",
      "Total word and sentence counts",
      "Live recalculation while you edit",
      "Works with any pasted draft, no formatting required",
      "Guidance thresholds tuned for web and blog content",
      "Complements the AI Content Readiness Checker for GEO scoring",
    ],
    commonIssues: [
      { title: "Sentences over 25 words", body: "Long sentences are the single biggest readability killer. Split any sentence carrying two independent ideas." },
      { title: "Unnecessary jargon", body: "Replace domain jargon with plain equivalents, or define the term the first time it appears." },
      { title: "Writing below the audience", body: "Extremely low grade levels can feel patronising for technical readers. Match the band to who is actually reading." },
      { title: "Passive voice everywhere", body: "Passive constructions add words and hide the actor, which lowers both readability and extractability." },
    ],
    faqs: [
      { q: "What is the Flesch Reading Ease score?", a: "It is a 0 to 100 score based on average sentence length and syllables per word. Higher is easier: 90 to 100 is very easy, 60 to 70 is standard, and below 30 is very difficult academic prose." },
      { q: "What readability score is best for SEO?", a: "A Flesch score of 60 to 70, roughly eighth to ninth grade, suits most web audiences. Highly technical documentation can sit lower without harm if the audience is specialist." },
      { q: "Is readability a Google ranking factor?", a: "Not directly. It influences engagement metrics, dwell time and conversions, which is why clear pages tend to outperform dense ones over time." },
      { q: "Does readability affect AI citations?", a: "Yes, indirectly. Short, self-contained sentences are far easier for a model to lift into an answer without losing meaning." },
      { q: "How do I improve my readability score fast?", a: "Split long sentences, cut filler phrases, swap multi-syllable words for shorter ones, and keep paragraphs to three sentences or fewer." },
      { q: "Should every page have the same readability level?", a: "No. A beginner guide should read easier than an API reference. Set the target by audience, then stay consistent within the page." },
      { q: "Is the tool free and private?", a: "Yes. It runs on your text in-session, stores nothing, and has no usage limits." },
    ],
  },

  "word-counter": {
    competitor: "WordCounter.net",
    related: ["readability", "keyword-density", "content-checker", "serp-preview"],
    quickFacts: [
      "✅ Counts: words, characters, sentences, paragraphs",
      "⚡ Speed: Live as you type, zero round-trip",
      "💰 Cost: 100% free — no limits",
      "📊 Extra: Reading and speaking time estimates",
      "🔒 Privacy: Text never leaves the browser",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "A word counter reports how long a piece of text is across several units at once: words, characters with and without spaces, sentences, paragraphs, and estimated reading time. This free counter updates live as you type, with no signup and no character cap. Writers use it to hit editorial length targets, marketers use it to stay inside meta title and description limits, and content teams use it to benchmark article depth against the pages currently ranking for their target keyword.",
    whyMatters:
      "Length is not a ranking factor, but coverage is. Comparing your draft against the average length of ranking pages is a quick proxy for whether you have covered the topic completely enough to compete.",
    features: [
      "Word, character, sentence and paragraph counts",
      "Character count with and without spaces",
      "Estimated reading time at 200 words per minute",
      "Estimated speaking time for video and podcast scripts",
      "Live updates with zero server round-trip",
      "Handles pasted HTML-free text of any length",
      "Useful for meta title and description limit checks",
      "Pairs with the Readability Checker for a full content pass",
    ],
    commonIssues: [
      { title: "Padding to hit a word count", body: "Filler dilutes the answer and lowers extractability. Cover the topic fully, then stop." },
      { title: "Ignoring meta length limits", body: "Titles beyond roughly 60 characters and descriptions beyond 160 get truncated in results." },
      { title: "Counting HTML markup", body: "Paste rendered text, not source. Markup inflates counts and distorts readability metrics." },
      { title: "Using one length target for every page", body: "A comparison page and a definition page have different natural lengths. Benchmark per query." },
    ],
    faqs: [
      { q: "How long should a blog post be?", a: "Long enough to answer the query completely. In practice, ranking pages for competitive informational queries often run 1,200 to 2,000 words, while simple definitional queries are well served by 400 to 700." },
      { q: "Does word count affect SEO rankings?", a: "Not directly. Longer pages correlate with better rankings because they tend to cover more subtopics, not because length itself is rewarded." },
      { q: "How is reading time calculated?", a: "Reading time uses 200 words per minute, the common average for adult silent reading of web content. Speaking time uses roughly 130 words per minute." },
      { q: "What is the character limit for meta titles?", a: "Around 60 characters, or about 580 pixels. Google truncates by pixel width, so wide characters consume the budget faster." },
      { q: "Does the counter include spaces?", a: "It reports both totals, with and without spaces, since different platforms count differently." },
      { q: "Is there a length limit on input?", a: "No practical limit. The counter runs locally, so even book-length text stays instant." },
      { q: "Is my text sent to a server?", a: "No. All counting happens in your browser and nothing is transmitted or stored." },
    ],
  },

  "link-analyzer": {
    competitor: "Screaming Frog",
    related: ["broken-links", "seo-audit", "canonical-checker", "redirect-checker"],
    quickFacts: [
      "✅ Coverage: every anchor on the page",
      "⚡ Speed: Full link map in under 5 seconds",
      "💰 Cost: 100% free — unlimited URLs",
      "📊 Output: internal vs external, follow vs nofollow",
      "🔗 Extra: anchor-text distribution per domain",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "A link analyzer extracts every link on a web page and classifies it, so you can see how authority flows in and out of that URL. This free tool fetches any public page and returns the full list split into internal versus external links, flags nofollow, sponsored and UGC attributes, and shows the anchor text used for each destination. Use it to confirm important pages receive internal links, to spot pages leaking authority to too many external domains, and to audit anchor-text patterns before they look manipulative.",
    whyMatters:
      "Internal links are the strongest signal you fully control. They tell crawlers which pages matter, distribute authority from strong pages to weak ones, and create the topical paths that both search engines and AI retrieval systems follow to understand a site.",
    features: [
      "Complete link inventory for any public URL",
      "Internal versus external classification against the final domain",
      "rel attribute audit: nofollow, sponsored and ugc",
      "Anchor-text listing for every destination",
      "Counts by destination domain to spot outbound concentration",
      "Empty and generic anchor detection such as click here",
      "Works on redirected URLs using the final resolved address",
      "Copy or export the full link table for reporting",
    ],
    commonIssues: [
      { title: "Orphan pages", body: "A page with no internal links pointing at it is barely discoverable. Every important page should be linked from at least three others." },
      { title: "Generic anchor text", body: "Anchors like read more give no context. Describe the destination in three to five words." },
      { title: "Too many outbound links", body: "Hundreds of external links on one page dilutes crawl focus. Keep outbound links purposeful and relevant." },
      { title: "Wrong nofollow usage", body: "Paid or affiliate links need rel sponsored, user-submitted links need rel ugc. Using nofollow on internal navigation wastes internal authority." },
    ],
    faqs: [
      { q: "What is the difference between internal and external links?", a: "Internal links point to another page on the same domain and distribute your own authority. External links point to other domains, add context and credibility, and pass a small amount of authority away." },
      { q: "How many internal links should a page have?", a: "There is no fixed number, but three to ten contextual internal links inside the body content is a healthy range for a typical article, plus navigation." },
      { q: "Do nofollow links have any value?", a: "Yes. Google treats rel nofollow as a hint rather than a strict rule, and nofollowed links still drive referral traffic and brand exposure." },
      { q: "What is anchor text optimization?", a: "It means writing descriptive anchors that tell users and crawlers what the destination covers, without repeating the identical exact-match phrase across every link." },
      { q: "Can I analyze a competitor's page?", a: "Yes. Any publicly accessible URL works, which makes it easy to map how competitors structure their internal linking." },
      { q: "Does the tool follow redirects?", a: "Yes. Links are classified against the final resolved URL after redirects, so internal versus external stays accurate." },
      { q: "How often should I audit internal links?", a: "Monthly for active sites, and always after a site migration, redesign or URL structure change." },
    ],
  },

  "broken-links": {
    related: ["link-analyzer", "redirect-checker", "http-headers", "seo-audit"],
    quickFacts: [
      "✅ Method: real HTTP requests, not regex guessing",
      "⚡ Speed: Parallel checks across all links",
      "💰 Cost: 100% free — unlimited scans",
      "📊 Output: status code per link",
      "🌐 Coverage: internal and external links",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "A broken link is a link that returns an error instead of a page, most commonly a 404 not found or a 5xx server error. This free checker fetches every link on a page and reports the real HTTP status code returned by each destination, so you see genuine failures rather than pattern-matched guesses. Broken links waste crawl budget, break the flow of authority through your site, and create dead ends for readers — all of which are easy to fix once you know exactly which URLs are failing.",
    whyMatters:
      "Every broken internal link severs a path a crawler was following, and every broken external link signals a page nobody has maintained. Both are cheap to fix and disproportionately visible to quality-assessment systems.",
    features: [
      "Live HTTP status check for every link on the page",
      "Detects 404 not found, 410 gone, 5xx server errors and timeouts",
      "Covers both internal and external destinations",
      "Parallel requests so large pages finish quickly",
      "Distinguishes redirects from true failures",
      "Highlights the anchor text of each broken link for fast fixing",
      "Works on any public URL including competitor pages",
      "Exportable results for handing to a developer",
    ],
    commonIssues: [
      { title: "Deleted pages with no redirect", body: "Removing a URL without a 301 turns every existing link into a dead end. Redirect to the closest relevant page." },
      { title: "External sites that moved", body: "Outbound links rot over time. Re-check external references quarterly and replace or remove failures." },
      { title: "Typos in hand-written hrefs", body: "Manually written links frequently carry a stray character or missing slash. A status check catches these instantly." },
      { title: "Links to staging or localhost", body: "Development URLs pushed live return errors for every visitor. Scan after each deploy." },
    ],
    faqs: [
      { q: "Do broken links hurt SEO?", a: "Broken internal links hurt by wasting crawl budget and cutting authority paths between pages. A handful of broken outbound links will not trigger a penalty, but at scale they signal a neglected site." },
      { q: "What is the difference between 404 and soft 404?", a: "A 404 returns a proper not-found status code. A soft 404 shows an error page to the user while returning 200 OK, which confuses crawlers because the page appears valid." },
      { q: "Should I redirect every 404?", a: "Redirect a 404 when a genuinely relevant replacement exists. Otherwise let it return 404, since mass-redirecting unrelated URLs to the homepage is treated as a soft 404." },
      { q: "How often should I check for broken links?", a: "Monthly for most sites, weekly for large or frequently updated ones, and immediately after any migration or bulk content change." },
      { q: "Why does a link work in my browser but fail here?", a: "Some servers block automated requests or require cookies and JavaScript. Those show as errors here even though a browser loads them, so verify flagged externals manually." },
      { q: "Does the checker crawl the whole site?", a: "It checks every link found on the URL you submit. Run it on your key hub pages and sitemap-linked templates for broad coverage." },
      { q: "Is it really free?", a: "Yes, with no signup, no scan cap and no credit card." },
    ],
  },

  "serp-preview": {
    competitor: "Mangools SERP Simulator",
    related: ["meta-tag-checker", "meta-generator", "word-counter", "seo-audit"],
    quickFacts: [
      "✅ Views: desktop and mobile snippet",
      "⚡ Speed: Live preview while you type",
      "💰 Cost: 100% free — unlimited previews",
      "📏 Limits: ~60 char title, ~160 char description",
      "🎯 Extra: truncation warnings before you publish",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "A SERP preview tool shows exactly how your page will appear in Google search results before you publish it. Enter your title tag, meta description and URL, and the simulator renders the snippet for both desktop and mobile with live truncation warnings. Because Google cuts titles by pixel width rather than character count, previewing the rendered snippet is the only reliable way to confirm your message survives intact — and the snippet is what determines whether a searcher clicks your result or a competitor's.",
    whyMatters:
      "Your snippet is the only advertisement you get in organic search. A truncated title that loses the value proposition mid-word, or a description that stops before the call to action, quietly costs clicks on every impression the page ever receives.",
    features: [
      "Side-by-side desktop and mobile snippet rendering",
      "Live character counters for title and description",
      "Truncation warnings before the cut-off point",
      "URL slug rendering as Google displays it",
      "Instant updates while you edit each field",
      "Health indicator for title and description length",
      "Works for new pages or existing URLs you want to rewrite",
      "Pairs with the Meta Tag Generator to output final HTML",
    ],
    commonIssues: [
      { title: "Titles that truncate mid-phrase", body: "Front-load the primary keyword and the benefit in the first 50 characters so nothing critical is cut." },
      { title: "Descriptions with no call to action", body: "End with a reason to click, such as a free check, a checklist or an instant result." },
      { title: "Duplicate titles across pages", body: "Identical titles make results indistinguishable and cause internal competition for the same query." },
      { title: "Ignoring the mobile view", body: "Mobile truncates earlier than desktop, and mobile is the majority of searches for most sites." },
    ],
    faqs: [
      { q: "How long should a title tag be?", a: "Around 50 to 60 characters. Google truncates around 580 pixels on desktop, so wide characters consume the budget faster than narrow ones." },
      { q: "How long should a meta description be?", a: "Roughly 150 to 160 characters. Longer descriptions are truncated with an ellipsis, so put the most persuasive line first." },
      { q: "Does Google always use my meta description?", a: "No. Google rewrites descriptions for a large share of queries when it finds a passage on the page that matches the query better. A strong description still wins often enough to be worth writing." },
      { q: "Is the meta description a ranking factor?", a: "Not directly. It influences click-through rate, and the traffic that follows is what compounds." },
      { q: "Why does my snippet look different in Google?", a: "Google may substitute a heading for the title or generate a description from page content. Rendering here shows your intended snippet, which is what Google starts from." },
      { q: "Should the brand name be in every title?", a: "Append it after a separator on most pages. On very long titles, drop it so the descriptive part survives truncation." },
      { q: "Does the preview handle emoji and special characters?", a: "Yes, though Google strips many emoji from live results. Preview them, but do not depend on them." },
    ],
  },

  "backlink-checker": {
    related: ["link-analyzer", "seo-audit", "rank-tracker", "ai-citation-audit"],
    quickFacts: [
      "✅ Report: referring domains and anchor mix",
      "⚡ Speed: Results in seconds",
      "💰 Cost: 100% free — no signup",
      "📊 Output: link profile snapshot",
      "🎯 Use: your site or any competitor",
      "🔄 Last Updated: June 2026",
    ],
    directAnswer:
      "A backlink is a link from another website to yours, and backlinks remain one of the strongest off-page ranking signals. This free checker gives a snapshot of a domain's link profile: how many referring domains point at it, what anchor text those links use, and how the profile is distributed between follow and nofollow links. Run it on your own domain to find gaps, then run it on the competitors ranking above you to see which sites link to them and could plausibly link to you.",
    whyMatters:
      "Referring domain count matters far more than raw link count, because one link each from fifty sites signals far broader endorsement than fifty links from one site. Link quality also feeds AI systems indirectly, since frequently-referenced domains are the ones models learn to treat as authoritative.",
    features: [
      "Referring domain snapshot for any domain",
      "Anchor text distribution across the profile",
      "Follow versus nofollow split",
      "Competitor comparison to find reachable link sources",
      "Highlights over-optimized exact-match anchor patterns",
      "Identifies single-domain link concentration risk",
      "No signup, no query cap",
      "Pairs with the Link Analyzer for on-page link auditing",
    ],
    commonIssues: [
      { title: "Buying links", body: "Paid link schemes violate Google spam policies and are a common cause of manual actions. Earn links with content people cite." },
      { title: "Exact-match anchor overuse", body: "A profile where most anchors repeat the same commercial phrase looks manufactured. Natural profiles are mostly brand and URL anchors." },
      { title: "Links from one domain only", body: "Fifty links from a single site count roughly once. Prioritise breadth of referring domains." },
      { title: "Ignoring lost links", body: "Links disappear when pages are deleted or redesigned. Re-check quarterly and reclaim high-value losses." },
    ],
    faqs: [
      { q: "What is a backlink?", a: "A backlink is a hyperlink on another website that points to a page on yours. Search engines treat it as a third-party endorsement, which is why it remains a core off-page ranking signal." },
      { q: "How many backlinks do I need to rank?", a: "There is no fixed number. What matters is having a comparable or better referring-domain profile than the pages currently ranking for your target keyword, so benchmark against them rather than chasing a total." },
      { q: "Are nofollow backlinks worthless?", a: "No. Google treats nofollow as a hint, and nofollowed links from major publications still drive referral traffic, brand searches and discovery." },
      { q: "How do I get high-quality backlinks?", a: "Publish original data, tools or research that other people need to cite, then make it easy to find. Digital PR, expert contributions and genuinely useful free tools are the durable methods." },
      { q: "Can backlinks hurt my site?", a: "Google largely ignores obvious spam links, but a pattern of paid or manipulative links can trigger a manual action. Avoid link schemes rather than obsessing over disavowal." },
      { q: "How long do backlinks take to affect rankings?", a: "Typically several weeks to a few months, since the linking page must be recrawled and the signal must accumulate alongside everything else." },
      { q: "Should I check competitor backlinks?", a: "Yes. Competitor profiles are the fastest source of realistic link targets, because a site that linked to a competitor is plausibly willing to link to you." },
    ],
  },
};
