"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { supabase, type UserFeedback } from "@/lib/supabase"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Prepare data for Supabase
      const feedbackData: Omit<UserFeedback, 'id' | 'created_at' | 'updated_at'> = {
        full_name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }

      // Insert data into Supabase
      const { data, error: insertError } = await supabase
        .from('user_feedback')
        .insert([feedbackData])
        .select()

      if (insertError) {
        throw insertError
      }

      // Reset form and show success message
      setFormData({ name: "", email: "", subject: "", message: "" })
      setShowSuccess(true)
      setIsSubmitting(false)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (err) {
      console.error('Error submitting feedback:', err)
      console.error('Error details:', JSON.stringify(err, null, 2))
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <Badge variant="secondary" className="mb-4">
            Get in Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">Connect With Us</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions about admissions, programs, or want to visit our campus? We're here to help and would love to
            hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 md:mb-6">Visit Our Campus</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                We welcome visitors to experience our vibrant learning environment. Schedule a tour to see our
                facilities and meet our dedicated faculty.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">Address</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      66JB Dhandrah
                      <br />
                      Faisalabad, Punjab
                      <br />
                      Pakistan
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">Phone</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">+92 313 8502766</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">Email</h4>
                    <p className="text-xs md:text-sm text-muted-foreground break-all">fatimaschool66@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">Office Hours</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Monday - Saturday : 7:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-6 md:p-8 shadow-lg">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">Send us a Message</CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              {showSuccess && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 md:space-x-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-green-800 font-medium">
                    Your message has been sent successfully! We will get back to you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs md:text-sm text-red-800 font-medium">Error: {error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs md:text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs md:text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full text-sm md:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs md:text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full text-sm md:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="w-full resize-none text-sm md:text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 md:py-3 text-sm md:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
