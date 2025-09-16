"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { useSiteConfig } from "@/lib/store/config"

export function AboutSection() {
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
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-background dark:from-background dark:via-muted/20 dark:to-background" />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Images */}
          <div className={`relative ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden hover-lift">
                  <Image
                    src="/diverse-students-studying-together-in-modern-unive.jpg"
                    alt="Students studying"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden hover-lift">
                  <Image
                    src="/professional-passport-and-visa-documents-on-desk.jpg"
                    alt="Visa documents"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-32 rounded-lg overflow-hidden hover-lift">
                  <Image
                    src="/international-students-celebrating-graduation-cere.jpg"
                    alt="Graduation ceremony"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden hover-lift">
                  <Image
                    src="/modern-immigration-office-with-professional-consul.jpg"
                    alt="Immigration office"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-8"}`}>
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  ABOUT NORTHWAY IMMIGRATION
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                {config?.about.title}
                <br />
                <span className="text-primary">{config?.about.subtitle}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">{config?.about.description}</p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {(config?.about.features ?? []).map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${isVisible ? "animate-scale-in" : "opacity-0 scale-90"}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Successful Cases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
