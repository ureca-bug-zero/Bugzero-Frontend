/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screen: {
      phone: '393px',
      tablet: '768px',
      desktop: '1440px',
    },
    fontFamily: {
      'inter-regular': ['Inter-Regular'],
      'inter-medium': ['Inter-Medium'],
      'inter-semibold': ['Inter-SemiBold'],
      'inter-bold': ['Inter-Bold'],
      'pretendard-regular': ['Pretendard-Regular'],
      'pretendard-medium': ['Pretendard-Medium'],
      'pretendard-semibold': ['Pretendard-SemiBold'],
      'pretendard-bold': ['Pretendard-Bold'],
      'pretendard-extrabold': ['Pretendard-ExtraBold'],
    },
  },
  plugins: [],
};
