import { createFileRoute } from "@tanstack/react-router";
import { SchemaBuilder } from "./tools.faq-schema";
export const Route = createFileRoute("/tools/breadcrumb-schema")({ head: () => ({ meta: [{ title: "Breadcrumb Schema Generator — SEOAcademys" }] }), component: () => <SchemaBuilder kind="breadcrumb" /> });
