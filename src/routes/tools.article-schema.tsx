import { createFileRoute } from "@tanstack/react-router";
import { SchemaBuilder } from "./tools.faq-schema";
export const Route = createFileRoute("/tools/article-schema")({ head: () => ({ meta: [{ title: "Article Schema Generator — SEOAcademys" }] }), component: () => <SchemaBuilder kind="article" /> });
