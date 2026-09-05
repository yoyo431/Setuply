import type { ReactNode } from 'react'
import { PackageSearch } from 'lucide-react'
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  icon?: ReactNode
}

// حالة فاضية موحّدة (لا نتائج بحث، لا منتجات في القسم...)
export function EmptyState({ title, description, actionLabel, actionTo, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-400">
        {icon || <PackageSearch size={32} />}
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      {description && <p className="text-text-secondary max-w-md mb-6">{description}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="rounded-full bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
