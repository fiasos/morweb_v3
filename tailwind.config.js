module.exports = {
  content: ["./pages/**/*.{html,js}", "./*.html", "./public/**/*.js"],
  theme: {
    screens: {
      ph: "350px",
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
        18: "4.5rem",
        108: "27rem",
        120: "30rem",
        140: "35rem",
        152: "38rem",
        300: "75rem",
      },
      borderWidth: {
        16: "1rem",
      },
    },
  },
  plugins: [require("tailwind-hamburgers")],
};
