"use client"

import { useRef, Suspense } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { manifesto } from "@/lib/content-de"

const MARQUEE_TEXT = "WEBENTWICKLUNG · MEDIENPRODUKTION · AUTOMATION · RUHRGEBIET · "

// Chrome sphere with three animated point lights giving it dynamic reflections
function ChromeSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const light1Ref = useRef<THREE.PointLight>(null)
  const light2Ref = useRef<THREE.PointLight>(null)
  const light3Ref = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // Slow sphere rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.04
      meshRef.current.rotation.y = t * 0.07
    }

    // Gentle float
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.12
    }

    // Orbiting lights — create shifting reflections on the sphere
    if (light1Ref.current) {
      light1Ref.current.position.set(
        Math.sin(t * 0.35) * 5,
        Math.cos(t * 0.28) * 3 + 1,
        Math.cos(t * 0.22) * 2 + 5
      )
    }
    if (light2Ref.current) {
      light2Ref.current.position.set(
        Math.cos(t * 0.42) * 6,
        Math.sin(t * 0.31) * 4,
        Math.sin(t * 0.19) * 3 + 4
      )
    }
    if (light3Ref.current) {
      light3Ref.current.position.set(
        Math.sin(t * 0.18 + 2) * 4,
        Math.cos(t * 0.45) * 2 - 2,
        Math.cos(t * 0.38) * 3 + 6
      )
    }
  })

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      {/* Static key light for strong specular */}
      <pointLight position={[4, 3, 6]} intensity={8} color="#ffffff" />

      {/* Three animated lights for dynamic shifting reflections */}
      <pointLight ref={light1Ref} intensity={6} color="#d0d0d0" distance={18} decay={2} />
      <pointLight ref={light2Ref} intensity={4} color="#a8a8a8" distance={16} decay={2} />
      <pointLight ref={light3Ref} intensity={3} color="#e8e8e8" distance={14} decay={2} />

      {/* Dim fill */}
      <ambientLight intensity={0.06} />

      <mesh ref={meshRef}>
        <sphereGeometry args={[2.4, 128, 128]} />
        {/* MeshPhongMaterial: dark base, bright specular highlight — classic chrome look */}
        <meshPhongMaterial
          color="#0d0d0d"
          specular="#e0e0e0"
          shininess={180}
          reflectivity={1}
        />
      </mesh>
    </group>
  )
}

export function HeroChrom() {
  const containerRef = useRef<HTMLElement>(null)
  const word1Ref = useRef<HTMLDivElement>(null)
  const word2Ref = useRef<HTMLDivElement>(null)
  const word3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(word1Ref.current, { x: "-15vw", opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 })
        .fromTo(word2Ref.current, { x: "15vw", opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, "-=0.85")
        .fromTo(word3Ref.current, { y: "8vh", opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, "-=0.85")
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "var(--v6-bg)",
      }}
    >
      {/* Three.js sphere — full-section canvas */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.9 }}
      >
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ width: "100%", height: "100%" }}
          >
            <ChromeSphere />
          </Canvas>
        </Suspense>
      </div>

      {/* Radial vignette — fades sphere edges into background */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 65% 50%, transparent 30%, var(--v6-bg) 75%)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, transparent, var(--v6-hero-gradient-end))",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Marquee ticker */}
      <div
        className="absolute top-20 left-0 right-0 overflow-hidden select-none"
        style={{ zIndex: 2 }}
        aria-hidden
      >
        <div className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_18s_linear_infinite]"
            style={{ color: "var(--v6-accent)", fontSize: "11px", letterSpacing: "0.2em", opacity: 0.4 }}
          >
            {MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}
          </span>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_18s_linear_infinite]"
            style={{ color: "var(--v6-accent)", fontSize: "11px", letterSpacing: "0.2em", opacity: 0.4 }}
            aria-hidden
          >
            {MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* Words */}
      <div
        className="px-8 md:px-16 lg:px-24 pt-16 pb-8 flex flex-col leading-none"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          ref={word1Ref}
          className="block font-[family-name:var(--font-display)] italic will-change-transform"
          style={{ fontSize: "clamp(80px, 18vw, 240px)", color: "var(--v6-text)", lineHeight: 0.9, opacity: 0 }}
        >
          Lokal.
        </div>
        <div
          ref={word2Ref}
          className="block font-[family-name:var(--font-display)] will-change-transform self-end md:self-center text-right md:text-center"
          style={{ fontSize: "clamp(80px, 18vw, 240px)", color: "var(--v6-text)", lineHeight: 0.9, opacity: 0 }}
        >
          Digital.
        </div>
        <div
          ref={word3Ref}
          className="block font-[family-name:var(--font-display)] italic will-change-transform self-end"
          style={{ fontSize: "clamp(80px, 18vw, 240px)", color: "var(--v6-accent)", lineHeight: 0.9, opacity: 0 }}
        >
          Komplett.
        </div>
      </div>

      {/* Sub + CTA */}
      <div
        className="px-8 md:px-16 lg:px-24 pb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        style={{ position: "relative", zIndex: 2 }}
      >
        <p
          ref={subRef}
          className="max-w-md text-base md:text-lg leading-relaxed"
          style={{ color: "var(--v6-text-muted)", opacity: 0, fontFamily: "var(--font-body)" }}
        >
          {manifesto.sub}
        </p>

        <div ref={ctaRef} style={{ opacity: 0, display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="#services"
            className="inline-flex items-center h-11 px-8 text-[13px] tracking-[0.1em] uppercase font-semibold transition-all duration-300 hover:bg-[var(--v6-accent-hover)]"
            style={{ backgroundColor: "var(--v6-accent)", color: "var(--v6-text-on-accent)", textDecoration: "none" }}
          >
            Unsere Leistungen
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 group"
            style={{ color: "var(--v6-accent)", textDecoration: "none" }}
          >
            <span className="text-[13px] tracking-[0.12em] uppercase font-semibold transition-colors duration-300 group-hover:text-[var(--v6-text)]">
              Projekt starten
            </span>
            <span
              className="flex items-center justify-center w-10 h-10 border transition-all duration-300 group-hover:bg-[var(--v6-accent)] group-hover:text-[var(--v6-text-on-accent)]"
              style={{ borderColor: "var(--v6-accent)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroChrom
