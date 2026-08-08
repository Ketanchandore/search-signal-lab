import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { ToolPanel } from "./tools";
import { ToolHeader } from "@/components/Card3D";
import { UrlTool, Section } from "@/components/UrlTool";

const IMPORTANT = ["content-type","server","x-powered-by","strict-transport-security","content-security-policy","x-frame-options","x-content-type-options","referrer-policy","permissions-policy","cache-control","etag","last-modified","cf-ray","x-vercel-id","x-nf-request-id","content-encoding","vary"];

export const Route = createFileRoute("/tools/http-headers")({
  head: () => toolHead("http-headers") => {
        const keys = Array.from(new Set([...IMPORTANT, ...Object.keys(r.headers).sort()]));
        return (
          <Section title="Response headers">
            <table className="w-full text-sm"><tbody>
              {keys.filter(k => r.headers[k] !== undefined).map(k => (
                <tr key={k} className="border-b border-border/60"><td className="py-1.5 pr-3 font-mono text-muted-foreground align-top">{k}</td><td className="py-1.5 break-all font-mono">{r.headers[k]}</td></tr>
              ))}
            </tbody></table>
          </Section>
        );
      }}</UrlTool>
    </ToolPanel>
  ),
});
