import { createContext, useContext, useState } from 'react'

export const THEMES = {
  light: {
    key: 'light',
    bg: 'bg-[#f0ece4]',
    bgHex: '#f0ece4',
    surface: 'bg-white/60',
    surfaceHover: 'hover:bg-white/90',
    border: 'border-black/8',
    borderHex: 'rgba(0,0,0,0.08)',
    text: 'text-[#1a1714]',
    textHex: '#1a1714',
    textMuted: 'text-[#6b6560]',
    textMutedHex: '#6b6560',
    accent: '#c8502a',
    accentText: 'text-[#c8502a]',
    accentBg: 'bg-[#c8502a]',
    accentSoft: 'bg-[#c8502a]/10',
    accentGlow: 'rgba(200,80,42,0.3)',
    accentSoftHex: 'rgba(200,80,42,0.12)',
    navBg: 'bg-[#f0ece4]/85 backdrop-blur-xl',
    tag: 'bg-[#c8502a]/10 text-[#c8502a]',
    tagHex: { bg: 'rgba(200,80,42,0.1)', text: '#c8502a' },
    particle: '#c8502a',
    label: 'LIGHT',
  },
  dark: {
    key: 'dark',
    bg: 'bg-[#0d0e14]',
    bgHex: '#0d0e14',
    surface: 'bg-white/4',
    surfaceHover: 'hover:bg-white/8',
    border: 'border-white/8',
    borderHex: 'rgba(255,255,255,0.08)',
    text: 'text-[#e8e4de]',
    textHex: '#e8e4de',
    textMuted: 'text-[#7a7570]',
    textMutedHex: '#7a7570',
    accent: '#ff6b35',
    accentText: 'text-[#ff6b35]',
    accentBg: 'bg-[#ff6b35]',
    accentSoft: 'bg-[#ff6b35]/10',
    accentGlow: 'rgba(255,107,53,0.35)',
    accentSoftHex: 'rgba(255,107,53,0.12)',
    navBg: 'bg-[#0d0e14]/88 backdrop-blur-xl',
    tag: 'bg-[#ff6b35]/15 text-[#ff6b35]',
    tagHex: { bg: 'rgba(255,107,53,0.15)', text: '#ff6b35' },
    particle: '#ff6b35',
    label: 'DARK',
  },
  cyber: {
    key: 'cyber',
    bg: 'bg-[#020b1a]',
    bgHex: '#020b1a',
    surface: 'bg-[#00ffc8]/4',
    surfaceHover: 'hover:bg-[#00ffc8]/8',
    border: 'border-[#00ffc8]/15',
    borderHex: 'rgba(0,255,200,0.15)',
    text: 'text-[#d0ffe8]',
    textHex: '#d0ffe8',
    textMuted: 'text-[#4a9980]',
    textMutedHex: '#4a9980',
    accent: '#00ffc8',
    accentText: 'text-[#00ffc8]',
    accentBg: 'bg-[#00ffc8]',
    accentSoft: 'bg-[#00ffc8]/10',
    accentGlow: 'rgba(0,255,200,0.4)',
    accentSoftHex: 'rgba(0,255,200,0.12)',
    navBg: 'bg-[#020b1a]/90 backdrop-blur-xl',
    tag: 'bg-[#00ffc8]/12 text-[#00ffc8]',
    tagHex: { bg: 'rgba(0,255,200,0.12)', text: '#00ffc8' },
    particle: '#00ffc8',
    label: 'CYBER',
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('light')
  const theme = THEMES[themeKey]

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setThemeKey, THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
