import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { Check, ChevronRight, HelpCircle } from "lucide-react";
import { Card3D } from "./Card3D";
import { getToolMeta, TOOL_META, type ToolMeta } from "@/lib/tool-meta";

/**
 * Long-form on-page SEO content automatically rendered on every /tools/<slug>
 * page. Provides the standard H2/H3 outline, comparison table, FAQ, and
 * related-tools internal-link cluster required by the SEO playbook.
 */
export function ToolContent() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const slug = path.split("/tools/")[1]?.split("/")[0];
  const meta = slug ? getToolMeta(slug) : undefined;
  const related = useMemo(() => pickRelated(slug, meta), [slug, meta]);
  if (!meta) return null;

  const tn = meta.name;
  const competitor = meta.competitor ?? "Semrush";
  const issues = meta.commonIssues ?? defaultIssues(tn);

  return (
    <section className="mt-12 max-w-4xl mx-auto space-y-12 pb-16">
      {/* Quick Facts Box */}
      {meta.quickFacts && meta.quickFacts.length > 0 && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <h2 className="font-display text-sm uppercase tracking-widest text-primary mb-3">Quick Facts</h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-foreground">
            {meta.quickFacts.map((f, i) => (
              <li key={i} className="leading-relaxed">{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Direct Answer (AI extraction target — first 200 words) */}
      {meta.directAnswer && (
        <Block id="direct-answer" title={`What Is ${tn}?`}>
          <p className="text-base text-foreground/90 leading-relaxed">{meta.directAnswer}</p>
        </Block>
      )}

      {/* H2 What does it check */}
      <Block id="what-it-checks" title={`What Does ${tn} Check?`}>
        <p className="text-muted-foreground mb-5">
          {tn} is a free SEO tool from SEOAcademys that performs real-time
          analysis on any live URL. It evaluates {meta.features.length}+ signals
          using the same methodology trusted by 2.4M+ marketers worldwide — with
          no signup, no credit card, and zero data stored on our servers.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {meta.features.map((f, i) => (
            <FeatureCard key={i} title={f.split(/[:—-]/)[0].trim()} body={f} />
          ))}
        </div>
      </Block>

      {/* Why Matters in 2026 */}
      {meta.whyMatters && (
        <Block id="why-matters" title={`Why ${tn} Matters for Google Rankings in 2026`}>
          <p className="text-muted-foreground leading-relaxed">{meta.whyMatters}</p>
        </Block>
      )}

      {/* Extra freeform blocks (e.g. recommended robots.txt) */}
      {meta.extraBlocks?.map((b, i) => (
        <Block key={i} id={`extra-${i}`} title={b.title}>
          <pre className="rounded-xl bg-surface-2 border border-border p-4 text-xs overflow-x-auto whitespace-pre-wrap font-mono text-foreground/90">{b.body}</pre>
        </Block>
      ))}

      {/* H2 How to use */}
      <Block id="how-to-use" title={`How to Use ${tn}`}>
        <ol className="space-y-4">
          <Step n={1} title="Enter Your URL">
            Paste any public URL into the field above. {tn} accepts both
            <code className="mx-1 px-1.5 py-0.5 rounded bg-secondary text-xs">http://</code>
            and <code className="mx-1 px-1.5 py-0.5 rounded bg-secondary text-xs">https://</code>
            and auto-resolves redirects.
          </Step>
          <Step n={2} title="Run the Analysis">
            Click <strong>Analyze</strong>. Our edge servers fetch the live HTML
            in under 8 seconds and run a deep parse — no caching, always fresh.
          </Step>
          <Step n={3} title="Fix the Issues">
            Review the prioritized fix list, copy the recommended snippets, and
            re-run {tn} after deploying to confirm the score change.
          </Step>
        </ol>
      </Block>

      {/* H2 Full list of checks */}
      <Block id="full-list" title={`What ${tn} Checks — Full List`}>
        <div className="rounded-xl border border-border bg-surface-2 divide-y divide-border">
          {meta.features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 text-sm">
              <Check className="size-4 text-success shrink-0 mt-0.5" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* H2 Comparison */}
      <Block id="vs" title={`${tn} vs ${competitor}: Why Free Wins`}>
        <p className="text-muted-foreground mb-4">
          Paid SEO suites cost $99–$449/month. {tn} runs the same on-page checks
          in real time, completely free.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-muted-foreground">
              <tr>
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-center p-3 font-semibold text-primary">SEOAcademys</th>
                <th className="text-center p-3 font-semibold">{competitor}</th>
                <th className="text-center p-3 font-semibold">Ahrefs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Price", "Free forever", "$139.95/mo", "$129/mo"],
                ["Signup required", "No", "Yes", "Yes"],
                ["Live URL fetching", "Yes", "Yes", "Yes"],
                ["AI crawler signals (GPTBot, ClaudeBot)", "Yes", "No", "Partial"],
                ["Daily limit", "Unlimited", "100 reports", "500 credits"],
                ["Data stored", "Nothing", "Indefinitely", "Indefinitely"],
                ["Export CSV / JSON", "Yes", "Yes (paid tier)", "Yes (paid tier)"],
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium">{row[0]}</td>
                  <td className="p-3 text-center text-success font-semibold">{row[1]}</td>
                  <td className="p-3 text-center text-muted-foreground">{row[2]}</td>
                  <td className="p-3 text-center text-muted-foreground">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      {/* H2 Common issues */}
      <Block id="issues" title={`Common ${meta.type} Issues Found`}>
        <div className="grid sm:grid-cols-2 gap-3">
          {issues.map((it, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface p-4">
              <h3 className="font-semibold mb-1.5">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* H2 FAQ */}
      <Block id="faq" title={`Frequently Asked Questions About ${tn}`}>
        <div className="space-y-3">
          {meta.faqs.map((f, i) => (
            <details key={i} className="group rounded-lg border border-border bg-surface p-4 open:bg-surface-2 transition">
              <summary className="cursor-pointer flex items-center gap-2 font-semibold text-foreground">
                <HelpCircle className="size-4 text-primary shrink-0" />
                <span className="flex-1">{f.q}</span>
                <ChevronRight className="size-4 text-muted-foreground transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed pl-6">{f.a}</p>
            </details>
          ))}
        </div>
      </Block>

      {/* H2 Related tools */}
      <Block id="related" title="Related Free SEO Tools">
        <div className="grid sm:grid-cols-3 gap-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to={`/tools/${r.slug}` as never}
              className="block rounded-xl border border-border bg-surface p-4 hover:border-primary hover:shadow-[var(--shadow-3d-sm)] transition"
            >
              <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                {r.type}
              </div>
              <div className="font-display font-semibold mb-1">{r.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{r.description}</div>
            </Link>
          ))}
        </div>
      </Block>
    </section>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id}>
      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">{title}</h2>
      {children}
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <Card3D tilt={false} className="p-4">
      <h3 className="font-semibold mb-1 text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
    </Card3D>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <div className="size-9 rounded-full grad-primary text-primary-foreground font-bold inline-flex items-center justify-center shrink-0 shadow-[var(--shadow-3d-sm)]">
        {n}
      </div>
      <div>
        <h3 className="font-semibold mb-1">Step {n}: {title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </li>
  );
}

function defaultIssues(name: string) {
  return [
    { title: "Stale or cached data", body: `Most teams audit using cached snapshots. ${name} fetches the live HTML on every run, so you catch issues the day they ship.` },
    { title: "Generic recommendations", body: `Off-the-shelf checklists ignore your stack. ${name} surfaces issues based on what's actually in your page source.` },
    { title: "Missing AI-crawler signals", body: `Most legacy tools don't audit GPTBot, ClaudeBot or PerplexityBot. We do — that's how you stay visible in AI answers.` },
    { title: "Slow turnaround", body: `Enterprise crawls take 6–24 hours. ${name} returns full results in under 8 seconds, every time.` },
  ];
}

function pickRelated(slug: string | undefined, meta: ToolMeta | undefined): ToolMeta[] {
  if (!slug || !meta) return [];
  if (meta.related && meta.related.length > 0) {
    return meta.related.map((s) => TOOL_META[s]).filter(Boolean);
  }
  // Default: 3 sibling tools (not self), preferring same category by type-keyword overlap.
  const others = Object.values(TOOL_META).filter((t) => t.slug !== slug);
  const score = (t: ToolMeta) =>
    t.type.split(/\s+/).filter((w) => meta.type.includes(w)).length;
  return others.sort((a, b) => score(b) - score(a)).slice(0, 3);
}
