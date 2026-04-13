"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { ArrowLeft, ImageIcon, Brain, Globe, Target, FileText, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlobCharacter } from "@/components/ui/BlobCharacter";
import Link from "next/link";

type Message = {
  id: string;
  text: string;
  sender: "ai" | "user";
  timestamp: string;
};

const expandMenuItems = [
  { icon: ImageIcon, label: "Upload Image",       description: "Visualize anything",           action: "upload" },
  { icon: Brain,     label: "Study and Learn",     description: "Learn a new concept",          action: "study" },
  { icon: Globe,     label: "Web Search",           description: "Find real-time news and info", action: "search" },
  { icon: Target,    label: "Deep Research",        description: "Get a detailed report",        action: "research" },
  { icon: FileText,  label: "Add Files",            description: "Analyze and summarize",        action: "files" },
  { icon: Mic,       label: "Create Voice Lesson",  description: "Get work done for you",        action: "voice" },
];

function ExpandMenu({ isOpen, onClose, onSelect }: { isOpen: boolean; onClose: () => void; onSelect: (a: string) => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 z-40" />
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c1e] rounded-t-3xl p-4 pb-8">
            <div className="max-w-lg mx-auto">
              <div className="flex justify-center mb-4"><div className="w-10 h-1 bg-white/20 rounded-full" /></div>
              <div className="space-y-1">
                {expandMenuItems.map((item, i) => (
                  <motion.button key={item.action} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} onClick={() => { onSelect(item.action); onClose(); }} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[#00ce93]/10 flex items-center justify-center group-hover:bg-[#00ce93]/20 transition-colors"><item.icon className="w-5 h-5 text-[#00ce93]" /></div>
                    <div className="flex-1 text-left"><p className="text-white text-[15px]">{item.label}</p><p className="text-white/50 text-[13px]">{item.description}</p></div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([{ id: "1", text: "Hey there! I'm Marlos, your AI learning companion. What would you like to explore today?", sender: "ai", timestamp: "10:30 AM" }]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  const quickSuggestions = ["What is gravity?", "Explain photosynthesis", "Help me with my homework", "Fun science facts"];

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages, isTyping]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const getAIResponse = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("gravity")) return "Great question! Gravity is a force that pulls objects toward each other. It's why we stay on the ground and why the Moon orbits Earth! The bigger an object is, the stronger its gravitational pull.";
    if (m.includes("photosynthesis")) return "Photosynthesis is how plants make their own food! They use sunlight, water, and CO from the air. The green stuff in leaves (chlorophyll) captures sunlight and turns it into energy and oxygen.";
    if (m.includes("homework")) return "I'd love to help with your homework! Just tell me what subject you're working on - math, science, history, or something else. I'll guide you through it step by step!";
    if (m.includes("science") || m.includes("fact")) return "Did you know? A day on Venus is longer than a year on Venus! It takes 243 Earth days to rotate once, but only 225 Earth days to orbit the Sun!";
    const defaults = ["That's an interesting question! Let me help you explore that further. Could you tell me more about what you'd like to understand?", "I love your curiosity! To give you the best explanation, could you share a bit more about what you're trying to learn?", "Awesome question! I'm here to make learning fun and easy. What would you like to know more about?"];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: text.trim(), sender: "user", timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) }]);
    setInput("");
    setHasUserSentMessage(true);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: getAIResponse(text), sender: "ai", timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  }, [isTyping]);

  const handleMenuAction = (action: string) => {
    const msgs: Record<string, string> = { upload: "Image uploaded! I'll analyze this and help you understand what's in it.", study: "Let's start a focused study session! What subject would you like to learn about today?", search: "I can search the web for the latest information! What would you like me to find?", research: "Starting a deep research session! What topic should we research?", files: "Files ready for analysis! What would you like me to help you understand?", voice: "Voice lesson mode activated! What topic should I teach?" };
    setMessages(prev => [...prev, { id: Date.now().toString(), text: msgs[action] || `${action} activated!`, sender: "ai", timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) }]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      const chunks: Blob[] = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const t = ["What is gravity?", "Explain photosynthesis", "Help me with math", "Fun science facts"];
        handleSendMessage(t[Math.floor(Math.random() * t.length)]);
      };
      mr.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => setRecordingTime(p => p + 1), 1000);
    } catch (e) { console.error("Mic error:", e); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      setRecordingTime(0);
    }
  };

  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop(); }; }, []);

  const hasText = input.trim().length > 0;

  return (
    <div className="flex flex-col h-dvh bg-[#121212] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-[#121212] border-b border-[#2a2a2a] flex-shrink-0">
        <Link href="/home">
          <button className="w-12 h-12 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-full transition-colors flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-white text-base font-semibold">Marlos</h1>
          {isTyping && (
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-[#8f8f8f] text-xs">Marlos is thinking</span>
              <div className="flex gap-1">
                {[0, 150, 300].map(d => <span key={d} className="w-1.5 h-1.5 bg-[#00ce93] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            </div>
          )}
        </div>
        <div className="w-12" />
      </div>

      {/* Chat Area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 pb-2 relative">
        {/* Orb */}
        <div className="sticky top-0 pt-6 pb-4 z-0 pointer-events-none flex justify-center">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="relative">
            <motion.div animate={{ opacity: isTyping ? [0.3, 0.6, 0.3] : [0.15, 0.3, 0.15], scale: isTyping ? [1, 1.2, 1] : 1 }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-[-20px] bg-[#00ce93] rounded-full blur-2xl" />
            <div className="relative"><BlobCharacter size={96} mood={isTyping ? "thinking" : "happy"} animated /></div>
          </motion.div>
        </div>

        {/* Messages */}
        <div className="space-y-1 relative z-10 bg-[#121212]">
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: "easeOut" }} className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"} mb-4`}>
              <div className={`max-w-[85%] rounded-[20px] px-4 py-3 ${msg.sender === "ai" ? "bg-[#231f20] text-white" : "text-[#121212]"}`} style={msg.sender === "user" ? { backgroundColor: "#00ce93" } : {}}>
                <p className="text-[15px] leading-[24px] tracking-[-0.23px]">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === "ai" ? "text-white/60" : "text-black/60"}`}>{msg.timestamp}</p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start mb-4">
              <div className="bg-[#231f20] rounded-[20px] px-4 py-3 flex gap-1.5 items-center">
                {[0, 150, 300].map(d => <span key={d} className="w-2 h-2 bg-[#00ce93] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Suggestions */}
      {!hasUserSentMessage && !isTyping && (
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {quickSuggestions.map((s, i) => (
              <motion.button key={s} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSendMessage(s)} className="flex-shrink-0 px-4 py-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm rounded-full border border-[#00ce93]/20 hover:border-[#00ce93]/40 transition-colors whitespace-nowrap">
                {s}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-gradient-to-b from-transparent to-[#231f20] pt-2 pb-4 px-4 flex-shrink-0">
        <div className="flex gap-1.5 items-end">
          {/* Plus button */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsMenuOpen(true)} className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0 self-end mb-1" style={{ backgroundColor: "rgba(112,112,112,0.5)", border: "1px solid rgba(196,196,196,0.5)" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M1 8H15M8 1V15" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
          </motion.button>

          {/* Input box */}
          <div className="flex-1 relative rounded-[40px] overflow-hidden" style={{ backgroundColor: "#e1eee6", minHeight: 80 }}>
            <div className="flex flex-col p-3.5">
              <div className="pb-12 relative">
                {!input && <span className="absolute left-1.5 top-1.5 text-[#8f8f8f] text-[15px] pointer-events-none select-none">Type your message...</span>}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(input); } }}
                  rows={1}
                  className="w-full bg-transparent text-[#231f20] text-[15px] resize-none outline-none leading-[1.4] relative z-10"
                  style={{ minHeight: 24, maxHeight: 120 }}
                />
              </div>
              {/* Controls */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  {!hasText && (
                    <motion.div key="voice" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => isRecording ? stopRecording() : startRecording()} className="w-[42px] h-[42px] rounded-full flex items-center justify-center relative" style={{ backgroundColor: "rgba(112,112,112,0.5)", border: `1px solid ${isRecording ? "#00ce93" : "rgba(196,196,196,0.5)"}` }}>
                        <svg width="14" height="22" fill="none" viewBox="0 0 14 22"><path d="M7 1C5.34 1 4 2.34 4 4V11C4 12.66 5.34 14 7 14C8.66 14 10 12.66 10 11V4C10 2.34 8.66 1 7 1Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><path d="M1 10C1 14.42 3.69 18 7 18M7 18C10.31 18 13 14.42 13 10M7 18V21" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
                        {isRecording && <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 border-2 border-[#00ce93] rounded-full" />}
                      </motion.button>
                      {isRecording && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /><span className="text-[#231f20] font-mono text-sm">{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}</span></motion.div>}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleSendMessage(input)} disabled={!hasText} className="w-10 h-10 rounded-full flex items-center justify-center transition-all ml-auto" style={hasText ? { backgroundColor: "#00ce93" } : { backgroundColor: "rgba(112,112,112,0.5)", opacity: 0.4 }}>
                  <svg width="17" height="20" fill="none" viewBox="0 0 17 20"><path d="M8.5 1L8.5 15.5M8.5 1L3 6.5M8.5 1L14 6.5M1 18.5H16" stroke={hasText ? "#121212" : "white"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExpandMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onSelect={handleMenuAction} />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex h-dvh items-center justify-center bg-[#121212]"><div className="w-8 h-8 rounded-full border-2 border-[#00ce93] border-t-transparent animate-spin" /></div>}>
      <ChatContent />
    </Suspense>
  );
}
