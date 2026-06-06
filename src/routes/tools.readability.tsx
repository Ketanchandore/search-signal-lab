import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { fleschReadingEase, wordTokens } from "@/lib/html-analyzer";

export const Route = createFileRoute("/tools/readability")({
  head: () => ({ meta: [{ title: "Readability Checker — SEOAcademys" }] }),
  component: Page,
});

function Page() {
  const [text, setText] = useState("");
  const m = useMemo(() => {
    const words = wordTokens(text);
    const sentences = (text.match(/[.!?]+/g) || []).length || 1;
    const fre = fleschReadingEase(text);
    let grade = "Very easy";
    if (fre < 30) grade = "Very difficult (college graduate)";
    else if (fre < 50) grade = "Difficult (college)";
    else if (fre < 60) grade = "Fairly difficult (10-12th)";
    else if (fre < 70) grade = "Standard (8-9th grade)";
    else if (fre < 80) grade = "Fairly easy (7th grade)";
    else if (fre < 90) grade = "Easy (6th grade)";
    return { words: words.length, sentences, avgWord: (words.length/sentences).toFixed(1), fre, grade };
  }, [text]);
  return (
    <ToolPanel>
      <ToolHeader title="Readability Checker" desc="Flesch Reading Ease + grade level analysis." />
      <Card3D tilt={false} className="p-4 mb-4"><textarea value={text} onChange={e=>setText(e.target.value)} rows={8} placeholder="Paste your text…" className="w-full bg-background border border-border rounded p-3 outline-none focus:border-primary" /></Card3D>
      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="Words" v={m.words} />
        <Stat label="Sentences" v={m.sentences} />
        <Stat label="Words/sentence" v={m.avgWord} />
        <Stat label="Flesch score" v={m.fre} />
      </div>
      <Card3D tilt={false} className="p-4 mt-4"><div className="text-sm">Reading level: <span className="font-semibold">{m.grade}</span></div></Card3D>
    </ToolPanel>
  );
}
function Stat({label,v}:{label:string;v:string|number}){return <Card3D tilt={false} className="p-4 text-center"><div className="text-xs text-muted-foreground">{label}</div><div className="font-display text-2xl font-bold grad-text">{v}</div></Card3D>;}
