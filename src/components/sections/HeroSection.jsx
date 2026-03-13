import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useTheme } from '../../context/ThemeContext'
import { ROLES } from '../../registry'
import GlitchText from '../ui/GlitchText'
import CubicCarousel from '../ui/CubicCarousel'
import { staggerContainer, fadeUp } from '../../hooks/motionVariants'

const TYPE_SEQUENCE = ROLES.flatMap((role) => [role, 2000])

export default function HeroSection() {
  const { theme } = useTheme()

  return (
    <section id="about" className="min-h-screen flex flex-col" style={{ overflow: 'hidden' }}>

      {/* ── TOP: centred text ─────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center gap-5 px-6 pt-28 pb-4 relative z-10"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs tracking-[4px] uppercase"
          style={{ color: theme.accent }}
        >
          ▹ Available for Work
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display font-black leading-none tracking-tight"
          style={{ fontSize: 'clamp(44px, 7.5vw, 92px)', color: theme.textHex }}
        >
          <GlitchText>Narendran</GlitchText>{' '}
          <span style={{ color: theme.accent }}>Saravanan</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="h-8 flex items-center">
          <span className="font-mono text-base font-bold" style={{ color: theme.accent }}>
            <TypeAnimation sequence={TYPE_SEQUENCE} wrapper="span" repeat={Infinity} cursor />
          </span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-display text-sm leading-relaxed max-w-xl"
          style={{ color: theme.textMutedHex }}
        >
          Full Stack Developer crafting transaction-safe backends, scalable React apps,
          and immersive game experiences. From enterprise APIs to VR worlds — I build it all.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex gap-3 flex-wrap justify-center items-center">
          <motion.a
            href="#contact"
            whileHover={{ y: -3, boxShadow: `0 12px 40px ${theme.accentGlow}` }}
            whileTap={{ scale: 0.97 }}
            className="font-mono text-xs tracking-widest uppercase font-bold text-white px-8 py-3 rounded"
            style={{ background: theme.accent, boxShadow: `0 4px 20px ${theme.accentGlow}` }}
          >
            HIRE ME
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="font-mono text-xs tracking-widest uppercase font-bold px-8 py-3 rounded border"
            style={{ borderColor: theme.accent, color: theme.accent }}
          >
            VIEW WORK
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={fadeUp} className="flex gap-6 items-center flex-wrap justify-center">
          {[
            { label: 'GitHub',   href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://in.linkedin.com/in/narendran-saravanan-32169b23b' },
            { label: 'itch.io',  href: 'https://narendran-s.itch.io' },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              className="font-mono text-xs tracking-widest border-b pb-0.5 transition-colors duration-200"
              style={{ color: theme.textMutedHex, borderColor: theme.borderHex }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.accent
                e.currentTarget.style.borderColor = theme.accent
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.textMutedHex
                e.currentTarget.style.borderColor = theme.borderHex
              }}
            >
              {link.label} ↗
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* ── BOTTOM: cubic carousel ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="w-full px-6 pb-10 pt-4"
      >
        <CubicCarousel />
      </motion.div>
    </section>
  )
}