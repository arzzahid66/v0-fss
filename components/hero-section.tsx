"use client"

import { MapPin } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function HeroSection() {
  const images = [
    {
      src: "/images/founder-new.jpg",
      alt: "School Founder",
    },
    {
      src: "/images/principal.jpg",
      alt: "School Principal",
    },
    {
      src: "/images/son.jpg",
      alt: "Student Speaker",
    },
    {
      src: "/images/student-art.jpg",
      alt: "Student Arts & Creativity",
    },
    {
      src: "/images/student-speech.jpg",
      alt: "Student Speech",
    },
    {
      src: "/images/students.jpg",
      alt: "Students",
    },
    {
      src: "/images/leadership-event.jpg",
      alt: "Leadership Event",
    },
    {
      src: "/images/school.jpg",
      alt: "Fatima School & College Campus",
    },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 2000) // Change image every 2 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-white/5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Content */}
          <div className="text-white space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium text-white">66JB Dhandrah, Faisalabad</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">Fatima School & College</h1>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <div className="h-px bg-white/30 flex-1 max-w-16"></div>
                  <span className="text-sm font-medium text-white/70 tracking-widest uppercase">Our Philosophy</span>
                  <div className="h-px bg-white/30 flex-1 max-w-16"></div>
                </div>
                <div className="flex items-center justify-center space-x-6 text-white">
                  <span className="text-2xl lg:text-3xl font-semibold tracking-wide">Play</span>
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <span className="text-2xl lg:text-3xl font-semibold tracking-wide">Laugh</span>
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <span className="text-2xl lg:text-3xl font-semibold tracking-wide">Learn</span>
                </div>
              </div>

              {/* Added Urdu text */}
              <div className="text-center space-y-2">
                <p className="text-lg text-white/90 font-urdu leading-relaxed">
                   نہ کتابوں کا انبار ، نہ بیگ کا بوجھ 
                </p>
                <p
                  className="text-lg text-white/90 font-semibold leading-relaxed"
                >
                  Skill-based education system
                </p>
              </div>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentImageIndex ? "opacity-100 slide-enter" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              ))}

              {/* Image indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating School Logo */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">FSC</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-white/80">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">900+</div>
              <div className="text-sm text-white/80">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-white/80">Faculty Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
