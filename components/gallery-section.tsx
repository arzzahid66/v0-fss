"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { galleryItems, type GalleryItem } from "@/lib/gallery-data"

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(galleryItems.map(item => item.category)))]

  // Filter items based on selected category
  const filteredItems = selectedCategory === "All" 
    ? [
        // Show one representative from each category when "All" is selected
        galleryItems.find(item => item.category === "Art and Creativity"),
        galleryItems.find(item => item.category === "Public Speaking"),
        galleryItems.find(item => item.category === "Leadership Events"),
        galleryItems.find(item => item.category === "Student Results"),
      ].filter(Boolean) as GalleryItem[]
    : galleryItems.filter(item => item.category === selectedCategory)

  const openModal = (item: GalleryItem, index: number) => {
    setSelectedImage(item)
    setCurrentIndex(index)
    // When opening modal, filter to show only items from the same category
    setSelectedCategory(item.category)
  }

  const closeModal = () => {
    setSelectedImage(null)
    // Reset to "All" when closing modal
    setSelectedCategory("All")
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setSelectedImage(filteredItems[nextIndex])
    setCurrentIndex(nextIndex)
  }

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedImage(filteredItems[prevIndex])
    setCurrentIndex(prevIndex)
  }

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Student Life
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Moments of Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the vibrant life at our institution through these captured moments of learning, growth, and
            achievement.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No images found in this category.</p>
          </div>
        )}

        {/* Gallery Grid */}
        {filteredItems.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => openModal(item, index)}
            >
              <CardContent className="p-0">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30">
                      {item.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/90 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={prevImage}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={nextImage}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Image */}
              <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="mt-6 text-center text-white">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {selectedImage.category}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory("All")}
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  >
                    View All Categories
                  </Button>
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-white/80 max-w-2xl mx-auto">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
