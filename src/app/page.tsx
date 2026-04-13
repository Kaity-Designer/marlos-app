"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlobCharacter } from "@/components/ui/BlobCharacter";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      const onboardingDone = localStorage.getItem("marlos-onboarding-done");
      const hasSession = localStorage.getItem("marlos-session");
      if (hasSession) {
        router.replace("/home");
      } else if (onboardingDone) {
        router.replace("/auth");
      } else {
        router.replace("/onboarding");
      }
    }, 2200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-dvh relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 40%, #0d1f18 0%, #0f0f10 70%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,229,160,0.06) 0%, transparent 100%)",
        }}
      />

      {/* Decorative rings */}
      {[200, 320, 440].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[rgba(0,229,160,0.04)]"
          style={{ width: size, height: size }}
        />
      ))}

      {/* Logo */}
      <div className="flex flex-col items-center gap-8 animate-scale-in z-10">
        <BlobCharacter size={110} mood="happy" animated />

        <div className="flex flex-col items-center gap-2">
          <h1
            className="text-5xl font-bold gradient-text"
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
          >
            marlos
          </h1>
          <p className="text-[#9999a8] text-xs font-semibold tracking-[0.2em] uppercase">
            Learn your way
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-2 animate-fade-in delay-700 z-10">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce"
            style={{ animationDelay: `${i * 180}ms`, opacity: 0.7 }}
          />
        ))}
      </div>
    </div>
  );
}
