import { memo, useRef, useCallback, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Card3DProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  style?: CSSProperties;
};

/** Reusable 3D card with optional pointer-tilt and glow. */
export const Card3D = memo(function Card3D({ children, className, tilt = true, glow = false, style }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  }, [tilt]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("card-3d relative", glow && "glow-primary", className)}
      style={{
        transform: tilt ? "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" : undefined,
        ...style,
      }}
    >
      {tilt && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 12%, transparent), transparent 40%)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
});

export function Pane({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-border bg-surface shadow-[var(--shadow-3d-sm)]", className)}>{children}</div>;
}

export function ToolHeader({ title, badge, desc }: { title: string; badge?: string; desc?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
        {badge && (
          <span className="text-[10px] px-2 py-1 rounded-full grad-primary text-primary-foreground font-semibold shadow-[var(--shadow-3d-sm)]">
            {badge}
          </span>
        )}
      </div>
      {desc && <p className="text-muted-foreground max-w-2xl">{desc}</p>}
    </div>
  );
}
