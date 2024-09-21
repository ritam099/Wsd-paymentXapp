/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#F0EC8B',
        'custom-purple': '#8E43ED',
        'custom-teal': '#403541',
        'custom-black': '#2B2726',
        'custom-black-2':'#2E2828',
        'custom-white':'#FEF4F4',
        'custom-orange':'#F65151',
        'custom-blue': '#5F7ADB',
        'custom-indigo': '#A2B2EE'
      },
    },
  },
  plugins: [],
}