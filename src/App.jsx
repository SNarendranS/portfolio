import { ThemeProvider, useTheme } from './context/ThemeContext'
import ParticleBackground from './components/three/ParticleBackground'
import Navbar from './components/sections/Navbar'
import HeroSection from './components/sections/HeroSection'
import SkillsSection from './components/sections/SkillsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import EducationSection from './components/sections/EducationSection'
import ContactSection from './components/sections/ContactSection'

function PortfolioContent() {
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

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}
