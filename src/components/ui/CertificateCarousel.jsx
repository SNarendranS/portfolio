import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

// ── Placeholder certificate frame ─────────────────────────────────────────────
function CertPlaceholder({ cert, accent, bgHex, borderHex, textMutedHex }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4 rounded-xl"
      style={{
        background: `linear-gradient(135deg, ${accent}08, ${accent}18)`,
        border: `2px dashed ${accent}40`,
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
        style={{ background: accent + '20', border: `1px solid ${accent}40` }}
      >
        📄
      </div>
      <div className="text-center px-4">
        <p className="font-display font-bold text-sm mb-1" style={{ color: accent }}>
          {cert.label}
        </p>
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMutedHex }}>
          {cert.issued} · Placeholder
        </p>
        <p className="font-mono text-[9px] mt-2 opacity-50" style={{ color: textMutedHex }}>
          Add URL in educationRegistry.js
        </p>
      </div>
    </div>
  )
}

// ── Certificate card ──────────────────────────────────────────────────────────
function CertCard({ cert, theme }) {
  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden"
      style={{ border: `1px solid ${theme.borderHex}`, background: theme.bgHex }}
    >
      {cert.url ? (
        cert.type === 'pdf' ? (
          <iframe src={cert.url} className="w-full h-full border-none" title={cert.label} />
        ) : (
          <img src={cert.url} alt={cert.label} className="w-full h-full object-contain p-2" />
        )
      ) : (
        <CertPlaceholder
          cert={cert}
          accent={theme.accent}
          bgHex={theme.bgHex}
          borderHex={theme.borderHex}
          textMutedHex={theme.textMutedHex}
        />
      )}
    </div>
  )
}

// ── 3D Carousel ───────────────────────────────────────────────────────────────
export default function CertificateCarousel({ certificates }) {
  const { theme } = useTheme()
  const [current, setCurrent] = useState(0)
  const touchStart = useRef(null)
  const total = certificates.length

  const prev = () => setCurrent(i => (i - 1 + total) % total)
  const next = () => setCurrent(i => (i + 1) % total)

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    touchStart.current = null
  }

  if (total === 0) return null

  // Single cert — just show it
  if (total === 1) {
    return (
      <div className="w-full" style={{ height: 220 }}>
        <CertCard cert={certificates[0]} theme={theme} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Carousel track */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ height: 220 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, rotateY: 60, scale: 0.88 }}
            animate={{ opacity: 1, rotateY: 0,  scale: 1 }}
            exit={{ opacity: 0, rotateY: -60, scale: 0.88 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
          >
            <CertCard cert={certificates[current]} theme={theme} />
          </motion.div>
        </AnimatePresence>

        {/* Arrow overlays */}
        {total > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-mono z-10"
              style={{ background: theme.bgHex + 'dd', border: `1px solid ${theme.borderHex}`, color: theme.accent, backdropFilter: 'blur(6px)' }}
            >
              ←
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-mono z-10"
              style={{ background: theme.bgHex + 'dd', border: `1px solid ${theme.borderHex}`, color: theme.accent, backdropFilter: 'blur(6px)' }}
            >
              →
            </motion.button>
          </>
        )}
      </div>

      {/* Label + dots */}
      <p className="font-display font-bold text-sm" style={{ color: theme.accent }}>
        {certificates[current].label}
      </p>
      <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: theme.textMutedHex }}>
        {certificates[current].issued}
      </p>
      <div className="flex items-center gap-2">
        {certificates.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.35 }}
            transition={{ duration: 0.22 }}
            className="h-1.5 rounded-full"
            style={{ background: theme.accent }}
          />
        ))}
      </div>
    </div>
  )
}