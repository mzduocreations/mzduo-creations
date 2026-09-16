import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Custom palette sampled from ColorTheme.jpeg + Logo.jpeg
        teal: "#5CB6AA",
        slate: "#587596",
        lilac: "#8081A6",
        coral: "#F17E7E",
        peach: "#F9AC96",
        cream: "#FBE3C4",
        blush: "#FBEEE6", // logo background
        plum: "#7A4A7E", // logo outline / accent
        pinkbubble: "#E9B7E4",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "ui-rounded", "system-ui", "sans-serif"],
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(122,74,126,0.25)",
        card: "0 12px 40px -12px rgba(88,117,150,0.35)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        fadeup: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        fadeup: "fadeup 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
