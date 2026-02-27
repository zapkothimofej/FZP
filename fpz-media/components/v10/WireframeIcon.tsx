"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

type ShapeType = "cube" | "sphere" | "torus"

function WireframeMesh({ type, color }: { type: ShapeType, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    meshRef.current.rotation.x = t * 0.4
    meshRef.current.rotation.y = t * 0.6
  })

  const material = (
    <meshBasicMaterial color={color} wireframe opacity={0.6} transparent />
  )

  if (type === "cube") {
    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[1.3, 1.3, 1.3]} />
        {material}
      </mesh>
    )
  }
  if (type === "sphere") {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.85, 12, 10]} />
        {material}
      </mesh>
    )
  }
  // torus
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.7, 0.28, 10, 22]} />
      {material}
    </mesh>
  )
}

export function WireframeIcon({ type, color = "#0a0a0a" }: { type: ShapeType, color?: string }) {
  return (
    <div
      style={{
        width: "120px",
        height: "120px",
        pointerEvents: "none",
        flexShrink: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <WireframeMesh type={type} color={color} />
      </Canvas>
    </div>
  )
}

export default WireframeIcon
