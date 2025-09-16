"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useSiteConfig } from "@/lib/store/config"

export function VisaServiceSection() {
  const { config } = useSiteConfig()
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-8"}`}>
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  WE ARE READY TO HELP YOU
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Free Online <span className="text-primary">Visa Service</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">{config?.visaService.description}</p>
            </div>

            <Link href="/contact">
              <Button size="lg" className="hover-lift group">
                {config?.visaService.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Right Content - Image */}
          <div className={`relative ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <div className="relative h-96 rounded-lg overflow-hidden hover-lift">
              <Image
                src="/professional-visa-consultation-with-passport-and-w.jpg"
                alt="Visa consultation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
