import type { Metadata } from "next"
import { Bebas_Neue, Outfit } from "next/font/google"

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FPZ-Media — Lokal. Digital. Komplett.",
  description:
    "Full-service digital agency für lokale Unternehmen im Ruhrgebiet. Web Development, Media Production & Automation aus einer Hand.",
  keywords: ["Webdesign Ruhrgebiet", "Digitalagentur NRW", "Web Development", "Media Production"],
}

export default function V1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: "#060612",
        color: "#f0f4ff",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  )
}
