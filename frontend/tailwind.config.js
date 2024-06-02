/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
  './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
  './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-right': 'linear-gradient(to right, black var(--tw-gradient-stops), #CBD5E0 var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

