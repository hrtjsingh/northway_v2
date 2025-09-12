"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function DestinationsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center space-y-4 mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="inline-block">
            <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
              FAVOURITE DESTINATION
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            For The Study<span className="text-primary">Choose Your Country</span>
          </h2>
        </div>

        {/* Countries Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {siteConfig.countries.map((country, index) => (
            <Card
              key={country.name}
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift ${
                isVisible ? "animate-scale-in" : "opacity-0 scale-90"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={country.image || "/placeholder.svg"}
                  alt={country.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{country.flag}</span>
                    <h3 className="text-white font-semibold text-lg">{country.name}</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed text-pretty">{country.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
                >
                  Explore {country.name}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <p className="text-muted-foreground mb-6">
            Would you like to speak to one of our consultant over phone? <strong>Explore All Countries.</strong>
          </p>
          <Button size="lg" className="hover-lift">
            View All Destinations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
