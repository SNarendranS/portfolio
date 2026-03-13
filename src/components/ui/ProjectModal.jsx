import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { EXPERIENCE,EDUCATION } from '../registry/index'
import Tag from './Tag'

function LinkButton({ href, label, icon, accent, accentGlow }) {
  if (!href) return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded font-mono text-xs tracking-widest uppercase opacity-30 cursor-not-allowed"
      style={{ border: `1px solid currentColor`, color: accent }}
    >
      {icon} {label} — Coming Soon
    </div>
  )
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2, boxShadow: `0 8px 24px ${accentGlow}` }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-2 px-4 py-2 rounded font-mono text-xs tracking-widest uppercase font-bold text-white"
      style={{ background: accent, boxShadow: `0 4px 14px ${accentGlow}` }}
    >
      {icon} {label}
    </motion.a>
  )
}

function LinkedBadge({ linkedTo, theme }) {
  if (!linkedTo) return null

  const record = linkedTo.kind === 'experience'
    ? EXPERIENCE.find(e => e.id === linkedTo.id)
    : EDUCATION.find(e => e.id === linkedTo.id)

  if (!record) return null

  const label = linkedTo.kind === 'experience'
    ? `${record.role} @ ${record.company}`
    : record.degree

  const icon = linkedTo.kind === 'experience' ? '💼' : '🎓'
  const section = linkedTo.kind === 'experience' ? '#experience' : '#education'

  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: theme.textMutedHex }}>
        BUILT DURING
      </p>
      <motion.a
        href={section}
        whileHover={{ x: 3 }}
        className="flex items-center gap-3 px-4 py-3 rounded-lg w-fit"
        style={{
          background: theme.accentSoftHex,
          border: `1px solid ${theme.accent}30`,
          textDecoration: 'none',
        }}
      >
        <span className="text-lg">{icon}</span>
        <div>
          <p className="font-display font-bold text-sm" style={{ color: theme.accent }}>{label}</p>
          {linkedTo.kind === 'experience' && record.period && (
            <p className="font-mono text-[10px]" style={{ color: theme.textMutedHex }}>{record.period}</p>
          )}
        </div>
        <span className="font-mono text-xs ml-2" style={{ color: theme.accent }}>↗</span>
      </motion.a>
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
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
        className="relative w-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          maxWidth: 680,
          background: theme.bgHex,
          border: `1px solid ${theme.accent}40`,
          boxShadow: `0 0 60px ${theme.accentGlow}, 0 32px 64px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-7 pt-7 pb-5"
          style={{ borderBottom: `1px solid ${theme.borderHex}` }}
        >
          <div className="flex flex-col gap-2 flex-1 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-mono text-[10px] tracking-[3px] uppercase px-3 py-1 rounded-full"
                style={{ background: theme.accentSoftHex, color: theme.accent }}
              >
                {project.type}
              </span>
              <span
                className="font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded"
                style={{ border: `1px solid ${theme.borderHex}`, color: theme.textMutedHex }}
              >
                {project.badge}
              </span>
            </div>
            <h2
              className="font-display font-black text-2xl leading-tight"
              style={{ color: theme.textHex }}
            >
              {project.name}
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 font-mono"
            style={{
              color: theme.textMutedHex,
              border: `1px solid ${theme.borderHex}`,
              background: theme.surface,
            }}
          >
            ✕
          </motion.button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 px-7 py-6">
          {/* Description */}
          <p className="font-display text-sm leading-relaxed" style={{ color: theme.textMutedHex }}>
            {project.desc}
          </p>

          {/* Tech stack */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: theme.textMutedHex }}>
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(s => <Tag key={s} label={s} />)}
            </div>
          </div>

          {/* Linked experience / education */}
          <LinkedBadge linkedTo={project.linkedTo} theme={theme} />

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: theme.textMutedHex }}>
              LINKS
            </p>
            <div className="flex gap-3 flex-wrap">
              <LinkButton href={project.github} label="GitHub" icon="⌥" accent={theme.accent} accentGlow={theme.accentGlow} />
              <LinkButton href={project.live}   label="Live Demo" icon="⚡" accent={theme.accent} accentGlow={theme.accentGlow} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}