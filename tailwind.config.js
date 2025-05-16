/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        desktop: '1440px',
        tablet: '760px',
      },
      colors: {
        primary: {
          500: '#1AE273',
          200: '#A3F5C7',
        },
        secondary: {
          600: '#333333',
          500: '#606060',
          200: '#E7EBEE',
        },
        error: {
          200: '#FFCCCC',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
