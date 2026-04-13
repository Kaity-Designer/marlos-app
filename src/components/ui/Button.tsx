"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size    = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeStyles: Record<Size, string> = {
  sm: "h-9  px-4  text-sm  rounded-xl",
  md: "h-11 px-5  text-sm  rounded-2xl",
  lg: "h-14 px-6  text-base rounded-2xl",
  xl: "h-16 px-8  text-lg  font-bold rounded-3xl",
};

const variantClass: Record<Variant, string> = {
  primary:  "btn-primary-force font-bold",
  secondary:"bg-[#1a1a1d] text-[#f5f5f7] border border-[rgba(255,255,255,0.08)] hover:bg-[#212124]",
  ghost:    "text-[#9999a8] hover:text-[#f5f5f7] hover:bg-[rgba(255,255,255,0.05)]",
  danger:   "bg-[rgba(255,77,77,0.15)] text-[#ff4d4d] border border-[rgba(255,77,77,0.2)] hover:bg-[rgba(255,77,77,0.25)]",
  outline:  "border text-[#00e5a0] border-[rgba(0,229,160,0.4)] hover:bg-[rgba(0,229,160,0.08)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "lg", loading = false, fullWidth = false, className, children, disabled, style, ...props }, ref) => {

    const isPrimary = variant === "primary";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 cursor-pointer select-none outline-none",
          "font-semibold transition-all duration-200",
          "active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none",
          variantClass[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          // Double-enforced: CSS utility class + inline style so nothing can override
          ...(isPrimary && {
            backgroundColor: "#00e5a0",
            color: "#050505",
            boxShadow: "0 0 24px rgba(0,229,160,0.25)",
          }),
          ...style,
        }}
        {...props}
      >
        {loading ? <LoadingDots /> : children}
      </button>
    );
  }
);
Button.displayName = "Button";

function LoadingDots() {
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ backgroundColor: "#050505", animationDelay: `${i * 120}ms`, animationDuration: "0.8s" }}
        />
      ))}
    </span>
  );
}
