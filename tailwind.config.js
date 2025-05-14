import scrollbar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c2c2c",
        secondary: "#f5f5f5",
        accent: "#722F37",
        bluegray: "#6B7B8C",
        somon: "#CFA6A4",
        lightgreen: "#C8D5C1",
        gold: "#B58E58",
      },
      fontFamily: {
        archivo: "var(--font-archivo-black)",
        ppneue: "var(--font-pp-neue-montreal)",
      },
    },
  },
  plugins: [scrollbar],
};
