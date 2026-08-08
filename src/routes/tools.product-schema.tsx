import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { SchemaBuilder } from "./tools.faq-schema";
export const Route = createFileRoute("/tools/product-schema")({ head: () => toolHead("product-schema")