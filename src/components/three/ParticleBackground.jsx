import { useCallback, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import { useTheme } from '../../context/ThemeContext'

export default function ParticleBackground() {
  const { theme } = useTheme()
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((k) => k + 1)
  }, [theme.key])

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      key={key}
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 2 },
          },
        },
        particles: {
          color: { value: theme.particle },
          links: {
            color: theme.particle,
            distance: 130,
            enable: true,
            opacity: 0.25,
            width: 0.8,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: 'none',
            random: true,
            outModes: { default: 'bounce' },
          },
          number: { value: 70, density: { enable: true, area: 900 } },
          opacity: { value: { min: 0.2, max: 0.6 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  )
}
