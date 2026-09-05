import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/types'
import { categoryService } from '@/services/categoryService'
import { iconMap } from '@/utils/icons'

type FormData = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>

const emptyForm: FormData = {
  name: '',
  slug: '',
  description: '',
  icon: 'Package',
  active: true,
}

const ICON_NAMES = Object.keys(iconMap)

export function AdminCategoryForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState<FormData>(emptyForm)

  useEffect(() => {
    if (id) {
      categoryService.getById(id).then((c) => {
        if (c) setForm(c)
      })
    }
  }, [id])

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit && id) {
      await categoryService.update(id, form)
    } else {
      await categoryService.create(form)
    }
    navigate('/admin/categories')
  }

  return (
    <div className="max-w-2xl">
      <Link to="/admin/categories" className="flex items-center gap-1 text-sm text-text-secondary hover:text-electric mb-4">
        <ArrowRight size={14} />
        رجوع للتصنيفات
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mb-8">{isEdit ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border-subtle bg-bg-panel p-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-text-secondary">اسم التصنيف</label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="slug" className="mb-1.5 block text-sm text-text-secondary">Slug (اختياري)</label>
          <input
            id="slug"
            value={form.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm text-text-secondary">الوصف</label>
          <textarea
            id="description"
            rows={3}
            required
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="icon" className="mb-1.5 block text-sm text-text-secondary">الأيقونة</label>
          <select
            id="icon"
            value={form.icon}
            onChange={(e) => updateField('icon', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          >
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="active"
            type="checkbox"
            checked={form.active}
            onChange={(e) => updateField('active', e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="active" className="text-sm text-text-secondary">تصنيف مفعّل (يظهر في الموقع)</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-full bg-primary-600 px-7 py-3 text-sm font-medium text-white hover:bg-primary-500 transition-colors">
            {isEdit ? 'حفظ التعديلات' : 'إضافة التصنيف'}
          </button>
          <Link to="/admin/categories" className="rounded-full border border-border-subtle px-7 py-3 text-sm font-medium text-text-secondary hover:border-primary-500">
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  )
}
