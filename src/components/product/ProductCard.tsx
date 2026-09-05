import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Scale, ExternalLink } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice, calculateDiscountPercent } from '@/utils/format'
import { Badge } from '@/components/ui/Badge'
import { useCompare } from '@/context/CompareContext'

interface ProductCardProps {
  product: Product
  categoryName?: string
}

export function ProductCard({ product, categoryName }: ProductCardProps) {
  const { toggle, isSelected } = useCompare()
  const discount = calculateDiscountPercent(product.price, product.oldPrice)
  const selected = isSelected(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border border-border-subtle bg-bg-panel overflow-hidden hover:border-primary-600/50 hover:shadow-glow transition-all"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-bg-elevated">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-3 right-3">
            <Badge variant="primary">{product.badge}</Badge>
          </div>
        )}
        {discount && (
          <div className="absolute top-3 left-3">
            <Badge variant="electric">خصم {discount}%</Badge>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 gap-2">
        {categoryName && <span className="text-xs text-text-muted">{categoryName}</span>}
        <Link to={`/product/${product.id}`} className="font-semibold text-text-primary line-clamp-2 hover:text-electric transition-colors">
          {product.name}
        </Link>
        <p className="text-sm text-text-secondary line-clamp-2">{product.shortDescription}</p>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-text-primary">{formatPrice(product.price, product.currency)}</span>
            {product.oldPrice && (
              <span className="text-xs text-text-muted line-through">{formatPrice(product.oldPrice, product.currency)}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => toggle(product.id, product.categoryId)}
            title="أضف للمقارنة"
            aria-pressed={selected}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              selected ? 'bg-primary-600 border-primary-600 text-white' : 'border-border-subtle text-text-secondary hover:border-primary-500'
            }`}
          >
            <Scale size={16} />
          </button>
        </div>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-2.5 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
        >
          شوف المنتج على Amazon
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  )
}
