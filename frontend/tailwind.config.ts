import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,tsx}'],
  theme: {
    colors: {
      'background': '#141417',
      'primary': '#22242B',
      'text': '#838383',
      'link': '#3F9CF2',
      'error': '#f13322b5',
      'error-100': '#8a120ce6',
      'white': 'white'
    },
    extend: {},
  },
  plugins: [],
} satisfies Config

