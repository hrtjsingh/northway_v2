import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">About Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn more about our mission to help students and professionals achieve their immigration dreams.
            </p>
          </div>
        </div>
        <AboutSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
