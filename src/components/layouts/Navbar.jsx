import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, THEMES } from '../../context/ThemeContext'
import { NAV_LINKS } from '../registry/index'

export default function Navbar() {
  const { theme, themeKey, setThemeKey } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? `${theme.navBg} border-b border-${theme.borderHex}` : ''
      }`}
      style={{ borderBottom: scrolled ? `1px solid ${theme.borderHex}` : 'none' }}
    >
      <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          className={`font-mono font-bold text-lg tracking-wider ${theme.accentText}`}
        >
          &lt;NS /&gt;
        </motion.a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ y: -1 }}
              className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${theme.textMuted} hover:${theme.accentText}`}
              style={{ color: theme.textMutedHex }}
              onMouseEnter={(e) => (e.target.style.color = theme.accent)}
              onMouseLeave={(e) => (e.target.style.color = theme.textMutedHex)}
            >
              {link}
            </motion.a>
          ))}

          {/* Theme switcher */}
          <div className="flex items-center gap-2 ml-4">
            {Object.values(THEMES).map((th) => (
              <motion.button
                key={th.key}
                onClick={() => setThemeKey(th.key)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title={th.label}
                className="w-5 h-5 rounded-full border-2 transition-all duration-200"
                style={{
                  background: th.accent,
                  borderColor: themeKey === th.key ? th.accent : 'transparent',
                  boxShadow: themeKey === th.key ? `0 0 10px ${th.accentGlow}` : 'none',
                  transform: themeKey === th.key ? 'scale(1.25)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}