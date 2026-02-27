import { Navbar } from "@/components/v7/Navbar"
import { HeroClean } from "@/components/v7/HeroClean"
import { ManifestoSection } from "@/components/v7/ManifestoSection"
import { ServicesSection } from "@/components/v7/ServicesSection"
import { ProcessSection } from "@/components/v7/ProcessSection"
import { StatsSection } from "@/components/v7/StatsSection"
import { PricingSection } from "@/components/v7/PricingSection"
import { PortfolioSection } from "@/components/v7/PortfolioSection"
import { ContactSection } from "@/components/v7/ContactSection"
import { Footer } from "@/components/v7/Footer"

export default function V7Page() {
  return (
    <main style={{ position: "relative" }}>
      {/* Dot-grid background texture */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(45,212,191,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Page content above dot grid */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroClean />
        <ManifestoSection />
        <ServicesSection />
        <ProcessSection />
        <StatsSection />
        <PricingSection />
        <PortfolioSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
