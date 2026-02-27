"use client"

import dynamic from "next/dynamic"

const HeroThreeJS = dynamic(() => import("@/components/v1/HeroThreeJS"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: "100svh", minHeight: 600, background: "#060612" }}
    >
      <div
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ background: "#60a5fa" }}
      />
    </div>
  ),
})

export default function HeroThreeLazy() {
  return <HeroThreeJS />
}
