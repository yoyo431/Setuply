import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, Package, FolderTree, Settings, Cpu, ArrowRight } from 'lucide-react'

const ADMIN_LINKS = [
  { to: '/admin', label: 'نظرة عامة', icon: LayoutDashboard },
  { to: '/admin/products', label: 'المنتجات', icon: Package },
  { to: '/admin/categories', label: 'التصنيفات', icon: FolderTree },
  { to: '/admin/settings', label: 'الإعدادات', icon: Settings },
]

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="hidden w-64 shrink-0 border-l border-border-subtle bg-bg-elevated p-5 lg:flex lg:flex-col">
        <div className="flex items-center gap-2 font-bold text-lg text-text-primary mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
            <Cpu size={18} />
          </span>
          لوحة التحكم
        </div>
        <nav className="flex flex-col gap-1">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-primary-600 text-white' : 'text-text-secondary hover:bg-white/5'
                  }`
                }
              >
                <Icon size={18} />
                {link.label}
              </NavLink>
            )
          })}
        </nav>
        <Link to="/" className="mt-auto flex items-center gap-2 text-sm text-text-muted hover:text-electric pt-6">
          <ArrowRight size={16} />
          العودة للموقع
        </Link>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between border-b border-border-subtle bg-bg-elevated px-4 py-3">
          <span className="font-bold text-text-primary">لوحة التحكم</span>
          <Link to="/" className="text-sm text-text-secondary">العودة للموقع</Link>
        </header>
        <nav className="lg:hidden flex gap-2 overflow-x-auto border-b border-border-subtle bg-bg-elevated px-4 py-2">
          {ADMIN_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors ${
                  isActive ? 'bg-primary-600 text-white' : 'text-text-secondary bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
