import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { AffiliateBar, PageContainer } from "@/components/Layout";
import { Card3D, ToolHeader } from "@/components/Card3D";
import { useMemo, useState } from "react";
import { useDebounced } from "@/hooks/use-debounced";


export const Route = createFileRoute("/tools/content-checker")({
  head: () => toolHead("content-checker") * 150));

  const directCount = sentences.filter((s) => !/^(however|but|also|why|how|what|when|where|who|is|are|do|does|can|could|should|would)\b/i.test(s)).length;
  const directAnswer = Math.round((directCount / total) * 100);

  const structureMatches = (text.match(/[:\-]|\b\d+\.\s/g) || []).length;
  const structure = Math.min(100, structureMatches * 10);

  const llmCitation = Math.round((factualDensity + directAnswer + structure) / 3);

  const fillerHits = FILLERS.reduce((acc, f) => acc + (text.toLowerCase().match(new RegExp(`\\b${f}\\b`, "g")) || []).length, 0);

  return { sentences, factualDensity, directAnswer, structure, llmCitation, fillerHits, factCount, total };
}

function classify(sentence: string): "fact" | "filler" | "weak" | "neutral" {
  const lower = sentence.toLowerCase();
  if (FILLERS.some((f) => lower.includes(f))) return "filler";
  if (/^(however|but|also)\b/i.test(sentence) || sentence.trim().endsWith("?")) return "weak";
  if (/\b(\d+(\.\d+)?%?|\d{4}|\$\d+|[A-Z][a-z]+\s[A-Z][a-z]+)\b/.test(sentence)) return "fact";
  return "neutral";
}

function ContentCheckerTool() {
  const [text, setText] = useState("");
  const debounced = useDebounced(text, 250);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const ready = debounced.trim().split(/\s+/).filter(Boolean).length >= 10;
  const result = useMemo(() => (ready ? analyze(debounced) : null), [debounced, ready]);

  return (
    <PageContainer>
      <AffiliateBar />
      <ToolHeader
        title="LLM Content Readiness Checker"
        badge="LIVE · AS YOU TYPE"
        desc="Paste your article — analysis runs live with every keystroke. See exactly why AI engines skip it."
      />

      <Card3D tilt={false} className="p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Paste your article, blog post, or landing page copy here (minimum ~10 words to start)..."
          className="w-full bg-background border border-border rounded-md p-3 text-sm font-mono outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-y"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{words} words · {text.length} characters</span>
          <span className="inline-flex items-center gap-2">
            <span className={`size-2 rounded-full ${ready ? "bg-success" : "bg-muted-foreground/40"}`} />
            {ready ? "Live analysis updating" : "Type at least 10 words to start"}
          </span>
        </div>
      </Card3D>

      {result && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Score label="Factual Density" value={result.factualDensity} />
            <Score label="Direct Answer" value={result.directAnswer} />
            <Score label="Structure" value={result.structure} />
            <Score label="LLM Citation Probability" value={result.llmCitation} highlight />
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-6">
            <h3 className="font-display font-semibold mb-4">Highlighted Content View</h3>
            <div className="space-y-1 leading-relaxed text-sm">
              {result.sentences.map((s, i) => {
                const c = classify(s);
                const cls =
                  c === "fact" ? "bg-primary/15 text-primary px-1 rounded" :
                  c === "filler" ? "bg-destructive/15 text-destructive px-1 rounded" :
                  c === "weak" ? "bg-warning/15 text-warning px-1 rounded" :
                  "text-foreground";
                return <span key={i} className={cls}>{s} </span>;
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <Legend color="bg-primary/40" label="Factual / Named entity" />
              <Legend color="bg-destructive/40" label="Filler language" />
              <Legend color="bg-warning/40" label="Weak openings / questions" />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface p-6">
            <h3 className="font-display font-semibold mb-4">Improvement Suggestions</h3>
            <ul className="space-y-3 text-sm">
              {result.factualDensity < 40 && <li>⚠️ Add specific statistics — AI engines like Perplexity cite content 3x more when it contains verifiable numbers.</li>}
              {result.sentences.some((_, i) => i < result.sentences.length - 1 && result.sentences.slice(i, i + 4).join(" ").length > 600) && (
                <li>⚠️ Break long paragraphs into 2-sentence chunks — LLMs extract passage-level answers.</li>
              )}
              {result.structure < 30 && <li>⚠️ Convert this section into a numbered list or comparison table for higher citation probability.</li>}
              {result.fillerHits > 0 && <li>⚠️ Remove {result.fillerHits} filler phrases detected. AI tokenizers deprioritize non-factual text.</li>}
              {result.llmCitation > 70 && <li>✅ This content has good AI citation potential. Focus on adding internal links to Schema-marked pages.</li>}
              {result.llmCitation <= 70 && result.factualDensity >= 40 && result.structure >= 30 && result.fillerHits === 0 && (
                <li>💡 Solid baseline. Try adding an FAQ block at the bottom to capture direct-answer queries.</li>
              )}
            </ul>
          </div>
        </>
      )}
    </PageContainer>
  );
}

function Score({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  const color = value < 40 ? "var(--destructive)" : value < 70 ? "var(--warning)" : "var(--primary)";
  return (
    <div className={`rounded-xl border ${highlight ? "border-primary" : "border-border"} bg-surface p-5`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-display text-3xl font-bold mt-1" style={{ color }}>{value}<span className="text-base text-muted-foreground">/100</span></div>
      <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-3 rounded ${color}`} />
      {label}
    </div>
  );
}
