"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Library, MessageCircle, ClipboardCheck, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/home",    label: "Home",    icon: Home,           center: false },
  { href: "/library", label: "Library", icon: Library,        center: false },
  { href: "/chat",    label: "Marlos",  icon: MessageCircle,  center: true  },
  { href: "/quiz",    label: "Tests",   icon: ClipboardCheck, center: false },
  { href: "/profile", label: "Profile", icon: User,           center: false },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(30,30,32,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 40,
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.4)",
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          {navItems.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            if (item.center) {
              return (
                <Link key={item.href} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: -20,
                      background: "linear-gradient(135deg, #00ce93, #00a076)",
                      boxShadow: "0 4px 20px rgba(0,206,147,0.5)",
                    }}
                  >
                    <Icon style={{ width: 24, height: 24, color: "white" }} />
                  </motion.div>
                  <span style={{ fontSize: 10, color: "#00ce93" }}>{item.label}</span>
                </Link>
              );
            }

            return (
              <Link key={item.href} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: active ? "rgba(0,206,147,0.18)" : "transparent",
                    transition: "background-color 0.2s",
                  }}
                >
                  <Icon style={{ width: 20, height: 20, color: active ? "white" : "rgba(255,255,255,0.45)" }} />
                </motion.div>
                <span style={{ fontSize: 10, color: active ? "#00ce93" : "rgba(255,255,255,0.45)" }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
