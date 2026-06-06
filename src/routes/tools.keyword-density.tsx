import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { wordTokens } from "@/lib/html-analyzer";

export const Route = createFileRoute("/tools/keyword-density")({
  head: () => ({ meta: [{ title: "Keyword Density Checker — SEOAcademys" }] }),
  component: Page,
});

const STOP = new Set("a an the and or but if then else of in on at to from for by with without is are was were be been being have has had do does did this that those these it its they them their there here as i you he she we us our your my so not no yes very can will just about into over under more most less".split(" "));

function Page() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const tokens = wordTokens(text);
    const total = tokens.length;
    const grams = (n: number) => {
      const map = new Map<string, number>();
      for (let i = 0; i <= tokens.length - n; i++) {
        const slice = tokens.slice(i, i+n);
        if (slice.some(t => STOP.has(t))) continue;
        const key = slice.join(" ");
        map.set(key, (map.get(key) || 0) + 1);
      }
      return [...map.entries()].sort((a,b) => b[1]-a[1]).slice(0, 20);
    };
    return { total, one: grams(1), two: grams(2), three: grams(3) };
  }, [text]);

  return (
    <ToolPanel>
      <ToolHeader title="Keyword Density Checker" desc="Paste any content. See top 1/2/3-word keywords and their density." />
      <Card3D tilt={false} className="p-4 mb-4">
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={8} placeholder="Paste your article…" className="w-full bg-background border border-border rounded p-3 text-sm outline-none focus:border-primary" />
        <div className="text-xs text-muted-foreground mt-2">Total words: <span className="font-semibold text-foreground">{stats.total}</span></div>
      </Card3D>
      <div className="grid md:grid-cols-3 gap-4">
        {[{l:"Single words",d:stats.one},{l:"2-word phrases",d:stats.two},{l:"3-word phrases",d:stats.three}].map(g => (
          <Card3D tilt={false} key={g.l} className="p-4">
            <h3 className="font-display font-semibold mb-2">{g.l}</h3>
            <ul className="text-sm space-y-1">
              {g.d.map(([w, c]) => (
                <li key={w} className="flex justify-between gap-2">
                  <span className="truncate">{w}</span>
                  <span className="text-muted-foreground shrink-0">{c} · {((c/Math.max(1,stats.total))*100).toFixed(1)}%</span>
                </li>
              ))}
              {g.d.length===0 && <li className="text-muted-foreground italic">No data</li>}
            </ul>
          </Card3D>
        ))}
      </div>
    </ToolPanel>
  );
}
