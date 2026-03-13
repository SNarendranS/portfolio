import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, Sphere, MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei'
import { useTheme } from '../../context/ThemeContext'

function AvatarSphere({ accentColor }) {
  const meshRef = useRef()

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color={accentColor}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Inner glow sphere */}
      <mesh scale={0.85}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.4}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

function OrbitRing({ accentColor, radius, speed, tilt }) {
  const ringRef = useRef()
  useFrame((state) => {
    ringRef.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} transparent opacity={0.5} />
    </mesh>
  )
}

function FloatingParticles({ accentColor }) {
  const count = 40
  const positions = Array.from({ length: count }, () => [
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
  ])

  return positions.map((pos, i) => (
    <mesh key={i} position={pos}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} />
    </mesh>
  ))
}

export default function Avatar3D() {
  const { theme } = useTheme()

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color={theme.accent} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color={theme.accent} />

        <AvatarSphere accentColor={theme.accent} />
        <OrbitRing accentColor={theme.accent} radius={2.4} speed={0.5} tilt={Math.PI / 4} />
        <OrbitRing accentColor={theme.accent} radius={3.0} speed={-0.3} tilt={Math.PI / 6} />
        <FloatingParticles accentColor={theme.accent} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
