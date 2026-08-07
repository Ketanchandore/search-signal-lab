import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { readConsent, writeConsent } from "@/lib/analytics";

/**
 * GDPR/AdSense cookie consent banner. Analytics + ad storage default to
 * "denied" (set in __root scripts) until the visitor accepts here.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (readConsent() === null) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
    return;
  }, []);

  if (!show) return null;

  const decide = (v: "granted" | "denied") => {
    writeConsent(v);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed z-[60] bottom-16 md:bottom-4 inset-x-3 md:inset-x-auto md:right-4 md:max-w-md rounded-xl border border-border bg-surface/95 backdrop-blur p-4 shadow-2xl"
    >
      <p className="text-sm font-display font-semibold mb-1">We use cookies</p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        We use analytics cookies to understand which free tools people use, and advertising cookies to keep the tools free.
        You can decline and every tool still works.{" "}
        <Link to="/privacy" className="text-primary underline">
          Privacy policy
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => decide("granted")}
          className="flex-1 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold"
        >
          Accept
        </button>
        <button
          onClick={() => decide("denied")}
          className="flex-1 px-3 py-2 rounded-md border border-border text-sm font-medium hover:border-primary"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
