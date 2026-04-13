"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles, BookOpen, MessageCircle, ClipboardCheck, Zap, Trash2, Bookmark } from "lucide-react";

type FilterType = "all" | "lessons" | "chats" | "tests" | "ar";

interface Lesson {
  id: string;
  title: string;
  subject: string;
  thumbnail: string;
  duration: string;
  status: "new" | "in-progress" | "completed";
  type: "lesson" | "chat" | "test" | "ar";
}

const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "The Solar System",
    subject: "Astronomy",
    thumbnail: "https://images.unsplash.com/photo-1557941999-d9cfa59b79fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    duration: "30 mins",
    status: "in-progress",
    type: "ar",
  },
  {
    id: "2",
    title: "Pythagorean Theorem",
    subject: "Mathematics",
    thumbnail: "https://images.unsplash.com/photo-1627983942134-dab65b677d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    duration: "25 mins",
    status: "completed",
    type: "lesson",
  },
  {
    id: "3",
    title: "Cell Biology Basics",
    subject: "Biology",
    thumbnail: "https://images.unsplash.com/photo-1636386689060-37d233b5d345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    duration: "45 mins",
    status: "new",
    type: "lesson",
  },
  {
    id: "4",
    title: "Chat about Periodic Table",
    subject: "Chemistry",
    thumbnail: "https://images.unsplash.com/photo-1711185898441-f493426390cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    duration: "15 mins",
    status: "in-progress",
    type: "chat",
  },
  {
    id: "5",
    title: "Ancient Civilizations",
    subject: "History",
    thumbnail: "https://images.unsplash.com/photo-1717606344894-66e5696bcd18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    duration: "40 mins",
    status: "completed",
    type: "lesson",
  },
  {
    id: "6",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    thumbnail: "https://images.unsplash.com/photo-1758573466942-fbc45731e6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    duration: "35 mins",
    status: "new",
    type: "lesson",
  },
  {
    id: "7",
    title: "Molecular Structure in 3D",
    subject: "Chemistry",
    thumbnail: "https://images.unsplash.com/photo-1711185898441-f493426390cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    duration: "20 mins",
    status: "new",
    type: "ar",
  },
  {
    id: "8",
    title: "Algebra Practice Test",
    subject: "Mathematics",
    thumbnail: "https://images.unsplash.com/photo-1627983942134-dab65b677d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    duration: "50 mins",
    status: "new",
    type: "test",
  },
];

function LessonCard({ 
  lesson, 
  onDelete, 
  onBookmark 
}: { 
  lesson: Lesson; 
  onDelete: (id: string) => void; 
  onBookmark: (id: string) => void;
}) {
  const getTypeIcon = () => {
    switch (lesson.type) {
      case "lesson":
        return <BookOpen className="w-4 h-4" />;
      case "chat":
        return <MessageCircle className="w-4 h-4" />;
      case "test":
        return <ClipboardCheck className="w-4 h-4" />;
      case "ar":
        return <Zap className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (lesson.status) {
      case "new":
        return "bg-[#00e5a0] text-[#121212]";
      case "in-progress":
        return "bg-amber-500 text-white";
      case "completed":
        return "bg-gray-600 text-white";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-[#1a1a1c] border border-white/5 rounded-[24px] overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-[#00e5a0] to-[#00a076] overflow-hidden">
        <img
          src={lesson.thumbnail}
          alt={lesson.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        {/* Type Badge */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-[#00e5a0]">
          {getTypeIcon()}
        </div>
        {/* Status Badge */}
        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
          {lesson.status === "new" ? "New" : lesson.status === "in-progress" ? "In Progress" : "Completed"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{lesson.subject}</p>
        <h3 className="text-white font-semibold mb-2">{lesson.title}</h3>
        <p className="text-white/50 text-sm mb-4">{lesson.duration}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onBookmark(lesson.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#00e5a0]/20 hover:bg-[#00e5a0]/30 text-[#00e5a0] text-sm transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(lesson.id)}
            className="px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [lessons, setLessons] = useState(mockLessons);

  const filteredLessons = lessons.filter((lesson) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "lessons") return lesson.type === "lesson";
    if (activeFilter === "chats") return lesson.type === "chat";
    if (activeFilter === "tests") return lesson.type === "test";
    if (activeFilter === "ar") return lesson.type === "ar";
    return true;
  });

  const handleDelete = (id: string) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  const handleBookmark = (id: string) => {
    console.log("Bookmarked:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a] pb-32">
      {/* Header */}
      <div className="px-5 pt-16 pb-6">
        <h1 className="text-white text-center mb-6 text-2xl font-bold">Library</h1>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full bg-[#1a1a1c] border border-white/5 rounded-[20px] pl-12 pr-4 py-4 text-white/90 placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: "all" as FilterType, label: "All" },
            { id: "lessons" as FilterType, label: "Lessons" },
            { id: "chats" as FilterType, label: "Chats" },
            { id: "tests" as FilterType, label: "Tests" },
            { id: "ar" as FilterType, label: "AR" },
          ].map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? "bg-[#00e5a0] text-[#121212] shadow-[0px_4px_12px_0px_rgba(0,229,160,0.3)]"
                  : "bg-[#1a1a1c] border border-white/5 text-white/60 hover:text-white"
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onDelete={handleDelete}
            onBookmark={handleBookmark}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-white/80 mb-2">No items found</h3>
          <p className="text-white/50 text-center">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
}
