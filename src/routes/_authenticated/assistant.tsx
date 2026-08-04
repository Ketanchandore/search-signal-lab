import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageContainer } from "@/components/Layout";
import { askAssistant, listChat, clearChat, type ChatMessage } from "@/lib/assistant.functions";
import { toast } from "sonner";
import { Loader2, Send, Trash2, Bot, User } from "lucide-react";

export const Route = createFileRoute("/_authenticated/assistant")({
  head: () => ({
    meta: [
      { title: "AI SEO Assistant | SEOAcademys" },
      { name: "description", content: "Ask the SEOAcademys AI analyst about your site: what is broken, what to fix first, and how to earn AI Overview citations." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "AI SEO Assistant | SEOAcademys" },
      { property: "og:description", content: "Diagnose your site with an AI SEO & GEO analyst." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI SEO Assistant | SEOAcademys" },
      { name: "twitter:description", content: "Diagnose your site with an AI SEO & GEO analyst." },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  const ask = useServerFn(askAssistant);
  const load = useServerFn(listChat);
  const wipe = useServerFn(clearChat);
  const [messages, setMessages] = useState<Pick<ChatMessage, "role" | "content">[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { load().then((m) => setMessages(m)).catch(() => undefined); }, [load]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, busy]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const { answer } = await ask({ data: { message: text } });
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Assistant failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageContainer>
      <div className="py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">AI SEO Assistant</h1>
            <p className="mt-1 text-sm text-muted-foreground">It reads your latest audit run and connected property, then tells you what to fix first.</p>
          </div>
          <button
            onClick={async () => { await wipe(); setMessages([]); }}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:border-primary hover:text-primary"
          >
            <Trash2 className="size-4" /> Clear
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-surface/50 p-4 min-h-[45vh]">
          {messages.length === 0 && !busy && (
            <div className="grid gap-2 text-sm text-muted-foreground">
              <p>Try one of these:</p>
              {["Why is my site not showing in Google AI Overviews?", "Explain my last audit and give me a fix list in priority order.", "What schema should I add to get cited by Perplexity?"].map((q) => (
                <button key={q} onClick={() => setInput(q)} className="text-left rounded-lg border border-border bg-background px-3 py-2 hover:border-primary">{q}</button>
              ))}
            </div>
          )}
          <div className="grid gap-4">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-background">
                  {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4 text-primary" />}
                </div>
                <div className="min-w-0 flex-1 whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
              </div>
            ))}
            {busy && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Analysing…</div>}
            <div ref={endRef} />
          </div>
        </div>

        <form onSubmit={send} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your site's SEO, GEO or audit results…"
            className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
            <Send className="size-4" /> Send
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
