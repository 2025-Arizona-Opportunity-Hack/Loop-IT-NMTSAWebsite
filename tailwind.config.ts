import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // WCAG 2.1 responsive breakpoints
      screens: {
        xs: "320px", // Small mobile devices
        sm: "640px", // Mobile devices
        md: "768px", // Tablets
        lg: "1024px", // Desktop
        xl: "1280px", // Large desktop
        "2xl": "1536px", // Extra large desktop
        // Accessibility-focused breakpoints
        touch: "1024px", // Touch device breakpoint
        print: { raw: "print" }, // Print media queries
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      // Smaller, more compact font sizes
      fontSize: {
        xs: ["0.7rem", { lineHeight: "1.4", letterSpacing: "0.025em" }],
        sm: ["0.8rem", { lineHeight: "1.4", letterSpacing: "0.025em" }],
        base: ["0.9rem", { lineHeight: "1.5", letterSpacing: "normal" }],
        lg: ["1rem", { lineHeight: "1.5", letterSpacing: "normal" }],
        xl: ["1.125rem", { lineHeight: "1.5", letterSpacing: "normal" }],
        "2xl": ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.025em" }],
        "3xl": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.025em" }],
        "4xl": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.025em" }],
        "5xl": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "6xl": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "7xl": ["3.25rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "8xl": ["4rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "9xl": ["5rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        nmtsa: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      // WCAG 2.1 spacing scale
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      // WCAG 2.1 minimum touch targets
      minHeight: {
        touch: "44px",
        "touch-lg": "48px",
      },
      minWidth: {
        touch: "44px",
        "touch-lg": "48px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        gradient: "gradient 15s ease infinite",
        "bounce-slow": "bounce 2s infinite",
        // Reduced motion safe animations
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      // WCAG 2.1 transition durations
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
    },
  },
  plugins: [],
};
export default config;
