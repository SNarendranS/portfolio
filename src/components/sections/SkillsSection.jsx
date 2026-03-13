import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { SKILLS } from '../../registry'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'
import TiltCard from '../ui/TiltCard'
import Tag from '../ui/Tag'
import { staggerContainer, scaleIn } from '../../hooks/motionVariants'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function SkillsSection() {
  const { theme } = useTheme()
  const { ref, inView } = useScrollReveal()

  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto px-10">
        <SectionHeader num="01" title="SKILLS" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SKILLS.map((cat) => (
            <motion.div key={cat.cat} variants={scaleIn}>
              <TiltCard className="p-7 h-full">
                <p
                  className="font-mono text-[10px] tracking-[3px] uppercase mb-4"
                  style={{ color: theme.accent }}
                >
                  ▹ {cat.cat}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <Tag key={item} label={item} />
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