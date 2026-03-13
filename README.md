# Narendran Saravanan — Portfolio

Stunning animated portfolio built with **Vite + React**, **Tailwind CSS v4**, **Framer Motion**, and **React Three Fiber**.

---

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run dev server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

---

## 📦 Tech Stack

| Layer       | Library / Tool                          |
|-------------|------------------------------------------|
| Framework   | Vite + React 18                         |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite`)   |
| Animations  | Framer Motion v11                       |
| 3D Avatar   | React Three Fiber + @react-three/drei   |
| Particles   | tsParticles + react-tsparticles         |
| Typewriter  | react-type-animation                    |
| Scroll hook | react-intersection-observer             |

---

## 🗂 Folder Structure

```
src/
├── components/
│   ├── three/
│   │   ├── Avatar3D.jsx          # R3F 3D animated avatar + orbit rings
│   │   └── ParticleBackground.jsx # tsParticles interactive bg
│   ├── sections/
│   │   ├── Navbar.jsx            # Sticky nav + theme switcher
│   │   ├── HeroSection.jsx       # Typewriter + glitch + 3D avatar
│   │   ├── SkillsSection.jsx     # Tilt skill cards
│   │   ├── ExperienceSection.jsx # Animated timeline
│   │   ├── ProjectsSection.jsx   # Project tilt cards
│   │   ├── EducationSection.jsx  # Education + cert cards
│   │   └── ContactSection.jsx    # Contact links + resume CTA
│   └── ui/
│       ├── SectionWrapper.jsx    # Framer Motion scroll reveal wrapper
│       ├── SectionHeader.jsx     # Numbered section heading
│       ├── TiltCard.jsx          # 3D mouse-tilt card (Framer Motion spring)
│       ├── Tag.jsx               # Skill/tech tag pill
│       └── GlitchText.jsx        # Animated glitch text effect
├── context/
│   └── ThemeContext.jsx          # Light / Dark / Cyber theme provider
├── data/
│   └── portfolioData.js          # All content — edit here to update portfolio
├── hooks/
│   ├── useScrollReveal.js        # Intersection observer hook
│   └── motionVariants.js         # Reusable Framer Motion variants
├── App.jsx
├── main.jsx
└── index.css                     # @import "tailwindcss" only
```

---

## 🎨 Themes

Switch themes via the colored circles in the navbar:

| Theme | Default | Feel              |
|-------|---------|-------------------|
| LIGHT | ✅      | Warm cream + rust |
| DARK  |         | Deep black + fire |
| CYBER |         | Neon teal on navy |

---

## ✏️ Updating Content

All portfolio data lives in **`src/data/portfolioData.js`** — just edit that file to update any section. No need to touch components.
