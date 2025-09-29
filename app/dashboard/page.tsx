"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Mail, MessageSquare, Reply, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { supabase, type UserFeedback } from "@/lib/supabase"

interface DashboardState {
  isAuthenticated: boolean
  messages: UserFeedback[]
  filteredMessages: UserFeedback[]
  currentPage: number
  totalPages: number
  searchTerm: string
  dateFilter: string
  loading: boolean
  error: string | null
}

interface ReplyState {
  isOpen: boolean
  selectedMessage: UserFeedback | null
  replyMessage: string
  isSending: boolean
}

export default function Dashboard() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [replyState, setReplyState] = useState<ReplyState>({
    isOpen: false,
    selectedMessage: null,
    replyMessage: "",
    isSending: false
  })

  const [state, setState] = useState<DashboardState>({
    isAuthenticated: false,
    messages: [],
    filteredMessages: [],
    currentPage: 1,
    totalPages: 1,
    searchTerm: "",
    dateFilter: "all",
    loading: false,
    error: null
  })

  const MESSAGES_PER_PAGE = 10

  // Check authentication on component mount
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated') === 'true'
    if (isAuth) {
      setState(prev => ({ ...prev, isAuthenticated: true }))
      fetchMessages()
    }
  }, [])

  // Filter messages when search term or date filter changes
  useEffect(() => {
    filterMessages()
  }, [state.messages, state.searchTerm, state.dateFilter])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })

      if (response.ok) {
        localStorage.setItem('admin_authenticated', 'true')
        setState(prev => ({ ...prev, isAuthenticated: true, loading: false }))
        fetchMessages()
      } else {
        setState(prev => ({ ...prev, error: 'Invalid credentials', loading: false }))
      }
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Login failed', loading: false }))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    setState(prev => ({
      ...prev,
      isAuthenticated: false,
      messages: [],
      filteredMessages: [],
      currentPage: 1,
      totalPages: 1
    }))
  }

  const fetchMessages = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const { data, error } = await supabase
        .from('user_feedback')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setState(prev => ({
        ...prev,
        messages: data || [],
        loading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch messages',
        loading: false
      }))
    }
  }

  const filterMessages = () => {
    let filtered = [...state.messages]

    // Apply search filter
    if (state.searchTerm) {
      filtered = filtered.filter(msg =>
        msg.full_name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    }

    // Apply date filter
    if (state.dateFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()

      switch (state.dateFilter) {
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

    const totalPages = Math.ceil(filtered.length / MESSAGES_PER_PAGE)
    setState(prev => ({
      ...prev,
      filteredMessages: filtered,
      totalPages,
      currentPage: 1
    }))
  }

  const getPaginatedMessages = () => {
    const startIndex = (state.currentPage - 1) * MESSAGES_PER_PAGE
    const endIndex = startIndex + MESSAGES_PER_PAGE
    return state.filteredMessages.slice(startIndex, endIndex)
  }

  const handleReply = (message: UserFeedback) => {
    setReplyState({
      isOpen: true,
      selectedMessage: message,
      replyMessage: "",
      isSending: false
    })
  }

  const sendReply = async () => {
    if (!replyState.selectedMessage) return

    setReplyState(prev => ({ ...prev, isSending: true }))

    try {
      const response = await fetch('/api/send-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: replyState.selectedMessage.email,
          subject: replyState.replyMessage,
          message: replyState.replyMessage,
          originalMessage: replyState.selectedMessage.message,
          originalSubject: replyState.selectedMessage.subject
        })
      })

      if (response.ok) {
        setReplyState({
          isOpen: false,
          selectedMessage: null,
          replyMessage: "",
          isSending: false
        })
        alert('Reply sent successfully!')
      } else {
        alert('Failed to send reply. Please try again.')
      }
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Failed to send reply. Please try again.')
    } finally {
      setReplyState(prev => ({ ...prev, isSending: false }))
    }
  }

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@gmail.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="admin12345"
                  required
                />
              </div>
              {state.error && (
                <div className="text-red-600 text-sm">{state.error}</div>
              )}
              <Button type="submit" className="w-full" disabled={state.loading}>
                {state.loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{state.messages.length}</p>
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
                    {state.messages.filter(msg => {
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
                    {state.messages.filter(msg => {
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
                    {state.messages.filter(msg => {
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

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    value={state.searchTerm}
                    onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={state.dateFilter} onValueChange={(value) => setState(prev => ({ ...prev, dateFilter: value }))}>
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

        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle>User Messages ({state.filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {state.loading ? (
              <div className="text-center py-8">Loading messages...</div>
            ) : getPaginatedMessages().length === 0 ? (
              <div className="text-center py-8 text-gray-500">No messages found</div>
            ) : (
              <div className="space-y-4">
                {getPaginatedMessages().map((message) => (
                  <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{message.full_name}</h3>
                        <p className="text-sm text-gray-600">{message.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(message.created_at!).toLocaleString()}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {message.subject}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 whitespace-pre-wrap">{message.message}</p>
                    <div className="flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReply(message)}
                          >
                            <Reply className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Reply to {message.full_name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Original Message</label>
                              <div className="bg-gray-50 p-3 rounded border">
                                <p className="text-sm text-gray-600 mb-2">
                                  <strong>Subject:</strong> {message.subject}
                                </p>
                                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Your Reply</label>
                              <Textarea
                                value={replyState.replyMessage}
                                onChange={(e) => setReplyState(prev => ({ ...prev, replyMessage: e.target.value }))}
                                placeholder="Type your reply here..."
                                rows={6}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setReplyState(prev => ({ ...prev, isOpen: false, selectedMessage: null, replyMessage: "" }))}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={sendReply}
                                disabled={replyState.isSending || !replyState.replyMessage.trim()}
                              >
                                {replyState.isSending ? 'Sending...' : 'Send Reply'}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {state.totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setState(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                  disabled={state.currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {state.currentPage} of {state.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setState(prev => ({ ...prev, currentPage: Math.min(prev.totalPages, prev.currentPage + 1) }))}
                  disabled={state.currentPage === state.totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
