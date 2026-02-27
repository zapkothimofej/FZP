"use client"

import dynamic from "next/dynamic"

const HeroThreeJS = dynamic(() => import("@/components/v3/HeroThreeJS"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#090405",
      }}
    />
  ),
})

export default function HeroThreeLazy() {
  return <HeroThreeJS />
}
