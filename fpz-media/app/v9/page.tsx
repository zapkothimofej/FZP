import { Navbar } from "@/components/v9/Navbar"
import { HeroChrom } from "@/components/v9/HeroChrom"
import { ManifestoSection } from "@/components/v9/ManifestoSection"
import { ServicesSection } from "@/components/v9/ServicesSection"
import { ProcessSection } from "@/components/v9/ProcessSection"
import { StatsSection } from "@/components/v9/StatsSection"
import { PricingSection } from "@/components/v9/PricingSection"
import { PortfolioSection } from "@/components/v9/PortfolioSection"
import { ContactSection } from "@/components/v9/ContactSection"
import { Footer } from "@/components/v9/Footer"

export default function V9Page() {
  return (
    <main>
      <Navbar />
      <HeroChrom />
      <ManifestoSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <PortfolioSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
