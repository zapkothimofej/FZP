import HeroThreeLazy from "@/components/v1/HeroThreeLazy"
import Navbar from "@/components/v1/Navbar"
import ManifestoSection from "@/components/v1/ManifestoSection"
import ServicesSection from "@/components/v1/ServicesSection"
import ProcessSection from "@/components/v1/ProcessSection"
import StatsSection from "@/components/v1/StatsSection"
import PricingSection from "@/components/v1/PricingSection"
import PortfolioSection from "@/components/v1/PortfolioSection"
import ContactSection from "@/components/v1/ContactSection"
import Footer from "@/components/v1/Footer"

export default function V1Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroThreeLazy />
        <ManifestoSection />
        <ServicesSection />
        <StatsSection />
        <ProcessSection />
        <PricingSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
