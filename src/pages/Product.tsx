import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExternalLink, Info } from 'lucide-react'
import type { Category, Product } from '@/types'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Badge } from '@/components/ui/Badge'
import { ProductGallery } from '@/components/product/ProductGallery'
import { SpecsTable } from '@/components/product/SpecsTable'
import { ProsCons } from '@/components/product/ProsCons'
import { ProductGrid } from '@/components/product/ProductGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { useSettings } from '@/context/SettingsContext'
import { formatPrice, calculateDiscountPercent } from '@/utils/format'
import { RECOMMENDATION_LABELS } from '@/utils/labels'
import { useSEO } from '@/utils/seo'

export function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null | undefined>(undefined)
  const [category, setCategory] = useState<Category | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const { settings } = useSettings()

  useEffect(() => {
    if (!id) return
    productService.getById(id).then(async (p) => {
      setProduct(p ?? null)
      if (p) {
        const cat = await categoryService.getById(p.categoryId)
        setCategory(cat ?? null)
        const sameCategory = await productService.getByCategory(p.categoryId)
        setRelated(sameCategory.filter((x) => x.id !== p.id).slice(0, 4))
      }
    })
  }, [id])

  useSEO({
    title: product ? product.name : 'المنتج',
    description: product ? product.shortDescription : 'تفاصيل المنتج على GearFlux.',
    path: `/product/${id}`,
  })

  if (product === undefined) return null

  if (product === null) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <EmptyState title="المنتج غير موجود." description="ممكن يكون تم حذفه أو الرابط غير صحيح." actionLabel="كل المنتجات" actionTo="/categories" />
      </div>
    )
  }

  const discount = calculateDiscountPercent(product.price, product.oldPrice)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          ...(category ? [{ label: category.name, to: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 mt-6">
        <ProductGallery images={product.gallery.length > 0 ? product.gallery : [product.image]} name={product.name} />

        <div>
          <div className="flex items-center gap-2 mb-3">
            {product.badge && <Badge variant="primary">{product.badge}</Badge>}
            {discount && <Badge variant="electric">خصم {discount}%</Badge>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">{product.name}</h1>
          <p className="text-text-secondary mb-6">{product.shortDescription}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-text-primary">{formatPrice(product.price, product.currency)}</span>
            {product.oldPrice && (
              <span className="text-lg text-text-muted line-through">{formatPrice(product.oldPrice, product.currency)}</span>
            )}
          </div>

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 text-base font-medium text-white hover:bg-primary-500 hover:shadow-glow transition-all mb-4"
          >
            شوف السعر على Amazon
            <ExternalLink size={16} />
          </a>

          <div className="flex items-start gap-2 rounded-xl border border-border-subtle bg-bg-panel p-3 text-xs text-text-muted">
            <Info size={14} className="mt-0.5 shrink-0" />
            {settings.affiliateDisclosure}
          </div>

          {product.recommendedFor.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm text-text-secondary mb-2">مناسب لمين؟</h3>
              <div className="flex flex-wrap gap-2">
                {product.recommendedFor.map((r) => (
                  <Badge key={r} variant="muted">
                    {RECOMMENDATION_LABELS[r]}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text-primary mb-4">نبذة عن المنتج</h2>
        <p className="text-text-secondary leading-relaxed">{product.description}</p>
      </section>

      {product.specifications.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-text-primary mb-4">المواصفات</h2>
          <SpecsTable specs={product.specifications} />
        </section>
      )}

      {(product.pros.length > 0 || product.cons.length > 0) && (
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-text-primary mb-4">المميزات والعيوب</h2>
          <ProsCons pros={product.pros} cons={product.cons} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">اختيارات مشابهة</h2>
          <ProductGrid products={related} />
        </section>
      )}

      <p className="mt-4 text-xs text-text-muted">
        سعرت ومواصفات هذا المنتج بيانات توضيحية — تحقق من أحدث السعر والتفاصيل عبر{' '}
        <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-primary-400 hover:underline">
          صفحة المنتج على Amazon
        </a>
        .
      </p>
    </div>
  )
}
