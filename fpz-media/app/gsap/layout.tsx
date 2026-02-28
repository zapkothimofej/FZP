import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import { GrainOverlay } from "@/components/gsap/GrainOverlay"

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
})

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "FPZ Media — V2 Stahl",
  description:
    "Full-service digital agency for local businesses in the Ruhrgebiet. Web. Film. Automation.",
}

export default function GsapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${display.variable} ${body.variable} antialiased`}
      style={{ backgroundColor: "#0a0a0a", color: "#ebebeb", minHeight: "100vh" }}
    >
      <GrainOverlay />
      {children}
    </div>
  )
}
