import { Badge } from "@/components/ui/badge"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* School Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 md:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary-foreground/20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/logo.jpg-CsKqgHso1YfJFzkZ0zvqtJADh7JT52.jpeg"
                  alt="Fatima School Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">Fatima School & College</h3>
                <p className="text-primary-foreground/80 text-xs md:text-sm">Play, Laugh, Learn</p>
              </div>
            </div>

            <p className="text-sm md:text-base text-primary-foreground/90 leading-relaxed max-w-md">
              Committed to nurturing young minds with Unity, Faith, and Discipline. Building tomorrow's leaders through
              quality education and strong moral values.
            </p>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground/70 flex-shrink-0" />
                <span>66JB Dhandrah, Faisalabad, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm">
                <Phone className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground/70 flex-shrink-0" />
                <span>+92 313 8502766</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm">
                <Mail className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground/70 flex-shrink-0" />
                <span className="break-all">fatimaschool66@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#home" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Admissions
                </a>
              </li>
              <li>
                <a href="#" className="text-xs md:text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Academic Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Connect With Us</h4>
            <div className="space-y-3 md:space-y-4">
              <p className="text-primary-foreground/80 text-xs md:text-sm">Follow us on social media for updates and news</p>

              <div className="flex space-x-3 md:space-x-4">
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </div>

              <div className="pt-2 md:pt-4">
                <Badge
                  variant="secondary"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 text-xs"
                >
                  Unity • Faith • Discipline
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 md:py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center md:text-left">
            <p className="text-primary-foreground/70 text-xs md:text-sm">
              © {currentYear} Fatima School & College. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
