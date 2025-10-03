"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar, Clock, Mail, MessageSquare, Reply, Search, Filter,
  ChevronLeft, ChevronRight, Upload, Plus, Edit, Trash2, X, LogOut, Image as ImageIcon
} from "lucide-react"
import Image from "next/image"
import { supabase, type UserFeedback } from "@/lib/supabase"
import { galleryItems as initialGalleryItems, categories, type GalleryItem } from "@/lib/gallery-data"

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Gallery state
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

  // Messages state
  const [messages, setMessages] = useState<UserFeedback[]>([])
  const [filteredMessages, setFilteredMessages] = useState<UserFeedback[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [messagesLoading, setMessagesLoading] = useState(false)

  const MESSAGES_PER_PAGE = 10

  // Check authentication on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuthenticated') === 'true'
    if (!isAuth) {
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
      fetchMessages()
    }
    setIsLoading(false)
  }, [router])

  // Filter messages
  useEffect(() => {
    filterMessages()
  }, [messages, searchTerm, dateFilter])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    router.push('/admin')
  }

  // Gallery functions
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
        prev.map(item => item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item)
      )
      setEditingItem(null)
    } else {
      setGalleryItems(prev => [newItem, ...prev])
    }

    setFormData({ title: "", description: "", category: "", imagePath: "" })
    setPreviewImage(null)
    setShowAddForm(false)
    alert('Gallery item saved successfully!')
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

  // Messages functions
  const fetchMessages = async () => {
    setMessagesLoading(true)

    try {
      const { data, error } = await supabase
        .from('user_feedback')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setMessagesLoading(false)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      console.log('Attempting to delete message with ID:', messageId)

      const { data, error } = await supabase
        .from('user_feedback')
        .delete()
        .eq('id', messageId)
        .select()

      if (error) {
        console.error('Supabase delete error:', error)
        throw error
      }

      console.log('Delete response:', data)

      // Update local state
      setMessages(prev => prev.filter(msg => msg.id !== messageId))
      alert('Message deleted successfully from database!')
    } catch (error) {
      console.error('Failed to delete message:', error)
      alert(`Failed to delete message: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const filterMessages = () => {
    let filtered = [...messages]

    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (dateFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()

      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
      }

      filtered = filtered.filter(msg => new Date(msg.created_at!) >= filterDate)
    }

    setFilteredMessages(filtered)
    setCurrentPage(1)
  }

  const getPaginatedMessages = () => {
    const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE
    const endIndex = startIndex + MESSAGES_PER_PAGE
    return filteredMessages.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredMessages.length / MESSAGES_PER_PAGE)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="gallery">
              <ImageIcon className="h-4 w-4 mr-2" />
              Gallery Management
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              User Messages
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
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

            {showAddForm && (
              <Card>
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

            {!showAddForm && (
              <div className="mb-6">
                <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add New Image</span>
                </Button>
              </div>
            )}

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
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Today</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {messages.filter(msg => {
                          const today = new Date()
                          const msgDate = new Date(msg.created_at!)
                          return msgDate.toDateString() === today.toDateString()
                        }).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Mail className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {messages.filter(msg => {
                          const weekAgo = new Date()
                          weekAgo.setDate(weekAgo.getDate() - 7)
                          return new Date(msg.created_at!) >= weekAgo
                        }).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {messages.filter(msg => {
                          const monthAgo = new Date()
                          monthAgo.setMonth(monthAgo.getMonth() - 1)
                          return new Date(msg.created_at!) >= monthAgo
                        }).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-48">
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Messages ({filteredMessages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="text-center py-8">Loading messages...</div>
                ) : getPaginatedMessages().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No messages found</div>
                ) : (
                  <div className="space-y-4">
                    {getPaginatedMessages().map((message) => (
                      <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{message.full_name}</h3>
                            <p className="text-sm text-gray-600">{message.email}</p>
                            <Badge variant="secondary" className="mt-2">
                              Subject: {message.subject}
                            </Badge>
                          </div>
                          <div className="text-right flex flex-col items-end space-y-2">
                            <p className="text-sm text-gray-500">
                              {new Date(message.created_at!).toLocaleString()}
                            </p>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteMessage(message.id)}
                              className="flex items-center space-x-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete</span>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium text-gray-500 mb-1">Message:</p>
                          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-6 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
