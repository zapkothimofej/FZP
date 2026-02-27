"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useRef, useMemo, useEffect } from "react"
import { Bebas_Neue, Outfit } from "next/font/google"
import Link from "next/link"

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

const mouse = { x: 0, y: 0 }

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { camera } = useThree()

  const COUNT = 2000
  const CONNECTION_DIST = 0.8

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const linePositions = useMemo(() => {
    const pts: number[] = []
    // Only check a subset for performance
    const subset = 300
    for (let i = 0; i < subset; i++) {
      for (let j = i + 1; j < subset; j++) {
        const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2]
        const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2]
        const dx = ax - bx, dy = ay - by, dz = az - bz
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < CONNECTION_DIST) {
          pts.push(ax, ay, az, bx, by, bz)
        }
      }
    }
    return new Float32Array(pts)
  }, [positions])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.05
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.elapsedTime * 0.05
      linesRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1
    }
    // Smooth camera parallax
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04
    camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1d4ed8" transparent opacity={0.25} />
      </lineSegments>

      {/* Particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#60a5fa"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </>
  )
}

export default function HeroThreeJS() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 600, background: "#060612" }}
    >
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        className="absolute inset-0"
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: true, alpha: false }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#60a5fa" />
        <ParticleField />
      </Canvas>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #060612 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #060612)",
        }}
      />

      {/* Hero text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        {/* Badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
          style={{
            border: "1px solid #1e2a4a",
            background: "rgba(6,6,18,0.6)",
            color: "#60a5fa",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#60a5fa" }}
          />
          Full-Service Digital Agency · Ruhrgebiet
        </div>

        {/* Main heading */}
        <h1
          className={`${display.className} leading-none tracking-wider mb-4`}
          style={{
            fontSize: "clamp(4rem, 14vw, 12rem)",
            color: "#f0f4ff",
            textShadow: "0 0 80px rgba(96,165,250,0.3)",
          }}
        >
          FPZ
          <span style={{ color: "#60a5fa" }}>-</span>
          MEDIA
        </h1>

        {/* Sub heading */}
        <p
          className={`${display.className} tracking-widest mb-3`}
          style={{
            fontSize: "clamp(1rem, 3vw, 2rem)",
            color: "#6b7db3",
            letterSpacing: "0.3em",
          }}
        >
          Lokal.&nbsp; Digital.&nbsp; Komplett.
        </p>

        {/* Description */}
        <p
          className={`${body.className} mb-10 max-w-md`}
          style={{
            color: "#6b7db3",
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            lineHeight: 1.7,
          }}
        >
          Web. Film. Automation — alles aus einer Hand für lokale Unternehmen im Ruhrgebiet.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#contact"
            className={`${body.className} inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold transition-all duration-200`}
            style={{
              background: "#60a5fa",
              color: "#060612",
              boxShadow: "0 0 30px rgba(96,165,250,0.35)",
            }}
          >
            Projekt starten
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#services"
            className={`${body.className} inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold transition-all duration-200`}
            style={{
              border: "1px solid #1e2a4a",
              color: "#f0f4ff",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            Unsere Leistungen
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "#6b7db3" }}
        >
          <span
            className={`${body.className} text-xs tracking-widest uppercase`}
          >
            Scroll
          </span>
          <div
            className="w-px h-12 animate-pulse"
            style={{ background: "linear-gradient(to bottom, #6b7db3, transparent)" }}
          />
        </div>
      </div>
    </section>
  )
}
