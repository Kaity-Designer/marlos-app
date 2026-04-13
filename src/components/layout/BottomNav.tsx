"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Library, MessageCircle, ClipboardCheck, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/home",    label: "Home",    icon: Home,          center: false },
  { href: "/library", label: "Library", icon: Library,       center: false },
  { href: "/chat",    label: "Marlos",  icon: MessageCircle, center: true  },
  { href: "/quiz",    label: "Tests",   icon: ClipboardCheck, center: false },
  { href: "/profile", label: "Profile", icon: User,          center: false },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <div
        className="backdrop-blur-xl rounded-[40px] px-4 py-3 shadow-2xl border border-white/5 mx-4 mb-2"
        style={{ backgroundColor: "rgba(45,45,45,0.95)" }}
      >
        <div className="flex items-end justify-between">
          {navItems.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            if (item.center) {
              return (
                <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1.5 flex-1">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center -mt-5 shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #00ce93, #00a076)",
                      boxShadow: "0 4px 20px rgba(0,206,147,0.4)",
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="text-[10px] text-[#00ce93]">{item.label}</span>
                </Link>
              );
            }

            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1.5 flex-1">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{ backgroundColor: active ? "rgba(0,206,147,0.2)" : "transparent" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: active ? "white" : "rgba(255,255,255,0.5)" }}
                  />
                </motion.div>
                <span
                  className="text-[10px]"
                  style={{ color: active ? "#00ce93" : "rgba(255,255,255,0.5)" }}
                >
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
