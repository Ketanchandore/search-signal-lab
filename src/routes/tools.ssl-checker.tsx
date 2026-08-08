import { createFileRoute } from "@tanstack/react-router";
import { toolHead } from "@/lib/tool-meta";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ToolPanel } from "./tools";
import { ToolHeader, Card3D } from "@/components/Card3D";
import { fetchUrl } from "@/lib/fetch-url.functions";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/tools/ssl-checker")({
  head: () => toolHead("ssl-checker")</span><span className={out.mixed ? "text-destructive" : "text-success"}>{out.mixed ? "Detected" : "Clean"}</span></li>
            <li className="flex justify-between py-2"><span>HTTP status</span><span>{out.status}</span></li>
          </ul>
        </Card3D>
      )}
    </ToolPanel>
  );
}
