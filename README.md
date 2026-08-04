# SEO AI Insights

# SEOAcademys.com — Lovable AI Complete Build Prompt
## (Copy this FULL prompt into Lovable.ai)

---

## PROMPT TO PASTE IN LOVABLE:

---

Build a complete multi-page web application called **"SEOAcademys — The Free GEO & AI Search Intelligence Hub"** for the domain seoacademys.com.

This platform serves developers, SEO professionals, and business owners who want to understand why their website is NOT appearing in Google AI Overviews, ChatGPT Search, or Perplexity citations — and how to fix it. It is an **educational + free tools platform**, not a paid SaaS.

---

### DESIGN SYSTEM (Follow Exactly)

- **Theme:** Dark by default. Background: `#0a0a0a` (near black). Card surfaces: `#111111`. Borders: `#1f1f1f`.
- **Accent color:** Emerald green `#10b981` for CTAs, active states, and highlights.
- **Secondary accent:** Amber `#f59e0b` for warnings and scores.
- **Red alert:** `#ef4444` for poor scores and gaps.
- **Typography:** Use Google Fonts — `"Space Grotesk"` for headings (bold, tight letter-spacing), `"Inter"` for body text, `"JetBrains Mono"` for all code blocks and technical output.
- **Style Reference:** Vercel dashboard + Linear app aesthetic. Ultra-clean, data-dense, developer-centric. Zero clutter, no decorative illustrations.
- **Icons:** Use Lucide React icons throughout.
- **Layout:** Fixed max-width `1280px` container, centered. Sidebar navigation on desktop, bottom tabs on mobile.

---

### SITE STRUCTURE — 6 Pages/Sections

#### Page 1: HOME (Landing Page)
- **Hero Section:**
  - Headline: `"Is Your Website Invisible to AI Search?"` in large bold Space Grotesk
  - Subheadline: `"Google AI Overviews, ChatGPT Search & Perplexity now answer 60% of queries without a click. Check if your brand is being cited — or ignored."` 
  - Two CTA buttons: `"Run Free AI Audit →"` (emerald, filled) and `"Learn GEO Free"` (ghost/outline)
  - Below hero: animated counter stats row showing `"1.1B+ Websites Affected"`, `"46% CTR Drop with AI Overviews"`, `"$17B GEO Market by 2034"` — each in a stat card with emerald accent numbers

- **Problem Section:** 3-column card grid explaining the 3 core problems:
  1. "Your brand is not an Entity in Google's Knowledge Graph"
  2. "Your content lacks Factual Density for LLM extraction"
  3. "Missing Schema 2.0 & llms.txt blocks AI crawlers"

- **Tools Preview Strip:** Horizontal scrollable row of 4 tool cards linking to each tool page — show tool name, 1-line description, and a "Try Free →" link.

- **Trust Bar:** A row of logos/text saying "Used by SEOs from:" with placeholder text: "Startups · Agencies · E-commerce · SaaS Teams · Bloggers"

---

#### Page 2: TOOL 1 — AI Citation Readiness Audit

**URL route:** `/tools/ai-citation-audit`

- **Header:** "AI Citation Readiness Audit" with badge: `FREE TOOL`

- **Input Form (top of page):**
  - Field 1: "Your Website URL" — text input with placeholder `https://yourwebsite.com`
  - Field 2: "Target Keyword / Search Intent" — text input with placeholder `e.g. best project management software 2026`
  - Large CTA button: `"Analyze AI Footprint"` in emerald

- **Loading State (shown after submit — animated sequence):**
  Show a terminal-style animated log block with these steps appearing one by one with 800ms delay each:
  ```
  ✓ Resolving domain entity signals...
  ✓ Checking Knowledge Graph entity status...
  ✓ Scanning for Schema markup presence...
  ✓ Evaluating factual content density...
  ✓ Comparing against top cited sources...
  ✓ Generating Citation Gap Report...
  ```

- **Results Dashboard (shown after loading — use mock/simulated data based on URL input):**

  **Card 1 — Entity Trust Score:**
  - Large circular radial progress chart (use Recharts RadialBarChart)
  - Score: display a number 0–100 calculated as: if URL contains "https://" and has a keyword = score 45, else 30
  - Color: red if <40, amber if 40-70, emerald if >70
  - Label below: "Your brand's entity recognition strength inside LLM knowledge graphs"

  **Card 2 — Brand Sentiment Index:**
  - Horizontal bar from "Negative" to "Highly Positive" with a dot marker
  - 5 segments: Negative / Uncertain / Neutral / Positive / Highly Positive
  - Show "Neutral" as default position with amber color
  - Label: "AI training data alignment with your brand"

  **Card 3 — Citation Gap Inspector:**
  - 2-column comparison table:
    - Left column header: "✓ Top Cited Sites Have:" — list 5 items in green:
      - JSON-LD Schema 2.0 with sameAs tags
      - llms.txt file present
      - FAQ structured content blocks
      - Wikidata / Wikipedia entity presence
      - High factual density (stats, numbers, dates)
    - Right column header: "✗ Your Site Is Missing:" — same 5 items in red
  - Below table: amber alert box: "Fix these 5 gaps to increase your AI citation probability by up to 3x"

  **Card 4 — Quick Fix Recommendations:**
  - Numbered list (1–5) of action items with icons:
    1. 🔧 Add JSON-LD Organization Schema → `[Use Our Schema Generator]` link
    2. 📄 Create llms.txt file → `[Use Our llms.txt Generator]` link  
    3. 📊 Add FAQ sections with direct answers
    4. 🌐 Create/verify Wikidata entity page
    5. ✍️ Increase factual content density → `[Check with Content Analyzer]` link

---

#### Page 3: TOOL 2 — Schema 2.0 & llms.txt Generator

**URL route:** `/tools/schema-generator`

- **Header:** "Schema 2.0 & llms.txt Generator" with badge: `FREE · NO SIGNUP`
- **Layout:** Left panel (form, 50%) + Right panel (live code output, 50%) — split screen

- **Left Panel — 3-Step Wizard Form:**

  **Step 1: Organization Details**
  - Business Legal Name (text input)
  - Website URL (text input)
  - Business Type (dropdown: E-commerce / SaaS / Blog / Agency / Healthcare / Finance / Other)
  - Founded Year (number input)

  **Step 2: Entity Signals**
  - Wikipedia/Wikidata URL (text input, optional, placeholder: `https://wikidata.org/wiki/Q...`)
  - LinkedIn Company URL (text input, optional)
  - Twitter/X Handle (text input, optional)
  - Core Products/Services (textarea, comma-separated)

  **Step 3: Knowledge Areas**
  - Primary Topic (text input, e.g. "cloud hosting")
  - Secondary Topics (text input, comma-separated, e.g. "server management, DevOps, VPS")
  - Target Countries (multi-select checkboxes: India, USA, UK, Canada, Australia, Global)

  Bottom: `"Generate Schema & llms.txt"` button in emerald

- **Right Panel — Live Code Output:**
  - Dark terminal block with JetBrains Mono font
  - Two tabs: `JSON-LD Schema` | `llms.txt`
  
  **JSON-LD tab** — generate this structure dynamically from form inputs:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "[WEBSITE_URL]/#organization",
    "name": "[BUSINESS_NAME]",
    "url": "[WEBSITE_URL]",
    "foundingDate": "[YEAR]",
    "sameAs": [
      "[LINKEDIN_URL]",
      "[TWITTER_URL]",
      "[WIKIDATA_URL]"
    ],
    "knowsAbout": ["[TOPIC_1]", "[TOPIC_2]", "[TOPIC_3]"],
    "areaServed": ["[COUNTRY_1]", "[COUNTRY_2]"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "[PRODUCTS_SERVICES]"
    }
  }
  ```

  **llms.txt tab** — generate this structure:
  ```
  # [BUSINESS_NAME] - llms.txt
  # AI Crawler Instructions & Entity Declaration
  
  > [BUSINESS_NAME] is a [BUSINESS_TYPE] focused on [PRIMARY_TOPIC].
  
  ## About
  [BUSINESS_NAME] provides [PRODUCTS_SERVICES]. 
  Founded: [YEAR] | URL: [WEBSITE_URL]
  
  ## Key Topics
  - [TOPIC_1]
  - [TOPIC_2]
  - [TOPIC_3]
  
  ## Verified Profiles
  - [LINKEDIN_URL]
  - [TWITTER_URL]
  - [WIKIDATA_URL]
  
  ## Permissions
  User-agent: GPTBot
  Allow: /
  
  User-agent: GoogleExtended  
  Allow: /
  
  User-agent: PerplexityBot
  Allow: /
  ```

  - Below code: 3 action buttons:
    - `📋 Copy JSON-LD` (copies JSON to clipboard)
    - `📋 Copy llms.txt` (copies llms.txt to clipboard)
    - `🔗 Test in Google Rich Results` (opens `https://search.google.com/test/rich-results` in new tab)

---

#### Page 4: TOOL 3 — AI Content Readiness Checker

**URL route:** `/tools/content-checker`

- **Header:** "LLM Content Readiness Checker" with badge: `FREE`
- **Subheader:** "Paste your blog post or article below. See exactly why AI engines skip your content — and how to fix it."

- **Layout:** Full-width textarea on top, analysis results below

- **Input Area:**
  - Large textarea (min 8 rows) with placeholder: `Paste your article, blog post, or landing page copy here (minimum 200 words)...`
  - Button: `"Analyze for AI Readiness"` in emerald
  - Character/word count display: `"0 words · 0 characters"`

- **Results Section (after analysis — calculate from actual text input):**

  **Score Bar Row (4 metrics):**
  
  1. **Factual Density Score** — Count numbers, percentages, years, named entities in text. Score = (count of facts / total sentences) × 100, capped at 100. Color red/amber/green.
  
  2. **Direct Answer Score** — Check if text starts paragraphs with a direct statement (not a question). Score based on % of paragraphs starting with declarative sentence.
  
  3. **Structure Score** — Check if text has any of: numbers (lists), colons (:), dashes (-) used as structure. Higher = better.
  
  4. **LLM Citation Probability** — Average of above 3 scores. Show as percentage.

  **Highlighted Content View:**
  - Re-display the pasted text with sentence-level highlighting:
    - 🟢 Green highlight: sentences containing numbers, statistics, specific facts, named entities, dates
    - 🔴 Red highlight: sentences with filler words (basically, very, really, quite, somewhat, I think, in conclusion, it is important to note)
    - 🟡 Yellow highlight: sentences that are questions or start with "However", "But", "Also"

  **Improvement Suggestions Panel:**
  Show 3–5 specific suggestions based on text analysis:
  - If low factual density: "⚠️ Add specific statistics — AI engines like Perplexity cite content 3x more when it contains verifiable numbers."
  - If long paragraphs (>4 sentences): "⚠️ Break long paragraphs into 2-sentence chunks — LLMs extract passage-level answers."
  - If no list structure: "⚠️ Convert this section into a numbered list or comparison table for higher citation probability."
  - If too many filler words: "⚠️ Remove [X] filler phrases detected. AI tokenizers deprioritize non-factual text."
  - If good score (>70): "✅ This content has good AI citation potential. Focus on adding internal links to Schema-marked pages."

---

#### Page 5: TOOL 4 — GEO Market Intelligence Dashboard

**URL route:** `/tools/geo-tracker`

- **Header:** "GEO Market Intelligence" with badge: `LIVE DATA · Updated Weekly`
- **Subheader:** "Track which websites Google AI Overviews, ChatGPT Search, and Perplexity are citing most across major industries."

- **Filter Bar:** 5 tab buttons: `All` | `Tech` | `Finance` | `Health` | `E-Commerce` | `SaaS`

- **Main Data Table:**
  Columns: `#` | `Search Intent` | `Top Cited Domain` | `AI Engine` | `Citation Type` | `Key Strategy`

  Pre-populate with 20 rows of realistic mock data:
  ```
  1 | "best cloud hosting 2026" | aws.amazon.com | Google AI Overviews | Direct Answer | FAQ Schema + Stats
  2 | "how to invest in index funds" | investopedia.com | ChatGPT Search | Expert Guide | Entity Authority
  3 | "symptoms of vitamin D deficiency" | healthline.com | Perplexity | Medical Info | Citation + Sources
  4 | "best CRM software" | g2.com | Google AI Overviews | Comparison | Structured List
  5 | "Python vs JavaScript 2026" | stackoverflow.com | ChatGPT Search | Technical | Code + Data
  6 | "credit card rewards comparison" | nerdwallet.com | Perplexity | Finance | Data Table
  7 | "remote work productivity tips" | hbr.org | Google AI Overviews | Authoritative | Research Citation
  8 | "WordPress vs Webflow" | kinsta.com | Perplexity | Comparison | Schema Markup
  9 | "diabetes management diet" | webmd.com | ChatGPT Search | Medical | Medical Schema
  10 | "AI tools for business 2026" | forbes.com | Google AI Overviews | News/List | Author Entity
  11 | "best laptops under 50000 INR" | gadgets360.com | Google AI Overviews | Product | Product Schema
  12 | "GST registration India" | cleartax.in | Perplexity | Legal/Finance | FAQ Schema
  13 | "how to start dropshipping" | shopify.com/blog | ChatGPT Search | Tutorial | HowTo Schema
  14 | "free email marketing tools" | mailchimp.com | Google AI Overviews | SaaS | Feature List
  15 | "best mutual funds India" | valueresearchonline.com | Perplexity | Finance | Data Table
  16 | "machine learning roadmap" | towardsdatascience.com | ChatGPT Search | Education | Structured Guide
  17 | "ecommerce SEO guide" | semrush.com/blog | Google AI Overviews | SEO | Long-form Authority
  18 | "React vs Next.js" | vercel.com/blog | ChatGPT Search | Technical | Developer Entity
  19 | "weight loss meal plan" | healthline.com | Perplexity | Health | Structured Plan
  20 | "startup funding options India" | inc42.com | Google AI Overviews | Business | News Authority
  ```

  - Each AI Engine cell: show colored badge — Google AI (blue), ChatGPT (green), Perplexity (purple)
  - Bottom of table: `"📥 Download CSV"` button that downloads the table data as CSV file

- **Insight Cards Row (below table):**
  3 cards:
  1. "Most Cited Domain Type: **Comparison/Review Sites** (34% of AI citations)"
  2. "Fastest Growing Citation Strategy: **FAQ Schema + Direct Answers** (+127% YoY)"
  3. "Lowest Competition Opportunity: **Regional/Local AI Optimization** (India, SE Asia)"

---

#### Page 6: LEARN — GEO Free Course Index

**URL route:** `/learn`

- **Header:** "Free GEO & AISO Learning Hub"
- **Subheader:** "Everything you need to understand AI Search Optimization — no paid course required."

- **Module Grid (3 columns, responsive):**
  Show 9 module cards:
  1. "What is GEO? Complete Beginner Guide" — `[Read →]`
  2. "How Google AI Overviews Choose Citations" — `[Read →]`
  3. "Schema 2.0: Beyond Basic Structured Data" — `[Read →]`
  4. "llms.txt: The New robots.txt for AI Crawlers" — `[Read →]`
  5. "Entity SEO: Get Your Brand into Google's Knowledge Graph" — `[Read →]`
  6. "Content Optimization for LLM Extraction" — `[Read →]`
  7. "GEO for E-Commerce: AI Product Visibility" — `[Read →]`
  8. "GEO for SaaS: Getting Cited in ChatGPT" — `[Read →]`
  9. "Measuring AI Visibility: Free Methods & Tools" — `[Read →]`

  Each card: dark surface, emerald "Read →" link, module number badge, estimated read time "8 min read"

- **Newsletter Signup (bottom of page):**
  - Headline: `"Get Weekly AI Search Updates"`
  - Subheader: `"What changed in Google AI Overviews this week. Free. No spam."`
  - Email input + `"Subscribe Free"` button

---

### GLOBAL NAVIGATION

- **Top navbar:** Logo left (`SEOAcademys` in emerald), nav links center: `Tools ▾` (dropdown) | `Learn` | `GEO Tracker`, right side: `⭐ Star on GitHub` ghost button
- **Footer:** 3 columns — Tools links | Learn links | About ("Built to make GEO open and accessible. Not affiliated with Google, OpenAI, or Perplexity.")
- **Mobile:** Sticky bottom navigation with icons for: Home | Audit | Schema | Checker | Tracker

---

### TECHNICAL REQUIREMENTS

- Built in React with Tailwind CSS
- All tool logic runs client-side (no backend needed) — tools analyze text/URL inputs using JavaScript
- Recharts for all data visualizations (RadialBarChart for Entity Score, BarChart for sentiment)
- Lucide React for all icons
- All state managed with React useState/useEffect
- CSV download for GEO Tracker uses native JS Blob download
- Mobile fully responsive — all tools usable on phone
- Fast loading — no heavy animations on page load, only on tool interactions
- Page transitions: simple fade
- All 6 pages/routes fully functional and linked

---

### MONETIZATION PLACEHOLDERS (add but keep subtle)

- Top of Tool pages: 1 subtle banner: `"Need full real-time AI citation monitoring? Try Profound or Goodie AI →"` in a muted `#1f1f1f` bar — this is affiliate link placement space
- Bottom of Learn pages: `"Need help implementing GEO for your brand? [Get Expert Help →]"` — services/consultation placeholder

---

Build this as a complete, production-ready React application with all pages, routing, and tools fully functional.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/355f7a08-21aa-49ed-b15a-4e4f7aca4da3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
