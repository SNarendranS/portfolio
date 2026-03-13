import { useTheme } from '../../context/ThemeContext'
import ParticleBackground from '../three/ParticleBackground'
import Navbar from './Navbar'
import HeroSection from '../sections/HeroSection'
import SkillsSection from '../sections/SkillsSection'
import ExperienceSection from '../sections/ExperienceSection'
import ProjectsSection from '../sections/ProjectsSection'
import EducationSection from '../sections/EducationSection'
import ContactSection from '../sections/ContactSection'

export default function PortfolioContent() {
  const { theme } = useTheme()

  return (
    <div
      className="relative min-h-screen transition-colors duration-500 font-display"
      style={{ background: theme.bgHex, color: theme.textHex }}
    >
      {/* Particle background — always behind everything */}
      <ParticleBackground />

      {/* Scrollbar color injection */}
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${theme.accent}60; border-radius: 2px; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Fixed nav */}
      <Navbar />

      {/* Page content — sits above particles */}
      <div className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </div>
  )
}
