"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlobCharacter } from "@/components/ui/BlobCharacter";
import { createClient } from "@/lib/supabase/client";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        // First: check if Supabase has a live session (auto-login)
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          // Live Supabase session — restore name and go straight to home
          const displayName = session.user.user_metadata?.name || session.user.email?.split("@")[0] || "there";
          localStorage.setItem("marlos-session", JSON.stringify({
            email: session.user.email,
            name: displayName,
            userId: session.user.id,
          }));
          router.replace("/home");
          return;
        }
      } catch {
        // Supabase check failed — fall through to localStorage
      }

      // Fallback: check localStorage session
      const hasSession = localStorage.getItem("marlos-session");
      const onboardingDone = localStorage.getItem("marlos-onboarding-done");

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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,229,160,0.06) 0%, transparent 100%)" }}
      />

      {[200, 320, 440].map((size, i) => (
        <div key={i} className="absolute rounded-full border border-[rgba(0,229,160,0.04)]" style={{ width: size, height: size }} />
      ))}

      <div className="flex flex-col items-center gap-8 animate-scale-in z-10">
        <BlobCharacter size={110} mood="happy" animated />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold gradient-text" style={{ fontWeight: 800, letterSpacing: "-0.04em" }}>
            marlos
          </h1>
          <p className="text-[#9999a8] text-xs font-semibold tracking-[0.2em] uppercase">
            Learn your way
          </p>
        </div>
      </div>

      <div className="absolute bottom-16 flex gap-2 animate-fade-in delay-700 z-10">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: `${i * 180}ms`, opacity: 0.7 }} />
        ))}
      </div>
    </div>
  );
}
