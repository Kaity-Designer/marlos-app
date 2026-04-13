"use client";

import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, trailing, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold text-[#c8c8d4] px-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-4 text-[#7a7a90] pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-14 rounded-2xl",
              "bg-[#1a1a1d] border border-[rgba(255,255,255,0.07)]",
              "text-[#f5f5f7] placeholder:text-[#7a7a90]",
              "text-base font-medium",
              "transition-all duration-200",
              "focus:outline-none focus:border-[rgba(0,229,160,0.5)] focus:bg-[#1f1f22]",
              "focus:shadow-[0_0_0_3px_rgba(0,229,160,0.12)]",
              icon ? "pl-11 pr-4" : "px-4",
              trailing ? "pr-12" : "",
              error && "border-[rgba(255,77,77,0.4)] focus:border-[rgba(255,77,77,0.6)]",
              className
            )}
            {...props}
          />
          {trailing && (
            <span className="absolute right-4 text-[#9999a8]">{trailing}</span>
          )}
        </div>
        {error && (
          <p className="text-xs text-[#ff4d4d] px-1 animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
