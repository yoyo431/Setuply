import { useCallback, useEffect, useState } from 'react'
import type { Category } from '@/types'
import { categoryService } from '@/services/categoryService'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const data = await categoryService.getAll()
    setCategories(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { categories, loading, refresh }
}
