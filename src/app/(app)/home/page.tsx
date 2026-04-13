"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Library, ClipboardCheck, User, Home, Headphones, Box, Compass, Sliders } from "lucide-react";
import { BlobCharacter } from "@/components/ui/BlobCharacter";

function WelcomeMessage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const [name, setName] = useState("Mia");
  
  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("marlos-session") || "{}");
      const profile = JSON.parse(localStorage.getItem("marlos-profile") || "{}");
      setName(session.name || profile.name || "Mia");
    } catch {
      setName("Mia");
    }
  }, []);
  
  return (
    <div className="text-center px-6">
      <h1 className="text-white mb-1">{greeting}, {name}</h1>
      <p className="text-white/70">What shall we learn today?</p>
    </div>
  );
}

function QuickAccessButton({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-3 bg-gradient-to-r from-[#00e5a0]/20 to-[#00e5a0]/10 backdrop-blur-sm rounded-full px-5 py-3.5 border border-[#00e5a0]/30"
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 229, 160, 0.3)" }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-5 h-5 text-[#00e5a0]" />
      <span className="text-white text-sm">{label}</span>
    </motion.button>
  );
}

function DraggableCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const quickAccessItems = [
    { icon: ClipboardCheck, label: "Tests" },
    { icon: Box, label: "AR Mode" },
    { icon: MessageCircle, label: "Chat" },
    { icon: Headphones, label: "Podcast" },
    { icon: Compass, label: "Explore" },
    { icon: Sliders, label: "Tools" },
  ];

  return (
    <motion.div
      className="fixed bottom-[88px] left-0 right-0 px-5 z-20"
      animate={{ 
        height: isExpanded ? "auto" : "auto",
      }}
    >
      <motion.div
        className="backdrop-blur-xl bg-[#3D4149]/60 rounded-[40px] shadow-xl border border-white/10 overflow-hidden"
        animate={{
          paddingTop: 8,
          paddingBottom: isExpanded ? 24 : 16,
          paddingLeft: 16,
          paddingRight: 16,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Drag Handle */}
        <div className="flex items-center justify-center mb-3">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-white text-center text-sm">Your Learning Journey</h2>

        {/* Tap to expand hint when collapsed */}
        {!isExpanded && (
          <motion.button
            className="w-full text-white/40 text-xs mt-1.5 text-center"
            onClick={() => setIsExpanded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Tap or drag up to expand
          </motion.button>
        )}

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-3 mt-4">
            {quickAccessItems.map((item, index) => (
              <QuickAccessButton
                key={index}
                icon={item.icon}
                label={item.label}
                onClick={() => console.log(`Navigate to ${item.label}`)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="pt-8 pb-4 flex-shrink-0">
        <WelcomeMessage />
      </div>

      {/* Central Blob Section */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex items-center justify-center">
        {/* Background glow effect */}
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 229, 160, 0.3) 0%, rgba(0, 229, 160, 0) 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Central Blob Character */}
        <motion.div
          className="relative z-10 cursor-pointer w-[250px] h-[250px] flex items-center justify-center"
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/chat" className="w-full h-full flex items-center justify-center">
            <BlobCharacter size={120} mood="happy" animated />
          </Link>
        </motion.div>

        {/* Tooltip */}
        <motion.div
          className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 bg-[#231F20] text-white px-4 py-2 rounded-full text-sm shadow-lg whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          Ask me anything! 💬
        </motion.div>
      </div>

      {/* Draggable Card */}
      <DraggableCard />

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-30">
        <div className="backdrop-blur-xl bg-[#2D2D2D]/95 rounded-[40px] px-4 py-3 shadow-2xl border border-white/5">
          <div className="flex items-end justify-between">
            {[
              { icon: Home, label: "Home", active: true, center: false },
              { icon: Library, label: "Library", active: false, center: false },
              { icon: MessageCircle, label: "Marlos", active: false, center: true },
              { icon: ClipboardCheck, label: "Tests", active: false, center: false },
              { icon: User, label: "Profile", active: false, center: false },
            ].map((item) => (
              <Link 
                key={item.label}
                href={item.label === "Home" ? "/home" : item.label === "Library" ? "/library" : item.label === "Marlos" ? "/chat" : item.label === "Tests" ? "/quiz" : "/profile"}
              >
                <motion.button
                  className="flex flex-col items-center gap-1.5 flex-1"
                  whileTap={{ scale: 0.9 }}
                >
                  <div
                    className={`rounded-full flex items-center justify-center transition-all ${
                      item.center
                        ? "w-16 h-16 bg-gradient-to-br from-[#00e5a0] to-[#00a076] shadow-lg shadow-[#00e5a0]/40 -mt-4"
                        : item.active
                        ? "w-12 h-12 bg-[#00e5a0]/20"
                        : "w-12 h-12 bg-transparent"
                    }`}
                  >
                    <item.icon
                      className={`${item.center ? "w-7 h-7" : "w-5 h-5"} ${
                        item.center || item.active ? "text-white" : "text-white/50"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] ${
                      item.center || item.active ? "text-[#00e5a0]" : "text-white/50"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
