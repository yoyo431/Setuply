import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useCategories } from '@/hooks/useCategories'
import { useProducts } from '@/hooks/useProducts'
import { categoryService } from '@/services/categoryService'
import { getIcon } from '@/utils/icons'

export function AdminCategories() {
  const { categories, refresh } = useCategories()
  const { products } = useProducts()
  const [busyId, setBusyId] = useState<string | null>(null)

  const productCount = (categoryId: string) => products.filter((p) => p.categoryId === categoryId).length

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`متأكد إنك عايز تحذف تصنيف "${name}"؟`)) {
      await categoryService.remove(id)
      refresh()
    }
  }

  const toggleActive = async (id: string, active: boolean) => {
    setBusyId(id)
    await categoryService.update(id, { active: !active })
    await refresh()
    setBusyId(null)
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">التصنيفات</h1>
          <p className="text-text-secondary text-sm">{categories.length} تصنيف</p>
        </div>
        <Link
          to="/admin/categories/new"
          className="flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
        >
          <Plus size={16} />
          إضافة تصنيف
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = getIcon(category.icon)
          return (
            <div key={category.id} className="rounded-2xl border border-border-subtle bg-bg-panel p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
                  <Icon size={18} />
                </span>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/categories/${category.id}/edit`} aria-label="تعديل" className="text-primary-400 hover:text-primary-300">
                    <Pencil size={16} />
                  </Link>
                  <button type="button" onClick={() => handleDelete(category.id, category.name)} aria-label="حذف" className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{category.name}</h3>
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{productCount(category.id)} منتج</span>
                <button
                  type="button"
                  disabled={busyId === category.id}
                  onClick={() => toggleActive(category.id, category.active)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    category.active ? 'bg-electric/15 text-electric' : 'bg-white/5 text-text-muted'
                  }`}
                >
                  {category.active ? 'مفعّل' : 'معطّل'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
