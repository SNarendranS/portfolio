import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { CARDS } from '../registry/index'
import ExpandModal from './ExpandModal'

// ── Cubic rotation math ───────────────────────────────────────────────────────
// For N cards we rotate in Y by (360 / N) per step
// Each face is translated out by a radius so they form a ring (not just a cube)
function getTranslateZ(cardCount, cardWidth) {
  // radius of circumscribed circle for N-gon
  const angle = (2 * Math.PI) / cardCount
  return Math.round((cardWidth / 2) / Math.tan(angle / 2))
}

// ── Single carousel face ──────────────────────────────────────────────────────
function CarouselFace({ card, faceIndex, currentIndex, total, containerWidth, containerHeight, onExpand, theme }) {
  const Component = card.component
  const anglePerFace = 360 / total
  const rotateY = faceIndex * anglePerFace
  const translateZ = getTranslateZ(total, containerWidth)

  // Is this the active face?
  const normalised = ((faceIndex - currentIndex) % total + total) % total
  const isActive = normalised === 0
  const isAdjacent = normalised === 1 || normalised === total - 1

  return (
    <div
      style={{
        position: 'absolute',
        width: containerWidth,
        height: containerHeight,
        transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${isActive ? theme.accent + '50' : theme.borderHex}`,
        boxShadow: isActive ? `0 0 40px ${theme.accentGlow}` : 'none',
        transition: 'box-shadow 0.4s, border-color 0.4s',
        pointerEvents: isActive ? 'all' : 'none',
        background: theme.bgHex,
      }}
    >
      <Component />

      {/* Expand button — only on active face */}
      {isActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.12, boxShadow: `0 0 20px ${theme.accentGlow}` }}
          whileTap={{ scale: 0.92 }}
          onClick={onExpand}
          className="absolute top-3 right-3 z-20 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-bold"
          style={{
            background: theme.bgHex + 'dd',
            border: `1px solid ${theme.accent}60`,
            color: theme.accent,
            backdropFilter: 'blur(8px)',
          }}
        >
          ⛶ EXPAND
        </motion.button>
      )}

      {/* Card label badge */}
      <div
        className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full"
        style={{
          background: theme.bgHex + 'cc',
          border: `1px solid ${theme.borderHex}`,
          color: theme.textMutedHex,
          backdropFilter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      >
        <span>{card.icon}</span>
        <span>{card.label}</span>
      </div>
    </div>
  )
}

// ── Dot indicators ────────────────────────────────────────────────────────────
function DotIndicators({ total, current, theme, onDotClick }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      {Array.from({ length: total }).map((_, i) => {
        const normalised = ((i - current) % total + total) % total
        const isActive = normalised === 0
        return (
          <motion.button
            key={i}
            onClick={() => onDotClick(i)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.85 }}
            animate={{ width: isActive ? 24 : 8, opacity: isActive ? 1 : 0.4 }}
            transition={{ duration: 0.25 }}
            className="h-2 rounded-full"
            style={{ background: theme.accent }}
          />
        )
      })}
    </div>
  )
}

// ── Arrow button ──────────────────────────────────────────────────────────────
function ArrowBtn({ direction, onClick, theme }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, x: direction === 'left' ? -2 : 2, boxShadow: `0 0 20px ${theme.accentGlow}` }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-10 h-10 rounded-full font-mono text-lg font-bold shrink-0 z-10"
      style={{
        background: theme.surface,
        border: `1px solid ${theme.accent}40`,
        color: theme.accent,
        backdropFilter: 'blur(8px)',
      }}
    >
      {direction === 'left' ? '←' : '→'}
    </motion.button>
  )
}

// ── Main CubicCarousel ────────────────────────────────────────────────────────
export default function CubicCarousel() {
  const { theme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedCard, setExpandedCard] = useState(null)
  const containerRef = useRef(null)
  const [dims, setDims] = useState({ w: 760, h: 460 })

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setDims({ w, h: Math.min(Math.round(w * 0.58), 500) })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const total = CARDS.length
  const anglePerFace = 360 / total

  const prev = useCallback(() => setCurrentIndex(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrentIndex(i => (i + 1) % total), [total])

  const goTo = useCallback((faceIndex) => {
    setCurrentIndex(faceIndex)
  }, [])

  // Swipe handling
  const touchStart = useRef(null)
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev() }
    touchStart.current = null
  }

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  const translateZ = getTranslateZ(total, dims.w)
  const currentCard = CARDS[((currentIndex % total) + total) % total]

  return (
    <>
      <div className="flex flex-col items-center w-full select-none">

        {/* Carousel row: arrow + scene + arrow */}
        <div className="flex items-center gap-4 w-full" style={{ maxWidth: dims.w + 120 }}>
          <ArrowBtn direction="left" onClick={prev} theme={theme} />

          {/* 3D scene container */}
          <div
            ref={containerRef}
            className="flex-1 relative"
            style={{ height: dims.h }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* perspective wrapper */}
            <div style={{ width: '100%', height: '100%', perspective: `${dims.w * 2}px`, perspectiveOrigin: '50% 50%' }}>
              <motion.div
                animate={{ rotateY: -currentIndex * anglePerFace }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: '100%', height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transformOrigin: `50% 50% -${translateZ}px`,
                }}
              >
                {CARDS.map((card, i) => (
                  <CarouselFace
                    key={card.id}
                    card={card}
                    faceIndex={i}
                    currentIndex={currentIndex}
                    total={total}
                    containerWidth={dims.w}
                    containerHeight={dims.h}
                    onExpand={() => setExpandedCard(card)}
                    theme={theme}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <ArrowBtn direction="right" onClick={next} theme={theme} />
        </div>

        {/* Dots + current label */}
        <div className="flex flex-col items-center gap-2 mt-3">
          <DotIndicators total={total} current={currentIndex} theme={theme} onDotClick={goTo} />
          <p
            className="font-mono text-[9px] tracking-[3px] uppercase"
            style={{ color: theme.textMutedHex }}
          >
            {currentCard.hint}
          </p>
        </div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {expandedCard && (
          <ExpandModal
            key="expand-modal"
            card={expandedCard}
            onClose={() => setExpandedCard(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}