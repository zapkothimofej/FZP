import HeroSection from "@/components/v3/HeroSection"
import Navbar from "@/components/v3/Navbar"
import ManifestoSection from "@/components/v3/ManifestoSection"
import ServicesSection from "@/components/v3/ServicesSection"
import ProcessSection from "@/components/v3/ProcessSection"
import StatsSection from "@/components/v3/StatsSection"
import PricingSection from "@/components/v3/PricingSection"
import PortfolioSection from "@/components/v3/PortfolioSection"
import ContactSection from "@/components/v3/ContactSection"
import Footer from "@/components/v3/Footer"

export default function V3Page() {
  return (
    <main style={{ backgroundColor: "#090405", color: "#fff0f2" }}>
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <PricingSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
