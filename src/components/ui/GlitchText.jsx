import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function GlitchText({ children, className = '' }) {
  const { theme } = useTheme()
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 200)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={
        glitching
          ? {
              x: [0, -3, 3, -2, 2, 0],
              skewX: [0, -2, 2, -1, 1, 0],
            }
          : { x: 0, skewX: 0 }
      }
      transition={{ duration: 0.2 }}
      style={{
        textShadow: glitching
          ? `3px 0 ${theme.accent}, -3px 0 rgba(0,220,255,0.9)`
          : 'none',
      }}
    >
      {children}
    </motion.span>
  )
}
