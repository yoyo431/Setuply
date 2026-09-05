import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Scale, X } from 'lucide-react'
import { useCompare } from '@/context/CompareContext'
import { CompareModal } from './CompareModal'

// شريط عائم يظهر عند اختيار منتجات للمقارنة
export function CompareBar() {
  const { ids, clear } = useCompare()
  const [open, setOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        {ids.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-4 inset-x-4 z-40 sm:inset-x-auto sm:left-4 sm:right-auto"
          >
            <div className="glass-panel flex items-center gap-4 rounded-2xl px-4 py-3 shadow-glow">
              <div className="flex items-center gap-2 text-sm text-text-primary">
                <Scale size={18} className="text-electric" />
                <span>{ids.length} منتج للمقارنة</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={ids.length < 2}
                className="rounded-full bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                قارن الآن
              </button>
              <button
                type="button"
                onClick={clear}
                aria-label="إلغاء المقارنة"
                className="text-text-secondary hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CompareModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
