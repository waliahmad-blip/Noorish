/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#020408', // Singularity Deep Void
          900: '#050811', // Deep Space Vacuum
          850: '#070B14', // Base Canvas Layer
          800: '#0D1424', // Card Substrate
          700: '#152038', // Border Highlight
          600: '#1F2E4D',
        },
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#00F0FF', // Superluminal Photonic Cyan
          600: '#0891B2',
          700: '#0E7490',
        },
        violet: {
          400: '#A78BFA',
          500: '#8B5CF6', // Holographic Spectral Violet
          600: '#7C3AED',
          700: '#6D28D9',
        },
        mint: {
          400: '#34D399',
          500: '#00FFA3', // Quantum Coherence Laser Mint
          600: '#059669',
        },
        chrome: {
          50: '#FFFFFF',
          100: '#F8FAFC', // Liquid Chrome Light
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        headline: ['"Syne"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'hologram-glow': 'holoGlow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        holoGlow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 35px rgba(139, 92, 246, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}

