import { Link } from 'react-router-dom'
import { Package, FolderTree, Star, Clock, Info } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import { formatPrice } from '@/utils/format'

export function AdminDashboard() {
  const { products } = useProducts()
  const { categories } = useCategories()

  const featuredCount = products.filter((p) => p.featured).length
  const recent = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)

  const stats = [
    { label: 'إجمالي المنتجات', value: products.length, icon: Package, to: '/admin/products' },
    { label: 'إجمالي التصنيفات', value: categories.length, icon: FolderTree, to: '/admin/categories' },
    { label: 'المنتجات المميزة', value: featuredCount, icon: Star, to: '/admin/products' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-1">نظرة عامة</h1>
      <p className="text-text-secondary mb-8">ملخص سريع عن محتوى المنصة.</p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="rounded-2xl border border-border-subtle bg-bg-panel p-5 hover:border-primary-600/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
                <stat.icon size={18} />
              </span>
              <span className="text-3xl font-bold text-text-primary">{stat.value}</span>
            </div>
            <p className="text-sm text-text-secondary">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mb-8 flex items-start gap-2 rounded-xl border border-electric/20 bg-electric/5 p-4 text-sm text-text-secondary">
        <Info size={16} className="mt-0.5 shrink-0 text-electric" />
        بيانات الأداء والنقرات (Analytics) غير متاحة في هذه النسخة التجريبية. هذه لوحة تحكم تعتمد على البيانات المحلية
        (localStorage) فقط.
      </div>

      <div className="rounded-2xl border border-border-subtle bg-bg-panel p-5">
        <h2 className="flex items-center gap-2 font-semibold text-text-primary mb-4">
          <Clock size={16} />
          أحدث المنتجات المضافة
        </h2>
        <div className="space-y-3">
          {recent.map((product) => (
            <Link
              key={product.id}
              to={`/admin/products/${product.id}/edit`}
              className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5 transition-colors"
            >
              <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{product.name}</p>
                <p className="text-xs text-text-muted">{formatPrice(product.price, product.currency)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
