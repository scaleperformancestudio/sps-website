import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        // SPS brand — black dominant, three whites for text/borders, three greens for accent
        bg: {
          DEFAULT: "#000000", // brand black
          soft: "#0a0a0a",
          card: "#111111",
        },
        // Three whites (from lightest to darkest)
        ink: {
          DEFAULT: "#f2f2f2", // primary text
          muted: "#e5e5e5", // secondary text
          dim: "#d2d2d2", // tertiary text
        },
        // Three greens (dark → mid → bright)
        brand: {
          dark: "#1c5102",
          DEFAULT: "#266604",
          bright: "#2e7f06",
        },
        // Accent alias for convenience (maps to the brightest green)
        accent: {
          DEFAULT: "#2e7f06",
          hover: "#266604",
        },
      },
      maxWidth: {
        content: "1200px",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #1c5102 0%, #266604 50%, #2e7f06 100%)",
        "brand-radial":
          "radial-gradient(circle at 30% 20%, rgba(46,127,6,0.15) 0%, rgba(0,0,0,0) 60%)",
      },
      animation: {
        "pulse-slow": "pulse-slow 8s ease-in-out infinite",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        scan: "scan 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
        "scan-glow": "scan-glow 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
        sparkle: "sparkle 1.2s ease-out forwards",
        "magic-pulse": "magic-pulse 1.4s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        "marquee-fast": "marquee 15s linear infinite",
        "wave-flow-slow": "wave-flow 28s linear infinite",
        "wave-flow-fast": "wave-flow 18s linear infinite",
        "wave-drift": "wave-drift 12s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.1)" },
        },
        "ping-slow": {
          "0%": { opacity: "0.6", transform: "scale(1)" },
          "75%, 100%": { opacity: "0", transform: "scale(1.6)" },
        },
        scan: {
          "0%": { top: "-4%", opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        "scan-glow": {
          "0%": { top: "-55%", opacity: "0" },
          "8%": { opacity: "0.9" },
          "92%": { opacity: "0.9" },
          "100%": { top: "100%", opacity: "0" },
        },
        sparkle: {
          "0%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "40%": { opacity: "1", transform: "scale(1.2) rotate(180deg)" },
          "100%": { opacity: "0", transform: "scale(0.4) rotate(360deg)" },
        },
        "magic-pulse": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "30%": { opacity: "0.85", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(2.2)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wave-flow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wave-drift": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
