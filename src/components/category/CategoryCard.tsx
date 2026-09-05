import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { Category } from '@/types'
import { getIcon } from '@/utils/icons'

interface CategoryCardProps {
  category: Category
  productCount: number
}

export function CategoryCard({ category, productCount }: CategoryCardProps) {
  const Icon = getIcon(category.icon)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/category/${category.slug}`}
        className="group relative flex flex-col gap-3 rounded-2xl border border-border-subtle bg-bg-panel p-5 h-full hover:border-primary-600/50 hover:shadow-glow transition-all"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
          <Icon size={22} />
        </div>
        <h3 className="font-semibold text-text-primary">{category.name}</h3>
        <p className="text-sm text-text-secondary line-clamp-2">{category.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-text-muted">{productCount} منتج</span>
          <ArrowLeft size={16} className="text-primary-400 group-hover:-translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  )
}
