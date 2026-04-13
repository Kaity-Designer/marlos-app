"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell, Accessibility, Lock, Info, ChevronRight,
  Zap, Flame, BookText, Headphones, Play, Globe,
  Star, Trophy, Brain, Rocket, Gem, Compass, Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type LearningMode = "text" | "audio" | "video" | "spatial";

const modeOptions: { id: LearningMode; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "text",    label: "Text",    icon: <BookText size={20} strokeWidth={1.8} />,     desc: "Reading & writing-based" },
  { id: "audio",   label: "Audio",   icon: <Headphones size={20} strokeWidth={1.8} />,   desc: "Audio explanations" },
  { id: "video",   label: "Video",   icon: <Play size={20} strokeWidth={1.8} />,          desc: "Visual & video content" },
  { id: "spatial", label: "Spatial", icon: <Globe size={20} strokeWidth={1.8} />,         desc: "Coming soon: AR/3D" },
];

const achievements = [
  { id: "1", icon: <Star size={22} strokeWidth={1.5} />,    label: "First Lesson",     earned: true  },
  { id: "2", icon: <Flame size={22} strokeWidth={1.5} />,   label: "5-Day Streak",     earned: true  },
  { id: "3", icon: <Brain size={22} strokeWidth={1.5} />,   label: "Deep Thinker",     earned: true  },
  { id: "4", icon: <Rocket size={22} strokeWidth={1.5} />,  label: "Fast Learner",     earned: false },
  { id: "5", icon: <Gem size={22} strokeWidth={1.5} />,     label: "Top Student",      earned: false },
  { id: "6", icon: <Compass size={22} strokeWidth={1.5} />, label: "Curious Explorer", earned: false },
];

const stats = [
  { label: "Lessons done",   value: "24"  },
  { label: "Hours learned",  value: "8.5" },
  { label: "Topics covered", value: "12"  },
  { label: "Best streak",    value: "7d"  },
];

const settingsItems = [
  { label: "Notifications",  icon: <Bell size={18} strokeWidth={1.8} /> },
  { label: "Accessibility",  icon: <Accessibility size={18} strokeWidth={1.8} /> },
  { label: "Privacy & Data", icon: <Lock size={18} strokeWidth={1.8} /> },
  { label: "About Marlos",   icon: <Info size={18} strokeWidth={1.8} /> },
];

function getStoredUser() {
  if (typeof window === "undefined") return { name: "Learner", email: "" };
  const session = JSON.parse(localStorage.getItem("marlos-session") || "{}");
  const profile = JSON.parse(localStorage.getItem("marlos-profile") || "{}");
  return { name: session.name || profile.name || "Learner", email: session.email || "" };
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
    <div className="flex flex-col min-h-full overflow-y-auto">
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
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#00e5a0] flex items-center justify-center text-xs font-bold text-[#0f0f10] border-2 border-[#0f0f10]">
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
              className="text-[#7a7a90] hover:text-[#9999a8] transition-colors"
            >
              <Pencil size={14} strokeWidth={2} />
            </button>
          </div>
        )}

        {email && <p className="text-sm text-[#9999a8]">{email}</p>}

        {/* XP bar */}
        <div className="w-full bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl p-4 space-y-2 animate-fade-up delay-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9999a8]">Level {level}</span>
            <span className="text-xs font-semibold text-[#00e5a0]">{xp} XP · {xpToNext} to next level</span>
          </div>
          <div className="h-2 bg-[#1a1a1d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00e5a0] to-[#00c98c] rounded-full transition-all duration-1000"
              style={{ width: `${(xp % 100)}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Zap size={11} strokeWidth={2} color="#00e5a0" />
            <span className="text-xs text-[#9999a8]">{xp} XP total</span>
            <span className="text-[#6a6a78]">·</span>
            <Flame size={11} strokeWidth={2} color="#f5a623" />
            <span className="text-xs text-[#9999a8]">{streak} day streak</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-5 pb-8">
        {/* Stats */}
        <section className="animate-fade-up delay-200">
          <h2 className="text-sm font-bold text-[#9999a8] uppercase tracking-wider mb-3">Your progress</h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.03em" }}>{stat.value}</p>
                <p className="text-xs text-[#9999a8] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Learning mode */}
        <section className="animate-fade-up delay-300">
          <h2 className="text-sm font-bold text-[#9999a8] uppercase tracking-wider mb-3">Learning mode</h2>
          <div className="grid grid-cols-2 gap-2">
            {modeOptions.map((m) => (
              <button
                key={m.id}
                onClick={() => m.id !== "spatial" && setPreferredMode(m.id)}
                disabled={m.id === "spatial"}
                className={cn(
                  "flex flex-col items-start gap-1.5 p-4 rounded-2xl border transition-all duration-200 text-left",
                  preferredMode === m.id
                    ? "border-[rgba(0,229,160,0.35)]"
                    : "bg-[#141416] border-[rgba(255,255,255,0.07)]",
                  m.id === "spatial" && "opacity-40"
                )}
                style={preferredMode === m.id ? { backgroundColor: "rgba(0,229,160,0.12)" } : {}}
              >
                <span style={{ color: preferredMode === m.id ? "#00e5a0" : "#9999a8" }}>{m.icon}</span>
                <span className={cn("text-sm font-semibold", preferredMode === m.id ? "text-[#00e5a0]" : "text-[#f5f5f7]")}>
                  {m.label}
                </span>
                <span className="text-[10px] text-[#9999a8]">{m.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="animate-fade-up delay-400">
          <h2 className="text-sm font-bold text-[#9999a8] uppercase tracking-wider mb-3">Achievements</h2>
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
                <span style={{ color: a.earned ? "#00e5a0" : "#9999a8" }}>{a.icon}</span>
                <span className="text-[10px] font-semibold text-[#c8c8d4] leading-tight">{a.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section className="animate-fade-up delay-500 space-y-2">
          <h2 className="text-sm font-bold text-[#9999a8] uppercase tracking-wider mb-3">Settings</h2>
          {settingsItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl hover:bg-[#1a1a1d] transition-all active:scale-[0.98] text-left"
            >
              <span className="text-[#9999a8]">{item.icon}</span>
              <span className="flex-1 text-sm font-medium text-[#f5f5f7]">{item.label}</span>
              <ChevronRight size={14} strokeWidth={2} color="#9999a8" />
            </button>
          ))}
        </section>

        {/* Sign out */}
        <Button variant="danger" fullWidth onClick={signOut} className="animate-fade-up delay-600">
          Sign out
        </Button>

        <p className="text-center text-xs text-[#9999a8] animate-fade-up delay-700">
          Marlos v0.1.0
        </p>
      </div>
    </div>
  );
}
