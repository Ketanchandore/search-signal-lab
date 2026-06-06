import { createFileRoute } from "@tanstack/react-router";
import { MinifierPage } from "./tools.html-minifier";

export const Route = createFileRoute("/tools/js-minifier")({
  head: () => ({ meta: [{ title: "JS Minifier — SEOAcademys" }] }),
  component: () => <MinifierPage kind="js" />,
});
