import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useMemo, useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";

export const Route = createFileRoute("/tools/word-counter")({
  head: () => toolHead("word-counter"),
  component: Page,
});

function Page() {
  const [t, setT] = useState("");
  const m = useMemo(() => {
    const chars = t.length;
    const noSpace = t.replace(/\s/g, "").length;
    const words = t.trim() ? t.trim().split(/\s+/).length : 0;
    const sentences = (t.match(/[.!?]+/g) || []).length;
    const paragraphs = t.split(/\n\s*\n/).filter(Boolean).length;
    const reading = Math.ceil(words / 225);
    const speaking = Math.ceil(words / 130);
    return { chars, noSpace, words, sentences, paragraphs, reading, speaking };
  }, [t]);
  return (
    <ToolPanel>
      <ToolHeader title="Word & Character Counter" desc="Instant stats as you type. No round-trip." />
      <Card3D tilt={false} className="p-4 mb-4"><textarea value={t} onChange={e=>setT(e.target.value)} rows={10} className="w-full bg-background border border-border rounded p-3 outline-none focus:border-primary" placeholder="Start typing or paste content…" /></Card3D>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {Object.entries({Words:m.words,Characters:m.chars,"No-space":m.noSpace,Sentences:m.sentences,Paragraphs:m.paragraphs,"Reading min":m.reading,"Speaking min":m.speaking}).map(([k,v])=>(
          <Card3D tilt={false} key={k} className="p-3 text-center"><div className="text-[10px] uppercase text-muted-foreground">{k}</div><div className="font-display text-xl font-bold grad-text">{v}</div></Card3D>
        ))}
      </div>
    </ToolPanel>
  );
}
