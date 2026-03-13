import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

const TECH_LABELS = [
  'React.js', 'Node.js', 'PostgreSQL', 'Strapi',
  'Unity', 'Unreal', 'Three.js', 'MongoDB',
  'Express', 'C#', 'TypeScript', 'WebGL',
]

function LowPolyPlanet({ accentColor }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.6, 1)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const n = 1 + (Math.random() - 0.5) * 0.2
      pos.setXYZ(i, pos.getX(i) * n, pos.getY(i) * n, pos.getZ(i) * n)
    }
    g.computeVertexNormals()
    return g
  }, [])

  useFrame((s) => { if (meshRef.current) meshRef.current.rotation.y = s.clock.elapsedTime * 0.1 })

  return (
    <mesh ref={meshRef} geometry={geo}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={accentColor} emissive={accentColor}
        emissiveIntensity={hovered ? 0.45 : 0.18}
        roughness={0.75} metalness={0.3} flatShading
      />
    </mesh>
  )
}

function PlanetRing({ accentColor, innerR, outerR, tilt, speed }) {
  const ref = useRef()
  const geo = useMemo(() => new THREE.RingGeometry(innerR, outerR, 80), [innerR, outerR])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: accentColor, emissive: accentColor, emissiveIntensity: 0.4,
    side: THREE.DoubleSide, transparent: true, opacity: 0.5, roughness: 0.4,
  }), [accentColor])
  useFrame((s) => { ref.current.rotation.z = s.clock.elapsedTime * speed })
  return <mesh ref={ref} geometry={geo} material={mat} rotation={[tilt, 0, 0]} />
}

function OrbitingMoon({ accentColor, orbitRadius, speed, phase, size, onExplode }) {
  const ref = useRef()
  const [exploded, setExploded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const geo = useMemo(() => new THREE.IcosahedronGeometry(size, 0), [size])
  const posRef = useRef(new THREE.Vector3())

  useFrame((s) => {
    if (!ref.current || exploded) return
    const t = s.clock.elapsedTime * speed + phase
    const x = Math.cos(t) * orbitRadius
    const y = Math.sin(t * 0.4) * 0.5
    const z = Math.sin(t) * orbitRadius
    ref.current.position.set(x, y, z)
    posRef.current.set(x, y, z)
    ref.current.rotation.y = t * 2
  })

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    setExploded(true)
    onExplode(posRef.current.clone())
    setTimeout(() => setExploded(false), 2200)
  }, [onExplode])

  if (exploded) return null

  return (
    <mesh ref={ref} geometry={geo} onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={hovered ? '#ffffff' : accentColor}
        emissive={accentColor}
        emissiveIntensity={hovered ? 1.0 : 0.3}
        roughness={0.8} flatShading
      />
    </mesh>
  )
}

function ExplosionParticles({ origin, accentColor, onDone }) {
  const groupRef = useRef()
  const particles = useMemo(() => Array.from({ length: 20 }, () => ({
    vel: new THREE.Vector3((Math.random()-0.5)*5, (Math.random()-0.5)*5, (Math.random()-0.5)*5),
    size: Math.random() * 0.13 + 0.04,
  })), [])
  const posRef = useRef(particles.map(() => origin.clone()))
  const life = useRef(1)

  useFrame((_, dt) => {
    life.current -= dt * 0.85
    if (life.current <= 0) { onDone(); return }
    particles.forEach((p, i) => {
      posRef.current[i].addScaledVector(p.vel, dt)
      p.vel.multiplyScalar(0.91)
    })
    groupRef.current?.children.forEach((m, i) => {
      m.position.copy(posRef.current[i])
      m.material.opacity = Math.max(0, life.current)
    })
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={origin.clone()}>
          <tetrahedronGeometry args={[p.size, 0]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} transparent opacity={1} flatShading />
        </mesh>
      ))}
    </group>
  )
}

function TechLabel({ label, radius, speed, phase, tilt, accentColor }) {
  const ref = useRef()
  const [vis, setVis] = useState(false)

  useFrame((s) => {
    if (!ref.current) return
    const t = s.clock.elapsedTime * speed + phase
    ref.current.position.set(Math.cos(t) * radius, Math.sin(tilt + t * 0.3) * 0.9, Math.sin(t) * radius)
    setVis(ref.current.position.z > 0.2)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 6, 6]} />
      <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} />
      {vis && (
        <Html distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span style={{
            color: accentColor, fontSize: '9px', fontFamily: 'Space Mono, monospace',
            fontWeight: 700, letterSpacing: '1px', whiteSpace: 'nowrap',
            textShadow: `0 0 10px ${accentColor}`,
          }}>
            {label}
          </span>
        </Html>
      )}
    </mesh>
  )
}

function FloatingDebris({ accentColor }) {
  const pieces = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    radius: 2.9 + Math.random() * 1.2, yOffset: (Math.random()-0.5)*2,
    scale: 0.05 + Math.random()*0.09, speed: 0.07 + Math.random()*0.1,
    phase: (i/16)*Math.PI*2,
  })), [])
  const refs = useRef([])

  useFrame((s) => {
    pieces.forEach((p, i) => {
      if (!refs.current[i]) return
      const t = s.clock.elapsedTime * p.speed + p.phase
      refs.current[i].position.set(Math.cos(t)*p.radius, p.yOffset+Math.sin(t*0.5)*0.3, Math.sin(t)*p.radius)
      refs.current[i].rotation.x = t
      refs.current[i].rotation.z = t*0.7
    })
  })

  return pieces.map((p, i) => (
    <mesh key={i} ref={(el) => (refs.current[i]=el)} scale={p.scale}>
      <tetrahedronGeometry args={[1,0]} />
      <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} flatShading transparent opacity={0.65} />
    </mesh>
  ))
}

function DragZoomControls({ groupRef }) {
  const { gl } = useThree()
  const dragging = useRef(false)
  const prev = useRef({ x:0, y:0 })
  const vel = useRef({ x:0, y:0 })
  const zoomRef = useRef(1)

  useFrame(() => {
    if (!groupRef.current) return
    if (!dragging.current) { vel.current.x *= 0.92; vel.current.y *= 0.92 }
    groupRef.current.rotation.y += vel.current.y
    groupRef.current.rotation.x = Math.max(-0.75, Math.min(0.75, groupRef.current.rotation.x + vel.current.x))
  })

  useMemo(() => {
    const el = gl.domElement
    const cx = (e) => e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const cy = (e) => e.clientY ?? e.touches?.[0]?.clientY ?? 0
    const down = (e) => { dragging.current = true; prev.current = { x: cx(e), y: cy(e) } }
    const move = (e) => {
      if (!dragging.current) return
      vel.current.y = (cx(e) - prev.current.x) * 0.009
      vel.current.x = (cy(e) - prev.current.y) * 0.009
      prev.current = { x: cx(e), y: cy(e) }
    }
    const up = () => { dragging.current = false }
    const wheel = (e) => {
      if (!groupRef.current) return
      zoomRef.current = Math.max(0.45, Math.min(2.2, zoomRef.current - e.deltaY * 0.001))
      groupRef.current.scale.setScalar(zoomRef.current)
    }
    el.addEventListener('mousedown', down)
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseup', up)
    el.addEventListener('touchstart', down, { passive: true })
    el.addEventListener('touchmove', move, { passive: true })
    el.addEventListener('touchend', up)
    el.addEventListener('wheel', wheel, { passive: true })
    return () => {
      el.removeEventListener('mousedown', down)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseup', up)
      el.removeEventListener('touchstart', down)
      el.removeEventListener('touchmove', move)
      el.removeEventListener('touchend', up)
      el.removeEventListener('wheel', wheel)
    }
  }, [gl, groupRef])

  return null
}

function PlanetScene({ accent }) {
  const groupRef = useRef()
  const [explosions, setExplosions] = useState([])

  const handleExplode = useCallback((pos) => {
    const id = Math.random()
    setExplosions(ex => [...ex, { id, pos }])
  }, [])

  const removeExplosion = useCallback((id) => {
    setExplosions(ex => ex.filter(e => e.id !== id))
  }, [])

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5,8,5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-6,-4,-6]} intensity={0.8} color={accent} />
      <pointLight position={[0,6,0]} intensity={0.5} color={accent} />
      <Stars radius={60} depth={40} count={1600} factor={3} saturation={0} fade speed={0.5} />
      <DragZoomControls groupRef={groupRef} />
      <Float speed={0.6} floatIntensity={0.2} rotationIntensity={0}>
        <group ref={groupRef}>
          <LowPolyPlanet accentColor={accent} />
          <PlanetRing accentColor={accent} innerR={2.1} outerR={2.75} tilt={1.2} speed={0.04} />
          <PlanetRing accentColor={accent} innerR={2.95} outerR={3.4} tilt={1.3} speed={-0.028} />
          <OrbitingMoon accentColor={accent} orbitRadius={2.5} speed={0.5}  phase={0}           size={0.22} onExplode={handleExplode} />
          <OrbitingMoon accentColor={accent} orbitRadius={3.3} speed={0.3}  phase={Math.PI}     size={0.15} onExplode={handleExplode} />
          <OrbitingMoon accentColor={accent} orbitRadius={2.0} speed={0.85} phase={Math.PI/2}   size={0.10} onExplode={handleExplode} />
          <FloatingDebris accentColor={accent} />
          {TECH_LABELS.map((label, i) => (
            <TechLabel key={label} label={label}
              radius={4.2 + (i%3)*0.5}
              speed={0.12 + i*0.008}
              phase={(i/TECH_LABELS.length)*Math.PI*2}
              tilt={(i%4)*0.4 - 0.6}
              accentColor={accent}
            />
          ))}
          {explosions.map(({ id, pos }) => (
            <ExplosionParticles key={id} origin={pos} accentColor={accent} onDone={() => removeExplosion(id)} />
          ))}
        </group>
      </Float>
    </>
  )
}

export default function Avatar3D() {
  const { theme } = useTheme()
  return (
    <div className="w-full h-full relative">
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full pointer-events-none"
        style={{ color: theme.textMutedHex, background: theme.bgHex+'aa', border:`1px solid ${theme.borderHex}` }}
      >
        DRAG · SCROLL ZOOM · CLICK MOONS
      </div>
      <Canvas camera={{ position:[0,2.5,9], fov:48 }} gl={{ antialias:true, alpha:true }} style={{ background:'transparent', cursor:'grab' }}>
        <PlanetScene accent={theme.accent} />
      </Canvas>
    </div>
  )
}