"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Users, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import Link from "next/link"

const iconMap = {
  GraduationCap,
  BookOpen,
  Users,
}

export function ServicesSection() {
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
    <section ref={sectionRef} className="relative py-20 overflow-hidden" id="services-section">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10 dark:from-primary/20 dark:to-secondary/20" />
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center space-y-4 mb-16 relative ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        
          <div className="inline-block">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              CHOOSE YOUR DESTINATION
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            {siteConfig.services.title}
            <br />
            <span className="text-primary">{siteConfig.services.subtitle}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">{siteConfig.services.description}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {siteConfig.services.destinations.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Card
                key={service.title}
                className={`group hover-lift transition-all duration-300 border-0 shadow-lg hover:shadow-xl ${
                  isVisible ? "animate-scale-in" : "opacity-0 scale-90"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{service.description}</p>
                  </div>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent w-full"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
