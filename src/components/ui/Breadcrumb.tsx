import { Link } from 'react-router-dom'
import { ChevronLeft, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  to?: string
}

// مسار تنقل (Breadcrumb) بترتيب RTL
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
      <Link to="/" className="flex items-center gap-1 hover:text-electric transition-colors">
        <Home size={14} />
        الرئيسية
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronLeft size={14} className="text-text-muted" />
          {item.to ? (
            <Link to={item.to} className="hover:text-electric transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
