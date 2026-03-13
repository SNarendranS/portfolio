import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { EXPERIENCE } from '../registry/index'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'
import TiltCard from '../ui/TiltCard'
import Tag from '../ui/Tag'
import { staggerContainer, slideInLeft } from '../../hooks/motionVariants'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ExperienceSection() {
  const { theme } = useTheme()
  const { ref, inView } = useScrollReveal()

  return (
    <SectionWrapper id="experience">
      <div className="max-w-6xl mx-auto px-10">
        <SectionHeader num="02" title="EXPERIENCE" />

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(to bottom, ${theme.accent}, ${theme.accentSoftHex})` }}
          />

          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8 pl-14"
          >
            {EXPERIENCE.map((exp, i) => (
              <motion.div key={i} variants={slideInLeft} className="relative">
                {/* Timeline dot */}
                <motion.div
                  animate={{ boxShadow: [`0 0 0 0 ${theme.accentGlow}`, `0 0 0 8px transparent`] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute -left-11.75 top-7 w-4 h-4 rounded-full"
                  style={{ background: theme.accent }}
                />

                <TiltCard className="p-7">
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <div>
                      <h3
                        className={`font-display font-black text-xl ${theme.text}`}
                        style={{ color: theme.textHex }}
                      >
                        {exp.role}
                      </h3>
                      <p className="font-mono text-sm mt-1" style={{ color: theme.accent }}>
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span
                      className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full"
                      style={{ background: theme.accentSoftHex, color: theme.accent }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2 mb-5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm font-display leading-relaxed" style={{ color: theme.textMutedHex }}>
                        <span style={{ color: theme.accent, flexShrink: 0 }}>▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}