/**
 * GA4 event helpers. All calls are no-ops when gtag is unavailable
 * (SSR, ad-blockers) or when the visitor has declined analytics consent.
 */

type GtagArgs = [command: string, ...rest: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

export const CONSENT_KEY = "sa_consent_v1";

export type ConsentValue = "granted" | "denied";

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage blocked */
  }
  window.gtag?.("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
  window.dispatchEvent(new CustomEvent("sa:consent", { detail: value }));
}

function send(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (readConsent() === "denied") return;
  window.gtag?.("event", event, params);
}

/** Fired when a user runs any tool. */
export function trackToolRun(tool: string, params: Record<string, unknown> = {}) {
  send("tool_run", { tool_name: tool, ...params });
}

/** Fired on a successful run, with the resulting score where available. */
export function trackToolResult(tool: string, params: Record<string, unknown> = {}) {
  send("tool_result", { tool_name: tool, ...params });
}

/** Fired when a report is exported. */
export function trackExport(tool: string, format: "pdf" | "csv" | "json" | "copy", params: Record<string, unknown> = {}) {
  send("export_report", { tool_name: tool, file_format: format, ...params });
}

/** Fired when a tool fails. */
export function trackToolError(tool: string, message: string) {
  send("tool_error", { tool_name: tool, error_message: message.slice(0, 120) });
}

/** Manual SPA page_view (router sends one per navigation). */
export function trackPageView(path: string, title?: string) {
  send("page_view", { page_path: path, page_title: title ?? (typeof document !== "undefined" ? document.title : undefined) });
}
