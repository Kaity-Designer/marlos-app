"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles, Brain, Zap, ChevronRight } from "lucide-react";

type QuizMode = "practice" | "timed" | "challenge";

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: number;
  duration: number;
  progress: number;
  status: "new" | "in-progress" | "completed";
}

const categories = [
  { id: "all", name: "All", icon: Sparkles },
  { id: "math", name: "Math", icon: Brain },
  { id: "nature", name: "Nature", icon: Sparkles },
  { id: "history", name: "History", icon: Sparkles },
  { id: "logic", name: "Logic", icon: Zap },
  { id: "science", name: "Science", icon: Sparkles },
];

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Solar System Basics",
    category: "Nature",
    difficulty: 2,
    duration: 5,
    progress: 60,
    status: "in-progress",
  },
  {
    id: "2",
    title: "Multiplication Master",
    category: "Math",
    difficulty: 3,
    duration: 8,
    progress: 0,
    status: "new",
  },
  {
    id: "3",
    title: "Ancient Wonders",
    category: "History",
    difficulty: 2,
    duration: 6,
    progress: 100,
    status: "completed",
  },
  {
    id: "4",
    title: "Pattern Recognition",
    category: "Logic",
    difficulty: 4,
    duration: 10,
    progress: 25,
    status: "in-progress",
  },
  {
    id: "5",
    title: "Chemical Elements",
    category: "Science",
    difficulty: 3,
    duration: 7,
    progress: 0,
    status: "new",
  },
];

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModeSelector, setShowModeSelector] = useState<string | null>(null);

  const filteredQuizzes = selectedCategory === "all" 
    ? quizzes 
    : quizzes.filter((q) => q.category.toLowerCase() === selectedCategory);

  const handleQuizClick = (quiz: Quiz) => {
    setShowModeSelector(quiz.id);
  };

  const handleModeSelect = (mode: QuizMode) => {
    setShowModeSelector(null);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a] pb-32">
      {/* Header */}
      <div className="px-5 pt-16 pb-6">
        <h1 className="text-white text-center mb-2">Quiz Time! 🎮</h1>
        <p className="text-white/70 text-center">Let's test what you know</p>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-full bg-[#1a1a1c] border border-white/5 rounded-[20px] pl-12 pr-4 py-4 text-white/90 placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-5 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#00e5a0] text-[#121212] shadow-[0px_4px_12px_0px_rgba(0,206,147,0.3)]"
                    : "bg-[rgba(26,26,28,0.8)] border border-white/5 text-white/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Quiz CTA */}
      {quizzes.find((q) => q.status === "in-progress") && (
        <div className="px-5 mb-8">
          <motion.button
            onClick={() => handleQuizClick(quizzes.find((q) => q.status === "in-progress")!)}
            className="w-full bg-gradient-to-r from-[#00e5a0] to-[#00a076] rounded-[24px] p-6 shadow-[0px_8px_24px_0px_rgba(0,206,147,0.25)] relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            <div className="relative flex items-center justify-between">
              <div className="text-left">
                <p className="text-[#121212]/60 mb-1">Continue where you left off</p>
                <h3 className="text-[#121212]">Solar System Basics</h3>
              </div>
              <div className="bg-[#121212]/10 rounded-full px-4 py-2">
                <span className="text-[#121212]">60%</span>
              </div>
            </div>
          </motion.button>
        </div>
      )}

      {/* Quiz Cards */}
      <div className="px-5 space-y-4">
        {filteredQuizzes.map((quiz) => (
          <motion.button
            key={quiz.id}
            onClick={() => handleQuizClick(quiz)}
            className="w-full bg-[#1a1a1c] border border-white/5 rounded-[24px] p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.3)] hover:border-[#00e5a0]/30 transition-all group relative text-left"
            whileHover={{ borderColor: "rgba(0,229,160,0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#00e5a0]">{quiz.category}</span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: quiz.difficulty }).map((_, i) => (
                      <span key={i} className="text-amber-500">⭐</span>
                    ))}
                  </span>
                </div>
                <h3 className="text-white mb-2">{quiz.title}</h3>
                <p className="text-white/50">~{quiz.duration} min</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  quiz.status === "new"
                    ? "bg-[#00e5a0] text-[#121212]"
                    : quiz.status === "in-progress"
                    ? "bg-amber-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {quiz.status === "new" ? "New" : quiz.status === "in-progress" ? "In Progress" : "Completed"}
              </div>
            </div>

            {quiz.status !== "new" && (
              <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#00e5a0] h-full transition-all"
                  style={{ width: `${quiz.progress}%` }}
                />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Mode Selector Modal */}
      {showModeSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-[220px] bg-[rgba(42,41,44,0.85)] relative rounded-[24px] w-full max-w-md border border-white/10"
          >
            <div className="flex flex-col gap-4 items-center pb-6 pt-8 px-6">
              {/* Header */}
              <p className="text-white/70 text-center text-base">Choose your mode</p>

              {/* Mode Buttons */}
              <div className="w-full space-y-3">
                <motion.button
                  onClick={() => handleModeSelect("practice")}
                  className="w-full bg-[rgba(0,206,147,0.2)] rounded-[16px] p-4 hover:bg-[rgba(0,206,147,0.3)] transition-all border border-[rgba(0,206,147,0.5)] flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Brain className="w-5 h-5 text-[#00e5a0] flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-white text-base font-medium">Practice Mode</p>
                    <p className="text-white/60 text-sm">Learn as you go</p>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => handleModeSelect("timed")}
                  className="w-full bg-[rgba(254,154,0,0.2)] rounded-[16px] p-4 hover:bg-[rgba(254,154,0,0.3)] transition-all border border-[rgba(254,154,0,0.5)] flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Zap className="w-5 h-5 text-[#fe9a00] flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-white text-base font-medium">Timed Mode</p>
                    <p className="text-white/60 text-sm">Race against the clock</p>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => handleModeSelect("challenge")}
                  className="w-full bg-[rgba(251,44,54,0.2)] rounded-[16px] p-4 hover:bg-[rgba(251,44,54,0.3)] transition-all border border-[rgba(251,44,54,0.5)] flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-5 h-5 text-[#fb2c36] flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-white text-base font-medium">Challenge Mode</p>
                    <p className="text-white/60 text-sm">3 lives - leaderboard</p>
                  </div>
                </motion.button>
              </div>

              {/* Cancel Button */}
              <motion.button
                onClick={() => setShowModeSelector(null)}
                className="w-full bg-[rgba(255,255,255,0.05)] rounded-[16px] p-3 hover:bg-[rgba(255,255,255,0.1)] transition-all border border-[rgba(255,255,255,0.1)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="text-white/70 text-base text-center">Cancel</p>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
