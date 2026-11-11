/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#ffd6e8',
        pink: '#ff8fb1',
        rose: '#ff6b9d',
        lavender: '#c9b6ff',
        periwinkle: '#a9b8ff',
        babyblue: '#bfe3ff',
        cream: '#fff6ef',
        peach: '#ffd9c2',
        champagne: '#f3d9a0',
        ink: '#5b3a52',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        dancing: ['"Dancing Script"', 'cursive'],
        sans: ['Poppins', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        floatY: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(6deg)' },
        },
        floatY2: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-5deg)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.25', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.25)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 18px rgba(255,143,177,0.55), 0 0 42px rgba(201,182,255,0.35)' },
          '50%': { boxShadow: '0 0 34px rgba(255,143,177,0.85), 0 0 72px rgba(201,182,255,0.55)' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translate(40px,-120px) scale(1.4)', opacity: '0' },
        },
        flame: {
          '0%,100%': { transform: 'scaleY(1) scaleX(1) rotate(-1deg)', opacity: '1' },
          '50%': { transform: 'scaleY(1.15) scaleX(0.9) rotate(2deg)', opacity: '0.9' },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        floatY2: 'floatY2 7s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        gradientShift: 'gradientShift 12s ease infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        sway: 'sway 4s ease-in-out infinite',
        drift: 'drift 8s ease-in infinite',
        flame: 'flame 0.45s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
