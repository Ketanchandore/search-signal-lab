import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ChatMessage = { id: string; role: "user" | "assistant"; content: string; created_at: string };

function validateAsk(input: unknown) {
  const d = input as { message?: unknown };
  if (typeof d.message !== "string" || !d.message.trim()) throw new Error("Message required");
  return { message: d.message.trim().slice(0, 4000) };
}

const SYSTEM = `You are the SEOAcademys AI SEO & GEO analyst.
You help users understand why their site is not appearing in Google AI Overviews, ChatGPT Search, Perplexity and classic Google results.
Rules:
- Be concrete and prioritised: list issues in order of impact, with the exact fix (code snippet where useful).
- When audit data is supplied below, base your answer on those real numbers and quote them.
- If a user asks about Search Console / GA4 / Bing metrics that are not in the context, say clearly what is connected and what is not, then give the best diagnosis from the crawl data you do have.
- Use short markdown sections and bullet lists. No fluff.`;

/** Full chat history for the signed-in user. */
export const listChat = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("chat_messages")
      .select("id, role, content, created_at")
      .order("created_at", { ascending: true })
      .limit(200);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as ChatMessage[];
  });

export const clearChat = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await context.supabase.from("chat_messages").delete().eq("user_id", context.userId);
    return { ok: true };
  });

/** Ask the assistant; answers using the user's latest audit run + connected property as context. */
export const askAssistant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validateAsk)
  .handler(async ({ data, context }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured");
    const { supabase, userId } = context;

    const [{ data: history }, { data: runs }, { data: conns }] = await Promise.all([
      supabase.from("chat_messages").select("role, content").order("created_at", { ascending: true }).limit(30),
      supabase.from("audit_runs").select("url, score, results, created_at").eq("status", "done").order("created_at", { ascending: false }).limit(1),
      supabase.from("data_connections").select("provider, property").eq("active", true),
    ]);

    const run = runs?.[0] as { url: string; score: number; results: { label: string; status: string; score: number; summary: string }[] } | undefined;
    const contextBlock = [
      conns?.length
        ? `Connected properties: ${conns.map((c) => `${c.provider} → ${c.property}`).join("; ")}`
        : "No analytics property connected yet.",
      run
        ? `Latest audit of ${run.url} (overall ${run.score}/100):\n${run.results.map((r) => `- ${r.label}: ${r.status.toUpperCase()} ${r.score}/100 — ${r.summary}`).join("\n")}`
        : "No completed audit run yet.",
    ].join("\n\n");

    await supabase.from("chat_messages").insert({ user_id: userId, role: "user", content: data.message });

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          { role: "system", content: `${SYSTEM}\n\n--- USER DATA CONTEXT ---\n${contextBlock}` },
          ...(history ?? []).map((m) => ({ role: m.role as string, content: m.content as string })),
          { role: "user", content: data.message },
        ],
      }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      console.error(`AI gateway failed [${resp.status}]: ${body}`);
      if (resp.status === 429) throw new Error("Rate limit reached — please try again in a moment.");
      if (resp.status === 402) throw new Error("AI credits exhausted. Add credits in your workspace settings.");
      throw new Error(`AI request failed (${resp.status})`);
    }

    const json = (await resp.json()) as { choices?: { message?: { content?: string } }[] };
    const answer = json.choices?.[0]?.message?.content?.trim() || "I couldn't generate an answer. Please try again.";
    await supabase.from("chat_messages").insert({ user_id: userId, role: "assistant", content: answer });
    return { answer };
  });
