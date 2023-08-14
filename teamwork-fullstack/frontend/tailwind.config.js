module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#FEFFFC",
        first: "#131F27",
        second: "#4ECDC4",
        third: "#727272",
        accent: "#19978b",
        admin1: "#fff49b",
        admin2: "",
        admin3: "",
        admin4: "",
      },
      animation: {
        fade: "fadeOut 5s ease-in-out",
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { backgroundColor: theme("colors.main") },
          "100%": { backgroundColor: theme("colors.transparent") },
        },
      }),
    },
  },
  plugins: [require("flowbite/plugin")],
};
