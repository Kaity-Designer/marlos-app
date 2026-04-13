"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlobCharacter } from "@/components/ui/BlobCharacter";

type Message = {
  id: string;
  text: string;
  sender: "ai" | "user";
  timestamp: string;
};

function ChatContent() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! I'm Marlos, your AI learning companion. What would you like to explore today?",
      sender: "ai",
      timestamp: "10:30 AM",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  const quickSuggestions = [
    "What is gravity?",
    "Explain photosynthesis",
    "Help me with my homework",
    "Fun science facts",
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setHasUserSentMessage(true);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  }, [isTyping]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("gravity")) {
      return "Great question! Gravity is a force that pulls objects toward each other. It's why we stay on the ground and why the Moon orbits Earth! 🌍 The bigger an object is, the stronger its gravitational pull.";
    }
    
    if (lowerMessage.includes("photosynthesis")) {
      return "Photosynthesis is how plants make their own food! 🌱 They use sunlight, water, and carbon dioxide (CO₂) from the air. The green stuff in leaves (chlorophyll) captures sunlight and turns it into energy and oxygen.";
    }
    
    if (lowerMessage.includes("homework")) {
      return "I'd love to help with your homework! 📚 Just tell me what subject you're working on - math, science, history, or something else.";
    }
    
    if (lowerMessage.includes("science") || lowerMessage.includes("fact")) {
      const facts = [
        "Did you know? A day on Venus is longer than a year on Venus! 🪐",
        "Your body has about 37 trillion cells! 🌟",
        "Honey never spoils! Archaeologists found 3,000-year-old honey that was still edible! 🍯",
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }
    
    return "That's an interesting question! Let me help you explore that further. Could you tell me more about what you're trying to learn?";
  };

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const transcriptions = [
          "What is gravity?",
          "Explain photosynthesis",
          "Help me with math",
          "Fun science facts",
        ];
        const transcription = transcriptions[Math.floor(Math.random() * transcriptions.length)];
        handleSendMessage(transcription);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Microphone error:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-dvh bg-[#121212]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#2a2a2a]">
        <button className="w-12 h-12 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-full transition-colors flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex-1 text-center">
          <h1 className="text-white">Marlos</h1>
          {isTyping && (
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-[#8f8f8f] text-xs">Marlos is thinking</span>
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-[#00e5a0] rounded-full animate-bounce" />
                <span className="w-1 h-1 bg-[#00e5a0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1 h-1 bg-[#00e5a0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>
        
        <div className="w-9" />
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 pb-2 relative space-y-4 pt-4"
      >
        {/* Orb Avatar - Sticky at top */}
        <div className="sticky top-0 pt-4 pb-4 z-0 pointer-events-none flex justify-center">
          <BlobCharacter size={64} mood="happy" animated />
        </div>
        
        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] rounded-[20px] px-4 py-3 ${
                  msg.sender === "ai"
                    ? "bg-[#231f20] text-white"
                    : "bg-[#00e5a0] text-[#121212]"
                }`}
              >
                <p className="text-[15px] leading-[24px]">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === "ai" ? "text-white/60" : "text-black/60"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Suggestions */}
      {!hasUserSentMessage && !isTyping && (
        <div className="px-4 py-3 space-y-2">
          <p className="text-white/50 text-xs text-center">Try asking:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleQuickSuggestion(s)}
                className="text-xs px-3 py-2 rounded-full bg-[#1a1a1c] border border-[#3a3a3a] text-white/70 hover:text-white hover:border-[#00e5a0]/50 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="px-4 py-3 bg-gradient-to-b from-transparent to-[#231f20]">
        <div className="flex items-end gap-3">
          {/* Voice Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleRecording}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              isRecording
                ? "bg-red-500 ring-2 ring-red-400"
                : "bg-[#3a3a3a] hover:bg-[#4a4a4a]"
            }`}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.693.055 3.215-1.948 4.События-4.537 4.537-.772 0-1.543-.389-2.047-1.077.57 2.986 3.823 5.368 7.844 5.368 4.159 0 7.527-2.539 8.556-6 1.309-1.63 2.047-3.643 2.047-5.693 0-5.781-5.662-10-12-10z" />
            </svg>
          </motion.button>

          {/* Text Input */}
          <div className="flex-1 flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                rows={1}
                className="w-full resize-none rounded-2xl bg-[#1a1a1d] border border-[#3a3a3a] text-white placeholder:text-[#7a7a90] text-sm px-4 py-3 focus:outline-none focus:border-[#00e5a0]/40 transition-all overflow-hidden"
                style={{ minHeight: 40, lineHeight: "1.5", maxHeight: 120 }}
              />
            </div>

            {/* Send Button */}
            <motion.button
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim() || isTyping}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
              style={
                input.trim() && !isTyping
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
            </motion.button>
          </div>
        </div>

        {/* Recording Timer */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center justify-center gap-2"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white/60 text-sm font-mono">
              {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
            </span>
          </motion.div>
        )}
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
