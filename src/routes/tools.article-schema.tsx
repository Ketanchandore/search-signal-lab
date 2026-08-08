import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { SchemaBuilder } from "./tools.faq-schema";
export const Route = createFileRoute("/tools/article-schema")({ head: () => toolHead("article-schema"), component: () => <SchemaBuilder kind="article" /> });
