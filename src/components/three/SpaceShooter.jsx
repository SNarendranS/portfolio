import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

// ── Constants ─────────────────────────────────────────────────────────────────
const W = 800
const H = 500
const SHIP_SIZE = 14
const BULLET_SPEED = 7
const ASTEROID_SPEEDS = [0.6, 1.0, 1.5]
const POWERUP_DURATION = 6000

// ── Helpers ───────────────────────────────────────────────────────────────────
const rand = (min, max) => Math.random() * (max - min) + min
const randInt = (min, max) => Math.floor(rand(min, max))
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
const wrap = (val, max) => ((val % max) + max) % max

function makeAsteroid(size = 'large', x, y) {
  const sizes = { large: 38, medium: 22, small: 12 }
  const r = sizes[size]
  const angle = rand(0, Math.PI * 2)
  const speed = ASTEROID_SPEEDS[{ large: 0, medium: 1, small: 2 }[size]]
  // avoid spawning on top of player
  const spawnX = x ?? (Math.random() < 0.5 ? rand(0, W * 0.25) : rand(W * 0.75, W))
  const spawnY = y ?? (Math.random() < 0.5 ? rand(0, H * 0.25) : rand(H * 0.75, H))
  const vertices = Array.from({ length: randInt(7, 12) }, (_, i) => {
    const a = (i / 10) * Math.PI * 2
    const jitter = rand(0.7, 1.3)
    return { a, r: r * jitter }
  })
  return { x: spawnX, y: spawnY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r, size, rot: 0, rotSpeed: rand(-0.02, 0.02), vertices, id: Math.random() }
}

function makePowerup(x, y) {
  const types = ['shield', 'rapid']
  return { x, y, type: types[randInt(0, 2)], r: 10, vy: 0.4, id: Math.random() }
}

// ── Draw functions ────────────────────────────────────────────────────────────
function drawShip(ctx, ship, accent, shielded) {
  ctx.save()
  ctx.translate(ship.x, ship.y)
  ctx.rotate(ship.angle)

  // shield bubble
  if (shielded) {
    ctx.beginPath()
    ctx.arc(0, 0, SHIP_SIZE + 10, 0, Math.PI * 2)
    ctx.strokeStyle = accent + 'aa'
    ctx.lineWidth = 2
    ctx.shadowBlur = 12
    ctx.shadowColor = accent
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  // thruster flame
  if (ship.thrusting) {
    ctx.beginPath()
    ctx.moveTo(-SHIP_SIZE * 0.6, SHIP_SIZE * 0.5)
    ctx.lineTo(0, SHIP_SIZE * 0.5 + rand(6, 14))
    ctx.lineTo(SHIP_SIZE * 0.6, SHIP_SIZE * 0.5)
    ctx.strokeStyle = accent + 'cc'
    ctx.lineWidth = 2
    ctx.shadowBlur = 8
    ctx.shadowColor = accent
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  // ship body
  ctx.beginPath()
  ctx.moveTo(0, -SHIP_SIZE)
  ctx.lineTo(SHIP_SIZE * 0.7, SHIP_SIZE * 0.8)
  ctx.lineTo(0, SHIP_SIZE * 0.3)
  ctx.lineTo(-SHIP_SIZE * 0.7, SHIP_SIZE * 0.8)
  ctx.closePath()
  ctx.strokeStyle = accent
  ctx.lineWidth = 2
  ctx.shadowBlur = 10
  ctx.shadowColor = accent
  ctx.stroke()
  ctx.fillStyle = accent + '22'
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.restore()
}

function drawAsteroid(ctx, ast, accent) {
  ctx.save()
  ctx.translate(ast.x, ast.y)
  ctx.rotate(ast.rot)
  ctx.beginPath()
  const verts = ast.vertices
  ctx.moveTo(Math.cos(verts[0].a) * verts[0].r, Math.sin(verts[0].a) * verts[0].r)
  for (let i = 1; i < verts.length; i++) {
    ctx.lineTo(Math.cos(verts[i].a) * verts[i].r, Math.sin(verts[i].a) * verts[i].r)
  }
  ctx.closePath()
  ctx.strokeStyle = accent + 'cc'
  ctx.lineWidth = 1.5
  ctx.shadowBlur = 6
  ctx.shadowColor = accent + '66'
  ctx.stroke()
  ctx.fillStyle = accent + '08'
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.restore()
}

function drawBullet(ctx, b, accent) {
  ctx.beginPath()
  ctx.arc(b.x, b.y, 3, 0, Math.PI * 2)
  ctx.fillStyle = accent
  ctx.shadowBlur = 10
  ctx.shadowColor = accent
  ctx.fill()
  ctx.shadowBlur = 0
}

function drawPowerup(ctx, p, accent) {
  const color = p.type === 'shield' ? '#44aaff' : '#ffaa00'
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.beginPath()
  ctx.arc(0, 0, p.r, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.shadowBlur = 14
  ctx.shadowColor = color
  ctx.stroke()
  ctx.font = 'bold 11px monospace'
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(p.type === 'shield' ? '⛊' : '⚡', 0, 0)
  ctx.shadowBlur = 0
  ctx.restore()
}

function drawStars(ctx, stars) {
  stars.forEach(s => {
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${s.o})`
    ctx.fill()
  })
}

function drawParticles(ctx, particles) {
  particles.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0')
    ctx.fill()
  })
}

// ── Main Game Component ───────────────────────────────────────────────────────
export default function SpaceShooter() {
  const { theme } = useTheme()
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const rafRef = useRef(null)
  const [ui, setUi] = useState({ score: 0, lives: 3, phase: 'idle', powerup: null, highScore: 0 })
  const mouseRef = useRef({ x: W / 2, y: H / 2 })

  const initState = useCallback(() => ({
    ship: { x: W / 2, y: H / 2, angle: -Math.PI / 2, vx: 0, vy: 0, thrusting: false, invincible: 120 },
    bullets: [],
    asteroids: Array.from({ length: 5 }, () => makeAsteroid('large')),
    particles: [],
    powerups: [],
    stars: Array.from({ length: 80 }, () => ({ x: rand(0, W), y: rand(0, H), r: rand(0.3, 1.5), o: rand(0.2, 0.8) })),
    score: 0,
    lives: 3,
    shootCooldown: 0,
    rapidFire: false,
    shielded: false,
    powerupTimer: 0,
    wave: 1,
    waveTimer: 0,
    phase: 'playing',
    keys: {},
    lastShot: 0,
    mouseAngle: -Math.PI / 2,
  }), [])

  const spawnParticles = (state, x, y, color, count = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = rand(0, Math.PI * 2)
      const speed = rand(1, 4)
      state.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: rand(1.5, 3.5), life: 1, color })
    }
  }

  const startGame = useCallback(() => {
    stateRef.current = initState()
    setUi(u => ({ ...u, score: 0, lives: 3, phase: 'playing', powerup: null }))
  }, [initState])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // ── Input ──────────────────────────────────────────────────────────────
    const onKey = (e, down) => {
      if (!stateRef.current) return
      stateRef.current.keys[e.key] = down
      if (down && (e.key === ' ' || e.key === 'ArrowUp')) e.preventDefault()
    }
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = W / rect.width
      const scaleY = H / rect.height
      mouseRef.current = { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
    }
    const onMouseDown = (e) => {
      if (!stateRef.current || stateRef.current.phase !== 'playing') return
      if (e.button === 0) stateRef.current.mouseShoot = true
    }
    const onMouseUp = () => { if (stateRef.current) stateRef.current.mouseShoot = false }
    const onTouch = (e) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const scaleX = W / rect.width
      const scaleY = H / rect.height
      const t = e.touches[0]
      mouseRef.current = { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY }
      if (stateRef.current) stateRef.current.mouseShoot = true
    }
    const onTouchEnd = () => { if (stateRef.current) stateRef.current.mouseShoot = false }

    window.addEventListener('keydown', (e) => onKey(e, true))
    window.addEventListener('keyup', (e) => onKey(e, false))
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('touchmove', onTouch, { passive: false })
    canvas.addEventListener('touchstart', onTouch, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd)

    // ── Game loop ──────────────────────────────────────────────────────────
    const loop = () => {
      const s = stateRef.current
      const accent = theme.accent

      // clear
      ctx.fillStyle = theme.bgHex + 'ee'
      ctx.fillRect(0, 0, W, H)

      if (!s || s.phase !== 'playing') {
        rafRef.current = requestAnimationFrame(loop)
        return
      }

      const { ship, keys } = s

      // ── Ship controls ────────────────────────────────────────────────────
      // Mouse aim
      const dx = mouseRef.current.x - ship.x
      const dy = mouseRef.current.y - ship.y
      s.mouseAngle = Math.atan2(dy, dx) + Math.PI / 2

      if (keys['ArrowLeft'] || keys['a'])  ship.angle -= 0.055
      if (keys['ArrowRight'] || keys['d']) ship.angle += 0.055

      // Use mouse angle if mouse has moved meaningfully
      const mouseDist = Math.hypot(dx, dy)
      if (mouseDist > 30) ship.angle = s.mouseAngle

      ship.thrusting = keys['ArrowUp'] || keys['w']
      if (ship.thrusting) {
        ship.vx += Math.sin(ship.angle) * 0.18
        ship.vy -= Math.cos(ship.angle) * 0.18
      }
      ship.vx *= 0.97
      ship.vy *= 0.97
      ship.x = wrap(ship.x + ship.vx, W)
      ship.y = wrap(ship.y + ship.vy, H)
      if (ship.invincible > 0) ship.invincible--

      // ── Shooting ─────────────────────────────────────────────────────────
      const cooldown = s.rapidFire ? 6 : 14
      if (s.shootCooldown > 0) s.shootCooldown--
      const shooting = keys[' '] || keys['ArrowUp'] || s.mouseShoot
      if (shooting && s.shootCooldown === 0) {
        const bx = ship.x + Math.sin(ship.angle) * SHIP_SIZE
        const by = ship.y - Math.cos(ship.angle) * SHIP_SIZE
        s.bullets.push({ x: bx, y: by, vx: Math.sin(ship.angle) * BULLET_SPEED + ship.vx, vy: -Math.cos(ship.angle) * BULLET_SPEED + ship.vy, life: 55 })
        s.shootCooldown = cooldown
      }

      // ── Update bullets ────────────────────────────────────────────────────
      s.bullets = s.bullets.filter(b => b.life > 0)
      s.bullets.forEach(b => { b.x = wrap(b.x + b.vx, W); b.y = wrap(b.y + b.vy, H); b.life-- })

      // ── Update asteroids ──────────────────────────────────────────────────
      s.asteroids.forEach(a => {
        a.x = wrap(a.x + a.vx, W)
        a.y = wrap(a.y + a.vy, H)
        a.rot += a.rotSpeed
      })

      // ── Bullet-asteroid collisions ────────────────────────────────────────
      const newAsts = []
      const hitBullets = new Set()
      s.asteroids.forEach(ast => {
        let hit = false
        s.bullets.forEach((b, bi) => {
          if (!hitBullets.has(bi) && dist(b, ast) < ast.r) { hit = true; hitBullets.add(bi) }
        })
        if (hit) {
          spawnParticles(s, ast.x, ast.y, accent, ast.size === 'large' ? 10 : 6)
          const pts = { large: 20, medium: 50, small: 100 }
          s.score += pts[ast.size]
          if (ast.size === 'large') { newAsts.push(makeAsteroid('medium', ast.x + rand(-20, 20), ast.y + rand(-20, 20))); newAsts.push(makeAsteroid('medium', ast.x + rand(-20, 20), ast.y + rand(-20, 20))) }
          else if (ast.size === 'medium') { newAsts.push(makeAsteroid('small', ast.x + rand(-10, 10), ast.y + rand(-10, 10))); newAsts.push(makeAsteroid('small', ast.x + rand(-10, 10), ast.y + rand(-10, 10))) }
          // 15% chance powerup drop
          if (Math.random() < 0.15) s.powerups.push(makePowerup(ast.x, ast.y))
        } else {
          newAsts.push(ast)
        }
      })
      s.bullets = s.bullets.filter((_, i) => !hitBullets.has(i))
      s.asteroids = newAsts

      // ── Wave clear ────────────────────────────────────────────────────────
      if (s.asteroids.length === 0) {
        s.wave++
        const count = 4 + s.wave
        for (let i = 0; i < count; i++) s.asteroids.push(makeAsteroid('large'))
      }

      // ── Powerup update ────────────────────────────────────────────────────
      s.powerups = s.powerups.filter(p => p.y < H + 20)
      s.powerups.forEach(p => p.y += p.vy)
      s.powerups = s.powerups.filter(p => {
        if (dist(p, ship) < p.r + SHIP_SIZE) {
          if (p.type === 'shield') s.shielded = true
          if (p.type === 'rapid') s.rapidFire = true
          s.powerupTimer = POWERUP_DURATION
          setUi(u => ({ ...u, powerup: p.type }))
          return false
        }
        return true
      })

      if (s.powerupTimer > 0) {
        s.powerupTimer -= 16
        if (s.powerupTimer <= 0) { s.shielded = false; s.rapidFire = false; setUi(u => ({ ...u, powerup: null })) }
      }

      // ── Ship-asteroid collision ───────────────────────────────────────────
      if (ship.invincible === 0) {
        s.asteroids.forEach(ast => {
          if (dist(ship, ast) < ast.r + SHIP_SIZE * 0.8) {
            if (s.shielded) {
              s.shielded = false
              s.powerupTimer = 0
              setUi(u => ({ ...u, powerup: null }))
              spawnParticles(s, ship.x, ship.y, '#44aaff', 12)
              ship.invincible = 90
            } else {
              spawnParticles(s, ship.x, ship.y, accent, 16)
              s.lives--
              ship.invincible = 120
              ship.vx = 0; ship.vy = 0
              ship.x = W / 2; ship.y = H / 2
              if (s.lives <= 0) {
                s.phase = 'dead'
                setUi(u => ({ ...u, score: s.score, lives: 0, phase: 'dead', highScore: Math.max(u.highScore, s.score) }))
              } else {
                setUi(u => ({ ...u, lives: s.lives }))
              }
            }
          }
        })
      }

      // ── Particles ─────────────────────────────────────────────────────────
      s.particles = s.particles.filter(p => p.life > 0.01)
      s.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vx *= 0.94; p.vy *= 0.94; p.life -= 0.035 })

      // ── Sync score / lives ────────────────────────────────────────────────
      setUi(u => u.score !== s.score || u.lives !== s.lives ? { ...u, score: s.score, lives: s.lives } : u)

      // ── Draw everything ───────────────────────────────────────────────────
      drawStars(ctx, s.stars)
      drawParticles(ctx, s.particles)
      s.powerups.forEach(p => drawPowerup(ctx, p, accent))
      s.asteroids.forEach(a => drawAsteroid(ctx, a, accent))
      s.bullets.forEach(b => drawBullet(ctx, b, accent))
      if (ship.invincible % 6 < 4) drawShip(ctx, ship, accent, s.shielded)

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('keydown', (e) => onKey(e, true))
      window.removeEventListener('keyup', (e) => onKey(e, false))
    }
  }, [theme])

  return (
    <div className="relative w-full flex flex-col items-center select-none" style={{ fontFamily: 'Space Mono, monospace' }}>

      {/* HUD */}
      <div className="w-full flex items-center justify-between px-4 py-2" style={{ maxWidth: W }}>
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-widest" style={{ color: theme.textMutedHex }}>SCORE</span>
          <span className="text-lg font-bold" style={{ color: theme.accent }}>{ui.score}</span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="text-base" style={{ opacity: i < ui.lives ? 1 : 0.15, color: theme.accent }}>▲</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-widest" style={{ color: theme.textMutedHex }}>BEST</span>
          <span className="text-base font-bold" style={{ color: theme.textMutedHex }}>{ui.highScore}</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative rounded-xl overflow-hidden" style={{ width: '100%', maxWidth: W, border: `1px solid ${theme.accent}30` }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full block cursor-crosshair"
          style={{ background: theme.bgHex }}
        />

        {/* Powerup indicator */}
        <AnimatePresence>
          {ui.powerup && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs tracking-widest font-bold"
              style={{ background: ui.powerup === 'shield' ? '#44aaff22' : '#ffaa0022', color: ui.powerup === 'shield' ? '#44aaff' : '#ffaa00', border: `1px solid ${ui.powerup === 'shield' ? '#44aaff' : '#ffaa00'}44` }}
            >
              {ui.powerup === 'shield' ? '⛊ SHIELD ACTIVE' : '⚡ RAPID FIRE'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle overlay */}
        <AnimatePresence>
          {ui.phase === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              style={{ background: theme.bgHex + 'cc', backdropFilter: 'blur(4px)' }}
            >
              <p className="text-xs tracking-[4px] uppercase" style={{ color: theme.accent }}>▹ Mini Game</p>
              <h2 className="font-black text-4xl tracking-tight" style={{ color: theme.textHex }}>ASTEROIDS</h2>
              <p className="text-xs text-center max-w-xs leading-relaxed" style={{ color: theme.textMutedHex }}>
                Mouse to aim · Click or Space to shoot<br />W / ↑ to thrust · A/D / ←→ to rotate<br />Collect power-ups to survive
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.accentGlow}` }}
                whileTap={{ scale: 0.96 }}
                onClick={startGame}
                className="font-mono text-xs tracking-widest uppercase font-bold text-white px-10 py-3 rounded"
                style={{ background: theme.accent, boxShadow: `0 4px 20px ${theme.accentGlow}` }}
              >
                LAUNCH
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game over overlay */}
        <AnimatePresence>
          {ui.phase === 'dead' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
              style={{ background: theme.bgHex + 'cc', backdropFilter: 'blur(4px)' }}
            >
              <h2 className="font-black text-4xl tracking-tight" style={{ color: theme.accent }}>GAME OVER</h2>
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-xs tracking-widest" style={{ color: theme.textMutedHex }}>SCORE</p>
                  <p className="text-2xl font-bold" style={{ color: theme.textHex }}>{ui.score}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs tracking-widest" style={{ color: theme.textMutedHex }}>BEST</p>
                  <p className="text-2xl font-bold" style={{ color: theme.accent }}>{ui.highScore}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.accentGlow}` }}
                whileTap={{ scale: 0.96 }}
                onClick={startGame}
                className="font-mono text-xs tracking-widest uppercase font-bold text-white px-10 py-3 rounded"
                style={{ background: theme.accent, boxShadow: `0 4px 20px ${theme.accentGlow}` }}
              >
                RETRY
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls hint */}
      <p className="mt-2 text-center text-xs tracking-widest" style={{ color: theme.textMutedHex + '88' }}>
        MOUSE AIM · CLICK / SPACE SHOOT · W THRUST · A/D ROTATE
      </p>
    </div>
  )
}