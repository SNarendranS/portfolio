import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { PROJECTS } from '../registry/index'
import CertificateCarousel from './CertificateCarousel'

function LinkedProjects({ educationId, theme }) {
  const linked = PROJECTS.filter(
    p => p.linkedTo?.kind === 'education' && p.linkedTo?.id === educationId
  )
  if (linked.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: theme.textMutedHex }}>
        RELATED PROJECTS
      </p>
      <div className="flex flex-col gap-2">
        {linked.map(p => (
          <motion.a
            key={p.id}
            href="#projects"
            whileHover={{ x: 3 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{
              background: theme.accentSoftHex,
              border: `1px solid ${theme.accent}30`,
              textDecoration: 'none',
            }}
          >
            <span className="text-base">🗂</span>
            <div className="flex-1">
              <p className="font-display font-bold text-sm" style={{ color: theme.accent }}>{p.name}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {p.stack.slice(0, 3).map(s => (
                  <span key={s} className="font-mono text-[9px] px-2 py-0.5 rounded" style={{ background: theme.tag?.bg, color: theme.tagHex?.text ?? theme.accent, border: `1px solid ${theme.accent}20` }}>
                    {s}
                  </span>
                ))}
                {p.stack.length > 3 && (
                  <span className="font-mono text-[9px]" style={{ color: theme.textMutedHex }}>+{p.stack.length - 3}</span>
                )}
              </div>
            </div>
            <span className="font-mono text-xs" style={{ color: theme.accent }}>↗</span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

export default function EducationModal({ education, onClose }) {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(14px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full rounded-2xl overflow-hidden overflow-y-auto"
        style={{
          maxWidth: 640,
          maxHeight: '88vh',
          background: theme.bgHex,
          border: `1px solid ${theme.accent}40`,
          boxShadow: `0 0 60px ${theme.accentGlow}, 0 32px 64px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-7 pt-7 pb-5 sticky top-0 z-10"
          style={{ borderBottom: `1px solid ${theme.borderHex}`, background: theme.bgHex }}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">{education.icon}</span>
            <div>
              <span
                className="font-mono text-[9px] tracking-[3px] uppercase"
                style={{ color: theme.accent }}
              >
                {education.type}
              </span>
              <h2
                className="font-display font-black text-xl leading-tight mt-1"
                style={{ color: theme.textHex }}
              >
                {education.degree}
              </h2>
              <p className="font-display text-sm mt-0.5" style={{ color: theme.textMutedHex }}>
                {education.inst}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-4">
            <span
              className="font-mono text-[10px] px-3 py-1 rounded-full"
              style={{ background: theme.accentSoftHex, color: theme.accent }}
            >
              {education.year}
            </span>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full font-mono"
              style={{
                color: theme.textMutedHex,
                border: `1px solid ${theme.borderHex}`,
                background: theme.surface,
              }}
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-7 px-7 py-6">

          {/* Certificate carousel */}
          {education.certificates?.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: theme.textMutedHex }}>
                CERTIFICATES & DOCUMENTS
              </p>
              <CertificateCarousel certificates={education.certificates} />
            </div>
          )}

          {/* Related projects */}
          <LinkedProjects educationId={education.id} theme={theme} />

        </div>
      </motion.div>
    </motion.div>
  )
}