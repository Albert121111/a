import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tiara: {
          DEFAULT: '#0f766e',
          light: '#14b8a6'
        }
      }
    }
  },
  plugins: []
};

export default config;
