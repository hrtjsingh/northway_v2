"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, FileText, MessageCircle } from "lucide-react"
import { useSiteConfig } from "@/lib/store/config"
import Link from "next/link"

const iconMap = {
  Users,
  FileText,
  MessageCircle,
}

export function HeroSection() {
  const { config } = useSiteConfig()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleDiscoverMore = () => {
    // Smooth scroll to services section
    const servicesSection = document.getElementById("services-section")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${config?.hero.bg ?? ""}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/95 dark:from-background/90 dark:via-background/70 dark:to-background/90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  {(config?.name ?? "").toUpperCase()} IMMIGRATION CONSULTANTS
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                {config?.hero.title}
                <br />
                <span className="text-primary">{config?.hero.subtitle}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
                {config?.hero.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="hover-lift group" onClick={handleDiscoverMore}>
                {config?.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="dark:hover:text-black dark:hover:bg-primary hover-lift bg-transparent w-full sm:w-auto">
                  Contact Us Today
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-sm">
                <p className="text-muted-foreground">Don't Hesitate, Contact us for Better Help and Services.</p>
                <p className="font-semibold text-foreground">Explore All Categories.</p>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className={`space-y-6 ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-8"}`}>
            {(config?.hero.stats ?? []).map((stat, index) => (
              <Card
                key={stat.number}
                className={`hover-lift transition-all duration-300 ${
                  isVisible ? "animate-scale-in" : "opacity-0 scale-90"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {stat.number}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-foreground">{stat.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{stat.description}</p>
                      <Link href="/services">
                        <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
