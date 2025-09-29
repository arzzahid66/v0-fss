"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import { galleryItems as initialGalleryItems, categories, type GalleryItem } from "@/lib/gallery-data"

export default function AdminPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imagePath: ""
  })

  const handleImagePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, imagePath: e.target.value }))
    setPreviewImage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.category || !formData.imagePath) {
      alert('Please fill in all required fields')
      return
    }

    const newItem: GalleryItem = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      src: formData.imagePath
    }

    if (editingItem) {
      setGalleryItems(prev => 
        prev.map(item => item.id === editingItem.id ? newItem : item)
      )
      setEditingItem(null)
    } else {
      setGalleryItems(prev => [newItem, ...prev])
    }

    // Reset form
    setFormData({ title: "", description: "", category: "", imagePath: "" })
    setPreviewImage(null)
    setShowAddForm(false)
    
    alert('Gallery item added! Note: Make sure the image exists at the specified path.')
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      imagePath: item.src
    })
    setPreviewImage(item.src)
    setShowAddForm(true)
  }

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    setGalleryItems(prev => prev.filter(item => item.id !== id))
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "", imagePath: "" })
    setPreviewImage(null)
    setEditingItem(null)
    setShowAddForm(false)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gallery Admin</h1>
          <p className="text-muted-foreground">Manage gallery images and categories</p>
        </div>

        {/* Instructions */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-2">How to add images:</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Place your image in the <code className="bg-blue-100 px-1 rounded">public/images/</code> folder</li>
              <li>Enter the image path (e.g., <code className="bg-blue-100 px-1 rounded">/images/your-image.jpg</code>)</li>
              <li>Fill in the title, category, and description</li>
              <li>Click "Add Item" to save</li>
            </ol>
          </CardContent>
        </Card>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image Path Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Image Path *</label>
                    <Input
                      value={formData.imagePath}
                      onChange={handleImagePathChange}
                      placeholder="/images/your-image.jpg"
                      required
                    />
                    {previewImage && (
                      <div className="mt-4">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          width={200}
                          height={150}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter image title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter image description"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingItem ? 'Update' : 'Add'} Item
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Add Button */}
        {!showAddForm && (
          <div className="mb-6">
            <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Image</span>
            </Button>
          </div>
        )}

        {/* Gallery Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="group">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No gallery items found. Add your first image!</p>
          </div>
        )}
      </div>
    </div>
  )
}