import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, Search, Code2, FileText, BarChart3, Github, LayoutDashboard, LogIn, Sparkles } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/seoacademys-logo.png.asset.json";
import { useSession } from "@/hooks/use-session";
import { CookieConsent } from "@/components/CookieConsent";

export function Layout() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const loc = useLocation();
  const { user } = useSession();


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <img
              src={logoAsset.url}
              alt="SEOAcademys logo"
              width={28}
              height={28}
              className="size-7 rounded-md shrink-0"
              loading="eager"
            />
            <span><span className="text-primary">SEO</span>Academys</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <Link to="/tools" className="px-3 py-2 hover:text-primary transition">Tools ▾</Link>
              {toolsOpen && (
                <div className="absolute top-full left-0 w-64 bg-surface border border-border rounded-md p-2 shadow-xl">
                  <NavTool to="/tools" label="Dashboard" />
                  <NavTool to="/tools/ai-citation-audit" label="AI Citation Audit" />
                  <NavTool to="/tools/keyword-research" label="Keyword Research" />
                  <NavTool to="/tools/serp-preview" label="SERP Preview" />
                  <NavTool to="/tools/schema-generator" label="Schema & llms.txt" />
                  <NavTool to="/tools/meta-generator" label="Meta Tag Generator" />
                  <NavTool to="/tools/robots-txt" label="Robots.txt Builder" />
                  <NavTool to="/tools/content-checker" label="Content Readiness" />
                  <NavTool to="/tools/geo-tracker" label="GEO Market Intel" />
                  <NavTool to="/tools/backlink-checker" label="Backlink Checker" />
                </div>
              )}
            </div>
            <Link to="/learn" className="px-3 py-2 hover:text-primary transition">Learn</Link>
            <Link to="/blog" className="px-3 py-2 hover:text-primary transition">Blog</Link>
            <Link to="/about" className="px-3 py-2 hover:text-primary transition">About</Link>
            <Link to="/contact" className="px-3 py-2 hover:text-primary transition">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-border hover:border-primary hover:text-primary transition"
            >
              <Github className="size-4" /> Star on GitHub
            </a>
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium"
              >
                <LayoutDashboard className="size-4" /> Dashboard
              </Link>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-border hover:border-primary hover:text-primary transition"
              >
                <LogIn className="size-4" /> Sign in
              </Link>
            )}
          </div>
        </div>
      </header>


      <main className="flex-1 pb-20 md:pb-8">
        <Outlet />
      </main>

      <footer className="border-t border-border mt-12 pb-20 md:pb-0">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-base">
              <Sparkles className="size-4 text-primary" />
              <span><span className="text-primary">SEO</span>Academys</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">Free SEO + GEO toolkit trusted by 2.4M+ marketers. 37 real-time tools. No signup.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">SEO Audit</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/tools/seo-audit" className="hover:text-primary">Full SEO Audit</Link></li>
              <li><Link to="/tools/meta-tag-checker" className="hover:text-primary">Meta Tag Checker</Link></li>
              <li><Link to="/tools/heading-checker" className="hover:text-primary">Heading Structure</Link></li>
              <li><Link to="/tools/schema-validator" className="hover:text-primary">Schema Validator</Link></li>
              <li><Link to="/tools/mobile-checker" className="hover:text-primary">Mobile-Friendly</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Research</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/tools/keyword-research" className="hover:text-primary">Keyword Research</Link></li>
              <li><Link to="/tools/rank-tracker" className="hover:text-primary">Rank Tracker</Link></li>
              <li><Link to="/tools/backlink-checker" className="hover:text-primary">Backlink Checker</Link></li>
              <li><Link to="/tools/serp-preview" className="hover:text-primary">SERP Preview</Link></li>
              <li><Link to="/tools/ai-citation-audit" className="hover:text-primary">AI Citation Audit</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Learn</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/tools" className="hover:text-primary">All 37 Tools</Link></li>
              <li><Link to="/learn" className="hover:text-primary">SEO Learn Hub</Link></li>
              <li><Link to="/tools/schema-generator" className="hover:text-primary">Schema & llms.txt</Link></li>
              <li><Link to="/tools/robots-txt" className="hover:text-primary">Robots.txt Builder</Link></li>
              <li><Link to="/tools/geo-tracker" className="hover:text-primary">GEO Market Intel</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary">How It Works</Link></li>
              <li><Link to="/changelog" className="hover:text-primary">Changelog</Link></li>
              <li><Link to="/api-docs" className="hover:text-primary">API</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground py-4 border-t border-border px-4">
          © {new Date().getFullYear()} SEOAcademys · Free SEO + GEO Tools · Last Updated: June 2026
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

      <CookieConsent />
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
