import { useEffect, useState } from "react";
import { readConsent } from "@/lib/analytics";

/**
 * Ad slots stay dormant until AdSense approval. Flip both env vars to enable:
 *   VITE_ADS_ENABLED=true
 *   VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 * Slot IDs are passed per placement.
 */
const ADS_ENABLED = import.meta.env["VITE_ADS_ENABLED"] === "true";
const ADSENSE_CLIENT = import.meta.env["VITE_ADSENSE_CLIENT"] as string | undefined;

export function adsAreEnabled() {
  return ADS_ENABLED && Boolean(ADSENSE_CLIENT);
}

type Props = {
  slot: string;
  placement?: "in-article" | "sidebar" | "leaderboard";
  className?: string;
};

export function AdSlot({ slot, placement = "in-article", className = "" }: Props) {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const on = (e: Event) => setConsent((e as CustomEvent).detail as string);
    window.addEventListener("sa:consent", on);
    return () => window.removeEventListener("sa:consent", on);
  }, []);

  useEffect(() => {
    if (!adsAreEnabled() || consent !== "granted") return;
    try {
      ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({});
    } catch {
      /* adsbygoogle not loaded */
    }
  }, [consent, slot]);

  if (!adsAreEnabled() || consent !== "granted") return null;

  const size =
    placement === "sidebar"
      ? { minHeight: 600 }
      : placement === "leaderboard"
        ? { minHeight: 90 }
        : { minHeight: 250 };

  return (
    <div className={`my-6 ${className}`} aria-label="Advertisement">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Advertisement</div>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", ...size }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={placement === "sidebar" ? "vertical" : "auto"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
