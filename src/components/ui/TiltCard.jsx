import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function TiltCard({ children, className = '' }) {
  const { theme } = useTheme()
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(springY, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      whileHover={{ scale: 1.02, boxShadow: `0 20px 50px ${theme.accentGlow}` }}
      transition={{ scale: { duration: 0.2 } }}
      className={`border rounded-xl backdrop-blur-xl cursor-default ${theme.surface} ${theme.border} ${className}`}
    >
      {children}
    </motion.div>
  )
}
