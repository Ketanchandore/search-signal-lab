import { createFileRoute } from "@tanstack/react-router";
import { SchemaBuilder } from "./tools.faq-schema";
export const Route = createFileRoute("/tools/product-schema")({ head: () => ({ meta: [{ title: "Product Schema Generator — SEOAcademys" }] }), component: () => <SchemaBuilder kind="product" /> });
