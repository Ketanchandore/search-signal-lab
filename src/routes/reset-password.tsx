import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageContainer } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TITLE = "Reset Your Password | SEOAcademys";
const DESC = "Set a new password for your SEOAcademys account.";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "error" | "success"; message: string } | null>(null);

  useEffect(() => {
    const searchType = new URLSearchParams(window.location.search).get("type");
    const hashType = new URLSearchParams(window.location.hash.slice(1)).get("type");
    if (searchType === "recovery" || hashType === "recovery") setRecoveryReady(true);

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecoveryReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setFeedback({ kind: "success", message: "Your password has been updated. You can sign in with the new password now." });
      setPassword("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not update your password. Request a fresh reset link and try again.";
      setFeedback({ kind: "error", message: message.toLowerCase().includes("password") ? message : "Your reset link may have expired. Request a new one and try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageContainer>
      <section className="mx-auto max-w-md py-12 sm:py-16">
        <div className="mb-6 flex justify-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LockKeyhole className="size-5" />
          </div>
        </div>
        <h1 className="text-center font-display text-3xl font-bold">Set a new password</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Choose a new password for your SEOAcademys account.</p>

        {!recoveryReady ? (
          <div role="alert" className="mt-7 rounded-md border border-border bg-surface p-4 text-center text-sm text-muted-foreground">
            This reset link is missing or expired. <Link to="/auth" className="font-medium text-primary underline">Request a new link</Link>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <Input
              type="password"
              autoComplete="new-password"
              aria-label="New password"
              placeholder="New password (at least 8 characters)"
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {feedback && (
              <div
                role={feedback.kind === "error" ? "alert" : "status"}
                className={`flex items-start gap-2 rounded-md border px-3 py-2.5 text-sm ${feedback.kind === "error" ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-success/30 bg-success/5 text-foreground"}`}
              >
                {feedback.kind === "error" ? <AlertCircle className="mt-0.5 size-4 shrink-0" /> : <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />}
                <span>{feedback.message}</span>
              </div>
            )}
            <Button type="submit" disabled={busy} className="h-11 w-full">
              {busy && <Loader2 className="size-4 animate-spin" />}
              Update password
            </Button>
            {feedback?.kind === "success" && (
              <div className="text-center">
                <Button type="button" variant="link" onClick={() => navigate({ to: "/auth", replace: true })}>
                  Back to sign in
                </Button>
              </div>
            )}
          </form>
        )}
      </section>
    </PageContainer>
  );
}