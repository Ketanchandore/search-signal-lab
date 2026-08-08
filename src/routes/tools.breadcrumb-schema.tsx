import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { SchemaBuilder } from "./tools.faq-schema";
export const Route = createFileRoute("/tools/breadcrumb-schema")({ head: () => toolHead("breadcrumb-schema"), component: () => <SchemaBuilder kind="breadcrumb" /> });
