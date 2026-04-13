"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Grid2x2, User } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
};

const navItems: NavItem[] = [
  {
    href: "/home",
    label: "Home",
    icon: (active) => (
      <Home
        size={22}
        strokeWidth={active ? 2.2 : 1.8}
        color={active ? "#00e5a0" : "#7a7a8a"}
        fill={active ? "rgba(0,229,160,0.12)" : "none"}
      />
    ),
  },
  {
    href: "/chat",
    label: "Tutor",
    icon: (active) => (
      <MessageCircle
        size={22}
        strokeWidth={active ? 2.2 : 1.8}
        color={active ? "#00e5a0" : "#7a7a8a"}
        fill={active ? "rgba(0,229,160,0.12)" : "none"}
      />
    ),
  },
  {
    href: "/library",
    label: "Library",
    icon: (active) => (
      <Grid2x2
        size={22}
        strokeWidth={active ? 2.2 : 1.8}
        color={active ? "#00e5a0" : "#7a7a8a"}
        fill={active ? "rgba(0,229,160,0.12)" : "none"}
      />
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (active) => (
      <User
        size={22}
        strokeWidth={active ? 2.2 : 1.8}
        color={active ? "#00e5a0" : "#7a7a8a"}
        fill={active ? "rgba(0,229,160,0.12)" : "none"}
      />
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl",
                "transition-all duration-200 active:scale-90",
                "relative"
              )}
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            >
              {/* Active indicator pill */}
              {active && (
                <span
                  className="absolute -top-0.5 w-1 h-1 rounded-full bg-[#00e5a0]"
                  style={{ boxShadow: "0 0 6px rgba(0,229,160,0.8)" }}
                />
              )}
              {item.icon(active)}
              <span className={cn(
                "text-[10px] font-medium transition-colors duration-200",
                active ? "text-[#00e5a0]" : "text-[#7a7a8a]"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
