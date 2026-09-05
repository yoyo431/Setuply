import { motion } from 'framer-motion'
import { CategoryCard } from '@/components/category/CategoryCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { useCategories } from '@/hooks/useCategories'
import { useProducts } from '@/hooks/useProducts'
import { useSEO } from '@/utils/seo'

export function Categories() {
  useSEO({
    title: 'الأقسام',
    description: 'تصفح كل أقسام إكسسوارات الكمبيوتر واللاب توب والجيمنج على GearFlux.',
    path: '/categories',
  })

  const { categories } = useCategories()
  const { products } = useProducts()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'الأقسام' }]} />
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-3">
        كل الأقسام
      </motion.h1>
      <p className="text-text-secondary mb-10 max-w-2xl">اختار القسم المناسب لاحتياجك وشوف أفضل المنتجات المتاحة فيه.</p>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} productCount={products.filter((p) => p.categoryId === category.id).length} />
        ))}
      </div>
    </div>
  )
}
