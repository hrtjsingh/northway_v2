"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function TestimonialsSection() {
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
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center space-y-4 mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="inline-block">
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
              TESTIMONIAL
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Satisfied <span className="text-primary">Customers</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {siteConfig.testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`group hover-lift transition-all duration-300 border-0 shadow-lg hover:shadow-xl ${
                isVisible ? "animate-scale-in" : "opacity-0 scale-90"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 space-y-6">
                {/* Quote Icon */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-muted-foreground text-center leading-relaxed text-pretty">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Universities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-muted-foreground">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
