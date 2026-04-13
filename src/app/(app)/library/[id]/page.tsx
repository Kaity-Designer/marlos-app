"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, Hash, HeartPulse, Globe, Code2,
  PenLine, FlaskConical, Landmark, Languages,
  Clock, BookOpen, BarChart2, Play, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const courses: Record<string, {
  title: string;
  subject: string;
  difficulty: string;
  lessons: number;
  duration: string;
  progress: number;
  accent: string;
  gradient: string;
  icon: React.ReactNode;
  description: string;
  topics: string[];
}> = {
  "1": {
    title: "Introduction to Algebra",
    subject: "Maths",
    difficulty: "Beginner",
    lessons: 12,
    duration: "~4 hours",
    progress: 35,
    accent: "#00e5a0",
    gradient: "from-[#00e5a0] to-[#00a872]",
    icon: <Hash size={32} strokeWidth={1.5} color="#fff" />,
    description: "Master the foundations of algebra — from variables and expressions to solving equations and graphing lines. Perfect for students aged 11–13.",
    topics: ["Variables & expressions", "Solving equations", "Inequalities", "Linear functions", "Graphing", "Word problems"],
  },
  "2": {
    title: "The Human Body",
    subject: "Biology",
    difficulty: "Intermediate",
    lessons: 8,
    duration: "~3 hours",
    progress: 60,
    accent: "#4d9fff",
    gradient: "from-[#4d9fff] to-[#007ae5]",
    icon: <HeartPulse size={32} strokeWidth={1.5} color="#fff" />,
    description: "Explore the incredible systems that keep us alive — from the heart and lungs to the nervous system and digestion.",
    topics: ["Skeletal system", "Muscular system", "Circulatory system", "Respiratory system", "Digestive system", "Nervous system"],
  },
  "3": {
    title: "World War II",
    subject: "History",
    difficulty: "Intermediate",
    lessons: 15,
    duration: "~5 hours",
    progress: 10,
    accent: "#f5a623",
    gradient: "from-[#f5a623] to-[#e07b00]",
    icon: <Globe size={32} strokeWidth={1.5} color="#fff" />,
    description: "A comprehensive look at the causes, key events, and lasting impact of the Second World War across Europe, Asia, and beyond.",
    topics: ["Rise of fascism", "The Holocaust", "Major battles", "Allied strategy", "The Pacific theatre", "Post-war world"],
  },
  "4": {
    title: "Python Fundamentals",
    subject: "Coding",
    difficulty: "Beginner",
    lessons: 20,
    duration: "~8 hours",
    progress: 0,
    accent: "#a855f7",
    gradient: "from-[#a855f7] to-[#7c3aed]",
    icon: <Code2 size={32} strokeWidth={1.5} color="#fff" />,
    description: "Start your coding journey with Python — the world's most beginner-friendly programming language used by scientists, developers, and creators.",
    topics: ["Variables & types", "Control flow", "Functions", "Lists & loops", "Dictionaries", "Mini projects"],
  },
  "5": {
    title: "Shakespeare & Poetry",
    subject: "English",
    difficulty: "Advanced",
    lessons: 10,
    duration: "~4 hours",
    progress: 80,
    accent: "#f43f5e",
    gradient: "from-[#f43f5e] to-[#e11d48]",
    icon: <PenLine size={32} strokeWidth={1.5} color="#fff" />,
    description: "Dive into the rich world of Shakespeare's plays and the art of poetic analysis. Build skills in language, metaphor, and literary interpretation.",
    topics: ["Introduction to Shakespeare", "Romeo & Juliet", "Macbeth key themes", "Sonnet analysis", "Metaphor & imagery", "Essay writing"],
  },
  "6": {
    title: "Cell Biology",
    subject: "Science",
    difficulty: "Intermediate",
    lessons: 14,
    duration: "~5 hours",
    progress: 25,
    accent: "#00e5a0",
    gradient: "from-[#00e5a0] to-[#4d9fff]",
    icon: <FlaskConical size={32} strokeWidth={1.5} color="#fff" />,
    description: "Zoom into the microscopic world of cells — the building blocks of all living things. Understand cell structure, function, and division.",
    topics: ["Cell structure", "Cell membrane", "Mitochondria", "DNA & the nucleus", "Cell division", "Photosynthesis"],
  },
  "7": {
    title: "Ancient Rome",
    subject: "History",
    difficulty: "Beginner",
    lessons: 11,
    duration: "~3.5 hours",
    progress: 0,
    accent: "#f5a623",
    gradient: "from-[#f5a623] to-[#f43f5e]",
    icon: <Landmark size={32} strokeWidth={1.5} color="#fff" />,
    description: "Travel back to one of history's greatest empires — from the founding of Rome to its legendary rulers, gladiators, and eventual fall.",
    topics: ["Founding of Rome", "The Republic", "Julius Caesar", "The Roman Empire", "Daily life", "The fall of Rome"],
  },
  "8": {
    title: "Conversational Spanish",
    subject: "Languages",
    difficulty: "Beginner",
    lessons: 18,
    duration: "~6 hours",
    progress: 45,
    accent: "#ef4444",
    gradient: "from-[#ef4444] to-[#f97316]",
    icon: <Languages size={32} strokeWidth={1.5} color="#fff" />,
    description: "Learn to speak Spanish confidently for everyday situations — greetings, shopping, travel, and making friends.",
    topics: ["Greetings & introductions", "Numbers & time", "Food & dining", "Directions & travel", "Family & people", "Common phrases"],
  },
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const course = courses[id];

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full gap-6 px-6 text-center">
        <BookOpen size={48} strokeWidth={1.2} color="#9999a8" />
        <div>
          <h2 className="text-xl font-bold text-[#f5f5f7] mb-2">Course not found</h2>
          <p className="text-sm text-[#9999a8]">This course doesn&apos;t exist or may have been removed.</p>
        </div>
        <Button onClick={() => router.replace("/library")} variant="secondary">
          Back to Library
        </Button>
      </div>
    );
  }

  const completedLessons = Math.round((course.progress / 100) * course.lessons);

  return (
    <div className="flex flex-col min-h-full overflow-y-auto">
      {/* Hero header */}
      <div className={cn("relative bg-gradient-to-br pt-14 pb-8 px-5 overflow-hidden", course.gradient)}>
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Library
        </button>

        {/* Radial glow */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)" }} />

        <div className="relative flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
            {course.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">{course.subject}</p>
            <h1 className="text-2xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
              {course.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-white/70 bg-white/15 px-2.5 py-1 rounded-full font-medium">
                {course.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {course.progress > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-xs text-white/70 mb-1.5">
              <span>{completedLessons} of {course.lessons} lessons</span>
              <span>{course.progress}% complete</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 px-5 pt-6 pb-8">
        {/* Stats row */}
        <div className="flex gap-3">
          {[
            { icon: <BookOpen size={16} strokeWidth={1.8} />, label: `${course.lessons} lessons` },
            { icon: <Clock size={16} strokeWidth={1.8} />, label: course.duration },
            { icon: <BarChart2 size={16} strokeWidth={1.8} />, label: course.difficulty },
          ].map((stat) => (
            <div key={stat.label}
              className="flex-1 flex flex-col items-center gap-1.5 bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl py-3">
              <span style={{ color: course.accent }}>{stat.icon}</span>
              <span className="text-[10px] font-semibold text-[#9999a8]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-bold text-[#9999a8] uppercase tracking-wider mb-2">About this course</h2>
          <p className="text-sm text-[#c8c8d4] leading-relaxed">{course.description}</p>
        </div>

        {/* Topics */}
        <div>
          <h2 className="text-sm font-bold text-[#9999a8] uppercase tracking-wider mb-3">What you&apos;ll cover</h2>
          <div className="flex flex-col gap-2">
            {course.topics.map((topic, i) => (
              <div key={topic}
                className="flex items-center gap-3 p-3.5 bg-[#141416] border border-[rgba(255,255,255,0.06)] rounded-xl">
                {i < completedLessons ? (
                  <CheckCircle2 size={16} strokeWidth={2} color={course.accent} />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.15)" }} />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  i < completedLessons ? "text-[#f5f5f7]" : "text-[#9999a8]"
                )}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link href={`/chat?topic=${encodeURIComponent(course.title)}`} className="block">
          <Button fullWidth size="xl" className="flex items-center gap-2">
            <Play size={18} strokeWidth={2.5} />
            {course.progress > 0 ? "Continue learning" : "Start course"}
          </Button>
        </Link>

        <button
          onClick={() => router.back()}
          className="text-center text-sm text-[#9999a8] hover:text-[#c8c8d4] transition-colors py-1"
        >
          Back to Library
        </button>
      </div>
    </div>
  );
}
