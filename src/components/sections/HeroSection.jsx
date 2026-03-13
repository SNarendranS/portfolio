import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useTheme } from '../../context/ThemeContext'
import { ROLES, CONTACT_LINKS } from '../../data/portfolioData'
import Avatar3D from '../three/Avatar3D'
import GlitchText from '../ui/GlitchText'
import { staggerContainer, fadeUp, slideInLeft } from '../../hooks/motionVariants'

// flatten ROLES into TypeAnimation sequence
const TYPE_SEQUENCE = ROLES.flatMap((role) => [role, 2000])

export default function HeroSection() {
  const { theme } = useTheme()

  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-20 pb-10"
    >
      <div className="max-w-6xl mx-auto px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-48 items-center">

        {/* Left — text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={fadeUp}
            className={`font-mono text-xs tracking-[4px] uppercase ${theme.accentText}`}
          >
            ▹ Available for Work
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className={`font-display font-black leading-none tracking-tight ${theme.text}`}
            style={{ fontSize: 'clamp(52px, 7vw, 90px)' }}
          >
            <GlitchText>Narendran</GlitchText>
            <br />
            <span style={{ color: theme.accent }}>Saravanan</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={fadeUp} className="h-10 flex items-center">
            <span
              className="font-mono text-lg font-bold"
              style={{ color: theme.accent }}
            >
              <TypeAnimation
                sequence={TYPE_SEQUENCE}
                wrapper="span"
                repeat={Infinity}
                cursor
              />
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className={`font-display text-base leading-relaxed max-w-lg ${theme.textMuted}`}
            style={{ color: theme.textMutedHex }}
          >
            Full Stack Developer crafting transaction-safe backends, scalable React apps,
            and immersive game experiences. From enterprise APIs to VR worlds — I build it all.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
            <motion.a
              href="#contact"
              whileHover={{ y: -3, boxShadow: `0 12px 40px ${theme.accentGlow}` }}
              whileTap={{ scale: 0.97 }}
              className="font-mono text-xs tracking-widest uppercase font-bold text-white px-8 py-4 rounded"
              style={{ background: theme.accent, boxShadow: `0 4px 24px ${theme.accentGlow}` }}
            >
              HIRE ME
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ y: -3, background: theme.accentSoftHex }}
              whileTap={{ scale: 0.97 }}
              className={`font-mono text-xs tracking-widest uppercase font-bold px-8 py-4 rounded border ${theme.accentText}`}
              style={{ borderColor: theme.accent, color: theme.accent }}
            >
              VIEW WORK
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} className="flex gap-6 items-center flex-wrap mt-2">
            {[
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'LinkedIn', href: 'https://in.linkedin.com/in/narendran-saravanan-32169b23b' },
              { label: 'itch.io', href: 'https://narendran-s.itch.io' },
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

        {/* Right — 3D avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 0.6 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="w-full h-120 lg:h-145 border border-purple-400"
        >
          <Avatar3D />
        </motion.div>
      </div>
    </section>
  )
}
