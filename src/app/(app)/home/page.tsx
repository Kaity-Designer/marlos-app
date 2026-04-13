"use client";

import { useState } from "react";
import Link from "next/link";
import { BlobCharacter } from "@/components/ui/BlobCharacter";
import { cn } from "@/lib/utils";

type Course = {
  id: string;
  title: string;
  subject: string;
  emoji: string;
  progress: number;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
};

const featuredCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Algebra",
    subject: "Maths",
    emoji: "🔢",
    progress: 35,
    duration: "12 lessons",
    difficulty: "Beginner",
    color: "from-[#00e5a0] to-[#00a872]",
  },
  {
    id: "2",
    title: "The Human Body",
    subject: "Biology",
    emoji: "🫀",
    progress: 60,
    duration: "8 lessons",
    difficulty: "Intermediate",
    color: "from-[#4d9fff] to-[#007ae5]",
  },
  {
    id: "3",
    title: "World War II",
    subject: "History",
    emoji: "🌍",
    progress: 10,
    duration: "15 lessons",
    difficulty: "Intermediate",
    color: "from-[#f5a623] to-[#e07b00]",
  },
];

const quickTopics = [
  { id: "a", label: "Photosynthesis", emoji: "🌿", color: "#00e5a0" },
  { id: "b", label: "Pythagoras", emoji: "📐", color: "#4d9fff" },
  { id: "c", label: "The Roman Empire", emoji: "🏛️", color: "#f5a623" },
  { id: "d", label: "Short stories", emoji: "📖", color: "#a855f7" },
];

function getGreeting() {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

function getUserData() {
  if (typeof window === "undefined") return { name: "Learner" };
  const session = JSON.parse(localStorage.getItem("marlos-session") || "{}");
  const profile = JSON.parse(localStorage.getItem("marlos-profile") || "{}");
  return { name: session.name || profile.name || "Learner" };
}

export default function HomePage() {
  const [name] = useState(() => (typeof window !== "undefined" ? getUserData().name : "Learner"));
  const [greeting] = useState(() => getGreeting());
  const [xp] = useState(420);
  const [streak] = useState(5);

  return (
    <div className="flex flex-col min-h-full scroll overflow-y-auto">
      {/* Header */}
      <div
        className="px-5 pt-14 pb-6"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,25,18,0.95) 0%, rgba(15,15,16,0) 100%)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="animate-fade-up">
            <p className="text-xs text-[#5a5a68] font-medium mb-0.5">{greeting}</p>
            <h1
              className="text-2xl font-bold text-[#f5f5f7]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Hey, {name} 👋
            </h1>
          </div>
          <Link href="/profile" className="animate-fade-up delay-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00e5a0] to-[#00a872] flex items-center justify-center text-[#0f0f10] font-bold text-sm shadow-[0_0_16px_rgba(0,229,160,0.3)]">
              {name[0]?.toUpperCase()}
            </div>
          </Link>
        </div>

        {/* XP + Streak bar */}
        <div className="flex gap-3 animate-fade-up delay-200">
          <div className="flex-1 flex items-center gap-3 bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl px-4 py-3">
            <span className="text-xl">⚡</span>
            <div>
              <p className="text-[10px] text-[#5a5a68] uppercase font-semibold tracking-wider">XP</p>
              <p className="text-base font-bold text-[#f5f5f7]">{xp.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl px-4 py-3">
            <span className="text-xl">🔥</span>
            <div>
              <p className="text-[10px] text-[#5a5a68] uppercase font-semibold tracking-wider">Streak</p>
              <p className="text-base font-bold text-[#f5f5f7]">{streak} days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 px-5 pb-8">
        {/* AI Tutor quick start */}
        <Link href="/chat" className="block animate-fade-up delay-200">
          <div
            className="relative rounded-3xl p-5 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0d1f18 0%, #0f1a14 100%)",
              border: "1px solid rgba(0,229,160,0.2)",
              boxShadow: "0 0 40px rgba(0,229,160,0.08)",
            }}
          >
            {/* Glow */}
            <div
              className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #00e5a0 0%, transparent 70%)" }}
            />
            <div className="relative flex items-center gap-4">
              <BlobCharacter size={56} mood="happy" animated />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#00e5a0] font-semibold uppercase tracking-wider mb-1">
                  AI Tutor
                </p>
                <p className="text-base font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.02em" }}>
                  What do you want to explore today?
                </p>
                <p className="text-xs text-[#5a5a68] mt-1">Ask me anything →</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Continue learning */}
        <section className="animate-fade-up delay-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.02em" }}>
              Continue learning
            </h2>
            <Link href="/library" className="text-xs text-[#00e5a0] font-medium">
              See all
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-1 -mx-5 px-5 scroll">
            {featuredCourses.map((course, i) => (
              <Link
                key={course.id}
                href={`/library/${course.id}`}
                className="flex-shrink-0 w-60"
                style={{ animationDelay: `${i * 80 + 300}ms` }}
              >
                <div className="bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-3xl overflow-hidden hover-lift">
                  {/* Card header gradient */}
                  <div
                    className={cn("h-28 flex items-center justify-center bg-gradient-to-br", course.color)}
                    style={{ opacity: 0.9 }}
                  >
                    <span className="text-5xl">{course.emoji}</span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-[10px] text-[#5a5a68] uppercase font-semibold tracking-wider mb-1">
                        {course.subject}
                      </p>
                      <p className="text-sm font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.01em" }}>
                        {course.title}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#5a5a68]">{course.duration}</span>
                        <span className="text-xs font-semibold text-[#00e5a0]">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1a1a1d] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00e5a0] rounded-full transition-all duration-700"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick ask topics */}
        <section className="animate-fade-up delay-400">
          <h2 className="text-base font-bold text-[#f5f5f7] mb-4" style={{ letterSpacing: "-0.02em" }}>
            Quick topics
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickTopics.map((topic, i) => (
              <Link
                key={topic.id}
                href={`/chat?topic=${encodeURIComponent(topic.label)}`}
                style={{ animationDelay: `${i * 60 + 400}ms` }}
              >
                <div
                  className="flex items-center gap-3 p-4 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#141416] hover:bg-[#1a1a1d] transition-all duration-200 active:scale-[0.97] press-scale"
                >
                  <span className="text-2xl">{topic.emoji}</span>
                  <span className="text-sm font-semibold text-[#f5f5f7] leading-tight">{topic.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Daily challenge */}
        <section className="animate-fade-up delay-500">
          <Link href="/quiz">
            <div
              className="relative rounded-3xl p-5 overflow-hidden border"
              style={{
                background: "linear-gradient(135deg, #1a0f2e 0%, #120f1a 100%)",
                borderColor: "rgba(168,85,247,0.25)",
              }}
            >
              <div
                className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
              />
              <div className="flex items-center gap-4 relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.2)" }}
                >
                  🧠
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#a855f7] uppercase tracking-wider mb-1">Daily challenge</p>
                  <p className="text-sm font-bold text-[#f5f5f7]">5 questions · 3 min</p>
                  <p className="text-xs text-[#5a5a68] mt-0.5">+50 XP on completion</p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
