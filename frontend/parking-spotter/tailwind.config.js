/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "#EAE7DC",
        title: "#E85A4F",
        title2: "#E98074",
        subtitle: "#8E8D8A",
        background2: "#D8C3A5"

      }
      
      
    },
  },
  plugins: [],
}
