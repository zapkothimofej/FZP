"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Sphere } from "@react-three/drei"
import * as THREE from "three"

function ChromeMesh({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  // Lerped scroll value — prevents hard rotation snap on fast scroll
  const smoothProgress = useRef(0)

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    // Smooth interpolation toward target scroll value
    smoothProgress.current += (scrollRef.current - smoothProgress.current) * 0.06

    const progress = smoothProgress.current
    meshRef.current.rotation.y = clock.elapsedTime * 0.2 + progress * Math.PI * 2
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1

    const scale = Math.max(0.3, 1 - progress * 0.7)
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#ffffff" />
      <pointLight position={[-8, -4, -6]} intensity={0.8} color="#c8c8c8" />
      {/* Sphere + Environment in same Suspense — neither renders until HDR is ready,
          preventing the dark→reflective flash on initial load */}
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Sphere ref={meshRef} args={[2, 128, 128]}>
          <meshStandardMaterial
            metalness={0.95}
            roughness={0.08}
            color="#d0d0d0"
            envMapIntensity={2.5}
          />
        </Sphere>
      </Suspense>
    </>
  )
}

export function ChromeSphere({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <ChromeMesh scrollRef={scrollRef} />
    </Canvas>
  )
}

export default ChromeSphere
