"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ClipboardCheck, Headphones, Box, Compass, Sliders, MessageCircle } from "lucide-react";
import { BlobCharacter } from "@/components/ui/BlobCharacter";

function WelcomeMessage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const [name, setName] = useState("there");

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("marlos-session") || "{}");
      const profile = JSON.parse(localStorage.getItem("marlos-profile") || "{}");
      setName(session.name || profile.name || "there");
    } catch {
      setName("there");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "0 24px" }}>
      <h1 style={{ color: "white", fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>
        {greeting}, {name}
      </h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>
        What shall we learn today?
      </p>
    </div>
  );
}

function DraggableCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  const items = [
    { icon: ClipboardCheck, label: "Tests",   href: "/quiz" },
    { icon: Box,            label: "AR Mode",  href: "#" },
    { icon: MessageCircle,  label: "Chat",     href: "/chat" },
    { icon: Headphones,     label: "Podcast",  href: "#" },
    { icon: Compass,        label: "Explore",  href: "#" },
    { icon: Sliders,        label: "Tools",    href: "#" },
  ];

  return (
    /* sits just above the nav bar (nav is ~88px tall) */
    <div style={{ position: "fixed", bottom: 96, left: 0, right: 0, padding: "0 20px", zIndex: 20 }}>
      <motion.div
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(55,58,65,0.75)",
          borderRadius: 32,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
        animate={{ paddingBottom: isExpanded ? 20 : 14 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px" }}>
          <div style={{ width: 36, height: 4, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 2 }} />
        </div>

        {/* Title row */}
        <button
          onClick={() => setIsExpanded(v => !v)}
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0 16px 6px", textAlign: "center" }}
        >
          <span style={{ color: "white", fontSize: 13, fontWeight: 600 }}>Your Learning Journey</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, display: "block", marginTop: 2 }}>
            {isExpanded ? "Tap to collapse" : "Tap to expand"}
          </span>
        </button>

        {/* Expanded grid */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "8px 16px 0" }}>
                {items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link key={i} href={item.href}>
                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          background: "linear-gradient(to right, rgba(0,206,147,0.18), rgba(0,206,147,0.08))",
                          border: "1px solid rgba(0,206,147,0.25)",
                          borderRadius: 50,
                          padding: "12px 16px",
                          cursor: "pointer",
                        }}
                      >
                        <Icon style={{ width: 18, height: 18, color: "#00ce93", flexShrink: 0 }} />
                        <span style={{ color: "white", fontSize: 13 }}>{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        height: "100dvh",
        background: "linear-gradient(to bottom, #231f20, #1c191a)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ paddingTop: 56, paddingBottom: 16, flexShrink: 0 }}>
        <WelcomeMessage />
      </div>

      {/* Central Blob — fills the middle of the screen */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -56%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glow ring */}
        <motion.div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,206,147,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Blob */}
        <motion.div
          style={{ position: "relative", zIndex: 10, cursor: "pointer" }}
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Link href="/chat" style={{ display: "block" }}>
            <BlobCharacter size={220} mood="happy" animated />
          </Link>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                position: "absolute",
                top: "calc(100% + 16px)",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(35,31,32,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                padding: "8px 16px",
                borderRadius: 99,
                fontSize: 13,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              }}
            >
              Ask me anything! 💬
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Draggable card sits above the nav bar */}
      <DraggableCard />
    </div>
  );
}
