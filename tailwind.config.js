/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
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
    colors: {
      primary: 'rgb(26, 226, 115)' /*bg*/,
      secondary: 'rgb(51, 51, 51)' /*text*/,
      error: 'rgb(255, 204, 204)',
      success: 'rgb(26, 226, 115)',
      'gray-700': 'rgb(96, 96, 96)',
      'gray-200': 'rgb(231, 235, 238)',
      'gray-100': 'rgb(233, 233, 233)',
      white: 'rgb(255, 255, 255)',
      transparent: 'transparent',
    },
  },
  plugins: [],
};
