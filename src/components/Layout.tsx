import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, Search, Code2, FileText, BarChart3, BookOpen, Github, Sparkles } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const loc = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <Sparkles className="size-5 text-primary" />
            <span><span className="text-primary">SEO</span>Academys</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className="px-3 py-2 hover:text-primary transition">Tools ▾</button>
              {toolsOpen && (
                <div className="absolute top-full left-0 w-64 bg-surface border border-border rounded-md p-2 shadow-xl">
                  <NavTool to="/tools/ai-citation-audit" label="AI Citation Audit" />
                  <NavTool to="/tools/schema-generator" label="Schema & llms.txt Generator" />
                  <NavTool to="/tools/content-checker" label="Content Readiness Checker" />
                  <NavTool to="/tools/geo-tracker" label="GEO Market Intelligence" />
                </div>
              )}
            </div>
            <Link to="/learn" className="px-3 py-2 hover:text-primary transition">Learn</Link>
            <Link to="/tools/geo-tracker" className="px-3 py-2 hover:text-primary transition">GEO Tracker</Link>
          </nav>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-border hover:border-primary hover:text-primary transition"
          >
            <Github className="size-4" /> Star on GitHub
          </a>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-8">
        <Outlet />
      </main>

      <footer className="border-t border-border mt-12 hidden md:block">
        <div className="max-w-[1280px] mx-auto px-6 py-10 grid grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-display font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/tools/ai-citation-audit" className="hover:text-primary">AI Citation Audit</Link></li>
              <li><Link to="/tools/schema-generator" className="hover:text-primary">Schema Generator</Link></li>
              <li><Link to="/tools/content-checker" className="hover:text-primary">Content Checker</Link></li>
              <li><Link to="/tools/geo-tracker" className="hover:text-primary">GEO Tracker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Learn</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/learn" className="hover:text-primary">All Modules</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">About</h4>
            <p className="text-muted-foreground">
              Built to make GEO open and accessible. Not affiliated with Google, OpenAI, or Perplexity.
            </p>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground py-4 border-t border-border">
          © {new Date().getFullYear()} SEOAcademys
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border">
        <div className="grid grid-cols-5 text-[10px]">
          <BottomTab to="/" icon={<Home className="size-5" />} label="Home" active={loc.pathname === "/"} />
          <BottomTab to="/tools/ai-citation-audit" icon={<Search className="size-5" />} label="Audit" active={loc.pathname.includes("audit")} />
          <BottomTab to="/tools/schema-generator" icon={<Code2 className="size-5" />} label="Schema" active={loc.pathname.includes("schema")} />
          <BottomTab to="/tools/content-checker" icon={<FileText className="size-5" />} label="Checker" active={loc.pathname.includes("checker")} />
          <BottomTab to="/tools/geo-tracker" icon={<BarChart3 className="size-5" />} label="Tracker" active={loc.pathname.includes("tracker")} />
        </div>
      </nav>
    </div>
  );
}

function NavTool({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="block px-3 py-2 rounded hover:bg-secondary text-sm">
      {label}
    </Link>
  );
}

function BottomTab({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link to={to} className={`flex flex-col items-center gap-1 py-2 ${active ? "text-primary" : "text-muted-foreground"}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">{children}</div>;
}

export function AffiliateBar() {
  return (
    <div className="bg-surface border border-border rounded-md px-4 py-2 text-xs text-muted-foreground mb-6">
      Need full real-time AI citation monitoring? <a className="text-primary hover:underline" href="#">Try Profound or Goodie AI →</a>
    </div>
  );
}
