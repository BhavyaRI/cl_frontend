/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1C1C1E',      // Main background
        'dark-card': '#2C2C2E',    // Card background
        'dark-text-primary': '#FFFFFF', // Primary text (white)
        'dark-text-secondary': '#8E8E93', // Secondary text (gray)
        'dark-accent': '#0A84FF',      // Accent color for links/buttons
        'dark-border': '#3A3A3C',    // Border color
        'pie-easy': '#34C759',      // Green for easy
        'pie-medium': '#FFCC00',    // Yellow for medium
        'pie-hard': '#FF3B30',      // Red for hard
      }
    },
  },
  plugins: [require("daisyui")],
}