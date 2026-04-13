"use client";

import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
  mood?: "neutral" | "happy" | "thinking" | "excited";
  animated?: boolean;
};

export function BlobCharacter({
  size = 120,
  className,
  mood = "neutral",
  animated = true,
}: Props) {
  const s = size;
  const id = `bubble-${mood}`;

  // Satellite bubble positions (relative to center of main bubble)
  const satellites = [
    { cx: s * 0.82, cy: s * 0.18, r: s * 0.10 },  // top-right large
    { cx: s * 1.05, cy: s * 0.55, r: s * 0.065 }, // right small
    { cx: s * 0.18, cy: s * 0.82, r: s * 0.085 }, // bottom-left medium
    { cx: s * 0.62, cy: s * 0.96, r: s * 0.055 }, // bottom small
  ];

  return (
    <div
      className={cn("relative", animated && "animate-float", className)}
      style={{ width: s * 1.15, height: s * 1.1 }}
    >
      <svg
        width={s * 1.15}
        height={s * 1.1}
        viewBox={`0 0 ${s * 1.15} ${s * 1.1}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main bubble radial gradient — deep blue centre, lighter rim */}
          <radialGradient id={`${id}-body`} cx="38%" cy="32%" r="65%">
            <stop offset="0%"   stopColor="#a8d8f8" stopOpacity="0.55" />
            <stop offset="45%"  stopColor="#6ab8f0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3a8ed4" stopOpacity="0.35" />
          </radialGradient>

          {/* Inner glow — bright core */}
          <radialGradient id={`${id}-inner`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#e0f4ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4aabf0" stopOpacity="0.0" />
          </radialGradient>

          {/* Specular highlight top-left */}
          <radialGradient id={`${id}-spec`} cx="35%" cy="28%" r="40%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="60%"  stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </radialGradient>

          {/* Satellite bubble gradient */}
          <radialGradient id={`${id}-sat`} cx="35%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="#d0eeff" stopOpacity="0.85" />
            <stop offset="55%"  stopColor="#7ec8f5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4aabf0" stopOpacity="0.25" />
          </radialGradient>

          {/* Drop shadow filter */}
          <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation={s * 0.06} floodColor="#2a7cc7" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ── Satellite bubbles ── */}
        {satellites.map((sat, i) => (
          <g key={i}>
            {/* Body */}
            <circle
              cx={sat.cx}
              cy={sat.cy}
              r={sat.r}
              fill={`url(#${id}-sat)`}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={sat.r * 0.12}
            />
            {/* Specular dot */}
            <ellipse
              cx={sat.cx - sat.r * 0.25}
              cy={sat.cy - sat.r * 0.28}
              rx={sat.r * 0.3}
              ry={sat.r * 0.2}
              fill="rgba(255,255,255,0.65)"
            />
          </g>
        ))}

        {/* ── Main bubble body ── */}
        <circle
          cx={s * 0.46}
          cy={s * 0.50}
          r={s * 0.44}
          fill={`url(#${id}-body)`}
          stroke="rgba(255,255,255,0.30)"
          strokeWidth={s * 0.018}
          filter={`url(#${id}-shadow)`}
        />

        {/* Inner glow layer */}
        <circle
          cx={s * 0.46}
          cy={s * 0.50}
          r={s * 0.44}
          fill={`url(#${id}-inner)`}
        />

        {/* Primary specular highlight (large soft ellipse top-left) */}
        <ellipse
          cx={s * 0.34}
          cy={s * 0.30}
          rx={s * 0.18}
          ry={s * 0.11}
          fill={`url(#${id}-spec)`}
          transform={`rotate(-20, ${s * 0.34}, ${s * 0.30})`}
        />

        {/* Secondary tiny specular dot */}
        <ellipse
          cx={s * 0.54}
          cy={s * 0.22}
          rx={s * 0.045}
          ry={s * 0.03}
          fill="rgba(255,255,255,0.55)"
          transform={`rotate(-15, ${s * 0.54}, ${s * 0.22})`}
        />

        {/* ── Eyes ── */}
        {/* Left eye */}
        <ellipse
          cx={s * 0.36}
          cy={s * 0.52}
          rx={s * 0.072}
          ry={mood === "thinking" ? s * 0.04 : s * 0.085}
          fill="#1a2a3a"
        />
        {/* Left eye specular */}
        <ellipse
          cx={s * 0.345}
          cy={s * 0.495}
          rx={s * 0.028}
          ry={s * 0.022}
          fill="rgba(255,255,255,0.85)"
        />

        {/* Right eye */}
        <ellipse
          cx={s * 0.56}
          cy={s * 0.52}
          rx={s * 0.072}
          ry={mood === "thinking" ? s * 0.04 : s * 0.085}
          fill="#1a2a3a"
        />
        {/* Right eye specular */}
        <ellipse
          cx={s * 0.545}
          cy={s * 0.495}
          rx={s * 0.028}
          ry={s * 0.022}
          fill="rgba(255,255,255,0.85)"
        />

        {/* Rim light (bottom edge subtle bright arc) */}
        <path
          d={`M ${s * 0.22} ${s * 0.78} Q ${s * 0.46} ${s * 0.96} ${s * 0.70} ${s * 0.78}`}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={s * 0.022}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
