import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { PROJECTS } from '../../data/portfolioData'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'
import TiltCard from '../ui/TiltCard'
import Tag from '../ui/Tag'
import { staggerContainer, scaleIn } from '../../hooks/motionVariants'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ProjectsSection() {
  const { theme } = useTheme()
  const { ref, inView } = useScrollReveal()

  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto px-10">
        <SectionHeader num="03" title="PROJECTS" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((proj, i) => (
            <motion.div key={i} variants={scaleIn} className="h-full">
              <TiltCard className="p-7 flex flex-col gap-4 h-full">
                <div className="flex justify-between items-start">
                  <span
                    className="font-mono text-[10px] tracking-[3px] uppercase px-3 py-1 rounded-full"
                    style={{ background: theme.accentSoftHex, color: theme.accent }}
                  >
                    {proj.type}
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded"
                    style={{ border: `1px solid ${theme.borderHex}`, color: theme.textMutedHex }}
                  >
                    {proj.badge}
                  </span>
                </div>

                <h3
                  className="font-display font-black text-xl leading-tight"
                  style={{ color: theme.textHex }}
                >
                  {proj.name}
                </h3>

                <p
                  className="font-display text-sm leading-relaxed flex-1"
                  style={{ color: theme.textMutedHex }}
                >
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.stack.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
