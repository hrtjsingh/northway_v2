import { Header } from "@/components/header"
import { DestinationsSection } from "@/components/destinations-section"
import { Footer } from "@/components/footer"

export default function CountriesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Study Destinations</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the best countries for your international education journey.
            </p>
          </div>
        </div>
        <DestinationsSection />
      </main>
      <Footer />
    </div>
  )
}
