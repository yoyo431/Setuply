// طبقة تخزين عامة تستخدم localStorage الآن، وقابلة للاستبدال بـ API حقيقي لاحقًا
// كل الدوال async حتى تبقى الواجهة (interface) متوافقة مع استدعاءات REST/Supabase مستقبلًا

function readAll<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback))
      return fallback
    }
    return JSON.parse(raw) as T[]
  } catch {
    return fallback
  }
}

function writeAll<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items))
}

export const storage = {
  getAll<T>(key: string, fallback: T[]): Promise<T[]> {
    return Promise.resolve(readAll(key, fallback))
  },
  setAll<T>(key: string, items: T[]): Promise<void> {
    writeAll(key, items)
    return Promise.resolve()
  },
  getOne<T extends { id: string }>(key: string, fallback: T[], id: string): Promise<T | undefined> {
    const items = readAll(key, fallback)
    return Promise.resolve(items.find((item) => item.id === id))
  },
  async insert<T extends { id: string }>(key: string, fallback: T[], item: T): Promise<T> {
    const items = readAll(key, fallback)
    items.push(item)
    writeAll(key, items)
    return item
  },
  async update<T extends { id: string }>(key: string, fallback: T[], id: string, patch: Partial<T>): Promise<T | undefined> {
    const items = readAll(key, fallback)
    const index = items.findIndex((item) => item.id === id)
    if (index === -1) return undefined
    items[index] = { ...items[index], ...patch }
    writeAll(key, items)
    return items[index]
  },
  async remove<T extends { id: string }>(key: string, fallback: T[], id: string): Promise<void> {
    const items = readAll(key, fallback).filter((item) => item.id !== id)
    writeAll(key, items)
  },
  getObject<T>(key: string, fallback: T): Promise<T> {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) {
        localStorage.setItem(key, JSON.stringify(fallback))
        return Promise.resolve(fallback)
      }
      return Promise.resolve(JSON.parse(raw) as T)
    } catch {
      return Promise.resolve(fallback)
    }
  },
  setObject<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value))
    return Promise.resolve()
  },
}

export const STORAGE_KEYS = {
  products: 'gearflux_products',
  categories: 'gearflux_categories',
  settings: 'gearflux_settings',
  adminPassword: 'gearflux_admin_password',
  adminSession: 'gearflux_admin_session',
} as const
