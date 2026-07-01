import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";

const TITLE = "Terms of Service — SEOAcademys Free SEO Tools";
const DESC = "Terms of service for SEOAcademys.com. Usage terms for our 37 free SEO tools, acceptable use policy, and limitation of liability.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://seoacademys.com/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-2">Terms of Service — SEOAcademys</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: June 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Acceptance of Terms</h2>
            <p>By accessing SEOAcademys.com and using any of our 37 free SEO tools, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Use of the Tools</h2>
            <p>All tools are provided free of charge for lawful use. You may analyze any publicly accessible URL — your own or third-party — for SEO research and optimization purposes.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Acceptable Use</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Do not use the tools to attempt to disrupt or overload the platform</li>
              <li>Do not scrape or bulk-harvest tool output for resale</li>
              <li>Do not submit URLs for illegal content analysis</li>
              <li>Automated bulk access requires prior written permission</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">No Warranty</h2>
            <p>Tools are provided "as is" without warranty of any kind. While we strive for accuracy, SEO recommendations are heuristic and may not guarantee ranking improvements.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Limitation of Liability</h2>
            <p>SEOAcademys is not liable for any direct, indirect, incidental, or consequential damages arising from use of the platform.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Changes to Terms</h2>
            <p>We may update these terms periodically. Continued use of the platform constitutes acceptance of the updated terms.</p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
