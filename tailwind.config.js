/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('https://silkpinturas.com/wp-content/uploads/2021/05/898d8d.jpg')",
        'background-tibidabo': "url('https://images4.alphacoders.com/616/616555.jpg')"
      }
    },
  },
  plugins: [],
};
