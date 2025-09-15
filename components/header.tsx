"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/lib/site-config"

import Logo from "./Logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{siteConfig.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{siteConfig.hours}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="font-medium">{siteConfig.phone}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-background"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/contact">
                <Button className="hover-lift">Get Consultation</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover-lift">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background animate-slide-up">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/contact">
                  <Button className="mt-4 w-full hover-lift">Get Consultation</Button>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
