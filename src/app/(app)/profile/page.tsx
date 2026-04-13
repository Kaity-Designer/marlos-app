"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type LearningMode = "text" | "audio" | "video" | "spatial";

const modeOptions: { id: LearningMode; label: string; emoji: string; desc: string }[] = [
  { id: "text",    label: "Text",    emoji: "📖", desc: "Reading & writing-based" },
  { id: "audio",   label: "Audio",   emoji: "🎧", desc: "Audio explanations" },
  { id: "video",   label: "Video",   emoji: "🎬", desc: "Visual & video content" },
  { id: "spatial", label: "Spatial", emoji: "🌐", desc: "Coming soon: AR/3D" },
];

const achievements = [
  { id: "1", emoji: "🌟", label: "First Lesson",    earned: true  },
  { id: "2", emoji: "🔥", label: "5-Day Streak",    earned: true  },
  { id: "3", emoji: "🧠", label: "Deep Thinker",    earned: true  },
  { id: "4", emoji: "🚀", label: "Fast Learner",    earned: false },
  { id: "5", emoji: "💎", label: "Top Student",     earned: false },
  { id: "6", emoji: "🌍", label: "Curious Explorer", earned: false },
];

const stats = [
  { label: "Lessons done",   value: "24" },
  { label: "Hours learned",  value: "8.5" },
  { label: "Topics covered", value: "12" },
  { label: "Best streak",    value: "7d"  },
];

function getStoredUser() {
  if (typeof window === "undefined") return { name: "Learner", email: "" };
  const session = JSON.parse(localStorage.getItem("marlos-session") || "{}");
  const profile = JSON.parse(localStorage.getItem("marlos-profile") || "{}");
  return {
    name: session.name || profile.name || "Learner",
    email: session.email || "",
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const stored = typeof window !== "undefined" ? getStoredUser() : { name: "Learner", email: "" };
  const [name, setName] = useState(stored.name);
  const [email] = useState(stored.email);
  const [preferredMode, setPreferredMode] = useState<LearningMode>("text");
  const [xp] = useState(420);
  const [streak] = useState(5);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(stored.name);

  function saveName() {
    if (editName.trim()) {
      setName(editName.trim());
      const session = JSON.parse(localStorage.getItem("marlos-session") || "{}");
      localStorage.setItem("marlos-session", JSON.stringify({ ...session, name: editName.trim() }));
    }
    setEditing(false);
  }

  function signOut() {
    localStorage.removeItem("marlos-session");
    router.replace("/");
  }

  const xpToNext = 100 - (xp % 100);
  const level = Math.floor(xp / 100) + 1;

  return (
    <div className="flex flex-col min-h-full overflow-y-auto scroll">
      {/* Header / Avatar */}
      <div
        className="flex flex-col items-center gap-4 px-5 pt-14 pb-8"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,229,160,0.06) 0%, transparent 70%)" }}
      >
        {/* Avatar */}
        <div className="relative animate-scale-in">
          <div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00e5a0] to-[#00a872] flex items-center justify-center text-[#0f0f10] text-3xl font-bold"
            style={{ boxShadow: "0 0 32px rgba(0,229,160,0.3)" }}
          >
            {name[0]?.toUpperCase()}
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#00e5a0] flex items-center justify-center text-xs font-bold text-[#0f0f10] border-2 border-[#0f0f10]"
          >
            {level}
          </div>
        </div>

        {/* Name */}
        {editing ? (
          <div className="flex items-center gap-2 animate-scale-in">
            <input
              autoFocus
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              className="text-xl font-bold text-center bg-transparent border-b border-[#00e5a0] text-[#f5f5f7] focus:outline-none px-2 py-1"
            />
            <button onClick={saveName} className="text-[#00e5a0] text-sm font-semibold">Save</button>
          </div>
        ) : (
          <div className="flex items-center gap-2 animate-fade-up">
            <h1 className="text-2xl font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.03em" }}>
              {name}
            </h1>
            <button
              onClick={() => { setEditing(true); setEditName(name); }}
              className="text-[#5a5a68] hover:text-[#9999a8] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {email && <p className="text-sm text-[#5a5a68]">{email}</p>}

        {/* XP bar */}
        <div className="w-full bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl p-4 space-y-2 animate-fade-up delay-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5a5a68]">Level {level}</span>
            <span className="text-xs font-semibold text-[#00e5a0]">{xp} XP · {xpToNext} to next level</span>
          </div>
          <div className="h-2 bg-[#1a1a1d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00e5a0] to-[#00c98c] rounded-full transition-all duration-1000"
              style={{ width: `${(xp % 100)}%` }}
            />
          </div>
          <div className="flex gap-2">
            <span className="text-xs text-[#5a5a68]">⚡ {xp} XP total</span>
            <span className="text-[#3a3a3f]">·</span>
            <span className="text-xs text-[#5a5a68]">🔥 {streak} day streak</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-5 pb-8">
        {/* Stats */}
        <section className="animate-fade-up delay-200">
          <h2 className="text-sm font-bold text-[#5a5a68] uppercase tracking-wider mb-3">Your progress</h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl p-4 text-center"
              >
                <p className="text-2xl font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.03em" }}>{stat.value}</p>
                <p className="text-xs text-[#5a5a68] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Preferred learning mode */}
        <section className="animate-fade-up delay-300">
          <h2 className="text-sm font-bold text-[#5a5a68] uppercase tracking-wider mb-3">Learning mode</h2>
          <div className="grid grid-cols-2 gap-2">
            {modeOptions.map((m) => (
              <button
                key={m.id}
                onClick={() => m.id !== "spatial" && setPreferredMode(m.id)}
                disabled={m.id === "spatial"}
                className={cn(
                  "flex flex-col items-start gap-1 p-4 rounded-2xl border transition-all duration-200 text-left",
                  preferredMode === m.id
                    ? "bg-[rgba(0,229,160,0.1)] border-[rgba(0,229,160,0.35)]"
                    : "bg-[#141416] border-[rgba(255,255,255,0.07)]",
                  m.id === "spatial" && "opacity-40"
                )}
              >
                <span className="text-xl">{m.emoji}</span>
                <span className={cn("text-sm font-semibold", preferredMode === m.id ? "text-[#00e5a0]" : "text-[#f5f5f7]")}>
                  {m.label}
                </span>
                <span className="text-[10px] text-[#5a5a68]">{m.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="animate-fade-up delay-400">
          <h2 className="text-sm font-bold text-[#5a5a68] uppercase tracking-wider mb-3">Achievements</h2>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-2xl border text-center",
                  a.earned
                    ? "bg-[#141416] border-[rgba(0,229,160,0.15)]"
                    : "bg-[#141416] border-[rgba(255,255,255,0.05)] opacity-40"
                )}
              >
                <span className="text-2xl">{a.emoji}</span>
                <span className="text-[10px] font-semibold text-[#9999a8] leading-tight">{a.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section className="animate-fade-up delay-500 space-y-2">
          <h2 className="text-sm font-bold text-[#5a5a68] uppercase tracking-wider mb-3">Settings</h2>
          {[
            { label: "Notifications",      icon: "🔔", action: undefined },
            { label: "Accessibility",      icon: "♿", action: undefined },
            { label: "Privacy & Data",     icon: "🔒", action: undefined },
            { label: "About Marlos",       icon: "ℹ️",  action: undefined },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl hover:bg-[#1a1a1d] transition-all active:scale-[0.98] text-left"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-sm font-medium text-[#f5f5f7]">{item.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#3a3a3f]">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </section>

        {/* Sign out */}
        <Button
          variant="danger"
          fullWidth
          onClick={signOut}
          className="animate-fade-up delay-600"
        >
          Sign out
        </Button>

        <p className="text-center text-xs text-[#3a3a3f] animate-fade-up delay-700">
          Marlos v0.1.0 · Built with ❤️
        </p>
      </div>
    </div>
  );
}
