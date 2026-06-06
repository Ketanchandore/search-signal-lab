/** Pure HTML analyzers — work in browser, no deps. */

export function getMeta(html: string) {
  const get = (re: RegExp) => {
    const m = html.match(re);
    return m ? decode(m[1].trim()) : "";
  };
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
  const description = getAttr(html, "meta", "name", "description", "content");
  const keywords = getAttr(html, "meta", "name", "keywords", "content");
  const robots = getAttr(html, "meta", "name", "robots", "content");
  const viewport = getAttr(html, "meta", "name", "viewport", "content");
  const canonical = get(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || get(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  const lang = get(/<html[^>]*\blang=["']([^"']+)["']/i);
  const charset = get(/<meta[^>]+charset=["']?([^"'\s>]+)/i);

  // Open Graph
  const og: Record<string, string> = {};
  for (const m of html.matchAll(/<meta[^>]+property=["']og:([^"']+)["'][^>]*content=["']([^"']*)["']/gi)) og[m[1]] = decode(m[2]);
  // Twitter
  const tw: Record<string, string> = {};
  for (const m of html.matchAll(/<meta[^>]+name=["']twitter:([^"']+)["'][^>]*content=["']([^"']*)["']/gi)) tw[m[1]] = decode(m[2]);

  return { title: decode(title), description, keywords, robots, viewport, canonical, lang, charset, og, twitter: tw };
}

function getAttr(html: string, tag: string, keyAttr: string, keyVal: string, valAttr: string) {
  const re1 = new RegExp(`<${tag}[^>]+${keyAttr}=["']${keyVal}["'][^>]*${valAttr}=["']([^"']*)["']`, "i");
  const re2 = new RegExp(`<${tag}[^>]+${valAttr}=["']([^"']*)["'][^>]*${keyAttr}=["']${keyVal}["']`, "i");
  return decode((html.match(re1)?.[1] || html.match(re2)?.[1] || "").trim());
}

export function getHeadings(html: string) {
  const items: { level: number; text: string }[] = [];
  for (const m of html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    items.push({ level: Number(m[1]), text: stripTags(m[2]).trim() });
  }
  return items;
}

export function getLinks(html: string, base: string) {
  const out: { href: string; text: string; rel: string; internal: boolean; nofollow: boolean }[] = [];
  let host = "";
  try { host = new URL(base).host; } catch { /* ignore */ }
  for (const m of html.matchAll(/<a\b([^>]*?)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = m[2];
    const attrs = (m[1] + " " + m[3]).toLowerCase();
    const rel = (attrs.match(/rel=["']([^"']*)["']/)?.[1]) || "";
    let abs = href;
    try { abs = new URL(href, base).toString(); } catch { /* ignore */ }
    let internal = false;
    try { internal = new URL(abs).host === host; } catch { /* ignore */ }
    out.push({
      href: abs,
      text: stripTags(m[4]).trim().slice(0, 120),
      rel,
      internal,
      nofollow: /\bnofollow\b/.test(rel),
    });
  }
  return out;
}

export function getImages(html: string, base: string) {
  const out: { src: string; alt: string; width: string; height: string; loading: string }[] = [];
  for (const m of html.matchAll(/<img\b([^>]*?)\/?>/gi)) {
    const tag = m[0];
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1] || "";
    let abs = src;
    try { abs = new URL(src, base).toString(); } catch { /* ignore */ }
    out.push({
      src: abs,
      alt: (tag.match(/\balt=["']([^"']*)["']/i)?.[1]) ?? "",
      width: tag.match(/\bwidth=["']?([^"'\s>]+)/i)?.[1] || "",
      height: tag.match(/\bheight=["']?([^"'\s>]+)/i)?.[1] || "",
      loading: tag.match(/\bloading=["']([^"']+)["']/i)?.[1] || "",
    });
  }
  return out;
}

export function getJsonLd(html: string) {
  const out: { raw: string; data: unknown; error?: string }[] = [];
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const raw = m[1].trim();
    try { out.push({ raw, data: JSON.parse(raw) }); }
    catch (e) { out.push({ raw, data: null, error: (e as Error).message }); }
  }
  return out;
}

export function detectTech(html: string, headers: Record<string, string>) {
  const sigs: { name: string; category: string; evidence: string }[] = [];
  const add = (name: string, category: string, evidence: string) => sigs.push({ name, category, evidence });
  const h = (k: string) => headers[k.toLowerCase()] || "";

  if (/wp-content|wp-includes/i.test(html)) add("WordPress", "CMS", "wp-content path");
  if (/shopify/i.test(html) || /x-shopid/i.test(JSON.stringify(headers))) add("Shopify", "Ecommerce", "shopify markers");
  if (/wix\.com|_wixCIDX/i.test(html)) add("Wix", "CMS", "wix markers");
  if (/squarespace/i.test(html)) add("Squarespace", "CMS", "squarespace markers");
  if (/drupal-settings-json|sites\/default\/files/i.test(html)) add("Drupal", "CMS", "drupal markers");
  if (/joomla|com_content/i.test(html)) add("Joomla", "CMS", "joomla markers");
  if (/__NEXT_DATA__|_next\/static/i.test(html)) add("Next.js", "Framework", "__NEXT_DATA__");
  if (/__nuxt__|_nuxt\//i.test(html)) add("Nuxt", "Framework", "_nuxt assets");
  if (/data-reactroot|react-dom/i.test(html)) add("React", "Library", "react markers");
  if (/ng-version|ng-app/i.test(html)) add("Angular", "Framework", "ng markers");
  if (/svelte-/i.test(html)) add("Svelte", "Framework", "svelte classes");
  if (/gtag\(|google-analytics|googletagmanager/i.test(html)) add("Google Analytics", "Analytics", "gtag");
  if (/cloudflare/i.test(h("server")) || h("cf-ray")) add("Cloudflare", "CDN", "cf headers");
  if (/vercel/i.test(h("server")) || h("x-vercel-id")) add("Vercel", "Hosting", "vercel headers");
  if (/netlify/i.test(h("server")) || h("x-nf-request-id")) add("Netlify", "Hosting", "netlify headers");
  if (h("server")) add(h("server"), "Web Server", "Server header");
  if (h("x-powered-by")) add(h("x-powered-by"), "Backend", "X-Powered-By");
  if (/tailwind/i.test(html)) add("Tailwind CSS", "CSS", "tailwind classes");
  if (/bootstrap/i.test(html)) add("Bootstrap", "CSS", "bootstrap classes");
  if (/jquery/i.test(html)) add("jQuery", "Library", "jquery script");

  return sigs;
}

export function wpThemeDetect(html: string) {
  const m = html.match(/wp-content\/themes\/([^/'"\s]+)/i);
  return m ? m[1] : "";
}

export function stripTags(s: string) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

export function decode(s: string) {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

export function wordTokens(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

export function fleschReadingEase(text: string) {
  const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
  const words = wordTokens(text);
  const syllables = words.reduce((n, w) => n + countSyllables(w), 0);
  if (words.length === 0) return 0;
  return Math.round(206.835 - 1.015 * (words.length / sentences) - 84.6 * (syllables / words.length));
}
function countSyllables(w: string) {
  w = w.toLowerCase(); if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  return Math.max(1, (w.match(/[aeiouy]{1,2}/g) || []).length);
}
