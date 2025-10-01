// Get admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin12345'

export interface AdminUser {
  email: string
  password: string
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  // Simple string comparison for hardcoded credentials
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
}
