import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wojgaxgoqbbxmkzodwwo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvamdheGdvcWJieG1rem9kd3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMzgxODAsImV4cCI6MjA3NDYxNDE4MH0.WNwjJNNq8UbH9t1SFLQNGz5ZoOuhwu94FfPlJ_RXs4I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for the user_feedback table
export interface UserFeedback {
  id?: number
  full_name: string
  email: string
  subject: string
  message: string
  created_at?: string
  updated_at?: string
}
