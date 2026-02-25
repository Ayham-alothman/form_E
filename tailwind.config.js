/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // Arabic font support
      fontFamily: {
        'qomra': ['ITF Qomra Arabic', 'sans-serif'],
        // Keep Almarai as fallback
        'arabic': ['ITF Qomra Arabic', 'Almarai', 'sans-serif'],
        'tajawal': ['Tajawal', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
        'almari': ['Almarai', 'sans-serif'],
        'sans': ['Almarai', 'system-ui', 'sans-serif'],
      },
      // RTL spacing utilities
      spacing: {
        'rtl-safe': 'var(--rtl-safe-spacing)',
        'rtl-unsafe': 'var(--rtl-unsafe-spacing)',
      },
      // Custom colors for Arabic themes
      colors: {
        'arabic-gold': '#D4AF37',
        'arabic-blue': '#1E3A8A',
        'arabic-green': '#065F46',
        'gold': '#bca475',
        'green': '#002623',
        'pick' :'#260f14' ,
        'redd' : `#ff0000`

      }
    },
  },
  plugins: [],
  // Enable RTL mode
  rtl: true,
}