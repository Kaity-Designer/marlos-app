"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface BlobCharacterProps {
  size?: number;
  mood?: "happy" | "neutral" | "thinking";
  animated?: boolean;
}

export function BlobCharacter({ size = 120, animated = true }: BlobCharacterProps) {
  const [eyeState, setEyeState] = useState<"left" | "up" | "right" | "center">("center");
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (\!animated) return;
    const seq: Array<"left" | "up" | "right" | "center"> = ["left", "up", "right", "center", "center"];
    let idx = 0;
    let blink: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setEyeState(seq[idx]);
      if (idx === 4) {
        blink = setTimeout(() => {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 200);
        }, 1500);
      }
      idx = (idx + 1) % seq.length;
    };
    cycle();
    const iv = setInterval(cycle, 3000);
    return () => { clearInterval(iv); clearTimeout(blink); };
  }, [animated]);

  const eyeOffset = {
    left:   { x: -5, y: 0 },
    up:     { x: 0,  y: -5 },
    right:  { x: 5,  y: 0 },
    center: { x: 0,  y: 0 },
  }[eyeState];

  return (
    <svg width={size} height={size} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="bc-base" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#b8d8eb" stopOpacity="0.6" />
          <stop offset="50%"  stopColor="#8fb8d4" stopOpacity="0.65" />
          <stop offset="85%"  stopColor="#6a9ec4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#5d92ba" stopOpacity="0.75" />
        </radialGradient>
        <linearGradient id="bc-iri" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#e8f4f8" stopOpacity="0.3" />
          <stop offset="15%"  stopColor="#ffd7e8" stopOpacity="0.25" />
          <stop offset="30%"  stopColor="#e8d7ff" stopOpacity="0.2" />
          <stop offset="45%"  stopColor="#fff4d7" stopOpacity="0.15" />
          <stop offset="60%"  stopColor="#d7f4ff" stopOpacity="0.2" />
          <stop offset="75%"  stopColor="#ffe8f4" stopOpacity="0.25" />
          <stop offset="90%"  stopColor="#f4d7ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e8f4f8" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="bc-hi" cx="30%" cy="25%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="25%"  stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="75%"  stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bc-rim" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="85%"  stopColor="#ffffff" stopOpacity="0" />
          <stop offset="92%"  stopColor="#e3f2fd" stopOpacity="0.4" />
          <stop offset="97%"  stopColor="#bbdefb" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#90caf9" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="bc-sat" cx="35%" cy="30%">
          <stop offset="0%"   stopColor="#d5e9f5" stopOpacity="0.7" />
          <stop offset="60%"  stopColor="#a8cfea" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#7db3d9" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="bc-sathi" cx="28%" cy="22%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="80%"  stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bc-eye" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1a3d5c" />
          <stop offset="50%"  stopColor="#0f2942" />
          <stop offset="100%" stopColor="#0a1f33" />
        </linearGradient>
        <filter id="bc-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="bc-sglow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="bc-mask"><circle cx="200" cy="200" r="95" /></clipPath>
      </defs>

      {/* Satellite — top-left */}
      <motion.g animate={animated ? { x:[0,15,0,-15,0], y:[0,-15,0,15,0] } : {}} transition={{ duration:15, repeat:Infinity, ease:"linear" }}>
        <g transform="translate(120,120)">
          <circle cx="0" cy="0" r="18" fill="url(#bc-sat)" filter="url(#bc-sglow)" />
          <ellipse cx="-4" cy="-5" rx="8" ry="7" fill="url(#bc-sathi)" />
          <circle cx="0" cy="0" r="18" fill="none" stroke="#d5e9f5" strokeWidth="1.5" opacity="0.5" />
        </g>
      </motion.g>

      {/* Satellite — top-right */}
      <motion.g animate={animated ? { x:[0,-12,0,12,0], y:[0,12,0,-12,0] } : {}} transition={{ duration:15, repeat:Infinity, ease:"linear" }}>
        <g transform="translate(310,100)">
          <circle cx="0" cy="0" r="28" fill="url(#bc-sat)" filter="url(#bc-sglow)" />
          <ellipse cx="-7" cy="-8" rx="13" ry="11" fill="url(#bc-sathi)" />
          <circle cx="0" cy="0" r="28" fill="none" stroke="#d5e9f5" strokeWidth="1.5" opacity="0.5" />
        </g>
      </motion.g>

      {/* Satellite — bottom-left */}
      <motion.g animate={animated ? { x:[0,10,0,-10,0], y:[0,-10,0,10,0] } : {}} transition={{ duration:15, repeat:Infinity, ease:"linear", delay:5 }}>
        <g transform="translate(105,305)">
          <circle cx="0" cy="0" r="25" fill="url(#bc-sat)" filter="url(#bc-sglow)" />
          <ellipse cx="-6" cy="-7" rx="11" ry="9" fill="url(#bc-sathi)" />
          <circle cx="0" cy="0" r="25" fill="none" stroke="#d5e9f5" strokeWidth="1.5" opacity="0.5" />
        </g>
      </motion.g>

      {/* Satellite — bottom-right */}
      <motion.g animate={animated ? { x:[0,-8,0,8,0], y:[0,8,0,-8,0] } : {}} transition={{ duration:15, repeat:Infinity, ease:"linear", delay:7.5 }}>
        <g transform="translate(315,315)">
          <circle cx="0" cy="0" r="16" fill="url(#bc-sat)" filter="url(#bc-sglow)" />
          <ellipse cx="-4" cy="-4" rx="7" ry="6" fill="url(#bc-sathi)" />
          <circle cx="0" cy="0" r="16" fill="none" stroke="#d5e9f5" strokeWidth="1.5" opacity="0.5" />
        </g>
      </motion.g>

      {/* Main blob — floating */}
      <motion.g animate={animated ? { y:[0,-8,0] } : {}} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}>
        <circle cx="200" cy="200" r="95" fill="url(#bc-base)" filter="url(#bc-glow)" />
        <circle cx="200" cy="200" r="95" fill="url(#bc-iri)" opacity="0.8" />
        <circle cx="200" cy="200" r="95" fill="url(#bc-rim)" />
        <g clipPath="url(#bc-mask)">
          <ellipse cx="160" cy="145" rx="60" ry="55" fill="url(#bc-hi)" />
          <ellipse cx="155" cy="140" rx="25" ry="22" fill="#ffffff" opacity="0.9" />
          <ellipse cx="165" cy="150" rx="15" ry="13" fill="#ffffff" opacity="0.6" />
          <ellipse cx="200" cy="265" rx="30" ry="12" fill="#ffffff" opacity="0.15" />
        </g>

        {/* Eyes */}
        <motion.g animate={{ x: eyeOffset.x, y: eyeOffset.y }} transition={{ duration:0.6, ease:[0.34,1.56,0.64,1] }}>
          <ellipse cx="172" cy="200" rx="13" ry={isBlinking ? 2 : 24} fill="url(#bc-eye)" />
          {\!isBlinking && <>
            <ellipse cx="175" cy="188" rx="7" ry="10" fill="#ffffff" opacity="0.95" />
            <ellipse cx="174" cy="185" rx="4" ry="5"  fill="#ffffff" />
          </>}
          <ellipse cx="228" cy="200" rx="13" ry={isBlinking ? 2 : 24} fill="url(#bc-eye)" />
          {\!isBlinking && <>
            <ellipse cx="231" cy="188" rx="7" ry="10" fill="#ffffff" opacity="0.95" />
            <ellipse cx="230" cy="185" rx="4" ry="5"  fill="#ffffff" />
          </>}
        </motion.g>

        <circle cx="200" cy="200" r="95" fill="none" stroke="#c5e3f5" strokeWidth="2" opacity="0.4" />
      </motion.g>

      {/* Shimmer */}
      <motion.g animate={animated ? { opacity:[0.2,0.35,0.2], x:[-2,2,-2] } : {}} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }} clipPath="url(#bc-mask)">
        <ellipse cx="165" cy="148" rx="50" ry="45" fill="#ffffff" />
      </motion.g>
    </svg>
  );
}
