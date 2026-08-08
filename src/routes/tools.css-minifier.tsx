import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { MinifierPage } from "./tools.html-minifier";

export const Route = createFileRoute("/tools/css-minifier")({
  head: () => toolHead("css-minifier")