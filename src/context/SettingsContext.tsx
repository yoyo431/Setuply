import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { SiteSettings } from '@/types'
import { defaultSettings } from '@/data/settings'
import { settingsService } from '@/services/settingsService'

interface SettingsContextValue {
  settings: SiteSettings
  loading: boolean
  refresh: () => Promise<void>
  update: (patch: Partial<SiteSettings>) => Promise<void>
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  loading: true,
  refresh: async () => {},
  update: async () => {},
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    const data = await settingsService.get()
    setSettings(data)
    setLoading(false)
  }

  const update = async (patch: Partial<SiteSettings>) => {
    const data = await settingsService.update(patch)
    setSettings(data)
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh, update }}>{children}</SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
