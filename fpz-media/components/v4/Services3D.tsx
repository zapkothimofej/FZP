"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { motion, type Variants } from "framer-motion"
import { services } from "@/lib/content"

// Rotating Cube — Web
function RotatingCube() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.6
      ref.current.rotation.y = clock.elapsedTime * 0.9
    }
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

// Rotating Sphere — Media
function RotatingSphere() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.7
      ref.current.rotation.x = clock.elapsedTime * 0.3
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

// Rotating Torus — Automation
function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.5
      ref.current.rotation.y = clock.elapsedTime * 0.8
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.5, 0.2, 16, 100]} />
      <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

const shapes = [RotatingCube, RotatingSphere, RotatingTorus]

interface MiniCanvasProps {
  index: number
}

function MiniCanvas({ index }: MiniCanvasProps) {
  const ShapeComponent = shapes[index]
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: 80, height: 80, background: "transparent" }}
    >
      <ambientLight intensity={0.5} color="#e8d5a3" />
      <directionalLight position={[3, 3, 3]} intensity={2} color="#c9a84c" />
      <pointLight position={[-2, -1, 2]} intensity={1} color="#c9a84c" />
      <Suspense fallback={null}>
        <ShapeComponent />
      </Suspense>
    </Canvas>
  )
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

export default function Services3D() {
  return (
    <section id="services" className="py-28 px-6" style={{ backgroundColor: "#090909" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "#c9a84c" }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
            >
              What We Do
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
          >
            Our Services
          </h2>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative rounded-sm overflow-hidden"
              style={{
                backgroundColor: "#111108",
                border: "1px solid #1a1a10",
              }}
              whileHover={{
                borderColor: "rgba(201,168,76,0.4)",
                transition: { duration: 0.2 },
              }}
            >
              {/* Top bar with 3D icon */}
              <div
                className="flex items-start justify-between p-6 pb-0"
              >
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                >
                  {service.number}
                </span>
                {/* 3D Mini Canvas */}
                <div className="rounded-sm overflow-hidden" style={{ width: 80, height: 80 }}>
                  <MiniCanvas index={i} />
                </div>
              </div>

              <div className="p-6 pt-4">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm mb-5 leading-relaxed"
                  style={{ color: "#c9a84c", fontFamily: "var(--font-display)", fontStyle: "italic" }}
                >
                  {service.headline}
                </p>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                >
                  {service.description}
                </p>

                {/* Deliverables */}
                <ul className="flex flex-col gap-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "#f5f0e0", fontFamily: "var(--font-body)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "#c9a84c" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div
                  className="mt-6 h-px w-0 group-hover:w-full transition-all duration-700"
                  style={{ backgroundColor: "#c9a84c" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
