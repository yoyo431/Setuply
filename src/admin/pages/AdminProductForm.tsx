import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Plus, Trash2, ArrowRight } from 'lucide-react'
import type { Product, ProductBadge, ProductSpecification, RecommendedFor } from '@/types'
import { productService } from '@/services/productService'
import { useCategories } from '@/hooks/useCategories'
import { RECOMMENDATION_LABELS } from '@/utils/labels'

const BADGES: ProductBadge[] = ['اختيارنا', 'الأفضل للجيمنج', 'اقتصادي', 'مناسب للطلاب', 'Premium', 'الأفضل للشغل']
const RECOMMEND_KEYS = Object.keys(RECOMMENDATION_LABELS) as RecommendedFor[]

type FormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

const emptyForm: FormData = {
  name: '',
  slug: '',
  categoryId: '',
  image: '',
  gallery: [],
  shortDescription: '',
  description: '',
  price: 0,
  oldPrice: undefined,
  currency: 'EGP',
  specifications: [],
  pros: [],
  cons: [],
  badge: undefined,
  featured: false,
  recommendedFor: [],
  tags: [],
  amazonUrl: '',
  affiliateUrl: '',
}

export function AdminProductForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { categories } = useCategories()
  const [form, setForm] = useState<FormData>(emptyForm)
  const [galleryInput, setGalleryInput] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    if (id) {
      productService.getById(id).then((p) => {
        if (p) {
          setForm(p)
          setGalleryInput(p.gallery.join(', '))
          setTagsInput(p.tags.join(', '))
        }
      })
    }
  }, [id])

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const addSpec = () => updateField('specifications', [...form.specifications, { label: '', value: '' }])
  const updateSpec = (i: number, patch: Partial<ProductSpecification>) => {
    const next = [...form.specifications]
    next[i] = { ...next[i], ...patch }
    updateField('specifications', next)
  }
  const removeSpec = (i: number) => updateField('specifications', form.specifications.filter((_, x) => x !== i))

  const addListItem = (key: 'pros' | 'cons') => updateField(key, [...form[key], ''])
  const updateListItem = (key: 'pros' | 'cons', i: number, value: string) => {
    const next = [...form[key]]
    next[i] = value
    updateField(key, next)
  }
  const removeListItem = (key: 'pros' | 'cons', i: number) => updateField(key, form[key].filter((_, x) => x !== i))

  const toggleRecommendation = (key: RecommendedFor) => {
    const next = form.recommendedFor.includes(key)
      ? form.recommendedFor.filter((r) => r !== key)
      : [...form.recommendedFor, key]
    updateField('recommendedFor', next)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: FormData = {
      ...form,
      gallery: galleryInput.split(',').map((s) => s.trim()).filter(Boolean),
      tags: tagsInput.split(',').map((s) => s.trim()).filter(Boolean),
    }

    if (isEdit && id) {
      await productService.update(id, payload)
    } else {
      await productService.create(payload)
    }
    navigate('/admin/products')
  }

  return (
    <div className="max-w-4xl">
      <Link to="/admin/products" className="flex items-center gap-1 text-sm text-text-secondary hover:text-electric mb-4">
        <ArrowRight size={14} />
        رجوع للمنتجات
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mb-8">{isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-2xl border border-border-subtle bg-bg-panel p-5 space-y-4">
          <h2 className="font-semibold text-text-primary">البيانات الأساسية</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-text-secondary">اسم المنتج</label>
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
              <label htmlFor="category" className="mb-1.5 block text-sm text-text-secondary">التصنيف</label>
              <select
                id="category"
                required
                value={form.categoryId}
                onChange={(e) => updateField('categoryId', e.target.value)}
                className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
              >
                <option value="">اختر تصنيف</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="badge" className="mb-1.5 block text-sm text-text-secondary">Badge</label>
              <select
                id="badge"
                value={form.badge || ''}
                onChange={(e) => updateField('badge', (e.target.value || undefined) as ProductBadge | undefined)}
                className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
              >
                <option value="">بدون</option>
                {BADGES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="shortDescription" className="mb-1.5 block text-sm text-text-secondary">وصف مختصر</label>
            <input
              id="shortDescription"
              required
              value={form.shortDescription}
              onChange={(e) => updateField('shortDescription', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm text-text-secondary">الوصف الكامل</label>
            <textarea
              id="description"
              rows={4}
              required
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="featured" className="text-sm text-text-secondary">منتج مميز (يظهر في اختياراتنا المميزة)</label>
          </div>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-bg-panel p-5 space-y-4">
          <h2 className="font-semibold text-text-primary">الصور</h2>
          <div>
            <label htmlFor="image" className="mb-1.5 block text-sm text-text-secondary">رابط الصورة الرئيسية</label>
            <input
              id="image"
              required
              value={form.image}
              onChange={(e) => updateField('image', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="gallery" className="mb-1.5 block text-sm text-text-secondary">روابط معرض الصور (مفصولة بفاصلة)</label>
            <input
              id="gallery"
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-bg-panel p-5 space-y-4">
          <h2 className="font-semibold text-text-primary">التسعير</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="mb-1.5 block text-sm text-text-secondary">السعر الحالي (جنيه)</label>
              <input
                id="price"
                type="number"
                required
                min={0}
                value={form.price}
                onChange={(e) => updateField('price', Number(e.target.value))}
                className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="oldPrice" className="mb-1.5 block text-sm text-text-secondary">السعر القديم (اختياري)</label>
              <input
                id="oldPrice"
                type="number"
                min={0}
                value={form.oldPrice ?? ''}
                onChange={(e) => updateField('oldPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-bg-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-text-primary">المواصفات</h2>
            <button type="button" onClick={addSpec} className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300">
              <Plus size={14} /> إضافة مواصفة
            </button>
          </div>
          {form.specifications.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="التسمية"
                value={spec.label}
                onChange={(e) => updateSpec(i, { label: e.target.value })}
                className="flex-1 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
              />
              <input
                placeholder="القيمة"
                value={spec.value}
                onChange={(e) => updateSpec(i, { value: e.target.value })}
                className="flex-1 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
              />
              <button type="button" onClick={() => removeSpec(i)} aria-label="حذف" className="text-red-400 hover:text-red-300">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border-subtle bg-bg-panel p-5 space-y-4">
          <h2 className="font-semibold text-text-primary">المميزات والعيوب</h2>
          {(['pros', 'cons'] as const).map((key) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">{key === 'pros' ? 'المميزات' : 'العيوب'}</span>
                <button type="button" onClick={() => addListItem(key)} className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300">
                  <Plus size={14} /> إضافة
                </button>
              </div>
              <div className="space-y-2">
                {form[key].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={item}
                      onChange={(e) => updateListItem(key, i, e.target.value)}
                      className="flex-1 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
                    />
                    <button type="button" onClick={() => removeListItem(key, i)} aria-label="حذف" className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border-subtle bg-bg-panel p-5 space-y-4">
          <h2 className="font-semibold text-text-primary">التوصيات والـ Tags</h2>
          <div>
            <p className="mb-2 text-sm text-text-secondary">مناسب لمين؟</p>
            <div className="flex flex-wrap gap-2">
              {RECOMMEND_KEYS.map((key) => {
                const active = form.recommendedFor.includes(key)
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleRecommendation(key)}
                    className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${
                      active ? 'bg-primary-600 border-primary-600 text-white' : 'border-border-subtle text-text-secondary'
                    }`}
                  >
                    {RECOMMENDATION_LABELS[key]}
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <label htmlFor="tags" className="mb-1.5 block text-sm text-text-secondary">Tags (مفصولة بفاصلة)</label>
            <input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-bg-panel p-5 space-y-4">
          <h2 className="font-semibold text-text-primary">روابط الأفيليت</h2>
          <div>
            <label htmlFor="amazonUrl" className="mb-1.5 block text-sm text-text-secondary">رابط أمازون الأصلي</label>
            <input
              id="amazonUrl"
              required
              value={form.amazonUrl}
              onChange={(e) => updateField('amazonUrl', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="affiliateUrl" className="mb-1.5 block text-sm text-text-secondary">رابط الأفيليت (المستخدم في الموقع)</label>
            <input
              id="affiliateUrl"
              required
              value={form.affiliateUrl}
              onChange={(e) => updateField('affiliateUrl', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-bg-panel p-5 space-y-2">
          <h2 className="font-semibold text-text-primary">SEO</h2>
          <p className="text-sm text-text-secondary">
            يتم توليد عنوان ووصف الصفحة تلقائيًا من اسم المنتج والوصف المختصر. يمكن دعم حقول SEO مخصصة عند ربط المنصة ببكند حقيقي.
          </p>
        </section>

        <div className="flex gap-3">
          <button type="submit" className="rounded-full bg-primary-600 px-7 py-3 text-sm font-medium text-white hover:bg-primary-500 transition-colors">
            {isEdit ? 'حفظ التعديلات' : 'إضافة المنتج'}
          </button>
          <Link to="/admin/products" className="rounded-full border border-border-subtle px-7 py-3 text-sm font-medium text-text-secondary hover:border-primary-500">
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  )
}
