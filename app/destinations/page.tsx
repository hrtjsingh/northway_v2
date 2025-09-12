import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DestinationsSection } from "@/components/destinations-section"

export default function DestinationsPage() {
    return (

        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <div className="container mx-auto px-4 py-12 relative">
                    <div className="absolute -inset-2 rounded-lg opacity-50 blur-2xl animate-gradient"></div>
                    <div className="text-center space-y-4 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground">All Destinations</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore our most popular study destinations and find the right path for you.
                        </p>
                    </div>
                </div>
                <DestinationsSection isAllDestinations={true} />
            </main>
            <Footer />
        </div>

    )
}


