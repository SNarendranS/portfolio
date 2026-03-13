import { useTheme } from '../../context/ThemeContext'

export default function SectionHeader({ num, title }) {
  const { theme } = useTheme()

  return (
    <div className="flex items-center gap-5 mb-14">
      <span className={`font-mono text-sm opacity-40 ${theme.accentText}`}>{num}.</span>
      <h2
        className={`font-display font-black tracking-tight ${theme.text}`}
        style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
      >
        {title}
      </h2>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, ${theme.borderHex}, transparent)` }}
      />
    </div>
  )
}
