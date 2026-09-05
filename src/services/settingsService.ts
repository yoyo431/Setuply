import type { SiteSettings } from '@/types'
import { defaultSettings } from '@/data/settings'
import { storage, STORAGE_KEYS } from './storage'

const KEY = STORAGE_KEYS.settings

export const settingsService = {
  get(): Promise<SiteSettings> {
    return storage.getObject<SiteSettings>(KEY, defaultSettings)
  },
  async update(patch: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.get()
    const next = { ...current, ...patch }
    await storage.setObject<SiteSettings>(KEY, next)
    return next
  },
}
