import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Product } from '@/types'
import { productService } from '@/services/productService'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { useCategories } from '@/hooks/useCategories'
import { useSEO } from '@/utils/seo'

export function Search() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const [results, setResults] = useState<Product[]>([])
  const { categories } = useCategories()

  useEffect(() => {
    productService.search(query).then(setResults)
  }, [query])

  useSEO({
    title: `نتائج البحث عن ${query}`,
    description: `نتائج البحث عن "${query}" على GearFlux.`,
    path: '/search',
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'نتائج البحث' }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-4 mb-2">نتائج البحث عن: {query}</h1>
      <p className="text-text-secondary mb-8">{results.length} نتيجة</p>

      <ProductGrid
        products={results}
        categories={categories}
        emptyTitle="ملقيناش منتجات مطابقة لبحثك."
        emptyDescription="جرب كلمة بحث مختلفة أو تصفح الأقسام."
      />
    </div>
  )
}
