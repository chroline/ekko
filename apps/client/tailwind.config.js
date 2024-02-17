import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Inter", sans-serif'],
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
    extend: {},
  },
  plugins: [],
});
