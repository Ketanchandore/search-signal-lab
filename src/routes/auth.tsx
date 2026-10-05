import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PageContainer } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2, Loader2, LogIn, UserPlus } from "lucide-react";

const TITLE = "Sign In / Create Free Account | SEOAcademys";
const DESC = "Create a free SEOAcademys account to save projects, track rankings, and connect Google Search Console, GA4 and Bing Webmaster to your SEO dashboard.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "error" | "success"; message: string } | null>(null);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data, error }) => {
      if (active && !error && data.session) navigate({ to: "/dashboard", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (active && event === "SIGNED_IN" && session) navigate({ to: "/dashboard", replace: true });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setFeedback(null);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setFeedback({ kind: "success", message: "Account created. Check your email and follow the confirmation link before signing in." });
          return;
        }
        await navigate({ to: "/dashboard", replace: true });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) await navigate({ to: "/dashboard", replace: true });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Authentication failed. Please try again.";
      setFeedback({ kind: "error", message: friendlyAuthError(message) });
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setFeedback(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.redirected) return;
      if (result.error) throw result.error;
      await navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign-in failed. Please try again.";
      setFeedback({ kind: "error", message: friendlyAuthError(message) });
      setBusy(false);
    }
  }

  async function handlePasswordReset() {
    if (!email.trim()) {
      setFeedback({ kind: "error", message: "Enter your email address first." });
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetSent(true);
      setFeedback({ kind: "success", message: "If an account exists for that email, a password reset link is on its way." });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not send a reset link. Please try again.";
      setFeedback({ kind: "error", message: friendlyAuthError(message) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageContainer>
      <div className="max-w-md mx-auto py-10 sm:py-16">
        <h1 className="font-display text-3xl font-bold text-center">
          {mode === "signin" ? "Welcome back" : "Create your free account"}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Save projects, track rankings and run bulk SEO audits — free forever.
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogle}
          disabled={busy}
          className="mt-7 h-12 w-full"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <span aria-hidden="true" className="font-bold">G</span>}
          Continue with Google
        </Button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or use email <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          {mode === "signup" && (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              aria-label="Your name"
              required
              placeholder="Your name"
            />
          )}
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-label="Email address"
            placeholder="you@company.com"
          />
          <Input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            aria-label="Password"
            placeholder="Password (min 6 characters)"
          />
          {mode === "signin" && (
            <div className="flex justify-end">
              <Button type="button" variant="link" size="sm" className="h-auto px-0" onClick={handlePasswordReset} disabled={busy || resetSent}>
                {resetSent ? "Reset link requested" : "Forgot password?"}
              </Button>
            </div>
          )}
          {feedback && (
            <div
              role={feedback.kind === "error" ? "alert" : "status"}
              className={`flex items-start gap-2 rounded-md border px-3 py-2.5 text-sm ${feedback.kind === "error" ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-success/30 bg-success/5 text-foreground"}`}
            >
              {feedback.kind === "error" ? <AlertCircle className="mt-0.5 size-4 shrink-0" /> : <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />}
              <span>{feedback.message}</span>
            </div>
          )}
          <Button
            type="submit"
            disabled={busy}
            className="h-12 w-full"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : mode === "signin" ? <LogIn className="size-4" /> : <UserPlus className="size-4" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 font-medium"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setFeedback(null);
              setResetSent(false);
            }}
          >
            {mode === "signin" ? "Create a free account" : "Sign in"}
          </Button>
        </p>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our <Link to="/terms" className="hover:text-primary underline">Terms</Link> and{" "}
          <Link to="/privacy" className="hover:text-primary underline">Privacy Policy</Link>.
        </p>
      </div>
    </PageContainer>
  );
}

function friendlyAuthError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) return "Email or password is incorrect.";
  if (normalized.includes("email not confirmed")) return "Please confirm your email from the link we sent before signing in.";
  if (normalized.includes("user already registered")) return "An account already exists with this email. Try signing in instead.";
  if (normalized.includes("password should be at least")) return "Choose a longer password and try again.";
  if (normalized.includes("rate limit")) return "Too many attempts. Please wait a few minutes and try again.";
  if (normalized.includes("failed to fetch") || normalized.includes("network")) return "Could not reach the account service. Check your connection and try again.";
  return message;
}
