import { useMemo, useState } from 'react'
import type { Product } from '@/types'

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'newest'

export interface ProductFilters {
  priceMax: number | null
  tags: string[]
  recommendedFor: string | null
}

const initialFilters: ProductFilters = { priceMax: null, tags: [], recommendedFor: null }

// هوك مشترك للفلترة والترتيب، يُستخدم في صفحة القسم والبحث
export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)
  const [sort, setSort] = useState<SortOption>('recommended')

  const allTags = useMemo(() => Array.from(new Set(products.flatMap((p) => p.tags))), [products])

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.priceMax) {
      result = result.filter((p) => p.price <= filters.priceMax!)
    }
    if (filters.tags.length > 0) {
      result = result.filter((p) => filters.tags.some((t) => p.tags.includes(t)))
    }
    if (filters.recommendedFor) {
      result = result.filter((p) => p.recommendedFor.includes(filters.recommendedFor as Product['recommendedFor'][number]))
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return result
  }, [products, filters, sort])

  const resetFilters = () => setFilters(initialFilters)

  return { filtered, filters, setFilters, sort, setSort, allTags, resetFilters }
}
