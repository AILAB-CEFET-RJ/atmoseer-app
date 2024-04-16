/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        primary: 
          'linear-gradient(180deg, rgba(203,235,230,0) 0%, rgba(32,99,222,1) 100%)',
      },
    },
  },
  plugins: [],
}

