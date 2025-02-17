const colors = {
  primary: "#ef495d",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        workSans: ["workSans", "sans-serif"],
      },
    },
    safelist: ["custom-scrollbar","custom-scrollbar-1"],
  },
  plugins: [],
};
