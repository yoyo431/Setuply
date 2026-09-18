import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { WhyUs } from '@/components/home/WhyUs'
import { CategoryCard } from '@/components/category/CategoryCard'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useCategories } from '@/hooks/useCategories'
import { useProducts } from '@/hooks/useProducts'
import { useSEO } from '@/utils/seo'

export function Home() {
  useSEO({
    title: 'الرئيسية',
    description: 'Setuply — منصة مصرية لاكتشاف أفضل إكسسوارات الكمبيوتر واللاب توب وإكسسوارات الجيمنج مع مقارنات وتوصيات مدروسة.',
    path: '/',
  })

  const { categories } = useCategories()
  const { products } = useProducts()

  const featured = products.filter((p) => p.featured).slice(0, 8)
  const gamingPicks = products.filter((p) => p.recommendedFor.includes('gaming')).slice(0, 4)

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-text-primary">استكشف الأقسام</h2>
          <Link to="/categories" className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300">
            كل الأقسام
            <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.slice(0, 10).map((category) => (
            <CategoryCard key={category.id} category={category} productCount={products.filter((p) => p.categoryId === category.id).length} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-text-primary">اختياراتنا المميزة</h2>
          <Link to="/featured" className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300">
            شوف الكل
            <ArrowLeft size={14} />
          </Link>
        </div>
        <ProductGrid products={featured} categories={categories} />
      </section>

      {gamingPicks.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-text-primary">الأفضل للجيمنج</h2>
            <Link to="/recommendations" className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300">
              شوف كل التوصيات
              <ArrowLeft size={14} />
            </Link>
          </div>
          <ProductGrid products={gamingPicks} categories={categories} />
        </section>
      )}

      <WhyUs />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 via-navy to-bg-panel border border-border-subtle p-10 sm:p-16 text-center"
        >
          <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary-600/20 blur-3xl" />
          <h2 className="text-3xl font-bold text-text-primary mb-4 relative">جاهز تلاقي المنتج المناسب؟</h2>
          <p className="text-text-secondary mb-8 relative max-w-lg mx-auto">
            تصفح التصنيفات أو استخدم البحث عشان توصل لأفضل إكسسوار يناسب احتياجك وميزانيتك.
          </p>
          <Link
            to="/categories"
            className="relative inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-medium text-white hover:bg-primary-500 hover:shadow-glow transition-all"
          >
            ابدأ الاستكشاف
            <ArrowLeft size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
