import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { EDUCATION } from '../registry/index'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'
import TiltCard from '../ui/TiltCard'
import EducationModal from '../ui/EducationModal'
import { staggerContainer, fadeUp } from '../../hooks/motionVariants'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function EducationSection() {
  const { theme } = useTheme()
  const { ref, inView } = useScrollReveal()
  const [selected, setSelected] = useState(null)

  return (
    <SectionWrapper id="education">
      <div className="max-w-6xl mx-auto px-10">
        <SectionHeader num="04" title="EDUCATION & CERTS" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {EDUCATION.map((edu) => (
            <motion.div key={edu.id} variants={fadeUp}>
              <TiltCard
                className="p-6 flex flex-col gap-3 h-full cursor-pointer"
                onClick={() => setSelected(edu)}
              >
                <div className="text-2xl">{edu.icon}</div>
                <span
                  className="font-mono text-[9px] tracking-[3px] uppercase"
                  style={{ color: theme.accent }}
                >
                  {edu.type}
                </span>
                <h3
                  className="font-display font-black text-base leading-snug"
                  style={{ color: theme.textHex }}
                >
                  {edu.degree}
                </h3>
                <p
                  className="font-display text-xs leading-relaxed flex-1"
                  style={{ color: theme.textMutedHex }}
                >
                  {edu.inst}
                </p>
                <span
                  className="font-mono text-[10px] px-3 py-1 rounded-full self-start"
                  style={{ background: theme.accentSoftHex, color: theme.accent }}
                >
                  {edu.year}
                </span>

                {/* Cert count hint */}
                {edu.certificates?.length > 0 && (
                  <div
                    className="flex items-center gap-1.5 mt-1"
                    style={{ color: theme.textMutedHex }}
                  >
                    <span className="text-xs">📄</span>
                    <span className="font-mono text-[9px] tracking-widest uppercase">
                      {edu.certificates.length} document{edu.certificates.length > 1 ? 's' : ''} · click to view
                    </span>
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <EducationModal
            key="education-modal"
            education={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}