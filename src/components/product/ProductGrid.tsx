import type { Product, Category } from '@/types'
import { ProductCard } from './ProductCard'
import { EmptyState } from '@/components/ui/EmptyState'

interface ProductGridProps {
  products: Product[]
  categories?: Category[]
  emptyTitle?: string
  emptyDescription?: string
}

export function ProductGrid({ products, categories, emptyTitle, emptyDescription }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || 'مفيش منتجات في القسم ده حاليًا.'}
        description={emptyDescription}
      />
    )
  }

  const categoryName = (categoryId: string) => categories?.find((c) => c.id === categoryId)?.name

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} categoryName={categoryName(product.categoryId)} />
      ))}
    </div>
  )
}
