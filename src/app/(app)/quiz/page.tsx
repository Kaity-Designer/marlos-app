"use client";

import { useState } from "react";
import { Search, Sparkles, Brain, Zap, ArrowLeft, Heart, Clock, Target, Trophy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlobCharacter } from "@/components/ui/BlobCharacter";

type QuizMode = "practice" | "timed" | "challenge";
type QuizStatus = "new" | "in-progress" | "completed";
type QuizView = "home" | "game" | "results";

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: number;
  duration: number;
  progress: number;
  status: QuizStatus;
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
  { id: "1", title: "Solar System Basics",    category: "Nature",  difficulty: 2, duration: 5,  progress: 60,  status: "in-progress" },
  { id: "2", title: "Multiplication Master",  category: "Math",    difficulty: 3, duration: 8,  progress: 0,   status: "new" },
  { id: "3", title: "Ancient Wonders",        category: "History", difficulty: 2, duration: 6,  progress: 100, status: "completed" },
  { id: "4", title: "Pattern Recognition",    category: "Logic",   difficulty: 4, duration: 10, progress: 25,  status: "in-progress" },
  { id: "5", title: "Chemical Elements",      category: "Science", difficulty: 3, duration: 7,  progress: 0,   status: "new" },
];

const questions = [
  { id: 1, question: "Which of these is a planet in our solar system?", options: ["Mars", "Sun", "Moon", "Asteroid"], correctAnswer: "Mars", feedback: "That's right! Mars is the fourth planet from the Sun!" },
  { id: 2, question: "What is 8 x 7?", options: ["54", "56", "63", "48"], correctAnswer: "56", feedback: "Correct! 8 x 7 = 56. Great job!" },
  { id: 3, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars", feedback: "Excellent! Mars appears red due to iron oxide on its surface!" },
  { id: 4, question: "What gas do plants breathe in?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: "Carbon Dioxide", feedback: "That's right! Plants use CO2 for photosynthesis." },
  { id: 5, question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correctAnswer: "7", feedback: "Correct! There are 7 continents: Africa, Antarctica, Asia, Australia/Oceania, Europe, North America, South America." },
];

// ── Quiz Home ──────────────────────────────────────────────────────────────────

function QuizHome({ onStartQuiz }: { onStartQuiz: (quiz: Quiz, mode: QuizMode) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModeSelector, setShowModeSelector] = useState<string | null>(null);

  const filtered = selectedCategory === "all" ? quizzes : quizzes.filter(q => q.category.toLowerCase() === selectedCategory);
  const inProgress = quizzes.find(q => q.status === "in-progress");

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a] pb-32">
      {/* Header */}
      <div className="px-5 pt-16 pb-6 text-center">
        <h1 className="text-white text-2xl font-bold mb-1">Quiz Time! 🎮</h1>
        <p className="text-white/70">Let's test what you know</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input type="text" placeholder="Search quizzes..." className="w-full bg-[#1a1a1c] border border-white/5 rounded-[20px] pl-12 pr-4 py-4 text-white/90 placeholder:text-white/40 outline-none" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-5 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className="flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all"
                style={selectedCategory === cat.id
                  ? { backgroundColor: "#00ce93", color: "#121212", boxShadow: "0px 4px 12px rgba(0,206,147,0.3)" }
                  : { backgroundColor: "rgba(26,26,28,0.8)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.05)" }
                }
              >
                <Icon className="w-4 h-4" />{cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue CTA */}
      {inProgress && (
        <div className="px-5 mb-8">
          <button onClick={() => setShowModeSelector(inProgress.id)} className="w-full bg-gradient-to-r from-[#00ce93] to-[#00a076] rounded-[24px] p-6 shadow-[0px_8px_24px_0px_rgba(0,206,147,0.25)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            <div className="relative flex items-center justify-between">
              <div className="text-left">
                <p className="text-[#121212]/60 mb-1 text-sm">Continue where you left off</p>
                <h3 className="text-[#121212] font-bold">{inProgress.title}</h3>
              </div>
              <div className="bg-[#121212]/10 rounded-full px-4 py-2">
                <span className="text-[#121212] font-semibold">{inProgress.progress}%</span>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Quiz Cards */}
      <div className="px-5 space-y-4">
        {filtered.map(quiz => (
          <button key={quiz.id} onClick={() => setShowModeSelector(quiz.id)}
            className="w-full bg-[#1a1a1c] border border-white/5 rounded-[24px] p-6 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.3)] hover:border-[#00ce93]/30 transition-all text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#00ce93] text-sm">{quiz.category}</span>
                  <span className="flex gap-0.5">{Array.from({ length: quiz.difficulty }).map((_, i) => <span key={i} className="text-amber-500 text-xs">⭐</span>)}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">{quiz.title}</h3>
                <p className="text-white/50 text-sm">~{quiz.duration} min</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${quiz.status === "new" ? "text-[#121212]" : quiz.status === "in-progress" ? "bg-amber-500 text-white" : "bg-gray-500 text-white"}`}
                style={quiz.status === "new" ? { backgroundColor: "#00ce93" } : {}}
              >
                {quiz.status === "new" ? "New" : quiz.status === "in-progress" ? "In Progress" : "Completed"}
              </span>
            </div>
            {quiz.status !== "new" && (
              <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                <div className="bg-[#00ce93] h-full transition-all" style={{ width: `${quiz.progress}%` }} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Mode Selector Modal */}
      <AnimatePresence>
        {showModeSelector && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowModeSelector(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative rounded-[24px] w-full max-w-md overflow-hidden"
              style={{ backgroundColor: "rgba(42,41,44,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex flex-col gap-4 items-center pb-6 pt-8 px-6">
                <p className="text-white/70 text-center text-base">Choose your mode</p>
                <div className="flex flex-col gap-2 w-full">
                  {[
                    { mode: "practice" as const, label: "Practice Mode", desc: "Learn as you go", icon: Brain, color: "#00CE93", bg: "rgba(0,206,147,0.2)", border: "rgba(0,206,147,0.5)" },
                    { mode: "timed" as const,    label: "Timed Mode",    desc: "Race against the clock", icon: Zap, color: "#FE9A00", bg: "rgba(254,154,0,0.2)", border: "rgba(254,154,0,0.5)" },
                    { mode: "challenge" as const, label: "Challenge Mode", desc: "3 lives - leaderboard", icon: Sparkles, color: "#FB2C36", bg: "rgba(251,44,54,0.2)", border: "rgba(251,44,54,0.5)" },
                  ].map(m => (
                    <button key={m.mode} onClick={() => { setShowModeSelector(null); onStartQuiz(quizzes.find(q => q.id === showModeSelector)!, m.mode); }}
                      className="h-[77px] relative rounded-[16px] w-full transition-all flex items-center justify-center"
                      style={{ backgroundColor: m.bg, border: `0.5px solid ${m.border}` }}
                    >
                      <div className="flex items-center gap-3">
                        <m.icon className="w-5 h-5 shrink-0" style={{ color: m.color }} />
                        <div className="text-left">
                          <p className="text-white font-medium">{m.label}</p>
                          <p className="text-white/60 text-sm">{m.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => setShowModeSelector(null)} className="h-[49px] relative rounded-[16px] w-full flex items-center justify-center transition-all" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)" }}>
                    <p className="text-white/70">Cancel</p>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Quiz Game ──────────────────────────────────────────────────────────────────

function QuizGame({ quiz, mode, onComplete, onBack }: { quiz: Quiz; mode: QuizMode; onComplete: (score: number, total: number) => void; onBack: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(mode === "challenge" ? 3 : 99);
  const [timeLeft, setTimeLeft] = useState(mode === "timed" ? 60 : 0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = questions[currentQ];
  const blobMood = showFeedback ? (isCorrect ? "excited" : "thinking") : "neutral";

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    const correct = answer === question.correctAnswer;
    setSelected(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    let newScore = score + (correct ? 1 : 0);
    if (correct) setScore(newScore);
    else if (mode === "challenge") setLives(l => l - 1);

    setTimeout(() => {
      setShowFeedback(false);
      setSelected(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(c => c + 1);
      } else {
        onComplete(newScore, questions.length);
      }
    }, 1800);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a] overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-12 px-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            {mode === "timed" && (
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-white text-sm">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
              </div>
            )}
            {mode === "challenge" && (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
                {Array.from({ length: lives }).map((_, i) => <Heart key={i} className="w-4 h-4 text-red-500 fill-red-500" />)}
              </div>
            )}
            <div className="bg-[#00ce93]/20 border border-[#00ce93]/30 rounded-full px-4 py-2">
              <span className="text-[#00ce93] text-sm font-semibold">{score} pts</span>
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-1.5 mb-2">
          {questions.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ backgroundColor: i < currentQ ? "#00ce93" : i === currentQ ? "rgba(0,206,147,0.5)" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
        <p className="text-white/60 text-xs text-right">{currentQ + 1} of {questions.length}</p>
      </div>

      {/* Blob */}
      <div className="absolute top-[120px] left-0 right-0 flex justify-center">
        <motion.div animate={{ scale: showFeedback ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.4 }}>
          <BlobCharacter size={130} mood={blobMood} animated />
        </motion.div>
      </div>

      {/* Question */}
      <div className="absolute top-[310px] left-0 right-0 bottom-0 px-5 overflow-y-auto pb-8">
        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h2 className="text-white text-lg font-semibold text-center mb-6 leading-snug">{question.question}</h2>
            <div className="grid grid-cols-2 gap-3">
              {question.options.map(opt => {
                let bg = "rgba(26,26,28,0.8)";
                let border = "rgba(255,255,255,0.1)";
                let textColor = "white";
                if (showFeedback && selected === opt) {
                  bg = isCorrect ? "rgba(0,206,147,0.25)" : "rgba(251,44,54,0.25)";
                  border = isCorrect ? "#00ce93" : "#FB2C36";
                  textColor = isCorrect ? "#00ce93" : "#FB2C36";
                } else if (showFeedback && opt === question.correctAnswer) {
                  bg = "rgba(0,206,147,0.15)";
                  border = "rgba(0,206,147,0.5)";
                  textColor = "#00ce93";
                }
                return (
                  <motion.button key={opt} onClick={() => handleAnswer(opt)} whileTap={{ scale: 0.97 }}
                    className="p-4 rounded-[18px] text-center font-medium transition-all"
                    style={{ backgroundColor: bg, border: `1px solid ${border}`, color: textColor }}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 rounded-[18px] text-center"
                  style={{ backgroundColor: isCorrect ? "rgba(0,206,147,0.15)" : "rgba(251,44,54,0.15)", border: `1px solid ${isCorrect ? "rgba(0,206,147,0.4)" : "rgba(251,44,54,0.4)"}` }}
                >
                  <p className="font-semibold mb-1" style={{ color: isCorrect ? "#00ce93" : "#FB2C36" }}>{isCorrect ? "Correct! 🎉" : "Not quite! 💪"}</p>
                  <p className="text-white/80 text-sm">{question.feedback}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Quiz Results ───────────────────────────────────────────────────────────────

function QuizResults({ score, total, onBackToHome }: { score: number; total: number; onBackToHome: () => void }) {
  const percentage = Math.round((score / total) * 100);
  const msg = percentage >= 90 ? { text: "Outstanding! 🌟", color: "#00ce93" } : percentage >= 70 ? { text: "Great job! 🎉", color: "#00ce93" } : percentage >= 50 ? { text: "Good effort! 💪", color: "#f59e0b" } : { text: "Keep practicing! 📚", color: "#ef4444" };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a] flex flex-col items-center justify-center px-5 pb-12 overflow-hidden">
      {/* Blob */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="mb-6">
        <BlobCharacter size={140} mood={percentage >= 70 ? "excited" : "neutral"} animated />
      </motion.div>

      {/* Score */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-8">
        <h1 className="text-white text-2xl font-bold mb-2">{msg.text}</h1>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Trophy className="w-6 h-6 text-amber-500" />
          <span className="text-white/70">Your Score</span>
        </div>
        <div className="text-[60px] font-bold text-white leading-none mb-1">{score}/{total}</div>
        <div className="text-[32px] font-bold" style={{ color: msg.color }}>{percentage}%</div>
      </motion.div>

      {/* Stats Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full max-w-md space-y-3 mb-8">
        <div className="bg-[#1a1a1c] border border-white/10 rounded-[20px] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Target className="w-5 h-5 text-[#00ce93]" /><span className="text-white">Correct</span></div>
            <span className="text-[#00ce93] font-semibold">{score}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-red-500" /><span className="text-white">Incorrect</span></div>
            <span className="text-red-500 font-semibold">{total - score}</span>
          </div>
        </div>
        <div className="bg-[#1a1a1c] border border-white/10 rounded-[20px] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white">Overall Progress</span><span className="text-white/70">{percentage}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: 0.6 }} className="h-full rounded-full" style={{ backgroundColor: msg.color }} />
          </div>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="w-full max-w-md space-y-3">
        <button onClick={onBackToHome} className="w-full py-4 rounded-[20px] flex items-center justify-center gap-2 text-[#121212] font-semibold shadow-[0px_4px_12px_0px_rgba(0,206,147,0.3)] transition-all" style={{ background: "linear-gradient(to right, #00ce93, #00a076)" }}>
          <Sparkles className="w-5 h-5" />Try Another Quiz
        </button>
        <button onClick={onBackToHome} className="w-full py-4 rounded-[20px] bg-white/10 border border-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
          <RotateCcw className="w-5 h-5" />Back to Home
        </button>
      </motion.div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [view, setView] = useState<QuizView>("home");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizMode, setQuizMode] = useState<QuizMode>("practice");
  const [score, setScore] = useState(0);
  const [totalQs, setTotalQs] = useState(5);

  const handleStart = (quiz: Quiz, mode: QuizMode) => { setSelectedQuiz(quiz); setQuizMode(mode); setView("game"); };
  const handleComplete = (s: number, t: number) => { setScore(s); setTotalQs(t); setView("results"); };
  const handleBack = () => { setView("home"); setSelectedQuiz(null); };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a]">
      {view === "home" && <QuizHome onStartQuiz={handleStart} />}
      {view === "game" && selectedQuiz && <QuizGame quiz={selectedQuiz} mode={quizMode} onComplete={handleComplete} onBack={handleBack} />}
      {view === "results" && <QuizResults score={score} total={totalQs} onBackToHome={handleBack} />}
    </div>
  );
}
