import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function ExpandModal({ card, onClose }) {
  const { theme } = useTheme()

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const Component = card.component

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-200 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      >
        {/* Modal panel */}
        <motion.div
          key="modal-panel"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full flex flex-col rounded-2xl overflow-hidden"
          style={{
            maxWidth: 1100,
            height: 'min(82vh, 700px)',
            border: `1px solid ${theme.accent}40`,
            background: theme.bgHex,
            boxShadow: `0 0 80px ${theme.accentGlow}, 0 40px 80px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-6 py-3 shrink-0"
            style={{ borderBottom: `1px solid ${theme.borderHex}` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{card.icon}</span>
              <span
                className="font-mono text-xs tracking-[3px] uppercase font-bold"
                style={{ color: theme.accent }}
              >
                {card.label}
              </span>
              <span
                className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ color: theme.textMutedHex, border: `1px solid ${theme.borderHex}` }}
              >
                {card.hint}
              </span>
            </div>

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="font-mono text-lg leading-none flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                color: theme.textMutedHex,
                border: `1px solid ${theme.borderHex}`,
                background: theme.surface,
              }}
            >
              ✕
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 relative overflow-hidden">
            <Component />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}