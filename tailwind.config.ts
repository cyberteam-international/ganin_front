import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'sans': ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2c3e50',
          dark: '#2c3e50',
        },
        secondary: '#7A7A7A',
        accent: '#2c3e50',
        success: '#27ae60',
        warning: '#f39c12',
        danger: '#e74c3c',
        text: {
          primary: '#2c3e50',
          secondary: '#7A7A7A',
          light: '#BDC3C7',
        },
        background: {
          primary: '#FFFFFF',
          secondary: '#F6F1EB',
          tertiary: '#F4EDE4',
          accent: '#D7CCC8',
        },
        border: {
          DEFAULT: '#BDC3C7',
          light: '#D7CCC8',
        }
      },
      borderRadius: {
        'DEFAULT': '20px',
        'small': '8px',
        'large': '24px',
      },
      boxShadow: {
        'light': '0 10px 40px rgba(44, 62, 80, 0.08)',
        'medium': '0 15px 50px rgba(44, 62, 80, 0.12)',
        'heavy': '0 20px 60px rgba(44, 62, 80, 0.16)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #F6F1EB 0%, #FFFFFF 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #2c3e50 0%, #2c3e50 100%)',
        'accent-gradient': 'linear-gradient(135deg, #D7CCC8 0%, #F4EDE4 100%)',
        'dark-gradient': 'linear-gradient(135deg, #2c3e50 0%, #2c3e50 100%)',
        'light-gradient': 'linear-gradient(135deg, #F6F1EB 0%, #FFFFFF 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config;
