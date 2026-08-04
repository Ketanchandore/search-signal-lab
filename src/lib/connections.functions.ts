import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type DataConnection = { id: string; provider: string; property: string; active: boolean; created_at: string };

export const PROVIDERS = [
  { id: "gsc", label: "Google Search Console" },
  { id: "ga4", label: "Google Analytics 4" },
  { id: "bing", label: "Bing Webmaster Tools" },
] as const;

function validateConnect(input: unknown) {
  const d = input as { provider?: unknown; property?: unknown };
  const provider = String(d.provider ?? "");
  if (!PROVIDERS.some((p) => p.id === provider)) throw new Error("Unknown provider");
  const property = String(d.property ?? "").trim();
  if (!property) throw new Error("Property (domain or measurement ID) is required");
  return { provider, property: property.slice(0, 300) };
}

export const listConnections = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("data_connections")
      .select("id, provider, property, active, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as DataConnection[];
  });

/** Connect one property. Only one project can be active at a time. */
export const connectProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validateConnect)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase.from("data_connections").select("id").eq("active", true).maybeSingle();
    if (existing) throw new Error("Disconnect the current project before connecting another one.");
    const { data: row, error } = await supabase
      .from("data_connections")
      .insert({ user_id: userId, provider: data.provider, property: data.property, active: true })
      .select("id, provider, property, active, created_at")
      .single();
    if (error) throw new Error(error.message);
    return row as unknown as DataConnection;
  });

export const disconnectProperty = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => {
    const id = (input as { id?: unknown }).id;
    if (typeof id !== "string") throw new Error("id required");
    return { id };
  })
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("data_connections").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
