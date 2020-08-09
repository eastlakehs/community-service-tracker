module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      text: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        "top-red": "#581717",
        "eastlake-grey": "#585A5A",
      },
    },
  },
  variants: {},
  plugins: [],
};
