"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Stars, Float } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"

// Golden particle orbit around FPZ text
function GoldenParticles() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2.5 + Math.random() * 3
      arr[i * 3] = Math.cos(angle) * radius
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4
      arr[i * 3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.12
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.07) * 0.08
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#c9a84c"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  )
}

// Secondary ambient sparkle ring
function SparkleRing() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      const angle = (i / 200) * Math.PI * 2
      const radius = 6 + Math.sin(i * 0.3) * 0.5
      arr[i * 3] = Math.cos(angle) * radius
      arr[i * 3 + 1] = Math.sin(i * 0.5) * 1.5
      arr[i * 3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = -clock.elapsedTime * 0.06
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#e8d5a3" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

// The FPZ 3D text with gentle float animation
function FPZText() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.18
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
        <Text
          fontSize={2.2}
          color="#c9a84c"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          FPZ
          <meshStandardMaterial
            color="#c9a84c"
            metalness={0.85}
            roughness={0.15}
            emissive="#c9a84c"
            emissiveIntensity={0.3}
          />
        </Text>
      </Float>
    </group>
  )
}

// Scene lighting setup
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffd700" />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ffd700" />
      <pointLight position={[-5, 3, -5]} intensity={0.6} color="#ffffff" />
      <directionalLight position={[0, 10, 5]} intensity={1} color="#fff8e7" />
    </>
  )
}

export default function HeroThreeJS() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px", backgroundColor: "#090909" }}
    >
      {/* Three.js Canvas — fills entire hero */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#090909" }}
        >
          <SceneLights />
          <Stars radius={60} depth={60} count={3000} factor={2} saturation={0} fade speed={0.5} />
          <Suspense fallback={null}>
            <FPZText />
          </Suspense>
          <GoldenParticles />
          <SparkleRing />
        </Canvas>
      </div>

      {/* Radial gradient vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(9,9,9,0.5) 70%, rgba(9,9,9,0.95) 100%)",
        }}
      />

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #090909)",
        }}
      />

      {/* Hero text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <p
            className="text-lg md:text-xl max-w-xl leading-relaxed"
            style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
          >
            Full-service digital agency for local businesses in the Ruhrgebiet.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span
              className="text-sm tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
            >
              Web
            </span>
            <span style={{ color: "#1a1a10" }}>—</span>
            <span
              className="text-sm tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
            >
              Film
            </span>
            <span style={{ color: "#1a1a10" }}>—</span>
            <span
              className="text-sm tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
            >
              Automation
            </span>
          </div>
          <motion.a
            href="#services"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="pointer-events-auto mt-4 inline-flex items-center gap-2 h-12 px-8 rounded-sm text-sm font-semibold tracking-wide"
            style={{
              backgroundColor: "#c9a84c",
              color: "#090909",
              fontFamily: "var(--font-body)",
            }}
          >
            Explore Our Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Top: Agency name badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-24 left-0 right-0 flex justify-center pointer-events-none"
      >
        <span
          className="text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full"
          style={{
            color: "#c9a84c",
            border: "1px solid rgba(201,168,76,0.2)",
            backgroundColor: "rgba(201,168,76,0.05)",
            fontFamily: "var(--font-body)",
          }}
        >
          FPZ Media — Ruhrgebiet
        </span>
      </motion.div>
    </section>
  )
}
