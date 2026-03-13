import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { CONTACT_LINKS } from '../../registry'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'
import TiltCard from '../ui/TiltCard'
import { staggerContainer, fadeUp } from '../../hooks/motionVariants'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ContactSection() {
  const { theme } = useTheme()
  const { ref, inView } = useScrollReveal()

  return (
    <SectionWrapper id="contact">
      <div className="max-w-6xl mx-auto px-10">
        <SectionHeader num="05" title="CONTACT" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CONTACT_LINKS.map((c) => (
            <motion.div key={c.label} variants={fadeUp}>
              <TiltCard className="p-6">
                <a href={c.href} target="_blank" rel="noreferrer" className="block no-underline">
                  <p className="font-mono text-[10px] tracking-[3px] uppercase mb-2" style={{ color: theme.textMutedHex }}>
                    {c.label}
                  </p>
                  <motion.p
                    className="font-display font-bold text-base"
                    style={{ color: theme.accent }}
                    whileHover={{ x: 4 }}
                  >
                    {c.value} ↗
                  </motion.p>
                </a>
              </TiltCard>
            </motion.div>
          ))}

          {/* Resume CTA */}
          <motion.div variants={fadeUp}>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: `0 20px 50px ${theme.accentGlow}` }}
              whileTap={{ scale: 0.97 }}
              className="p-6 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer h-full min-h-24"
              style={{ background: theme.accent }}
            >
              <a href="#" className="no-underline text-center">
                <p className="font-mono text-[10px] tracking-[3px] uppercase text-white/70">DOWNLOAD</p>
                <p className="font-display font-black text-2xl text-white mt-1">RESUME ↓</p>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={fadeUp}
          className="mt-24 pt-8 flex items-center justify-center"
          style={{ borderTop: `1px solid ${theme.borderHex}` }}
        >
          <p className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: theme.textMutedHex }}>
            Designed & Built by Narendran Saravanan · {new Date().getFullYear()}
          </p>
        </motion.footer>
      </div>
    </SectionWrapper>
  )
}