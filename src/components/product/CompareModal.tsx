import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import type { Product } from '@/types'
import { useCompare } from '@/context/CompareContext'
import { productService } from '@/services/productService'
import { formatPrice } from '@/utils/format'

interface CompareModalProps {
  open: boolean
  onClose: () => void
}

// نافذة مقارنة المنتجات — تعتمد فقط على المواصفات الموجودة فعليًا في بيانات المنتج
export function CompareModal({ open, onClose }: CompareModalProps) {
  const { ids } = useCompare()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!open) return
    Promise.all(ids.map((id) => productService.getById(id))).then((results) => {
      setProducts(results.filter((p): p is Product => Boolean(p)))
    })
  }, [open, ids])

  if (!open) return null

  const specLabels = Array.from(new Set(products.flatMap((p) => p.specifications.map((s) => s.label))))

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-4xl max-h-[85vh] overflow-auto rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">مقارنة المنتجات</h2>
            <button type="button" onClick={onClose} aria-label="إغلاق" className="text-text-secondary hover:text-white">
              <X size={22} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-right p-2 text-text-muted font-normal"></th>
                  {products.map((p) => (
                    <th key={p.id} className="p-2 text-center min-w-[160px]">
                      <img src={p.image} alt={p.name} className="mx-auto mb-2 h-20 w-20 rounded-xl object-cover" />
                      <div className="font-semibold text-text-primary">{p.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border-subtle">
                  <td className="p-2 text-text-muted">السعر</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-2 text-center font-bold text-text-primary">
                      {formatPrice(p.price, p.currency)}
                    </td>
                  ))}
                </tr>
                {specLabels.map((label) => (
                  <tr key={label} className="border-t border-border-subtle">
                    <td className="p-2 text-text-muted">{label}</td>
                    {products.map((p) => {
                      const spec = p.specifications.find((s) => s.label === label)
                      return (
                        <td key={p.id} className="p-2 text-center text-text-secondary">
                          {spec ? spec.value : '—'}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr className="border-t border-border-subtle">
                  <td className="p-2 text-text-muted">الرابط</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-2 text-center">
                      <a
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1.5 text-xs text-white hover:bg-primary-500"
                      >
                        Amazon
                        <ExternalLink size={12} />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
