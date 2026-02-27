"use client"

import dynamic from "next/dynamic"

const Services3D = dynamic(() => import("@/components/v4/Services3D"), {
  ssr: false,
  loading: () => (
    <div
      className="py-28 px-6"
      style={{ backgroundColor: "#080600" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                backgroundColor: "#100e02",
                border: "1px solid #2a2203",
                height: 360,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
})

export default function Services3DLazy() {
  return <Services3D />
}
