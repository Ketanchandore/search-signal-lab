import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageContainer } from "@/components/Layout";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";
import { Loader2, Plus, Globe, Trash2, LogOut, BarChart3, Search, Code2, Play, Bot, Link2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your SEO Dashboard | SEOAcademys" },
      { name: "description", content: "Manage your website projects, saved audits and rank tracking inside your free SEOAcademys dashboard." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Your SEO Dashboard | SEOAcademys" },
      { property: "og:description", content: "Manage your website projects, saved audits and rank tracking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Your SEO Dashboard | SEOAcademys" },
      { name: "twitter:description", content: "Manage your website projects and saved audits." },
    ],
  }),
  component: Dashboard,
});

type Project = { id: string; name: string; domain: string; created_at: string };

function Dashboard() {
  const { user } = useSession();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from("projects")
      .select("id, name, domain, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) toast.error(error.message);
        setProjects((data as Project[]) ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("projects")
      .insert({ name: name.trim(), domain: domain.trim(), user_id: user.id })
      .select("id, name, domain, created_at")
      .single();
    setSaving(false);
    if (error) return toast.error(error.message);
    setProjects((p) => [data as Project, ...p]);
    setName("");
    setDomain("");
    toast.success("Project added");
  }

  async function removeProject(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setProjects((p) => p.filter((x) => x.id !== id));
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <PageContainer>
      <div className="py-8 sm:py-12">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl sm:text-3xl font-bold">Your SEO Dashboard</h1>
            <p className="mt-1 truncate text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:border-primary hover:text-primary transition"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </header>

        <section className="mt-8 rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
          <h2 className="font-display font-bold text-lg">Add a website project</h2>
          <form onSubmit={addProject} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <input
              required
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Add
            </button>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="font-display font-bold text-lg mb-4">Your projects</h2>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Loading…</div>
          ) : projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects yet. Add your first website above.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {projects.map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 border border-primary/30">
                    <Globe className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{p.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{p.domain}</div>
                  </div>
                  <button onClick={() => removeProject(p.id)} aria-label="Delete project" className="shrink-0 text-muted-foreground hover:text-destructive transition">
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link to="/audit" className="rounded-xl border border-primary/40 bg-primary/5 p-5 hover:border-primary transition">
            <Play className="size-5 text-primary mb-2" />
            <div className="font-medium">Bulk Audit Runner</div>
            <div className="text-xs text-muted-foreground">Tick tools → Run → PDF report</div>
          </Link>
          <Link to="/assistant" className="rounded-xl border border-primary/40 bg-primary/5 p-5 hover:border-primary transition">
            <Bot className="size-5 text-primary mb-2" />
            <div className="font-medium">AI SEO Assistant</div>
            <div className="text-xs text-muted-foreground">Diagnose your site in chat</div>
          </Link>
          <Link to="/connections" className="rounded-xl border border-primary/40 bg-primary/5 p-5 hover:border-primary transition">
            <Link2 className="size-5 text-primary mb-2" />
            <div className="font-medium">Connected project</div>
            <div className="text-xs text-muted-foreground">GSC · GA4 · Bing</div>
          </Link>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          <Link to="/tools/ai-citation-audit" className="rounded-xl border border-border bg-surface/50 p-5 hover:border-primary transition">
            <Search className="size-5 text-primary mb-2" />
            <div className="font-medium">Run AI Citation Audit</div>
          </Link>
          <Link to="/tools/rank-tracker" className="rounded-xl border border-border bg-surface/50 p-5 hover:border-primary transition">
            <BarChart3 className="size-5 text-primary mb-2" />
            <div className="font-medium">Track rankings</div>
          </Link>
          <Link to="/tools/schema-generator" className="rounded-xl border border-border bg-surface/50 p-5 hover:border-primary transition">
            <Code2 className="size-5 text-primary mb-2" />
            <div className="font-medium">Generate schema</div>
          </Link>
        </section>
      </div>
    </PageContainer>
  );
}
