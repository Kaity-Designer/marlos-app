"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookText, Palette, Headphones, HelpCircle } from "lucide-react";
import { BlobCharacter } from "@/components/ui/BlobCharacter";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type LearningMode = "text" | "audio" | "visual" | "quiz";

const MODES: { id: LearningMode; label: string; icon: React.ReactNode }[] = [
  { id: "text",   label: "Text",   icon: <BookText size={18} strokeWidth={1.8} /> },
  { id: "visual", label: "Visual", icon: <Palette size={18} strokeWidth={1.8} /> },
  { id: "audio",  label: "Audio",  icon: <Headphones size={18} strokeWidth={1.8} /> },
  { id: "quiz",   label: "Quiz",   icon: <HelpCircle size={18} strokeWidth={1.8} /> },
];

const SUGGESTIONS = [
  "Explain it in simpler terms",
  "Give me an example",
  "Quiz me on this",
  "Summarise what we covered",
];

function ChatContent() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<LearningMode>("text");
  const [loading, setLoading] = useState(false);
  const [blobMood, setBlobMood] = useState<"neutral" | "happy" | "thinking" | "excited">("happy");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setBlobMood("thinking");
    setShowSuggestions(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          mode,
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setBlobMood("happy");
    } catch {
      // Fallback demo response
      const demos: Record<LearningMode, string> = {
        text: `Great question! Let me explain **${content}** clearly.\n\nThink of it this way: every complex idea breaks down into simpler building blocks. The key is finding the right angle that makes it click for you.\n\nWhat aspect would you like to explore deeper?`,
        visual: `**Visual breakdown of "${content}":**\n\nCore concept\n  ↓\nConnected to: A, B, C\n  ↓\nReal-world application\n\nImagine drawing a map — each node connects to the next. Want me to walk through each connection?`,
        audio: `Let me explain this conversationally, as if we're talking:\n\nSo, "${content}" — here's the thing. Most people get confused because they try to memorise it rather than understand it. The secret? Connect it to something you already know.\n\nWhat's something familiar we can compare this to?`,
        quiz: `**Quick check on "${content}":**\n\nQ: In your own words, what do you think this means?\n\nTake a moment and type your answer — there's no wrong response here. I'll give you feedback and we'll build from there.`,
      };
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: demos[mode],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setBlobMood("happy");
    } finally {
      setLoading(false);
    }
  }, [loading, messages, mode]);

  // Auto-send topic from URL
  useEffect(() => {
    if (topicParam && messages.length === 0) {
      sendMessage(`Teach me about: ${topicParam}`);
    }
  }, [topicParam]); // eslint-disable-line react-hooks/exhaustive-deps

  // Welcome message
  useEffect(() => {
    if (!topicParam && messages.length === 0) {
      const welcome: Message = {
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm your Marlos tutor. What would you like to explore today? Ask me anything — I'll adapt to how you learn best.",
        timestamp: new Date(),
      };
      setTimeout(() => setMessages([welcome]), 400);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function formatContent(content: string) {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
  }

  return (
    <div className="flex flex-col h-dvh">
      {/* Header */}
      <div
        className="glass flex items-center gap-3 px-5 pt-14 pb-4 z-10"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <BlobCharacter size={40} mood={blobMood} animated />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#f5f5f7]" style={{ letterSpacing: "-0.01em" }}>
            Marlos Tutor
          </p>
          <p className="text-xs text-[#00e5a0] font-medium">
            {loading ? "Thinking…" : "Ready to learn"}
          </p>
        </div>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scroll border-b border-[rgba(255,255,255,0.05)]">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200",
              mode === m.id
                ? "bg-[rgba(0,229,160,0.15)] text-[#00e5a0] border border-[rgba(0,229,160,0.3)]"
                : "bg-[#141416] text-[#9999a8] border border-[rgba(255,255,255,0.06)] hover:text-[#f5f5f7]"
            )}
          >
            <span className="flex items-center justify-center" style={{ width: 18, height: 18 }}>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scroll px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3 animate-fade-up",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            {msg.role === "assistant" && (
              <div className="flex-shrink-0 mt-1">
                <BlobCharacter size={32} mood="happy" animated={false} />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-[#00e5a0] text-[#0f0f10] font-medium rounded-br-lg"
                  : "bg-[#141416] border border-[rgba(255,255,255,0.07)] text-[#f5f5f7] rounded-bl-lg"
              )}
              dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
            />
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <BlobCharacter size={32} mood="thinking" animated />
            <div className="bg-[#141416] border border-[rgba(255,255,255,0.07)] rounded-3xl rounded-bl-lg px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] animate-bounce"
                    style={{ animationDelay: `${i * 140}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && messages.length > 0 && !loading && (
          <div className="flex flex-wrap gap-2 mt-2 animate-fade-up">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-2 rounded-xl bg-[#141416] border border-[rgba(255,255,255,0.07)] text-[#9999a8] hover:text-[#f5f5f7] hover:border-[rgba(255,255,255,0.15)] transition-all active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="px-4 py-3 pb-safe"
        style={{
          background: "rgba(15,15,16,0.92)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              rows={1}
              className="w-full resize-none rounded-2xl bg-[#1a1a1d] border border-[rgba(255,255,255,0.08)] text-[#f5f5f7] placeholder:text-[#7a7a90] text-sm px-4 py-3 focus:outline-none focus:border-[rgba(0,229,160,0.4)] transition-all overflow-hidden"
              style={{ minHeight: 48, lineHeight: "1.5" }}
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200 active:scale-90"
            style={
              input.trim() && !loading
                ? { backgroundColor: "#00e5a0", color: "#0f0f10", boxShadow: "0 0 20px rgba(0,229,160,0.3)" }
                : { backgroundColor: "#1a1a1d", color: "#3a3a3f" }
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex h-dvh items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-[#00e5a0] border-t-transparent animate-spin" /></div>}>
      <ChatContent />
    </Suspense>
  );
}
