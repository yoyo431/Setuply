import { STORAGE_KEYS } from './storage'

// خدمة مصادقة بسيطة للوحة تحكم الأدمن — تعمل بشكل محلي بالكامل (بدون بكند)
// هذه حماية أساسية على مستوى الواجهة فقط، وليست بديلاً عن نظام مصادقة حقيقي (JWT/Sessions من سيرفر)
// عند ربط المنصة ببكند فعلي، يجب استبدال هذه الخدمة بمصادقة حقيقية على السيرفر

const DEFAULT_PASSWORD = 'gearflux-admin-2025'

function getStoredPassword(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.adminPassword) || DEFAULT_PASSWORD
  } catch {
    return DEFAULT_PASSWORD
  }
}

export const authService = {
  isAuthenticated(): boolean {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.adminSession) === 'true'
    } catch {
      return false
    }
  },
  login(password: string): boolean {
    const stored = getStoredPassword()
    if (password === stored) {
      sessionStorage.setItem(STORAGE_KEYS.adminSession, 'true')
      return true
    }
    return false
  },
  logout(): void {
    sessionStorage.removeItem(STORAGE_KEYS.adminSession)
  },
  changePassword(currentPassword: string, newPassword: string): boolean {
    const stored = getStoredPassword()
    if (currentPassword !== stored) return false
    localStorage.setItem(STORAGE_KEYS.adminPassword, newPassword)
    return true
  },
  hasCustomPassword(): boolean {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEYS.adminPassword))
    } catch {
      return false
    }
  },
}
