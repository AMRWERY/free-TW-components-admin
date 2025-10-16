import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'], // Supports both `class="dark"` and `data-theme="dark"`
  theme: {
    extend: {
      colors: {
        // Light grays for backgrounds or cards
        lightsmoke: "#F5F5F5",
        gainsboro: "#DCDCDC",
        cultured: "#F3F4F6", // softer gray
        silversand: "#C4C4C4",
        // Custom semantic text colors (optional)
        lightText: {
          primary: "#1a1a1a",
          secondary: "#4b4b4b",
          muted: "#757575",
        },
        darkText: {
          primary: "#f8f8f2",
          secondary: "#d6d6d6",
          muted: "#999999",
        },
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        // sans: [
        //   "Public Sans",
        //   "Inter",
        //   "ui-sans-serif",
        //   "system-ui",
        //   "sans-serif",
        // ],
        // sans: ['"Nunito Sans"'],
      },
      screens: {
        xs: "414px", // iPhone Plus
        sm: "576px", // Small tablets
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  corePlugins: {
    aspectRatio: false, // we use plugin version
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;
