import { createFileRoute } from "@tanstack/react-router";
import { MinifierPage } from "./tools.html-minifier";

export const Route = createFileRoute("/tools/css-minifier")({
  head: () => ({ meta: [{ title: "CSS Minifier — SEOAcademys" }] }),
  component: () => <MinifierPage kind="css" />,
});
