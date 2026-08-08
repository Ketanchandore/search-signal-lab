import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { MinifierPage } from "./tools.html-minifier";

export const Route = createFileRoute("/tools/js-minifier")({
  head: () => toolHead("js-minifier"),
  component: () => <MinifierPage kind="js" />,
});
