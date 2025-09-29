import bcrypt from 'bcryptjs'

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD_HASH = '$2b$10$9JyUAYErM0YkHT36EeHIo.7djQteLjxwykUvUolJ39/HseIEIpRyS' // admin12345

export interface AdminUser {
  email: string
  password: string
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) {
    return false
  }
  
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
}

export function generatePasswordHash(password: string): string {
  return bcrypt.hashSync(password, 10)
}
