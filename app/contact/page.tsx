import { Header } from "@/components/header"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12 relative">
          <div className="absolute -inset-2 rounded-lg opacity-50 blur-2xl animate-gradient"></div>
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to start your immigration journey? Get in touch with our expert team.
            </p>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
