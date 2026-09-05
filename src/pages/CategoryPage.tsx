import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import type { Category, Product } from '@/types'
import { categoryService } from '@/services/categoryService'
import { productService } from '@/services/productService'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProductGrid } from '@/components/product/ProductGrid'
import { FilterPanel } from '@/components/common/FilterPanel'
import { SortDropdown } from '@/components/common/SortDropdown'
import { EmptyState } from '@/components/ui/EmptyState'
import { useProductFilters } from '@/hooks/useProductFilters'
import { useSEO } from '@/utils/seo'

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [category, setCategory] = useState<Category | null | undefined>(undefined)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!slug) return
    categoryService.getBySlug(slug).then(async (cat) => {
      setCategory(cat ?? null)
      if (cat) {
        const products = await productService.getByCategory(cat.id)
        setAllProducts(products)
      }
    })
  }, [slug])

  const withSearch = query.trim()
    ? allProducts.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    : allProducts

  const { filtered, filters, setFilters, sort, setSort, allTags, resetFilters } = useProductFilters(withSearch)

  useSEO({
    title: category ? category.name : 'القسم',
    description: category ? category.description : 'تصفح المنتجات المتاحة في هذا القسم على GearFlux.',
    path: `/category/${slug}`,
  })

  if (category === undefined) return null

  if (category === null) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <EmptyState title="القسم غير موجود." description="جرب الرجوع لصفحة الأقسام واختيار قسم آخر." actionLabel="كل الأقسام" actionTo="/categories" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'الأقسام', to: '/categories' }, { label: category.name }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-3">{category.name}</h1>
      <p className="text-text-secondary mb-2 max-w-2xl">{category.description}</p>
      <p className="text-sm text-text-muted mb-8">{allProducts.length} منتج متاح</p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          <div className="relative">
            <SearchIcon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`دور داخل ${category.name}...`}
              className="w-full rounded-lg border border-border-subtle bg-bg-panel py-2.5 pr-9 pl-4 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary-500"
            />
          </div>
          <FilterPanel filters={filters} setFilters={setFilters} allTags={allTags} onReset={resetFilters} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-text-secondary">{filtered.length} نتيجة</span>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
          <ProductGrid products={filtered} emptyDescription="جرب تغيير الفلاتر أو البحث بكلمة مختلفة." />
        </div>
      </div>
    </div>
  )
}
