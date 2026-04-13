"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Hash, Globe, Monitor, CircleDot, Brain, Clock, Lightbulb } from "lucide-react";
import { BlobCharacter } from "@/components/ui/BlobCharacter";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  icon: React.ReactNode;
};

const questions: Question[] = [
  {
    id: 1,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Cell membrane"],
    correct: 1,
    explanation: "The mitochondria produces ATP (energy) for the cell through cellular respiration. That's why it's nicknamed the 'powerhouse'!",
    icon: <Zap size={28} strokeWidth={1.8} />,
  },
  {
    id: 2,
    question: "What is 12 × 13?",
    options: ["144", "156", "148", "162"],
    correct: 1,
    explanation: "12 × 13 = 12 × 10 + 12 × 3 = 120 + 36 = 156. Breaking multiplication into parts makes it easier!",
    icon: <Hash size={28} strokeWidth={1.8} />,
  },
  {
    id: 3,
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2,
    explanation: "WWII ended in 1945 — V-E Day (Victory in Europe) was May 8th, and V-J Day (Victory over Japan) was September 2nd.",
    icon: <Globe size={28} strokeWidth={1.8} />,
  },
  {
    id: 4,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Learning",
      "Hyper Transfer Markup Logic",
      "Home Tool Markup Language",
    ],
    correct: 0,
    explanation: "HTML = HyperText Markup Language. It's the standard language used to create web pages.",
    icon: <Monitor size={28} strokeWidth={1.8} />,
  },
  {
    id: 5,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    correct: 2,
    explanation: "Mercury is the closest planet to the Sun, sitting at an average distance of about 58 million km.",
    icon: <CircleDot size={28} strokeWidth={1.8} />,
  },
];

type Phase = "intro" | "question" | "result" | "complete";

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = questions[current];
  const total = questions.length;

  function start() { setPhase("question"); }

  function select(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, correct]);
  }

  function next() {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setPhase("complete");
    }
  }

  const percentage = Math.round((score / total) * 100);
  const blobMood = answered
    ? selected === q.correct ? "excited" : "neutral"
    : "happy";

  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 gap-8">
        <div className="flex flex-col items-center gap-6 animate-scale-in">
          <BlobCharacter size={100} mood="excited" animated />
          <div className="text-center space-y-3">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.25)" }}
            >
              <Brain size={14} strokeWidth={2} />
              <span>Daily Challenge</span>
            </div>
            <h1 className="text-3xl font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.03em" }}>
              Today&apos;s Quiz
            </h1>
            <p className="text-[#9999a8] text-sm leading-relaxed">
              5 questions across different subjects. Take your time and do your best!
            </p>
          </div>

          <div className="w-full bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-3xl p-5 space-y-4">
            {[
              { icon: <HelpCircle size={20} strokeWidth={1.8} color="#9999a8" />, label: "5 questions" },
              { icon: <Clock size={20} strokeWidth={1.8} color="#9999a8" />, label: "~3 minutes" },
              { icon: <Zap size={20} strokeWidth={1.8} color="#9999a8" />, label: "+50 XP on completion" },
              { icon: <Lightbulb size={20} strokeWidth={1.8} color="#9999a8" />, label: "Explanations after each answer" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm text-[#9999a8]">{item.label}</span>
              </div>
            ))}
          </div>

          <Button onClick={start} fullWidth size="xl">Start quiz →</Button>
          <button onClick={() => router.back()} className="text-sm text-[#3a3a3f] hover:text-[#5a5a68] transition-colors">
            Maybe later
          </button>
        </div>
      </div>
    );
  }

  if (phase === "complete") {
    const feedback =
      percentage >= 80
        ? { msg: "Excellent work!", mood: "excited" as const, color: "#00e5a0" }
        : percentage >= 60
        ? { msg: "Good effort!", mood: "happy" as const, color: "#4d9fff" }
        : { msg: "Keep practising!", mood: "neutral" as const, color: "#f5a623" };

    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 gap-8">
        <div className="flex flex-col items-center gap-6 animate-scale-in">
          <BlobCharacter size={100} mood={feedback.mood} animated />

          <div className="text-center space-y-2">
            <p className="text-lg font-semibold" style={{ color: feedback.color }}>{feedback.msg}</p>
            <h1 className="text-5xl font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.04em" }}>
              {score}/{total}
            </h1>
            <p className="text-[#5a5a68] text-sm">{percentage}% correct</p>
          </div>

          {/* Score dots */}
          <div className="flex gap-2">
            {answers.map((correct, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: correct ? "rgba(0,229,160,0.15)" : "rgba(255,77,77,0.15)",
                  border: `1px solid ${correct ? "rgba(0,229,160,0.3)" : "rgba(255,77,77,0.3)"}`,
                }}
              >
                {correct ? "✓" : "✗"}
              </div>
            ))}
          </div>

          {/* XP earned */}
          <div
            className="flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)" }}
          >
            <Zap size={24} color="#00e5a0" strokeWidth={1.8} />
            <div>
              <p className="text-[#00e5a0] font-bold text-lg">+{score * 10} XP earned</p>
              <p className="text-xs text-[#5a5a68]">Keep streaks going for bonus XP!</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Button onClick={() => { setCurrent(0); setScore(0); setAnswers([]); setSelected(null); setAnswered(false); setPhase("intro"); }} fullWidth size="xl">
              Try again
            </Button>
            <Button variant="secondary" onClick={() => router.replace("/home")} fullWidth>
              Back to home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full px-5">
      {/* Progress */}
      <div className="pt-14 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-[#141416] border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-[#5a5a68] hover:text-[#9999a8] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1 h-2 bg-[#141416] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00e5a0] rounded-full transition-all duration-500"
              style={{ width: `${((current) / total) * 100}%`, transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            />
          </div>
          <span className="text-xs font-medium text-[#5a5a68] w-10 text-right">
            {current + 1}/{total}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <BlobCharacter size={60} mood={blobMood} animated />
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1a1d] flex items-center justify-center text-[#9999a8] mx-auto">
              {q.icon}
            </div>
            <h2
              className="text-xl font-bold text-[#f5f5f7] leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              {q.question}
            </h2>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 animate-fade-up delay-100">
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect  = i === q.correct;
            const state = !answered
              ? "idle"
              : isCorrect ? "correct"
              : isSelected ? "wrong"
              : "dimmed";

            return (
              <button
                key={i}
                onClick={() => select(i)}
                disabled={answered}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300",
                  "active:scale-[0.98]",
                  state === "idle"    && "bg-[#141416] border-[rgba(255,255,255,0.07)] hover:bg-[#1a1a1d] hover:border-[rgba(255,255,255,0.15)]",
                  state === "correct" && "bg-[rgba(0,229,160,0.12)] border-[rgba(0,229,160,0.5)] shadow-[0_0_20px_rgba(0,229,160,0.12)]",
                  state === "wrong"   && "bg-[rgba(255,77,77,0.1)] border-[rgba(255,77,77,0.4)]",
                  state === "dimmed"  && "bg-[#141416] border-[rgba(255,255,255,0.04)] opacity-40"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all",
                    state === "idle"    && "bg-[#1a1a1d] text-[#5a5a68]",
                    state === "correct" && "bg-[#00e5a0] text-[#0f0f10]",
                    state === "wrong"   && "bg-[#ff4d4d] text-white",
                    state === "dimmed"  && "bg-[#1a1a1d] text-[#3a3a3f]"
                  )}
                >
                  {answered && isCorrect ? "✓" : answered && isSelected ? "✗" : String.fromCharCode(65 + i)}
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  state === "correct" ? "text-[#00e5a0]" : state === "wrong" ? "text-[#ff4d4d]" : "text-[#f5f5f7]"
                )}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className="rounded-2xl p-4 animate-slide-up"
            style={{
              background: selected === q.correct ? "rgba(0,229,160,0.08)" : "rgba(255,165,0,0.08)",
              border: `1px solid ${selected === q.correct ? "rgba(0,229,160,0.2)" : "rgba(255,165,0,0.2)"}`,
            }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: selected === q.correct ? "#00e5a0" : "#f5a623" }}>
              {selected === q.correct ? "✓ Correct!" : "Not quite — here's why:"}
            </p>
            <p className="text-sm text-[#9999a8] leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {answered && (
          <div className="mt-auto pb-8 animate-slide-up delay-200">
            <Button onClick={next} fullWidth size="xl">
              {current < total - 1 ? "Next question →" : "See results →"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
