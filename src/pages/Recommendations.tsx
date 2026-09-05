import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import { recommendationCollections } from '@/data/recommendations'
import { useSEO } from '@/utils/seo'

export function Recommendations() {
  const { products } = useProducts()
  const { categories } = useCategories()

  useSEO({
    title: 'اختياراتنا',
    description: 'مجموعات منتجات منسقة حسب الاستخدام: جيمنج، طلاب، شغل، اقتصادي وPremium.',
    path: '/recommendations',
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'اختياراتنا' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-3">منتجات تستاهل تشوفها</h1>
      <p className="text-text-secondary mb-12 max-w-2xl">مجموعات منسقة حسب استخدامك: جيمنج، دراسة، شغل، ميزانية، أو Premium.</p>

      <div className="space-y-16">
        {recommendationCollections.map((collection) => {
          const items = products.filter((p) => p.recommendedFor.includes(collection.key))
          if (items.length === 0) return null
          return (
            <section key={collection.id}>
              <h2 className="text-2xl font-bold text-text-primary mb-1">{collection.title}</h2>
              <p className="text-text-secondary mb-6">{collection.description}</p>
              <ProductGrid products={items} categories={categories} />
            </section>
          )
        })}
      </div>
    </div>
  )
}
