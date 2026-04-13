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

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#00e5a0] !text-[#050505] font-bold hover:bg-[#00f5b0] active:bg-[#00c98c] shadow-[0_0_24px_rgba(0,229,160,0.25)] hover:shadow-[0_0_32px_rgba(0,229,160,0.35)]",
  secondary:
    "bg-[#1a1a1d] text-[#f5f5f7] border border-[rgba(255,255,255,0.08)] hover:bg-[#212124] hover:border-[rgba(255,255,255,0.12)]",
  ghost:
    "text-[#9999a8] hover:text-[#f5f5f7] hover:bg-[rgba(255,255,255,0.05)]",
  danger:
    "bg-[rgba(255,77,77,0.15)] text-[#ff4d4d] border border-[rgba(255,77,77,0.2)] hover:bg-[rgba(255,77,77,0.25)]",
  outline:
    "bg-transparent text-[#00e5a0] border border-[rgba(0,229,160,0.4)] hover:bg-[rgba(0,229,160,0.08)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9  px-4  text-sm  rounded-xl",
  md: "h-11 px-5  text-sm  rounded-2xl",
  lg: "h-14 px-6  text-base rounded-2xl",
  xl: "h-16 px-8  text-lg  font-bold rounded-3xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "lg",
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base
          "inline-flex items-center justify-center gap-2",
          "font-medium transition-all duration-200",
          "select-none outline-none",
          "active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none",
          "cubic-bezier(0.16,1,0.3,1)",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          ...(variant === "primary" && { color: "#050505" }),
        }}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoadingDots />
          </span>
        ) : (
          children
        )}
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
          className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 120}ms`, animationDuration: "0.8s" }}
        />
      ))}
    </span>
  );
}
