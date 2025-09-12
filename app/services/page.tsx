import { Header } from "@/components/header"
import { ServicesSection } from "@/components/services-section"
import { VisaServiceSection } from "@/components/visa-service-section"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive immigration and visa services to help you achieve your goals.
            </p>
          </div>
        </div>
        <ServicesSection />
        <VisaServiceSection />
      </main>
      <Footer />
    </div>
  )
}
