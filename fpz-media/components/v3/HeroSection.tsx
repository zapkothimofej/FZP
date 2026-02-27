"use client"

import HeroContent from "@/components/v3/HeroContent"
import HeroThreeLazy from "@/components/v3/HeroThreeLazy"

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Three.js canvas — absolute full screen */}
      <HeroThreeLazy />

      {/* Dark gradient overlay so text is legible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(9,4,5,0.4) 0%, rgba(9,4,5,0.85) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero text content */}
      <HeroContent />
    </section>
  )
}
