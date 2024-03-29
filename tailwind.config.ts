import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ['"Inter", sans-serif'],
      heading: ['"Fredoka", sans-serif'],
    },
    colors: {
      purple: {
        50: "#f6f2ff",
        100: "#ede8ff",
        200: "#ded4ff",
        300: "#c7b1ff",
        400: "#ac85ff",
        500: "#9b61ff",
        600: "#8530f7",
        700: "#771ee3",
        800: "#6318bf",
        900: "#52169c",
        950: "#330b6a",
      },
    },
    extend: {
      animation: {
        magnet: "magnet 2s ease-in-out infinite",
      },
      keyframes: {
        magnet: {
          "0%, 100%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
});
