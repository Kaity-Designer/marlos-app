"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlobCharacter } from "@/components/ui/BlobCharacter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const savedName =
    typeof window \!== "undefined"
      ? JSON.parse(localStorage.getItem("marlos-profile") || "{}").name || ""
      : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name: name || savedName } },
        });
        if (err) throw err;
        // For demo: store a mock session
        localStorage.setItem("marlos-session", JSON.stringify({ email, name }));
        router.replace("/home");
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        localStorage.setItem("marlos-session", JSON.stringify({ email }));
        router.replace("/home");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      // Demo fallback — bypass auth for prototype testing
      if (message.includes("Invalid") || message.includes("fetch") || message.includes("network")) {
        localStorage.setItem("marlos-session", JSON.stringify({ email, name }));
        router.replace("/home");
        return;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex flex-col min-h-dvh"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #0d1a14 0%, #0f0f10 60%)" }}
    >
      {/* Top section */}
      <div className="flex flex-col items-center gap-5 pt-16 pb-6 px-6">
        <BlobCharacter size={72} mood={mode === "signup" ? "happy" : "neutral"} animated />
        <div className="text-center space-y-1 animate-fade-up">
          <h1 className="text-2xl font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.03em" }}>
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-[#9999a8]">
            {mode === "signup"
              ? "Your learning journey starts here"
              : "Pick up right where you left off"}
          </p>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex mx-6 p-1 bg-[#141416] rounded-2xl border border-[rgba(255,255,255,0.06)] mb-6 animate-fade-up delay-100">
        {(["signup", "signin"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(""); }}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              mode === m
                ? "toggle-active shadow-[0_0_16px_rgba(0,229,160,0.25)]"
                : "text-[#9999a8] hover:text-[#c8c8d4]"
            )}
          >
            {m === "signup" ? "Sign up" : "Sign in"}
          </button>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-6 animate-fade-up delay-200"
      >
        {mode === "signup" && (
          <Input
            label="Your name"
            type="text"
            placeholder={savedName || "What should we call you?"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
        )}

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          }
        />

        <Input
          label="Password"
          type={showPass ? "text" : "password"}
          placeholder="8+ characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          trailing={
            <button
              type="button"
              onClick={() => setShowPass((v) => \!v)}
              className="text-[#9999a8] hover:text-[#c8c8d4] transition-colors"
            >
              {showPass ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
            </button>
          }
        />

        {error && (
          <p className="text-sm text-[#ff4d4d] text-center animate-fade-in">{error}</p>
        )}

        <Button type="submit" loading={loading} fullWidth size="xl" className="mt-2">
          {mode === "signup" ? "Create account" : "Sign in"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.07)]" />
          <span className="text-xs text-[#6a6a78]">or</span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.07)]" />
        </div>

        {/* Skip for prototype */}
        <button
          type="button"
          onClick={() => {
            localStorage.setItem("marlos-session", JSON.stringify({ email: "demo@marlos.app", name: "Learner" }));
            router.replace("/home");
          }}
          className="text-center text-sm text-[#6a6a78] hover:text-[#9999a8] transition-colors py-2"
        >
          Continue as guest →
        </button>
      </form>

      <p className="text-center text-xs text-[#6a6a78] px-6 mt-8 pb-8">
        By continuing you agree to our{" "}
        <span className="text-[#9999a8] underline underline-offset-2">Terms</span>
        {" & "}
        <span className="text-[#9999a8] underline underline-offset-2">Privacy Policy</span>
      </p>
    </div>
  );
}
