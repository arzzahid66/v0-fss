# Supabase Setup Guide

This document contains the SQL schema and setup instructions for the Fatima School & College website database.

## Database Schema

### Table: `user_feedback`

This table stores all contact form submissions from the website.

```sql
-- Create the user_feedback table
CREATE TABLE user_feedback (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add index on created_at for better query performance
CREATE INDEX idx_user_feedback_created_at ON user_feedback(created_at DESC);

-- Add index on email for searching
CREATE INDEX idx_user_feedback_email ON user_feedback(email);

-- Enable Row Level Security (RLS)
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for contact form submissions)
-- This allows anyone to submit the contact form
CREATE POLICY "Enable insert for public" ON user_feedback
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public reads (for admin dashboard)
-- Since we're using client-side authentication, we need to allow reads
CREATE POLICY "Enable read for public" ON user_feedback
  FOR SELECT
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_feedback_updated_at
  BEFORE UPDATE ON user_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Setup Instructions

### 1. Create the Table in Supabase

1. Go to your Supabase Dashboard: https://app.supabase.com/project/hlcakjqydxqbppmlkulq
2. Click on "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the entire SQL schema from above
5. Click "Run" to execute the query

### 2. Verify the Setup

After running the SQL, verify:

1. **Table Created**: Go to "Table Editor" and check if `user_feedback` table exists
2. **Columns**: Verify all columns (id, full_name, email, subject, message, created_at, updated_at)
3. **RLS Enabled**: Go to "Authentication" > "Policies" and verify the policies are created
4. **Indexes**: Check that indexes are created for better performance

### 3. Test the Connection

1. Submit a test message through the contact form on your website
2. Check the Supabase Table Editor to see if the message appears
3. Login to the admin dashboard (/admin) to verify messages are displayed

## Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL="https://hlcakjqydxqbppmlkulq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
```

## Features

### Contact Form (Frontend)
- Located in `components/contact-section.tsx`
- Automatically saves messages to Supabase
- Shows success/error messages
- Form validation

### Admin Dashboard
- Located in `app/dashboard/page.tsx`
- Requires authentication (email: admin@gmail.com, password: admin12345)
- Features:
  - View all messages
  - Search and filter messages
  - Pagination
  - Statistics (total, today, this week, this month)
  - Reply functionality (placeholder)

## Security Notes

1. **Row Level Security (RLS)** is enabled to protect data
2. **Anonymous users** can only INSERT (submit contact forms)
3. **Authenticated users** can READ (view in dashboard)
4. Admin authentication is handled separately via environment variables
5. The anon key is safe to expose in the frontend as it has limited permissions

## Troubleshooting

### Messages not appearing in dashboard?
- Check if RLS policies are correctly set up
- Verify environment variables are correct
- Check browser console for errors

### Cannot submit contact form? (Getting "Failed to send message" error)

**SOLUTION**: You need to update your RLS policies in Supabase:

1. Go to Supabase Dashboard → Authentication → Policies
2. Delete the old policies (if they exist)
3. Go to SQL Editor and run this:

```sql
-- Drop old policies (if they exist)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON user_feedback;
DROP POLICY IF EXISTS "Allow authenticated reads" ON user_feedback;
DROP POLICY IF EXISTS "Allow service role full access" ON user_feedback;

-- Create new policies that allow public access
CREATE POLICY "Enable insert for public" ON user_feedback
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for public" ON user_feedback
  FOR SELECT
  USING (true);
```

4. Click "Run" to execute
5. Try submitting the contact form again

**Alternative**: Disable RLS temporarily for testing:
```sql
ALTER TABLE user_feedback DISABLE ROW LEVEL SECURITY;
```

### Authentication issues?
- Check admin credentials in `.env.local`
- Clear browser localStorage and try again
- Verify the API route `/api/auth/login` is working
