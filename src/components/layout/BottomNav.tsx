"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          fill={active ? "rgba(0,229,160,0.12)" : "none"}
          strokeLinejoin="round"
        />
        <path
          d="M9 22V12h6v10"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/chat",
    label: "Tutor",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          fill={active ? "rgba(0,229,160,0.12)" : "none"}
          strokeLinejoin="round"
        />
        {active && (
          <>
            <circle cx="8" cy="11" r="1" fill="#00e5a0" />
            <circle cx="12" cy="11" r="1" fill="#00e5a0" />
            <circle cx="16" cy="11" r="1" fill="#00e5a0" />
          </>
        )}
      </svg>
    ),
  },
  {
    href: "/library",
    label: "Library",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3" y="3" width="7" height="7" rx="1.5"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          fill={active ? "rgba(0,229,160,0.12)" : "none"}
        />
        <rect
          x="14" y="3" width="7" height="7" rx="1.5"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          fill={active ? "rgba(0,229,160,0.12)" : "none"}
        />
        <rect
          x="3" y="14" width="7" height="7" rx="1.5"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          fill={active ? "rgba(0,229,160,0.12)" : "none"}
        />
        <rect
          x="14" y="14" width="7" height="7" rx="1.5"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          fill={active ? "rgba(0,229,160,0.12)" : "none"}
        />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12" cy="7" r="4"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          fill={active ? "rgba(0,229,160,0.12)" : "none"}
        />
        <path
          d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
          stroke={active ? "#00e5a0" : "#5a5a68"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
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
                "relative group"
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
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-200",
                  active ? "text-[#00e5a0]" : "text-[#5a5a68]"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
