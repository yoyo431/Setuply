import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import { productService } from '@/services/productService'
import { formatPrice } from '@/utils/format'

export function AdminProducts() {
  const { products, refresh } = useProducts()
  const { categories } = useCategories()
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filtered = products.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase())
    const matchesCategory = !categoryFilter || p.categoryId === categoryFilter
    return matchesQuery && matchesCategory
  })

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name || '—'

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`متأكد إنك عايز تحذف "${name}"؟`)) {
      await productService.remove(id)
      refresh()
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">المنتجات</h1>
          <p className="text-text-secondary text-sm">{products.length} منتج إجمالي</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
        >
          <Plus size={16} />
          إضافة منتج
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="دور باسم المنتج..."
            className="w-full rounded-lg border border-border-subtle bg-bg-panel py-2.5 pr-9 pl-4 text-sm text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-border-subtle bg-bg-panel px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary-500"
        >
          <option value="">كل التصنيفات</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-bg-panel">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-text-muted">
              <th className="p-3 text-right">المنتج</th>
              <th className="p-3 text-right">التصنيف</th>
              <th className="p-3 text-right">السعر</th>
              <th className="p-3 text-right">مميز</th>
              <th className="p-3 text-right">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border-subtle last:border-0 hover:bg-white/5">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    <span className="text-text-primary">{p.name}</span>
                  </div>
                </td>
                <td className="p-3 text-text-secondary">{categoryName(p.categoryId)}</td>
                <td className="p-3 text-text-secondary">{formatPrice(p.price, p.currency)}</td>
                <td className="p-3 text-text-secondary">{p.featured ? 'نعم' : 'لا'}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/products/${p.id}/edit`} aria-label="تعديل" className="text-primary-400 hover:text-primary-300">
                      <Pencil size={16} />
                    </Link>
                    <button type="button" onClick={() => handleDelete(p.id, p.name)} aria-label="حذف" className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-text-muted">لا يوجد منتجات مطابقة.</p>}
      </div>
    </div>
  )
}
