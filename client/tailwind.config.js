// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable dark mode if needed
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".clip-zigzag": {
          clipPath:
            "polygon(12% 0%, 85% 0%, 100% 40%, 85% 100%, 15% 100%, 0% 40%)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
