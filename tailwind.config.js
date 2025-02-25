/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "14px",
          lg: "20px",
        },
        screens: {
          sm: "98%",
          md: "95%",
          lg: "1170px",
        },
      },
      colors: {
        background: "#FFFFFF",
        border: "#ddd",
        ring: "#3DBC12", // Define the "ring" color explicitly
        primary: {
          DEFAULT: "#3DBC12",
        },
        secondary: {
          DEFAULT: "#01080E",
        },
        textPrimary: {
          DEFAULT: "#000000",
          hover: "#53AC9F",
        },
        textSecondary: {
          DEFAULT: "#FFFFFF",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
