import { Navbar } from "@/components/gsap/Navbar"
import { HeroGSAP } from "@/components/gsap/HeroGSAP"
import { ManifestoSection } from "@/components/gsap/ManifestoSection"
import { ServicesSection } from "@/components/gsap/ServicesSection"
import { ProcessSection } from "@/components/gsap/ProcessSection"
import { StatsSection } from "@/components/gsap/StatsSection"
import { PricingSection } from "@/components/gsap/PricingSection"
import { PortfolioSection } from "@/components/gsap/PortfolioSection"
import { ContactSection } from "@/components/gsap/ContactSection"
import { Footer } from "@/components/gsap/Footer"

export default function GsapPage() {
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
