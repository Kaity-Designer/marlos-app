"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookText, Headphones, Play, Zap, Leaf, Music, Rocket, Brain, Flame, MessageCircle, BookOpen, Hash, Globe, Sparkles, Monitor } from "lucide-react";
import { BlobCharacter } from "@/components/ui/BlobCharacter";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Step = {
  id: number;
  question: string;
  subtext?: string;
  options: { id: string; label: string; icon: React.ReactNode; desc?: string }[];
  multi?: boolean;
};

const steps: Step[] = [
  {
    id: 0,
    question: "Hey! How do you like to learn?",
    subtext: "We'll personalise everything just for you.",
    options: [
      { id: "reading", label: "Reading & writing", icon: <BookText size={24} strokeWidth={1.8} />, desc: "I love taking notes and reading" },
      { id: "listening", label: "Audio & talking", icon: <Headphones size={24} strokeWidth={1.8} />, desc: "Podcasts, explanations, discussions" },
      { id: "watching", label: "Video & visuals", icon: <Play size={24} strokeWidth={1.8} />, desc: "Diagrams, videos, seeing things" },
      { id: "doing", label: "Hands-on practice", icon: <Zap size={24} strokeWidth={1.8} />, desc: "Quizzes, exercises, making things" },
    ],
  },
  {
    id: 1,
    question: "What pace feels right for you?",
    subtext: "You can always change this later.",
    options: [
      { id: "slow", label: "Take it slow", icon: <Leaf size={24} strokeWidth={1.8} />, desc: "Thorough explanations, no rushing" },
      { id: "medium", label: "Steady rhythm", icon: <Music size={24} strokeWidth={1.8} />, desc: "Balanced pace that builds naturally" },
      { id: "fast", label: "Move quickly", icon: <Rocket size={24} strokeWidth={1.8} />, desc: "Efficient, challenge me more" },
    ],
  },
  {
    id: 2,
    question: "What do you want to learn about?",
    subtext: "Pick as many as you like.",
    multi: true,
    options: [
      { id: "maths", label: "Maths", icon: <Hash size={24} strokeWidth={1.8} /> },
      { id: "science", label: "Science", icon: <Flame size={24} strokeWidth={1.8} /> },
      { id: "history", label: "History", icon: <BookOpen size={24} strokeWidth={1.8} /> },
      { id: "english", label: "English", icon: <MessageCircle size={24} strokeWidth={1.8} /> },
      { id: "coding", label: "Coding", icon: <Monitor size={24} strokeWidth={1.8} /> },
      { id: "languages", label: "Languages", icon: <Globe size={24} strokeWidth={1.8} /> },
      { id: "arts", label: "Arts", icon: <Sparkles size={24} strokeWidth={1.8} /> },
      { id: "philosophy", label: "Philosophy", icon: <Brain size={24} strokeWidth={1.8} /> },
    ],
  },
  {
    id: 3,
    question: "What's your name?",
    subtext: "So Marlos can greet you properly.",
    options: [], // text input step
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string | string[]>>({});
  const [name, setName] = useState("");

  const current = steps[step];
  const totalSteps = steps.length;
  const progress = ((step) / (totalSteps - 1)) * 100;

  function toggleOption(optId: string) {
    if (current.multi) {
      const prev = (selections[step] as string[]) || [];
      const next = prev.includes(optId)
        ? prev.filter((x) => x !== optId)
        : [...prev, optId];
      setSelections((s) => ({ ...s, [step]: next }));
    } else {
      setSelections((s) => ({ ...s, [step]: optId }));
      setTimeout(() => advance(), 280);
    }
  }

  function advance() {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      finish();
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function finish() {
    localStorage.setItem("marlos-onboarding-done", "true");
    localStorage.setItem("marlos-profile", JSON.stringify({ selections, name }));
    router.replace("/auth");
  }

  const canContinue =
    step === 3
      ? name.trim().length >= 2
      : current.multi
      ? ((selections[step] as string[]) || []).length > 0
      : !!selections[step];

  const blobMood =
    step === 0 ? "happy" : step === 1 ? "thinking" : step === 2 ? "excited" : "happy";

  return (
    <div className="flex flex-col min-h-dvh relative" style={{ background: "#0f0f10" }}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#1a1a1d] z-20">
        <div
          className="h-full bg-[#00e5a0] transition-all duration-700"
          style={{
            width: `${progress}%`,
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>

      {/* Back button */}
      {step > 0 && (
        <button
          onClick={back}
          className="absolute top-6 left-5 z-10 w-10 h-10 rounded-2xl flex items-center justify-center bg-[#1a1a1d] border border-[rgba(255,255,255,0.07)] text-[#9999a8] active:scale-90 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Step counter */}
      <div className="absolute top-6 right-5 z-10 text-xs font-medium text-[#5a5a68]">
        {step + 1} / {totalSteps}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-20 pb-8 gap-8">
        {/* Blob + question */}
        <div className="flex flex-col items-center gap-6 animate-fade-up">
          <BlobCharacter size={80} mood={blobMood} animated />
          <div className="text-center space-y-2">
            <h2
              className="text-2xl font-bold text-[#f5f5f7]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {current.question}
            </h2>
            {current.subtext && (
              <p className="text-sm text-[#5a5a68]">{current.subtext}</p>
            )}
          </div>
        </div>

        {/* Name input step */}
        {step === 3 ? (
          <div className="animate-fade-up delay-100 space-y-4">
            <input
              autoFocus
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canContinue && advance()}
              className="w-full h-16 rounded-2xl bg-[#1a1a1d] border border-[rgba(255,255,255,0.07)] text-[#f5f5f7] text-xl font-semibold px-5 placeholder:text-[#7a7a90] focus:outline-none focus:border-[rgba(0,229,160,0.5)] focus:shadow-[0_0_0_3px_rgba(0,229,160,0.1)] transition-all"
              style={{ letterSpacing: "-0.01em" }}
            />
          </div>
        ) : (
          /* Options grid */
          <div
            className={cn(
              "grid gap-3 animate-fade-up delay-100",
              current.options.length > 4 ? "grid-cols-2" : "grid-cols-1"
            )}
          >
            {current.options.map((opt, i) => {
              const sel = selections[step];
              const isSelected = current.multi
                ? ((sel as string[]) || []).includes(opt.id)
                : sel === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={cn(
                    "relative flex items-center gap-4 p-4 rounded-2xl border text-left",
                    "transition-all duration-200 active:scale-[0.97]",
                    current.options.length > 4 ? "flex-col items-center text-center p-5 gap-2" : "",
                    isSelected
                      ? "bg-[rgba(0,229,160,0.1)] border-[rgba(0,229,160,0.4)] shadow-[0_0_24px_rgba(0,229,160,0.12)]"
                      : "bg-[#141416] border-[rgba(255,255,255,0.07)] hover:bg-[#1a1a1d] hover:border-[rgba(255,255,255,0.12)]"
                  )}
                  style={{
                    animationDelay: `${i * 60 + 100}ms`,
                    transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div className="flex items-center justify-center" style={{ width: 24, height: 24 }}>{opt.icon}</div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        "font-semibold text-sm",
                        isSelected ? "text-[#00e5a0]" : "text-[#f5f5f7]"
                      )}
                    >
                      {opt.label}
                    </span>
                    {opt.desc && (
                      <span className="text-xs text-[#5a5a68]">{opt.desc}</span>
                    )}
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#00e5a0] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#0f0f10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Continue button (for multi-select or name) */}
        {(current.multi || step === 3) && (
          <div className="mt-auto animate-fade-up delay-300">
            <Button
              onClick={advance}
              disabled={!canContinue}
              fullWidth
              size="xl"
            >
              {step === totalSteps - 1 ? "Let's go →" : "Continue →"}
            </Button>
          </div>
        )}

        {/* Skip for non-multi non-name steps */}
        {!current.multi && step !== 3 && step > 0 && (
          <button
            onClick={advance}
            className="text-center text-sm text-[#3a3a3f] hover:text-[#5a5a68] transition-colors mt-auto"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}
