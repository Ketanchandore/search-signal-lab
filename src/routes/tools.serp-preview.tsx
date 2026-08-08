import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useState } from "react";
import { Globe, Smartphone, Monitor } from "lucide-react";
import { Card3D, ToolHeader } from "@/components/Card3D";
import { ToolPanel } from "./tools";

export const Route = createFileRoute("/tools/serp-preview")({
  head: () => toolHead("serp-preview"),
  component: SerpPreview,
});

const TITLE_LIMIT_PX = 580;
const DESC_LIMIT_PX = 920;

function approxWidth(s: string, fontSize = 18) {
  // rough heuristic — average glyph width ~ 0.52em
  return s.length * fontSize * 0.52;
}

function SerpPreview() {
  const [url, setUrl] = useState("https://yourwebsite.com/best-tools");
  const [title, setTitle] = useState("10 Best AI SEO Tools in 2026 (Free & Paid Comparison)");
  const [desc, setDesc] = useState("Compare the top AI-powered SEO tools for 2026. We tested 30+ platforms across pricing, features, and citation accuracy.");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const titleW = approxWidth(title, device === "desktop" ? 20 : 16);
  const descW = approxWidth(desc, 14);
  const titleOver = titleW > TITLE_LIMIT_PX;
  const descOver = descW > DESC_LIMIT_PX;

  const truncT = titleOver ? title.slice(0, Math.floor((TITLE_LIMIT_PX / (device === "desktop" ? 20 : 16)) / 0.52) - 1) + "…" : title;
  const truncD = descOver ? desc.slice(0, Math.floor(DESC_LIMIT_PX / 14 / 0.52) - 1) + "…" : desc;

  const breadcrumb = (() => {
    try { return new URL(url).host + new URL(url).pathname.replace(/\/$/, "").replace(/\//g, " › "); }
    catch { return url; }
  })();

  return (
    <ToolPanel>
      <ToolHeader title="Google SERP Preview" badge="LIVE PREVIEW" desc="See exactly how your page snippet looks in Google search — desktop and mobile. Updates as you type." />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card3D tilt={false} className="p-6 space-y-4">
          <Field label="Page URL" value={url} onChange={setUrl} />
          <Field label={`Title Tag (${title.length} chars · ${Math.round(titleW)}px)`} value={title} onChange={setTitle} warn={titleOver} hint="Google truncates ~580px on desktop, ~480px mobile" />
          <Field label={`Meta Description (${desc.length} chars · ${Math.round(descW)}px)`} value={desc} onChange={setDesc} warn={descOver} hint="Google shows ~155-160 chars" textarea />

          <div className="flex items-center gap-2 pt-2">
            <button onClick={() => setDevice("desktop")} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border ${device === "desktop" ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground"}`}>
              <Monitor className="size-3.5" /> Desktop
            </button>
            <button onClick={() => setDevice("mobile")} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border ${device === "mobile" ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground"}`}>
              <Smartphone className="size-3.5" /> Mobile
            </button>
          </div>
        </Card3D>

        <div className="space-y-4">
          <div className={`rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-3d)] ${device === "mobile" ? "max-w-sm" : ""}`}>
            <div className="flex items-center gap-2 text-xs text-[#5f6368] mb-1">
              <div className="size-6 rounded-full bg-[#f1f3f4] flex items-center justify-center"><Globe className="size-3" /></div>
              <div>
                <div className="text-[#202124]">{(() => { try { return new URL(url).host; } catch { return "yoursite.com"; }})()}</div>
                <div className="text-[11px]">{breadcrumb}</div>
              </div>
            </div>
            <h3 className={`font-normal text-[#1a0dab] hover:underline cursor-pointer ${device === "desktop" ? "text-xl" : "text-base"} leading-snug mt-1`}>
              {truncT}
            </h3>
            <p className="text-sm text-[#4d5156] leading-snug mt-1">{truncD}</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h4 className="font-semibold text-sm mb-3">SEO Health Check</h4>
            <ul className="space-y-2 text-sm">
              <Check ok={title.length >= 30 && title.length <= 60} text={`Title length (${title.length}) — ideal 30–60 chars`} />
              <Check ok={!titleOver} text="Title fits in Google SERP width" />
              <Check ok={desc.length >= 120 && desc.length <= 160} text={`Description length (${desc.length}) — ideal 120–160 chars`} />
              <Check ok={!descOver} text="Description fits in Google SERP width" />
              <Check ok={/^https:\/\//.test(url)} text="URL uses HTTPS" />
              <Check ok={title.toLowerCase().includes(desc.split(" ")[0]?.toLowerCase() || "")} text="Title keyword echoed in description" />
            </ul>
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}

function Check({ ok, text }: { ok: boolean; text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className={`mt-0.5 size-4 rounded-full inline-flex items-center justify-center text-[10px] text-white ${ok ? "bg-success" : "bg-destructive"}`}>{ok ? "✓" : "!"}</span>
      <span className={ok ? "text-foreground" : "text-muted-foreground"}>{text}</span>
    </li>
  );
}

function Field({ label, value, onChange, warn, hint, textarea }: { label: string; value: string; onChange: (v: string) => void; warn?: boolean; hint?: string; textarea?: boolean }) {
  return (
    <div>
      <label className={`text-sm font-medium block mb-1.5 ${warn ? "text-destructive" : ""}`}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={`w-full px-3 py-2 rounded-md bg-background border outline-none transition ${warn ? "border-destructive" : "border-border focus:border-primary"}`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={`w-full px-3 py-2 rounded-md bg-background border outline-none transition ${warn ? "border-destructive" : "border-border focus:border-primary"}`} />
      )}
      {hint && <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}
