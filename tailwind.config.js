module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    screens: {
      xxs: "500px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      bigxl: "1536px",
    },
    extend: {
      colors: {
        verdebase: "#939960",
        regular: "#E5B76E",
        premium: "#ED824C",
        verde: "#023A2F",
        whike: "#FFFBF3",
        grigioscuro: "#B8B8B8",
        grigiochiaro: "#DDDDDD",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        cronos: ["cronos-pro-display", "sans-serif"],
        din: ["din-2014", "sans-serif"],
      },
      spacing: {
        120: "30rem",
        140: "35rem",
        152: "38rem",
      },
    },
  },
  plugins: [require("tailwind-hamburgers")],
};
