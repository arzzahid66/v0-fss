"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Height of the fixed header
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
              <Image src="/images/logo.png" alt="Fatima School Logo" fill className="object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Fatima School & College</h1>
              <p className="text-xs text-white/80">Play, Laugh, Learn</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Contact
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-white/80"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass-effect border-t border-border/20">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-white hover:text-white/80 transition-colors font-medium py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-white hover:text-white/80 transition-colors font-medium py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="block w-full text-left text-white hover:text-white/80 transition-colors font-medium py-2"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-white hover:text-white/80 transition-colors font-medium py-2"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
