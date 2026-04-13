"use client";

import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
  mood?: "neutral" | "happy" | "thinking" | "excited";
  animated?: boolean;
};

const moodColors: Record<string, { from: string; to: string; glow: string }> = {
  neutral:  { from: "#00e5a0", to: "#00a872", glow: "rgba(0,229,160,0.3)" },
  happy:    { from: "#00f5b0", to: "#00d490", glow: "rgba(0,245,176,0.4)" },
  thinking: { from: "#4d9fff", to: "#007ae5", glow: "rgba(77,159,255,0.3)" },
  excited:  { from: "#a0ff00", to: "#00e5a0", glow: "rgba(160,255,0,0.35)" },
};

export function BlobCharacter({
  size = 120,
  className,
  mood = "neutral",
  animated = true,
}: Props) {
  const colors = moodColors[mood];

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Outer glow ring */}
      <div
        className={cn(animated && "animate-ripple")}
        style={{
          position: "absolute",
          inset: -size * 0.1,
          borderRadius: "50%",
          background: colors.glow,
          opacity: 0.4,
        }}
      />

      {/* Main blob */}
      <div
        className={cn(animated && "animate-blob")}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 35%, ${colors.from}, ${colors.to})`,
          boxShadow: `0 0 ${size * 0.4}px ${colors.glow}, inset 0 0 ${size * 0.2}px rgba(255,255,255,0.1)`,
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Face */}
        <div style={{ position: "relative", width: size * 0.55, height: size * 0.4 }}>
          {/* Eyes */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: size * 0.06 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: size * 0.1,
                  height: mood === "thinking" ? size * 0.06 : size * 0.12,
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: mood === "thinking" ? "4px" : "50%",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
                }}
              />
            ))}
          </div>
          {/* Mouth */}
          <div
            style={{
              height: size * 0.05,
              background: "rgba(0,0,0,0.35)",
              borderRadius: mood === "happy" || mood === "excited" ? "0 0 20px 20px" : "20px",
              margin: "0 auto",
              width: mood === "happy" || mood === "excited" ? "70%" : "50%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
