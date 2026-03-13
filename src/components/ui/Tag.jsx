import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function Tag({ label }) {
  const { theme } = useTheme()

  return (
    <motion.span
      whileHover={{ scale: 1.08 }}
      className={`px-3 py-1 rounded text-xs font-mono tracking-wide border ${theme.tag}`}
      style={{ borderColor: `${theme.accent}20` }}
    >
      {label}
    </motion.span>
  )
}
