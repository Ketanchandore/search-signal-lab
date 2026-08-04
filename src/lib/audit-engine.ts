/**
 * Bulk audit engine — pure, dependency-free checks that run server-side.
 * Every check is free/open-source logic: no third-party API keys required.
 */
import {
  getMeta,
  getHeadings,
  getLinks,
  getImages,
  getJsonLd,
  detectTech,
  stripTags,
  wordTokens,
  fleschReadingEase,
} from "./html-analyzer";

export type CheckStatus = "pass" | "warn" | "fail" | "info";

export type CheckResult = {
  id: string;
  label: string;
  category: string;
  status: CheckStatus;
  score: number; // 0-100
  summary: string;
  details: { k: string; v: string }[];
};

export type AuditContext = {
  url: string;
  finalUrl: string;
  html: string;
  headers: Record<string, string>;
  status: number;
  bytes: number;
  durationMs: number;
  redirectChain: { url: string; status: number }[];
  robotsTxt: string;
  sitemapXml: string;
  sitemapUrl: string;
};

type Check = {
  id: string;
  label: string;
  category: string;
  run: (c: AuditContext) => Omit<CheckResult, "id" | "label" | "category">;
};

const kv = (k: string, v: unknown) => ({ k, v: String(v ?? "") });
const grade = (score: number): CheckStatus => (score >= 85 ? "pass" : score >= 55 ? "warn" : "fail");

export const AUDIT_CHECKS: Check[] = [
  {
    id: "meta-tag-checker",
    label: "Meta Tag Checker",
    category: "On-page",
    run: (c) => {
      const m = getMeta(c.html);
      const tLen = m.title.length;
      const dLen = m.description.length;
      let score = 100;
      if (!m.title) score -= 40;
      else if (tLen < 30 || tLen > 60) score -= 15;
      if (!m.description) score -= 35;
      else if (dLen < 70 || dLen > 160) score -= 15;
      if (!m.viewport) score -= 10;
      if (!m.charset) score -= 5;
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: `Title ${tLen} chars, description ${dLen} chars.`,
        details: [
          kv("Title", m.title || "— missing —"),
          kv("Title length", tLen),
          kv("Description", m.description || "— missing —"),
          kv("Description length", dLen),
          kv("Meta robots", m.robots || "(default index,follow)"),
          kv("Viewport", m.viewport || "— missing —"),
          kv("Charset", m.charset || "— missing —"),
          kv("Lang", m.lang || "— missing —"),
        ],
      };
    },
  },
  {
    id: "heading-checker",
    label: "Heading Structure",
    category: "On-page",
    run: (c) => {
      const hs = getHeadings(c.html);
      const h1 = hs.filter((h) => h.level === 1);
      let score = 100;
      if (h1.length === 0) score -= 45;
      if (h1.length > 1) score -= 25;
      let prev = 0;
      let skips = 0;
      for (const h of hs) {
        if (prev && h.level > prev + 1) skips++;
        prev = h.level;
      }
      score -= Math.min(30, skips * 10);
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: `${h1.length} H1, ${hs.length} headings total, ${skips} level skips.`,
        details: [
          kv("H1 count", h1.length),
          kv("H1 text", h1.map((h) => h.text).join(" | ") || "— none —"),
          kv("Total headings", hs.length),
          kv("Level skips", skips),
          ...[2, 3, 4].map((l) => kv(`H${l} count`, hs.filter((h) => h.level === l).length)),
        ],
      };
    },
  },
  {
    id: "canonical-checker",
    label: "Canonical Tag",
    category: "Technical",
    run: (c) => {
      const m = getMeta(c.html);
      const canon = m.canonical;
      let score = 100;
      let summary = "Canonical present and self-referencing.";
      if (!canon) {
        score = 40;
        summary = "No canonical tag found.";
      } else {
        try {
          const a = new URL(canon, c.finalUrl).toString().replace(/\/$/, "");
          const b = c.finalUrl.replace(/\/$/, "");
          if (a !== b) {
            score = 70;
            summary = "Canonical points to a different URL.";
          }
        } catch {
          score = 30;
          summary = "Canonical value is not a valid URL.";
        }
      }
      return { status: grade(score), score, summary, details: [kv("Canonical", canon || "— missing —"), kv("Final URL", c.finalUrl)] };
    },
  },
  {
    id: "og-checker",
    label: "Open Graph Tags",
    category: "Social",
    run: (c) => {
      const og = getMeta(c.html).og;
      const need = ["title", "description", "image", "url", "type"];
      const missing = need.filter((k) => !og[k]);
      const score = Math.max(0, 100 - missing.length * 20);
      return {
        status: grade(score),
        score,
        summary: missing.length ? `Missing og:${missing.join(", og:")}` : "All core Open Graph tags present.",
        details: need.map((k) => kv(`og:${k}`, og[k] || "— missing —")),
      };
    },
  },
  {
    id: "twitter-card-checker",
    label: "Twitter / X Card",
    category: "Social",
    run: (c) => {
      const m = getMeta(c.html);
      const t = m.twitter;
      const need = ["card", "title", "description", "image"];
      const missing = need.filter((k) => !t[k] && !m.og[k]);
      const score = Math.max(0, 100 - missing.length * 22);
      return {
        status: grade(score),
        score,
        summary: missing.length ? `Missing twitter:${missing.join(", twitter:")}` : "Card tags complete.",
        details: need.map((k) => kv(`twitter:${k}`, t[k] || (m.og[k] ? `(falls back to og:${k})` : "— missing —"))),
      };
    },
  },
  {
    id: "schema-validator",
    label: "Structured Data (JSON-LD)",
    category: "GEO / AI",
    run: (c) => {
      const blocks = getJsonLd(c.html);
      const broken = blocks.filter((b) => b.error);
      const types = blocks
        .flatMap((b) => {
          const d = b.data as { "@type"?: string | string[]; "@graph"?: { "@type"?: string }[] } | null;
          if (!d) return [];
          const g = d["@graph"]?.map((x) => x["@type"] ?? "") ?? [];
          return [...(Array.isArray(d["@type"]) ? d["@type"] : [d["@type"] ?? ""]), ...g];
        })
        .filter(Boolean);
      let score = blocks.length === 0 ? 35 : 100;
      score -= broken.length * 30;
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: blocks.length ? `${blocks.length} JSON-LD block(s), ${broken.length} invalid.` : "No JSON-LD structured data found.",
        details: [kv("Blocks", blocks.length), kv("Types", types.join(", ") || "—"), kv("Parse errors", broken.length)],
      };
    },
  },
  {
    id: "image-seo",
    label: "Image SEO",
    category: "On-page",
    run: (c) => {
      const imgs = getImages(c.html, c.finalUrl);
      const noAlt = imgs.filter((i) => !i.alt.trim()).length;
      const noDims = imgs.filter((i) => !i.width || !i.height).length;
      const lazy = imgs.filter((i) => i.loading === "lazy").length;
      const score = imgs.length === 0 ? 100 : Math.max(0, 100 - Math.round((noAlt / imgs.length) * 60) - Math.round((noDims / imgs.length) * 20));
      return {
        status: grade(score),
        score,
        summary: `${imgs.length} images, ${noAlt} missing alt text.`,
        details: [kv("Images", imgs.length), kv("Missing alt", noAlt), kv("Missing width/height", noDims), kv("Lazy loaded", lazy)],
      };
    },
  },
  {
    id: "link-analyzer",
    label: "Link Profile",
    category: "On-page",
    run: (c) => {
      const links = getLinks(c.html, c.finalUrl);
      const internal = links.filter((l) => l.internal).length;
      const external = links.length - internal;
      const nofollow = links.filter((l) => l.nofollow).length;
      const empty = links.filter((l) => !l.text).length;
      let score = 100;
      if (internal < 3) score -= 35;
      if (links.length > 300) score -= 15;
      score -= Math.min(20, empty * 2);
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: `${internal} internal / ${external} external links.`,
        details: [kv("Total links", links.length), kv("Internal", internal), kv("External", external), kv("Nofollow", nofollow), kv("Empty anchor text", empty)],
      };
    },
  },
  {
    id: "content-checker",
    label: "Content Depth & Readability",
    category: "Content",
    run: (c) => {
      const body = stripTags(c.html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ""));
      const words = wordTokens(body);
      const flesch = Math.round(fleschReadingEase(body));
      let score = 100;
      if (words.length < 300) score -= 45;
      else if (words.length < 700) score -= 20;
      if (flesch < 30) score -= 20;
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: `${words.length} words, Flesch reading ease ${flesch}.`,
        details: [kv("Word count", words.length), kv("Flesch reading ease", flesch), kv("Unique words", new Set(words).size)],
      };
    },
  },
  {
    id: "keyword-density",
    label: "Keyword Density",
    category: "Content",
    run: (c) => {
      const body = stripTags(c.html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ""));
      const words = wordTokens(body).filter((w) => w.length > 3);
      const freq = new Map<string, number>();
      for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
      const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
      const topDensity = words.length ? (top[0]?.[1] ?? 0) / words.length : 0;
      const score = topDensity > 0.06 ? 55 : 100;
      return {
        status: grade(score),
        score,
        summary: top.length ? `Top term "${top[0][0]}" at ${(topDensity * 100).toFixed(2)}%.` : "Not enough text to analyse.",
        details: top.map(([w, n]) => kv(w, `${n}× (${((n / Math.max(1, words.length)) * 100).toFixed(2)}%)`)),
      };
    },
  },
  {
    id: "http-headers",
    label: "HTTP Headers & Security",
    category: "Technical",
    run: (c) => {
      const h = (k: string) => c.headers[k] || "";
      const wanted = ["strict-transport-security", "content-security-policy", "x-content-type-options", "referrer-policy", "x-frame-options"];
      const missing = wanted.filter((k) => !h(k));
      const score = Math.max(0, 100 - missing.length * 16);
      return {
        status: grade(score),
        score,
        summary: `${wanted.length - missing.length}/${wanted.length} security headers present.`,
        details: [kv("Status", c.status), kv("Content-Type", h("content-type")), kv("Server", h("server") || "—"), ...wanted.map((k) => kv(k, h(k) || "— missing —"))],
      };
    },
  },
  {
    id: "ssl-checker",
    label: "HTTPS / SSL",
    category: "Technical",
    run: (c) => {
      const isHttps = c.finalUrl.startsWith("https://");
      const hsts = !!c.headers["strict-transport-security"];
      const mixed = (c.html.match(/(?:src|href)=["']http:\/\//gi) || []).length;
      let score = isHttps ? 100 : 20;
      if (!hsts) score -= 15;
      score -= Math.min(30, mixed * 5);
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: isHttps ? `Served over HTTPS${mixed ? `, ${mixed} mixed-content references` : ""}.` : "Site is not served over HTTPS.",
        details: [kv("HTTPS", isHttps), kv("HSTS", hsts), kv("Mixed content refs", mixed)],
      };
    },
  },
  {
    id: "redirect-checker",
    label: "Redirect Chain",
    category: "Technical",
    run: (c) => {
      const hops = Math.max(0, c.redirectChain.length - 1);
      const score = hops === 0 ? 100 : hops === 1 ? 85 : hops === 2 ? 65 : 40;
      return {
        status: grade(score),
        score,
        summary: hops === 0 ? "No redirects — direct 200 response." : `${hops} redirect hop(s) before final URL.`,
        details: c.redirectChain.map((r, i) => kv(`Hop ${i + 1}`, `${r.status} → ${r.url}`)),
      };
    },
  },
  {
    id: "page-size",
    label: "Page Weight & Speed",
    category: "Performance",
    run: (c) => {
      const kb = Math.round(c.bytes / 1024);
      const scripts = (c.html.match(/<script\b/gi) || []).length;
      const styles = (c.html.match(/<link[^>]+stylesheet/gi) || []).length;
      let score = 100;
      if (kb > 150) score -= 20;
      if (kb > 500) score -= 25;
      if (c.durationMs > 800) score -= 15;
      if (c.durationMs > 2000) score -= 20;
      if (scripts > 25) score -= 10;
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: `${kb} KB HTML, TTFB-ish ${c.durationMs} ms, ${scripts} scripts.`,
        details: [kv("HTML size (KB)", kb), kv("Response time (ms)", c.durationMs), kv("Script tags", scripts), kv("Stylesheets", styles), kv("Compression", c.headers["content-encoding"] || "none")],
      };
    },
  },
  {
    id: "mobile-checker",
    label: "Mobile Friendliness",
    category: "Technical",
    run: (c) => {
      const m = getMeta(c.html);
      const vp = m.viewport;
      const responsiveVp = /width=device-width/i.test(vp);
      const blocksZoom = /user-scalable=no|maximum-scale=1\b/i.test(vp);
      const fixedWidth = /width:\s*\d{4,}px/i.test(c.html);
      let score = 100;
      if (!vp) score -= 50;
      else if (!responsiveVp) score -= 30;
      if (blocksZoom) score -= 15;
      if (fixedWidth) score -= 15;
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: responsiveVp ? "Responsive viewport configured." : "Viewport is missing or not responsive.",
        details: [kv("Viewport", vp || "— missing —"), kv("Blocks zoom", blocksZoom), kv("Fixed wide elements", fixedWidth)],
      };
    },
  },
  {
    id: "robots-checker",
    label: "Robots.txt & Crawlability",
    category: "Technical",
    run: (c) => {
      const txt = c.robotsTxt;
      const m = getMeta(c.html);
      const noindex = /noindex/i.test(m.robots) || /noindex/i.test(c.headers["x-robots-tag"] || "");
      const hasSitemap = /sitemap:/i.test(txt);
      let score = 100;
      if (!txt) score -= 30;
      if (noindex) score -= 60;
      if (!hasSitemap) score -= 15;
      score = Math.max(0, score);
      return {
        status: grade(score),
        score,
        summary: noindex ? "Page is set to NOINDEX — it cannot rank." : txt ? "robots.txt found and page is indexable." : "No robots.txt found.",
        details: [kv("robots.txt", txt ? `${txt.length} bytes` : "— not found —"), kv("Sitemap directive", hasSitemap), kv("Meta robots", m.robots || "(default)"), kv("X-Robots-Tag", c.headers["x-robots-tag"] || "—")],
      };
    },
  },
  {
    id: "sitemap-checker",
    label: "XML Sitemap",
    category: "Technical",
    run: (c) => {
      const urls = (c.sitemapXml.match(/<loc>/gi) || []).length;
      const isIndex = /<sitemapindex/i.test(c.sitemapXml);
      const score = c.sitemapXml ? (urls > 0 ? 100 : 60) : 35;
      return {
        status: grade(score),
        score,
        summary: c.sitemapXml ? `${isIndex ? "Sitemap index" : "Sitemap"} with ${urls} entries.` : "No XML sitemap reachable.",
        details: [kv("Sitemap URL", c.sitemapUrl || "—"), kv("Entries", urls), kv("Type", isIndex ? "sitemapindex" : "urlset")],
      };
    },
  },
  {
    id: "tech-detector",
    label: "Technology Stack",
    category: "Technical",
    run: (c) => {
      const sigs = detectTech(c.html, c.headers);
      return {
        status: "info",
        score: 100,
        summary: sigs.length ? `${sigs.length} technologies detected.` : "No common signatures detected.",
        details: sigs.map((s) => kv(s.category, s.name)),
      };
    },
  },
  {
    id: "ai-citation-audit",
    label: "AI Citation Readiness (GEO)",
    category: "GEO / AI",
    run: (c) => {
      const m = getMeta(c.html);
      const hs = getHeadings(c.html);
      const jsonld = getJsonLd(c.html).length > 0;
      const body = stripTags(c.html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ""));
      const words = wordTokens(body).length;
      const questionHeads = hs.filter((h) => /\?$|^(what|why|how|when|who|which|is|does|can)\b/i.test(h.text)).length;
      const lists = (c.html.match(/<(ul|ol)\b/gi) || []).length;
      const tables = (c.html.match(/<table\b/gi) || []).length;
      const author = /rel=["']author["']|itemprop=["']author["']|"author"\s*:/i.test(c.html);
      const dates = /datePublished|dateModified|<time\b/i.test(c.html);
      let score = 0;
      score += jsonld ? 22 : 0;
      score += questionHeads > 0 ? 18 : 0;
      score += lists > 1 ? 14 : lists ? 7 : 0;
      score += tables ? 8 : 0;
      score += words > 700 ? 14 : words > 300 ? 7 : 0;
      score += author ? 12 : 0;
      score += dates ? 12 : 0;
      return {
        status: grade(score),
        score,
        summary: `GEO readiness ${score}/100 — how quotable this page is for AI Overviews, ChatGPT and Perplexity.`,
        details: [
          kv("JSON-LD present", jsonld),
          kv("Question-style headings", questionHeads),
          kv("Lists (extractable answers)", lists),
          kv("Data tables", tables),
          kv("Author signals (E-E-A-T)", author),
          kv("Published/modified dates", dates),
          kv("Word count", words),
          kv("Title", m.title),
        ],
      };
    },
  },
];

export const CHECK_INDEX = Object.fromEntries(AUDIT_CHECKS.map((c) => [c.id, c]));

export function runChecks(ctx: AuditContext, ids: string[]): CheckResult[] {
  return ids
    .map((id) => CHECK_INDEX[id])
    .filter(Boolean)
    .map((chk) => {
      try {
        return { id: chk.id, label: chk.label, category: chk.category, ...chk.run(ctx) };
      } catch (e) {
        return {
          id: chk.id,
          label: chk.label,
          category: chk.category,
          status: "warn" as CheckStatus,
          score: 0,
          summary: `Check failed: ${(e as Error).message}`,
          details: [],
        };
      }
    });
}

export function overallScore(results: CheckResult[]) {
  const scored = results.filter((r) => r.status !== "info");
  if (!scored.length) return 100;
  return Math.round(scored.reduce((n, r) => n + r.score, 0) / scored.length);
}
