import { motion } from "framer-motion";
import { Bot, Sparkles, Zap, Globe2, FileSearch, BrainCircuit } from "lucide-react";

/**
 * Pure CSS/SVG pseudo-3D hero visual — no WebGL, <5kb, 60fps.
 * Rotating orb of "AI engines" + floating data cards.
 */
export function Hero3D() {
  return (
    <div className="relative w-full h-[320px] sm:h-[480px] flex items-center justify-center pointer-events-none select-none">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-[600px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-10 size-[300px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.22 280) 0%, transparent 60%)" }} />
        <div className="absolute top-10 right-10 size-[260px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.7 0.2 200) 0%, transparent 60%)" }} />
      </div>

      {/* Grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-48 opacity-30"
        style={{
          background:
            "linear-gradient(transparent, var(--background)), repeating-linear-gradient(0deg, transparent 0 38px, color-mix(in oklab, var(--primary) 30%, transparent) 38px 39px), repeating-linear-gradient(90deg, transparent 0 38px, color-mix(in oklab, var(--primary) 30%, transparent) 38px 39px)",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* Central orbiting system */}
      <div className="relative" style={{ perspective: "1000px" }}>
        {/* Pulsing core */}
        <motion.div
          className="relative size-32 sm:size-40 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--primary) 80%, white), var(--primary) 50%, oklch(0.3 0.15 162) 100%)",
            boxShadow: "0 0 80px color-mix(in oklab, var(--primary) 60%, transparent), inset -10px -10px 30px rgba(0,0,0,0.5)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <BrainCircuit className="size-14 sm:size-16 text-white" strokeWidth={1.5} />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.25 }}
          />
        </motion.div>

        {/* Orbiting rings */}
        {[
          { size: 220, dur: 18, items: [{ icon: Bot, label: "ChatGPT", color: "oklch(0.72 0.17 162)" }, { icon: Globe2, label: "Gemini", color: "oklch(0.7 0.2 240)" }, { icon: Sparkles, label: "Perplexity", color: "oklch(0.65 0.2 300)" }] },
          { size: 320, dur: 28, reverse: true, items: [{ icon: Zap, label: "Copilot", color: "oklch(0.78 0.17 70)" }, { icon: FileSearch, label: "Claude", color: "oklch(0.7 0.18 30)" }] },
        ].map((ring, ri) => (
          <motion.div
            key={ri}
            className="absolute top-1/2 left-1/2 rounded-full border border-primary/15"
            style={{ width: ring.size, height: ring.size, marginLeft: -ring.size / 2, marginTop: -ring.size / 2 }}
            animate={{ rotate: ring.reverse ? -360 : 360 }}
            transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
          >
            {ring.items.map((it, i) => {
              const angle = (i / ring.items.length) * 360;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `rotate(${angle}deg) translateX(${ring.size / 2}px) rotate(-${angle}deg)` }}
                >
                  <motion.div
                    className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                    animate={{ rotate: ring.reverse ? 360 : -360 }}
                    transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="size-12 rounded-xl border border-border bg-surface/90 backdrop-blur flex items-center justify-center shadow-lg"
                      style={{ boxShadow: `0 8px 24px color-mix(in oklab, ${it.color} 30%, transparent)` }}
                    >
                      <it.icon className="size-5" style={{ color: it.color }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{it.label}</span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Floating data chips */}
      {[
        { top: "8%", left: "4%", text: "+2.4M scans", delay: 0 },
        { top: "20%", right: "6%", text: "schema.org ✓", delay: 0.4 },
        { bottom: "18%", left: "8%", text: "llms.txt found", delay: 0.8 },
        { bottom: "10%", right: "10%", text: "E-E-A-T 94", delay: 1.2 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-surface/80 backdrop-blur text-xs font-mono text-primary"
          style={c as React.CSSProperties}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: c.delay, duration: 0.6 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: c.delay } }}
        >
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {c.text}
        </motion.div>
      ))}
    </div>
  );
}
