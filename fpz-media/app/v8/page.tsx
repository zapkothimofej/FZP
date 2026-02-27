import { Navbar } from "@/components/v8/Navbar"
import { HeroChrom } from "@/components/v8/HeroChrom"
import { ManifestoSection } from "@/components/v8/ManifestoSection"
import { ServicesSection } from "@/components/v8/ServicesSection"
import { ProcessSection } from "@/components/v8/ProcessSection"
import { StatsSection } from "@/components/v8/StatsSection"
import { PricingSection } from "@/components/v8/PricingSection"
import { PortfolioSection } from "@/components/v8/PortfolioSection"
import { ContactSection } from "@/components/v8/ContactSection"
import { Footer } from "@/components/v8/Footer"

export default function V6Page() {
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
