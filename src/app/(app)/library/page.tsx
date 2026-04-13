"use client";

import { useState } from "react";
import Link from "next/link";
import { Hash, HeartPulse, Globe, Code2, PenLine, FlaskConical, Landmark, Languages, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Maths", "Science", "History", "English", "Coding", "Languages"];

const courses = [
  { id: "1", title: "Introduction to Algebra", subject: "Maths", icon: <Hash size={28} strokeWidth={1.5} />, progress: 35, lessons: 12, color: "from-[#00e5a0]/20 to-[#00a872]/20", accent: "#00e5a0", difficulty: "Beginner" },
  { id: "2", title: "The Human Body", subject: "Science", icon: <HeartPulse size={28} strokeWidth={1.5} />, progress: 60, lessons: 8, color: "from-[#4d9fff]/20 to-[#007ae5]/20", accent: "#4d9fff", difficulty: "Intermediate" },
  { id: "3", title: "World War II", subject: "History", icon: <Globe size={28} strokeWidth={1.5} />, progress: 10, lessons: 15, color: "from-[#f5a623]/20 to-[#e07b00]/20", accent: "#f5a623", difficulty: "Intermediate" },
  { id: "4", title: "Python Fundamentals", subject: "Coding", icon: <Code2 size={28} strokeWidth={1.5} />, progress: 0, lessons: 20, color: "from-[#a855f7]/20 to-[#7c3aed]/20", accent: "#a855f7", difficulty: "Beginner" },
  { id: "5", title: "Shakespeare & Poetry", subject: "English", icon: <PenLine size={28} strokeWidth={1.5} />, progress: 80, lessons: 10, color: "from-[#f43f5e]/20 to-[#e11d48]/20", accent: "#f43f5e", difficulty: "Advanced" },
  { id: "6", title: "Cell Biology", subject: "Science", icon: <FlaskConical size={28} strokeWidth={1.5} />, progress: 25, lessons: 14, color: "from-[#00e5a0]/20 to-[#4d9fff]/20", accent: "#00e5a0", difficulty: "Intermediate" },
  { id: "7", title: "Ancient Rome", subject: "History", icon: <Landmark size={28} strokeWidth={1.5} />, progress: 0, lessons: 11, color: "from-[#f5a623]/20 to-[#f43f5e]/20", accent: "#f5a623", difficulty: "Beginner" },
  { id: "8", title: "Conversational Spanish", subject: "Languages", icon: <Languages size={28} strokeWidth={1.5} />, progress: 45, lessons: 18, color: "from-[#ef4444]/20 to-[#f97316]/20", accent: "#ef4444", difficulty: "Beginner" },
];

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "All" || c.subject === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1
          className="text-2xl font-bold text-[#f5f5f7] mb-4 animate-fade-up"
          style={{ letterSpacing: "-0.03em" }}
        >
          Library
        </h1>

        {/* Search */}
        <div className="relative animate-fade-up delay-100">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5a68]"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
          >
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search courses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-2xl pl-11 pr-4 text-sm text-[#f5f5f7] placeholder:text-[#7a7a90] focus:outline-none focus:border-[rgba(0,229,160,0.4)] transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-5 overflow-x-auto scroll pb-3 animate-fade-up delay-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
              activeCategory === cat
                ? "bg-[#00e5a0] text-[#0f0f10] shadow-[0_0_16px_rgba(0,229,160,0.2)]"
                : "bg-[#141416] text-[#9999a8] border border-[rgba(255,255,255,0.07)] hover:text-[#f5f5f7]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto scroll px-5 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((course, i) => (
            <Link
              key={course.id}
              href={`/library/${course.id}`}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 60 + 200}ms` }}
            >
              <div className="bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-3xl p-4 flex gap-4 hover-lift">
                {/* Icon */}
                <div
                  className={cn("w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br", course.color)}
                >
                  {course.icon}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: course.accent }}
                      >
                        {course.subject}
                      </span>
                      <span className="text-[10px] text-[#3a3a3f]">·</span>
                      <span className="text-[10px] text-[#5a5a68]">{course.difficulty}</span>
                    </div>
                    <p className="text-sm font-bold text-[#f5f5f7] leading-tight" style={{ letterSpacing: "-0.01em" }}>
                      {course.title}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#5a5a68]">{course.lessons} lessons</span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: course.progress > 0 ? course.accent : "#3a3a3f" }}
                      >
                        {course.progress > 0 ? `${course.progress}%` : "Not started"}
                      </span>
                    </div>
                    <div className="h-1 bg-[#1a1a1d] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${course.progress}%`,
                          background: course.accent,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center animate-fade-in">
              <Search size={40} strokeWidth={1.5} color="#5a5a68" />
              <p className="text-[#5a5a68] text-sm">No courses found</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="text-xs text-[#00e5a0] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
