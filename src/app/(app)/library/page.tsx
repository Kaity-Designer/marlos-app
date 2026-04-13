"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Clock, Box, MessageSquare, Bookmark, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FilterType = "all" | "lessons" | "chats" | "tests" | "ar";
type LessonStatus = "new" | "in-progress" | "completed";
type LessonType = "lesson" | "chat" | "test" | "ar";

interface Lesson {
  id: string;
  title: string;
  subject: string;
  thumbnail: string;
  duration: string;
  status: LessonStatus;
  type: LessonType;
}

const mockLessons: Lesson[] = [
  { id: "1", title: "The Solar System",        subject: "Astronomy",   thumbnail: "https://images.unsplash.com/photo-1557941999-d9cfa59b79fd?w=400&q=80", duration: "30 mins", status: "in-progress", type: "ar" },
  { id: "2", title: "Pythagorean Theorem",      subject: "Mathematics", thumbnail: "https://images.unsplash.com/photo-1627983942134-dab65b677d94?w=400&q=80", duration: "25 mins", status: "completed",   type: "lesson" },
  { id: "3", title: "Cell Biology Basics",      subject: "Biology",     thumbnail: "https://images.unsplash.com/photo-1636386689060-37d233b5d345?w=400&q=80", duration: "45 mins", status: "new",         type: "lesson" },
  { id: "4", title: "Chat about Periodic Table",subject: "Chemistry",   thumbnail: "https://images.unsplash.com/photo-1711185898441-f493426390cd?w=400&q=80", duration: "15 mins", status: "in-progress", type: "chat" },
  { id: "5", title: "Ancient Civilizations",    subject: "History",     thumbnail: "https://images.unsplash.com/photo-1717606344894-66e5696bcd18?w=400&q=80", duration: "40 mins", status: "completed",   type: "lesson" },
  { id: "6", title: "Newton's Laws of Motion",  subject: "Physics",     thumbnail: "https://images.unsplash.com/photo-1758573466942-fbc45731e6eb?w=400&q=80", duration: "35 mins", status: "new",         type: "lesson" },
  { id: "7", title: "Molecular Structure in 3D",subject: "Chemistry",   thumbnail: "https://images.unsplash.com/photo-1711185898441-f493426390cd?w=400&q=80", duration: "20 mins", status: "new",         type: "ar" },
  { id: "8", title: "Algebra Practice Test",    subject: "Mathematics", thumbnail: "https://images.unsplash.com/photo-1627983942134-dab65b677d94?w=400&q=80", duration: "50 mins", status: "new",         type: "test" },
];

const filters: { id: FilterType; label: string }[] = [
  { id: "all",     label: "All" },
  { id: "lessons", label: "Lessons" },
  { id: "chats",   label: "Chats" },
  { id: "tests",   label: "Tests" },
  { id: "ar",      label: "AR Models" },
];

const statusColors: Record<LessonStatus, string> = {
  "new":         "text-[#121212]",
  "in-progress": "bg-[#f59e0b] text-white",
  "completed":   "bg-[#6b7280] text-white",
};
const statusLabels: Record<LessonStatus, string> = {
  "new": "New", "in-progress": "In Progress", "completed": "Completed",
};

function LessonCard({ lesson, onDelete, onBookmark }: { lesson: Lesson; onDelete: (id: string) => void; onBookmark: (id: string) => void }) {
  const [showActions, setShowActions] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div drag="x" dragConstraints={{ left: -80, right: 80 }} onDragEnd={(_, info) => { if (info.offset.x > 50) onBookmark(lesson.id); }} whileTap={{ scale: 0.98 }} className="relative">
      <div className="bg-[#1a1a1c] rounded-[20px] overflow-hidden border border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,206,147,0.15)] transition-all duration-300 cursor-pointer group"
        onContextMenu={e => { e.preventDefault(); setShowActions(true); }}
      >
        {/* Thumbnail */}
        <div className="relative h-40 overflow-hidden bg-[#2a2a2d]">
          {!imgError ? (
            <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">📚</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1c] via-transparent to-transparent" />
          {lesson.type === "ar" && <div className="absolute top-3 right-3 bg-[#00ce93]/90 backdrop-blur-sm rounded-full p-2"><Box className="w-4 h-4 text-[#121212]" /></div>}
          {lesson.type === "chat" && <div className="absolute top-3 right-3 bg-[#00ce93]/90 backdrop-blur-sm rounded-full p-2"><MessageSquare className="w-4 h-4 text-[#121212]" /></div>}
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#00ce93] text-xs font-medium tracking-wide">{lesson.subject}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusColors[lesson.status]}`} style={lesson.status === "new" ? { backgroundColor: "#00ce93" } : {}}>
              {statusLabels[lesson.status]}
            </span>
          </div>
          <h3 className="text-white font-semibold leading-tight group-hover:text-[#00ce93] transition-colors line-clamp-2">{lesson.title}</h3>
          <div className="flex items-center gap-1.5 text-white/50">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">{lesson.duration}</span>
          </div>
        </div>

        {lesson.status === "in-progress" && (
          <div className="h-1 bg-white/5"><div className="h-full bg-[#00ce93] w-[60%]" /></div>
        )}
      </div>

      <AnimatePresence>
        {showActions && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-2 right-2 bg-[#2a292c] rounded-xl shadow-lg border border-white/10 flex gap-1 p-2 z-10"
          >
            <button onClick={() => { onBookmark(lesson.id); setShowActions(false); }} className="p-2 hover:bg-[#00ce93]/20 rounded-lg transition-colors"><Bookmark className="w-4 h-4 text-[#00ce93]" /></button>
            <button onClick={() => { onDelete(lesson.id); setShowActions(false); }} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
            <button onClick={() => setShowActions(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 text-sm">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [lessons, setLessons] = useState(mockLessons);
  const [search, setSearch] = useState("");

  const filtered = lessons.filter(l => {
    const matchesFilter = activeFilter === "all" || l.type === activeFilter || (activeFilter === "lessons" && l.type === "lesson");
    const matchesSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a] pb-32">
      {/* Header */}
      <div className="px-5 pt-16 pb-6 text-center">
        <h1 className="text-white text-2xl font-bold">Library</h1>
      </div>

      {/* Search */}
      <div className="px-5 mb-6">
        <div className="bg-[#1a1a1c] rounded-[20px] border border-white/5 px-4 py-3.5 flex items-center gap-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
          <Search className="w-5 h-5 text-white/40 shrink-0" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your lessons or chats…" className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm" />
          <button className="p-1 hover:bg-white/5 rounded-lg transition-colors"><SlidersHorizontal className="w-5 h-5 text-white/40" /></button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className="px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 text-sm font-medium"
              style={activeFilter === f.id
                ? { backgroundColor: "#00ce93", color: "#121212", boxShadow: "0 4px 12px rgba(0,206,147,0.3)" }
                : { backgroundColor: "rgba(26,26,28,0.8)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.05)" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 grid grid-cols-2 gap-4">
        <AnimatePresence>
          {filtered.map((lesson, i) => (
            <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.04 }}>
              <LessonCard lesson={lesson} onDelete={id => setLessons(prev => prev.filter(l => l.id !== id))} onBookmark={id => console.log("Bookmarked", id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-white/80 font-semibold mb-2">No items found</h3>
          <p className="text-white/50 text-center text-sm">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
}
