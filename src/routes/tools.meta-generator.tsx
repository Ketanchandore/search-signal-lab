import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card3D, ToolHeader } from "@/components/Card3D";
import { ToolPanel } from "./tools";

export const Route = createFileRoute("/tools/meta-generator")({
  head: () => toolHead("meta-generator") — SEOAcademys" },
      { name: "description", content: "Generate complete SEO meta tags, Open Graph, and Twitter Card HTML instantly. Free." },
    ],
    links: [{ rel: "canonical", href: "/tools/meta-generator" }],
  }),
  component: MetaGen,
});

function MetaGen() {
  const [title, setTitle] = useState("My Awesome Page");
  const [desc, setDesc] = useState("A short, compelling description of this page (120–160 chars).");
  const [url, setUrl] = useState("https://example.com/page");
  const [image, setImage] = useState("https://example.com/og-image.png");
  const [author, setAuthor] = useState("");
  const [twitter, setTwitter] = useState("@yourhandle");
  const [type, setType] = useState("website");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => {
    const lines = [
      `<title>${title}</title>`,
      `<meta name="description" content="${desc}" />`,
      url && `<link rel="canonical" href="${url}" />`,
      author && `<meta name="author" content="${author}" />`,
      `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
      ``,
      `<!-- Open Graph -->`,
      `<meta property="og:type" content="${type}" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${desc}" />`,
      url && `<meta property="og:url" content="${url}" />`,
      image && `<meta property="og:image" content="${image}" />`,
      ``,
      `<!-- Twitter Card -->`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${desc}" />`,
      image && `<meta name="twitter:image" content="${image}" />`,
      twitter && `<meta name="twitter:site" content="${twitter}" />`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [title, desc, url, image, author, twitter, type]);

  const copy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolPanel>
      <ToolHeader title="Meta Tag Generator" badge="LIVE OUTPUT" desc="Fill the fields — get production-ready HTML meta + Open Graph + Twitter Card tags." />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card3D tilt={false} className="p-6 space-y-4">
          <F label={`Title (${title.length}/60)`} value={title} on={setTitle} />
          <F label={`Description (${desc.length}/160)`} value={desc} on={setDesc} ta />
          <F label="Canonical URL" value={url} on={setUrl} />
          <F label="OG / Twitter Image URL (1200×630)" value={image} on={setImage} />
          <div className="grid grid-cols-2 gap-3">
            <F label="Author" value={author} on={setAuthor} />
            <F label="Twitter Handle" value={twitter} on={setTwitter} />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">OG Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 rounded-md bg-background border border-border outline-none focus:border-primary">
              {["website", "article", "product", "profile", "video.other"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </Card3D>

        <div className="rounded-xl border border-border bg-[#0b1020] text-emerald-200 overflow-hidden shadow-[var(--shadow-3d)]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red-400/70" />
              <span className="size-2.5 rounded-full bg-yellow-400/70" />
              <span className="size-2.5 rounded-full bg-green-400/70" />
            </div>
            <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white">
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />} {copied ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono leading-relaxed overflow-auto max-h-[640px] whitespace-pre-wrap">{html}</pre>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">Paste this into your <code className="px-1 py-0.5 bg-secondary rounded">&lt;head&gt;</code> tag. Image should be 1200×630px PNG or JPG &lt; 5MB.</p>
    </ToolPanel>
  );
}

function F({ label, value, on, ta }: { label: string; value: string; on: (v: string) => void; ta?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      {ta
        ? <textarea value={value} onChange={(e) => on(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-md bg-background border border-border outline-none focus:border-primary" />
        : <input value={value} onChange={(e) => on(e.target.value)} className="w-full px-3 py-2 rounded-md bg-background border border-border outline-none focus:border-primary" />}
    </div>
  );
}
