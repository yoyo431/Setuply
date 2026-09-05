import { useCallback, useEffect, useState } from 'react'
import type { Product } from '@/types'
import { productService } from '@/services/productService'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const data = await productService.getAll()
    setProducts(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { products, loading, refresh }
}
