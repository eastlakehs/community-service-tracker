module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
  ],
  options: {
    whitelist: [
      "appearance-none",
      "block w-full",
      "bg-gray-200",
      "text-gray-700",
      "border",
      "rounded",
      "py-3",
      "px-4",
      "mb-3",
      "leading-tight",
      "focus:outline-none",
      "focus:bg-white",
    ],
  },
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
