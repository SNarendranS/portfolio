import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { EXPERIENCE, EDUCATION, PROJECTS } from '../registry/index'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'
import TiltCard from '../ui/TiltCard'
import Tag from '../ui/Tag'
import ProjectModal from '../ui/ProjectModal'
import { staggerContainer, scaleIn } from '../../hooks/motionVariants'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// Resolve linkedTo label for the card badge
function getLinkedLabel(linkedTo) {
  if (!linkedTo) return null
  if (linkedTo.kind === 'experience') {
    const exp = EXPERIENCE.find(e => e.id === linkedTo.id)
    return exp ? { icon: '💼', label: exp.company } : null
  }
  if (linkedTo.kind === 'education') {
    const edu = EDUCATION.find(e => e.id === linkedTo.id)
    return edu ? { icon: '🎓', label: edu.degree } : null
  }
  return null
}

export default function ProjectsSection() {
  const { theme } = useTheme()
  const { ref, inView } = useScrollReveal()
  const [selected, setSelected] = useState(null)

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
          {PROJECTS.map((proj) => {
            const linked = getLinkedLabel(proj.linkedTo)
            return (
              <motion.div key={proj.id} variants={scaleIn} className="h-full">
                <TiltCard
                  className="p-7 flex flex-col gap-4 h-full cursor-pointer"
                  onClick={() => setSelected(proj)}
                >
                  {/* Top badges */}
                  <div className="flex justify-between items-start flex-wrap gap-2">
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

                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.stack.map(s => <Tag key={s} label={s} />)}
                  </div>

                  {/* Linked badge */}
                  {linked && (
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg mt-1"
                      style={{ background: theme.accentSoftHex, border: `1px solid ${theme.accent}25` }}
                    >
                      <span className="text-sm">{linked.icon}</span>
                      <span className="font-mono text-[10px] tracking-widest" style={{ color: theme.accent }}>
                        {linked.label}
                      </span>
                    </div>
                  )}

                  {/* Links row */}
                  <div className="flex items-center gap-3 pt-1">
                    {proj.github && (
                      <span className="font-mono text-[10px] tracking-widest" style={{ color: theme.accent }}>⌥ GitHub</span>
                    )}
                    {proj.live && (
                      <span className="font-mono text-[10px] tracking-widest" style={{ color: theme.accent }}>⚡ Live</span>
                    )}
                    {!proj.github && !proj.live && (
                      <span className="font-mono text-[10px] tracking-widest opacity-40" style={{ color: theme.textMutedHex }}>
                        Click for details ↗
                      </span>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            key="project-modal"
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}