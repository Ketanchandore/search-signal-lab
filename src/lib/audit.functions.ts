import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { runChecks, overallScore, type AuditContext, type CheckResult } from "./audit-engine";

type RunInput = { url: string; checks: string[] };

function validateRun(input: unknown): RunInput {
  const d = input as { url?: unknown; checks?: unknown };
  if (typeof d.url !== "string" || !/^https?:\/\//i.test(d.url.trim())) throw new Error("Enter a full URL starting with http:// or https://");
  const checks = Array.isArray(d.checks) ? d.checks.filter((c): c is string => typeof c === "string") : [];
  if (checks.length === 0) throw new Error("Select at least one tool to run");
  return { url: d.url.trim(), checks: checks.slice(0, 40) };
}

const UA = "Mozilla/5.0 (compatible; SEOAcademysBot/1.0; +https://seoacademys.com/bot)";

async function get(url: string, timeout = 15_000) {
  return fetch(url, { headers: { "User-Agent": UA, Accept: "*/*" }, redirect: "manual", signal: AbortSignal.timeout(timeout) });
}

async function crawl(url: string): Promise<AuditContext> {
  const started = Date.now();
  const chain: { url: string; status: number }[] = [];
  let current = url;
  let resp: Response | null = null;
  for (let i = 0; i < 8; i++) {
    const r = await get(current);
    chain.push({ url: current, status: r.status });
    if (r.status >= 300 && r.status < 400 && r.headers.get("location")) {
      current = new URL(r.headers.get("location")!, current).toString();
      continue;
    }
    resp = r;
    break;
  }
  if (!resp) throw new Error("Too many redirects");
  const buf = await resp.arrayBuffer();
  const html = new TextDecoder("utf-8", { fatal: false }).decode(buf.slice(0, 3_000_000));
  const headers: Record<string, string> = {};
  resp.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });

  const origin = new URL(current).origin;
  let robotsTxt = "";
  try {
    const r = await get(`${origin}/robots.txt`, 8000);
    if (r.ok) robotsTxt = (await r.text()).slice(0, 100_000);
  } catch { /* ignore */ }

  let sitemapUrl = robotsTxt.match(/sitemap:\s*(\S+)/i)?.[1] || `${origin}/sitemap.xml`;
  let sitemapXml = "";
  try {
    const r = await get(sitemapUrl, 10_000);
    if (r.ok) sitemapXml = (await r.text()).slice(0, 500_000);
    else sitemapUrl = "";
  } catch { sitemapUrl = ""; }

  return {
    url,
    finalUrl: current,
    html,
    headers,
    status: resp.status,
    bytes: buf.byteLength,
    durationMs: Date.now() - started,
    redirectChain: chain,
    robotsTxt,
    sitemapXml,
    sitemapUrl,
  };
}

export type AuditRun = {
  id: string;
  url: string;
  status: string;
  score: number | null;
  results: CheckResult[];
  created_at: string;
};

/** Crawl a URL and run every selected check, persisting the run for the signed-in user. */
export const runAudit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validateRun)
  .handler(async ({ data, context }): Promise<AuditRun> => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("audit_runs")
      .insert({ user_id: userId, url: data.url, checks: data.checks, status: "running", progress: 0 })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    const id = row.id as string;

    try {
      const ctx = await crawl(data.url);
      const results = runChecks(ctx, data.checks);
      const score = overallScore(results);
      await supabase.from("audit_runs").update({ status: "done", progress: 100, score, results }).eq("id", id);
      return { id, url: data.url, status: "done", score, results, created_at: new Date().toISOString() };
    } catch (e) {
      const msg = (e as Error).message;
      await supabase.from("audit_runs").update({ status: "error", error: msg }).eq("id", id);
      throw new Error(`Audit failed: ${msg}`);
    }
  });

/** Recent audit runs for the signed-in user. */
export const listAuditRuns = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("audit_runs")
      .select("id, url, status, score, results, created_at")
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as AuditRun[];
  });
