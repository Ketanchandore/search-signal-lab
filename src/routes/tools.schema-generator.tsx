import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { AffiliateBar, PageContainer } from "@/components/Layout";
import { useMemo, useState } from "react";
import { Copy, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/tools/schema-generator")({
  head: () => toolHead("schema-generator"),
  component: SchemaTool,
});

const COUNTRIES = ["India", "USA", "UK", "Canada", "Australia", "Global"];

function SchemaTool() {
  const [name, setName] = useState("Acme Corp");
  const [url, setUrl] = useState("https://acme.com");
  const [type, setType] = useState("SaaS");
  const [year, setYear] = useState("2020");
  const [wiki, setWiki] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [products, setProducts] = useState("project management, team collaboration");
  const [primary, setPrimary] = useState("project management");
  const [secondary, setSecondary] = useState("team collaboration, productivity, workflow automation");
  const [countries, setCountries] = useState<string[]>(["Global"]);
  const [tab, setTab] = useState<"json" | "txt">("json");
  const [step, setStep] = useState(1);

  const json = useMemo(() => {
    const obj = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${url}/#organization`,
      name,
      url,
      foundingDate: year,
      sameAs: [linkedin, twitter, wiki].filter(Boolean),
      knowsAbout: [primary, ...secondary.split(",").map((s) => s.trim()).filter(Boolean)],
      areaServed: countries,
      hasOfferCatalog: { "@type": "OfferCatalog", name: products },
    };
    return JSON.stringify(obj, null, 2);
  }, [name, url, year, linkedin, twitter, wiki, primary, secondary, countries, products]);

  const txt = useMemo(() => `# ${name} - llms.txt
# AI Crawler Instructions & Entity Declaration

> ${name} is a ${type} focused on ${primary}.

## About
${name} provides ${products}.
Founded: ${year} | URL: ${url}

## Key Topics
- ${primary}
${secondary.split(",").map((s) => `- ${s.trim()}`).filter((s) => s !== "- ").join("\n")}

## Verified Profiles
${[linkedin, twitter, wiki].filter(Boolean).map((p) => `- ${p}`).join("\n")}

## Permissions
User-agent: GPTBot
Allow: /

User-agent: GoogleExtended
Allow: /

User-agent: PerplexityBot
Allow: /
`, [name, type, primary, products, year, url, secondary, linkedin, twitter, wiki]);

  const copy = (text: string) => navigator.clipboard.writeText(text);

  const toggleCountry = (c: string) =>
    setCountries((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  return (
    <PageContainer>
      <AffiliateBar />
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Schema 2.0 & llms.txt Generator</h1>
        <span className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground font-semibold">FREE · NO SIGNUP</span>
      </div>
      <p className="text-muted-foreground mb-8">Three quick steps. Output updates live.</p>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <button key={s} onClick={() => setStep(s)} className={`flex-1 text-xs py-2 rounded-md border ${step === s ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"}`}>
                Step {s}: {["Organization", "Entity Signals", "Knowledge Areas"][s - 1]}
              </button>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <Field label="Business Legal Name" value={name} onChange={setName} />
              <Field label="Website URL" value={url} onChange={setUrl} placeholder="https://yourwebsite.com" />
              <div>
                <label className="text-sm font-medium block mb-2">Business Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 rounded-md bg-background border border-border outline-none focus:border-primary">
                  {["E-commerce", "SaaS", "Blog", "Agency", "Healthcare", "Finance", "Other"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Field label="Founded Year" value={year} onChange={setYear} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Field label="Wikipedia/Wikidata URL" value={wiki} onChange={setWiki} placeholder="https://wikidata.org/wiki/Q..." />
              <Field label="LinkedIn Company URL" value={linkedin} onChange={setLinkedin} />
              <Field label="Twitter/X Handle URL" value={twitter} onChange={setTwitter} />
              <div>
                <label className="text-sm font-medium block mb-2">Core Products/Services (comma-separated)</label>
                <textarea value={products} onChange={(e) => setProducts(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-md bg-background border border-border outline-none focus:border-primary" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Field label="Primary Topic" value={primary} onChange={setPrimary} placeholder="cloud hosting" />
              <Field label="Secondary Topics (comma-separated)" value={secondary} onChange={setSecondary} />
              <div>
                <label className="text-sm font-medium block mb-2">Target Countries</label>
                <div className="grid grid-cols-2 gap-2">
                  {COUNTRIES.map((c) => (
                    <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={countries.includes(c)} onChange={() => toggleCountry(c)} className="accent-primary" />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setStep((s) => Math.min(3, s + 1))} className="mt-6 w-full py-3 rounded-md bg-primary text-primary-foreground font-medium">
            {step < 3 ? "Next Step →" : "Generate Schema & llms.txt"}
          </button>
        </div>

        <div className="rounded-xl border border-border bg-surface-2 shadow-[var(--shadow-3d)] p-1 flex flex-col">
          <div className="flex border-b border-border">
            {(["json", "txt"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-mono ${tab === t ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
                {t === "json" ? "JSON-LD Schema" : "llms.txt"}
              </button>
            ))}
          </div>
          <pre className="flex-1 overflow-auto p-4 text-xs font-mono text-foreground max-h-[500px] whitespace-pre-wrap">
            {tab === "json" ? json : txt}
          </pre>
          <div className="flex flex-wrap gap-2 p-3 border-t border-border">
            <button onClick={() => copy(json)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-xs hover:border-primary hover:text-primary">
              <Copy className="size-3" /> Copy JSON-LD
            </button>
            <button onClick={() => copy(txt)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-xs hover:border-primary hover:text-primary">
              <Copy className="size-3" /> Copy llms.txt
            </button>
            <a href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-xs hover:border-primary hover:text-primary">
              <ExternalLink className="size-3" /> Test in Google Rich Results
            </a>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-2">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 rounded-md bg-background border border-border outline-none focus:border-primary" />
    </div>
  );
}
