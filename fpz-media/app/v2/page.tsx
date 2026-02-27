import { Navbar } from "@/components/v2/Navbar"
import { HeroGSAP } from "@/components/v2/HeroGSAP"
import { ManifestoSection } from "@/components/v2/ManifestoSection"
import { ServicesSection } from "@/components/v2/ServicesSection"
import { ProcessSection } from "@/components/v2/ProcessSection"
import { StatsSection } from "@/components/v2/StatsSection"
import { PricingSection } from "@/components/v2/PricingSection"
import { PortfolioSection } from "@/components/v2/PortfolioSection"
import { ContactSection } from "@/components/v2/ContactSection"
import { Footer } from "@/components/v2/Footer"

export default function V2Page() {
  return (
    <main>
      <Navbar />
      <HeroGSAP />
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
