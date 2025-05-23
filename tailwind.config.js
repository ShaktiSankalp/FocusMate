// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      colors: {
        primary: '#2563eb',       // Modern blue for highlights/buttons
        grayLight: '#f3f4f6',     // Light gray background (similar to bg-gray-100 but customizable)
        grayDark: '#111827',      // Dark text color (darker than default)
      },
      boxShadow: {
        'soft-md': '0 4px 12px rgba(0, 0, 0, 0.06)', // softer shadow for cards
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
