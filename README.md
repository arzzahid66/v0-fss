# Fatima School & College Website

A modern, responsive website for Fatima School & College built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- 🖼️ Gallery management system
- 📧 Contact form with Supabase integration
- 🔐 Secure admin dashboard
- 🌐 Multi-language support (English & Urdu)
- ⚡ Fast performance with Next.js optimizations

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **UI Components:** shadcn/ui
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account
- A Resend account (optional, for email functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fss-website.git
cd fss-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials:
```env
RESEND_API_KEY="your_resend_api_key"
ADMIN_EMAIL="admin@gmail.com"
ADMIN_PASSWORD="your_secure_password"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

5. Set up your Supabase database:

Create a table named `user_feedback` with the following structure:
```sql
CREATE TABLE user_feedback (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable insert for public" ON user_feedback
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for public" ON user_feedback
  FOR SELECT
  USING (true);
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin login page
│   ├── dashboard/         # Admin dashboard
│   ├── api/               # API routes
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── navigation.tsx    # Navigation component
│   ├── contact-section.tsx # Contact form
│   ├── footer.tsx        # Footer component
│   └── ...
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── auth.ts           # Authentication logic
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   └── images/          # Image files
└── .env.local           # Environment variables (not in git)
```

## Admin Dashboard

Access the admin dashboard at `/admin` using the credentials set in your `.env.local` file.

**Features:**
- Gallery Management (Add, Edit, Delete images)
- View user messages from contact form
- Search and filter messages
- Statistics dashboard

## Deployment on Vercel

### Quick Deploy

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/fss-website.git
git push -u origin main
```

2. Go to [Vercel](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Configure your environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`:
     - `RESEND_API_KEY`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | API key for Resend email service | Optional |
| `ADMIN_EMAIL` | Admin login email | Yes |
| `ADMIN_PASSWORD` | Admin login password | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Gallery Management

To add images to the gallery:

1. Place your images in the `public/images/` folder
2. Login to the admin dashboard at `/admin`
3. Go to the "Gallery Management" tab
4. Click "Add New Image"
5. Enter the image path (e.g., `/images/your-image.jpg`)
6. Fill in title, category, and description
7. Click "Add Item"

## Contact Form

The contact form automatically saves submissions to your Supabase database. View all messages in the admin dashboard under "User Messages".

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary to Fatima School & College.

## Support

For support, email fatimaschool66@gmail.com or call +92 313 8502766.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database powered by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)
