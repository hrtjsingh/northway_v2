"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useSiteConfig } from "@/lib/store/config"
import Image from "next/image"

const iconMap = {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
}

export function Footer() {
  const { config } = useSiteConfig()
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2 hover-lift">
              <Image
                src={config?.longLogo || "/long_logo.svg"}
                alt={config?.name || "Northway"}
                height={60}
                width={400}
                className="object-cover"
              />
            </Link>
            {/* <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <span className="font-bold text-lg">AO</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground">{siteConfig.name}</span>
                <span className="text-sm text-muted-foreground">Immigration & Visa</span>
              </div>
            </div> */}
            <p className="text-muted-foreground text-sm leading-relaxed">{config?.footer.description}</p>
            <div className="flex space-x-4">
              {(config?.footer.social ?? []).map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap]
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 hover-lift"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {(config?.footer.quickLinks ?? []).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Our Services</h3>
            <ul className="space-y-2">
              {(config?.footer.services ?? []).map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-muted-foreground text-sm leading-relaxed">{config?.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">{config?.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">{config?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {config?.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
