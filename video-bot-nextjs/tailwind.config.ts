import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0a0a0a',
          secondary: '#1a1a1a',
          card: '#2a2a2a',
        },
        accent: {
          pink: '#ec4899',
          purple: '#8b5cf6',
          green: '#10b981',
          blue: '#3b82f6',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          muted: '#64748b',
        },
        border: '#ffffff1a',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ec4899, #8b5cf6)',
        'gradient-success': 'linear-gradient(135deg, #10b981, #3b82f6)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
export default config