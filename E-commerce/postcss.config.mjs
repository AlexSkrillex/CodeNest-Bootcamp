// const config = {
//   plugins: ["@tailwindcss/postcss"],
// };
// export default config;

const config = {
  plugins: [
    "@tailwindcss/postcss", // This processes your Tailwind CSS. It will look for a tailwind.config.js or .mjs file.
    "autoprefixer",         // This adds vendor prefixes to your CSS.
  ],
};

export default config;
