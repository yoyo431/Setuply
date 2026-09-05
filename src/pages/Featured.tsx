import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import { useSEO } from '@/utils/seo'

export function Featured() {
  const { products } = useProducts()
  const { categories } = useCategories()
  const featured = products.filter((p) => p.featured)

  useSEO({
    title: 'المنتجات المميزة',
    description: 'أبرز المنتجات المختارة على GearFlux.',
    path: '/featured',
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'المنتجات المميزة' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-3">اختياراتنا المميزة</h1>
      <p className="text-text-secondary mb-10 max-w-2xl">منتجات اخترناها بعناية بناءً على مواصفاتها الفعلية وقيمتها للمستخدم.</p>
      <ProductGrid products={featured} categories={categories} />
    </div>
  )
}
