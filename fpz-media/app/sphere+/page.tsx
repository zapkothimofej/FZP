import { Navbar } from "@/components/chrom/Navbar"
import { Footer } from "@/components/sphere/Footer"
import { FloatingSpheresLayer } from "@/components/sphere-plus/FloatingSpheresLayer"
import { HeroSpherePlus } from "@/components/sphere-plus/HeroSpherePlus"
import { ManifestoSpherePlus } from "@/components/sphere-plus/ManifestoSpherePlus"
import { ServicesSpherePlus } from "@/components/sphere-plus/ServicesSpherePlus"
import { ProcessSpherePlus } from "@/components/sphere-plus/ProcessSpherePlus"
import { StatsSpherePlus } from "@/components/sphere-plus/StatsSpherePlus"
import { PortfolioSpherePlus } from "@/components/sphere-plus/PortfolioSpherePlus"
import { PricingSpherePlus } from "@/components/sphere-plus/PricingSpherePlus"
import { ContactSpherePlus } from "@/components/sphere-plus/ContactSpherePlus"

export default function SpherePlusPage() {
  return (
    <main style={{ position: "relative" }}>
      {/* Fixed ambient sphere layer — sits behind all content */}
      <FloatingSpheresLayer />
      <Navbar />
      <HeroSpherePlus />
      <ManifestoSpherePlus />
      <ServicesSpherePlus />
      <ProcessSpherePlus />
      <StatsSpherePlus />
      <PortfolioSpherePlus />
      <PricingSpherePlus />
      <ContactSpherePlus />
      <Footer />
    </main>
  )
}
