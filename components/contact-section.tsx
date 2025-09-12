"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log("Form submitted with data:", formData)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    })
    setIsSubmitting(false)
    alert("Thank you! Your message has been sent successfully.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center space-y-4 mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="inline-block">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">CONTACT US</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{siteConfig.contact.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">{siteConfig.contact.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Phone */}
            <Card
              className={`hover-lift transition-all duration-300 ${isVisible ? "animate-scale-in" : "opacity-0 scale-90"}`}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">Free Any Time</p>
                  <p className="font-medium text-primary">{siteConfig.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card
              className={`hover-lift transition-all duration-300 ${isVisible ? "animate-scale-in" : "opacity-0 scale-90"}`}
              style={{ animationDelay: "100ms" }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">24/7 Support</p>
                  <p className="font-medium text-secondary">{siteConfig.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card
              className={`hover-lift transition-all duration-300 ${isVisible ? "animate-scale-in" : "opacity-0 scale-90"}`}
              style={{ animationDelay: "200ms" }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Visit Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">Office Location</p>
                  <p className="font-medium text-primary text-sm">{siteConfig.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card
              className={`hover-lift transition-all duration-300 ${isVisible ? "animate-scale-in" : "opacity-0 scale-90"}`}
              style={{ animationDelay: "300ms" }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                  <p className="text-muted-foreground text-sm mb-2">Working Time</p>
                  <p className="font-medium text-secondary">{siteConfig.hours}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className={`shadow-xl ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-8"}`}>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{siteConfig.contact.form.name}</label>
                      <Input
                        placeholder="Enter your full name"
                        className="hover-lift"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{siteConfig.contact.form.email}</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="hover-lift"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{siteConfig.contact.form.phone}</label>
                      <Input
                        placeholder="Enter your phone number"
                        className="hover-lift"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{siteConfig.contact.form.service}</label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="hover-lift">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {siteConfig.contact.services.map((service) => (
                            <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, "-")}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{siteConfig.contact.form.message}</label>
                    <Textarea
                      placeholder="Tell us about your immigration goals..."
                      rows={5}
                      className="hover-lift resize-none"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full hover-lift group" disabled={isSubmitting}>
                    <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    {isSubmitting ? "Sending..." : siteConfig.contact.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
