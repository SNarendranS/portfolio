import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { fadeUp } from '../../hooks/motionVariants'

export default function SectionWrapper({ id, children, className = '' }) {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}
