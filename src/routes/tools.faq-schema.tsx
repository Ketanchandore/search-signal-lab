import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useMemo, useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { Copy, Plus, Trash2 } from "lucide-react";

type SchemaKind = "faq" | "product" | "article" | "breadcrumb";

const TITLES: Record<SchemaKind, string> = {
  faq: "FAQ Schema Generator",
  product: "Product Schema Generator",
  article: "Article Schema Generator",
  breadcrumb: "Breadcrumb Schema Generator",
};

export function SchemaBuilder({ kind }: { kind: SchemaKind }) {
  const [faqs, setFaqs] = useState([{ q: "", a: "" }]);
  const [product, setProduct] = useState({ name: "", description: "", image: "", brand: "", price: "", currency: "USD", sku: "" });
  const [article, setArticle] = useState({ headline: "", author: "", image: "", datePublished: new Date().toISOString().slice(0,10), description: "" });
  const [crumbs, setCrumbs] = useState([{ name: "Home", url: "https://example.com/" }]);

  const jsonld = useMemo(() => {
    if (kind === "faq") return { "@context":"https://schema.org","@type":"FAQPage", mainEntity: faqs.filter(f=>f.q&&f.a).map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}})) };
    if (kind === "product") return { "@context":"https://schema.org","@type":"Product",name:product.name,description:product.description,image:product.image,sku:product.sku,brand:{"@type":"Brand",name:product.brand},offers:{"@type":"Offer",price:product.price,priceCurrency:product.currency,availability:"https://schema.org/InStock"} };
    if (kind === "article") return { "@context":"https://schema.org","@type":"Article",headline:article.headline,author:{"@type":"Person",name:article.author},image:article.image,datePublished:article.datePublished,description:article.description };
    return { "@context":"https://schema.org","@type":"BreadcrumbList", itemListElement: crumbs.map((c,i)=>({"@type":"ListItem",position:i+1,name:c.name,item:c.url})) };
  }, [kind, faqs, product, article, crumbs]);

  const code = `<script type="application/ld+json">\n${JSON.stringify(jsonld, null, 2)}\n</script>`;

  return (
    <ToolPanel>
      <ToolHeader title={TITLES[kind]} desc="Live JSON-LD generator. Paste it before </head> on your page." />
      <div className="grid lg:grid-cols-2 gap-4">
        <Card3D tilt={false} className="p-4">
          {kind === "faq" && (<>
            {faqs.map((f,i)=>(
              <div key={i} className="border-b border-border/60 pb-3 mb-3">
                <div className="flex justify-between mb-1"><span className="text-xs text-muted-foreground">FAQ #{i+1}</span><button onClick={()=>setFaqs(faqs.filter((_,j)=>j!==i))} className="text-destructive"><Trash2 className="size-4" /></button></div>
                <input value={f.q} onChange={e=>setFaqs(faqs.map((x,j)=>j===i?{...x,q:e.target.value}:x))} placeholder="Question" className="w-full mb-2 px-3 py-2 bg-background border border-border rounded text-sm" />
                <textarea value={f.a} onChange={e=>setFaqs(faqs.map((x,j)=>j===i?{...x,a:e.target.value}:x))} placeholder="Answer" rows={3} className="w-full px-3 py-2 bg-background border border-border rounded text-sm" />
              </div>
            ))}
            <button onClick={()=>setFaqs([...faqs,{q:"",a:""}])} className="inline-flex items-center gap-1 text-sm text-primary"><Plus className="size-4" />Add FAQ</button>
          </>)}
          {kind === "product" && (
            <div className="space-y-2">{(["name","description","image","brand","price","currency","sku"] as const).map(k=>(<input key={k} value={product[k]} onChange={e=>setProduct({...product,[k]:e.target.value})} placeholder={k} className="w-full px-3 py-2 bg-background border border-border rounded text-sm" />))}</div>
          )}
          {kind === "article" && (
            <div className="space-y-2">{(["headline","author","image","datePublished","description"] as const).map(k=>(<input key={k} value={article[k]} onChange={e=>setArticle({...article,[k]:e.target.value})} placeholder={k} className="w-full px-3 py-2 bg-background border border-border rounded text-sm" />))}</div>
          )}
          {kind === "breadcrumb" && (<>
            {crumbs.map((c,i)=>(
              <div key={i} className="flex gap-2 mb-2">
                <input value={c.name} onChange={e=>setCrumbs(crumbs.map((x,j)=>j===i?{...x,name:e.target.value}:x))} placeholder="Name" className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm" />
                <input value={c.url} onChange={e=>setCrumbs(crumbs.map((x,j)=>j===i?{...x,url:e.target.value}:x))} placeholder="URL" className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm" />
                <button onClick={()=>setCrumbs(crumbs.filter((_,j)=>j!==i))} className="text-destructive"><Trash2 className="size-4" /></button>
              </div>
            ))}
            <button onClick={()=>setCrumbs([...crumbs,{name:"",url:""}])} className="inline-flex items-center gap-1 text-sm text-primary"><Plus className="size-4" />Add crumb</button>
          </>)}
        </Card3D>
        <Card3D tilt={false} className="p-4">
          <div className="flex justify-between mb-2"><span className="text-xs text-muted-foreground">Generated JSON-LD</span><button onClick={()=>navigator.clipboard.writeText(code)} className="text-xs px-2 py-1 rounded border border-border hover:border-primary hover:text-primary inline-flex gap-1 items-center"><Copy className="size-3" />Copy</button></div>
          <pre className="font-mono text-xs bg-background border border-border rounded p-3 h-[420px] overflow-auto whitespace-pre-wrap">{code}</pre>
        </Card3D>
      </div>
    </ToolPanel>
  );
}

export const Route = createFileRoute("/tools/faq-schema")({
  head: () => toolHead("faq-schema"),
  component: () => <SchemaBuilder kind="faq" />,
});
