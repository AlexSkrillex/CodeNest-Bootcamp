// This should be the content of your tailwind.config.mjs (or .js)
// If using TypeScript and 'satisfies Config', you might need:
// import type { Config } from 'tailwindcss'

const tailwindConfig = {
    darkMode: "class",
    content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
      "*.{js,ts,jsx,tsx,mdx}", // Be careful with this pattern, it might be too broad.
                              // Consider making it more specific if it's in the root.
    ],
    prefix: "",
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          fadeIn: {
            from: { opacity: "0", transform: "translateY(10px)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
          slideIn: {
            from: { transform: "translateX(-100%)" },
            to: { transform: "translateX(0)" },
          },
          pulse: {
            "0%, 100%": { opacity: "1" },
            "50%": { opacity: "0.5" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "fade-in": "fadeIn 0.5s ease-out forwards",
          "slide-in": "slideIn 0.3s ease-out forwards",
          "pulse-slow": "pulse 3s infinite",
        },
      },
    },
    plugins: [], // Removed tailwindcss-animate plugin since it's not installed
  }; // If you use 'satisfies Config', add it here: } satisfies Config;
  
  export default tailwindConfig;