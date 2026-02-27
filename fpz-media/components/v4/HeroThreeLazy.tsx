"use client"

import dynamic from "next/dynamic"

const HeroThreeJS = dynamic(() => import("@/components/v4/HeroThreeJS"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: "100svh", minHeight: "600px", backgroundColor: "#080600" }}
    >
      <div
        className="text-center"
        style={{ color: "#92824a", fontFamily: "var(--font-body)" }}
      >
        <div
          className="text-7xl font-black mb-4"
          style={{ fontFamily: "var(--font-display)", color: "#fbbf24", opacity: 0.3 }}
        >
          FPZ
        </div>
        <div className="text-sm tracking-widest uppercase opacity-50">Loading...</div>
      </div>
    </div>
  ),
})

export default function HeroThreeLazy() {
  return <HeroThreeJS />
}
