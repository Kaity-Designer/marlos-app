import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Marlos design tokens
        brand: {
          50:  "#e6fff6",
          100: "#b3ffe5",
          200: "#66ffc9",
          300: "#00f5a8",
          400: "#00e5a0",  // primary accent
          500: "#00c98c",
          600: "#00a872",
          700: "#007a52",
          800: "#005238",
          900: "#002a1d",
        },
        surface: {
          DEFAULT: "#0f0f10",  // main bg
          1: "#141416",        // card bg
          2: "#1a1a1d",        // elevated card
          3: "#212124",        // inputs / subtle
          4: "#2a2a2e",        // borders / dividers
          5: "#3a3a3f",        // subtle text bg
        },
        text: {
          primary:   "#f5f5f7",
          secondary: "#9999a8",
          tertiary:  "#5a5a68",
          inverse:   "#0f0f10",
        },
        status: {
          success: "#00e5a0",
          warning: "#f5a623",
          error:   "#ff4d4d",
          info:    "#4d9fff",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      spacing: {
        "safe-top":    "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow:        "0 0 24px rgba(0, 229, 160, 0.15)",
        "glow-lg":   "0 0 48px rgba(0, 229, 160, 0.2)",
        card:        "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
        "card-hover":"0 2px 6px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.4)",
      },
      animation: {
        "blob-pulse":    "blobPulse 4s ease-in-out infinite",
        "fade-up":       "fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":       "fadeIn 0.3s ease both",
        "slide-up":      "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in":      "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
        "shimmer":       "shimmer 1.8s linear infinite",
        "bounce-soft":   "bounceSoft 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        blobPulse: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%":      { transform: "scale(1.03) rotate(2deg)", borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%":      { transform: "scale(0.97) rotate(-1deg)", borderRadius: "50% 50% 20% 80% / 25% 80% 20% 75%" },
          "75%":      { transform: "scale(1.02) rotate(1.5deg)", borderRadius: "67% 33% 47% 53% / 37% 20% 80% 63%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
        bounceSoft: {
          "0%":   { transform: "scale(0.95)" },
          "60%":  { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
