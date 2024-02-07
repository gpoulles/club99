module.exports = {
  purge: [
    './src/**/*.{html,ts}', // This line tells Tailwind to look for class names in your HTML and TypeScript files
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
